// trend data 분리
export const TREND_KEYWORDS = [
  { title: "건강", description: "건강을 중시하는 트렌드" },
  { title: "친환경", description: "지속가능한 소비" },
  { title: "프리미엄", description: "고급화 트렌드" },
  { title: "신선함", description: "신선한 원료" },
  { title: "자연주의", description: "자연 친화적" },
];

export const TREND_HASHTAGS = [
  "#건강간식",
  "#친환경포장",
  "#프리미엄디저트",
  "#신선한과일",
  "#자연주의",
];

export const TREND_STYLE_SUMMARY =
  "현재 가장 인기 있는 스타일은 미니멀함과 자연친화적 이미지 입니다.";

export const TREND_AI_GUIDE_OPTIONS = [
  {
    title: "감성적 스토리텔링",
    description: "소비자의 감성을 자극하는 스토리 중심 광고",
    example: "예시: 따뜻한 햇살처럼 달콤한 순간을 선물합니다",
  },
  {
    title: "제품 중심 홍보",
    description: "제품의 특징을 강조하는 정보형 광고",
    example: "예시: 100% 유기농 원료, 무첨가 건강 간식",
  },
  {
    title: "트렌디한 비주얼",
    description: "최신 트렌드를 반영한 시각적 광고",
    example: "예시: 지금 가장 핫한 디저트, 인스타그램 감성",
  },
];

export const TREND_GUIDE = {
  recommendedGuideId: "local-g1",
  guides: [
    {
      id: "local-g1",
      title: "제품 중심 홍보",
      summary: "핵심 효익 1개 + 근거 1개 + 행동 유도 1개로 단순화",
      badge: "전환형",
      score: 91,
      rationale: "로컬 더미(비용 절감)",
      key_points: {
        tone: ["명확함"],
        structure: "benefit-proof-cta",
        cta: "direct",
      },
    },
    {
      id: "local-g2",
      title: "감성적 스토리텔링",
      summary: "상황→해결→변화 흐름",
      badge: "브랜드형",
      score: 78,
      rationale: "로컬 더미(비용 절감)",
      key_points: {
        tone: ["공감"],
        structure: "problem-solution",
        cta: "soft",
      },
    },
  ],
};

export const TREND_DATA = [
  {
    name: "10월",
    두쫀쿠: 10,
    발렌타인데이: 12,
    건강한간식: 15,
    프리미엄선물: 18,
    SNS바이럴: 10,
  },
  {
    name: "11월",
    두쫀쿠: 15,
    발렌타인데이: 14,
    건강한간식: 25,
    프리미엄선물: 22,
    SNS바이럴: 18,
  },
  {
    name: "12월",
    두쫀쿠: 18,
    발렌타인데이: 35,
    건강한간식: 22,
    프리미엄선물: 30,
    SNS바이럴: 25,
  },
  {
    name: "01월",
    두쫀쿠: 25,
    발렌타인데이: 42,
    건강한간식: 28,
    프리미엄선물: 35,
    SNS바이럴: 22,
  },
  {
    name: "02월",
    두쫀쿠: 30,
    발렌타인데이: 45,
    건강한간식: 24,
    프리미엄선물: 38,
    SNS바이럴: 20,
  },
  {
    name: "03월",
    두쫀쿠: 22,
    발렌타인데이: 15,
    건강한간식: 30,
    프리미엄선물: 32,
    SNS바이럴: 40,
  },
];
