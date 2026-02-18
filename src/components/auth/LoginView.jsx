import { loginApi } from "@/data/authApi";
import { useAuthStore } from "@/stores/authStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SimpleField } from "../common/SimpleField";
import { SimpleButton } from "../common/SimpleButton";

export default function LoginView({ onGoSignup, onClose }) {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const authRedirectTo = useAuthStore((s) => s.authRedirectTo);
  const clearAuthRedirect = useAuthStore((s) => s.clearAuthRedirect);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const canSubmit =
    !submitting && email.trim().length > 0 && password.trim().length > 0;

  const onLogin = async () => {
    setError("");
    setSubmitting(true);
    try {
      const data = await loginApi({ email, password });

      // accessToken을 전역 상태에 저장
      login(data.accessToken, data.user);

      onClose?.();

      // 리다이렉트 URL이 있으면 해당 URL로, 없으면 대시보드로
      const redirectTo = authRedirectTo || "/dashboard";
      clearAuthRedirect();
      navigate(redirectTo);
    } catch (e) {
      setError(e?.message || "로그인 실패");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#3b312b]">로그인</h2>
        <p className="mt-2 text-base text-[#3b312b]/70">
          AI 패키지 디자인 플랫폼
        </p>
      </div>

      <div className="mt-8 space-y-4">
        <SimpleField
          label="아이디 (이메일)"
          value={email}
          placeholder="test@test.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <SimpleField
          label="비밀번호"
          type="password"
          value={password}
          placeholder="••••••••"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {error ? (
        <div className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-lg text-red-700">
          {error}
        </div>
      ) : null}

      <SimpleButton disabled={!canSubmit} onClick={onLogin}>
        {submitting ? "로그인 중..." : "로그인"}
      </SimpleButton>

      <div className="mt-6 text-center text-sm text-black/70">
        아직 계정이 없으신가요?{" "}
        <button
          type="button"
          onClick={onGoSignup}
          className="font-semibold text-black underline underline-offset-4"
        >
          가입하기
        </button>
      </div>
    </div>
  );
}
