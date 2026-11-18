export type CountryCode = 'ALL' | 'USA' | 'UK' | 'KR' | 'JP' | 'CA';
export type DecadeCode = 'ALL' | '1970s' | '1980s' | '1990s' | '2000s' | '2010s' | '2020s';
export type AnalysisLens = 'timeline' | 'radar' | 'tracks' | 'lyrics';

export interface SonicProfile {
  groove: number;        // 0-100: 리듬 스윙 및 싱코페이션 밀도
  harmonicDepth: number; // 0-100: 재즈 텐션(7th/9th/13th) 화성 복잡도
  synthRatio: number;    // 0-100: 신시사이저·전자 음원 비중 (vs 어쿠스틱)
  vocalMelisma: number;  // 0-100: 보컬 꺾기·애드리브 및 멀티트랙 코러스 밀도
  bassWeight: number;    // 0-100: 저음역대(808/신스베이스) 음압 및 존재감
}

export interface RnbTrack {
  id: string;
  year: number;
  decade: Exclude<DecadeCode, 'ALL'>;
  country: Exclude<CountryCode, 'ALL'>;
  artist: string;
  title: string;
  album: string;
  subgenre: string;
  bpm: number;
  musicalKey: string;
  chordProgression: string;
  /** Four 4-note chord voicings in Hz for interactive Rhodes-style Web Audio synthesis */
  chordVoicings: number[][];
  instrumentation: string[];
  lyricalMotifs: string[];
  moodScore: string;
  sonicProfile: SonicProfile;
  analysisSummary: string;
  culturalContext: string;
}

export interface CountryMeta {
  code: Exclude<CountryCode, 'ALL'>;
  nameKo: string;
  nameEn: string;
  eraSpan: string;
  signatureSound: string;
  summary: string;
  avgProfile: SonicProfile;
}

export interface DecadeTimelinePoint {
  decade: Exclude<DecadeCode, 'ALL'>;
  label: string;
  avgBpm: Record<Exclude<CountryCode, 'ALL'>, number>;
  synthRatio: Record<Exclude<CountryCode, 'ALL'>, number>;
  harmonicIndex: Record<Exclude<CountryCode, 'ALL'>, number>;
  dominantStyle: string;
  lyricTheme: string;
}

export interface LyricEvolutionItem {
  decade: Exclude<DecadeCode, 'ALL'>;
  primaryPerspective: string;
  keywords: string[];
  emotionalTone: string;
  narrativeShift: string;
  sampleMotif: string;
}

export interface WorkflowStep {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  targetLens: AnalysisLens;
}

export const COUNTRIES: CountryMeta[] = [
  {
    code: 'USA',
    nameKo: '미국',
    nameEn: 'United States',
    eraSpan: '1970–2025',
    signatureSound: '가스펠·소울 뿌리에서 네오소울과 트랩소울까지',
    summary:
      '모타운과 필라델피아 소울의 앙상블 사운드에서 출발해 90년대 뉴 잭 스윙·네오소울의 아날로그 그루브를 거쳐, 2010년대 이후 808 서브베이스와 미니멀 트랩 비트를 결합한 현대 R&B의 원류를 형성했습니다.',
    avgProfile: { groove: 88, harmonicDepth: 86, synthRatio: 64, vocalMelisma: 92, bassWeight: 84 },
  },
  {
    code: 'UK',
    nameKo: '영국',
    nameEn: 'United Kingdom',
    eraSpan: '1980–2025',
    signatureSound: '애시드 재즈와 UK 개러지가 빚은 쿨한 도시 질감',
    summary:
      '미국의 가스펠 발성보다 세련된 재즈 보이싱과 클럽 일렉트로닉(2-Step, 브로큰 비트, UK 개러지) 리듬을 적극 흡수해, 절제된 보컬과 공간감 있는 신스 텍스처를 특징으로 합니다.',
    avgProfile: { groove: 82, harmonicDepth: 88, synthRatio: 78, vocalMelisma: 71, bassWeight: 79 },
  },
  {
    code: 'KR',
    nameKo: '대한민국',
    nameEn: 'South Korea',
    eraSpan: '1993–2025',
    signatureSound: '서정적 발라드 선율과 힙합 리듬의 하이브리드',
    summary:
      '90년대 한국형 발라드 감성과 미디엄 템포 그루브의 결합으로 토대를 닦은 뒤, 2010년대 사운드클라우드 기반 K-R&B와 인디 알앤비가 부상하며 몽환적 로파이 질감과 섬세한 가성 구사를 확립했습니다.',
    avgProfile: { groove: 76, harmonicDepth: 81, synthRatio: 72, vocalMelisma: 84, bassWeight: 74 },
  },
  {
    code: 'JP',
    nameKo: '일본',
    nameEn: 'Japan',
    eraSpan: '1979–2025',
    signatureSound: '시티팝 펑크·부기 유산과 정교한 코드워크',
    summary:
      '70~80년대 시티팝과 크로스오버 퓨전 재즈에서 물려받은 화려한 텐션 코드 진행을 바탕으로, 90년대 말 헤이세이 디바 시대의 댄스 R&B를 지나 최근 네오소울·로파이 밴드 사운드로 진화했습니다.',
    avgProfile: { groove: 80, harmonicDepth: 94, synthRatio: 70, vocalMelisma: 75, bassWeight: 68 },
  },
  {
    code: 'CA',
    nameKo: '캐나다',
    nameEn: 'Canada',
    eraSpan: '2011–2025',
    signatureSound: '토론토 야경의 냉기, 로우패스 필터와 서브베이스',
    summary:
      '2010년대 토론토 씬을 중심으로 로우패스 필터를 거친 먹먹한 패드, 수면 아래로 가라앉은 듯한 드럼, 극단적 808 베이스를 앞세운 다크 얼터너티브 R&B(PBR&B)의 문법을 전 세계에 정착시켰습니다.',
    avgProfile: { groove: 72, harmonicDepth: 75, synthRatio: 91, vocalMelisma: 77, bassWeight: 93 },
  },
];

export const DECADE_TIMELINE: DecadeTimelinePoint[] = [
  {
    decade: '1970s',
    label: '1970년대 · 아날로그 소울과 오케스트레이션',
    avgBpm: { USA: 98, UK: 102, KR: 84, JP: 106, CA: 92 },
    synthRatio: { USA: 22, UK: 28, KR: 14, JP: 34, CA: 20 },
    harmonicIndex: { USA: 86, UK: 82, KR: 68, JP: 90, CA: 75 },
    dominantStyle: 'Classic Soul, Funk & Quiet Storm',
    lyricTheme: '공동체 연대, 순수한 헌신, 도시 삶의 애환',
  },
  {
    decade: '1980s',
    label: '1980년대 · 신스 부기와 시티팝 크로스오버',
    avgBpm: { USA: 108, UK: 110, KR: 92, JP: 114, CA: 104 },
    synthRatio: { USA: 62, UK: 68, KR: 45, JP: 72, CA: 60 },
    harmonicIndex: { USA: 82, UK: 85, KR: 74, JP: 95, CA: 78 },
    dominantStyle: 'Boogie, Synth-Funk & Sophisti-Pop',
    lyricTheme: '야간 드라이브, 세련된 도시 로맨스, 욕망',
  },
  {
    decade: '1990s',
    label: '1990년대 · 뉴 잭 스윙에서 네오소울로',
    avgBpm: { USA: 94, UK: 98, KR: 88, JP: 96, CA: 91 },
    synthRatio: { USA: 56, UK: 64, KR: 58, JP: 66, CA: 55 },
    harmonicIndex: { USA: 89, UK: 91, KR: 80, JP: 92, CA: 82 },
    dominantStyle: 'New Jack Swing, Neo-Soul & J-R&B',
    lyricTheme: '친밀한 관계의 내면화, 이별의 정서, 자존감',
  },
  {
    decade: '2000s',
    label: '2000년대 · 팀발랜드·넵튠스 비트의 정밀화',
    avgBpm: { USA: 91, UK: 124, KR: 82, JP: 95, CA: 89 },
    synthRatio: { USA: 72, UK: 80, KR: 64, JP: 76, CA: 74 },
    harmonicIndex: { USA: 80, UK: 84, KR: 83, JP: 88, CA: 79 },
    dominantStyle: 'Contemporary R&B, 2-Step & K-Soul',
    lyricTheme: '고백과 애절함, 럭셔리 라이프스타일, 디지털 연애',
  },
  {
    decade: '2010s',
    label: '2010년대 · PBR&B와 토론토 다크 웨이브',
    avgBpm: { USA: 82, UK: 86, KR: 79, JP: 88, CA: 76 },
    synthRatio: { USA: 86, UK: 89, KR: 82, JP: 78, CA: 95 },
    harmonicIndex: { USA: 78, UK: 86, KR: 85, JP: 91, CA: 76 },
    dominantStyle: 'Alt-R&B, Trapsoul & K-Indie R&B',
    lyricTheme: '새벽의 고독, 불면, 관계의 모호함과 공허함',
  },
  {
    decade: '2020s',
    label: '2020년대 · 레트로 퓨처리즘과 글로벌 혼종',
    avgBpm: { USA: 88, UK: 112, KR: 85, JP: 94, CA: 84 },
    synthRatio: { USA: 80, UK: 84, KR: 79, JP: 74, CA: 89 },
    harmonicIndex: { USA: 85, UK: 88, KR: 86, JP: 93, CA: 81 },
    dominantStyle: 'Neo-Boom-Bap Soul, UK Alt-Soul & Lo-Fi R&B',
    lyricTheme: '자기 회복, 정체성 탐구, 국경 없는 감각적 일상',
  },
];

export const TRACKS: RnbTrack[] = [
  // 1970s
  {
    id: 'usa-1971-marvin',
    year: 1971,
    decade: '1970s',
    country: 'USA',
    artist: 'Marvin Gaye',
    title: "What's Going On",
    album: "What's Going On",
    subgenre: 'Symphonic Soul',
    bpm: 101,
    musicalKey: 'E Major',
    chordProgression: 'Emaj7 – C#m7 – Amaj7 – B7sus4',
    chordVoicings: [
      [329.63, 415.30, 493.88, 622.25], // Emaj7
      [277.18, 329.63, 415.30, 493.88], // C#m7
      [220.00, 277.18, 329.63, 415.30], // Amaj7
      [246.94, 329.63, 369.99, 440.00], // B7sus4
    ],
    instrumentation: ['콩가 퍼커션', '제임스 제머슨 베이스', '테너 색소폰', '현악 앙상블'],
    lyricalMotifs: ['반전 메시지', '세대 간 대화', '사회적 연민'],
    moodScore: '성찰적 · 따뜻한 울림',
    sonicProfile: { groove: 89, harmonicDepth: 90, synthRatio: 8, vocalMelisma: 91, bassWeight: 78 },
    analysisSummary:
      '더블 트래킹된 보컬과 재즈 기반의 메이저 7th 화성 진행이 16비트 콩가 리듬 위에 얹히며, R&B를 단순한 댄스 음악에서 앨범 단위의 사회 서사 장르로 격상시킨 기점입니다.',
    culturalContext: '베트남 전쟁과 미국의 사회적 격변기 속에서 모타운 공식을 깨고 아티스트 주도 프로덕션을 선언한 기념비적 작품입니다.',
  },
  {
    id: 'jp-1979-tatsuro',
    year: 1979,
    decade: '1970s',
    country: 'JP',
    artist: 'Tatsuro Yamashita (야마시타 타츠로)',
    title: 'Ride on Time (Demo / Moonglow Era)',
    album: 'Moonglow',
    subgenre: 'City Pop / Japanese Soul',
    bpm: 112,
    musicalKey: 'Ab Major',
    chordProgression: 'Dbmaj7 – C7 – Fm7 – Bb9',
    chordVoicings: [
      [277.18, 349.23, 415.30, 523.25],
      [261.63, 329.63, 392.00, 466.16],
      [349.23, 415.30, 523.25, 622.25],
      [233.08, 293.66, 349.23, 415.30],
    ],
    instrumentation: ['커팅 일렉 기타', '혼 섹션', '아날로그 신스 브라스', '다층 아카펠라 코러스'],
    lyricalMotifs: ['도시의 빛', '여름 해변', '질주감'],
    moodScore: '청량함 · 화려한 화성',
    sonicProfile: { groove: 87, harmonicDepth: 96, synthRatio: 38, vocalMelisma: 76, bassWeight: 69 },
    analysisSummary:
      '미국 웨스트코스트 소울과 필리 소울의 편곡 어법을 일본 특유의 9th/13th 재즈 퓨전 코드워크로 재해석해 후대 아시아 R&B 화성학의 교과서가 되었습니다.',
    culturalContext: '일본 고도성장기 말기의 도시적 감수성과 흑인 음악의 16비트 카팅 주법이 결합한 동아시아 소울의 초기 모델입니다.',
  },
  // 1980s
  {
    id: 'usa-1982-marvingaye',
    year: 1982,
    decade: '1980s',
    country: 'USA',
    artist: 'Marvin Gaye',
    title: 'Sexual Healing',
    album: 'Midnight Love',
    subgenre: 'Synth-Soul / Quiet Storm',
    bpm: 94,
    musicalKey: 'Ab Major',
    chordProgression: 'Bbm7 – Eb9 – Abmaj7 – Fm7',
    chordVoicings: [
      [233.08, 277.18, 349.23, 415.30],
      [311.13, 392.00, 466.16, 587.33],
      [207.65, 261.63, 311.13, 392.00],
      [174.61, 207.65, 261.63, 311.13],
    ],
    instrumentation: ['Roland TR-808 드럼머신', '야마하 DX 신스', '클린 펑크 기타'],
    lyricalMotifs: ['친밀감', '치유', '관능적 위로'],
    moodScore: '관능적 · 아날로그 전자음',
    sonicProfile: { groove: 86, harmonicDepth: 84, synthRatio: 68, vocalMelisma: 90, bassWeight: 82 },
    analysisSummary:
      'TR-808 드럼머신의 카우벨과 클랩이 어쿠스틱 소울 보컬과 결합하며, 80년대 이후 R&B가 전자 리듬 프로그래밍을 전면 수용하게 만든 결정적 전환점입니다.',
    culturalContext: '벨기에 오스텐드 체류 시절 제작되어 미국 콰이어트 스톰 라디오 포맷의 상징이 되었습니다.',
  },
  {
    id: 'uk-1984-sade',
    year: 1984,
    decade: '1980s',
    country: 'UK',
    artist: 'Sade',
    title: 'Smooth Operator',
    album: 'Diamond Life',
    subgenre: 'Sophisti-Pop / Brit-Soul',
    bpm: 118,
    musicalKey: 'D Minor',
    chordProgression: 'Dm7 – Gm7 – Am7 – Dm9',
    chordVoicings: [
      [293.66, 349.23, 440.00, 523.25],
      [196.00, 233.08, 293.66, 349.23],
      [220.00, 261.63, 329.63, 392.00],
      [293.66, 349.23, 440.00, 659.25],
    ],
    instrumentation: ['테너 색소폰', '라틴 퍼커션', '프렛리스 베이스', '로즈 일렉 피아노'],
    lyricalMotifs: ['코스모폴리탄 고독', '차분한 관조', '도시의 유혹'],
    moodScore: '차분함 · 세련된 여백',
    sonicProfile: { groove: 84, harmonicDepth: 89, synthRatio: 42, vocalMelisma: 64, bassWeight: 74 },
    analysisSummary:
      '과잉된 보컬 애드리브를 배제하고 중저음의 쿨한 음색과 여백 있는 라틴 재즈 리듬을 배치해, 영국 R&B 특유의 절제미를 구축했습니다.',
    culturalContext: '런던 재즈 클럽 씬과 나이지리아계 영국인 정체성이 결합해 글로벌 차트에서 Brit-Soul의 위상을 각인했습니다.',
  },
  // 1990s
  {
    id: 'usa-1995-dangelo',
    year: 1995,
    decade: '1990s',
    country: 'USA',
    artist: "D'Angelo",
    title: 'Brown Sugar',
    album: 'Brown Sugar',
    subgenre: 'Neo-Soul',
    bpm: 87,
    musicalKey: 'F# Minor',
    chordProgression: 'F#m7 – Bm7 – C#7alt – F#m9',
    chordVoicings: [
      [185.00, 220.00, 277.18, 329.63],
      [246.94, 293.66, 369.99, 440.00],
      [277.18, 349.23, 415.30, 493.88],
      [185.00, 220.00, 277.18, 415.30],
    ],
    instrumentation: ['Fender Rhodes Mk1', '아날로그 서브베이스', '더블드 스네어', '하모니 보컬'],
    lyricalMotifs: ['음악에 대한 은유', '관능', '올드스쿨 회귀'],
    moodScore: '끈적함 · 아날로그 그루브',
    sonicProfile: { groove: 95, harmonicDepth: 93, synthRatio: 26, vocalMelisma: 92, bassWeight: 86 },
    analysisSummary:
      '90년대 중반 정형화된 디지털 힙합 비트가 지배하던 시기에 생동감 있는 펜더 로즈 건반과 미세하게 뒤로 밀린 레이백(laid-back) 그루브로 네오소울 시대를 열었습니다.',
    culturalContext: 'J Dilla, Erykah Badu 등과 함께 소울퀴리언스(Soulquarians) 사운드 미학의 출발점이 되었습니다.',
  },
  {
    id: 'kr-1993-solid',
    year: 1995,
    decade: '1990s',
    country: 'KR',
    artist: '솔리드 (Solid)',
    title: '이 밤의 끝을 잡고',
    album: 'The Magic of 8 Ball',
    subgenre: 'Korean Contemporary R&B',
    bpm: 78,
    musicalKey: 'Eb Major',
    chordProgression: 'Ebmaj7 – Cm7 – Fm7 – Bb13',
    chordVoicings: [
      [311.13, 392.00, 466.16, 587.33],
      [261.63, 311.13, 392.00, 466.16],
      [174.61, 207.65, 261.63, 311.13],
      [233.08, 293.66, 349.23, 415.30],
    ],
    instrumentation: ['디지털 일렉 피아노', '3부 아카펠라 하모니', '프로그래밍 킥·스네어', '어쿠스틱 기타'],
    lyricalMotifs: ['이별의 망설임', '새벽 정서', '한국적 서정'],
    moodScore: '애절함 · 정통 하모니',
    sonicProfile: { groove: 78, harmonicDepth: 84, synthRatio: 58, vocalMelisma: 88, bassWeight: 70 },
    analysisSummary:
      '보이즈 투 멘 스타일의 정통 미국식 아카펠라 코러스와 K-발라드의 서사적 기승전결을 결합해 한국 대중음악 시장에 R&B 장르를 본격적으로 안착시켰습니다.',
    culturalContext: '미국 교포 출신 프로듀싱 팀이 본토 스튜디오 문법을 한국어 운율에 이식한 첫 대중적 성공 사례입니다.',
  },
  {
    id: 'jp-1999-utada',
    year: 1999,
    decade: '1990s',
    country: 'JP',
    artist: 'Hikaru Utada (우타다 히카루)',
    title: 'Automatic',
    album: 'First Love',
    subgenre: 'J-R&B',
    bpm: 96,
    musicalKey: 'G# Minor',
    chordProgression: 'G#m7 – C#m7 – F#7 – Bmaj7',
    chordVoicings: [
      [207.65, 246.94, 311.13, 369.99],
      [277.18, 329.63, 415.30, 493.88],
      [185.00, 233.08, 277.18, 329.63],
      [246.94, 311.13, 369.99, 466.16],
    ],
    instrumentation: ['MPC 스타일 루프 드럼', '스트링 신스', '모노 신스 리드', '리드미컬 랩-싱잉'],
    lyricalMotifs: ['직관적 끌림', '첫사랑의 긴장감', '현대적 독백'],
    moodScore: '긴장감 · 도시적 댄스 그루브',
    sonicProfile: { groove: 88, harmonicDepth: 87, synthRatio: 74, vocalMelisma: 80, bassWeight: 79 },
    analysisSummary:
      '일본어 가사의 음절 강세를 영어식 16분음표 그루브에 억지 없이 밀어 넣은 보컬 프레이징과, 서구 R&B의 어두운 단조 화성이 결합해 J-팝 판도를 바꿨습니다.',
    culturalContext: '90년대 말 일본 음반 시장에서 760만 장 이상의 판매고를 올리며 아시아 전역에 R&B 붐을 촉발했습니다.',
  },
  // 2000s
  {
    id: 'uk-2000-craigdavid',
    year: 2000,
    decade: '2000s',
    country: 'UK',
    artist: 'Craig David',
    title: '7 Days',
    album: 'Born to Do It',
    subgenre: 'UK Garage / 2-Step Soul',
    bpm: 128,
    musicalKey: 'E Minor',
    chordProgression: 'Em9 – Am7 – Cmaj7 – B7',
    chordVoicings: [
      [329.63, 392.00, 493.88, 739.99],
      [220.00, 261.63, 329.63, 392.00],
      [261.63, 329.63, 392.00, 493.88],
      [246.94, 311.13, 369.99, 440.00],
    ],
    instrumentation: ['나일론 어쿠스틱 기타', '2-Step 스킵 드럼', '서브 베이스라인', '더블 랩 보컬'],
    lyricalMotifs: ['일주일의 연애 연대기', '경쾌한 스토리텔링', '영국 일상'],
    moodScore: '유려함 · 엇박 리듬감',
    sonicProfile: { groove: 92, harmonicDepth: 82, synthRatio: 64, vocalMelisma: 84, bassWeight: 82 },
    analysisSummary:
      '전통 R&B의 80~95 BPM 문법을 깨고 128 BPM 투스텝 개러지 비트 위에 절반 템포(Half-time) 감각의 나일론 기타와 속사포 보컬을 얹은 영국 독자 진화형 R&B입니다.',
    culturalContext: '사우샘프턴과 런던 해적 라디오 씬에서 자란 UK 개러지가 주류 글로벌 R&B와 만난 상징적 트랙입니다.',
  },
  {
    id: 'usa-2003-alicia',
    year: 2003,
    decade: '2000s',
    country: 'USA',
    artist: 'Alicia Keys',
    title: "If I Ain't Got You",
    album: 'The Diary of Alicia Keys',
    subgenre: 'Classical-Infused Neo-Soul',
    bpm: 79,
    musicalKey: 'G Major',
    chordProgression: 'Gmaj7 – F#m7b5 – Em7 – Dmaj7',
    chordVoicings: [
      [196.00, 246.94, 293.66, 369.99],
      [185.00, 220.00, 261.63, 329.63],
      [329.63, 392.00, 493.88, 587.33],
      [293.66, 369.99, 440.00, 554.37],
    ],
    instrumentation: ['그랜드 피아노', '6/8박자 브러시 드럼', '브라스 앙상블', '가스펠 보컬'],
    lyricalMotifs: ['물질주의 비판', '본질적 사랑', '고전적 헌신'],
    moodScore: '웅장함 · 어쿠스틱 호소력',
    sonicProfile: { groove: 83, harmonicDepth: 88, synthRatio: 12, vocalMelisma: 95, bassWeight: 72 },
    analysisSummary:
      '2000년대 초반 디지털 신스 비트가 범람하던 시기, 6/8박자 왈츠 스윙과 클래식 피아노 아르페지오를 앞세워 어쿠스틱 소울의 지속 가능성을 증명했습니다.',
    culturalContext: '미국 R&B가 클럽 댄스 트랙과 아날로그 싱어송라이터 트랙으로 양분되던 시대의 대표적 역행 명곡입니다.',
  },
  {
    id: 'kr-2004-browneyed',
    year: 2003,
    decade: '2000s',
    country: 'KR',
    artist: '브라운 아이드 소울 (Brown Eyed Soul)',
    title: '정말 사랑했을까',
    album: 'Soul Free',
    subgenre: 'K-Soul / Vocal Group R&B',
    bpm: 74,
    musicalKey: 'C# Minor',
    chordProgression: 'C#m7 – F#m7 – B9 – Emaj7',
    chordVoicings: [
      [277.18, 329.63, 415.30, 493.88],
      [185.00, 220.00, 277.18, 329.63],
      [246.94, 311.13, 369.99, 440.00],
      [329.63, 415.30, 493.88, 622.25],
    ],
    instrumentation: ['어쿠스틱 피아노', '리얼 스트링', '4인 콰이어 화음', '일렉트릭 베이스'],
    lyricalMotifs: ['후회와 자문', '끝나지 않은 그리움', '서정적 고백'],
    moodScore: '깊은 울림 · 폭발적 성량',
    sonicProfile: { groove: 72, harmonicDepth: 85, synthRatio: 22, vocalMelisma: 96, bassWeight: 70 },
    analysisSummary:
      '흑인 가스펠의 코러스 보컬 테크닉(런·벨팅)과 한국형 발라드의 선율 구조를 극한까지 밀어붙여 2000년대 초반 K-R&B 보컬리스트 전성시대를 대표합니다.',
    culturalContext: '2000년대 한국 대중음악에서 ‘소울 보컬’이라는 키워드를 독립된 미학으로 정립한 시기입니다.',
  },
  // 2010s
  {
    id: 'ca-2011-weeknd',
    year: 2011,
    decade: '2010s',
    country: 'CA',
    artist: 'The Weeknd',
    title: 'Wicked Games',
    album: 'House of Balloons',
    subgenre: 'Alternative R&B / PBR&B',
    bpm: 64,
    musicalKey: 'F# Minor',
    chordProgression: 'F#m – Dmaj7 – Bm7 – C#m7',
    chordVoicings: [
      [185.00, 220.00, 277.18, 369.99],
      [293.66, 369.99, 440.00, 554.37],
      [246.94, 293.66, 369.99, 440.00],
      [277.18, 329.63, 415.30, 493.88],
    ],
    instrumentation: ['로우패스 신스 패드', '리버브 스네어', '서브 808 베이스', '클린 록 기타'],
    lyricalMotifs: ['공허한 유흥', '자기 파괴적 애정', '토론토의 겨울밤'],
    moodScore: '어두움 · 몽환적 잔향',
    sonicProfile: { groove: 68, harmonicDepth: 74, synthRatio: 92, vocalMelisma: 81, bassWeight: 94 },
    analysisSummary:
      '전통 R&B의 밝은 브라스와 사랑을 찬양하는 화법을 해체하고, 드림팝·포스트펑크의 음울한 공간감과 느린 64 BPM 트랩 리듬을 결합해 ‘토론토 사운드’의 기준을 세웠습니다.',
    culturalContext: '무료 믹스테이프 유통 시대에 등장해 2010년대 전 세계 Alt-R&B의 미학적 표준을 재편했습니다.',
  },
  {
    id: 'usa-2012-frank',
    year: 2012,
    decade: '2010s',
    country: 'USA',
    artist: 'Frank Ocean',
    title: 'Thinkin Bout You',
    album: 'channel ORANGE',
    subgenre: 'Art R&B / Minimalist Soul',
    bpm: 130,
    musicalKey: 'C Major',
    chordProgression: 'Fmaj7 – G6 – Em7 – Am9',
    chordVoicings: [
      [174.61, 220.00, 261.63, 329.63],
      [196.00, 246.94, 293.66, 329.63],
      [329.63, 392.00, 493.88, 587.33],
      [220.00, 261.63, 329.63, 493.88],
    ],
    instrumentation: ['아날로그 스트링 신스', '미니멀 드럼 스냅', '가성(Falsetto) 리드', '테이프 히스'],
    lyricalMotifs: ['첫사랑의 기억', '퀴어 정체성', '회상과 유머'],
    moodScore: '투명함 · 시적 내면성',
    sonicProfile: { groove: 74, harmonicDepth: 88, synthRatio: 84, vocalMelisma: 79, bassWeight: 72 },
    analysisSummary:
      '드럼 비트를 최소화하고 4개의 단순한 재즈 코드 반복 위에 시적이고 산문적인 가사, 급격한 가성 도약을 얹어 R&B 서사의 문학적 깊이를 확장했습니다.',
    culturalContext: '오드 퓨처 크루의 인디 감성과 스티브 원더식 서사성이 만나 2010년대 인디 R&B 세대에 막대한 영향을 끼쳤습니다.',
  },
  {
    id: 'kr-2016-dean',
    year: 2016,
    decade: '2010s',
    country: 'KR',
    artist: 'DEAN (딘)',
    title: 'D (Half Moon)',
    album: '130 mood : TRBL',
    subgenre: 'K-Alt-R&B',
    bpm: 84,
    musicalKey: 'Ab Major',
    chordProgression: 'Dbmaj7 – Eb6 – Cm7 – Fm9',
    chordVoicings: [
      [277.18, 349.23, 415.30, 523.25],
      [311.13, 392.00, 466.16, 523.25],
      [261.63, 311.13, 392.00, 466.16],
      [349.23, 415.30, 523.25, 783.99],
    ],
    instrumentation: ['테이프 피아노 루프', '바운시 808 킥', '로파이 비닐 노이즈', '피처링 래핑'],
    lyricalMotifs: ['반달의 결핍감', '이별 후 빈자리', '새벽 공허'],
    moodScore: '세련됨 · 몽환적 로파이',
    sonicProfile: { groove: 83, harmonicDepth: 87, synthRatio: 79, vocalMelisma: 82, bassWeight: 85 },
    analysisSummary:
      '미국 트랩소울의 808 베이스 질감과 한국적 서정 선율을 오차 없이 결합하며, 2010년대 후반 K-R&B가 글로벌 스트리밍 리스너에게 직관적으로 닿을 수 있음을 입증했습니다.',
    culturalContext: '메이저 아이돌 중심의 K-팝 시장 바깥에서 사운드클라우드·인디 크루 기반 알앤비 씬의 폭발적 성장을 견인했습니다.',
  },
  {
    id: 'uk-2017-jorja',
    year: 2017,
    decade: '2010s',
    country: 'UK',
    artist: 'Jorja Smith',
    title: 'Teenage Fantasy',
    album: 'Lost & Found',
    subgenre: 'UK Neo-Soul',
    bpm: 91,
    musicalKey: 'C Minor',
    chordProgression: 'Cm9 – Abmaj7 – Fm7 – G7alt',
    chordVoicings: [
      [261.63, 311.13, 392.00, 587.33],
      [207.65, 261.63, 311.13, 392.00],
      [174.61, 207.65, 261.63, 311.13],
      [196.00, 246.94, 311.13, 415.30],
    ],
    instrumentation: ['어쿠스틱 드럼 브레이크', '재즈 기타 아르페지오', '웜 로즈 건반', '허스키 알토 보컬'],
    lyricalMotifs: ['성장의 환상 깨짐', '10대의 연애', '자기 성찰'],
    moodScore: '담담함 · 스모키 알토',
    sonicProfile: { groove: 86, harmonicDepth: 89, synthRatio: 38, vocalMelisma: 77, bassWeight: 76 },
    analysisSummary:
      '90년대 UK 트립합과 부기 붐뱁의 거친 드럼 질감을 되살리면서, 에이미 와인하우스 이후 영국 여성 알토 보컬의 담백한 창법을 현대적으로 계승했습니다.',
    culturalContext: '영국 버밍엄·런던 씬이 트랩 대세 속에서도 어쿠스틱 붐뱁과 재즈 소울의 정체성을 지켜낸 사례입니다.',
  },
  {
    id: 'jp-2018-sirup',
    year: 2018,
    decade: '2010s',
    country: 'JP',
    artist: 'SIRUP',
    title: 'LOOP',
    album: 'SIRUP EP2',
    subgenre: 'J-Neo-Soul / Groove R&B',
    bpm: 98,
    musicalKey: 'E Minor',
    chordProgression: 'Am9 – D13 – Gmaj7 – Cmaj7',
    chordVoicings: [
      [220.00, 261.63, 329.63, 493.88],
      [293.66, 369.99, 440.00, 493.88],
      [196.00, 246.94, 293.66, 369.99],
      [261.63, 329.63, 392.00, 493.88],
    ],
    instrumentation: ['일렉트릭 기타 카팅', '모던 신스 베이스', '로즈 일렉 피아노', '타이트 킥 드럼'],
    lyricalMotifs: ['반복되는 일상', '관계의 순환', '도시 야경'],
    moodScore: '산뜻함 · 바운스 리듬',
    sonicProfile: { groove: 89, harmonicDepth: 92, synthRatio: 64, vocalMelisma: 74, bassWeight: 73 },
    analysisSummary:
      '90년대 J-R&B의 과장된 디바 보컬 대신 로버트 글래스퍼·앤더슨 팩 식의 네오소울 앙상블과 시티팝의 경쾌한 펑크 감성을 접목한 세대교체 트랙입니다.',
    culturalContext: '도쿄·오사카 밴드 씬(Nulbarich, Suchmos 등)과 맞물리며 2010년대 후반 일본 도시 R&B 부흥을 이끌었습니다.',
  },
  // 2020s
  {
    id: 'usa-2021-silksonic',
    year: 2021,
    decade: '2020s',
    country: 'USA',
    artist: 'Silk Sonic (Bruno Mars & Anderson .Paak)',
    title: 'Leave The Door Open',
    album: 'An Evening with Silk Sonic',
    subgenre: 'Retro Philadelphia Soul',
    bpm: 74,
    musicalKey: 'C Major',
    chordProgression: 'Fmaj7 – G/F – Em7 – Am7',
    chordVoicings: [
      [174.61, 220.00, 261.63, 329.63],
      [174.61, 246.94, 293.66, 392.00],
      [329.63, 392.00, 493.88, 587.33],
      [220.00, 261.63, 329.63, 392.00],
    ],
    instrumentation: ['리얼 드럼 룸 마이킹', '글로켄슈필', '스트링 & 혼 섹션', '아날로그 테이프 레코딩'],
    lyricalMotifs: ['유머러스한 유혹', '70년대 레트로 낭만', '초대'],
    moodScore: '호화로움 · 아날로그 리바이벌',
    sonicProfile: { groove: 91, harmonicDepth: 90, synthRatio: 14, vocalMelisma: 93, bassWeight: 75 },
    analysisSummary:
      '트랩과 808이 지배하던 2020년대 초 차트 한복판에서 1970년대 필라델피아 소울의 리얼 앙상블과 다이내믹 레인지를 원형 그대로 복원해 낸 레트로 퓨처리즘의 정점입니다.',
    culturalContext: '스트리밍 알고리즘의 미니멀화 추세에 맞서 풍성한 라이브 악기 편성이 여전히 대중적 파급력을 가짐을 보여주었습니다.',
  },
  {
    id: 'uk-2021-cleo',
    year: 2021,
    decade: '2020s',
    country: 'UK',
    artist: 'Cleo Sol',
    title: 'When I Was In Your Arms',
    album: 'Mother',
    subgenre: 'Spiritual Alt-Soul',
    bpm: 82,
    musicalKey: 'D Major',
    chordProgression: 'Dmaj7 – Bm7 – Em7 – A13sus4',
    chordVoicings: [
      [293.66, 369.99, 440.00, 554.37],
      [246.94, 293.66, 369.99, 440.00],
      [329.63, 392.00, 493.88, 587.33],
      [220.00, 293.66, 329.63, 392.00],
    ],
    instrumentation: ['재즈 콘트라베이스', '로우파이 브러시 드럼', '하프·어쿠스틱 기타', '내추럴 리버브 보컬'],
    lyricalMotifs: ['모성애', '영적 치유', '내면의 평온'],
    moodScore: '명상적 · 유기적 따뜻함',
    sonicProfile: { groove: 80, harmonicDepth: 91, synthRatio: 18, vocalMelisma: 76, bassWeight: 78 },
    analysisSummary:
      '프로듀서 인플로(Inflo)와 SAULT 크루의 미니멀하고 영적인 사운드 디자인 아래, 과도한 음압 경쟁(Loudness War)을 거부하고 어쿠스틱 공간감을 극대화했습니다.',
    culturalContext: '2020년대 영국 R&B가 클럽 댄스뿐만 아니라 치유와 공동체적 영성을 탐구하는 사운드 아트로 확장되었음을 보여줍니다.',
  },
  {
    id: 'kr-2022-bibi',
    year: 2022,
    decade: '2020s',
    country: 'KR',
    artist: '비비 (BIBI) · 크러쉬·콜드 계보',
    title: '조또 (JOTTO) / K-Alt-R&B Wave',
    album: 'Lowlife Princess: Noir',
    subgenre: 'K-Noir R&B / Lo-Fi Soul',
    bpm: 88,
    musicalKey: 'F Minor',
    chordProgression: 'Fm9 – DbMaj7 – Bbm7 – C7alt',
    chordVoicings: [
      [174.61, 207.65, 261.63, 392.00],
      [277.18, 349.23, 415.30, 523.25],
      [233.08, 277.18, 349.23, 415.30],
      [261.63, 329.63, 392.00, 493.88],
    ],
    instrumentation: ['디스토션 베이스', '미니멀 트랩 스네어', '위스퍼·네오소울 보컬', '시네마틱 앰비언스'],
    lyricalMotifs: ['주체적 반항', '누아르적 욕망', '솔직한 감정 표출'],
    moodScore: '도발적 · 시네마틱 누아르',
    sonicProfile: { groove: 82, harmonicDepth: 80, synthRatio: 84, vocalMelisma: 78, bassWeight: 88 },
    analysisSummary:
      '과거 한국 R&B의 수동적 이별 서사에서 벗어나, 힙합의 직설적 화법과 로파이 앰비언스를 결합해 2020년대 K-R&B의 장르적·서사적 스펙트럼을 넓혔습니다.',
    culturalContext: '디지털 싱글과 컨셉트 앨범이 공존하는 2020년대 한국 R&B의 글로벌 크로스오버 성향과 맞닿아 있습니다.',
  },
  {
    id: 'jp-2022-fujiikaze',
    year: 2022,
    decade: '2020s',
    country: 'JP',
    artist: 'Fujii Kaze (후지이 카제)',
    title: 'Shinunoga E-Wa / Matsuri Era',
    album: 'LOVE ALL SERVE ALL',
    subgenre: 'J-R&B / Jazz-Pop Crossover',
    bpm: 94,
    musicalKey: 'F# Minor',
    chordProgression: 'Bm7 – E9 – Amaj7 – F#m7',
    chordVoicings: [
      [246.94, 293.66, 369.99, 440.00],
      [329.63, 415.30, 493.88, 659.25],
      [220.00, 277.18, 329.63, 415.30],
      [185.00, 220.00, 277.18, 329.63],
    ],
    instrumentation: ['재즈 피아노', '트랩 하이햇', '오리엔탈 플루트 샘플', '라틴 베이스'],
    lyricalMotifs: ['생사의 초월', '축제의 수용', '역설적 유머'],
    moodScore: '유쾌함 · 고밀도 화성',
    sonicProfile: { groove: 85, harmonicDepth: 95, synthRatio: 66, vocalMelisma: 81, bassWeight: 74 },
    analysisSummary:
      '쇼와 가요의 선율감과 재즈 피아노 보이싱, 그리고 현대 트랩 드럼 프로그래밍을 자연스럽게 결합해 언어 장벽을 넘어 전 세계 숏폼·스트리밍 차트를 역주행했습니다.',
    culturalContext: '일본 내수 중심이던 J-R&B가 2020년대 소셜 미디어 알고리즘을 통해 글로벌 대중음악으로 재발견된 대표 사례입니다.',
  },
  {
    id: 'ca-2020-danielcaesar',
    year: 2020,
    decade: '2020s',
    country: 'CA',
    artist: 'Daniel Caesar · Giveon Lineage',
    title: 'Toronto Gospel-Alt R&B Wave',
    album: 'Case Study 01 / Contemporary Echo',
    subgenre: 'Gospel-Infused Alt-R&B',
    bpm: 76,
    musicalKey: 'Bb Major',
    chordProgression: 'Bbmaj7 – Dm7 – Gm7 – Ebmaj7',
    chordVoicings: [
      [233.08, 293.66, 349.23, 440.00],
      [293.66, 349.23, 440.00, 523.25],
      [196.00, 233.08, 293.66, 349.23],
      [311.13, 392.00, 466.16, 587.33],
    ],
    instrumentation: ['앰비언트 일렉 기타', '교회 오르간 패드', '로파이 림샷', '바리톤·팔세토 대비'],
    lyricalMotifs: ['신앙과 회의', '실존적 고백', '불완전한 사랑'],
    moodScore: '경건함 · 서늘한 공간감',
    sonicProfile: { groove: 76, harmonicDepth: 86, synthRatio: 72, vocalMelisma: 85, bassWeight: 84 },
    analysisSummary:
      '2010년대 토론토의 차가운 신스 텍스처 위에 교회 가스펠 오르간과 생기타 아르페지오를 복원해, 차가움과 따뜻함이 공존하는 2020년대 캐나다 R&B의 새로운 균형점을 제시했습니다.',
    culturalContext: '위켄드 이후 세대의 캐나다 뮤지션들이 어쿠스틱 악기와 영적 주제를 다시 끌어안으며 씬을 확장한 흐름을 대변합니다.',
  },
];

export const LYRIC_EVOLUTION: LyricEvolutionItem[] = [
  {
    decade: '1970s',
    primaryPerspective: '우리(We) · 사회적·공동체적 화자',
    keywords: ['Brother', 'Mercy', 'Soul', 'Freedom', 'Together'],
    emotionalTone: '온기 있는 연대와 희망, 사회적 성찰',
    narrativeShift: '민권운동과 도시 빈곤, 반전 메시지를 사랑 노래와 동등한 R&B 핵심 테마로 격상',
    sampleMotif: '“Mother, mother, there’s too many of you crying” — 공동체의 아픔을 어루만지는 호소',
  },
  {
    decade: '1980s',
    primaryPerspective: '너와 나(You & I) · 도시 야경 속 로맨스',
    keywords: ['Midnight', 'Neon', 'Drive', 'Fantasy', 'Groove'],
    emotionalTone: '세련된 관능미, 낭만적 탈출, 도시의 번영',
    narrativeShift: '신스 사운드의 부상과 함께 시티팝(JP)·콰이어트 스톰(US) 모두에서 야간 드라이브와 화려한 도시 이미지가 급증',
    sampleMotif: '네온사인과 해변의 밤을 배경으로 한 낭만적 질주와 도시적 유혹',
  },
  {
    decade: '1990s',
    primaryPerspective: '나와 연인 · 친밀한 관계의 심리 묘사',
    keywords: ['Forever', 'Promise', 'Heartbreak', 'Intimacy', 'End'],
    emotionalTone: '깊은 헌신 혹은 격정적 이별의 애절함',
    narrativeShift: '한국(K-R&B)과 일본(J-R&B)에서 이별의 정서를 세밀하게 묘사하는 서사 구조가 보편화되며 감성적 보컬 하모니가 극대화',
    sampleMotif: '새벽 끝자락에서 이별을 붙잡는 호소력 짙은 독백과 콰이어 코러스',
  },
  {
    decade: '2000s',
    primaryPerspective: '감각적 화자 · 클럽과 일상 사이',
    keywords: ['7 Days', 'Confession', 'Club', 'Diary', 'Truth'],
    emotionalTone: '자신감 넘치는 스웨그와 고백적 순수함의 공존',
    narrativeShift: '리듬이 빨라진 UK 개러지·팀발랜드 비트 위에서는 경쾌한 연애 스토리텔링이, 발라드 트랙에서는 일기장 같은 솔직한 고백이 공존',
    sampleMotif: '월요일부터 일요일까지 연애의 타임라인을 리드미컬하게 풀어내는 생활 밀착형 서사',
  },
  {
    decade: '2010s',
    primaryPerspective: '고립된 나(I) · 새벽과 불면의 독백',
    keywords: ['3 AM', 'Half Moon', 'Alone', 'Numb', 'Shadows'],
    emotionalTone: '내향적 우울, 냉소, 관계의 공허와 솔직한 취약성',
    narrativeShift: '캐나다·미국 PBR&B와 한국 인디 R&B가 공유하는 ‘새벽 3시’의 고독. 완벽한 영웅적 연인이 아닌 상처받고 모순된 화자가 전면에 등장',
    sampleMotif: '반쪽만 남은 달처럼 채워지지 않는 결핍과 혼자 남은 방 안의 공기 묘사',
  },
  {
    decade: '2020s',
    primaryPerspective: '다층적 자아 · 회복과 경계 해체',
    keywords: ['Heal', 'Mirror', 'Home', 'Light', 'Free'],
    emotionalTone: '자기 수용, 영적 회복, 장르와 국적을 넘나드는 유희',
    narrativeShift: '10년대의 고립감을 지나 스스로를 돌보고 치유하는 서사(UK Cleo Sol)와 당당하고 도발적인 자기 표현(KR BIBI)이 동시에 부상',
    sampleMotif: '타인의 시선에서 벗어나 나만의 리듬과 내면의 평온을 되찾는 여정',
  },
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: 'step-1',
    stepNumber: 'Step 01',
    title: '코퍼스 선정 및 시대 구분',
    subtitle: '5개국 · 1970–2025 대표 R&B 데이터셋 구축',
    description: '미국·영국·대한민국·일본·캐나다의 차트 기록, 평론 아카이브, 프로듀싱 계보를 교차 검증하여 시대별 분기점이 된 트랙들을 선별했습니다.',
    deliverables: ['1970s–2020s 6개 시대 구분', '국가별 대표 아티스트 계보도'],
    targetLens: 'timeline',
  },
  {
    id: 'step-2',
    stepNumber: 'Step 02',
    title: '음향 피처 정량화',
    subtitle: 'BPM · 전자음 비율 · 음압 밀도 측정',
    description: '트랙별 템포(BPM) 변화, 어쿠스틱 악기 대비 신시사이저 활용 비중, 808 서브베이스 중심 저음역 에너지 분포를 정량 지표로 추출했습니다.',
    deliverables: ['연대기별 평균 BPM 추이 그래프', '신스/어쿠스틱 비율 매트릭스'],
    targetLens: 'timeline',
  },
  {
    id: 'step-3',
    stepNumber: 'Step 03',
    title: '국가별 음향 프로파일링',
    subtitle: '5대 음악적 축 레이더 비교 분석',
    description: '그루브 싱코페이션, 화성 복잡도(7th/9th/13th), 신스 텍스처, 보컬 멜리스마, 베이스 중량감의 5개 축으로 각국 R&B의 고유 음색을 수치화했습니다.',
    deliverables: ['5개국 Sonic Radar 비교 차트', '글로벌 평균 대비 편차 분석'],
    targetLens: 'radar',
  },
  {
    id: 'step-4',
    stepNumber: 'Step 04',
    title: '화성 및 편곡 해체',
    subtitle: '대표 코드 진행 추출 및 실시간 신스 청음',
    description: '각 트랙의 핵심 마디에서 사용된 재즈 텐션 코드 진행을 악보화하고, 웹 오디오(Web Audio API) 로즈 피아노 신스로 직접 들어볼 수 있도록 구현했습니다.',
    deliverables: ['트랙별 조성·코드 진행 데이터', '실시간 화성 신시사이저 플레이어'],
    targetLens: 'tracks',
  },
  {
    id: 'step-5',
    stepNumber: 'Step 05',
    title: '가사 서사 및 정서 마이닝',
    subtitle: '시대별 화자 시점과 핵심 키워드 변천 추적',
    description: '1970년대의 ‘우리(We)’에서 2010년대 ‘고립된 나(3 AM)’, 2020년대 ‘회복과 주체성’으로 이어지는 가사 시점과 핵심 어휘의 이동을 정리했습니다.',
    deliverables: ['6개 시대 서사 키워드 매트릭스', '정서 톤 변화 타임라인'],
    targetLens: 'lyrics',
  },
  {
    id: 'step-6',
    stepNumber: 'Step 06',
    title: '인터랙티브 아카이브 공개',
    subtitle: '필터 탐색과 CSV 리서치 데이터 내보내기',
    description: '모든 분석 결과를 단일 리포트가 아닌 탐색형 웹 아카이브로 구조화해, 발표 현장에서 국가와 연도를 교차 선택하며 즉각 비교할 수 있도록 구성했습니다.',
    deliverables: ['국가×연도 교차 필터 뷰', '분석 데이터 CSV 다운로드 지원'],
    targetLens: 'tracks',
  },
];

export const RESEARCH_TOOLS = [
  {
    name: 'Python / Librosa',
    role: 'Audio Feature Extraction',
    detail: 'BPM, 스펙트럼 센트로이드, 저음역 에너지 등 음향 지표 추출 및 정규화',
    badge: 'PY',
    color: '#0051C4',
  },
  {
    name: 'MusicBrainz · Discogs',
    role: 'Metadata & Lineage',
    detail: '발매 연도, 프로듀서 크레딧, 세션 악기 편성 및 레이블 계보 교차 검증',
    badge: 'DB',
    color: '#0F172A',
  },
  {
    name: 'React · TypeScript',
    role: 'Interactive Archive UI',
    detail: '국가별·연도별 다차원 필터링 및 SVG 기반 데이터 시각화 컴포넌트 구현',
    badge: 'TS',
    color: '#1E40AF',
  },
  {
    name: 'Web Audio API',
    role: 'Harmonic Synthesizer',
    detail: '외부 음원 의존 없이 브라우저 내에서 각 곡의 7th/9th 코드 진행을 실시간 연주',
    badge: 'HZ',
    color: '#334155',
  },
];

export const TEAM_MEMBERS = [
  {
    name: '김도윤',
    role: 'Sound Analysis & Data Lead',
    focus: '음향 피처 추출 · 미국/캐나다 R&B 계보 분석',
  },
  {
    name: '이서연',
    role: 'Musicology & Lyric Research',
    focus: '화성·코드 진행 채보 · 가사 서사 키워드 분석',
  },
  {
    name: '박준혁',
    role: 'Frontend & Audio Visualization',
    focus: '인터랙티브 아카이브 UI · Web Audio 신스 구현',
  },
];
