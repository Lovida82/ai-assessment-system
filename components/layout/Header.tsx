'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: '홈' },
    { href: '/assessment', label: '평가하기' },
    { href: '/dashboard', label: '대시보드' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-[#0f4c81] to-[#1a5f9e] rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-[#0f4c81] text-lg tracking-tight">
                AI 역량평가
              </div>
              <div className="text-[10px] text-slate-500 -mt-0.5 tracking-wide">
                AJUHOLDINGS
              </div>
            </div>
          </Link>

          {/* 네비게이션 */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={`text-sm font-medium transition-colors
                    ${isActive(item.href)
                      ? 'text-[#0f4c81] bg-[#e8f4fc]'
                      : 'text-slate-600 hover:text-[#0f4c81] hover:bg-slate-50'
                    }`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          {/* 우측 버튼 */}
          <div className="flex items-center gap-3">
            <Link href="/assessment" className="hidden sm:block">
              <Button
                size="sm"
                className="bg-[#0f4c81] hover:bg-[#0a3255] text-white shadow-sm"
              >
                평가 시작
              </Button>
            </Link>

            {/* 모바일 메뉴 버튼 */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" className="text-slate-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
