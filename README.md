# 🧊 CHILLGRAM AI FE (AD Scramble)

AD Scramble 는 **식품 브랜드를 위한 AI 기반 광고 자동 생성 및 SNS 운영 플랫폼**입니다.

브랜드 제품을 등록하면,

- ✍ AI 광고 카피 생성
- 🎨 패키지 도안 생성
- 🖼 SNS 콘텐츠 생성
- 🎬 숏폼 영상 생성
- 📊 광고 성과 분석 및 리포트 제공



### 👥 R&R (Roles and Responsibilities)

| 역할 | 담당 |
| --- | --- |
| **FE** | **황태민**, 반선우, 이한조, 하태욱 |
| **BE** | **하태욱**, 오흥찬 |
| **AI** | **김채환**, 김지윤, 반선우, 오흥찬, 이한조, 황태민 |
| **DATA** | 김지윤, 하태욱 |
| **SERVER** | 오흥찬, 하태욱 |



### 🛠 Tech Stack

* **Framework**: React
* **Styling**: Tailwind CSS
* **State**: Zustand
* **Data Fetching**: React Query
* **Design**: Figma




### 📂 Project Structure

```
src/
├── api/                  # API 통신 관련 로직
│   ├── axiosInstance.ts  # Axios 공통 설정 및 인터셉터
│   └── services/         # 도메인별 API 호출 함수 (auth, post, ai 등)
├── assets/               # 이미지, 아이콘, 폰트 등 정적 리소스
├── components/           # UI 컴포넌트
│   ├── common/           # Button, Input 등 공용 원자 컴포넌트
│   ├── layout/           # Header, Navbar, Sidebar 등 레이아웃
│   └── domain/           # 특정 기능 전용 컴포넌트 (PostCard, AiGenerator 등)
├── constants/            # 에러 메시지, API 경로 등 공통 상수
├── hooks/                # 커스텀 훅
│   ├── queries/          # React Query (useQuery, useMutation) 관련 훅
│   └── useAuth.ts        # 비즈니스 로직 관련 공통 훅
├── pages/                # 라우팅 단위 페이지 컴포넌트
│   ├── Home/             # 메인 피드 페이지
│   ├── Create/           # AI 콘텐츠 생성 페이지
│   └── Profile/          # 사용자 프로필 페이지
├── store/                # Zustand 전역 상태 저장소
│   ├── useAuthStore.ts   # 유저 인증 정보
│   └── useUiStore.ts     # 모달, 토스트, 테마 등 UI 상태
├── styles/               # Tailwind Config 및 Global CSS
├── types/                # TypeScript 인터페이스 및 타입 정의
└── utils/                # 날짜 포맷, 문자열 조작 등 순수 유틸리티 함수

```





### 📝 Commit Convention

* **feat**: 기능 추가 (API/유스케이스/도메인 로직)
* **refactor**: 리팩토링 (동작 동일)
* **perf**: 성능 개선 (캐싱/렌더링 최적화)
* **docs**: 문서 수정 (README, 설계 문서 등)
* **test**: 테스트 코드 추가/수정
* **chore**: 빌드 설정, 의존성 관리, CI/CD 설정




