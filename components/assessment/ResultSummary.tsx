'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AssessmentResult, Feedback, CATEGORY_INFO } from '@/lib/types/assessment';
import { SkillRadarChart } from '@/components/dashboard/RadarChart';
import { CategoryScoreBar } from '@/components/dashboard/CategoryScoreBar';

interface ResultSummaryProps {
  result: AssessmentResult;
  feedback: Feedback;
}

const GRADE_STYLES: Record<string, { bg: string; gradient: string; text: string }> = {
  'S': { bg: 'bg-purple-50', gradient: 'from-purple-500 to-purple-600', text: 'text-purple-600' },
  'A': { bg: 'bg-blue-50', gradient: 'from-[#0f4c81] to-[#1a5f9e]', text: 'text-[#0f4c81]' },
  'B': { bg: 'bg-emerald-50', gradient: 'from-emerald-500 to-emerald-600', text: 'text-emerald-600' },
  'C': { bg: 'bg-amber-50', gradient: 'from-amber-500 to-amber-600', text: 'text-amber-600' },
  'D': { bg: 'bg-slate-100', gradient: 'from-slate-400 to-slate-500', text: 'text-slate-600' }
};

export function ResultSummary({ result, feedback }: ResultSummaryProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}분 ${secs}초`;
  };

  const gradeStyle = GRADE_STYLES[result.grade];

  return (
    <div className="space-y-6">
      {/* 전체 점수 카드 */}
      <Card className={`${gradeStyle.bg} border-0 overflow-hidden`}>
        <CardContent className="py-10">
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br ${gradeStyle.gradient} text-white text-4xl font-bold mb-4 shadow-lg`}>
              {result.grade}
            </div>
            <div className={`text-5xl font-bold ${gradeStyle.text} mb-2`}>
              {result.totalScore.toFixed(1)}
              <span className="text-2xl font-normal text-slate-400 ml-1">점</span>
            </div>
            <p className="text-slate-500">
              소요 시간: {formatTime(result.timeSpent)}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* AI 피드백 요약 */}
      <Card className="border-0 shadow-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-[#0f4c81] to-[#1a5f9e] text-white">
          <CardTitle className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            종합 평가
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-lg text-slate-700 leading-relaxed">{feedback.summary}</p>
        </CardContent>
      </Card>

      {/* 차트 섹션 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 레이더 차트 */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-slate-800">영역별 역량 분석</CardTitle>
          </CardHeader>
          <CardContent>
            <SkillRadarChart data={result.categoryScores} />
          </CardContent>
        </Card>

        {/* 카테고리별 점수 바 */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-slate-800">카테고리별 상세 점수</CardTitle>
          </CardHeader>
          <CardContent>
            <CategoryScoreBar categoryScores={result.categoryScores} />
          </CardContent>
        </Card>
      </div>

      {/* 강점 & 약점 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg border-l-4 border-l-emerald-500">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-emerald-700">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              강점
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-3">
              {feedback.strengths.map((strength, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-slate-700">{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg border-l-4 border-l-amber-500">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-amber-700">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              개선 영역
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-3">
              {feedback.weaknesses.map((weakness, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <span className="text-slate-700">{weakness}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* 추천 학습 경로 */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-800">
            <svg className="w-5 h-5 text-[#0f4c81]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            추천 학습 경로
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {feedback.recommendations.map((rec, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border-l-4 bg-slate-50
                  ${rec.priority === 'high' ? 'border-l-red-500' :
                    rec.priority === 'medium' ? 'border-l-amber-500' : 'border-l-emerald-500'}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-slate-800">{rec.title}</h4>
                  <Badge variant="outline" className={`text-xs
                    ${rec.priority === 'high' ? 'border-red-200 text-red-700 bg-red-50' :
                      rec.priority === 'medium' ? 'border-amber-200 text-amber-700 bg-amber-50' :
                      'border-emerald-200 text-emerald-700 bg-emerald-50'}`}
                  >
                    {rec.priority === 'high' ? '높음' : rec.priority === 'medium' ? '중간' : '낮음'}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 mb-2">{rec.description}</p>
                <span className="text-xs text-[#0f4c81] font-medium">
                  예상 소요: {rec.estimatedTime}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 실천 과제 */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-slate-50 to-slate-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-800">
            <svg className="w-5 h-5 text-[#0f4c81]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            실천 과제
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {feedback.actionItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200">
                <span className="w-7 h-7 bg-[#0f4c81] text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                  {idx + 1}
                </span>
                <span className="text-sm text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
