export function ProgressBar({ value = 70 }) {
  const safe = Math.max(0, Math.min(100, value));

  return (
    <div className="mt-2">
      <div className="mb-2 flex items-center justify-between text-sm text-gray-600">
        <span>진행률</span>
        <span>{safe} %</span>
      </div>

      <div className="h-3 w-full rounded-full bg-gray-200">
        <div
          className="h-3 rounded-full bg-gray-500"
          style={{ width: `${safe}%` }}
        />
      </div>
    </div>
  );
}
