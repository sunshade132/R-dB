import { useEffect, useMemo, useState } from 'react';
import { Download, Play, Search, Square, Volume2 } from 'lucide-react';
import {
  AnalysisLens,
  COUNTRIES,
  CountryCode,
  DECADE_TIMELINE,
  DecadeCode,
  LYRIC_EVOLUTION,
  RnbTrack,
  SonicProfile,
  TRACKS,
} from '../data/rnbData';
import { chordSynth } from '../utils/audioSynth';

interface AnalysisSimulatorProps {
  activeLens: AnalysisLens;
  onLensChange: (lens: AnalysisLens) => void;
  selectedCountry: CountryCode;
  onCountryChange: (country: CountryCode) => void;
  selectedDecade: DecadeCode;
  onDecadeChange: (decade: DecadeCode) => void;
}

const COUNTRY_TABS: { code: CountryCode; label: string }[] = [
  { code: 'ALL', label: '전체 5개국' },
  { code: 'USA', label: '미국' },
  { code: 'UK', label: '영국' },
  { code: 'KR', label: '대한민국' },
  { code: 'JP', label: '일본' },
  { code: 'CA', label: '캐나다' },
];

const DECADE_TABS: { code: DecadeCode; label: string }[] = [
  { code: 'ALL', label: '전 시대' },
  { code: '1970s', label: '1970s' },
  { code: '1980s', label: '1980s' },
  { code: '1990s', label: '1990s' },
  { code: '2000s', label: '2000s' },
  { code: '2010s', label: '2010s' },
  { code: '2020s', label: '2020s' },
];

const RADAR_AXES: { key: keyof SonicProfile; label: string }[] = [
  { key: 'groove', label: '그루브·싱코페이션' },
  { key: 'harmonicDepth', label: '화성 복잡도' },
  { key: 'synthRatio', label: '신스 질감' },
  { key: 'vocalMelisma', label: '보컬 멜리스마' },
  { key: 'bassWeight', label: '베이스 음압' },
];

const COUNTRY_NAME_MAP: Record<Exclude<CountryCode, 'ALL'>, string> = {
  USA: '미국',
  UK: '영국',
  KR: '대한민국',
  JP: '일본',
  CA: '캐나다',
};

export function AnalysisSimulator({
  activeLens,
  onLensChange,
  selectedCountry,
  onCountryChange,
  selectedDecade,
  onDecadeChange,
}: AnalysisSimulatorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrackId, setSelectedTrackId] = useState<string>(TRACKS[0].id);
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
  const [activeChordStep, setActiveChordStep] = useState<number | null>(null);
  const [timelineMetric, setTimelineMetric] = useState<'bpm' | 'synth' | 'harmonic'>('synth');
  const [focusedDecadeIdx, setFocusedDecadeIdx] = useState<number>(4); // 2010s default focus

  useEffect(() => {
    return () => {
      chordSynth.stop();
    };
  }, []);

  const filteredTracks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return TRACKS.filter((t) => {
      if (selectedCountry !== 'ALL' && t.country !== selectedCountry) return false;
      if (selectedDecade !== 'ALL' && t.decade !== selectedDecade) return false;
      if (!q) return true;
      return (
        t.title.toLowerCase().includes(q) ||
        t.artist.toLowerCase().includes(q) ||
        t.subgenre.toLowerCase().includes(q) ||
        t.lyricalMotifs.some((m) => m.toLowerCase().includes(q))
      );
    });
  }, [selectedCountry, selectedDecade, searchQuery]);

  const activeTrack: RnbTrack | undefined = useMemo(() => {
    return (
      filteredTracks.find((t) => t.id === selectedTrackId) ||
      filteredTracks[0] ||
      TRACKS[0]
    );
  }, [filteredTracks, selectedTrackId]);

  const handleTogglePlay = (track: RnbTrack) => {
    if (playingTrackId === track.id) {
      chordSynth.stop();
      setPlayingTrackId(null);
      setActiveChordStep(null);
      return;
    }
    setPlayingTrackId(track.id);
    setActiveChordStep(0);
    chordSynth.playProgression(
      track.id,
      track.chordVoicings,
      track.bpm,
      (step) => setActiveChordStep(step),
      () => {
        setPlayingTrackId(null);
        setActiveChordStep(null);
      }
    );
  };

  const handleExportCsv = () => {
    const headers = [
      'Year',
      'Decade',
      'Country',
      'Artist',
      'Title',
      'Subgenre',
      'BPM',
      'Key',
      'ChordProgression',
      'Groove',
      'HarmonicDepth',
      'SynthRatio',
      'VocalMelisma',
      'BassWeight',
    ];
    const rows = filteredTracks.map((t) => [
      t.year,
      t.decade,
      COUNTRY_NAME_MAP[t.country],
      `"${t.artist.replace(/"/g, '""')}"`,
      `"${t.title.replace(/"/g, '""')}"`,
      `"${t.subgenre.replace(/"/g, '""')}"`,
      t.bpm,
      `"${t.musicalKey}"`,
      `"${t.chordProgression}"`,
      t.sonicProfile.groove,
      t.sonicProfile.harmonicDepth,
      t.sonicProfile.synthRatio,
      t.sonicProfile.vocalMelisma,
      t.sonicProfile.bassWeight,
    ]);
    const csv = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `rndb_analysis_${selectedCountry}_${selectedDecade}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Global 5-country average for radar baseline
  const globalAvgProfile = useMemo<SonicProfile>(() => {
    const sum = COUNTRIES.reduce(
      (acc, c) => ({
        groove: acc.groove + c.avgProfile.groove,
        harmonicDepth: acc.harmonicDepth + c.avgProfile.harmonicDepth,
        synthRatio: acc.synthRatio + c.avgProfile.synthRatio,
        vocalMelisma: acc.vocalMelisma + c.avgProfile.vocalMelisma,
        bassWeight: acc.bassWeight + c.avgProfile.bassWeight,
      }),
      { groove: 0, harmonicDepth: 0, synthRatio: 0, vocalMelisma: 0, bassWeight: 0 }
    );
    const n = COUNTRIES.length;
    return {
      groove: Math.round(sum.groove / n),
      harmonicDepth: Math.round(sum.harmonicDepth / n),
      synthRatio: Math.round(sum.synthRatio / n),
      vocalMelisma: Math.round(sum.vocalMelisma / n),
      bassWeight: Math.round(sum.bassWeight / n),
    };
  }, []);

  const radarTargetCountry = useMemo(() => {
    if (selectedCountry === 'ALL') return COUNTRIES[0];
    return COUNTRIES.find((c) => c.code === selectedCountry) || COUNTRIES[0];
  }, [selectedCountry]);

  // SVG Radar coordinate helper
  const buildRadarPolygon = (profile: SonicProfile, radius: number, cx: number, cy: number) => {
    return RADAR_AXES.map((axis, idx) => {
      const angle = (Math.PI * 2 * idx) / RADAR_AXES.length - Math.PI / 2;
      const ratio = profile[axis.key] / 100;
      const x = cx + Math.cos(angle) * radius * ratio;
      const y = cy + Math.sin(angle) * radius * ratio;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
  };

  // Timeline SVG chart series helper
  const timelineSeries = useMemo(() => {
    const activeCountry: Exclude<CountryCode, 'ALL'> =
      selectedCountry === 'ALL' ? 'USA' : selectedCountry;

    return DECADE_TIMELINE.map((point) => {
      const val =
        timelineMetric === 'bpm'
          ? point.avgBpm[activeCountry]
          : timelineMetric === 'synth'
          ? point.synthRatio[activeCountry]
          : point.harmonicIndex[activeCountry];

      const globalMean = Math.round(
        (Object.values(
          timelineMetric === 'bpm'
            ? point.avgBpm
            : timelineMetric === 'synth'
            ? point.synthRatio
            : point.harmonicIndex
        ).reduce((a, b) => a + b, 0)) / 5
      );

      return {
        ...point,
        value: val,
        globalMean,
        countryCode: activeCountry,
      };
    });
  }, [selectedCountry, timelineMetric]);

  const focusedTimelinePoint = timelineSeries[focusedDecadeIdx] || timelineSeries[0];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Top Control Toolbar */}
      <div className="px-6 py-4 bg-slate-50/80 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5">
          {COUNTRY_TABS.map((tab) => {
            const active = selectedCountry === tab.code;
            return (
              <button
                key={tab.code}
                type="button"
                onClick={() => onCountryChange(tab.code)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-[#0051C4] text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleExportCsv}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Download size={13} aria-hidden="true" />
            <span>CSV 내보내기</span>
          </button>
        </div>
      </div>

      {/* Lens Switcher Bar */}
      <div className="px-6 py-3 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3 bg-white">
        <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1 rounded-lg">
          {(
            [
              { id: 'timeline', label: '연도별 사운드 추이' },
              { id: 'radar', label: '국가별 음향 레이더' },
              { id: 'tracks', label: '대표 트랙·화성 청음' },
              { id: 'lyrics', label: '가사·서사 키워드' },
            ] as { id: AnalysisLens; label: string }[]
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onLensChange(item.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeLens === item.id
                  ? 'bg-white text-[#0051C4] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-500 font-mono tabular-nums whitespace-nowrap shrink-0">
          <span>필터 트랙 {filteredTracks.length}곡</span>
          <span aria-hidden="true" className="mx-2">·</span>
          <span>1970–2025</span>
        </div>
      </div>

      {/* Main Interactive Body */}
      <div className="p-6">
        {/* VIEW 1: TIMELINE */}
        {activeLens === 'timeline' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="font-display text-lg font-bold text-slate-900">
                  {selectedCountry === 'ALL' ? '미국(원류) vs 5개국 평균' : `${COUNTRY_NAME_MAP[selectedCountry]} vs 5개국 평균`} 연대별 지표 변화
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  각 시대 노드를 클릭하면 해당 연대의 지배적 스타일과 가사 흐름을 확인할 수 있습니다.
                </p>
              </div>
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                {(
                  [
                    { id: 'synth', label: '신스 비중 (%)' },
                    { id: 'bpm', label: '평균 BPM' },
                    { id: 'harmonic', label: '화성 복잡도' },
                  ] as const
                ).map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setTimelineMetric(m.id)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      timelineMetric === m.id
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Clean Responsive SVG Line Chart */}
            <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4">
              <svg
                viewBox="0 0 640 240"
                className="w-full h-56 overflow-visible"
                role="img"
                aria-label="연도별 R&B 음향 지표 변화 차트"
              >
                {/* Horizontal grid lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
                  const y = 24 + t * 168;
                  const minV = timelineMetric === 'bpm' ? 60 : 0;
                  const maxV = timelineMetric === 'bpm' ? 140 : 100;
                  const valLabel = Math.round(maxV - t * (maxV - minV));
                  return (
                    <g key={i}>
                      <line x1="48" y1={y} x2="612" y2={y} stroke="#E2E8F0" strokeWidth="1" />
                      <text
                        x="38"
                        y={y + 4}
                        textAnchor="end"
                        className="fill-slate-400 text-[10px] font-mono tabular-nums"
                      >
                        {valLabel}
                      </text>
                    </g>
                  );
                })}

                {(() => {
                  const minV = timelineMetric === 'bpm' ? 60 : 0;
                  const maxV = timelineMetric === 'bpm' ? 140 : 100;
                  const getX = (idx: number) => 76 + idx * 102;
                  const getY = (v: number) => 24 + ((maxV - v) / (maxV - minV)) * 168;

                  const globalPath = timelineSeries
                    .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${getX(idx)} ${getY(p.globalMean)}`)
                    .join(' ');
                  const countryPath = timelineSeries
                    .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${getX(idx)} ${getY(p.value)}`)
                    .join(' ');

                  return (
                    <>
                      {/* Global average dashed line */}
                      <path
                        d={globalPath}
                        fill="none"
                        stroke="#94A3B8"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                      />
                      {/* Selected country line */}
                      <path d={countryPath} fill="none" stroke="#0051C4" strokeWidth="3" />

                      {timelineSeries.map((p, idx) => {
                        const x = getX(idx);
                        const y = getY(p.value);
                        const gy = getY(p.globalMean);
                        const isFocused = idx === focusedDecadeIdx;
                        return (
                          <g
                            key={p.decade}
                            className="cursor-pointer"
                            onClick={() => setFocusedDecadeIdx(idx)}
                          >
                            <circle cx={x} cy={gy} r={3.5} fill="#94A3B8" />
                            <circle
                              cx={x}
                              cy={y}
                              r={isFocused ? 7 : 5}
                              fill={isFocused ? '#0051C4' : '#FFFFFF'}
                              stroke="#0051C4"
                              strokeWidth="2.5"
                            />
                            <text
                              x={x}
                              y={y - 12}
                              textAnchor="middle"
                              className="fill-slate-800 text-[11px] font-mono font-semibold tabular-nums"
                            >
                              {p.value}
                              {timelineMetric === 'bpm' ? '' : '%'}
                            </text>
                            <text
                              x={x}
                              y={216}
                              textAnchor="middle"
                              className={`text-[11px] font-mono ${
                                isFocused ? 'fill-[#0051C4] font-bold' : 'fill-slate-500'
                              }`}
                            >
                              {p.decade}
                            </text>
                          </g>
                        );
                      })}
                    </>
                  );
                })()}
              </svg>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-200/70 text-xs text-slate-600">
                <div className="flex items-center gap-5">
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-0.5 bg-[#0051C4] inline-block" />
                    <span>{COUNTRY_NAME_MAP[focusedTimelinePoint.countryCode]} 수치</span>
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-0.5 border-t-2 border-dashed border-slate-400 inline-block" />
                    <span>5개국 평균</span>
                  </span>
                </div>
                <span className="font-mono text-[11px] text-slate-500 tabular-nums">
                  {focusedTimelinePoint.decade} 기준: {focusedTimelinePoint.value}
                  {timelineMetric === 'bpm' ? ' BPM' : ' / 100'} (평균 {focusedTimelinePoint.globalMean})
                </span>
              </div>
            </div>

            {/* Selected Decade Summary Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-white">
                <div className="text-xs font-mono text-[#0051C4] font-semibold">
                  {focusedTimelinePoint.label}
                </div>
                <div className="text-sm font-bold text-slate-900 mt-1.5">
                  {focusedTimelinePoint.dominantStyle}
                </div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  주요 가사 서사: {focusedTimelinePoint.lyricTheme}
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
                <div className="text-xs text-slate-500 font-medium">시대별 평균 BPM 비교 ({focusedTimelinePoint.decade})</div>
                <div className="grid grid-cols-5 gap-2 mt-3 text-center">
                  {(Object.keys(focusedTimelinePoint.avgBpm) as Exclude<CountryCode, 'ALL'>[]).map((code) => (
                    <div
                      key={code}
                      className={`p-2 rounded-lg border ${
                        code === focusedTimelinePoint.countryCode
                          ? 'bg-white border-[#0051C4] text-[#0051C4]'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="text-[11px] font-semibold">{code}</div>
                      <div className="text-sm font-mono font-bold tabular-nums mt-0.5">
                        {focusedTimelinePoint.avgBpm[code]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: SONIC RADAR */}
        {activeLens === 'radar' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-6 flex flex-col items-center justify-center bg-slate-50/70 border border-slate-200/80 rounded-xl p-4">
              <svg viewBox="0 0 320 290" className="w-full max-w-xs" role="img" aria-label="국가별 5대 음향 축 레이더 차트">
                {/* Concentric pentagons */}
                {[0.25, 0.5, 0.75, 1].map((scale) => {
                  const pts = RADAR_AXES.map((_, idx) => {
                    const angle = (Math.PI * 2 * idx) / RADAR_AXES.length - Math.PI / 2;
                    const x = 160 + Math.cos(angle) * 96 * scale;
                    const y = 148 + Math.sin(angle) * 96 * scale;
                    return `${x.toFixed(1)},${y.toFixed(1)}`;
                  }).join(' ');
                  return (
                    <polygon
                      key={scale}
                      points={pts}
                      fill="none"
                      stroke="#E2E8F0"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Axis spokes & labels */}
                {RADAR_AXES.map((axis, idx) => {
                  const angle = (Math.PI * 2 * idx) / RADAR_AXES.length - Math.PI / 2;
                  const x2 = 160 + Math.cos(angle) * 96;
                  const y2 = 148 + Math.sin(angle) * 96;
                  const lx = 160 + Math.cos(angle) * 120;
                  const ly = 148 + Math.sin(angle) * 116;
                  return (
                    <g key={axis.key}>
                      <line x1="160" y1="148" x2={x2} y2={y2} stroke="#CBD5E1" strokeWidth="1" />
                      <text
                        x={lx}
                        y={ly + 3}
                        textAnchor="middle"
                        className="fill-slate-600 text-[10px] font-semibold"
                      >
                        {axis.label}
                      </text>
                    </g>
                  );
                })}

                {/* Global average baseline */}
                <polygon
                  points={buildRadarPolygon(globalAvgProfile, 96, 160, 148)}
                  fill="rgba(148, 163, 184, 0.16)"
                  stroke="#94A3B8"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />

                {/* Target country polygon */}
                <polygon
                  points={buildRadarPolygon(radarTargetCountry.avgProfile, 96, 160, 148)}
                  fill="rgba(0, 81, 196, 0.18)"
                  stroke="#0051C4"
                  strokeWidth="2.5"
                />
              </svg>

              <div className="flex items-center gap-5 text-xs text-slate-600 mt-1">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-xs bg-[#0051C4]/25 border border-[#0051C4] inline-block" />
                  <span>{radarTargetCountry.nameKo} ({radarTargetCountry.code})</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-xs bg-slate-300/40 border border-slate-400 inline-block" />
                  <span>5개국 평균</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div>
                <div className="text-xs font-mono text-slate-500">
                  {radarTargetCountry.nameEn} · {radarTargetCountry.eraSpan}
                </div>
                <h4 className="font-display text-xl font-bold text-slate-900 mt-1">
                  {radarTargetCountry.nameKo} — {radarTargetCountry.signatureSound}
                </h4>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {radarTargetCountry.summary}
                </p>
              </div>

              <div className="border-t border-slate-200 pt-4 space-y-2.5">
                {RADAR_AXES.map((axis) => {
                  const score = radarTargetCountry.avgProfile[axis.key];
                  const avg = globalAvgProfile[axis.key];
                  const diff = score - avg;
                  return (
                    <div key={axis.key} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-slate-700">{axis.label}</span>
                        <span className="font-mono tabular-nums text-slate-600">
                          <strong className="text-slate-900">{score}</strong>
                          <span className="text-slate-400 ml-1.5">
                            ({diff >= 0 ? `+${diff}` : diff} vs 평균)
                          </span>
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#0051C4] rounded-full transition-all duration-300"
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: TRACK DEEP DIVE + CHORD SYNTH */}
        {activeLens === 'tracks' && (
          <div className="space-y-5">
            {/* Decade tabs & Search */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-1">
                {DECADE_TABS.map((d) => (
                  <button
                    key={d.code}
                    type="button"
                    onClick={() => onDecadeChange(d.code)}
                    className={`px-2.5 py-1 text-xs font-mono font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      selectedDecade === d.code
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-60">
                <Search
                  size={14}
                  aria-hidden="true"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="아티스트, 곡명, 키워드 검색"
                  aria-label="트랙 검색"
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0051C4]"
                />
              </div>
            </div>

            {filteredTracks.length === 0 ? (
              <div className="py-12 text-center border border-dashed border-slate-200 rounded-xl">
                <p className="text-sm font-medium text-slate-700">
                  선택한 조건에 해당하는 분석 트랙이 없습니다.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onCountryChange('ALL');
                    onDecadeChange('ALL');
                    setSearchQuery('');
                  }}
                  className="mt-3 px-4 py-1.5 text-xs font-semibold text-[#0051C4] border border-[#0051C4] rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  필터 초기화
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                {/* Track list */}
                <div className="lg:col-span-5 divide-y divide-slate-200/70 border border-slate-200 rounded-xl max-h-[410px] overflow-y-auto">
                  {filteredTracks.map((track) => {
                    const isSelected = activeTrack?.id === track.id;
                    return (
                      <button
                        key={track.id}
                        type="button"
                        onClick={() => setSelectedTrackId(track.id)}
                        className={`w-full text-left px-4 py-3.5 transition-colors cursor-pointer ${
                          isSelected ? 'bg-blue-50/60' : 'bg-white hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-slate-500 tabular-nums">
                          <span>
                            {track.year} · {COUNTRY_NAME_MAP[track.country]} · {track.subgenre}
                          </span>
                          <span className="font-semibold text-slate-700">{track.bpm} BPM</span>
                        </div>
                        <div
                          className={`text-sm font-bold mt-1 truncate ${
                            isSelected ? 'text-[#0051C4]' : 'text-slate-900'
                          }`}
                        >
                          {track.title}
                        </div>
                        <div className="text-xs text-slate-600 mt-0.5 truncate">{track.artist}</div>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Track Musicological Breakdown */}
                {activeTrack && (
                  <div className="lg:col-span-7 border border-slate-200 rounded-xl p-5 bg-slate-50/40 space-y-4">
                    <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-slate-200">
                      <div>
                        <div className="text-xs font-mono text-slate-500 tabular-nums">
                          {activeTrack.year} · {COUNTRY_NAME_MAP[activeTrack.country]} · {activeTrack.album}
                        </div>
                        <h4 className="font-display text-xl font-bold text-slate-900 mt-1">
                          {activeTrack.title}
                        </h4>
                        <div className="text-sm font-medium text-[#0051C4] mt-0.5">
                          {activeTrack.artist}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleTogglePlay(activeTrack)}
                        className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          playingTrackId === activeTrack.id
                            ? 'bg-slate-900 text-white'
                            : 'bg-[#0051C4] text-white hover:bg-[#003B94]'
                        }`}
                      >
                        {playingTrackId === activeTrack.id ? (
                          <>
                            <Square size={13} aria-hidden="true" />
                            <span>코드 연주 정지</span>
                          </>
                        ) : (
                          <>
                            <Play size={13} aria-hidden="true" />
                            <span>코드 진행 들어보기</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Chord Progression & Technical Specs */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3 bg-white border border-slate-200 rounded-lg">
                        <div className="text-[11px] text-slate-500">조성 · 템포</div>
                        <div className="text-sm font-mono font-bold text-slate-900 tabular-nums mt-1">
                          {activeTrack.musicalKey} · {activeTrack.bpm} BPM
                        </div>
                      </div>
                      <div className="sm:col-span-2 p-3 bg-white border border-slate-200 rounded-lg">
                        <div className="flex items-center justify-between text-[11px] text-slate-500">
                          <span>핵심 코드 진행 (Rhodes 신스)</span>
                          {playingTrackId === activeTrack.id && (
                            <span className="inline-flex items-center gap-1 text-[#0051C4] font-semibold">
                              <Volume2 size={12} aria-hidden="true" />
                              <span>연주 중</span>
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5 mt-1 font-mono text-xs font-semibold">
                          {activeTrack.chordProgression.split(' – ').map((chord, idx) => (
                            <span
                              key={idx}
                              className={`px-2 py-0.5 rounded transition-colors ${
                                playingTrackId === activeTrack.id && activeChordStep === idx
                                  ? 'bg-[#0051C4] text-white'
                                  : 'bg-slate-100 text-slate-800'
                              }`}
                            >
                              {chord}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Analysis prose */}
                    <div className="space-y-2.5 text-sm text-slate-700 leading-relaxed">
                      <p>{activeTrack.analysisSummary}</p>
                      <p className="text-xs text-slate-500">{activeTrack.culturalContext}</p>
                    </div>

                    {/* Unboxed Metadata Definition Rows */}
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-200 text-xs">
                      <div>
                        <dt className="text-slate-500 font-medium">주요 편곡 악기</dt>
                        <dd className="text-slate-800 font-medium mt-0.5">
                          {activeTrack.instrumentation.join(' · ')}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-slate-500 font-medium">가사 모티프 · 정서</dt>
                        <dd className="text-slate-800 font-medium mt-0.5">
                          {activeTrack.lyricalMotifs.join(' · ')} ({activeTrack.moodScore})
                        </dd>
                      </div>
                    </dl>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* VIEW 4: LYRICAL & MOOD EVOLUTION */}
        {activeLens === 'lyrics' && (
          <div className="space-y-4">
            <div>
              <h4 className="font-display text-lg font-bold text-slate-900">
                1970년대–2020년대 R&amp;B 가사 화자 및 정서 키워드 변천사
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                시대가 흐르며 R&amp;B의 화자가 ‘공동체적 우리’에서 ‘도시의 로맨스’, 그리고 ‘새벽의 내밀한 나’로 이동한 과정을 정리했습니다.
              </p>
            </div>

            <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden">
              {LYRIC_EVOLUTION.map((item) => (
                <div
                  key={item.decade}
                  className="p-4 bg-white grid grid-cols-1 md:grid-cols-12 gap-4 items-start"
                >
                  <div className="md:col-span-3">
                    <div className="font-mono text-sm font-bold text-[#0051C4] tabular-nums">
                      {item.decade}
                    </div>
                    <div className="text-xs font-semibold text-slate-900 mt-0.5">
                      {item.primaryPerspective}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">{item.emotionalTone}</div>
                  </div>
                  <div className="md:col-span-6 space-y-1.5">
                    <p className="text-xs text-slate-700 leading-relaxed">{item.narrativeShift}</p>
                    <p className="text-xs text-slate-500 italic">{item.sampleMotif}</p>
                  </div>
                  <div className="md:col-span-3 md:text-right">
                    <div className="text-[11px] text-slate-400 font-medium">핵심 어휘</div>
                    <div className="text-xs font-mono text-slate-700 mt-1 leading-relaxed">
                      {item.keywords.join(' · ')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
