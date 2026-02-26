export function SNSProgress({ icon, label, current, total, color }) {
  const percent = (current / total) * 100;
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-semibold text-[#344054]">{label}</span>
        </div>
        <span className="text-xs font-bold text-[#667085]">
          {current}/{total}
        </span>
      </div>
      <div className="w-full bg-[#F2F4F7] h-2 rounded-full overflow-hidden">
        <div
          className={`${color} h-full rounded-full transition-all duration-700`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
