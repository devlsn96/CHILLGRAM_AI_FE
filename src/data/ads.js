// 제목에서 create 제거
import {
  Clapperboard,
  Image,
  ImageIcon,
  ImageUp,
  LayoutGrid,
  Megaphone,
  Package,
  Share2,
  Smartphone,
  Video,
} from "lucide-react";

export const TYPE_CONFIG = {
  design: { label: "도안", icon: LayoutGrid },
  product: { label: "제품 이미지", icon: ImageIcon },
  sns: { label: "SNS 이미지", icon: Share2 },
  shorts: { label: "숏츠", icon: Video },
  banner: { label: "배너", icon: Megaphone },
};

export const TYPE_TITLES = {
  design: "패키지 도안 AI",
  product: "제품 이미지 AI",
  sns: "SNS 이미지 AI",
  shorts: "숏츠 AI",
  banner: "배너 이미지 AI",
};

// PRODUCT_OPTIONS는 PRODUCTS로 대체
// - label >> name으로 대체
// - value >> value로 대체

// STEP_LABELS >> ad.js로 분리
export const STEP_LABELS = [
  "정보 입력",
  "가이드 선택",
  "광고 문구 선택",
  "콘텐츠 생성",
];

export const AD_GOAL_OPTIONS = [
  {
    value: 0,
    label: "인지/주목 유도 (시즌·이벤트 시작 알림)",
    description: "이벤트나 시즌을 알리며 사용자의 관심을 유도합니다.",
  },
  {
    value: 1,
    label: "공감/응원 메시지 (상황에 감정적으로 연결)",
    description: "특정 상황에 공감하며 감정적인 연결을 만듭니다.",
  },
  {
    value: 2,
    label: "보상/위로 메시지 (끝난 뒤 휴식·리프레시)",
    description: "노력 이후의 감정을 위로하고 휴식을 제안합니다.",
  },
  {
    value: 3,
    label: "참여 유도 (댓글·공유·이벤트 참여 유도)",
    description: "콘텐츠 참여나 이벤트 행동을 자연스럽게 유도합니다.",
  },
  {
    value: 4,
    label: "행동 유도 (상품 확인·구매/방문 유도)",
    description: "상품 확인 또는 구매 행동을 유도합니다.",
  },
];

export const CONTENT_TIP =
  "여러 타입을 선택하여 다양한 채널에 맞는 광고를 한 번에 생성할 수 있습니다.";

export const TREND_SUMMARY =
  "현재 시즌에 맞는 이벤트를 분석해 광고에 활용할 키워드를 추천합니다.";

// trend관련 데이터(TREND_KEYWORDS TREND_HASHTAGS TREND_STYLE_SUMMARY TREND_AI_GUIDE_OPTIONS)는 trend 데이터로 분리

// API에서 제공받을 예정
// 광고 카피문구 생성 데이터
export const AD_COPY_OPTIONS = [
  {
    title: "행복한 순간",
    description:
      "작은 행복이 모여 큰 추억이 됩니다. 당신의 특별한 순간을 더욱 달콤하게.",
  },
  {
    title: "따뜻한 마음",
    description:
      "마음을 담아 정성스럽게 만든 달콤함. 소중한 사람과 함께 나누세요.",
  },
  {
    title: "일상의 여유",
    description: "바쁜 하루 속 작은 쉼표. 달콤한 여유로 일상을 채워보세요.",
  },
];

export const AD_CONTENT_TYPE_OPTIONS = [
  {
    value: "SNS",
    title: "SNS 이미지 AI",
    description: "소셜미디어용 이미지",
    icon: Smartphone,
  },
  {
    value: "VIDEO", // 숏츠는 VIDEO로 처리
    title: "숏츠 AI",
    description: "짧은 영상 콘텐츠",
    icon: Clapperboard,
  },
  {
    value: "BANNER",
    title: "배너 이미지 AI",
    description: "광고 배너 이미지",
    icon: ImageUp,
  },
];

export const BANNER_RATIOS = [
  { idx: 1, value: "1:1" },
  { idx: 2, value: "2:3" },
  { idx: 3, value: "3:2" },
  { idx: 4, value: "3:4" },
  { idx: 5, value: "4:3" },
  { idx: 6, value: "4:5" },
  { idx: 7, value: "5:4" },
  { idx: 8, value: "9:16" },
  { idx: 9, value: "16:9" },
  { idx: 10, value: "21:9" },
];

export const AD_COPY = {
  recommendedCopyId: "c3",
  copies: [
    {
      id: "c1",
      title: "행복한 순간",
      body: "작은 행복이 모여 큰 추억이 됩니다.\n당신의 특별한 순간을 더 달콤하게.",
    },
    {
      id: "c2",
      title: "따뜻한 마음",
      body: "마음을 담아 정성스럽게 만든 달콤함.\n소중한 사람과 함께 나누세요.",
    },
    {
      id: "c3",
      title: "일상의 여유",
      body: "바쁜 하루 속 작은 쉼표.\n달콤한 여유로 일상을 채워보세요.",
    },
    {
      id: "c4",
      title: "오늘의 리셋",
      body: "지친 하루를 가볍게 리셋.\n한 입으로 기분까지 환해집니다.",
    },
    {
      id: "c5",
      title: "선물 같은 한입",
      body: "특별한 날이 아니어도 좋아요.\n오늘을 선물처럼 만드는 한 입.",
    },
  ],
};
