// 서브 컴포넌트
export function ProjectItem({ tag, title, user, time, tagColor }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 overflow-hidden">
        <span
          className={`text-[10px] px-2 py-0.5 rounded-md border font-bold flex-shrink-0 ${tagColor}`}
        >
          {tag}
        </span>
        <span className="text-sm font-semibold text-[#344054] truncate">
          {title}
        </span>
      </div>
      <div className="text-[11px] text-[#98A2B3] flex-shrink-0 ml-2">
        {time}
      </div>
    </div>
  );
}
