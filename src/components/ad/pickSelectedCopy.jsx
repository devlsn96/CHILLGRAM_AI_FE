export function pickSelectedCopy(copyResponse, selectedCopyId) {
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