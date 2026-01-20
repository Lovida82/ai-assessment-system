// 카테고리 타입
export type Category = 'prompt' | 'data' | 'workflow' | 'ethics';

// 난이도 타입
export type Difficulty = 'easy' | 'medium' | 'hard';

// 등급 타입
export type Grade = 'S' | 'A' | 'B' | 'C' | 'D';

// 평가 상태
export type AssessmentStatus = 'in_progress' | 'completed' | 'abandoned';

// 선택지
export interface Option {
  id: string;
  text: string;
}

// 문제
export interface Question {
  id: string;
  category: Category;
  difficulty: Difficulty;
  question_text: string;
  options: Option[];
  correct_answer: string;
  explanation: string;
}

// 사용자 답안
export interface UserAnswer {
  questionId: string;
  userAnswer: string;
  isCorrect: boolean;
  answeredAt: Date;
}

// 카테고리별 점수
export interface CategoryScore {
  category: Category;
  score: number;
  correctCount: number;
  totalCount: number;
}

// 평가 결과
export interface AssessmentResult {
  id: string;
  totalScore: number;
  grade: Grade;
  categoryScores: CategoryScore[];
  startedAt: Date;
  completedAt: Date;
  timeSpent: number; // 초 단위
}

// 피드백
export interface Feedback {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: Recommendation[];
  actionItems: string[];
}

// 추천 학습
export interface Recommendation {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  estimatedTime: string;
}

// 카테고리 정보
export const CATEGORY_INFO: Record<Category, { name: string; weight: number; description: string }> = {
  prompt: {
    name: '프롬프트 엔지니어링',
    weight: 0.25,
    description: '명확한 지시, 컨텍스트 제공, 예시 활용, 역할 부여'
  },
  data: {
    name: '데이터 분석 & 시각화',
    weight: 0.25,
    description: '데이터 해석, 차트 생성, 인사이트 도출, AI 활용 분석'
  },
  workflow: {
    name: '워크플로우 자동화',
    weight: 0.25,
    description: '업무 프로세스 이해, 자동화 도구 활용, API 연동, 효율성 개선'
  },
  ethics: {
    name: '윤리 및 보안',
    weight: 0.25,
    description: '개인정보 보호, AI 윤리, 보안 인식, 규정 준수'
  }
};

// 등급 기준
export const GRADE_THRESHOLDS = {
  S: 90,
  A: 75,
  B: 60,
  C: 40,
  D: 0
};

// 등급 계산 함수
export function calculateGrade(score: number): Grade {
  if (score >= GRADE_THRESHOLDS.S) return 'S';
  if (score >= GRADE_THRESHOLDS.A) return 'A';
  if (score >= GRADE_THRESHOLDS.B) return 'B';
  if (score >= GRADE_THRESHOLDS.C) return 'C';
  return 'D';
}
