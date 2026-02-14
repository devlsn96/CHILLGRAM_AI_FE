import { Lightbulb, Image, Sparkles, RotateCw } from "lucide-react";
import Card from "@/components/common/Card";
import { BANNER_RATIOS } from "@/data/ads";

export default function ContentGenerationSection({
  contentTypes,
  tip,
  selectedTypes,
  setSelectedTypes,
  bannerSize,
  setBannerSize,
  productImages = [],
  selectedProductImageId,
  setSelectedProductImageId,
  onRegenerateImages,
}) {
  const isBannerSelected = selectedTypes.includes("배너 이미지 AI");

  return (
    <Card className="p-8 rounded-2xl border border-gray-200 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-black text-[#3b312b]">콘텐츠 생성</h2>
        <p className="mt-1 text-sm text-[#9CA3AF]">최종 광고 콘텐츠 생성</p>
      </div>

      <div className="mb-6 flex gap-3 rounded-lg bg-green-50 p-4 text-green-700">
        <Sparkles className="mt-0.5 h-5 w-5" />
        <div>
          <p className="font-semibold">광고 콘텐츠 생성 준비 완료</p>
          <p className="mt-1 text-sm">선택한 옵션으로 광고를 생성합니다.</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Image className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-bold text-[#3b312b]">제품 이미지 AI</h3>
          </div>
          {onRegenerateImages && (
            <button
              onClick={onRegenerateImages}
              className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <RotateCw className="w-4 h-4" />
              이미지 다시 만들기
            </button>
          )}
        </div>
        <p className="text-sm text-[#9CA3AF] mb-4">
          광고에 사용할 제품 이미지를 선택하세요.
        </p>

        <div className="grid grid-cols-3 gap-4">
          {productImages.map((img) => {
            const isSelected = selectedProductImageId === img.id;
            return (
              <div
                key={img.id}
                onClick={() => setSelectedProductImageId(img.id)}
                className={`
                  relative cursor-pointer rounded-xl border-2 transition-all overflow-hidden
                  ${isSelected
                    ? "border-blue-500 ring-2 ring-blue-100 ring-offset-2"
                    : "border-gray-100 hover:border-gray-200"
                  }
                `}
              >
                <div className="aspect-square bg-gray-50 relative group">
                  <img
                    src={img.url}
                    alt={img.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {isSelected && (
                    <div className="absolute inset-0 bg-blue-500/10 flex items-center justify-center transition-opacity">
                      <div className="bg-blue-500 text-white rounded-full p-1.5 shadow-md transform scale-100 transition-transform">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className={`p-3 text-center text-sm font-bold transition-colors ${isSelected ? "bg-blue-50 text-blue-600" : "bg-white text-gray-600"
                    }`}
                >
                  {img.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mb-6">
        <p className="text-lg font-bold text-[#3b312b]">
          생성할 콘텐츠 타입 선택 (복수 선택 가능)
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {contentTypes.map((type) => {
          const Icon = type.icon;
          const selected = selectedTypes.includes(type.title);

          return (
            <button
              key={type.title}
              onClick={() =>
                setSelectedTypes((prev) =>
                  prev.includes(type.title)
                    ? prev.filter((t) => t !== type.title)
                    : [...prev, type.title],
                )
              }
              className={[
                "rounded-xl border px-4 py-3 text-left",
                selected ? "border-green-300 bg-green-50" : "border-gray-200",
              ].join(" ")}
            >
              <Icon className="mb-2 h-5 w-5" />
              <p className="font-bold">{type.title}</p>
              <p className="text-xs text-gray-500">{type.description}</p>
            </button>
          );
        })}
      </div>

      {/* 배너 이미지 AI 선택 시 사이즈 입력 노출 */}
      {isBannerSelected && (
        <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
          <p className="mb-10 text-sm font-semibold text-gray-700">
            배너 이미지 비율 선택
          </p>
          <div className="grid grid-cols-5 gap-10">
            {BANNER_RATIOS.map((ratio) => {
              const ratioText = ratio.value;
              const [w, h] = ratioText.split(":").map(Number);
              const selected = bannerSize === ratioText;

              return (
                <button
                  key={ratio.idx}
                  type="button"
                  onClick={() => setBannerSize(ratioText)}
                  className={[
                    "relative rounded-xl border-2 p-2 transition flex flex-col justify-items-start",
                    selected
                      ? "border-blue-500 text-blue-500"
                      : "border-gray-200 text-gray-500 hover:border-gray-500 hover:text-gray-500",
                  ].join(" ")}
                >
                  <div
                    className="w-full rounded-md bg-gray-200"
                    style={{ aspectRatio: `${w} / ${h}` }}
                  />

                  <span className="absolute -top-6 left-0 w-full text-center text-xs font-semibold">
                    {ratioText}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-6 flex items-start gap-2 rounded-xl bg-yellow-50 p-4 text-sm text-yellow-700">
        <Lightbulb className="mt-0.5 h-4 w-4" />
        <span>{tip}</span>
      </div>
    </Card>
  );
}
