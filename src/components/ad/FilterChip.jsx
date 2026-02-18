export function FilterChip({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
        active
          ? "bg-white text-[#111827] shadow-md"
          : "bg-gray-100 text-[#9CA3AF] hover:text-[#111827]"
      }`}
    >
      {label}
    </button>
  );
}
