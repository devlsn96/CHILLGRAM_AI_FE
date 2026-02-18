// 상대 시간에 대한 계산 함수
export function formatRelativeTime(dateString) {
  const now = new Date();
  const target = new Date(dateString);
  const diff = Math.floor((now - target) / 1000 / 60); // 분 단위

  if (diff < 60) return `${diff}분 전`;
  if (diff < 1440) return `${Math.floor(diff / 60)}시간 전`;

  return `${Math.floor(diff / 1440)}일 전`;
}
