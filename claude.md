# AI 역량 평가 시스템 - 개발 문서

## 프로젝트 개요

아주홀딩스 디지털혁신팀을 위한 AI 역량 평가 시스템입니다. 직원들의 AI 활용 능력을 4가지 핵심 영역에서 객관적으로 진단하고, 맞춤형 학습 경로를 제안합니다.

- **프로젝트명:** AI Assessment System
- **클라이언트:** 아주홀딩스 디지털혁신팀
- **배포 URL:** https://ai-assessment-system-sigma.vercel.app/
- **GitHub:** https://github.com/Lovida82/ai-assessment-system

---

## 기술 스택

| 구분 | 기술 |
|------|------|
| Framework | Next.js 16.1.4 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| Charts | Recharts |
| State Management | Zustand (with localStorage persistence) |
| Deployment | Vercel |

---

## 프로젝트 구조

```
ai-assessment/
├── app/
│   ├── layout.tsx          # 루트 레이아웃 (Header 포함)
│   ├── page.tsx            # 메인 랜딩 페이지
│   ├── globals.css         # 전역 스타일 (브랜드 컬러)
│   ├── assessment/
│   │   ├── page.tsx        # 평가 시작 페이지
│   │   ├── test/
│   │   │   └── page.tsx    # 문제 풀이 페이지
│   │   └── result/
│   │       └── page.tsx    # 결과 페이지
│   └── dashboard/
│       └── page.tsx        # 대시보드 페이지
├── components/
│   ├── layout/
│   │   └── Header.tsx      # 네비게이션 헤더
│   ├── assessment/
│   │   ├── QuestionCard.tsx    # 문제 카드 컴포넌트
│   │   ├── ProgressBar.tsx     # 진행률 표시
│   │   ├── Timer.tsx           # 타이머
│   │   └── ResultSummary.tsx   # 결과 요약 컴포넌트
│   ├── dashboard/
│   │   ├── RadarChart.tsx      # 레이더 차트
│   │   ├── CategoryScoreBar.tsx # 카테고리별 점수 바
│   │   └── ScoreCard.tsx       # 점수 카드
│   └── ui/                 # shadcn/ui 컴포넌트
│       ├── button.tsx
│       ├── card.tsx
│       ├── badge.tsx
│       ├── progress.tsx
│       ├── radio-group.tsx
│       └── label.tsx
├── lib/
│   ├── types/
│   │   └── assessment.ts   # 타입 정의
│   ├── data/
│   │   └── questions.ts    # 문제 데이터 (40문제)
│   ├── store/
│   │   └── assessment-store.ts  # Zustand 상태 관리
│   └── utils.ts            # 유틸리티 함수
└── public/
```

---

## 구현된 기능

### 1. 메인 페이지 (`/`)
- 히어로 섹션 (그라데이션 배경, 웨이브 디자인)
- 4대 평가 영역 카드
- 평가 프로세스 안내 (4단계)
- 등급 기준 표시 (S/A/B/C/D)
- CTA 섹션
- 푸터

### 2. 평가 시작 페이지 (`/assessment`)
- 평가 안내 및 주의사항
- 진행 중인 평가 알림 (이어서 하기/새로 시작)
- 카테고리별 가중치 표시
- 등급 기준 배지

### 3. 문제 풀이 페이지 (`/assessment/test`)
- 40문제 랜덤 출제 (카테고리당 10문제)
- 4지선다 객관식
- 실시간 타이머
- 진행률 표시
- 문제 네비게이션 (바로가기)
- 이전/다음 문제 이동
- 미완료 시 확인 다이얼로그

### 4. 결과 페이지 (`/assessment/result`)
- 종합 점수 및 등급 표시
- AI 피드백 요약
- 영역별 역량 레이더 차트
- 카테고리별 상세 점수 바
- 강점/약점 분석
- 추천 학습 경로 (우선순위별)
- 실천 과제 목록

### 5. 대시보드 (`/dashboard`)
- 최근 평가 결과 요약
- 역량 변화 추이
- 레이더 차트 & 점수 바
- 평가 히스토리 테이블
- 다음 단계 추천

---

## 평가 시스템

### 카테고리 (4개 영역)

| 카테고리 | 설명 | 가중치 |
|----------|------|--------|
| 프롬프트 엔지니어링 | AI와의 효과적인 대화 능력 | 25% |
| 데이터 분석 & 시각화 | 데이터 해석 및 시각화 능력 | 25% |
| 워크플로우 자동화 | 업무 프로세스 자동화 설계 | 25% |
| 윤리 및 보안 | AI 윤리, 개인정보 보호 | 25% |

### 등급 체계

| 등급 | 점수 범위 | 설명 |
|------|-----------|------|
| S | 90점 이상 | 최우수 |
| A | 75점 이상 | 우수 |
| B | 60점 이상 | 양호 |
| C | 40점 이상 | 보통 |
| D | 40점 미만 | 노력필요 |

### 문제 구성
- 총 40문제 (카테고리당 10문제)
- 난이도: easy / medium / hard
- 각 문제당 4개 선택지
- 정답 및 해설 포함

---

## 문제 현황 (2026-01-21 기준)

### 프롬프트 엔지니어링 (10문제)
| ID | 난이도 | 주제 |
|----|--------|------|
| prompt-1 | easy | 효과적인 질문 방법 |
| prompt-2 | easy | Few-shot (예시 제공) |
| prompt-3 | medium | Role Prompting 장점 |
| prompt-4 | medium | Chain-of-Thought |
| prompt-5 | medium | 제약 조건 명시 |
| prompt-6 | hard | AI 환각(Hallucination) |
| prompt-7 | hard | 청킹 전략 |
| prompt-8 | easy | Zero-shot vs Few-shot 차이 |
| prompt-9 | hard | Temperature 설정 |
| prompt-10 | medium | Negative Prompting |

### 데이터 분석 & 시각화 (10문제)
| ID | 난이도 | 주제 |
|----|--------|------|
| data-1 | easy | EDA 첫 단계 |
| data-2 | easy | 범주형 데이터 차트 |
| data-3 | medium | 이상치 탐지 |
| data-4 | medium | 피벗 테이블 |
| data-5 | hard | 상관관계 vs 인과관계 |
| data-6 | easy | Excel 데이터 제공 방법 |
| data-7 | medium | 대시보드 설계 |
| data-8 | hard | 과적합 방지 |
| data-9 | medium | 접근성 (색맹) |
| data-10 | hard | A/B 테스트 |

### 워크플로우 자동화 (10문제)
| ID | 난이도 | 주제 |
|----|--------|------|
| workflow-1 | easy | 자동화 첫 단계 |
| workflow-2 | easy | 이메일 자동화 주의점 |
| workflow-3 | medium | RPA 적합 업무 |
| workflow-4 | medium | API 연동 |
| workflow-5 | hard | 예외 처리 |
| workflow-6 | easy | AI 문서 작성 |
| workflow-7 | medium | ROI 계산 |
| workflow-8 | medium | AI 회의록 작성 활용 |
| workflow-9 | medium | 노코드/로우코드 |
| workflow-10 | medium | 자동화 대상 선정 우선순위 |

### 윤리 및 보안 (10문제)
| ID | 난이도 | 주제 |
|----|--------|------|
| ethics-1 | easy | 입력 금지 정보 |
| ethics-2 | easy | AI 콘텐츠 검증 |
| ethics-3 | medium | AI 편향성 |
| ethics-4 | medium | 제약회사 규정 (GMP 등) |
| ethics-5 | hard | AI 투명성 |
| ethics-6 | easy | 회사 보안 정책 |
| ethics-7 | medium | 딥페이크 위험 |
| ethics-8 | hard | 설명 가능성 |
| ethics-9 | medium | EU AI Act |
| ethics-10 | hard | 공정성 개념 |

---

## 디자인 시스템

### 브랜드 컬러 (아주홀딩스)

```css
--color-aju-primary: #0f4c81;    /* 네이비 블루 (메인) */
--color-aju-secondary: #1a5f9e;  /* 밝은 네이비 */
--color-aju-accent: #2d7bc4;     /* 액센트 블루 */
--color-aju-light: #e8f4fc;      /* 라이트 블루 */
--color-aju-dark: #0a3255;       /* 다크 네이비 */
```

### 등급별 컬러

| 등급 | 배경색 | 그라데이션 |
|------|--------|------------|
| S | purple-50 | purple-500 → purple-600 |
| A | blue-50 | #0f4c81 → #1a5f9e |
| B | emerald-50 | emerald-500 → emerald-600 |
| C | amber-50 | amber-500 → amber-600 |
| D | slate-100 | slate-400 → slate-500 |

### 카테고리별 컬러

| 카테고리 | 아이콘 배경 |
|----------|-------------|
| 프롬프트 | #0f4c81 (네이비) |
| 데이터 | #10b981 (에메랄드) |
| 워크플로우 | #f59e0b (앰버) |
| 윤리 | #8b5cf6 (퍼플) |

---

## 상태 관리 (Zustand)

### AssessmentStore 주요 상태

```typescript
interface AssessmentStore {
  // 상태
  questions: Question[];
  currentQuestionIndex: number;
  answers: UserAnswer[];
  isStarted: boolean;
  isCompleted: boolean;
  startTime: Date | null;
  result: AssessmentResult | null;
  feedback: Feedback | null;
  history: AssessmentResult[];

  // 액션
  startAssessment: () => void;
  submitAnswer: (questionId: string, answer: string) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  completeAssessment: () => void;
  resetAssessment: () => void;
}
```

### 데이터 영속성
- localStorage를 통한 히스토리 저장
- 키: `assessment-storage`
- 저장 항목: history 배열

---

## 추후 개발 로드맵 (Supabase 연동)

### 구현 순서 (의존성 기반)
```
Phase 1: Supabase 연동 & 인증 시스템
    ↓
Phase 2: 팀/부서별 관리 대시보드
    ↓
Phase 3: 재평가 및 성장 추적
    ↓
Phase 4: 맞춤형 학습 콘텐츠
    ↓
Phase 5: 실습 과제 시스템
```

---

### Phase 1: Supabase 연동 & 인증 시스템

**목표:** 모든 후속 기능의 기반

**작업 내용:**
- [ ] Supabase 프로젝트 생성 및 환경 변수 설정
- [ ] 데이터베이스 스키마 설계 (users, teams, departments, assessments)
- [ ] 로그인/회원가입 페이지 (`/login`, `/signup`)
- [ ] Auth Store 생성 (`lib/store/auth-store.ts`)
- [ ] 기존 localStorage → Supabase DB 마이그레이션

**생성 파일:**
```
lib/supabase.ts
lib/store/auth-store.ts
lib/types/user.ts
app/login/page.tsx
app/signup/page.tsx
middleware.ts
```

---

### Phase 2: 팀/부서별 관리 대시보드

**목표:** 관리자가 팀원들의 AI 역량 현황 파악

**작업 내용:**
- [ ] 권한 체계 구현 (user, team_leader, manager, admin)
- [ ] 팀 관리 기능 (생성/수정/삭제, 팀원 관리)
- [ ] 팀 대시보드 (평균 점수, 카테고리별 분석, 성장 추세)
- [ ] 부서 대시보드 (팀간 비교, 교육 필요 영역 식별)

**생성 파일:**
```
lib/types/team.ts
lib/store/team-store.ts
app/admin/teams/page.tsx
app/manager/dashboard/page.tsx
components/dashboard/TeamAnalytics.tsx
```

---

### Phase 3: 재평가 및 성장 추적

**목표:** 정기적인 재평가를 통한 성장 모니터링

**작업 내용:**
- [ ] 성장 지표 계산 (향상도, 팀 평균 대비 위치)
- [ ] 평가 비교 기능 (이전 vs 현재)
- [ ] 재평가 관리 (일정 알림, 목표 설정)
- [ ] 성장 시각화 (추세 그래프, 마일스톤 배지)

**생성 파일:**
```
lib/types/growth.ts
lib/store/growth-store.ts
app/growth/page.tsx
components/dashboard/GrowthTrendChart.tsx
components/dashboard/ComparisonCard.tsx
```

---

### Phase 4: 맞춤형 학습 콘텐츠

**목표:** 등급/카테고리별 맞춤 학습 자료 제공

**작업 내용:**
- [ ] 학습 콘텐츠 데이터 구조 설계
- [ ] 추천 알고리즘 (약점 기반, 난이도 필터링)
- [ ] 학습 진도 관리 (완료 체크, 진도율 시각화)
- [ ] 카테고리별 학습 자료 DB 구축

**생성 파일:**
```
lib/types/content.ts
lib/data/learning-contents.ts
lib/store/content-store.ts
app/learning/page.tsx
components/content/ContentCard.tsx
```

---

### Phase 5: 실습 과제 시스템

**목표:** 수준별 AI 활용 미션 부여 및 관리

**작업 내용:**
- [ ] 과제 데이터 구조 설계
- [ ] 과제 관리 기능 (생성, 할당, 피드백)
- [ ] 과제 수행 UI (목록, 제출, 피드백 확인)
- [ ] 기본 과제 DB 구축

**생성 파일:**
```
lib/types/task.ts
lib/data/practice-tasks.ts
lib/store/task-store.ts
app/tasks/page.tsx
components/task/TaskCard.tsx
```

---

### 추가 기능 (선택)
- [ ] PDF 리포트 다운로드
- [ ] 이메일 결과 발송
- [ ] 리더보드
- [ ] AI API 연동 (OpenAI)

---

## 개발 명령어

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 후 실행
npm run start

# 린트 검사
npm run lint
```

---

## 배포 정보

- **플랫폼:** Vercel
- **브랜치:** master
- **자동 배포:** GitHub push 시 자동 배포
- **도메인:** ai-assessment-system-sigma.vercel.app

---

## 변경 이력

### 2026-01-21 (문제 검토 및 수정)
- 문제 전체 검토 완료
- 중복 문제 수정:
  - prompt-8: Role Prompting → Zero-shot vs Few-shot 차이
- 부자연스러운 오답 선택지 수정:
  - data-3: "회사 로고 이미지" → "데이터 파일의 확장자"
  - data-4: "테이블 만든 날짜" → "원본 데이터 정렬 순서"
  - data-10: "담당자 사진" → "서버 하드웨어 사양"
- 난이도 조정 (비개발자용으로 수정):
  - workflow-8: 마이크로서비스 오케스트레이션 → AI 회의록 작성 활용
  - workflow-10: CI/CD AI 활용 → 자동화 대상 선정 우선순위
- 메인 페이지 "내 결과 보기" 버튼 스타일 수정 (텍스트 가시성 개선)
- GitHub 저장소 생성 및 Vercel 배포 완료

### 2026-01-20 (초기 개발)
- 프로젝트 초기 설정 (Next.js 16 + TypeScript)
- 전체 UI/UX 구현
- 40개 문제 데이터 작성
- Zustand 상태 관리 구현
- 아주홀딩스 브랜드 디자인 적용

---

## 참고 사항

- 현재는 Supabase 없이 로컬 스토리지만 사용
- 문제 데이터는 `/lib/data/questions.ts`에 하드코딩
- 피드백은 로컬에서 생성 (`generateLocalFeedback` 함수)
- 추후 실제 AI API 연동 가능 (OpenAI 등)

---

## Git 커밋 히스토리

```
7ba1ce1 fix: Simplify workflow-8 and workflow-10 for general users
a556eda fix: Update duplicate and implausible question options
1d39425 docs: Add claude.md project documentation
fd9ab84 Initial commit: AI Assessment System for Aju Holdings
```
