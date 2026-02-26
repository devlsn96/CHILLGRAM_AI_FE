import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import { Field } from "@/components/common/Field";
import { SelectField } from "@/components/common/SelectField";
import { fetchQuestion, updateQuestion } from "@/services/api/qnaApi";
import { useAuthStore } from "@/stores/authStore";
import { CATEGORY_MAP } from "@/data/qnaData";

export default function QnaEditPage() {
  const { questionId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const bootstrapped = useAuthStore((s) => s.bootstrapped);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState(1);
  const [file, setFile] = useState(null);

  const {
    data: question,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["question", questionId],
    queryFn: () => fetchQuestion(questionId),
    enabled: bootstrapped,
  });

  // 질문 데이터 로드 후 폼에 채우기
  useEffect(() => {
    if (question) {
      setTitle(question.title || "");
      setContent(question.content || question.body || "");
      setCategoryId(question.categoryId || question.category_id || 1);
    }
  }, [question]);

  const updateMutation = useMutation({
    mutationFn: (payload) => updateQuestion(questionId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["question", questionId] });
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      navigate(`/qna/${questionId}`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }
    updateMutation.mutate({
      title,
      content,
      categoryId,
      file,
    });
  };

  const categoryOptions = CATEGORY_MAP.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="py-10">
        <Container>
          <div className="mx-auto max-w-5xl">
            <div className="rounded-3xl border border-gray-200 bg-white p-10 shadow-sm">
              <h1 className="text-2xl font-bold text-gray-900">질문 수정</h1>

              {isLoading && (
                <p className="mt-4 text-sm text-gray-500">
                  질문을 불러오는 중...
                </p>
              )}

              {isError && (
                <p className="mt-4 text-sm text-red-500">
                  질문을 불러오지 못했습니다.
                </p>
              )}

              {question && (
                <form onSubmit={handleSubmit} className="mt-8 space-y-8">
                  {/* 카테고리 선택 */}
                  <SelectField
                    label="카테고리"
                    value={categoryId}
                    onChange={(val) => setCategoryId(Number(val))}
                    options={categoryOptions}
                    className="h-12"
                  />

                  {/* 제목 입력 */}
                  <Field
                    label="제목"
                    value={title}
                    onChange={setTitle}
                    placeholder="질문 제목을 입력하세요"
                    className="h-12"
                  />

                  {/* 내용 입력 */}
                  <div>
                    <label className="mb-3 block text-sm font-bold text-gray-900">
                      내용
                    </label>
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="질문 내용을 입력하세요"
                      rows={12}
                      className="w-full rounded-xl border border-gray-200 bg-white p-5 text-sm text-gray-700 placeholder-gray-400 outline-none ring-0 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-none"
                    />
                  </div>

                  {/* 파일 첨부 */}
                  <div>
                    <label className="mb-2 block text-sm font-bold text-gray-900">
                      파일 첨부 (선택)
                    </label>
                    <input
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      className="w-full text-sm text-gray-500 file:mr-4 file:rounded-xl file:border-0 file:bg-primary/10 file:px-6 file:py-3 file:text-sm file:font-bold file:text-primary hover:file:bg-primary/20 transition-all cursor-pointer"
                    />
                    {question.gcsImageUrl && !file && (
                      <p className="mt-2 text-xs text-gray-400">
                        * 새로운 파일을 업로드하면 기존 파일이 대체됩니다.
                      </p>
                    )}
                  </div>

                  {/* 버튼 */}
                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                    <Button
                      type="button"
                      variant="secondary"
                      className="h-12 border border-gray-300 bg-white px-8 text-sm font-bold text-gray-700 hover:bg-gray-50 rounded-xl"
                      onClick={() => navigate(`/qna/${questionId}`)}
                    >
                      취소
                    </Button>
                    <Button
                      type="submit"
                      className="h-12 bg-primary px-8 text-sm font-bold text-white hover:bg-primary/90 rounded-xl shadow-md hover:shadow-lg transition-all"
                      disabled={updateMutation.isPending}
                    >
                      {updateMutation.isPending ? "수정 중..." : "수정 완료"}
                    </Button>
                  </div>

                  {updateMutation.isError && (
                    <p className="text-sm text-red-500">
                      질문 수정에 실패했습니다.
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
