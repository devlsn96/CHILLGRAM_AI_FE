import Card from "./Card";

export function StatItem({ title, value, icon: Icon, color }) {
  return (
    <Card className="flex h-32 flex-row items-center justify-between border border-gray-200 shadow-md bg-white hover:border-gray-300 hover:shadow-lg transition-all duration-300 group">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-bold tracking-tight text-gray-400">
          {title}
        </span>
        <div className="text-3xl font-black text-gray-900">{value}</div>
      </div>
      {Icon && <Icon size={40} className={color} strokeWidth={2.5} />}
    </Card>
  );
}