'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SkillRadarChart } from '@/components/dashboard/RadarChart';
import { CategoryScoreBar } from '@/components/dashboard/CategoryScoreBar';
import { useAssessmentStore } from '@/lib/store/assessment-store';
import { CATEGORY_INFO } from '@/lib/types/assessment';

const GRADE_STYLES: Record<string, { bg: string; gradient: string; text: string }> = {
  'S': { bg: 'bg-purple-50', gradient: 'from-purple-500 to-purple-600', text: 'text-purple-600' },
  'A': { bg: 'bg-blue-50', gradient: 'from-[#0f4c81] to-[#1a5f9e]', text: 'text-[#0f4c81]' },
  'B': { bg: 'bg-emerald-50', gradient: 'from-emerald-500 to-emerald-600', text: 'text-emerald-600' },
  'C': { bg: 'bg-amber-50', gradient: 'from-amber-500 to-amber-600', text: 'text-amber-600' },
  'D': { bg: 'bg-slate-100', gradient: 'from-slate-400 to-slate-500', text: 'text-slate-600' }
};

export default function DashboardPage() {
  const { history, result, isCompleted } = useAssessmentStore();

  const latestResult = isCompleted && result ? result : history[history.length - 1];

  if (!latestResult) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="bg-gradient-to-r from-[#0f4c81] to-[#1a5f9e] text-white py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">내 AI 역량 대시보드</h1>
            <p className="text-blue-100">평가 결과와 성장 추이를 확인하세요</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-16">
          <Card className="border-0 shadow-xl">
            <CardContent className="py-16">
              <div className="text-center">
                <div className="w-24 h-24 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-3">아직 평가 기록이 없습니다</h2>
                <p className="text-slate-500 mb-8 max-w-md mx-auto">
                  AI 역량 평가를 완료하면 여기에서 상세한 결과와 성장 추이를 확인할 수 있습니다.
                </p>
                <Link href="/assessment">
                  <Button size="lg" className="bg-[#0f4c81] hover:bg-[#0a3255] text-white px-8">
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    첫 평가 시작하기
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}분 ${secs}초`;
  };

  const previousResult = history.length > 1 ? history[history.length - 2] : null;
  const improvement = previousResult
    ? latestResult.totalScore - previousResult.totalScore
    : 0;

  const gradeStyle = GRADE_STYLES[latestResult.grade];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 상단 배너 */}
      <div className="bg-gradient-to-r from-[#0f4c81] to-[#1a5f9e] text-white py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">내 AI 역량 대시보드</h1>
              <p className="text-blue-100">
                마지막 평가: {formatDate(latestResult.completedAt)}
              </p>
            </div>
            <Link href="/assessment">
              <Button size="lg" className="bg-white text-[#0f4c81] hover:bg-blue-50">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                새로운 평가 시작
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 -mt-6">
        {/* 점수 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* 전체 점수 */}
          <Card className={`${gradeStyle.bg} border-0 shadow-lg overflow-hidden`}>
            <CardContent className="py-6">
              <p className="text-sm font-medium text-slate-500 mb-3">전체 점수</p>
              <div className="flex items-center justify-between">
                <div className={`text-5xl font-bold ${gradeStyle.text}`}>
                  {latestResult.totalScore.toFixed(1)}
                </div>
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${gradeStyle.gradient} text-white flex items-center justify-center text-2xl font-bold shadow-lg`}>
                  {latestResult.grade}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 소요 시간 */}
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="py-6">
              <p className="text-sm font-medium text-slate-500 mb-3">소요 시간</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#0f4c81]/10 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#0f4c81]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-slate-800">{formatTime(latestResult.timeSpent)}</div>
              </div>
            </CardContent>
          </Card>

          {/* 역량 변화 */}
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="py-6">
              <p className="text-sm font-medium text-slate-500 mb-3">역량 변화</p>
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  improvement > 0 ? 'bg-emerald-100' :
                  improvement < 0 ? 'bg-red-100' : 'bg-slate-100'
                }`}>
                  {improvement > 0 ? (
                    <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  ) : improvement < 0 ? (
                    <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
                    </svg>
                  )}
                </div>
                <div>
                  <div className={`text-3xl font-bold ${
                    improvement > 0 ? 'text-emerald-600' :
                    improvement < 0 ? 'text-red-600' : 'text-slate-600'
                  }`}>
                    {improvement > 0 ? '+' : ''}{improvement.toFixed(1)}
                  </div>
                  <p className="text-xs text-slate-500">
                    {previousResult ? '이전 대비' : '첫 평가입니다'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 역량 분석 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardHeader className="border-b border-slate-100">
              <CardTitle className="text-slate-800 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#0f4c81]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
                영역별 역량 분석
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <SkillRadarChart data={latestResult.categoryScores} />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="border-b border-slate-100">
              <CardTitle className="text-slate-800 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#0f4c81]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                카테고리별 상세 점수
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <CategoryScoreBar categoryScores={latestResult.categoryScores} />
            </CardContent>
          </Card>
        </div>

        {/* 평가 히스토리 */}
        {history.length > 0 && (
          <Card className="border-0 shadow-lg mb-8">
            <CardHeader className="border-b border-slate-100">
              <CardTitle className="text-slate-800 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#0f4c81]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                평가 히스토리
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="text-left py-4 px-4 text-sm font-semibold text-slate-600">날짜</th>
                      <th className="text-center py-4 px-4 text-sm font-semibold text-slate-600">등급</th>
                      <th className="text-center py-4 px-4 text-sm font-semibold text-slate-600">총점</th>
                      {Object.values(CATEGORY_INFO).map((info) => (
                        <th key={info.name} className="text-center py-4 px-4 text-sm font-semibold text-slate-600 hidden md:table-cell">
                          {info.name.split(' ')[0]}
                        </th>
                      ))}
                      <th className="text-center py-4 px-4 text-sm font-semibold text-slate-600">소요시간</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...history].reverse().map((item, idx) => {
                      const itemGradeStyle = GRADE_STYLES[item.grade];
                      return (
                        <tr key={item.id} className={`border-b border-slate-100 ${idx === 0 ? 'bg-[#0f4c81]/5' : 'hover:bg-slate-50'} transition-colors`}>
                          <td className="py-4 px-4 text-sm text-slate-700">
                            <div className="flex items-center gap-2">
                              {formatDate(item.completedAt)}
                              {idx === 0 && (
                                <Badge className="bg-[#0f4c81] text-white text-xs">최신</Badge>
                              )}
                            </div>
                          </td>
                          <td className="text-center py-4 px-4">
                            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br ${itemGradeStyle.gradient} text-white font-bold text-sm`}>
                              {item.grade}
                            </span>
                          </td>
                          <td className="text-center py-4 px-4">
                            <span className="font-bold text-slate-800">{item.totalScore.toFixed(1)}</span>
                          </td>
                          {item.categoryScores.map((cs) => (
                            <td key={cs.category} className="text-center py-4 px-4 text-sm text-slate-600 hidden md:table-cell">
                              {cs.score.toFixed(0)}
                            </td>
                          ))}
                          <td className="text-center py-4 px-4 text-sm text-slate-500">
                            {formatTime(item.timeSpent)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 추천 액션 */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-slate-50 to-slate-100">
          <CardHeader className="border-b border-slate-200">
            <CardTitle className="text-slate-800 flex items-center gap-2">
              <svg className="w-5 h-5 text-[#0f4c81]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              다음 단계
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 bg-white rounded-xl border border-slate-200 hover:border-[#0f4c81]/30 transition-colors">
                <div className="w-12 h-12 bg-[#0f4c81]/10 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#0f4c81]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">약점 보완</h3>
                <p className="text-sm text-slate-500">
                  가장 낮은 점수의 카테고리를 집중 학습하세요.
                </p>
              </div>
              <div className="p-5 bg-white rounded-xl border border-slate-200 hover:border-emerald-300 transition-colors">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">정기 평가</h3>
                <p className="text-sm text-slate-500">
                  3개월 후 재평가로 성장을 확인하세요.
                </p>
              </div>
              <div className="p-5 bg-white rounded-xl border border-slate-200 hover:border-purple-300 transition-colors">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">실습 적용</h3>
                <p className="text-sm text-slate-500">
                  학습한 내용을 업무에 적용해보세요.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
