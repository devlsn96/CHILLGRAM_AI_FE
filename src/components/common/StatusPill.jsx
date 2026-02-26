export function StatusPill({ label = "진행 상태" }) {
  return (
    <span className="inline-flex items-center rounded-full bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700">
      {label}
    </span>
  );
}
