import { useState } from 'react';
import { ArrowDown, ArrowUpRight, CheckCircle2, Disc3, Layers, Radio, SlidersHorizontal } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { AnalysisSimulator } from './components/AnalysisSimulator';
import {
  AnalysisLens,
  CountryCode,
  DecadeCode,
  RESEARCH_TOOLS,
  TEAM_MEMBERS,
  WORKFLOW_STEPS,
} from './data/rnbData';

const LENS_CARDS: {
  id: AnalysisLens;
  index: string;
  title: string;
  description: string;
  icon: typeof SlidersHorizontal;
}[] = [
  {
    id: 'timeline',
    index: '01',
    title: '연도별 사운드 진화',
    description:
      '1970년대 아날로그 소울부터 2020년대 하이브리드 R&B까지, 5개국의 평균 BPM과 신스/전자음 비중 변화를 시계열 차트로 비교합니다.',
    icon: SlidersHorizontal,
  },
  {
    id: 'radar',
    index: '02',
    title: '국가별 음향 레이더',
    description:
      '그루브, 화성 복잡도, 신스 질감, 보컬 멜리스마, 베이스 음압 등 5대 음악적 축으로 미·영·한·일·캐 R&B의 고유 음색을 대조합니다.',
    icon: Radio,
  },
  {
    id: 'tracks',
    index: '03',
    title: '대표 트랙 · 화성 청음',
    description:
      '국가와 연대를 교차 필터링해 시대별 대표곡의 조성과 7th/9th 텐션 코드 진행을 살피고, Web Audio 신스로 화성을 직접 들어봅니다.',
    icon: Disc3,
  },
  {
    id: 'lyrics',
    index: '04',
    title: '가사 · 서사 키워드 변화',
    description:
      '공동체적 연대(1970s)에서 도시 로맨스(1980s), 새벽의 내밀한 독백(2010s), 자기 회복(2020s)으로 이동한 가사 화법을 분석합니다.',
    icon: Layers,
  },
];

export default function App() {
  const [activeLens, setActiveLens] = useState<AnalysisLens>('tracks');
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>('ALL');
  const [selectedDecade, setSelectedDecade] = useState<DecadeCode>('ALL');
  const [activeWorkflowId, setActiveWorkflowId] = useState<string>('step-4');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectWorkflowStep = (stepId: string, targetLens: AnalysisLens) => {
    setActiveWorkflowId(stepId);
    setActiveLens(targetLens);
    scrollToSection('features');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Navbar onNavigateToExplorer={() => scrollToSection('features')} />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section id="hero" className="relative overflow-hidden bg-white pt-14 pb-16 lg:pt-20 lg:pb-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              {/* Left Typographic Anchor */}
              <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
                <div className="text-xs font-mono text-slate-500 tracking-wide">
                  <span>대학교 기말 프로젝트</span>
                  <span aria-hidden="true" className="mx-2">·</span>
                  <span>1970–2025 글로벌 R&amp;B 아카이브</span>
                  <span aria-hidden="true" className="mx-2">·</span>
                  <span className="font-semibold text-[#0051C4]">팀 R&amp;dB</span>
                </div>

                <h1 className="font-display font-extrabold text-[clamp(2.25rem,4vw,3.75rem)] leading-[1.12] tracking-tight text-slate-900 [text-wrap:balance]">
                  시대의 리듬과 국가의 음색을{' '}
                  <span className="text-[#0051C4] underline decoration-blue-100 decoration-8 underline-offset-4">
                    데이터로 읽다.
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                  글로벌 R&amp;B 연대기 분석 프로젝트 <strong className="font-bold text-slate-900">R&amp;dB</strong>는
                  미국·영국·대한민국·일본·캐나다의 R&amp;B 곡들을 연도별로 해부해 템포, 화성, 신스 비중, 가사 서사의
                  변화를 한눈에 비교합니다.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => scrollToSection('features')}
                    className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#0051C4] hover:bg-[#003B94] rounded-xl transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0051C4] focus-visible:ring-offset-2"
                  >
                    <span>분석 아카이브 탐색하기</span>
                    <ArrowDown size={15} aria-hidden="true" />
                  </button>
                  <a
                    href="#brand"
                    className="inline-flex items-center gap-1.5 px-4 py-3 text-sm font-semibold text-slate-700 hover:text-[#0051C4] transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>R&amp;dB 정체성 보기</span>
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Right Focal Visual */}
              <div className="lg:col-span-5">
                <div className="h-full min-h-[280px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 relative">
                  <img
                    src="/src/assets/images/hero_rndb_studio_1794984312204.jpg"
                    alt="아날로그 턴테이블과 스튜디오 모니터가 배치된 R&dB 사운드 리서치 스튜디오"
                    referrerPolicy="no-referrer"
                    className="w-full h-full lg:h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent text-white">
                    <div className="text-[11px] font-mono text-blue-200">
                      Archive Studio · 1970–2025
                    </div>
                    <div className="text-sm font-semibold mt-0.5">
                      아날로그 소울의 잔향부터 현대 트랩소울의 서브베이스까지
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Full-width 4-Column Archive Summary Strip below hero split */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10 pt-8 border-t border-slate-200/80">
              <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/70">
                <div className="text-xs text-slate-500 font-medium">분석 대상 연대</div>
                <div className="font-display text-2xl font-bold text-slate-900 tabular-nums mt-1">
                  1970–2025
                </div>
                <div className="text-xs text-slate-500 mt-1">6개 시대 · 55년 사운드 변천사</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/70">
                <div className="text-xs text-slate-500 font-medium">비교 권역</div>
                <div className="font-display text-2xl font-bold text-slate-900 tabular-nums mt-1">
                  5개국 R&amp;B
                </div>
                <div className="text-xs text-slate-500 mt-1">미국 · 영국 · 한국 · 일본 · 캐나다</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/70">
                <div className="text-xs text-slate-500 font-medium">정량 음향 지표</div>
                <div className="font-display text-2xl font-bold text-slate-900 tabular-nums mt-1">
                  5대 음악 축
                </div>
                <div className="text-xs text-slate-500 mt-1">그루브 · 화성 · 신스 · 보컬 · 베이스</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/70">
                <div className="text-xs text-slate-500 font-medium">화성 청음 엔진</div>
                <div className="font-display text-2xl font-bold text-[#0051C4] tabular-nums mt-1">
                  Web Audio 신스
                </div>
                <div className="text-xs text-slate-500 mt-1">대표곡 7th/9th 코드 실시간 연주</div>
              </div>
            </div>
          </div>
        </section>

        {/* OVERVIEW SECTION */}
        <section id="overview" className="bg-[#F8FAFC] border-y border-slate-200/70 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="text-xs font-mono text-[#0051C4] font-semibold">
                  01. 프로젝트 개요
                </div>
                <h2 className="font-display text-3xl font-extrabold text-slate-900 tracking-tight leading-tight [text-wrap:balance]">
                  “국가와 시대를 가로지르는 R&amp;B 계보 분석 아카이브”
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  같은 R&amp;B라는 이름 아래 묶이지만, 1970년대 미국의 심포닉 소울과 2000년대 영국의 2-Step 개러지,
                  1990년대 한국형 발라드 R&amp;B, 일본 시티팝 기반의 R&amp;B, 그리고 2010년대 캐나다의 다크 얼터너티브
                  R&amp;B는 전혀 다른 리듬 문법과 화성 색채를 지닙니다.
                </p>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  팀 R&amp;dB는 감상평에 머물던 장르 비평을 넘어서, 시대별 BPM 이동·신시사이저 도입 비율·코드 보이싱·가사
                  키워드 변화를 하나의 웹 아카이브로 구조화했습니다.
                </p>
              </div>

              <div className="lg:col-span-5">
                <figure>
                  <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 aspect-[4/3]">
                    <img
                      src="/src/assets/images/archive_vinyl_layers_1794984315796.jpg"
                      alt="바이닐 레코드, 아카이브 슬리브, 레퍼런스 헤드폰과 아날로그 노브가 정돈된 연구 테이블"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <figcaption className="text-xs text-slate-500 mt-2.5">
                    Fig. 1 — 시대별 R&amp;B 명반 아카이빙 및 음향 지표 비교 연구 코퍼스
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* BRAND SECTION (#brand) — Inspired by plin-amber.vercel.app/#brand */}
        <section id="brand" className="bg-white border-b border-slate-200/70 py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="text-xs font-mono text-[#0051C4] font-semibold">
                02. 브랜드 아이덴티티
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
                R&amp;dB란?
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-4 leading-relaxed">
                리듬과 소울의 장르 <strong className="text-slate-900">R&amp;B(Rhythm &amp; Blues)</strong>와
                소리의 크기·데이터베이스를 뜻하는 <strong className="text-slate-900">dB(Decibel · Data Base)</strong>를
                결합한 이름으로, 음악적 감성과 데이터 기반 분석을 하나로 엮는 프로젝트의 정체성을 담고 있습니다.
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-5 max-w-3xl mx-auto mt-10">
              <div className="flex-1 w-full p-8 rounded-2xl bg-slate-50/70 border border-slate-200/80 flex flex-col items-center justify-center space-y-3 text-center transition-colors hover:bg-slate-50">
                <div className="w-14 h-14 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-display font-extrabold text-lg text-[#0051C4]">
                  R&amp;B
                </div>
                <div>
                  <strong className="font-display text-xl font-bold text-slate-900 block">
                    Rhythm &amp; Blues
                  </strong>
                  <span className="text-xs sm:text-sm text-slate-600 mt-1 block">
                    시대와 국가마다 다르게 피어난 리듬·화성·서사의 감성
                  </span>
                </div>
              </div>

              <div
                aria-hidden="true"
                className="font-display text-3xl font-extrabold text-[#0051C4] py-1 select-none"
              >
                +
              </div>

              <div className="flex-1 w-full p-8 rounded-2xl bg-slate-50/70 border border-slate-200/80 flex flex-col items-center justify-center space-y-3 text-center transition-colors hover:bg-slate-50">
                <div className="w-14 h-14 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-mono font-bold text-lg text-slate-900">
                  dB
                </div>
                <div>
                  <strong className="font-display text-xl font-bold text-slate-900 block">
                    Decibel &amp; Data Base
                  </strong>
                  <span className="text-xs sm:text-sm text-slate-600 mt-1 block">
                    BPM, 음향 에너지, 코드 진행, 가사 키워드의 정량적 기록
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BACKGROUND SECTION (#background) */}
        <section id="background" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-5">
                <div className="text-xs font-mono text-[#0051C4] font-semibold">
                  03. 연구 및 기획 배경
                </div>
                <h2 className="font-display text-3xl font-extrabold text-slate-900 tracking-tight leading-tight [text-wrap:balance]">
                  우리는 왜 <span className="text-[#0051C4]">R&amp;dB</span>를 시작했을까요?
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  스트리밍 플랫폼 시대에서 청취자들은 알고리즘이 추천하는 파편화된 플레이리스트로 R&amp;B를 소비합니다.
                  하지만 “왜 2010년대 캐나다 R&amp;B는 유독 차갑고 느린지”, “한국과 일본의 R&amp;B는 미국 본토 소울을
                  어떻게 각자의 정서와 화성으로 번역했는지”는 맥락이 지워진 채 흘러갑니다.
                </p>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  팀 R&amp;dB는 흩어진 곡들을 연도(Time)와 국가(Space)의 좌표 위에 고정하여, 음악이 사회와 기술을
                  만나 어떻게 변주되어 왔는지 입체적으로 조망하고자 이 프로젝트를 기획했습니다.
                </p>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <div className="rounded-2xl bg-[#0051C4] text-white p-8">
                  <h3 className="text-blue-200 font-mono text-xs font-semibold tracking-wider">
                    R&amp;dB 핵심 연구 의도
                  </h3>
                  <blockquote className="mt-5 text-xl sm:text-2xl font-medium leading-snug">
                    “음원 차트는 당대의 유행을 보여주지만,{' '}
                    <br className="hidden sm:inline" />
                    R&amp;dB는 시대의{' '}
                    <span className="font-extrabold underline decoration-amber-300 underline-offset-4">
                      ‘결’과 국가의 ‘음색’
                    </span>
                    을 읽어냅니다.”
                  </blockquote>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center">
                    <strong className="text-slate-900 text-xs sm:text-sm font-bold">
                      연대기적 계보화
                    </strong>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center">
                    <strong className="text-slate-900 text-xs sm:text-sm font-bold">
                      음향 지표 정량화
                    </strong>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center">
                    <strong className="text-slate-900 text-xs sm:text-sm font-bold">
                      문화권 비교 아카이브
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CORE ANALYSIS & INTERACTIVE EXPLORER (#features) */}
        <section id="features" className="py-20 bg-[#F8FAFC] border-y border-slate-200/70">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl mx-auto mb-12 text-center">
              <div className="text-xs font-mono text-[#0051C4] font-semibold">
                04. 인터랙티브 R&amp;B 분석기
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
                R&amp;dB <span className="text-[#0051C4]">핵심 분석 아카이브</span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-3">
                왼쪽 분석 렌즈를 선택하거나 상단 국가·연대 필터를 클릭해 5개국 R&amp;B의 음향적·서사적 변화를 직접
                탐색해 보세요.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left 4 Analysis Lens Selector Cards */}
              <div className="lg:col-span-4 space-y-3">
                {LENS_CARDS.map((card) => {
                  const Icon = card.icon;
                  const isActive = activeLens === card.id;
                  return (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => setActiveLens(card.id)}
                      className={`w-full p-5 rounded-2xl border text-left transition-colors flex gap-4 cursor-pointer ${
                        isActive
                          ? 'border-[#0051C4] bg-white shadow-xs'
                          : 'border-slate-200 bg-white/70 hover:bg-white hover:border-slate-300'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isActive ? 'bg-[#0051C4] text-white' : 'bg-blue-50 text-[#0051C4]'
                        }`}
                      >
                        <Icon size={18} aria-hidden="true" />
                      </div>
                      <div>
                        <div className="text-[11px] font-mono text-slate-400 font-semibold">
                          {card.index}. 분석 모듈
                        </div>
                        <h3 className="font-display font-bold text-slate-900 text-base mt-0.5">
                          {card.title}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                          {card.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Interactive Multi-View Analysis Console */}
              <div className="lg:col-span-8">
                <AnalysisSimulator
                  activeLens={activeLens}
                  onLensChange={setActiveLens}
                  selectedCountry={selectedCountry}
                  onCountryChange={setSelectedCountry}
                  selectedDecade={selectedDecade}
                  onDecadeChange={setSelectedDecade}
                />
              </div>
            </div>
          </div>
        </section>

        {/* RESEARCH WORKFLOW (#workflow) */}
        <section id="workflow" className="bg-slate-950 text-white py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl mb-12">
              <div className="text-xs font-mono text-blue-400 font-semibold">
                05. 연구 방법론 및 파이프라인
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2 leading-tight [text-wrap:balance]">
                R&amp;dB의 6단계 <span className="text-blue-400">음악 데이터 분석 흐름</span>
              </h2>
              <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                코퍼스 수집부터 음향 피처 추출, 화성 채보, 가사 마이닝, 웹 아카이브 구현까지 이어진 프로젝트 진행
                프로세스입니다. 카드를 클릭하면 해당 분석 뷰로 바로 이동합니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {WORKFLOW_STEPS.map((step) => {
                const isSelected = activeWorkflowId === step.id;
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => handleSelectWorkflowStep(step.id, step.targetLens)}
                    className={`p-6 rounded-2xl text-left transition-colors border cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#0051C4] border-[#0051C4] text-white'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 text-xs font-mono">
                        <span className={isSelected ? 'text-blue-100 font-semibold' : 'text-slate-400'}>
                          {step.stepNumber}
                        </span>
                        <span className={isSelected ? 'text-white font-semibold' : 'text-blue-400'}>
                          {step.title}
                        </span>
                      </div>
                      <h3 className="font-display text-base font-bold text-white mt-4">
                        {step.subtitle}
                      </h3>
                      <p
                        className={`text-xs leading-relaxed mt-2 ${
                          isSelected ? 'text-blue-100' : 'text-slate-400'
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>

                    <ul className="mt-5 pt-4 border-t border-white/10 space-y-1.5 text-xs">
                      {step.deliverables.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <CheckCircle2
                            size={13}
                            aria-hidden="true"
                            className={isSelected ? 'text-blue-200 shrink-0' : 'text-blue-400 shrink-0'}
                          />
                          <span className={isSelected ? 'text-white' : 'text-slate-300'}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* TOOLS & TEAM SECTION (#tools) */}
        <section id="tools" className="py-20 bg-white border-t border-slate-200/70">
          <div className="max-w-7xl mx-auto px-6 space-y-16">
            <div>
              <div className="max-w-xl mb-10">
                <div className="text-xs font-mono text-[#0051C4] font-semibold">
                  06. 분석 기술 및 아키텍처
                </div>
                <h2 className="font-display text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
                  프로젝트 사용 툴
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {RESEARCH_TOOLS.map((tool) => (
                  <div
                    key={tool.name}
                    className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col gap-4"
                  >
                    <div
                      className="w-12 h-12 rounded-xl text-white font-mono font-bold flex items-center justify-center text-sm"
                      style={{ backgroundColor: tool.color }}
                    >
                      {tool.badge}
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-slate-500">{tool.role}</div>
                      <h3 className="font-display font-bold text-slate-900 text-lg mt-0.5">
                        {tool.name}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mt-2">{tool.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Team R&dB + Studio Vocal Booth Editorial Spread */}
            <div className="pt-12 border-t border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="text-xs font-mono text-[#0051C4] font-semibold">
                    Team R&amp;dB
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1.5">
                    기말 프로젝트 연구 팀원
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {TEAM_MEMBERS.map((member) => (
                    <div
                      key={member.name}
                      className="p-5 rounded-xl border border-slate-200 bg-white space-y-2"
                    >
                      <div className="font-display font-bold text-base text-slate-900">
                        {member.name}
                      </div>
                      <div className="text-xs font-mono text-[#0051C4] font-medium">
                        {member.role}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed pt-1 border-t border-slate-100">
                        {member.focus}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5">
                <figure>
                  <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 aspect-[4/3]">
                    <img
                      src="/src/assets/images/sonic_waveform_sculpture_1794984313909.jpg"
                      alt="빈티지 콘덴서 마이크와 브러시드 스틸 어쿠스틱 디퓨저가 설치된 보컬 부스"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <figcaption className="text-xs text-slate-500 mt-2.5">
                    Fig. 2 — 보컬 멜리스마 및 공간 리버브 질감 비교를 위한 청음 레퍼런스 환경
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* CLOSING BANNER */}
        <section className="bg-[#0051C4] text-white py-16 text-center">
          <div className="max-w-3xl mx-auto px-6 space-y-5">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl tracking-tight [text-wrap:balance]">
              R&amp;dB : 시대의 리듬과 국가의 음색을 데이터로 기록하다
            </h2>
            <p className="text-sm sm:text-base text-blue-100 max-w-xl mx-auto">
              1970년부터 2025년까지 5개국 R&amp;B의 사운드 계보와 코드 진행을 지금 바로 탐색해 보세요.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => scrollToSection('features')}
                className="inline-flex items-center gap-2 bg-white text-[#0051C4] hover:bg-blue-50 font-display font-bold text-sm px-7 py-3.5 rounded-xl transition-colors cursor-pointer"
              >
                <span>인터랙티브 아카이브로 이동</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* QUIET FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <div>
            <span className="font-display font-bold text-white text-sm">R&amp;dB</span>
            <span aria-hidden="true" className="mx-2 text-slate-600">·</span>
            <span>대학교 기말 프로젝트 — 연도별·국가별 R&amp;B 사운드 분석 아카이브</span>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <a href="#overview" className="hover:text-white transition-colors whitespace-nowrap">
              개요
            </a>
            <a href="#brand" className="hover:text-white transition-colors whitespace-nowrap">
              R&amp;dB란?
            </a>
            <a href="#features" className="hover:text-white transition-colors whitespace-nowrap">
              핵심 분석
            </a>
            <a href="#workflow" className="hover:text-white transition-colors whitespace-nowrap">
              연구 흐름
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
