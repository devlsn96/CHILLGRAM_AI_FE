import { Link, useNavigate } from "react-router-dom";
import { SignupForm } from "@/components/auth/SignupForm";

export default function SignupPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-[calc(100vh-64px)] bg-[#DEEEFF]">
      <section className="mx-auto flex min-h-[calc(100vh-64px)] max-w-lg items-center justify-center px-4 py-10">
        <div className="w-full rounded-[24px] bg-white px-8 py-10 shadow-xl">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#3b312b]">회원가입</h1>
            <p className="mt-2 text-base text-[#3b312b]/70">
              AI 패키지 디자인 플랫폼
            </p>
          </div>

          <SignupForm onSuccess={() => navigate("/")} />

          <div className="mt-6 text-center text-sm text-black/70">
            이미 계정이 있으신가요?{" "}
            <Link
              to="/"
              className="font-semibold text-black underline underline-offset-4"
            >
              로그인
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
