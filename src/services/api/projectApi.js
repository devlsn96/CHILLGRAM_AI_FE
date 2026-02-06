import { apiFetch } from "@/lib/apiFetch";

/**
 * 특정 제품의 프로젝트 목록 조회
 * GET /api/products/{id}/projects
 */
export async function fetchProjectsByProduct(productId) {
    const res = await apiFetch(`/api/products/${productId}/projects`);
    if (!res.ok) throw new Error("프로젝트 목록을 불러오지 못했습니다.");
    return res.json();
}
