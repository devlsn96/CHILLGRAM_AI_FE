import Card from "../common/Card";

export function StatCard({ label, value, icon: Icon }) {
  return (
    <Card className="relative bg-white border-gray-200 shadow-md hover:shadow-lg hover:border-blue-300 transition-all duration-300 h-24 p-4 flex flex-col justify-end overflow-hidden group">
      {Icon && (
        <div className="absolute top-3 right-3 p-1.5 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
          <Icon size={16} className="text-blue-400" strokeWidth={2.5} />
        </div>
      )}
      <div className="flex flex-col text-left">
        <span className="text-[12px] font-bold text-gray-400 mb-0.5 leading-tight tracking-tight whitespace-nowrap">
          {label}
        </span>
        <p className="text-2xl font-black text-[#111827] tabular-nums leading-none">
          {value}
        </p>
      </div>
    </Card>
  );
}