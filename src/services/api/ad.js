import { httpForm, httpJson } from "./http";

/**
 * 트렌드 분석
 */
export async function fetchAdTrends({ productId, date }) {
  const body = date ? { date } : {};
  return httpJson(`/api/advertising/${productId}/ad-trends`, {
    method: "POST",
    body,
  });
}

/**
 * 가이드 생성
 */
export function fetchAdGuides(payload) {
  return httpJson(`/api/advertising/${payload.productId}/ad-guides`, {
    method: "POST",
    body: payload,
  });
}

/**
 * 문구 생성
 */
export function fetchAdCopies(payload) {
  return httpJson(`/api/advertising/${payload.productId}/ad-copies`, {
    method: "POST",
    body: payload,
  });
}

/**
 * 최종 광고 생성 결과 저장 (Log)
 * POST /api/advertising/{productId}/log
 */
export async function saveAdLog({ productId, data }) {
  return httpJson(`/api/advertising/${productId}/log`, {
    method: "POST",
    body: data,
  });
}

/**
 * (Legacy) 최종 광고 생성 - File Upload 포함
 */
export async function createAdContents({ productId, formData }) {
  return httpForm(`/api/advertising/${productId}/ads`, {
    method: "POST",
    formData: formData,
  });
}

export async function createBasicImageJob({ payload, file, baseFile }) {
  const guideText =
    typeof payload?.selectedGuide === "string"
      ? payload.selectedGuide
      : payload?.selectedGuide?.title ??
      payload?.selectedGuide?.summary ??
      "";

  const copyText =
    typeof payload?.selectedCopy === "string"
      ? payload.selectedCopy
      : payload?.selectedCopy?.bannerPrompt ??
      payload?.selectedCopy?.finalCopy ??
      payload?.selectedCopy?.concept ??
      "";

  const prompt =
    (payload?.prompt && String(payload.prompt).trim()) ||
    String(guideText).trim();

  const instruction =
    (payload?.instruction && String(payload.instruction).trim()) ||
    String(copyText).trim();

  const normalizedPayload = {
    ...payload,
    prompt,
    instruction,
  };

  const form = new FormData();
  form.append("payload", JSON.stringify(normalizedPayload));
  form.append("file", file);
  if (baseFile) form.append("base_file", baseFile);

  return httpForm(`/api/jobs/basic-images`, {
    method: "POST",
    formData: form,
  });
}
/**
 * ✅ 잡 조회
 * GET /api/jobs/{jobId}
 */
export async function fetchJob(jobId) {
  return httpJson(`/api/jobs/${jobId}`, { method: "GET" });
}

/**
 * ✅ BASIC 결과(manifest) 조회
 * - job.outputUri = public url (manifest.json)
 */
export async function fetchBasicImageResult(jobId) {
  const job = await fetchJob(jobId);
  if (!job?.outputUri) throw new Error("outputUri가 없습니다.");
  return { url: job.outputUri };
}