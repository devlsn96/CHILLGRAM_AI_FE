import { apiFetch } from "@/lib/apiFetch";

/**
 * 프로젝트별 콘텐츠 목록 조회
 * GET /api/projects/{projectId}/contents
 */
export async function fetchProjectContents(projectId) {
    const res = await apiFetch(`/api/projects/${projectId}/contents`);
    if (!res.ok) throw new Error("콘텐츠 목록을 불러오지 못했습니다.");
    return res.json();
}

/**
 * 콘텐츠 상세 조회
 * GET /api/contents/{contentId}
 */
export async function fetchContent(contentId) {
    const res = await apiFetch(`/api/contents/${contentId}`);
    if (!res.ok) throw new Error("콘텐츠 정보를 불러오지 못했습니다.");
    return res.json();
}

/**
 * 콘텐츠의 에셋(이미지/영상) 목록 조회
 * GET /api/contents/{contentId}/assets
 */
export async function fetchContentAssets(contentId) {
    const res = await apiFetch(`/api/contents/${contentId}/assets`);
    if (!res.ok) throw new Error("에셋 목록을 불러오지 못했습니다.");
    return res.json();
}

// /**
//  * 콘텐츠 수정 (사용 안함)
//  * PUT /api/contents/{contentId}
//  */
// export async function updateContent(contentId, payload) {
//     const res = await apiFetch(`/api/contents/${contentId}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//     });
//     if (!res.ok) throw new Error("콘텐츠 수정에 실패했습니다.");
//     return res.json();
// }

/**
 * 프로젝트별 콘텐츠 및 에셋 정보를 통합하여 조회 (프론트엔드 어그리게이션)
 */
export async function fetchProjectContentsWithAssets(projectId) {
    const contents = await fetchProjectContents(projectId);

    // 각 콘텐츠별로 에셋 정보를 병렬로 가져옴
    const contentsWithAssets = await Promise.all(
        contents.map(async (content) => {
            try {
                const assets = await fetchContentAssets(content.contentId);
                return { ...content, assets };
            } catch (err) {
                console.error(`Failed to fetch assets for content ${content.contentId}:`, err);
                return { ...content, assets: [] };
            }
        })
    );

    return contentsWithAssets;
}
