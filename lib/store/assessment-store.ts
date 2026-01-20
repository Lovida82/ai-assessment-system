import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  Question,
  UserAnswer,
  CategoryScore,
  AssessmentResult,
  Feedback,
  Category,
  calculateGrade,
  CATEGORY_INFO
} from '@/lib/types/assessment';
import { generateQuestionSet } from '@/lib/data/questions';

interface AssessmentState {
  // 평가 상태
  isStarted: boolean;
  isCompleted: boolean;

  // 문제 관련
  questions: Question[];
  currentQuestionIndex: number;

  // 답안 관련
  answers: UserAnswer[];

  // 시간 관련
  startTime: Date | null;
  endTime: Date | null;

  // 결과 관련
  result: AssessmentResult | null;
  feedback: Feedback | null;

  // 액션
  startAssessment: () => void;
  submitAnswer: (questionId: string, answer: string) => boolean;
  nextQuestion: () => void;
  previousQuestion: () => void;
  completeAssessment: () => void;
  resetAssessment: () => void;

  // 결과 기록
  history: AssessmentResult[];
}

export const useAssessmentStore = create<AssessmentState>()(
  persist(
    (set, get) => ({
      // 초기 상태
      isStarted: false,
      isCompleted: false,
      questions: [],
      currentQuestionIndex: 0,
      answers: [],
      startTime: null,
      endTime: null,
      result: null,
      feedback: null,
      history: [],

      // 평가 시작
      startAssessment: () => {
        const questions = generateQuestionSet();
        set({
          isStarted: true,
          isCompleted: false,
          questions,
          currentQuestionIndex: 0,
          answers: [],
          startTime: new Date(),
          endTime: null,
          result: null,
          feedback: null
        });
      },

      // 답안 제출
      submitAnswer: (questionId: string, answer: string) => {
        const { questions, answers } = get();
        const question = questions.find(q => q.id === questionId);

        if (!question) return false;

        const isCorrect = question.correct_answer === answer;

        // 기존 답안이 있으면 업데이트, 없으면 추가
        const existingIndex = answers.findIndex(a => a.questionId === questionId);
        const newAnswer: UserAnswer = {
          questionId,
          userAnswer: answer,
          isCorrect,
          answeredAt: new Date()
        };

        if (existingIndex >= 0) {
          const newAnswers = [...answers];
          newAnswers[existingIndex] = newAnswer;
          set({ answers: newAnswers });
        } else {
          set({ answers: [...answers, newAnswer] });
        }

        return isCorrect;
      },

      // 다음 문제
      nextQuestion: () => {
        const { currentQuestionIndex, questions } = get();
        if (currentQuestionIndex < questions.length - 1) {
          set({ currentQuestionIndex: currentQuestionIndex + 1 });
        }
      },

      // 이전 문제
      previousQuestion: () => {
        const { currentQuestionIndex } = get();
        if (currentQuestionIndex > 0) {
          set({ currentQuestionIndex: currentQuestionIndex - 1 });
        }
      },

      // 평가 완료
      completeAssessment: () => {
        const { questions, answers, startTime, history } = get();
        const endTime = new Date();

        // 카테고리별 점수 계산
        const categoryScores: CategoryScore[] = [];
        const categories: Category[] = ['prompt', 'data', 'workflow', 'ethics'];

        categories.forEach(category => {
          const categoryQuestions = questions.filter(q => q.category === category);
          const categoryAnswers = answers.filter(a =>
            categoryQuestions.some(q => q.id === a.questionId)
          );

          const correctCount = categoryAnswers.filter(a => a.isCorrect).length;
          const totalCount = categoryQuestions.length;
          const score = totalCount > 0 ? (correctCount / totalCount) * 100 : 0;

          categoryScores.push({
            category,
            score: Math.round(score * 10) / 10,
            correctCount,
            totalCount
          });
        });

        // 총점 계산 (가중 평균)
        const totalScore = categoryScores.reduce((sum, cs) => {
          const weight = CATEGORY_INFO[cs.category].weight;
          return sum + (cs.score * weight);
        }, 0);

        const roundedTotalScore = Math.round(totalScore * 10) / 10;
        const grade = calculateGrade(roundedTotalScore);

        // 소요 시간 계산 (초)
        const timeSpent = startTime
          ? Math.floor((endTime.getTime() - new Date(startTime).getTime()) / 1000)
          : 0;

        const result: AssessmentResult = {
          id: `assessment-${Date.now()}`,
          totalScore: roundedTotalScore,
          grade,
          categoryScores,
          startedAt: startTime || new Date(),
          completedAt: endTime,
          timeSpent
        };

        // 피드백 생성 (간단한 로컬 버전)
        const feedback = generateLocalFeedback(categoryScores, roundedTotalScore, grade);

        set({
          isCompleted: true,
          endTime,
          result,
          feedback,
          history: [...history, result]
        });
      },

      // 평가 초기화
      resetAssessment: () => {
        set({
          isStarted: false,
          isCompleted: false,
          questions: [],
          currentQuestionIndex: 0,
          answers: [],
          startTime: null,
          endTime: null,
          result: null,
          feedback: null
        });
      }
    }),
    {
      name: 'assessment-storage',
      partialize: (state) => ({ history: state.history })
    }
  )
);

// 로컬 피드백 생성 함수
function generateLocalFeedback(
  categoryScores: CategoryScore[],
  totalScore: number,
  grade: string
): Feedback {
  const strengths: string[] = [];
  const weaknesses: string[] = [];

  categoryScores.forEach(cs => {
    const categoryName = CATEGORY_INFO[cs.category].name;
    if (cs.score >= 80) {
      strengths.push(`${categoryName} 영역에서 우수한 역량을 보여주었습니다.`);
    } else if (cs.score < 60) {
      weaknesses.push(`${categoryName} 영역의 학습이 더 필요합니다.`);
    }
  });

  if (strengths.length === 0) {
    strengths.push('전반적인 AI 기초 지식을 보유하고 있습니다.');
  }

  if (weaknesses.length === 0) {
    weaknesses.push('더 심화된 AI 활용 기술을 학습하면 좋겠습니다.');
  }

  // 가장 낮은 점수 카테고리 찾기
  const lowestCategory = [...categoryScores].sort((a, b) => a.score - b.score)[0];
  const lowestCategoryName = CATEGORY_INFO[lowestCategory.category].name;

  const recommendations = [
    {
      title: `${lowestCategoryName} 역량 강화`,
      description: `${lowestCategoryName} 관련 온라인 강의를 수강하고 실습을 진행해보세요.`,
      priority: 'high' as const,
      estimatedTime: '2-4주'
    },
    {
      title: 'AI 도구 실습',
      description: '실제 업무에 AI 도구를 적용하는 연습을 해보세요.',
      priority: 'medium' as const,
      estimatedTime: '1-2주'
    },
    {
      title: 'AI 트렌드 학습',
      description: '최신 AI 기술 동향과 사례를 학습하세요.',
      priority: 'low' as const,
      estimatedTime: '지속적'
    }
  ];

  const actionItems = [
    `${lowestCategoryName} 관련 온라인 강의 1개 이상 수강하기`,
    '주 1회 이상 AI 도구를 활용한 업무 수행하기',
    'AI 관련 뉴스레터 구독 및 정기적 학습하기',
    '3개월 후 재평가를 통해 역량 향상 확인하기'
  ];

  let summary = '';
  if (totalScore >= 90) {
    summary = `축하합니다! ${grade}등급으로 AI 역량이 매우 우수합니다. 지속적인 학습으로 전문가 수준을 유지하세요.`;
  } else if (totalScore >= 75) {
    summary = `${grade}등급으로 양호한 AI 역량을 보유하고 있습니다. 약점 영역을 보완하면 더 높은 수준에 도달할 수 있습니다.`;
  } else if (totalScore >= 60) {
    summary = `${grade}등급으로 기본적인 AI 역량을 갖추고 있습니다. 체계적인 학습을 통해 역량을 향상시켜보세요.`;
  } else {
    summary = `AI 역량 강화가 필요합니다. 추천 학습 경로를 따라 기초부터 차근차근 학습해보세요.`;
  }

  return {
    summary,
    strengths,
    weaknesses,
    recommendations,
    actionItems
  };
}
