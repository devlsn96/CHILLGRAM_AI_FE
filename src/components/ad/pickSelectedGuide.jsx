export function pickSelectedGuide(guideResponse, selectedGuideId) {
  const guides = guideResponse?.guides ?? [];
  return guides.find((g) => String(g.id) === String(selectedGuideId)) ?? null;
}