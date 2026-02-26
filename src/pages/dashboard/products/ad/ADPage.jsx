import { useMemo, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import StepProgress from "@/components/common/StepProgress";
import ADStepLayout from "@/components/layout/ADStepLayout";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import { PRODUCTS } from "@/data/products";
import { AD_CONTENT_TYPE_OPTIONS, AD_COPY, CONTENT_TIP, STEP_LABELS } from "@/data/ads";

import InfoInputSection from "./sections/InfoInputSection";
import GuideSelectionSection from "./sections/GuideSelectionSection";
import CopySelectionSection from "./sections/CopySelectionSection";
import ContentGenerationSection from "./sections/ContentGenerationSection";

import {
  fetchAdGuides,
  fetchAdCopies,
  createAdContents,
  createBasicImageJob,
  fetchBasicImageResult,
} from "@/services/api/ad";
import { pickSelectedGuide } from "@/components/ad/pickSelectedGuide";
import { pickSelectedCopy } from "@/components/ad/pickSelectedCopy";
import { pollJobUntilDone } from "@/utils/pollJobUntilDone";
import { TREND_GUIDE } from "@/data/trend";

export default function ADPage() {
  const navigate = useNavigate();
  const { productId: productIdParam } = useParams();

  const productId = useMemo(() => {
    const n = Number(productIdParam);
    return Number.isFinite(n) ? n : undefined;
  }, [productIdParam]);

  const productName = useMemo(() => {
    if (productId == null) return "";
    const product = PRODUCTS.find((p) => p.id === productId);
    return product?.name ?? "";
  }, [productId]);

  const invalidProductId = !(Number.isFinite(productId) && productId > 0);
  const [currentStep, setCurrentStep] = useState(1);

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const [baseDate, setBaseDate] = useState(`${yyyy}-${mm}`);

  // Step1
  const [adGoal, setAdGoal] = useState("");
  const [requestText, setRequestText] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [adFocus, setAdFocus] = useState(50);
  const [projectTitle, setProjectTitle] = useState("");

  // selections
  const [selectedGuideId, setSelectedGuideId] = useState("");
  const [selectedCopyId, setSelectedCopyId] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [attachedFile, setAttachedFile] = useState(null);
  const [bannerSize, setBannerSize] = useState("");

  // BASIC preview 상태
  const [previewJobId, setPreviewJobId] = useState("");
  const [isLoadingPreviewImages, setIsLoadingPreviewImages] = useState(false);
  const [previewError, setPreviewError] = useState("");

  // server responses
  const [guideResponse, setGuideResponse] = useState(null);
  const [copyResponse, setCopyResponse] = useState(null);

  // Step4 product images
  const [productImages, setProductImages] = useState([]); // [{id,url,label,meta}]
  const [selectedProductImageId, setSelectedProductImageId] = useState("");

  // 비용 절감 모드(네 코드 유지)
  const USE_GUIDE_API = false;
  const USE_COPY_API = false;

  const guideMutation = useMutation({ mutationFn: fetchAdGuides });
  const copyMutation = useMutation({ mutationFn: fetchAdCopies });
  const createMutation = useMutation({ mutationFn: createAdContents });

  // ✅ BASIC 프리뷰 생성
  const generateProductImages = useCallback(async () => {
  if (!attachedFile)
    throw new Error("첨부파일이 없습니다. 제품 이미지 후보 생성 불가.");

  // ★ 여기서 선택된 가이드/카피를 뽑는다
  const selectedGuide = pickSelectedGuide(guideResponse, selectedGuideId);
  const selectedCopy = pickSelectedCopy(copyResponse, selectedCopyId);

  // ★ prompt/instruction을 “반드시 문자열”로 만든다
  const prompt = (selectedGuide?.title ?? "").trim();
  // instruction은 너 목적에 맞게 고르자:
  // - 그냥 카피 본문: finalCopy
  // - 배너용 지시문: bannerPrompt (있으면 이게 더 맞음)
  const instruction = (
    selectedCopy?.bannerPrompt ||
    selectedCopy?.finalCopy ||
    selectedCopy?.concept ||
    ""
  ).trim();

  if (!prompt && !instruction) {
    throw new Error("가이드/카피 선택값이 비어있습니다. Step2~3 선택 확인 필요");
  }

  const previewPayload = {
    productId,
    productName,
    projectTitle,
    adGoal,
    requestText,
    selectedKeywords,
    adFocus,
    n: 3,

    // ✅ 이걸 넣어야 서버에서 통과함
    prompt,
    instruction,

    // (선택) 디버깅/추적용으로 같이 보내도 됨
    selectedGuideId,
    selectedCopyId,
  };

  setPreviewError("");
  setIsLoadingPreviewImages(true);
  setProductImages([]);
  setSelectedProductImageId("");

  try {
    const { jobId } = await createBasicImageJob({
      payload: previewPayload,
      file: attachedFile,
    });
    setPreviewJobId(jobId);

    const job = await pollJobUntilDone(jobId, { intervalMs: 1000, timeoutMs: 60000 });
    if (job.status === "FAILED") {
      throw new Error(job.errorMessage || "제품 이미지 후보 생성 실패");
    }
    const result = await fetchBasicImageResult(jobId);
    const candidates = Array.isArray(result?.candidates) ? result.candidates : [];
    const fallbackUrl = result?.outputUri || result?.url || null;

    const finalCandidates =
      candidates.length > 0
        ? candidates
        : (fallbackUrl ? [{ id: "0", url: fallbackUrl, label: "preview", meta: null }] : []);

    if (finalCandidates.length === 0) {
      throw new Error("제품 이미지 후보가 생성되지 않았습니다.");
    }

    const mapped = finalCandidates.map((c, idx) => ({
      id: String(c.id ?? `c${idx + 1}`),
      url: c.url,
      label: c.label ?? `image${idx + 1}`,
      meta: c.meta ?? null,
    }));

    setProductImages(mapped);
    setSelectedProductImageId(mapped[0]?.id ?? "");
  } catch (e) {
    setPreviewError(e?.message || "제품 이미지 후보 생성 실패");
    throw e;
  } finally {
    setIsLoadingPreviewImages(false);
  }
}, [
  attachedFile,
  productId,
  productName,
  projectTitle,
  adGoal,
  requestText,
  selectedKeywords,
  adFocus,
  guideResponse,
  copyResponse,
  selectedGuideId,
  selectedCopyId,
]);
  const handleRegenerateImages = useCallback(async () => {
    try {
      await generateProductImages();
    } catch (e) {
      console.error(e);
    }
  }, [generateProductImages]);

  const canProceed = () => {
    if (currentStep === 1) {
      return (
        Number.isFinite(productId) &&
        productId > 0 &&
        projectTitle.trim().length > 0 &&
        Boolean(adGoal) &&
        selectedKeywords.length > 0 &&
        attachedFile !== null
      );
    }
    if (currentStep === 2) return Boolean(selectedGuideId);
    if (currentStep === 3) return Boolean(selectedCopyId);
    if (currentStep === 4)
      return selectedTypes.length > 0 && Boolean(selectedProductImageId);
    return true;
  };

  const handlePrev = () => setCurrentStep((prev) => Math.max(1, prev - 1));

  const handleNext = async () => {
    if (!canProceed()) return;

    // Step1 -> Step2
    if (currentStep === 1) {
      if (!USE_GUIDE_API) {
        setGuideResponse(TREND_GUIDE);
        setSelectedGuideId(TREND_GUIDE.recommendedGuideId || "");
        setCopyResponse(null);
        setSelectedCopyId("");
        setCurrentStep(2);
        return;
      }

      try {
        const resp = await guideMutation.mutateAsync({
          productId,
          baseDate,
          projectTitle,
          adGoal,
          requestText,
          selectedKeywords,
          adFocus,
        });

        const guides = resp?.guides ?? [];
        if (!Array.isArray(guides) || guides.length === 0)
          throw new Error("가이드 응답 비어있음");

        setGuideResponse(resp);
        setSelectedGuideId(resp?.recommendedGuideId || guides[0]?.id || "");
        setCopyResponse(null);
        setSelectedCopyId("");
        setCurrentStep(2);
      } catch (e) {
        console.error(e);
      }
      return;
    }

    // Step2 -> Step3
    if (currentStep === 2) {
      if (!USE_COPY_API) {
        setCopyResponse(AD_COPY);
        setSelectedCopyId(
          AD_COPY.recommendedCopyId ||
            AD_COPY.copies[0].id,
        );
        setCurrentStep(3);
        return;
      }

      try {
        const resp = await copyMutation.mutateAsync({
          productId,
          baseDate,
          projectTitle,
          adGoal,
          requestText,
          selectedKeywords,
          adFocus,
          guideId: selectedGuideId,
        });

        const copies = resp?.copies ?? [];
        if (!Array.isArray(copies) || copies.length === 0)
          throw new Error("문구 응답 비어있음");

        setCopyResponse(resp);
        setSelectedCopyId(resp?.recommendedCopyId || copies[0].id);
        setCurrentStep(3);
      } catch (e) {
        console.error(e);
      }
      return;
    }

    // Step3 -> Step4 : 여기서 BASIC 생성 + 후보 세팅
    if (currentStep === 3) {
      try {
        await generateProductImages();
        setCurrentStep(4);
      } catch (e) {
        console.error(e);
      }
      return;
    }

    // Step4: 최종 생성 호출
    if (currentStep === 4) {
      const selectedGuide = pickSelectedGuide(guideResponse, selectedGuideId);
      const selectedCopy = pickSelectedCopy(copyResponse, selectedCopyId);
      if (!selectedGuide || !selectedCopy) return;
      if (!attachedFile) return;

      const selectedProduct = productImages.find(
        (x) => String(x.id) === String(selectedProductImageId),
      );
      
      if (!selectedProduct?.url) {
        console.error(
          "선택된 제품 기본 이미지 정보가 없습니다.",
        );
        return;
      }

      const payload = {
        productId,
        productName,
        projectTitle,
        adGoal,
        adMessageTarget: adGoal,
        requestText,
        selectedKeywords,
        adFocus,
        baseDate,
        bannerSize,

        selectedGuideId,
        selectedGuide,

        selectedCopyId,

        selectedCopy: {
          id: selectedCopy.id,
          title: selectedCopy.concept,          
          body: selectedCopy.finalCopy || "",   
          productName: selectedCopy.productName || productName,
          selectedConcept: selectedCopy.concept,
          finalCopy: selectedCopy.finalCopy,
          shortformPrompt: selectedCopy.shortformPrompt,
          bannerPrompt: selectedCopy.bannerPrompt,
          snsPrompt: selectedCopy.snsPrompt,
          selectionReason: selectedCopy.selectionReason,
        },
        selectedTypes,
        selectedProductImage: {
          candidateId: selectedProduct.id,
          url: selectedProduct.url, 
          meta: selectedProduct.meta,
          previewJobId,
        },
      };

      const form = new FormData();
      form.append("payload", JSON.stringify(payload));
      form.append("file", attachedFile);

      const created = await createMutation.mutateAsync({ productId, formData: form });
      navigate("./result", { state: { ...payload, created } });
      return;
    }
  };

  const isLoadingGuides = USE_GUIDE_API ? guideMutation.isPending : false;
  const isLoadingCopies = USE_COPY_API ? copyMutation.isPending : false;
  const isCreating = createMutation.isPending;

  return (
    <ADStepLayout
      step={currentStep}
      onPrev={handlePrev}
      onNext={handleNext}
      disableNext={
        !canProceed() ||
        (currentStep === 1 && USE_GUIDE_API && isLoadingGuides) ||
        (currentStep === 2 && USE_COPY_API && isLoadingCopies) ||
        (currentStep === 3 && isLoadingPreviewImages) ||
        (currentStep === 4 && isCreating)
      }
      nextLabel={
        currentStep === 3 && isLoadingPreviewImages
          ? "제품 이미지 생성 중..."
          : currentStep === 4 && isCreating
            ? "광고 생성 중..."
            : currentStep === 4
              ? "광고 생성 시작"
              : "다음"
      }
    >
      <div className="mb-6">
        <h1 className="text-3xl font-black text-[#111827]">
          AI 광고 생성{productName ? ` · ${productName}` : ""}
        </h1>
      </div>

      <StepProgress currentStep={currentStep} steps={STEP_LABELS} />

      <ErrorBoundary>
        {invalidProductId && currentStep === 1 ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-4 text-sm text-red-700">
            유효하지 않은 productId 입니다. (URL 파라미터를 확인하세요)
          </div>
        ) : null}

        {createMutation.isError ? (
          <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-6 py-4 text-sm text-red-700">
            {createMutation.error?.message || "최종 광고 생성 실패"}
          </div>
        ) : null}

        {previewError ? (
          <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-6 py-4 text-sm text-red-700">
            {previewError}
          </div>
        ) : null}

        {currentStep === 1 && !invalidProductId && (
          <InfoInputSection
            productId={productId}
            adGoal={adGoal}
            projectTitle={projectTitle}
            setProjectTitle={setProjectTitle}
            setAdGoal={setAdGoal}
            requestText={requestText}
            setRequestText={setRequestText}
            selectedKeywords={selectedKeywords}
            setSelectedKeywords={setSelectedKeywords}
            adFocus={adFocus}
            setAdFocus={setAdFocus}
            attachedFile={attachedFile}
            setAttachedFile={setAttachedFile}
            baseDate={baseDate}
            setBaseDate={setBaseDate}
          />
        )}

        {currentStep === 2 && (
          <GuideSelectionSection
            guides={guideResponse?.guides ?? []}
            recommendedGuideId={guideResponse?.recommendedGuideId ?? ""}
            selectedGuideId={selectedGuideId}
            setSelectedGuideId={setSelectedGuideId}
            isLoading={isLoadingGuides}
          />
        )}

        {currentStep === 3 && (
          <CopySelectionSection
            copies={copyResponse?.copies ?? []}
            recommendedCopyId={copyResponse?.recommendedCopyId ?? ""}
            selectedCopyId={selectedCopyId}
            setSelectedCopyId={setSelectedCopyId}
            isLoading={isLoadingCopies}
          />
        )}

        {currentStep === 4 && (
          <ContentGenerationSection
            contentTypes={AD_CONTENT_TYPE_OPTIONS}
            tip={CONTENT_TIP}
            selectedTypes={selectedTypes}
            setSelectedTypes={setSelectedTypes}
            bannerSize={bannerSize}
            setBannerSize={setBannerSize}
            productImages={productImages}
            selectedProductImageId={selectedProductImageId}
            setSelectedProductImageId={setSelectedProductImageId}
            onRegenerateImages={handleRegenerateImages}
            isLoadingImages={isLoadingPreviewImages}
          />
        )}
      </ErrorBoundary>
    </ADStepLayout>
  );
}
