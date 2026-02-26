# 🧊 AD SCRAMBLE – Frontend  

> 트렌드를 광고로, 광고를 성과로 연결하는 AI 마케팅 플랫폼

---

## 📌 프로젝트 개요

AD SCRAMBLE은 식품 브랜드를 위한  
**AI 기반 광고 자동 생성 및 SNS 콘텐츠 운영 플랫폼**입니다.

Frontend는 단순 UI 구현을 넘어,  
**단계형 AI 광고 생성 워크플로우를 안정적으로 제어하는 상태 중심 아키텍처**를 목표로 설계되었습니다.

광고 제작 → 콘텐츠 운영 → 성과 분석까지  
하나의 시스템으로 통합하는 것을 목표로 합니다.

---

# 🎯 프로젝트 목표

- 단계 기반 AI 광고 생성 UX 설계
- Server State / Client State 명확 분리
- 제품 중심 도메인 구조
- 고비용 AI 비동기 요청 대응 전략
- 확장 가능한 아키텍처 설계

---

# 🏗 아키텍처

## 🔹 State 관리 전략 

### 1️⃣ Server : React Query

**관리 대상**
- 제품 목록
- 광고 생성 요청
- 대시보드 데이터
- 리뷰 분석 리포트

**선택 이유**
- 자동 캐싱
- Background Refetch
- Loading / Error 상태 자동 관리
- Mutation 이후 invalidate 전략

```js
useMutation({
  mutationFn: createAdvertisement,
  onSuccess: () => {
    queryClient.invalidateQueries(["ads", productId]);
  }
});
```

---

### 2️⃣ Client : Zustand

**관리 대상**
- 로그인 사용자 정보
- 광고 생성 Step 상태
- 선택된 Guide / Copy
- 플랫폼별 콘텐츠 결과

**선택 이유**
- 보일러플레이트 최소화
- 빠른 상태 접근
- Step 기반 UX에 최적화

```js
const useAdStepStore = create((set) => ({
  step: 1,
  selectedGuide: null,
  selectedCopy: null,
  setStep: (step) => set({ step })
}));
```

---

# ✨ AI 광고 생성 Flow

광고 생성은 4단계 구조로 설계되었습니다.

```
1. 정보 입력
2. 전략 수립 (Guide 선택)
3. 카피 생성 (Copy 선택)
4. 멀티 채널 콘텐츠 생성
```

### 설계 핵심

- Step 상태 전역 관리
- 페이지 이탈 후 재진입 가능
- 요청 실패 시 복구 UX 제공
- 플랫폼별 결과 분기 렌더링
- useMutation 기반 비동기 처리

---

# 📋 핵심기능

## 🏠 랜딩 화면
- 서비스 핵심 기능 시각화
- 광고 생성 워크플로우 소개
- CTA 기반 사용자 유입 설계

---

## 📦 제품 관리 
- 제품 CRUD
- 활성 / 비활성 상태 관리
- 제품 ↔ 광고 연결 구조
- 리뷰 분석 PDF 리포트 연동

---

## ✨ AI 광고 생성 
- 단계형 광고 생성 UX
- Guide 선택 → Copy 선택 구조
- 플랫폼별 콘텐츠 자동 생성
- 비동기 AI 요청 처리 전략 적용

---

## 📊 분석 & 리포트 
- KPI 시각화 (매출, ROI, 전환율)
- SNS 채널별 성과 비교
- 트렌드 키워드 Top 20
- AI 리뷰 분석 리포트 제공

---

## 📦 패키지 디자인 생성
- Dieline 업로드
- AI 패키지 목업 생성
- 광고 이미지 → 패키지 도안 적용

---

# 📂 프로젝트 구조

```
src/
├── api/          # API 통신을 위한 API TEST 
├── app/          # 애플리케이션의 엔트리 포인트 및 전역 Provider 설정
├── assets/       # 이미지, 아이콘, 폰트 등 정적 리소스 파일
├── components/   # 재사용 가능한 UI 컴포넌트 계층
│   ├── auth/       # 인증 관련 컴포넌트
│   ├── common/     # 공통 UI 요소 (Button, Input 등)
│   ├── layout/     # 페이지 레이아웃 (Header, Footer 등)
│   ├── navigation/ # 네비게이션 및 메뉴 관련 컴포넌트
│   ├── products/   # 제품 관리 및 광고 관련 컴포넌트
│   └── sns/        # SNS 연동 및 게시 관련 컴포넌트
├── data/         # Mock 데이터, 상수 설정 및 정적 리스트
├── hooks/        # 커스텀 훅 (공통 비즈니스 로직 분리)
├── lib/          # 외부 라이브러리 커스텀 설정 및 래퍼
├── pages/        # 서비스의 개별 페이지 단위 컴포넌트
│   ├── ad/         # 광고 생성 및 관리 페이지 그룹
│   ├── oauth/      # 소셜 로그인 및 인증 페이지 그룹
│   └── qna/        # 고객 문의 및 Q&A 페이지 그룹
├── routes/       # 라우팅 경로 정의 및 접근 권한(PrivateRoute) 관리
├── services/     # 비즈니스 로직 및 서버 상태 관리
│   ├── api/        # 도메인별 API 호출 함수
│   └── queries/    # React Query(useQuery, useMutation) 정의
├── stores/       # Zustand를 활용한 전역 상태 관리 저장소
└── utils/        # 공통 유틸리티 함수 (포맷팅, 검증 로직 등)

```

---

# 🔄 고비용 비동기 요청 전략

AI 광고 생성은 고비용 비동기 요청입니다.

**대응 전략**

- useMutation 기반 요청 처리
- 요청 중 UI Lock
- 실패 시 재시도 UX
- 단계별 캐시 전략 적용
- 정확성을 위해 Optimistic Update 지양

---

# ⚡렌더링 최적화 전략

- Step 컴포넌트 분리
- 조건부 렌더링 최소화
- 리스트 key 최적화
- React Query 캐시 적극 활용
- 불필요한 전역 상태 최소화

---

# 🛠 Tech Stack

| 영역 | 기술 |
|------|------|
| Framework | React |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Routing | React Router |
| Server State | React Query |
| Client State | Zustand |
| HTTP | Axios |
| Design | Figma |

---

# 🚀 시작하기 

## 준비

- Node.js 18+
- npm

확인:

```bash
node -v
npm -v
```

---

## 설치

```bash
git clone https://github.com/chillgram/CHILLGRAM_AI_FE.git
npm install
```

---

## 환경 변수 

루트 디렉토리에 `.env` 파일 생성

```
VITE_API_BASE_URL=http://localhost:8080
```

※ Vite는 반드시 `VITE_` prefix 필요

---

## Run Development Server

```bash
npm run dev
```

기본 실행 주소:

```
http://localhost:5173
```

> AI 광고 생성 기능 테스트를 위해 Backend 서버가 실행 중이어야 합니다.

---

# 👥 Frontend Team

- 황태민 (FE Lead)
- 반선우
- 이한조
- 하태욱

---

# 📝 Commit Convention

```
feat: 기능 추가
refactor: 리팩토링
perf: 성능 개선
docs: 문서 수정
test: 테스트 코드
chore: 설정 변경
```

AD SCRAMBLE Frontend는  
단순한 화면 구현이 아닌,  
**AI 광고 생성 워크플로우를 제어하는 상태 중심 아키텍처**를 목표로 설계되었습니다.

# 🧊 AD SCRAMBLE – Frontend  
>>>>>>> 7bd70d3 (docs : README.md 수정)

> From Trend to Performance.  
> 트렌드를 광고로, 광고를 성과로 연결하는 AI 마케팅 플랫폼

---

## 📌 프로젝트 개요

AD SCRAMBLE은 식품 브랜드를 위한  
**AI 기반 광고 자동 생성 및 SNS 콘텐츠 운영 플랫폼**입니다.

Frontend는 단순 UI 구현을 넘어,  
**단계형 AI 광고 생성 워크플로우를 안정적으로 제어하는 상태 중심 아키텍처**를 목표로 설계되었습니다.

광고 제작 → 콘텐츠 운영 → 성과 분석까지  
하나의 시스템으로 통합하는 것을 목표로 합니다.

---

# 🎯 프로젝트 목표

- 단계 기반 AI 광고 생성 UX 설계
- Server State / Client State 명확 분리
- 제품 중심 도메인 구조
- 고비용 AI 비동기 요청 대응 전략
- 확장 가능한 아키텍처 설계

---

# 🏗 아키텍처

## 🔹 State 관리 전략 

### 1️⃣ Server : React Query

**관리 대상**
- 제품 목록
- 광고 생성 요청
- 대시보드 데이터
- 리뷰 분석 리포트

**선택 이유**
- 자동 캐싱
- Background Refetch
- Loading / Error 상태 자동 관리
- Mutation 이후 invalidate 전략

```js
useMutation({
  mutationFn: createAdvertisement,
  onSuccess: () => {
    queryClient.invalidateQueries(["ads", productId]);
  }
});
```

---

### 2️⃣ Client : Zustand

**관리 대상**
- 로그인 사용자 정보
- 광고 생성 Step 상태
- 선택된 Guide / Copy
- 플랫폼별 콘텐츠 결과

**선택 이유**
- 보일러플레이트 최소화
- 빠른 상태 접근
- Step 기반 UX에 최적화

```js
const useAdStepStore = create((set) => ({
  step: 1,
  selectedGuide: null,
  selectedCopy: null,
  setStep: (step) => set({ step })
}));
```

---

# ✨ AI 광고 생성 Flow

광고 생성은 4단계 구조로 설계되었습니다.

```
1. 정보 입력
2. 전략 수립 (Guide 선택)
3. 카피 생성 (Copy 선택)
4. 멀티 채널 콘텐츠 생성
```

### 설계 핵심

- Step 상태 전역 관리
- 페이지 이탈 후 재진입 가능
- 요청 실패 시 복구 UX 제공
- 플랫폼별 결과 분기 렌더링
- useMutation 기반 비동기 처리

---

# 📋 핵심기능

## 🏠 랜딩 화면
- 서비스 핵심 기능 시각화
- 광고 생성 워크플로우 소개
- CTA 기반 사용자 유입 설계

---

## 📦 제품 관리 
- 제품 CRUD
- 활성 / 비활성 상태 관리
- 제품 ↔ 광고 연결 구조
- 리뷰 분석 PDF 리포트 연동

---

## ✨ AI 광고 생성 
- 단계형 광고 생성 UX
- Guide 선택 → Copy 선택 구조
- 플랫폼별 콘텐츠 자동 생성
- 비동기 AI 요청 처리 전략 적용

---

## 📊 분석 & 리포트 
- KPI 시각화 (매출, ROI, 전환율)
- SNS 채널별 성과 비교
- 트렌드 키워드 Top 20
- AI 리뷰 분석 리포트 제공

---

## 📦 패키지 디자인 생성
- Dieline 업로드
- AI 패키지 목업 생성
- 광고 이미지 → 패키지 도안 적용

---

# 📂 프로젝트 구조

```
src/
├── api/          # API 통신을 위한 API TEST 
├── app/          # 애플리케이션의 엔트리 포인트 및 전역 Provider 설정
├── assets/       # 이미지, 아이콘, 폰트 등 정적 리소스 파일
├── components/   # 재사용 가능한 UI 컴포넌트 계층
│   ├── auth/       # 인증 관련 컴포넌트
│   ├── common/     # 공통 UI 요소 (Button, Input 등)
│   ├── layout/     # 페이지 레이아웃 (Header, Footer 등)
│   ├── navigation/ # 네비게이션 및 메뉴 관련 컴포넌트
│   ├── products/   # 제품 관리 및 광고 관련 컴포넌트
│   └── sns/        # SNS 연동 및 게시 관련 컴포넌트
├── data/         # Mock 데이터, 상수 설정 및 정적 리스트
├── hooks/        # 커스텀 훅 (공통 비즈니스 로직 분리)
├── lib/          # 외부 라이브러리 커스텀 설정 및 래퍼
├── pages/        # 서비스의 개별 페이지 단위 컴포넌트
│   ├── ad/         # 광고 생성 및 관리 페이지 그룹
│   ├── oauth/      # 소셜 로그인 및 인증 페이지 그룹
│   └── qna/        # 고객 문의 및 Q&A 페이지 그룹
├── routes/       # 라우팅 경로 정의 및 접근 권한(PrivateRoute) 관리
├── services/     # 비즈니스 로직 및 서버 상태 관리
│   ├── api/        # 도메인별 API 호출 함수
│   └── queries/    # React Query(useQuery, useMutation) 정의
├── stores/       # Zustand를 활용한 전역 상태 관리 저장소
└── utils/        # 공통 유틸리티 함수 (포맷팅, 검증 로직 등)

```

---

# 🔄 고비용 비동기 요청 전략

AI 광고 생성은 고비용 비동기 요청입니다.

**대응 전략**

- useMutation 기반 요청 처리
- 요청 중 UI Lock
- 실패 시 재시도 UX
- 단계별 캐시 전략 적용
- 정확성을 위해 Optimistic Update 지양

---

# ⚡렌더링 최적화 전략

- Step 컴포넌트 분리
- 조건부 렌더링 최소화
- 리스트 key 최적화
- React Query 캐시 적극 활용
- 불필요한 전역 상태 최소화

---

# 🛠 Tech Stack

| 영역 | 기술 |
|------|------|
| Framework | React |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Routing | React Router |
| Server State | React Query |
| Client State | Zustand |
| HTTP | Axios |
| Design | Figma |

---

# 🚀 시작하기 

## 준비

- Node.js 18+
- npm

확인:

```bash
node -v
npm -v
```

---

## 설치

```bash
git clone https://github.com/chillgram/CHILLGRAM_AI_FE.git
npm install
```

---

## 환경 변수 

루트 디렉토리에 `.env` 파일 생성

```
VITE_API_BASE_URL=http://localhost:8080
```

※ Vite는 반드시 `VITE_` prefix 필요

---

## Run Development Server

```bash
npm run dev
```

기본 실행 주소:

```
http://localhost:5173
```

> AI 광고 생성 기능 테스트를 위해 Backend 서버가 실행 중이어야 합니다.

---

# 👥 Frontend Team

- 황태민 (FE Lead)
- 반선우
- 이한조
- 하태욱

---

# 📝 Commit Convention

```
feat: 기능 추가
refactor: 리팩토링
perf: 성능 개선
docs: 문서 수정
test: 테스트 코드
chore: 설정 변경
```

AD SCRAMBLE Frontend는  
단순한 화면 구현이 아닌,  
**AI 광고 생성 워크플로우를 제어하는 상태 중심 아키텍처**를 목표로 설계되었습니다.
