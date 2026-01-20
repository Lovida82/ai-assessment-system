'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ResultSummary } from '@/components/assessment/ResultSummary';
import { useAssessmentStore } from '@/lib/store/assessment-store';

export default function ResultPage() {
  const router = useRouter();
  const { isCompleted, result, feedback, resetAssessment } = useAssessmentStore();

  useEffect(() => {
    if (!isCompleted || !result) {
      router.push('/assessment');
    }
  }, [isCompleted, result, router]);

  if (!isCompleted || !result || !feedback) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#0f4c81] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-slate-600 font-medium">결과를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  const handleRetake = () => {
    resetAssessment();
    router.push('/assessment');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 상단 배너 */}
      <div className="bg-gradient-to-r from-[#0f4c81] to-[#1a5f9e] text-white py-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">평가 결과</h1>
          <p className="text-blue-100">
            {new Date(result.completedAt).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>

      {/* 결과 컨텐츠 */}
      <div className="max-w-4xl mx-auto px-4 py-8 -mt-4">
        <ResultSummary result={result} feedback={feedback} />

        {/* 액션 버튼 */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Button
            onClick={handleRetake}
            variant="outline"
            size="lg"
            className="border-slate-300 text-slate-700 hover:bg-white"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            다시 평가하기
          </Button>
          <Link href="/dashboard">
            <Button size="lg" className="bg-[#0f4c81] hover:bg-[#0a3255] text-white">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              대시보드 보기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
