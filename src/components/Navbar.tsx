import { ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onNavigateToExplorer: () => void;
}

export function Navbar({ onNavigateToExplorer }: NavbarProps) {
  return (
    <header
      id="main-header"
      className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/70"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element brand wordmark */}
        <a
          href="#hero"
          className="font-display text-xl font-extrabold tracking-tight text-slate-900 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0051C4] rounded-sm"
        >
          R&amp;dB
        </a>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav
          aria-label="주요 섹션 이동"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
        >
          <a
            href="#overview"
            className="hover:text-slate-900 hover:underline underline-offset-4 decoration-[#0051C4] transition-colors whitespace-nowrap shrink-0"
          >
            개요
          </a>
          <a
            href="#brand"
            className="hover:text-slate-900 hover:underline underline-offset-4 decoration-[#0051C4] transition-colors whitespace-nowrap shrink-0"
          >
            R&amp;dB란?
          </a>
          <a
            href="#background"
            className="hover:text-slate-900 hover:underline underline-offset-4 decoration-[#0051C4] transition-colors whitespace-nowrap shrink-0"
          >
            분석 배경
          </a>
          <a
            href="#features"
            className="hover:text-slate-900 hover:underline underline-offset-4 decoration-[#0051C4] transition-colors whitespace-nowrap shrink-0"
          >
            핵심 분석
          </a>
          <a
            href="#workflow"
            className="hover:text-slate-900 hover:underline underline-offset-4 decoration-[#0051C4] transition-colors whitespace-nowrap shrink-0"
          >
            연구 흐름
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onNavigateToExplorer}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#0051C4] hover:bg-[#003B94] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0051C4] focus-visible:ring-offset-2"
          >
            <span>아카이브 탐색</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
