export function normalizePoints(points) {
  const arr = points
    .map((n) => Number(n))
    .filter((n) => Number.isFinite(n));

  const uniq = Array.from(new Set(arr)).sort((a, b) => a - b);

  if (uniq.length < 2) {
    throw new Error("FocusControl: points는 유효한 숫자 2개 이상이어야 합니다.");
  }
  return uniq;
}

export function toPercent(v, min, max) {
  if (max === min) return 0;
  return ((v - min) / (max - min)) * 100;
}
