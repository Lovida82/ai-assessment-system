'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { QuestionCard } from '@/components/assessment/QuestionCard';
import { AssessmentProgress } from '@/components/assessment/ProgressBar';
import { Timer } from '@/components/assessment/Timer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAssessmentStore } from '@/lib/store/assessment-store';

export default function TestPage() {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    isStarted,
    isCompleted,
    questions,
    currentQuestionIndex,
    answers,
    startTime,
    submitAnswer,
    nextQuestion,
    previousQuestion,
    completeAssessment
  } = useAssessmentStore();

  useEffect(() => {
    if (!isStarted) {
      router.push('/assessment');
    }
  }, [isStarted, router]);

  useEffect(() => {
    if (isCompleted) {
      router.push('/assessment/result');
    }
  }, [isCompleted, router]);

  if (!isStarted || questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#0f4c81] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-slate-600 font-medium">평가를 준비하고 있습니다...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers.find(a => a.questionId === currentQuestion.id);

  const handleSubmit = (answer: string) => {
    submitAnswer(currentQuestion.id, answer);
  };

  const handleNext = () => {
    nextQuestion();
  };

  const handlePrevious = () => {
    previousQuestion();
  };

  const handleComplete = () => {
    if (answers.length < questions.length) {
      setShowConfirm(true);
    } else {
      completeAssessment();
    }
  };

  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const unansweredCount = questions.length - answers.length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 상단 바 */}
      <div className="sticky top-16 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-slate-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <Timer startTime={startTime} isRunning={!isCompleted} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">답변 완료:</span>
              <span className="font-semibold text-[#0f4c81]">{answers.length}</span>
              <span className="text-slate-400">/</span>
              <span className="text-slate-600">{questions.length}</span>
            </div>
          </div>
          <AssessmentProgress
            current={currentQuestionIndex + 1}
            total={questions.length}
            answeredCount={answers.length}
          />
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 문제 카드 */}
        <QuestionCard
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          selectedAnswer={currentAnswer?.userAnswer}
          onSubmit={handleSubmit}
          onNext={handleNext}
          onPrevious={handlePrevious}
          isFirst={currentQuestionIndex === 0}
          isLast={isLastQuestion}
        />

        {/* 마지막 문제 완료 버튼 */}
        {isLastQuestion && currentAnswer && (
          <div className="mt-6 text-center">
            <Button
              onClick={handleComplete}
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-6 text-lg shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              평가 완료하기
            </Button>
          </div>
        )}

        {/* 문제 네비게이션 */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-slate-700">문제 바로가기</span>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 bg-emerald-500 rounded"></span> 답변완료
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 bg-[#0f4c81] rounded"></span> 현재
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 bg-slate-200 rounded"></span> 미답변
              </span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap bg-white p-4 rounded-xl border border-slate-200">
            {questions.map((q, idx) => {
              const answered = answers.some(a => a.questionId === q.id);
              const isCurrent = idx === currentQuestionIndex;
              return (
                <button
                  key={q.id}
                  onClick={() => {
                    useAssessmentStore.setState({ currentQuestionIndex: idx });
                  }}
                  className={`w-9 h-9 text-sm font-medium rounded-lg transition-all
                    ${isCurrent
                      ? 'bg-[#0f4c81] text-white shadow-md scale-110'
                      : answered
                        ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 확인 다이얼로그 */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full shadow-2xl border-0">
            <CardContent className="pt-8 pb-6 px-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">평가를 완료하시겠습니까?</h3>
                <p className="text-slate-600">
                  아직 <span className="font-semibold text-amber-600">{unansweredCount}개</span>의 문제에 답하지 않았습니다.
                  <br />답하지 않은 문제는 오답 처리됩니다.
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 border-slate-200"
                >
                  계속 풀기
                </Button>
                <Button
                  onClick={() => {
                    setShowConfirm(false);
                    completeAssessment();
                  }}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  완료하기
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
