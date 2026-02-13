import Container from "@/components/common/Container";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";

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
    title: "데이터 입력",
    description:
      "브랜드 정보와 타깃 고객을 입력하면 AI가 시장 데이터를 자동 수집합니다.",
  },
  {
    title: "디자인 생성",
    description:
      "LLM이 컨셉을 도출하고 생성형 AI가 다양한 디자인 시안을 제작합니다.",
  },
  {
    title: "평가 및 선택",
    description: "A/B 테스트와 소비자 피드백을 통해 최종 디자인을 결정합니다.",
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
        <section className="pt-20 pb-14">
          <Container className="text-center">
            <h1 className="text-3xl font-extrabold leading-tight md:text-4xl">
              <span className="text-primary">식품 광고부터 SNS 운영까지</span>
              <br />
              AI가 한 번에
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-500">
              실시간 트렌드 분석으로 식품 광고 콘텐츠를 자동 생성하고
              <br />
              SNS 게시부터 성과 분석까지 한 번에 관리하는 올인원 플랫폼
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button onClick={handleTestApi} className="bg-red-500 text-white hover:bg-red-600">
                Backend API Test
              </Button>
            </div>
          </Container>
        </section>

        <section id="features" className="py-14">
          <Container>
            <div className="text-center">
              <h2 className="text-2xl font-bold">핵심 기능</h2>
              <p className="mt-2 text-xs text-gray-500">
                AI 기술로 식품 광고 SNS 마케팅을 완전 자동화합니다
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-4">
              {FEATURES.map((feature) => (
                <Card
                  key={feature.title}
                  className="bg-[#F3F3F3] py-6 text-center "
                >
                  <div className="mx-auto flex h-10 w-10 items-center justify-center text-lg">
                    {feature.icon}
                  </div>
                  <h3 className="mt-4 text-sm font-semibold">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-xs text-gray-500">
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-14">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold">
                AD Scramble만의 특화된 서비스는 이렇습니다.
              </h2>
              <p className="mt-2 text-xs text-gray-500">
                3단계로 완성되는 패키지 디자인
              </p>
            </div>

            <ol className="mx-auto mt-10 flex max-w-2xl flex-col gap-8">
              {STEPS.map((step, index) => (
                <li key={step.title} className="flex gap-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-700">
                    {index + 1}
                  </div>
                  <div className="text-left">
                    <h3 className="text-base font-semibold">{step.title}</h3>
                    <p className="mt-1 text-xs text-gray-500">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        <section className="bg-[#F3F3F3] py-20">
          <Container className="text-center">
            <h2 className="text-2xl font-bold">지금 바로 시작하세요</h2>
            <p className="mt-2 text-xs text-gray-500">
              5분이면 첫 번째 패키지 디자인을 완성할 수 있습니다
            </p>
          </Container>
        </section>
      </main>
    </div>
  );
}
