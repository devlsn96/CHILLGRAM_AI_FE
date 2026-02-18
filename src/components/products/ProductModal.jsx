import { X } from "lucide-react";
import { Field } from "../common/Field";
import { TextAreaField } from "../common/TextAreaField";
import { useState } from "react";
import Button from "../common/Button";

/**
 *  모달 컴포넌트
 */
export function ProductModal({
  title,
  confirmLabel,
  onClose,
  initialData,
  onSubmit,
  isSubmitting,
}) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    category: initialData?.category || "",
    reviewUrl: initialData?.reviewUrl || initialData?.review_url || "",
    description: initialData?.description || initialData?.desc || "",
    isActive: initialData ? !!initialData.isActive : undefined,
  });

  const isEdit = !!initialData;

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-lg p-8 relative shadow-xl animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{title}</h2>
          <p className="text-gray-500 text-sm">
            {isEdit ? "제품 정보를 수정하세요" : "제품 정보를 입력하세요"}
          </p>
        </div>

        <div className="space-y-5">
          <Field
            label="제품명"
            placeholder="프리미엄 초콜릿"
            value={formData.name}
            onChange={(val) => setFormData({ ...formData, name: val })}
            className="w-full"
          />

          <Field
            label="카테고리"
            placeholder="초콜릿"
            value={formData.category}
            onChange={(val) => setFormData({ ...formData, category: val })}
            className="w-full"
          />

          <Field
            label="리뷰사이트 URL"
            placeholder="https://example.com/reviews"
            value={formData.reviewUrl}
            onChange={(val) => setFormData({ ...formData, reviewUrl: val })}
            className="w-full"
          />

          <TextAreaField
            label="설명"
            rows={3}
            placeholder={isEdit ? "" : "제품에 대한 설명을 입력하세요"}
            value={formData.description}
            onChange={(val) => setFormData({ ...formData, description: val })}
            className="w-full"
          />

          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={onClose}
              className="rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              취소
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="rounded-lg hover:bg-blue-500 shadow-sm transition-all disabled:opacity-50"
            >
              {isSubmitting ? "처리 중..." : confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 