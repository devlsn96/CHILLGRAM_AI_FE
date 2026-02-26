/** 
 * 숫자 범위 제한
 */
export function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

/** 
 * 수학 계산
 */
export function nearest(points, value) {
  return points.reduce((acc, cur) => {
    if (Math.abs(cur - value) < Math.abs(acc - value)) return cur;
    return acc;
  }, points[0]);
}