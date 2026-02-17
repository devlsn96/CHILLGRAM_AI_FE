import { apiFetch } from "@/lib/apiFetch";

/**
 * URL 등록 + 비동기 처리 시작
 * POST /register
 * Payload: { coupang_url: string, max_reviews: number }
 */
export async function registerProduct(payload) {
  const res = await apiFetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...payload,
      force: payload.force || false,
    }),
  });
  if (!res.ok) throw new Error("제품 등록 및 크롤링 시작 실패");
  return res.json();
}

/**
 * 처리 상태 확인
 * GET /status/{product_id}
 */
export async function getProductStatus(productId) {
  const res = await apiFetch(`/status/${productId}`);
  if (!res.ok) throw new Error("상태 확인 실패");
  return res.json();
}

/**
 * 분석 결과 PDF 리턴
 * POST /analyze
 * Payload: { product_id: string }
 * Response: application/pdf (blob) or JSON
 */
export async function analyzeProduct(productId) {
  const res = await apiFetch("/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/pdf",
    },
    body: JSON.stringify({ product_id: productId }),
  });

  if (!res.ok) throw new Error("분석 리포트 생성 실패");

  // Content-Type 확인 -> PDF면 blob, 아니면 json (에러 메시지 등)
  const contentType = res.headers.get("Content-Type");
  if (contentType && contentType.includes("application/pdf")) {
    return res.blob();
  }
  return res.json();
}

/**
 * 기존 호환 크롤링 (동기 방식 추정)
 * POST /crawl
 * Payload: { product_id: string, max_reviews: number }
 */
export async function crawlProduct(payload) {
  const res = await apiFetch("/crawl", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("크롤링 실패");
  return res.json();
}

/**
 * 분석 재시작 (기존 작업 무시)
 * POST /reanalyze
 * Payload: { product_id: string }
 */
export async function reanalyzeProduct(productId) {
  const res = await apiFetch("/reanalyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ product_id: productId }),
  });
  if (!res.ok) throw new Error("분석 재시작 실패");
  return res.json();
}

/**
 * PDF 재생성
 * POST /regenerate-pdf
 * Payload: { product_id: string }
 */
export async function regeneratePdf(productId) {
  const res = await apiFetch("/regenerate-pdf", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ product_id: productId }),
  });
  if (!res.ok) throw new Error("PDF 재생성 실패");
  return res.json();
}
