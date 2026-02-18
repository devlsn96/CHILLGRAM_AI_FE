import Container from "@/components/common/Container";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import { Package, Instagram, Youtube, Wand2, ArrowRight } from "lucide-react";

const FEATURES = [
  {
    title: "AI 광고 생성",
    description:
      "실시간 트렌드 데이터를 분석하여 최적의 광고 콘텐츠를 AI가 생성합니다.",
    icon: "🎨",
  },
  {
    title: "SNS 자동 운영",
    description: "예약 게시, 자동 발행으로 SNS 운영을 완전 자동화합니다.",
    icon: "📱",
  },
  {
    title: "패키지 디자인",
    description:
      "원하는 도면에 AI로 생성한 이미지가 적용된 패키지 도면을 생성합니다.​",
    icon: "🖼️",
  },
  {
    title: "레포트 분석​",
    description:
      "인사이트 분석, 트렌드 리포트로 데이터 기반 마케팅을 실현합니다.",
    icon: "📈",
  },
];

const STEPS = [
  {
    title: "데이터 기반 판단",
    description:
      "브랜드 정보와 타깃 고객을 입력하면, AI가 시장 데이터와 트렌드를 자동 분석합니다.",
  },
  {
    title: "전략 컨셉 도출",
    description:
      "LLM이 분석 결과를 바탕으로, 브랜드 포지셔닝과 디자인 방향성을 구조화합니다.",
  },
  {
    title: "생성형 AI 디자인 제작",
    description:
      "도출된 전략을 기반으로, 다양한 패키지 디자인 시안을 자동 생성합니다.",
  },
  {
    title: "결과 분석 및 운영 기록 축적",
    description:
      "프로젝트 결과와 리뷰 데이터를 정리·보관하여, 다음 전략 수립의 참고 데이터로 활용합니다.",
  },
];

import { apiFetch } from "@/lib/apiFetch";

export default function HomePage() {
  const handleTestApi = async () => {
    try {
      const res = await apiFetch("/api/users/hello");
      const text = await res.text();
      alert(`API Response: ${text}`);
    } catch (e) {
      alert(`API Error: ${e.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32 bg-white">
          <Container>
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              {/* Left: Text Content */}
              <div className="text-center lg:text-left">
                <h1 className="text-4xl font-black leading-tight tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                  식품 광고부터
                  <br />
                  <span className="text-blue-600">SNS 운영까지,</span>
                  <br />
                  AI가 한 번에.
                </h1>
                <p className="mt-6 text-lg font-medium text-gray-500 md:text-xl leading-relaxed">
                  복잡한 마케팅 고민은 이제 그만.
                  <br className="hidden md:block" />
                  트렌드 분석부터 디자인 생성, 자동 업로드까지
                  <br className="hidden md:block" />
                  클릭 한 번으로 비즈니스를 성장시키세요.
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                  <Button
                    onClick={() => (window.location.href = "/dashboard")}
                    className="h-14 rounded-full bg-blue-600 px-8 text-lg font-bold text-white shadow-xl shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-2xl hover:-translate-y-1 active:scale-95"
                  >
                    무료로 시작하기
                  </Button>
                  <Button
                    variant="outline"
                    className="h-14 rounded-full border-2 border-gray-200 px-8 text-lg font-bold text-gray-600 transition-all hover:border-gray-300 hover:bg-gray-50 active:scale-95"
                  >
                    서비스 소개서
                  </Button>
                </div>

                {/* Micro Social Proof */}
                <div className="mt-8 flex items-center justify-center gap-4 lg:justify-start">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-gray-200" />
                    ))}
                  </div>
                  <p className="text-sm font-medium text-gray-400">
                    이미 <span className="text-gray-900 font-bold">1,200+</span>개의 브랜드가 사용 중입니다.
                  </p>
                </div>
              </div>

              {/* Right: Visual Element (Core Workflow Demo) */}
              <div className="relative mx-auto w-full max-w-lg lg:max-w-none perspective-1000">
                <div className="relative rounded-3xl bg-white p-6 shadow-2xl border border-gray-100 overflow-hidden transform transition-all hover:scale-[1.01] duration-500">
                  {/* Background Decorations */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -z-10 opacity-60 animate-pulse"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl -z-10 opacity-60 animate-pulse delay-700"></div>

                  <div className="flex flex-col gap-6">
                    {/* Step 1: Input */}
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm relative overflow-hidden group">
                      <div className="absolute right-0 top-0 h-full w-1 bg-blue-500 group-hover:w-full transition-all duration-500 opacity-10"></div>
                      <div className="h-16 w-16 rounded-xl bg-white shadow-md flex items-center justify-center text-3xl border border-gray-100 z-10">
                        🥤
                      </div>
                      <div className="z-10">
                        <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded-full">Input</span>
                        <p className="text-sm font-bold text-gray-900 mt-1">탄산음료 제품 사진</p>
                        <p className="text-xs text-gray-500 mt-0.5">#여름 #청량함 #MZ세대 트렌드 반영</p>
                      </div>
                    </div>

                    {/* Arrow Down - AI Transformation */}
                    <div className="flex justify-center -my-3 relative z-20">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-full shadow-lg shadow-purple-200 animate-bounce">
                        <Wand2 size={24} strokeWidth={2.5} />
                      </div>
                    </div>

                    {/* Step 2: Output Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Package Design (Large) */}
                      <div className="col-span-2 p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-blue-100 relative group overflow-hidden shadow-sm hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[10px] font-bold text-indigo-600 bg-white/80 backdrop-blur px-2 py-1 rounded-full shadow-sm">AI Package Design</span>
                          <Package size={16} className="text-indigo-400" />
                        </div>
                        <div className="flex justify-center items-center py-2 relative">
                          <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                          <div className="h-28 w-24 bg-gradient-to-b from-blue-400 to-indigo-500 rounded-lg shadow-lg flex flex-col items-center justify-center text-white border-b-4 border-indigo-700 transform group-hover:scale-105 transition-transform">
                            <span className="text-2xl drop-shadow-md">🌊</span>
                            <span className="text-[10px] font-bold mt-1 opacity-90">COOL SODA</span>
                          </div>
                        </div>
                        <p className="text-center text-xs text-indigo-800 font-medium mt-2">"여름 시즌 한정 패키지"</p>
                      </div>

                      {/* SNS Content */}
                      <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm relative group hover:border-pink-200 transition-colors">
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center gap-1">
                            <Instagram size={14} className="text-pink-500" />
                            <span className="text-[10px] font-bold text-gray-500">Instagram</span>
                          </div>
                        </div>
                        <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden relative group-hover:shadow-inner transition-all">
                          <div className="absolute inset-0 bg-gradient-to-tr from-pink-100/50 to-transparent"></div>
                        </div>
                        <p className="mt-2 text-[10px] text-gray-400 font-medium">SNS 광고 소재</p>
                      </div>

                      {/* Video Content */}
                      <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm relative group hover:border-red-200 transition-colors">
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center gap-1">
                            <Youtube size={14} className="text-red-500" />
                            <span className="text-[10px] font-bold text-gray-500">Shorts</span>
                          </div>
                        </div>
                        <div className="aspect-square bg-gray-900 rounded-lg flex items-center justify-center text-white relative group-hover:scale-[1.02] transition-transform shadow-md">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg"></div>
                          <div className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                            <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent ml-0.5"></div>
                          </div>
                        </div>
                        <p className="mt-2 text-[10px] text-gray-400 font-medium">숏폼 영상 생성</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Features Section (Bento Grid) */}
        <section id="features" className="py-24 bg-gray-50">
          <Container>
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-black text-gray-900 md:text-4xl">
                비즈니스에 필요한<br className="md:hidden" /> 모든 기능을 하나로.
              </h2>
              <p className="mt-4 text-gray-500">
                기획부터 제작, 운영까지 AI가 당신의 마케팅 팀이 되어드립니다.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3 md:grid-rows-2">
              {/* Feature 1 (Large) */}
              <div className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl md:col-span-2 md:row-span-2">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
                  🎨
                </div>
                <h3 className="text-2xl font-bold text-gray-900">AI 광고 생성</h3>
                <p className="mt-2 text-gray-500 leading-relaxed">
                  실시간 트렌드 데이터를 분석하여<br />
                  클릭을 부르는 최적의 광고 소재를<br />
                  단 몇 초 만에 생성합니다.
                </p>
                <div className="absolute bottom-0 right-0 h-64 w-64 translate-x-12 translate-y-12 rounded-full bg-blue-50 opacity-50 blur-3xl transition-transform group-hover:scale-150"></div>
                {/* Simulated UI Mockup inside card */}
                <div className="mt-8 flex gap-4 overflow-hidden opacity-80">
                  <div className="h-40 w-32 rounded-xl bg-gray-100 shadow-md transform -rotate-6"></div>
                  <div className="h-40 w-32 rounded-xl bg-blue-50 shadow-md transform rotate-3"></div>
                  <div className="h-40 w-32 rounded-xl bg-gray-100 shadow-md transform -rotate-2"></div>
                </div>
              </div>

              {/* Feature 2 (Medium) */}
              <div className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-2xl">
                  🖼️
                </div>
                <h3 className="text-xl font-bold text-gray-900">패키지 디자인</h3>
                <p className="mt-2 text-sm text-gray-500">
                  제품 도면에 AI 아트를 입혀<br />
                  시선을 사로잡는 패키지를 만드세요.
                </p>
              </div>

              {/* Feature 3 (Medium) */}
              <div className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-2xl">
                  📱
                </div>
                <h3 className="text-xl font-bold text-gray-900">SNS 자동 운영</h3>
                <p className="mt-2 text-sm text-gray-500">
                  예약 게시부터 해시태그 추천까지,<br />
                  SNS 관리를 자동화하세요.
                </p>
              </div>
            </div>

            {/* Feature 4 (Wide - Data Analysis) */}
            <div className="mt-6 rounded-3xl bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl md:flex md:items-center md:justify-between">
              <div className="md:w-1/2">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-2xl">
                  📈
                </div>
                <h3 className="text-2xl font-bold text-gray-900">데이터 분석 리포트</h3>
                <p className="mt-2 text-gray-500">
                  어떤 소재가 반응이 좋은지, AI가 성과를 분석하고<br className="hidden md:block" />
                  다음 마케팅 전략을 제안합니다.
                </p>
              </div>
              <div className="mt-8 md:mt-0 md:w-1/2 flex justify-end">
                {/* Abstract Chart Visual */}
                <div className="flex items-end gap-2 h-32 w-full max-w-sm">
                  <div className="w-1/5 bg-gray-100 rounded-t-lg h-[40%]"></div>
                  <div className="w-1/5 bg-gray-200 rounded-t-lg h-[60%]"></div>
                  <div className="w-1/5 bg-blue-200 rounded-t-lg h-[50%]"></div>
                  <div className="w-1/5 bg-blue-400 rounded-t-lg h-[80%]"></div>
                  <div className="w-1/5 bg-blue-600 rounded-t-lg h-[90%] relative">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs font-bold px-2 py-1 rounded">Best</div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Process Section (Horizontal Flow) */}
        <section className="py-24 bg-white">
          <Container>
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-black text-gray-900">
                4단계로 완성되는<br className="md:hidden" /> 초간단 워크플로우
              </h2>
              <p className="mt-4 text-gray-500">
                복잡한 과정은 AI에게 맡기세요. 당신은 결정만 하면 됩니다.
              </p>
            </div>

            <div className="relative">
              {/* Connecting Line (Desktop) */}
              <div className="absolute top-12 left-0 w-full h-0.5 bg-gray-100 hidden md:block -z-10"></div>

              <div className="grid gap-12 md:grid-cols-4 md:gap-4">
                {STEPS.map((step, index) => (
                  <div key={step.title} className="relative flex flex-col items-center text-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white border-8 border-gray-50 shadow-sm text-2xl font-black text-blue-600 mb-6 z-10">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed max-w-[200px]">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* CTA Footer Section */}
        <section className="py-24 bg-gray-900 text-center">
          <Container>
            <h2 className="text-3xl font-black text-white md:text-4xl">
              지금 바로 마케팅의 변화를<br className="md:hidden" /> 경험하세요.
            </h2>
            <p className="mt-6 text-gray-400">
              5분이면 첫 번째 인공지능 광고 캠페인을 시작할 수 있습니다.
            </p>
            <div className="mt-10">
              <Button
                onClick={() => (window.location.href = "/dashboard")}
                className="h-14 rounded-full bg-blue-600 px-10 text-lg font-bold text-white shadow-lg shadow-blue-900/50 transition-all hover:bg-blue-500 hover:scale-105 active:scale-95"
              >
                무료로 시작하기
              </Button>
            </div>
          </Container>
        </section>
      </main>
    </div>
  );
}
