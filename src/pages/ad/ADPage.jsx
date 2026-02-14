import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import StepProgress from "@/components/common/StepProgress";
import ADStepLayout from "@/components/layout/ADStepLayout";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import { PRODUCTS } from "@/data/products";
import { AD_CONTENT_TYPE_OPTIONS, CONTENT_TIP, STEP_LABELS } from "@/data/ads";

import InfoInputSection from "./sections/InfoInputSection";
import GuideSelectionSection from "./sections/GuideSelectionSection";
import CopySelectionSection from "./sections/CopySelectionSection";
import ContentGenerationSection from "./sections/ContentGenerationSection";

import {
  fetchAdGuides,
  fetchAdCopies,
  createAdContents,
} from "../../services/api/ad";

// util: 선택된 guide/copy 객체 추출
function pickSelectedGuide(guideResponse, selectedGuideId) {
  const guides = guideResponse?.guides ?? [];
  return guides.find((g) => String(g.id) === String(selectedGuideId)) ?? null;
}

function pickSelectedCopy(copyResponse, selectedCopyId) {
  const copies = copyResponse?.copies ?? [];
  const found =
    copies.find((c) => String(c.id) === String(selectedCopyId)) ?? null;

  if (!found) return null;

  if (found.result) {
    return {
      id: String(found.id),
      concept: found.result.selectedConcept ?? "",
      finalCopy: found.result.finalCopy ?? "",
      shortformPrompt: found.result.shortformPrompt ?? "",
      bannerPrompt: found.result.bannerPrompt ?? "",
      snsPrompt: found.result.snsPrompt ?? "",
      selectionReason: found.result.selectionReason ?? "",
      productName: found.result.productName ?? "",
      raw: found,
    };
  }

  return {
    id: String(found.id),
    concept: found.title ?? "",
    finalCopy: found.body ?? "",
    shortformPrompt: "",
    bannerPrompt: "",
    snsPrompt: "",
    selectionReason: "",
    productName: "",
    raw: found,
  };
}

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

  // 현재 날짜를 YYYY-MM 형식으로 초기화
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const [baseDate, setBaseDate] = useState(`${yyyy}-${mm}`);

  // Step1 입력
  const [adGoal, setAdGoal] = useState("");
  const [requestText, setRequestText] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [adFocus, setAdFocus] = useState(50);
  const [projectTitle, setProjectTitle] = useState("");

  // 선택은 id 기반
  const [selectedGuideId, setSelectedGuideId] = useState("");
  const [selectedCopyId, setSelectedCopyId] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [attachedFile, setAttachedFile] = useState(null);
  const [bannerSize, setBannerSize] = useState("");

  // 서버 응답 원본
  const [guideResponse, setGuideResponse] = useState(null);
  const [copyResponse, setCopyResponse] = useState(null);

  // 비용 절감 모드
  const USE_GUIDE_API = false;
  const USE_COPY_API = false;

  const LOCAL_GUIDE_RESPONSE = useMemo(
    () => ({
      recommendedGuideId: "local-g1",
      guides: [
        {
          id: "local-g1",
          title: "제품 중심 홍보",
          summary: "핵심 효익 1개 + 근거 1개 + 행동 유도 1개로 단순화",
          badge: "전환형",
          score: 91,
          rationale: "로컬 더미(비용 절감)",
          key_points: {
            tone: ["명확함"],
            structure: "benefit-proof-cta",
            cta: "direct",
          },
        },
        {
          id: "local-g2",
          title: "감성적 스토리텔링",
          summary: "상황→해결→변화 흐름",
          badge: "브랜드형",
          score: 78,
          rationale: "로컬 더미(비용 절감)",
          key_points: {
            tone: ["공감"],
            structure: "problem-solution",
            cta: "soft",
          },
        },
      ],
    }),
    [],
  );

  const LOCAL_COPY_RESPONSE = useMemo(
    () => ({
      recommendedCopyId: "c3",
      copies: [
        {
          id: "c1",
          title: "행복한 순간",
          body: "작은 행복이 모여 큰 추억이 됩니다.\n당신의 특별한 순간을 더 달콤하게.",
        },
        {
          id: "c2",
          title: "따뜻한 마음",
          body: "마음을 담아 정성스럽게 만든 달콤함.\n소중한 사람과 함께 나누세요.",
        },
        {
          id: "c3",
          title: "일상의 여유",
          body: "바쁜 하루 속 작은 쉼표.\n달콤한 여유로 일상을 채워보세요.",
        },
        {
          id: "c4",
          title: "오늘의 리셋",
          body: "지친 하루를 가볍게 리셋.\n한 입으로 기분까지 환해집니다.",
        },
        {
          id: "c5",
          title: "선물 같은 한입",
          body: "특별한 날이 아니어도 좋아요.\n오늘을 선물처럼 만드는 한 입.",
        },
      ],
    }),
    [],
  );

  // 제품 이미지 더미 데이터 (3개)
  // 제품 이미지 상태 관리 (재생성을 위해 useState 사용)
  const [productImages, setProductImages] = useState([
    {
      id: "img-1",
      url: "https://placehold.co/400x400/e0f2fe/0284c7?text=Clean+Concept",
      label: "image1",
    },
    {
      id: "img-2",
      url: "https://placehold.co/400x400/f0fdf4/16a34a?text=Eco+Friendly",
      label: "image2",
    },
    {
      id: "img-3",
      url: "https://placehold.co/400x400/fef2f2/dc2626?text=Vivid+Color",
      label: "image3",
    },
  ]);

  const [selectedProductImageId, setSelectedProductImageId] = useState("img-1");

  // 이미지 전체 재생성 핸들러
  const handleRegenerateImages = () => {
    // 실제로는 API를 호출해야 하지만, 여기서는 더미 URL에 timestamp를 붙여 변경 효과를 줌
    const timestamp = Date.now();
    setProductImages((prev) =>
      prev.map((img) => ({
        ...img,
        url: `${img.url.split("&t=")[0]}&t=${timestamp}`,
      }))
    );
  };


  const guideMutation = useMutation({
    mutationFn: (payload) => fetchAdGuides(payload),
  });

  const copyMutation = useMutation({
    mutationFn: (payload) => fetchAdCopies(payload),
  });

  // Step4 최종 생성 API
  const createMutation = useMutation({
    mutationFn: (payload) => createAdContents(payload),
  });

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
    if (currentStep === 4) return selectedTypes.length > 0;
    return true;
  };

  const handlePrev = () => setCurrentStep((prev) => Math.max(1, prev - 1));

  const handleNext = async () => {
    if (!canProceed()) return;

    // Step1 -> Step2
    if (currentStep === 1) {
      if (!USE_GUIDE_API) {
        setGuideResponse(LOCAL_GUIDE_RESPONSE);
        setSelectedGuideId(LOCAL_GUIDE_RESPONSE.recommendedGuideId || "");
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
        if (!Array.isArray(guides) || guides.length === 0) {
          throw new Error(
            "가이드라인이 생성되지 않았습니다. (guides 비어있음)",
          );
        }

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
        setCopyResponse(LOCAL_COPY_RESPONSE);
        setSelectedCopyId(
          LOCAL_COPY_RESPONSE.recommendedCopyId ||
          LOCAL_COPY_RESPONSE.copies[0].id,
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
        if (!Array.isArray(copies) || copies.length === 0) {
          throw new Error("광고 문구 응답이 비어있습니다.");
        }

        setCopyResponse(resp);
        setSelectedCopyId(resp?.recommendedCopyId || copies[0].id);
        setCurrentStep(3);
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
      if (!attachedFile) {
        console.error("첨부파일은 필수입니다.");
        return;
      }

      const payload = {
        productId,
        productName,
        projectTitle,
        adGoal,
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
          productName: selectedCopy.productName || productName,
          selectedConcept: selectedCopy.concept,
          finalCopy: selectedCopy.finalCopy,
          shortformPrompt: selectedCopy.shortformPrompt,
          bannerPrompt: selectedCopy.bannerPrompt,
          snsPrompt: selectedCopy.snsPrompt,
          selectionReason: selectedCopy.selectionReason,
        },

        selectedTypes,
      };

      const form = new FormData();
      form.append("payload", JSON.stringify(payload));
      form.append("file", attachedFile);

      const created = await createMutation.mutateAsync(form);

      navigate("./result", { state: { ...payload, created } });
    }

    // Step3 -> Step4
    setCurrentStep((prev) => prev + 1);
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
        (currentStep === 4 && isCreating)
      }
      nextLabel={
        currentStep === 1 && USE_GUIDE_API && isLoadingGuides
          ? "가이드 생성 중..."
          : currentStep === 2 && USE_COPY_API && isLoadingCopies
            ? "광고 문구 생성 중..."
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
          />
        )}
      </ErrorBoundary>
    </ADStepLayout>
  );
}
