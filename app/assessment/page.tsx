'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAssessmentStore } from '@/lib/store/assessment-store';
import { CATEGORY_INFO } from '@/lib/types/assessment';

export default function AssessmentPage() {
  const router = useRouter();
  const { startAssessment, isStarted, isCompleted, resetAssessment } = useAssessmentStore();

  const handleStart = () => {
    if (isStarted && !isCompleted) {
      resetAssessment();
    }
    startAssessment();
    router.push('/assessment/test');
  };

  const handleContinue = () => {
    router.push('/assessment/test');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 상단 배너 */}
      <div className="bg-gradient-to-r from-[#0f4c81] to-[#1a5f9e] text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">AI 역량 평가</h1>
          <p className="text-blue-100 text-lg">
            총 40문제 | 카테고리별 10문제 | 예상 소요 시간 20-30분
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-8">
        {/* 진행 중인 평가 알림 */}
        {isStarted && !isCompleted && (
          <Card className="mb-6 border-amber-200 bg-amber-50 shadow-lg">
            <CardContent className="py-5">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-amber-800">진행 중인 평가가 있습니다</p>
                    <p className="text-sm text-amber-600">이어서 진행하거나 새로 시작할 수 있습니다</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleContinue} className="bg-[#0f4c81] hover:bg-[#0a3255]">
                    이어서 하기
                  </Button>
                  <Button onClick={handleStart} variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-100">
                    새로 시작
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 메인 카드 */}
        <Card className="shadow-xl border-0 overflow-hidden">
          <CardHeader className="bg-white border-b border-slate-100 pb-6">
            <CardTitle className="text-xl text-slate-800">평가 안내</CardTitle>
            <CardDescription>평가를 시작하기 전에 아래 내용을 확인해주세요</CardDescription>
          </CardHeader>

          <CardContent className="p-6 space-y-8 bg-white">
            {/* 평가 영역 */}
            <div>
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-[#0f4c81] text-white rounded text-xs flex items-center justify-center">1</span>
                평가 영역
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(CATEGORY_INFO).map(([key, info], index) => (
                  <div
                    key={key}
                    className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-[#0f4c81]/20 transition-colors"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm
                      ${index === 0 ? 'bg-[#0f4c81]' :
                        index === 1 ? 'bg-emerald-500' :
                        index === 2 ? 'bg-amber-500' : 'bg-purple-500'}`}
                    >
                      <span className="text-lg font-bold">{info.weight * 100}%</span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{info.name}</p>
                      <p className="text-sm text-slate-500">10문제</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 주의사항 */}
            <div>
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-[#0f4c81] text-white rounded text-xs flex items-center justify-center">2</span>
                주의사항
              </h3>
              <div className="bg-slate-50 rounded-xl p-5 space-y-3">
                {[
                  '문제는 랜덤으로 출제되며, 각 문제는 4지선다 객관식입니다.',
                  '답안 제출 후 이전 문제로 돌아가 수정할 수 있습니다.',
                  '시간 제한은 없으나, 집중해서 풀어주세요.',
                  '모든 문제를 풀어야 결과를 확인할 수 있습니다.'
                ].map((text, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-[#0f4c81]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#0f4c81]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm text-slate-600">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 등급 기준 */}
            <div>
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-[#0f4c81] text-white rounded text-xs flex items-center justify-center">3</span>
                등급 기준
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { grade: 'S', min: 90, color: 'bg-purple-500' },
                  { grade: 'A', min: 75, color: 'bg-[#0f4c81]' },
                  { grade: 'B', min: 60, color: 'bg-emerald-500' },
                  { grade: 'C', min: 40, color: 'bg-amber-500' },
                  { grade: 'D', min: 0, color: 'bg-slate-400' }
                ].map((item) => (
                  <Badge
                    key={item.grade}
                    className={`${item.color} text-white px-4 py-2 text-sm font-medium`}
                  >
                    {item.grade} ({item.min}점↑)
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>

          {/* 시작 버튼 */}
          <div className="p-6 bg-slate-50 border-t border-slate-100">
            <div className="text-center">
              <Button
                onClick={handleStart}
                size="lg"
                className="bg-[#0f4c81] hover:bg-[#0a3255] text-white text-lg px-12 py-6 shadow-lg hover:shadow-xl transition-all"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                평가 시작하기
              </Button>
              <p className="text-sm text-slate-500 mt-4">
                시작 버튼을 클릭하면 평가가 시작됩니다
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
