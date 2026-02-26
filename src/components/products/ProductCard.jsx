import Card from "@/components/common/Card";
import { StatusPill } from "../common/StatusPill";
import { ProgressBar } from "../common/ProgressBar";

export default function ProductCard({ name, category, progress = 50 }) {
  return (
    <Card className="w-130 p-10">
      <StatusPill />

      <h3 className="mt-6 text-3xl font-extrabold text-[#3b312b]">{name}</h3>
      <p className="mt-3 text-lg text-gray-600">{category}</p>

      <ProgressBar value={progress} />

      <div className="mt-10 text-sm text-gray-500">생성 일시</div>
    </Card>
  );
}
