/**
 * 미니 통계 컴포넌트
 */
export function MiniStat({ label, value }) {
  return (
    <div className="text-center">
      <p className="text-lg font-black text-gray-800">
        {Number(value || 0).toLocaleString()}
      </p>
      <p className="text-xs text-gray-400">{label}</p>
    </div>
  );
}
