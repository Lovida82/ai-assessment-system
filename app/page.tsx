'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CATEGORY_INFO } from '@/lib/types/assessment';

export default function Home() {
  const categories = Object.entries(CATEGORY_INFO);

  return (
    <div className="min-h-screen">
      {/* 히어로 섹션 */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f4c81] via-[#1a5f9e] to-[#2d7bc4] text-white">
        {/* 배경 패턴 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="bg-white/20 text-white border-white/30 mb-6 px-4 py-1">
              아주홀딩스 디지털혁신팀
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              AI 역량 평가 시스템
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-10 leading-relaxed">
              4가지 핵심 역량 영역에서 AI 활용 능력을 객관적으로 진단하고,
              <br className="hidden sm:block" />
              맞춤형 학습 경로를 제안받으세요.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/assessment">
                <Button
                  size="lg"
                  className="bg-white text-[#0f4c81] hover:bg-blue-50 text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
                >
                  평가 시작하기
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#0f4c81] text-lg px-8 py-6 transition-all"
                >
                  내 결과 보기
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* 하단 웨이브 */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#fafbfc"/>
          </svg>
        </div>
      </section>

      {/* 평가 영역 소개 */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              4대 핵심 역량 평가 영역
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              AI 시대에 필요한 핵심 역량을 체계적으로 진단합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map(([key, info], index) => (
              <Card
                key={key}
                className="group border-0 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white"
              >
                <CardHeader className="pb-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110
                    ${index === 0 ? 'bg-[#0f4c81]' :
                      index === 1 ? 'bg-[#10b981]' :
                      index === 2 ? 'bg-[#f59e0b]' : 'bg-[#8b5cf6]'}`}
                  >
                    <CategoryIcon category={key} />
                  </div>
                  <CardTitle className="text-xl text-slate-900">{info.name}</CardTitle>
                  <CardDescription className="text-sm">
                    <span className="inline-flex items-center gap-1 text-[#0f4c81] font-medium">
                      <span className="text-lg">{info.weight * 100}%</span>
                      <span className="text-slate-400">가중치</span>
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 leading-relaxed">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 평가 프로세스 */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              평가 프로세스
            </h2>
            <p className="text-lg text-slate-600">
              간단한 4단계로 AI 역량을 진단하세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
            {[
              { step: 1, title: '평가 시작', desc: '40문제 랜덤 출제', icon: PlayIcon },
              { step: 2, title: '문제 풀이', desc: '4지선다 객관식', icon: EditIcon },
              { step: 3, title: '결과 분석', desc: '점수 및 등급 산출', icon: ChartIcon },
              { step: 4, title: '피드백', desc: '맞춤형 학습 추천', icon: LightbulbIcon }
            ].map((item, idx) => (
              <div key={item.step} className="relative text-center">
                <div className="relative inline-block">
                  <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6 border border-slate-100">
                    <item.icon className="w-10 h-10 text-[#0f4c81]" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#0f4c81] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{item.step}</span>
                  </div>
                </div>
                <h3 className="font-semibold text-lg text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.desc}</p>

                {idx < 3 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5">
                    <div className="w-full h-full bg-gradient-to-r from-slate-200 to-transparent" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 등급 안내 */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              등급 기준
            </h2>
            <p className="text-lg text-slate-600">
              점수에 따른 5단계 등급 체계
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { grade: 'S', min: 90, color: 'from-purple-500 to-purple-600', desc: '최우수', bg: 'bg-purple-50' },
              { grade: 'A', min: 75, color: 'from-[#0f4c81] to-[#1a5f9e]', desc: '우수', bg: 'bg-blue-50' },
              { grade: 'B', min: 60, color: 'from-emerald-500 to-emerald-600', desc: '양호', bg: 'bg-emerald-50' },
              { grade: 'C', min: 40, color: 'from-amber-500 to-amber-600', desc: '보통', bg: 'bg-amber-50' },
              { grade: 'D', min: 0, color: 'from-slate-400 to-slate-500', desc: '노력필요', bg: 'bg-slate-50' }
            ].map((item) => (
              <Card key={item.grade} className={`${item.bg} border-0 text-center overflow-hidden`}>
                <CardContent className="pt-8 pb-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} text-white text-2xl font-bold mb-4 shadow-lg`}>
                    {item.grade}
                  </div>
                  <p className="font-semibold text-slate-900">{item.min}점 이상</p>
                  <p className="text-sm text-slate-500 mt-1">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            지금 바로 시작하세요
          </h2>
          <p className="text-lg text-slate-400 mb-10">
            약 20-30분 소요 | 총 40문제 | 즉시 결과 확인
          </p>
          <Link href="/assessment">
            <Button
              size="lg"
              className="bg-white text-slate-900 hover:bg-slate-100 text-lg px-10 py-6 shadow-xl hover:shadow-2xl transition-all"
            >
              무료 평가 시작
            </Button>
          </Link>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span className="font-medium text-[#0f4c81]">AJUHOLDINGS</span>
              <span>디지털혁신팀</span>
            </div>
            <p className="text-sm text-slate-400">
              © 2026 AI 역량 평가 시스템. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// 아이콘 컴포넌트들
function CategoryIcon({ category }: { category: string }) {
  const iconClass = "w-7 h-7 text-white";

  const icons: Record<string, React.ReactNode> = {
    prompt: (
      <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    data: (
      <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    workflow: (
      <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
    ethics: (
      <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    )
  };

  return icons[category] || icons.prompt;
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

function EditIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function LightbulbIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="9" y1="18" x2="15" y2="18" />
      <line x1="10" y1="22" x2="14" y2="22" />
      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
    </svg>
  );
}
