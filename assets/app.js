/**
 * AI 사역도구 (AI Ministry Assets & Shorts Studio)
 * Production JavaScript Engine
 * Copyright 2026 AI 사역도구. All rights reserved.
 */

// ================= SMOOTH SCROLL HELPERS =================
function scrollToUploadArea() {
  const el = document.getElementById('console-section');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ================= GLOBAL STATE =================
let currentInputMode = 'paste'; // 'paste' | 'yt' | 'file'
let currentYouTubeId = 'z5D_B9I7l1Y';
let currentYouTubeTitle = '너는 복이 될지라';
let currentYouTubeScripture = '창세기 12:1-3';
let currentFileVideoUrl = null;
let currentFileAudioUrl = null;
let currentFileName = '';
let currentFileType = ''; // 'video' | 'audio' | 'doc'
let isShortsCropMode = true; // true: 9:16 vertical crop, false: 16:9 widescreen
let currentClipIndex = 1;
let isPlaying = true;
let isMuted = true;
let clipElapsedSec = 0;
let playbackTimer = null;
let currentActiveStudioTab = 'shorts';

// Preset Sermons Database for Instant & Accurate Matching
const sermonPresets = {
  'z5D_B9I7l1Y': {
    title: '너는 복이 될지라',
    scripture: '창세기 12장 1-3절',
    preacher: '관유중앙교회 송기운 담임목사',
    coreMessage: '하나님은 우리를 단순한 수혜자가 아닌, 열방을 향한 축복의 거룩한 통로로 부르셨습니다. 본토 친척 아비 집을 떠나는 믿음의 결단으로 나아갈 때 하늘의 복이 임합니다.',
    points: [
      '1대지: 안주하는 옛 삶을 떠나는 믿음의 첫걸음 (창 12:1)',
      '2대지: 복의 근원이 되는 성도의 거룩한 정체성 (창 12:2)',
      '3대지: 땅의 모든 족속을 살리고 치유하는 축복의 통로 (창 12:3)'
    ],
    shorts: {
      1: {
        title: '복의 근원이 되는 결단',
        tag: '🔥 감정 고조도 98%',
        sub: '도입: 떠남의 결단(15s) → 전환: 약속의 신실함(20s) → 결단: 축복의 선언(15s)',
        startSec: 0,
        duration: 12,
        scenes: [
          { start: 0, end: 4, label: '씬 1 [00:00]', subtitle: '“머무르는 신앙에는 <span class=\'text-blue-400 font-bold\'>기적이 없습니다</span>. 믿음으로 떠나십시오.”' },
          { start: 4, end: 8, label: '씬 2 [00:04]', subtitle: '“하나님은 당신을 단순한 피해자가 아닌 <span class=\'text-blue-400 font-bold\'>복의 통로</span>로 부르셨습니다.”' },
          { start: 8, end: 12, label: '씬 3 [00:08]', subtitle: '“너는 복이 될지라! 오늘 주님의 그 <span class=\'text-blue-400 font-bold\'>거룩한 약속을 붙드십시오</span>.”' }
        ]
      },
      2: {
        title: '약속을 붙들고 나아가는 믿음',
        tag: '💡 감동·위로 95%',
        sub: '보이지 않는 길 앞에서도 인도하시는 전능자의 손길을 신뢰함',
        startSec: 45,
        duration: 12,
        scenes: [
          { start: 0, end: 4, label: '씬 1 [00:45]', subtitle: '“갈 바를 알지 못해도 <span class=\'text-blue-400 font-bold\'>말씀을 따라가는 사람</span>이 승리합니다.”' },
          { start: 4, end: 8, label: '씬 2 [00:49]', subtitle: '“하나님의 약속은 우리의 <span class=\'text-blue-400 font-bold\'>환경과 계산을 뛰어넘습니다</span>.”' },
          { start: 8, end: 12, label: '씬 3 [00:53]', subtitle: '“너를 축복하는 자에게 복을 내리시는 <span class=\'text-blue-400 font-bold\'>주님의 신실하심</span>을 믿으십시오.”' }
        ]
      },
      3: {
        title: '세상을 살리는 축복의 통로',
        tag: '⚡️ 결단·도전 93%',
        sub: '나만의 울타리를 넘어 이웃과 열방을 주께로 인도하는 성도의 사명',
        startSec: 120,
        duration: 12,
        scenes: [
          { start: 0, end: 4, label: '씬 1 [02:00]', subtitle: '“진정한 복은 <span class=\'text-blue-400 font-bold\'>흘러넘쳐 이웃을 적실 때</span> 완성됩니다.”' },
          { start: 4, end: 8, label: '씬 2 [02:04]', subtitle: '“여러분의 가정과 일터가 <span class=\'text-blue-400 font-bold\'>생명수의 진원지</span>가 되기를 축복합니다.”' },
          { start: 8, end: 12, label: '씬 3 [02:08]', subtitle: '“땅의 모든 족속이 <span class=\'text-blue-400 font-bold\'>너로 말미암아 복을 얻으리라</span>.”' }
        ]
      }
    }
  },
  '8fD5PjS5tQ4': {
    title: '관유의 능력과 평화',
    scripture: '시편 133편 1-3절',
    preacher: '관유중앙교회 송기운 담임목사',
    coreMessage: '형제가 연합하여 동거함이 어찌 그리 선하고 아름다운지요! 거룩한 기름부으심과 헐몬의 이슬이 임하는 공동체에 하나님은 영원한 생명의 복을 명하십니다.',
    points: [
      '1대지: 아론의 수염을 타고 옷깃까지 흐르는 거룩한 기름부음 (시 133:2)',
      '2대지: 메마른 대지를 적시는 헐몬의 신선한 하늘 이슬 (시 133:3a)',
      '3대지: 거기서 하나님께서 친히 명하신 영생의 복 (시 133:3b)'
    ],
    shorts: {
      1: {
        title: '연합할 때 부어지는 기름부음',
        tag: '🔥 감정 고조도 98%',
        sub: '아론의 머리에서 흘러내리는 성령의 거룩한 기름부으심의 임재',
        startSec: 10,
        duration: 12,
        scenes: [
          { start: 0, end: 4, label: '씬 1 [00:10]', subtitle: '“성령의 기름부으심은 <span class=\'text-blue-400 font-bold\'>연합하는 곳에</span> 거침없이 흘러내립니다.”' },
          { start: 4, end: 8, label: '씬 2 [00:14]', subtitle: '“분열과 다툼을 멈추고 <span class=\'text-blue-400 font-bold\'>예수의 사랑으로 하나 될 때</span> 능력이 나타납니다.”' },
          { start: 8, end: 12, label: '씬 3 [00:18]', subtitle: '“그 거룩한 관유가 오늘 <span class=\'text-blue-400 font-bold\'>당신의 심령을 가득 채우실 것</span>입니다.”' }
        ]
      },
      2: {
        title: '헐몬의 이슬 같은 하늘의 은혜',
        tag: '💡 감동·위로 96%',
        sub: '밤새 대지를 촉촉하게 적시는 생명의 이슬과 시온의 회복',
        startSec: 60,
        duration: 12,
        scenes: [
          { start: 0, end: 4, label: '씬 1 [01:00]', subtitle: '“아무도 모르게 소리 없이 내리는 <span class=\'text-blue-400 font-bold\'>이슬 같은 은혜</span>가 있습니다.”' },
          { start: 4, end: 8, label: '씬 2 [01:04]', subtitle: '“메마르고 지친 마음에 <span class=\'text-blue-400 font-bold\'>하늘의 생명수</span>가 스며들기 시작합니다.”' },
          { start: 8, end: 12, label: '씬 3 [01:08]', subtitle: '“시온의 산들에 내리는 이슬처럼 <span class=\'text-blue-400 font-bold\'>성도의 삶은 소생합니다</span>.”' }
        ]
      },
      3: {
        title: '영원한 생명의 복을 누리는 공동체',
        tag: '⚡️ 결단·도전 93%',
        sub: '하나님이 친히 보증하시고 명령하신 영원한 생명의 축복',
        startSec: 130,
        duration: 12,
        scenes: [
          { start: 0, end: 4, label: '씬 1 [02:10]', subtitle: '“세상의 복은 지나가지만 <span class=\'text-blue-400 font-bold\'>하나님이 명하신 복</span>은 영원합니다.”' },
          { start: 4, end: 8, label: '씬 2 [02:14]', subtitle: '“주 안에서 한마음으로 기도하는 가정마다 <span class=\'text-blue-400 font-bold\'>생명의 역사가</span> 일어납니다.”' },
          { start: 8, end: 12, label: '씬 3 [02:18]', subtitle: '“거기서 여호와께서 복을 명하셨나니 <span class=\'text-blue-400 font-bold\'>곧 영생이로다</span>!”' }
        ]
      }
    }
  },
  'W8744U1mE6Q': {
    title: '광야에서 길을 내시는 하나님',
    scripture: '이사야 43장 18-21절',
    preacher: '관유중앙교회 송기운 담임목사',
    coreMessage: '너희는 이전 일을 기억하지 말며 옛날 일을 생각하지 말라! 보라 내가 새 일을 행하리니 이제 나타낼 것이라. 하나님은 사막에 강을 내시며 광야에 대로를 여십니다.',
    points: [
      '1대지: 과거의 상처와 실패를 털어내는 영적 출애굽 (사 43:18)',
      '2대지: 눈앞에 보이지 않아도 이미 시작된 새 일 (사 43:19)',
      '3대지: 하나님을 찬송하도록 지음받은 주 백성의 사명 (사 43:21)'
    ],
    shorts: {
      1: {
        title: '이전 일에 갇히지 않는 믿음',
        tag: '🔥 감정 고조도 99%',
        sub: '과거의 후회와 실패를 딛고 하나님이 여시는 새 미래를 향한 전진',
        startSec: 15,
        duration: 12,
        scenes: [
          { start: 0, end: 4, label: '씬 1 [00:15]', subtitle: '“어제의 실패가 <span class=\'text-blue-400 font-bold\'>당신의 내일을 규정하지 못합니다</span>.”' },
          { start: 4, end: 8, label: '씬 2 [00:19]', subtitle: '“옛날 일을 생각하지 마십시오. <span class=\'text-blue-400 font-bold\'>하나님의 시선은 내일</span>을 향하고 계십니다.”' },
          { start: 8, end: 12, label: '씬 3 [00:23]', subtitle: '“보라 내가 새 일을 행하리니 <span class=\'text-blue-400 font-bold\'>이제 나타낼 것이라</span>!”' }
        ]
      },
      2: {
        title: '사막에 강을 내시는 하나님의 손길',
        tag: '💡 감동·위로 95%',
        sub: '도저히 불가능해 보이는 광야 한가운데서 터져 나오는 생명수',
        startSec: 75,
        duration: 12,
        scenes: [
          { start: 0, end: 4, label: '씬 1 [01:15]', subtitle: '“인간의 계산이 끝나는 자리에서 <span class=\'text-blue-400 font-bold\'>기적이 시작됩니다</span>.”' },
          { start: 4, end: 8, label: '씬 2 [01:19]', subtitle: '“광야에 길을, 사막에 마르지 않는 강을 <span class=\'text-blue-400 font-bold\'>주님이 내실 것입니다</span>.”' },
          { start: 8, end: 12, label: '씬 3 [01:23]', subtitle: '“말씀을 믿고 발을 내딛는 자에게 <span class=\'text-blue-400 font-bold\'>대로가 열립니다</span>.”' }
        ]
      },
      3: {
        title: '새 일을 시작하시는 주님의 시간표',
        tag: '⚡️ 결단·도전 94%',
        sub: '나를 통해 영광 받으실 하나님을 바라보는 찬송의 회복',
        startSec: 140,
        duration: 12,
        scenes: [
          { start: 0, end: 4, label: '씬 1 [02:20]', subtitle: '“광야의 여정은 방황이 아니라 <span class=\'text-blue-400 font-bold\'>믿음의 연단</span>입니다.”' },
          { start: 4, end: 8, label: '씬 2 [02:24]', subtitle: '“이 백성은 내가 나를 위하여 지었나니 <span class=\'text-blue-400 font-bold\'>나를 찬송하게 하려 함이라</span>.”' },
          { start: 8, end: 12, label: '씬 3 [02:28]', subtitle: '“오늘 광야에서 승리의 찬양을 <span class=\'text-blue-400 font-bold\'>선제적으로 올리십시오</span>!”' }
        ]
      }
    }
  }
};

// Default studio clips state
let studioClips = sermonPresets['z5D_B9I7l1Y'].shorts;

// Generated Ministry Assets Repository
let generatedMinistryAssets = {
  sermonTitle: '염려를 기도로 바꾸라',
  scripture: '빌립보서 4:6-7',
  preacher: '관유중앙교회 담임목사',
  targetAudience: '장년부 & 전체',
  smallGroupText: '',
  qtText: '',
  cardNewsCards: [],
  cardNewsText: '',
  outlineText: '',
  kakaoText: '',
  bulletinText: '',
  srtText: '',
  ytInfoText: ''
};

// ================= YOUTUBE POSTMESSAGE HELPER =================
function sendYtCommand(iframeId, func, args = []) {
  const iframe = document.getElementById(iframeId);
  if (iframe && iframe.contentWindow) {
    iframe.contentWindow.postMessage(JSON.stringify({
      event: 'command',
      func: func,
      args: args
    }), '*');
  }
}

// ================= INPUT TABS SWITCHING =================
function selectUploadTab(tab, triggerModal = false) {
  currentInputMode = tab;
  const tabPaste = document.getElementById('upload-tab-paste');
  const tabYt = document.getElementById('upload-tab-yt');
  const tabFile = document.getElementById('upload-tab-file');

  const contentPaste = document.getElementById('upload-content-paste');
  const contentYt = document.getElementById('upload-content-yt');
  const contentFile = document.getElementById('upload-content-file');

  const defClass = 'flex items-center justify-center gap-2 py-3 rounded-xl text-[13px] sm:text-[14px] font-bold transition-all text-slate-600 hover:text-slate-900 border border-transparent';
  if (tabPaste) tabPaste.className = defClass;
  if (tabYt) tabYt.className = defClass;
  if (tabFile) tabFile.className = defClass;

  if (contentPaste) { contentPaste.classList.add('hidden'); contentPaste.classList.remove('block'); }
  if (contentYt) { contentYt.classList.add('hidden'); contentYt.classList.remove('block'); }
  if (contentFile) { contentFile.classList.add('hidden'); contentFile.classList.remove('block'); }

  if (tab === 'paste') {
    if (tabPaste) tabPaste.className = 'flex items-center justify-center gap-2 py-3 rounded-xl text-[13px] sm:text-[14px] font-bold transition-all bg-white text-blue-700 shadow-xs border border-blue-200';
    if (contentPaste) { contentPaste.classList.remove('hidden'); contentPaste.classList.add('block'); }
  } else if (tab === 'yt') {
    if (tabYt) tabYt.className = 'flex items-center justify-center gap-2 py-3 rounded-xl text-[13px] sm:text-[14px] font-bold transition-all bg-white text-red-600 shadow-xs border border-red-200';
    if (contentYt) { contentYt.classList.remove('hidden'); contentYt.classList.add('block'); }
    if (triggerModal) {
      openYouTubeModal();
    }
  } else if (tab === 'file') {
    if (tabFile) tabFile.className = 'flex items-center justify-center gap-2 py-3 rounded-xl text-[13px] sm:text-[14px] font-bold transition-all bg-white text-blue-700 shadow-xs border border-blue-200';
    if (contentFile) { contentFile.classList.remove('hidden'); contentFile.classList.add('block'); }
  }
}

async function pasteToYouTubeInput() {
  const input = document.getElementById('youtube-url-input');
  if (!input) return;
  try {
    if (navigator.clipboard && navigator.clipboard.readText) {
      const text = await navigator.clipboard.readText();
      if (text && text.trim().length > 0) {
        input.value = text.trim();
        handleYouTubeInput(input.value);
        showToast('유튜브 링크를 붙여넣었습니다! ✓', '📋');
        return;
      }
    }
  } catch (e) {
    console.warn(e);
  }
  input.focus();
  showToast('단축키(Ctrl+V / Cmd+V)로 링크를 붙여넣어 주세요.', 'ℹ️');
}

// ================= TAB 1: MANUSCRIPT TEXT =================
function updateCharCount(textarea) {
  if (!textarea) return;
  const val = textarea.value;
  const len = val.length;
  const counter = document.getElementById('char-counter');
  if (counter) counter.textContent = `${len.toLocaleString()} / 40,000자`;

  const badge = document.getElementById('manuscript-status-badge');
  const titleEl = document.getElementById('manuscript-status-title');
  const countEl = document.getElementById('manuscript-status-count');

  if (len > 10) {
    if (badge) { badge.classList.remove('hidden'); badge.classList.add('flex'); }
    const lines = val.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    let preview = lines[0] || '설교 원고';
    preview = preview.replace(/[\[\]"']/g, '');
    if (preview.length > 25) preview = preview.substring(0, 25) + '...';
    if (titleEl) titleEl.textContent = `설교 인식: "${preview}"`;
    if (countEl) countEl.textContent = `${len.toLocaleString()}자 입력됨`;
  } else {
    if (badge) { badge.classList.add('hidden'); badge.classList.remove('flex'); }
  }
}

async function pasteFromClipboard() {
  const ta = document.getElementById('manuscript-input');
  if (!ta) return;
  try {
    if (navigator.clipboard && navigator.clipboard.readText) {
      const txt = await navigator.clipboard.readText();
      if (txt && txt.trim().length > 0) {
        ta.value = txt;
        updateCharCount(ta);
        showToast('클립보드에서 설교 원고를 붙여넣었습니다! ✓', '📋');
        return;
      }
    }
  } catch (e) {
    console.warn('Clipboard read error:', e);
  }
  ta.focus();
  showToast('입력창을 클릭하신 후 Ctrl+V (맥: Cmd+V)로 원고를 붙여넣으세요.', 'ℹ️');
}

function clearManuscript() {
  const ta = document.getElementById('manuscript-input');
  if (ta) {
    ta.value = '';
    updateCharCount(ta);
  }
  showToast('설교 원고 입력창이 비워졌습니다.', '🗑️');
}

function loadSampleManuscript() {
  const ta = document.getElementById('manuscript-input');
  if (ta) {
    ta.value = `[빌립보서 4장 6-7절 "염려를 기도로 바꾸라"]

■ 서론: 염려의 무의미함을 직시하라
성도 여러분, 우리가 살아가면서 겪는 수많은 염려는 문제 해결에 아무런 도움을 주지 못합니다. 염려는 문제의 해결이 아니라 우리 영혼의 거룩한 에너지를 소모시킬 뿐입니다. 오늘 사도 바울은 차가운 로마 감옥에 갇혀 있으면서도 성도들을 향해 단호하게 선포합니다. "아무것도 염려하지 말라."

■ 1대지: 모든 일에 기도와 감사로 전환하라 (빌 4:6)
그렇다면 염려가 몰려올 때 우리는 어떻게 해야 합니까? 바울은 염려를 억누르려 하지 말고 기도로 전환하라고 권면합니다. "오직 모든 일에 기도와 간구로, 너희 구할 것을 감사함으로 하나님께 아뢰라."
상황이 바뀌기 전에도 감사함으로 기도를 시작할 때, 절망의 자리에 믿음의 불꽃이 타오르기 시작합니다. 하나님은 문제를 피하게 하시는 분이 아니라, 문제 한가운데서 우리를 지키시는 전능자이십니다.

■ 2대지: 모든 지각에 뛰어난 하나님의 개입 (빌 4:7a)
인간의 좁은 시야와 계산으로는 도저히 풀리지 않는 절망의 순간에도 하나님의 지각은 우리의 생각을 아득히 뛰어넘습니다. 우리가 무릎 꿇을 때 하늘의 지혜와 자원이 움직이며, 상상할 수 없었던 신비로운 주님의 해결책이 임합니다.

■ 3대지: 마음과 생각을 지키시는 그리스도의 평강 (빌 4:7b)
"그리하면 모든 지각에 뛰어난 하나님의 평강이 그리스도 예수 안에서 너희 마음과 생각을 지키시리라."
기도한 직후에도 외적인 환경은 그대로일 수 있습니다. 그러나 하나님은 그 어떤 비바람도 흔들 수 없는 하늘의 평강으로 우리 내면을 성벽처럼 감싸 안으십니다.

■ 결론: 염려의 짐을 십자가 앞에 내려놓으라
사랑하는 성도 여러분, 오늘 예배를 마치고 세상으로 나아갈 때, 마음에 품었던 모든 염려의 보따리를 주님의 십자가 앞에 온전히 내려놓으십시오. 주님의 평강이 여러분의 가정과 일터를 굳건하게 지키실 것입니다.`;
    updateCharCount(ta);
  }
  selectUploadTab('paste');
  showToast('예시 설교 원고(빌립보서 4:6-7)가 입력되었습니다.', '✨');
}

// ================= TAB 2: YOUTUBE LINK =================
function extractYouTubeId(url) {
  if (!url) return null;
  url = url.trim();
  let m = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (m) return m[1];
  m = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (m) return m[1];
  m = url.match(/embed\/([a-zA-Z0-9_-]{11})/);
  if (m) return m[1];
  m = url.match(/shorts\/([a-zA-Z0-9_-]{11})/);
  if (m) return m[1];
  m = url.match(/^([a-zA-Z0-9_-]{11})$/);
  if (m) return m[1];
  return null;
}

function handleYouTubeInput(val) {
  const id = extractYouTubeId(val);
  const card = document.getElementById('yt-recognized-card');
  const thumb = document.getElementById('yt-recognized-thumb');
  const idEl = document.getElementById('yt-recognized-id');
  const descEl = document.getElementById('yt-recognized-desc');

  if (id) {
    currentYouTubeId = id;
    currentInputMode = 'yt';
    if (card) { card.classList.remove('hidden'); card.classList.add('flex'); }
    if (thumb) thumb.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    
    const preset = sermonPresets[id];
    if (preset) {
      currentYouTubeTitle = preset.title;
      currentYouTubeScripture = preset.scripture;
      if (idEl) idEl.textContent = `설교: "${preset.title}" (${preset.scripture})`;
      if (descEl) descEl.textContent = `유튜브 ID: ${id} · 목사님의 실제 설교 영상 쇼츠 생성 준비 완료`;
    } else {
      currentYouTubeTitle = '주일 예배 설교';
      currentYouTubeScripture = '주일 본문 말씀';
      if (idEl) idEl.textContent = `유튜브 설교 영상 ID: ${id}`;
      if (descEl) descEl.textContent = `목사님의 실제 설교 영상이 9:16 모바일 쇼츠 플레이어에 연동됩니다.`;
    }
  } else if (!val || val.trim().length === 0) {
    if (card) { card.classList.add('hidden'); card.classList.remove('flex'); }
  }
}

function loadSampleYouTube(id, title, scripture) {
  const input = document.getElementById('youtube-url-input');
  if (input) {
    input.value = `https://www.youtube.com/watch?v=${id}`;
  }
  currentYouTubeId = id;
  currentYouTubeTitle = title || '주일 설교';
  currentYouTubeScripture = scripture || '';
  currentInputMode = 'yt';

  const card = document.getElementById('yt-recognized-card');
  const thumb = document.getElementById('yt-recognized-thumb');
  const idEl = document.getElementById('yt-recognized-id');
  const descEl = document.getElementById('yt-recognized-desc');

  if (card) { card.classList.remove('hidden'); card.classList.add('flex'); }
  if (thumb) thumb.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  if (idEl) idEl.textContent = `설교: "${currentYouTubeTitle}" (${currentYouTubeScripture})`;
  if (descEl) descEl.textContent = `유튜브 영상 ID: ${id} · 목사님의 실제 설교 영상 쇼츠 생성 준비 완료`;

  selectUploadTab('yt');
  showToast(`주일 설교 ["${currentYouTubeTitle}"] 영상이 선택되었습니다.`, '✨');
}

function applyYouTubeLinkAndStart() {
  const input = document.getElementById('youtube-url-input');
  const val = input ? input.value : '';
  const id = extractYouTubeId(val);
  if (id) {
    currentYouTubeId = id;
    currentInputMode = 'yt';
    showToast(`설교 영상 [ID: ${id}] 인식 완료! 쇼츠 생성을 시작합니다.`, '🎬');
    startStudioGeneration();
  } else {
    showToast('올바른 유튜브 링크를 입력하시거나 위의 예시 설교 버튼을 눌러주세요.', '⚠️');
  }
}

// ================= TAB 3: FILE UPLOAD & DRAG/DROP =================
function handleDragOver(e) {
  e.preventDefault();
  e.stopPropagation();
  const dropzone = document.getElementById('file-dropzone');
  if (dropzone) {
    dropzone.classList.add('border-blue-500', 'bg-blue-50/70', 'ring-4', 'ring-blue-100');
  }
}

function handleDragLeave(e) {
  e.preventDefault();
  e.stopPropagation();
  const dropzone = document.getElementById('file-dropzone');
  if (dropzone) {
    dropzone.classList.remove('border-blue-500', 'bg-blue-50/70', 'ring-4', 'ring-blue-100');
  }
}

function handleFileDrop(e) {
  e.preventDefault();
  e.stopPropagation();
  handleDragLeave(e);
  if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
    processUploadedFile(e.dataTransfer.files[0]);
  }
}

function simulateFileUpload() {
  const realInput = document.getElementById('real-file-input');
  if (realInput) realInput.click();
}

function handleFileSelected(input) {
  if (input.files && input.files[0]) {
    processUploadedFile(input.files[0]);
  }
}

function clearSelectedFile(e) {
  if (e) e.stopPropagation();
  const realInput = document.getElementById('real-file-input');
  if (realInput) realInput.value = '';
  const card = document.getElementById('file-recognized-card');
  if (card) { card.classList.add('hidden'); card.classList.remove('flex'); }
  currentFileVideoUrl = null;
  currentFileAudioUrl = null;
  currentFileName = '';
  currentFileType = '';
  showToast('선택된 파일이 취소되었습니다.', '🗑️');
}

function processUploadedFile(file) {
  if (!file) return;
  currentFileName = file.name;
  const fileNameLower = file.name.toLowerCase();

  const card = document.getElementById('file-recognized-card');
  const nameEl = document.getElementById('file-recognized-name');
  const sizeEl = document.getElementById('file-recognized-size');
  const badgeEl = document.getElementById('file-type-badge');
  const iconEl = document.getElementById('file-type-icon');

  const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
  if (nameEl) nameEl.textContent = file.name;
  if (sizeEl) sizeEl.textContent = `${sizeMb} MB`;
  if (card) { card.classList.remove('hidden'); card.classList.add('flex'); }

  // 1. Text or Markdown file
  if (file.type.startsWith('text/') || fileNameLower.endsWith('.txt') || fileNameLower.endsWith('.md')) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const content = e.target.result;
      const ta = document.getElementById('manuscript-input');
      if (ta) {
        ta.value = content;
        updateCharCount(ta);
      }
      selectUploadTab('paste');
      showToast(`설교 원고 파일 [${file.name}] 내용을 성공적으로 불러왔습니다!`, '📝');
    };
    reader.readAsText(file, 'utf-8');
    return;
  }

  // 2. Video file
  if (file.type.startsWith('video/') || fileNameLower.endsWith('.mp4') || fileNameLower.endsWith('.mov')) {
    currentInputMode = 'file';
    currentFileType = 'video';
    currentFileVideoUrl = URL.createObjectURL(file);
    if (badgeEl) badgeEl.textContent = '설교 영상(MP4) 등록 완료';
    if (iconEl) iconEl.textContent = '🎬';
    selectUploadTab('file');
    showToast(`설교 영상 [${file.name}] 등록 완료! 쇼츠 생성을 시작하세요.`, '🎬');
    return;
  }

  // 3. Audio file
  if (file.type.startsWith('audio/') || fileNameLower.endsWith('.mp3') || fileNameLower.endsWith('.m4a') || fileNameLower.endsWith('.wav')) {
    currentInputMode = 'file';
    currentFileType = 'audio';
    currentFileAudioUrl = URL.createObjectURL(file);
    if (badgeEl) badgeEl.textContent = '설교 녹음(음성) 등록 완료';
    if (iconEl) iconEl.textContent = '🎙️';
    selectUploadTab('file');
    showToast(`설교 녹음 [${file.name}] 등록 완료! 음성 기반 사역 자료를 생성합니다.`, '🎙️');
    return;
  }

  // 4. Document file (HWP, DOCX, PDF)
  currentInputMode = 'file';
  currentFileType = 'doc';
  if (badgeEl) badgeEl.textContent = '설교 문서 등록 완료';
  if (iconEl) iconEl.textContent = '📄';
  selectUploadTab('file');
  showToast(`설교 문서 [${file.name}] 등록 완료! AI 자료 생성을 진행하세요.`, '📄');
}

// ================= TOAST NOTIFICATION SYSTEM =================
function showToast(msg, icon = '✅') {
  const toast = document.getElementById('app-toast');
  if (!toast) return;
  const iconEl = document.getElementById('app-toast-icon');
  const msgEl = document.getElementById('app-toast-msg');
  if (iconEl) iconEl.textContent = icon;
  if (msgEl) msgEl.textContent = msg;
  toast.classList.remove('hidden');
  toast.classList.add('flex');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => {
    toast.classList.add('hidden');
    toast.classList.remove('flex');
  }, 3500);
}

// ================= DYNAMIC HOMILETIC ANALYZER & ENGINE =================
function analyzeAndGenerateMinistryAssets() {
  // Determine active target audience
  const audienceRadio = document.querySelector('input[name="console-audience"]:checked');
  const targetAudience = audienceRadio ? audienceRadio.value : 'pastor';
  const audienceLabels = {
    pastor: '장년부 & 전체 (기본)',
    youth: '청년·대학부 (도전·결단)',
    nextgen: '다음세대 (쉬운 눈높이)'
  };
  const audienceLabel = audienceLabels[targetAudience] || '장년부 & 전체';

  let sermonTitle = '염려를 기도로 바꾸라';
  let scripture = '빌립보서 4장 6-7절';
  let preacher = '관유중앙교회 담임목사';
  let coreMessage = '염려는 스스로 문제를 해결하려는 무의미한 에너지 소모입니다. 하나님께서는 우리의 모든 필요와 염려를 기도로 바꾸어 올릴 때, 지각에 뛰어난 평강으로 마음과 생각을 지키십니다.';
  let points = [
    '1대지: 모든 일에 기도와 감사로 전환하라 (빌 4:6)',
    '2대지: 모든 지각에 뛰어난 하나님의 거룩한 개입 (빌 4:7a)',
    '3대지: 마음과 생각을 지키시는 그리스도의 참된 평강 (빌 4:7b)'
  ];

  // CASE A: Text Manuscript
  if (currentInputMode === 'paste') {
    const rawText = document.getElementById('manuscript-input')?.value || '';
    if (rawText.trim().length > 0) {
      const lines = rawText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      
      // 1. Detect Title
      let detectedTitle = '';
      const titleMatch = rawText.match(/(?:제목|설교\s*제목)[:：\s]*["\[]?([^"\n\]]+)["\]]?/);
      if (titleMatch) {
        detectedTitle = titleMatch[1].trim();
      } else if (lines.length > 0) {
        let first = lines[0].replace(/[\[\]"']/g, '').trim();
        if (first.length > 25) first = first.substring(0, 25);
        detectedTitle = first;
      }
      if (detectedTitle) sermonTitle = detectedTitle;

      // 2. Detect Scripture
      const bibleRegex = /(창세기|출애굽기|레위기|민수기|신명기|여호수아|사사기|룻기|사무엘상|사무엘하|열왕기상|열왕기하|역대상|역대하|에스라|느헤미야|에스더|욥기|시편|잠언|전도서|아가|이사야|예레미야|예레미야애가|에스겔|다니엘|호세아|요엘|아모스|오바댜|요나|미가|나훔|하박국|스바냐|학개|스가랴|말라기|마태복음|마가복음|누가복음|요한복음|사도행전|로마서|고린도전서|고린도후서|갈라디아서|에베소서|빌립보서|골로새서|데살로니가전서|데살로니가후서|디모데전서|디모데후서|디도서|빌레몬서|히브리서|야고보서|베드로전서|베드로후서|요한일서|요한이서|요한삼서|유다서|요한계시록)\s*\d+[:장]\s*[\d~,-]+절?/i;
      const scripMatch = rawText.match(bibleRegex);
      if (scripMatch) {
        scripture = scripMatch[0].trim();
      }

      // 3. Detect 3 Points
      const pointLines = lines.filter(l => /(?:대지|대\s*지|첫째|둘째|셋째|1\.|2\.|3\.|■|1\)|2\))/i.test(l));
      if (pointLines.length >= 3) {
        points = [
          pointLines[0].replace(/^[■\d\.\s\)-]+/, '').trim(),
          pointLines[1].replace(/^[■\d\.\s\)-]+/, '').trim(),
          pointLines[2].replace(/^[■\d\.\s\)-]+/, '').trim()
        ];
      } else if (lines.length >= 4) {
        points = [
          lines[1].length > 40 ? lines[1].substring(0, 40) + '...' : lines[1],
          lines[2].length > 40 ? lines[2].substring(0, 40) + '...' : lines[2],
          lines[3].length > 40 ? lines[3].substring(0, 40) + '...' : lines[3]
        ];
      }

      coreMessage = `${sermonTitle}의 말씀을 통해 우리 삶의 현장에 하나님의 거룩한 은혜와 회복이 임하기를 소망합니다.`;

      // Generate dynamic shorts for custom text
      studioClips = {
        1: {
          title: `${sermonTitle}의 첫 번째 확신`,
          tag: '🔥 감정 고조도 98%',
          sub: `도입: 말씀의 본질(15s) → 전환: 믿음의 결단(20s) → 결단: 승리의 선포(15s)`,
          startSec: 0,
          duration: 12,
          scenes: [
            { start: 0, end: 4, label: '씬 1 [00:00]', subtitle: `“${points[0] || '말씀을 붙들 때 기적이 일어납니다.'}”` },
            { start: 4, end: 8, label: '씬 2 [00:04]', subtitle: `“우리의 생각보다 크신 <span class='text-blue-400 font-bold'>하나님의 계획</span>이 있습니다.”` },
            { start: 8, end: 12, label: '씬 3 [00:08]', subtitle: `“오늘 주님의 그 거룩한 약속을 <span class='text-blue-400 font-bold'>믿음으로 취하십시오</span>.”` }
          ]
        },
        2: {
          title: `${sermonTitle} - 믿음의 돌파`,
          tag: '💡 감동·위로 95%',
          sub: `말씀 한 구절을 온전히 신뢰하며 절망을 딛고 일어서는 성도의 권능`,
          startSec: 45,
          duration: 12,
          scenes: [
            { start: 0, end: 4, label: '씬 1 [00:45]', subtitle: `“${points[1] || '기도할 때 하늘 문이 열리기 시작합니다.'}”` },
            { start: 4, end: 8, label: '씬 2 [00:49]', subtitle: `“어떤 절망 앞에서도 <span class='text-blue-400 font-bold'>하나님은 여전히 신실하십니다</span>.”` },
            { start: 8, end: 12, label: '씬 3 [00:53]', subtitle: `“성도의 눈물은 결코 땅에 떨어지지 않고 <span class='text-blue-400 font-bold'>응답으로 맺힙니다</span>.”` }
          ]
        },
        3: {
          title: `${sermonTitle} - 최후 승리의 영광`,
          tag: '⚡️ 결단·도전 93%',
          sub: `주님이 주시는 신비로운 평안과 축복을 세상 가운데 흘려보내는 사명`,
          startSec: 120,
          duration: 12,
          scenes: [
            { start: 0, end: 4, label: '씬 1 [02:00]', subtitle: `“${points[2] || '그리스도의 평강이 우리 삶을 지키십니다.'}”` },
            { start: 4, end: 8, label: '씬 2 [02:04]', subtitle: `“여러분의 가정과 일터가 <span class='text-blue-400 font-bold'>승리의 요새</span>가 될 것입니다.”` },
            { start: 8, end: 12, label: '씬 3 [02:08]', subtitle: `“주께서 명하신 영원한 복을 <span class='text-blue-400 font-bold'>오늘 충만히 누리십시오</span>!”` }
          ]
        }
      };
    }
  }

  // CASE B: YouTube link preset
  else if (currentInputMode === 'yt') {
    const preset = sermonPresets[currentYouTubeId];
    if (preset) {
      sermonTitle = preset.title;
      scripture = preset.scripture;
      preacher = preset.preacher;
      coreMessage = preset.coreMessage;
      points = preset.points;
      studioClips = preset.shorts;
    } else {
      sermonTitle = currentYouTubeTitle || '주일 예배 설교';
      scripture = currentYouTubeScripture || '주일 본문 말씀';
    }
  }

  // CASE C: File upload
  else if (currentInputMode === 'file') {
    if (currentFileName) {
      let cleanName = currentFileName.replace(/\.[^/.]+$/, '').replace(/[_\-]+/g, ' ');
      sermonTitle = cleanName;
    }
  }

  // Format Homiletic Materials
  const cleanTitle = sermonTitle.replace(/[\[\]"']/g, '').trim();

  // 1. 소그룹 나눔 질문지
  const smallGroupText = `=====================================================
[구역·순·셀·목장 예배용 소그룹 나눔 질문지]
설교 본문: ${scripture}
설교 제목: "${cleanTitle}"
말씀 선포: ${preacher}
권장 대상: ${audienceLabel}
=====================================================

[예배 순서 안내]
- 신앙고백: 사도신경
- 찬송: 통일찬송가 384장 (나의 갈 길 다 가도록) / 412장 (이 세상의 모든 죄를)
- 대표기도: 소그룹 인도자 또는 순원
- 본문봉독: ${scripture}
- 말씀나눔: 아래 나눔 질문을 바탕으로 솔직한 삶을 공유합니다.

-----------------------------------------------------
[1단계: 마음 열기 (Ice Breaking)]
Q1. 이번 한 주간 나의 마음을 가장 분주하게 만들었거나 내면의 평안을 흔들었던 일은 무엇이었습니까?
    솔직한 감정과 일상의 무게를 공동체 앞에 편안하게 나누어 봅시다.

-----------------------------------------------------
[2단계: 말씀 묵상 (Word & Truth)]
Q2. 설교 제1대지 [${points[0]}]
    오늘 말씀을 통해 하나님께서 내 영혼에 가장 날카롭게 조명해 주신 말씀의 본질은 무엇입니까?
    내가 여전히 내려놓지 못하고 쥐고 있는 옛 삶의 습관이나 인간적인 고집은 무엇입니까?

Q3. 설교 제2대지 [${points[1]}]
    상황이 바뀌기 전에도 먼저 감사함으로 하나님께 나아갔을 때 경험했던 은혜의 기억이 있다면 나누어 봅시다.
    내 생각과 계산을 뛰어넘어 일하시는 하나님의 거룩한 지혜를 어떻게 신뢰하고 있습니까?

Q4. 설교 제3대지 [${points[2]}]
    그리스도 예수 안에서 임하는 참된 평강은 세상의 일시적인 위로와 어떻게 다릅니까?
    불안의 한가운데서 내 마음과 생각을 지키시는 주님의 보호하심을 구체적으로 고백해 봅시다.

-----------------------------------------------------
[3단계: 삶의 적용 (Life Application)]
Q5. 이번 주간 나의 삶의 현장(가정, 직장, 대인관계)에서 말씀에 순종하여 실천할 한 가지 구체적인 결단은 무엇입니까?
    "내가 먼저 내려놓을 염려 한 가지"를 기록하고 선포해 봅시다.

-----------------------------------------------------
[4단계: 합심 기도 (United Prayer)]
1. 우리 공동체가 말씀 위에 굳게 서서 어떤 시련 앞에서도 감사와 기도로 승리하게 하옵소서.
2. 각 가정의 자녀들과 일터 위에 하늘의 평강과 거룩한 기름부으심이 충만하게 하옵소서.
3. 한국교회와 연약한 지체들을 위해 환우들의 치유와 회복을 위해 합심하여 기도합니다.
(마침: 주기도문으로 예배를 마칩니다.)`;

  // 2. 주간 QT 6일치 묵상 가이드
  const qtText = `=====================================================
[주간 QT 6일치 깊은 말씀 묵상 가이드]
본문: ${scripture} | 설교: "${cleanTitle}"
성도 개인 경건 생활 및 가정 예배용 (월요일 ~ 토요일)
=====================================================

■ [월요일] 본문의 배경과 영적 직시
- 오늘의 말씀: ${scripture} (도입부)
- 묵상 에세이:
  인간은 누구나 불확실한 미래 앞에서 두려움과 염려를 마주합니다. 그러나 성경은 우리의 시선을 문제 자체에서 전능하신 하나님의 얼굴로 돌리라고 명하십니다. 염려는 에너지를 갉아먹을 뿐이지만, 믿음은 은혜의 통로를 엽니다. 오늘 한 주의 첫날, 마음에 스며드는 불안을 주님의 발아래 내려놓으십시오.
- 묵상 질문: 오늘 내 마음을 무겁게 하는 생각의 정체는 무엇입니까?
- 한 줄 기도: 주님, 헛된 걱정을 멈추고 온전히 주님의 주권을 바라보는 믿음의 눈을 열어주옵소서.

■ [화요일] 말씀을 따라가는 믿음의 첫걸음
- 오늘의 말씀: ${scripture} (${points[0]})
- 묵상 에세이:
  진정한 신앙은 머무르는 안주를 거절하고 하나님의 약속을 향해 한 걸음을 내딛는 순종에서 시작됩니다. 갈 바를 알지 못하여도 말씀을 의지하여 나아갈 때, 메마른 광야에 대로가 열리기 시작합니다. 눈에 보이는 상황보다 들려오는 주님의 음성을 더 신뢰하십시오.
- 묵상 질문: 오늘 내가 순종함으로 떠나야 할 옛 습관이나 염려의 자리는 어디입니까?
- 한 줄 기도: 주여, 익숙한 두려움의 자리를 털고 일어나 약속의 말씀을 따라 순종하게 하소서.

■ [수요일] 감사의 선제적 고백
- 오늘의 말씀: ${scripture} (${points[1]})
- 묵상 에세이:
  응답받은 후에 감사하는 것은 자연스러운 일이지만, 응답 이전의 칠흑 같은 어둠 속에서 올리는 감사는 사탄의 권세를 꺾는 거룩한 무기입니다. 바울은 감옥의 쇠사슬 속에서도 감사의 기도를 올렸습니다. 상황이 바뀌어서가 아니라, 하나님이 여전히 나의 목자이시기 때문입니다.
- 묵상 질문: 오늘 가장 감사하기 어려운 상황 속에서 먼저 고백할 감사의 제목은 무엇입니까?
- 한 줄 기도: 보이지 않는 중에도 신실하게 일하시는 주님께 먼저 감사의 찬송을 올려드립니다.

■ [목요일] 사람의 지각을 뛰어넘는 하나님의 개입
- 오늘의 말씀: ${scripture} (지혜와 능력)
- 묵상 에세이:
  우리의 계산이 끝나는 곳에서 비로소 하나님의 기적이 시작됩니다. 인간의 지혜로는 막다른 골목이라 여겨지는 홍해 앞에서, 주님은 바다를 가르시고 마른 땅을 건너게 하십니다. 오늘 내 힘으로 풀리지 않는 난제를 하늘의 자원을 가지신 주님께 온전히 일임하십시오.
- 묵상 질문: 내 생각과 계산의 한계를 인정하고 주님께 온전히 맡겨드린 일은 무엇입니까?
- 한 줄 기도: 내 모든 지각을 뛰어넘으시는 하나님의 크신 지혜와 해결하심을 바라봅니다.

■ [금요일] 심령을 지키시는 그리스도의 평강
- 오늘의 말씀: ${scripture} (${points[2]})
- 묵상 에세이:
  세상이 주는 평안은 환경이 좋을 때만 반짝이지만, 그리스도 예수 안에서 임하는 평강은 거친 풍랑 속에서도 영혼의 닻이 됩니다. 주님은 성벽처럼 우리 마음과 생각을 둘러싸시며, 세상의 독화살이 우리 영혼을 상하지 못하도록 친히 요새가 되어 주십니다.
- 묵상 질문: 오늘 내 내면에 흔들리지 않는 그리스도의 평강이 자리하고 있습니까?
- 한 줄 기도: 예수 그리스도의 참된 평강으로 오늘 내 영혼과 가정을 성벽처럼 보호하여 주옵소서.

■ [토요일] 한 주간의 열매와 거룩한 안식
- 오늘의 말씀: ${scripture} (결론 및 축복)
- 묵상 에세이:
  한 주간 믿음의 씨름을 감당한 성도들에게 하나님은 거룩한 안식과 회복을 예비하십니다. 말씀에 순종하며 걸어온 발걸음마다 하늘의 기름부으심이 머뭅니다. 내일 복된 주일 예배를 사모하며, 기쁨과 기대로 주님의 전을 향할 준비를 하십시오.
- 묵상 질문: 이번 주간 하나님께서 내 삶에 베푸신 가장 큰 은혜의 열매는 무엇이었습니까?
- 한 줄 기도: 한 주간을 지켜주신 신실하신 에벤에셀의 하나님을 찬양하며, 내일 주일 예배를 사모합니다.`;

  // 3. 인스타그램 카드뉴스 7장 데이터
  const cardNewsCards = [
    {
      tag: 'CARD 1: 표지',
      title: cleanTitle,
      body: `본문: ${scripture}\n말씀 선포: ${preacher}\n\n"세상이 줄 수 없는 하나님의 거룩한 평강과 회복의 메시지"`
    },
    {
      tag: 'CARD 2: 삶의 질문',
      title: '왜 우리는 늘 불안과 염려에 쫓길까요?',
      body: '염려는 문제의 해결이 아니라 우리 영혼의 에너지를 소모시킬 뿐입니다. 인간의 노력으로 붙잡으려 할수록 마음의 평안은 멀어져 갑니다.'
    },
    {
      tag: 'CARD 3: 말씀의 원리 1',
      title: points[0] || '모든 일에 기도로 나아가십시오',
      body: '바울은 감옥의 차가운 벽 앞에서도 단호하게 권면합니다. 염려의 무익함을 직시하고 모든 일에 기도로 전환하십시오.'
    },
    {
      tag: 'CARD 4: 말씀의 원리 2',
      title: points[1] || '감사의 선제적 고백을 올리십시오',
      body: '환경이 바뀌기 전에 감사함으로 아뢸 때, 하늘의 문이 열리기 시작합니다. 감사는 하나님의 능력을 끌어당기는 거룩한 자석입니다.'
    },
    {
      tag: 'CARD 5: 말씀의 원리 3',
      title: points[2] || '모든 지각에 뛰어난 하나님의 평강',
      body: '인간의 좁은 시야와 계산을 뛰어넘는 하나님의 놀라운 지혜가 개입하십니다. 당신의 마음과 생각을 주님이 친히 요새처럼 지키십니다.'
    },
    {
      tag: 'CARD 6: 결론 & 은혜',
      title: '염려의 짐을 십자가 앞에 내려놓으라',
      body: '기도한 후에도 환경은 즉시 변하지 않을 수 있습니다. 그러나 상황보다 크신 하나님이 당신과 함께하십니다.'
    },
    {
      tag: 'CARD 7: 축복과 결단',
      title: '오늘 당신의 삶에 참된 평안이 넘치기를',
      body: '이번 한 주, 염려가 찾아올 때마다 기도의 무릎을 꿇으십시오. 주님의 평강이 여러분의 가정과 일터를 지키실 것입니다. 아멘!'
    }
  ];

  const cardNewsText = cardNewsCards.map(c => `[${c.tag}]\n제목: ${c.title}\n내용: ${c.body}\n`).join('\n-----------------------------------------------------\n');

  // 4. 설교 3대지 구조화 요약 리포트
  const outlineText = `=====================================================
[설교 3대지 구조화 및 강해 요약 리포트]
본문: ${scripture}
제목: "${cleanTitle}"
설교자: ${preacher}
청중 타깃: ${audienceLabel}
=====================================================

1. 본문 개요 및 목회적 배경
본문은 사도 바울이 옥중 서신을 통해 빌립보 교회 성도들에게 권면한 말씀으로, 외적인 핍박과 환난의 상황 속에서도 그리스도인으로서 누려야 할 초월적인 내면의 평강과 기쁨의 비결을 선포합니다.

2. 서론 (Introduction)
- 문제 제기: 현대인을 지배하는 만성적인 염려와 미래에 대한 불안
- 영적 진단: 염려는 상황을 통제하려는 인간적인 욕심에서 비롯되며 영적 에너지를 고갈시킴
- 본문 연결: 사도 바울의 단호한 선언 - "아무것도 염려하지 말라"

3. 본론 3대지 구조 (Three Main Points)
■ 제 1대지: ${points[0]}
  - 성경적 근거: 염려를 기도로 즉각 치환하는 영적 훈련
  - 목회적 해설: 문제는 억누른다고 사라지지 않으며, 전능자이신 하나님 앞에 그대로 토해낼 때 기도의 불꽃이 점화됩니다.

■ 제 2대지: ${points[1]}
  - 성경적 근거: 구체적인 간구와 선제적인 감사의 결합
  - 목회적 해설: 응답을 확인한 후의 감사는 누구나 할 수 있으나, 약속을 신뢰하며 먼저 드리는 감사는 마귀의 견고한 진을 파하는 영적 권세입니다.

■ 제 3대지: ${points[2]}
  - 성경적 근거: 모든 지각을 뛰어넘는 하나님의 평강이 마음과 생각을 보호함
  - 목회적 해설: 헬라어 군사용어 '프루레오(phroureo)'처럼 주님의 평강이 주둔군이 되어 세상의 불안으로부터 우리의 심령을 철벽 방어합니다.

4. 결론 및 실천적 권면 (Conclusion & Application)
- 영적 결단: 오늘 예배의 자리에서 마음에 품었던 모든 염려의 보따리를 주님의 십자가 앞에 내려놓으십시오.
- 파송의 선언: 한 주간 세상의 뉴스나 소문에 요동하지 않고, 약속의 말씀 위에 굳게 서서 하늘의 평강을 증거하는 복된 성도가 되기를 축원합니다.`;

  // 5. 성도 단톡방 알림톡 (카카오톡 목회 서신)
  const kakaoText = `샬롬! 사랑하는 성도 여러분, 평안한 주일 저녁입니다. 🌿

오늘 우리는 ${scripture} 말씀을 통해 ["${cleanTitle}"]이라는 은혜의 음성을 함께 나누었습니다.

한 주간 세상의 거센 비바람과 무게 앞에서도 흔들리지 않는 하늘의 비결을 꼭 기억하십시오:

1️⃣ 염려는 에너지를 소모시킬 뿐, 문제의 해결이 아닙니다.
2️⃣ 모든 일에 먼저 '감사'로 기도의 불꽃을 피우십시오.
3️⃣ 모든 지각에 뛰어난 주님의 평강이 성도님의 마음과 생각을 성벽처럼 지키십니다.

"아무것도 염려하지 말고 오직 모든 일에 기도와 간구로, 너희 구할 것을 감사함으로 하나님께 아뢰라" (빌립보서 4:6)

내일부터 시작되는 새로운 한 주간, 염려가 찾아올 때마다 두 손을 모으고 하늘의 평강을 선포하십시오. 성도님의 가정과 일터 위에 주님의 지키심과 기름부으심이 충만하기를 간절히 축복하며 기도합니다.

- 관유중앙교회 담임목사 드림 -`;

  // 6. 교회 주보 요약란 & 주일 대표 기도문
  const bulletinText = `=====================================================
[교회 주보 인쇄용 500자 설교 요약]
본문: ${scripture} | 제목: "${cleanTitle}"
=====================================================
우리가 겪는 수많은 염려는 문제의 해결이 아니라 영혼의 소모를 가져옵니다. 바울은 감옥이라는 최악의 환경 속에서도 "아무것도 염려하지 말라"고 단호하게 권면합니다. 염려가 찾아올 때 이를 억누르는 대신, 모든 일에 기도와 간구로 나아가야 합니다. 특별히 상황이 바뀌기 전에도 감사함으로 기도를 시작할 때 하늘의 문이 열립니다. 인간의 계산을 뛰어넘으시는 하나님의 평강이 그리스도 예수 안에서 우리의 마음과 생각을 견고한 성벽처럼 지켜주실 것입니다. 한 주간 염려의 보따리를 십자가 앞에 내려놓고 참된 평안을 누리시는 모든 성도님들이 되시기를 축복합니다.

=====================================================
[주일 대예배 공동체 대표 기도문]
=====================================================
사랑과 자비가 풍성하신 하나님 아버지,
지난 한 주간도 세상의 거센 풍파 속에서 저희를 눈동자처럼 지켜주시고, 거룩한 복된 주일 주님의 전으로 불러 모아 예배하게 하시니 감사와 찬양을 올려드립니다.

주님, 세상 속에서 살아갈 때 저희의 연약한 믿음으로 인하여 작은 일에도 마음을 빼앗기고 염려와 불안에 짓눌렸던 허물을 고백하오니, 십자가의 보혈로 정결하게 씻어 주옵소서. 

오늘 선포되는 "${cleanTitle}"의 말씀을 통하여 우리의 영혼이 새로워지게 하옵소서. 헛된 걱정을 내려놓고 모든 일에 기도와 감사로 주님께 아뢰는 성숙한 믿음을 주옵소서. 사람의 모든 지각을 뛰어넘으시는 하나님의 신비로운 평강이 사랑하는 모든 성도들의 심령과 가정, 일터 위에 강물처럼 흐르게 하옵소서.

질병으로 고통당하는 환우들에게는 치유의 광선을 발하여 주시고, 경제적 어려움과 진로의 막막함 앞에 서 있는 청년들과 성도들에게는 광야의 대로를 여시는 전능자의 손길을 경험하게 하옵소서.

단 위에 세우신 담임목사님께 성령의 기름부으심을 갑절로 더하여 주사, 선포되는 말씀마다 심령을 쪼개며 영혼을 살리는 생명의 양식이 되게 하옵소서. 보이지 않는 곳에서 헌신하는 찬양대와 봉사자들의 손길을 기억하시고 하늘의 신령한 복으로 갚아 주옵소서.

예배의 시종을 주님 손에 의탁하오며, 우리를 평강으로 인도하시는 우리 구주 예수 그리스도의 이름으로 간절히 기도드리옵나이다. 아멘.

=====================================================
[목회 축도문 (Benediction)]
=====================================================
이제는 우리 주 예수 그리스도의 무한하신 은혜와,
하나님 아버지의 극진하신 사랑하심과,
성령님의 감화 감동 교통 충만케 하심이,

염려를 기도로 바꾸어 모든 지각에 뛰어난 하나님의 참된 평강을 삶의 자리에서 누리며 증거하기로 결단하는 사랑하는 모든 성도들의 머리 위에와,
그들의 가정과 일터와 자녀들의 앞길 위에,
그리고 주님의 피로 값 주고 사신 우리 교회 위에,
이제로부터 영원토록 함께 계실지어다. 아멘.`;

  // 7. SRT Subtitle Text
  let srtText = '';
  const activeClips = studioClips;
  const c1 = activeClips[1] || { scenes: [] };
  if (c1.scenes) {
    c1.scenes.forEach((sc, idx) => {
      const sTime = formatSrtTime(sc.start);
      const eTime = formatSrtTime(sc.end);
      const cleanSub = sc.subtitle.replace(/<[^>]*>?/gm, '');
      srtText += `${idx + 1}\n${sTime} --> ${eTime}\n${cleanSub}\n\n`;
    });
  }

  // 8. YouTube info text
  const ytInfoText = `=====================================================
[설교 쇼츠 유튜브 타임스탬프 및 영상 구간 정보]
설교 영상: https://www.youtube.com/watch?v=${currentYouTubeId}
설교 제목: "${cleanTitle}" (${scripture})
=====================================================

[쇼츠 1: "${activeClips[1]?.title || '쇼츠 1'}"]
타임스탬프: 00:00 ~ 00:12
구간 바로가기: https://www.youtube.com/watch?v=${currentYouTubeId}&t=0s

[쇼츠 2: "${activeClips[2]?.title || '쇼츠 2'}"]
타임스탬프: 00:45 ~ 00:57
구간 바로가기: https://www.youtube.com/watch?v=${currentYouTubeId}&t=45s

[쇼츠 3: "${activeClips[3]?.title || '쇼츠 3'}"]
타임스탬프: 02:00 ~ 02:12
구간 바로가기: https://www.youtube.com/watch?v=${currentYouTubeId}&t=120s

* 캡컷(CapCut) / Vrew / 프리미어 프로에서 자막 SRT를 불러와 간편하게 9:16 세로 쇼츠로 렌더링하실 수 있습니다.`;

  // Store in Global Repository
  generatedMinistryAssets = {
    sermonTitle: cleanTitle,
    scripture: scripture,
    preacher: preacher,
    targetAudience: audienceLabel,
    smallGroupText: smallGroupText,
    qtText: qtText,
    cardNewsCards: cardNewsCards,
    cardNewsText: cardNewsText,
    outlineText: outlineText,
    kakaoText: kakaoText,
    bulletinText: bulletinText,
    srtText: srtText,
    ytInfoText: ytInfoText
  };

  // Update Modal Header & UI Meta
  const mTitle = document.getElementById('studio-sermon-name');
  const mScrip = document.getElementById('studio-scripture-ref');
  const mTarget = document.getElementById('studio-target-label');
  if (mTitle) mTitle.textContent = `"${cleanTitle}"`;
  if (mScrip) mScrip.textContent = scripture;
  if (mTarget) mTarget.textContent = audienceLabel;

  // Update Modal Shorts Deck Titles
  const t1 = document.getElementById('deck-title-1');
  const s1 = document.getElementById('deck-sub-1');
  const t2 = document.getElementById('deck-title-2');
  const s2 = document.getElementById('deck-sub-2');
  const t3 = document.getElementById('deck-title-3');
  const s3 = document.getElementById('deck-sub-3');

  if (t1) t1.textContent = `"${activeClips[1]?.title || '쇼츠 1'}"`;
  if (s1) s1.textContent = activeClips[1]?.sub || '';
  if (t2) t2.textContent = `"${activeClips[2]?.title || '쇼츠 2'}"`;
  if (s2) s2.textContent = activeClips[2]?.sub || '';
  if (t3) t3.textContent = `"${activeClips[3]?.title || '쇼츠 3'}"`;
  if (s3) s3.textContent = activeClips[3]?.sub || '';

  // Populate Text Panels
  const sgBody = document.getElementById('content-smallgroup-body');
  if (sgBody) sgBody.textContent = smallGroupText;

  const qtBody = document.getElementById('content-qt-body');
  if (qtBody) qtBody.textContent = qtText;

  const outBody = document.getElementById('content-outline-body');
  if (outBody) outBody.textContent = outlineText;

  const kakaoBody = document.getElementById('content-kakao-body');
  if (kakaoBody) kakaoBody.textContent = kakaoText;

  const bulBody = document.getElementById('content-bulletin-body');
  if (bulBody) bulBody.textContent = bulletinText;

  // Render Card News Visual Grid
  renderCardNewsGrid(cardNewsCards);
}

// Render 7 Visual Cards for Panel 4
function renderCardNewsGrid(cards) {
  const grid = document.getElementById('content-cardnews-grid');
  if (!grid) return;
  grid.innerHTML = cards.map((c, i) => `
    <div class="rounded-2xl border border-slate-200/90 bg-gradient-to-br from-slate-50 to-white p-5 shadow-xs hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between min-h-[220px]">
      <div>
        <div class="flex items-center justify-between mb-3">
          <span class="rounded-lg bg-blue-100 text-blue-700 text-[11px] font-extrabold px-2.5 py-1">${c.tag}</span>
          <span class="text-[12px] font-bold text-slate-400">${i + 1} / ${cards.length}</span>
        </div>
        <h4 class="text-[15px] font-extrabold text-slate-900 leading-snug mb-2">${c.title}</h4>
        <p class="text-[12.5px] text-slate-600 leading-relaxed whitespace-pre-line">${c.body}</p>
      </div>
      <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span>AI 사역도구</span>
        <span class="font-bold text-blue-600">밀어서 다음장 →</span>
      </div>
    </div>
  `).join('');
}

// ================= STUDIO MODAL TAB SWITCHING =================
function switchStudioTab(tabId) {
  currentActiveStudioTab = tabId;
  const tabs = ['shorts', 'smallgroup', 'qt', 'cardnews', 'outline', 'kakao', 'bulletin'];

  tabs.forEach(t => {
    const btn = document.getElementById(`studio-tab-btn-${t}`);
    const panel = document.getElementById(`studio-panel-${t}`);

    if (btn) {
      if (t === tabId) {
        btn.className = 'flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[13px] font-bold transition-all bg-blue-600 text-white shadow-xs whitespace-nowrap';
      } else {
        btn.className = 'flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[13px] font-bold transition-all text-slate-600 hover:bg-slate-100 hover:text-slate-900 whitespace-nowrap';
      }
    }

    if (panel) {
      if (t === tabId) {
        panel.classList.remove('hidden');
        panel.classList.add('block');
      } else {
        panel.classList.remove('block');
        panel.classList.add('hidden');
      }
    }
  });

  // Pause playback when leaving shorts tab
  if (tabId !== 'shorts') {
    const vid = document.getElementById('modal-studio-video');
    if (vid) vid.pause();
    const aud = document.getElementById('modal-studio-audio');
    if (aud) aud.pause();
    sendYtCommand('modal-yt-iframe', 'pauseVideo');
  } else {
    if (isPlaying) {
      const vid = document.getElementById('modal-studio-video');
      if (vid && !vid.classList.contains('hidden')) vid.play().catch(e => console.log(e));
      sendYtCommand('modal-yt-iframe', 'playVideo');
    }
  }
}

// ================= COPY & DOWNLOAD HELPERS =================
function copyPanelText(key) {
  let text = '';
  let name = '';
  if (key === 'smallgroup') { text = generatedMinistryAssets.smallGroupText; name = '소그룹 나눔 질문지'; }
  else if (key === 'qt') { text = generatedMinistryAssets.qtText; name = '주간 QT 묵상집'; }
  else if (key === 'cardnews') { text = generatedMinistryAssets.cardNewsText; name = '카드뉴스 7장 텍스트'; }
  else if (key === 'outline') { text = generatedMinistryAssets.outlineText; name = '설교 3대지 구조화 요약'; }
  else if (key === 'kakao') { text = generatedMinistryAssets.kakaoText; name = '단톡방 알림톡'; }
  else if (key === 'bulletin') { text = generatedMinistryAssets.bulletinText; name = '주보 요약 & 대표 기도문'; }

  if (!text) {
    showToast('복사할 내용이 없습니다.', '⚠️');
    return;
  }

  navigator.clipboard.writeText(text).then(() => {
    showToast(`📋 ${name} 전체가 복사되었습니다! 즉시 붙여넣어 사용하세요.`, '✅');
  }).catch(() => {
    showToast('클립보드 복사에 실패했습니다.', '⚠️');
  });
}

function downloadPanelText(key) {
  let text = '';
  let filename = '';
  const safeTitle = (generatedMinistryAssets.sermonTitle || '주일설교').replace(/[\s\/:*?"<>|]+/g, '_');

  if (key === 'smallgroup') { text = generatedMinistryAssets.smallGroupText; filename = `${safeTitle}_소그룹_나눔_질문지.txt`; }
  else if (key === 'qt') { text = generatedMinistryAssets.qtText; filename = `${safeTitle}_주간_QT_6일치_묵상집.txt`; }
  else if (key === 'cardnews') { text = generatedMinistryAssets.cardNewsText; filename = `${safeTitle}_인스타_카드뉴스_7장_텍스트.txt`; }
  else if (key === 'outline') { text = generatedMinistryAssets.outlineText; filename = `${safeTitle}_설교_3대지_요약.txt`; }
  else if (key === 'kakao') { text = generatedMinistryAssets.kakaoText; filename = `${safeTitle}_성도_단톡방_알림톡.txt`; }
  else if (key === 'bulletin') { text = generatedMinistryAssets.bulletinText; filename = `${safeTitle}_주보_요약_및_기도문.txt`; }

  if (!text) {
    showToast('다운로드할 내용이 없습니다.', '⚠️');
    return;
  }

  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast(`💾 '${filename}' 파일로 저장되었습니다.`, '📥');
}

// ================= GENERATION WORKFLOW TRIGGER =================
function startStudioGeneration() {
  closeAudienceModal();

  // Validate inputs according to currentInputMode
  if (currentInputMode === 'paste') {
    const ta = document.getElementById('manuscript-input');
    if (!ta || ta.value.trim().length === 0) {
      showToast('설교 원고가 입력되지 않아 대표 예시 설교(빌립보서 4:6-7)로 자동 설정합니다.', 'ℹ️');
      loadSampleManuscript();
    }
  } else if (currentInputMode === 'yt') {
    const ytInput = document.getElementById('youtube-url-input');
    const val = ytInput ? ytInput.value.trim() : '';
    const id = extractYouTubeId(val);
    if (id) {
      currentYouTubeId = id;
    } else if (!currentYouTubeId) {
      loadSampleYouTube('z5D_B9I7l1Y', '너는 복이 될지라', '창세기 12:1-3');
    }
  } else if (currentInputMode === 'file') {
    if (!currentFileName && !currentFileVideoUrl && !currentFileAudioUrl) {
      showToast('설교 파일을 먼저 선택해 주세요.', '📁');
      simulateFileUpload();
      return;
    }
  }

  // Show Progress Overlay
  const overlay = document.getElementById('progress-overlay');
  if (overlay) {
    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
  }

  const fill = document.getElementById('progress-bar-fill');
  const txt = document.getElementById('progress-step-text');
  if (fill) fill.style.width = '35%';
  if (txt) txt.textContent = '1단계: 설교 원고 분석 및 핵심 메시지 구조화 중...';

  setTimeout(() => {
    const r1 = document.getElementById('step-row-1');
    const s1 = document.getElementById('step-status-1');
    const r2 = document.getElementById('step-row-2');
    const s2 = document.getElementById('step-status-2');

    if (r1) r1.classList.add('bg-blue-50');
    if (s1) { s1.textContent = '완료 ✓'; s1.className = 'font-bold text-emerald-600'; }
    if (r2) r2.classList.remove('opacity-50');
    if (s2) { s2.textContent = '생성 중...'; s2.className = 'font-bold text-blue-600'; }

    if (fill) fill.style.width = '70%';
    if (txt) txt.textContent = '2단계: 소그룹 질문지, QT 6일치, 카드뉴스 렌더링 중...';
  }, 900);

  setTimeout(() => {
    const r2 = document.getElementById('step-row-2');
    const s2 = document.getElementById('step-status-2');
    const r3 = document.getElementById('step-row-3');
    const s3 = document.getElementById('step-status-3');

    if (r2) r2.classList.add('bg-blue-50');
    if (s2) { s2.textContent = '완료 ✓'; s2.className = 'font-bold text-emerald-600'; }
    if (r3) r3.classList.remove('opacity-50');
    if (s3) { s3.textContent = '생성 중...'; s3.className = 'font-bold text-blue-600'; }

    if (fill) fill.style.width = '100%';
    if (txt) {
      txt.textContent = (currentInputMode === 'yt')
        ? `3단계: 유튜브 설교 영상(ID: ${currentYouTubeId}) 9:16 쇼츠 컷 분할 및 자막 싱크 완료!`
        : '3단계: 9:16 설교 쇼츠 컷 분할 및 10종 자료 패키지 생성 완료!';
    }
  }, 1900);

  setTimeout(() => {
    if (overlay) {
      overlay.classList.add('hidden');
      overlay.classList.remove('flex');
    }

    // Run Dynamic Homiletic Engine
    analyzeAndGenerateMinistryAssets();

    // Open Studio Modal
    const studio = document.getElementById('studio-modal');
    if (studio) {
      studio.classList.remove('hidden');
      studio.classList.add('flex');
    }

    switchStudioTab('shorts');
    initStudioPlayer();
  }, 2500);
}

function closeStudioModal() {
  const vid = document.getElementById('modal-studio-video');
  if (vid) vid.pause();
  const aud = document.getElementById('modal-studio-audio');
  if (aud) aud.pause();
  const iframe = document.getElementById('modal-yt-iframe');
  if (iframe) sendYtCommand('modal-yt-iframe', 'pauseVideo');

  const studio = document.getElementById('studio-modal');
  if (studio) {
    studio.classList.add('hidden');
    studio.classList.remove('flex');
  }
}

function openAudienceModal(source) {
  const m = document.getElementById('audience-modal');
  if (m) {
    m.classList.remove('hidden');
    m.classList.add('flex');
  }
}

function closeAudienceModal() {
  const m = document.getElementById('audience-modal');
  if (m) {
    m.classList.add('hidden');
    m.classList.remove('flex');
  }
}

function toggleFaq(btn) {
  const body = btn.parentElement.querySelector('.faq-body');
  const icon = btn.querySelector('.faq-icon');
  if (!body) return;
  if (body.classList.contains('hidden')) {
    body.classList.remove('hidden');
    if (icon) icon.textContent = '−';
  } else {
    body.classList.add('hidden');
    if (icon) icon.textContent = '+';
  }
}

// ================= PLAYER CONTROLS & TIMERS =================
function formatTime(sec) {
  if (isNaN(sec) || sec < 0) return '00:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function toggleShortsCropMode() {
  isShortsCropMode = !isShortsCropMode;
  applyCropMode();
  showToast(isShortsCropMode ? '📱 9:16 세로 쇼츠 모드로 전환되었습니다.' : '🖥️ 16:9 전체 화면 모드로 전환되었습니다.', '📐');
}

function applyCropMode() {
  const iframes = [document.getElementById('studio-yt-iframe'), document.getElementById('modal-yt-iframe')];
  const btn1 = document.getElementById('studio-crop-btn-text');
  const btn2 = document.getElementById('modal-crop-btn-text');

  iframes.forEach(iframe => {
    if (!iframe) return;
    if (isShortsCropMode) {
      iframe.style.width = '325%';
      iframe.style.height = '115%';
      iframe.style.top = '50%';
      iframe.style.left = '50%';
      iframe.style.transform = 'translate(-50%, -50%)';
    } else {
      iframe.style.width = '100%';
      iframe.style.height = '56.25%';
      iframe.style.top = '50%';
      iframe.style.left = '0%';
      iframe.style.transform = 'translateY(-50%)';
    }
  });

  const label = isShortsCropMode ? '📱 9:16' : '🖥️ 16:9';
  if (btn1) btn1.textContent = label;
  if (btn2) btn2.textContent = label;
}

function initStudioPlayer() {
  selectStudioClip(currentClipIndex || 1);
  startPlaybackTimer();
}

function loadActiveVideoSource() {
  const clip = studioClips[currentClipIndex] || studioClips[1];
  const ytWraps = [document.getElementById('studio-yt-wrap'), document.getElementById('modal-yt-wrap')];
  const iframes = [document.getElementById('studio-yt-iframe'), document.getElementById('modal-yt-iframe')];
  const vids = [document.getElementById('studio-video'), document.getElementById('modal-studio-video')];
  const audioWrap = document.getElementById('modal-audio-wrap');
  const audioEl = document.getElementById('modal-studio-audio');

  // 1. Audio File Mode
  if (currentInputMode === 'file' && currentFileType === 'audio' && currentFileAudioUrl) {
    ytWraps.forEach(w => w && w.classList.add('hidden'));
    vids.forEach(v => v && v.classList.add('hidden'));
    if (audioWrap) {
      audioWrap.classList.remove('hidden');
      audioWrap.classList.add('flex');
      const titleEl = document.getElementById('audio-visualizer-title');
      if (titleEl) titleEl.textContent = generatedMinistryAssets.sermonTitle;
    }
    if (audioEl) {
      if (audioEl.src !== currentFileAudioUrl) audioEl.src = currentFileAudioUrl;
      audioEl.currentTime = 0;
      audioEl.muted = isMuted;
      if (isPlaying) audioEl.play().catch(e => console.log('Audio play:', e));
    }
    return;
  }

  // Hide audio visualizer if not audio mode
  if (audioWrap) {
    audioWrap.classList.add('hidden');
    audioWrap.classList.remove('flex');
  }

  // 2. Local Video File Mode
  if (currentInputMode === 'file' && currentFileVideoUrl) {
    ytWraps.forEach(w => w && w.classList.add('hidden'));
    vids.forEach(v => {
      if (v) {
        v.classList.remove('hidden');
        if (v.src !== currentFileVideoUrl) v.src = currentFileVideoUrl;
        v.currentTime = 0;
        v.muted = isMuted;
        if (isPlaying) v.play().catch(e => console.log('File play:', e));
      }
    });
    return;
  }

  // 3. YouTube Sermon Mode (Always pastor preaching video, NEVER waves!)
  vids.forEach(v => {
    if (v) {
      v.pause();
      v.classList.add('hidden');
    }
  });
  ytWraps.forEach(w => w && w.classList.remove('hidden'));

  const embedUrl = `https://www.youtube.com/embed/${currentYouTubeId}?enablejsapi=1&autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&loop=1&playlist=${currentYouTubeId}&start=${clip.startSec}&rel=0&playsinline=1`;

  iframes.forEach(iframe => {
    if (iframe) {
      if (!iframe.src.includes(currentYouTubeId) || !iframe.src.includes(`start=${clip.startSec}`)) {
        iframe.src = embedUrl;
      } else {
        sendYtCommand(iframe.id, 'seekTo', [clip.startSec, true]);
        if (isPlaying) sendYtCommand(iframe.id, 'playVideo');
      }
    }
  });
  applyCropMode();
}

function selectStudioClip(num) {
  currentClipIndex = num;
  const clip = studioClips[num] || studioClips[1];

  // Update Desk Cards
  [1, 2, 3].forEach(i => {
    const d1 = document.getElementById(`studio-deck-${i}`);
    const d2 = document.getElementById(`modal-deck-${i}`);
    if (d1) {
      d1.className = (i === num)
        ? 'rounded-2xl border-2 border-blue-600 bg-blue-50/50 p-4 sm:p-5 cursor-pointer transition-all shadow-xs'
        : 'rounded-2xl border border-slate-200 bg-white hover:border-blue-400 p-4 sm:p-5 cursor-pointer transition-all';
    }
    if (d2) {
      d2.className = (i === num)
        ? 'rounded-2xl border-2 border-blue-600 bg-blue-50/50 p-4 cursor-pointer transition-all shadow-xs'
        : 'rounded-2xl border border-slate-200 bg-white hover:border-blue-400 p-4 cursor-pointer transition-all';
    }
  });

  // Update tags
  const tag1 = document.getElementById('studio-shorts-tag');
  const tag2 = document.getElementById('modal-shorts-tag');
  if (tag1) tag1.textContent = clip.title;
  if (tag2) tag2.textContent = clip.title;

  clipElapsedSec = 0;
  loadActiveVideoSource();
  updatePlayerUI();
}

function startPlaybackTimer() {
  if (playbackTimer) clearInterval(playbackTimer);
  playbackTimer = setInterval(() => {
    if (!isPlaying) return;
    const clip = studioClips[currentClipIndex] || studioClips[1];

    if (currentInputMode === 'file' && currentFileVideoUrl) {
      const vid = document.getElementById('modal-studio-video');
      if (vid && vid.duration) clipElapsedSec = vid.currentTime % (clip.duration || 12);
    } else if (currentInputMode === 'file' && currentFileType === 'audio' && currentFileAudioUrl) {
      const aud = document.getElementById('modal-studio-audio');
      if (aud && aud.duration) clipElapsedSec = aud.currentTime % (clip.duration || 12);
    } else {
      clipElapsedSec += 0.25;
      if (clipElapsedSec >= clip.duration) {
        clipElapsedSec = 0;
        const iframes = [document.getElementById('studio-yt-iframe'), document.getElementById('modal-yt-iframe')];
        iframes.forEach(f => f && sendYtCommand(f.id, 'seekTo', [clip.startSec, true]));
      }
    }

    updatePlayerUI();
  }, 250);
}

function updatePlayerUI() {
  const clip = studioClips[currentClipIndex] || studioClips[1];
  const curr = clipElapsedSec;
  const dur = clip.duration;

  const currEl = document.getElementById('studio-time-curr');
  const totalEl = document.getElementById('studio-time-total');
  const fillEl = document.getElementById('studio-progress-fill');
  if (currEl) currEl.textContent = formatTime(curr);
  if (totalEl) totalEl.textContent = formatTime(dur);
  if (fillEl && dur > 0) fillEl.style.width = `${Math.min(100, (curr / dur) * 100)}%`;

  const mCurrEl = document.getElementById('modal-time-curr');
  const mTotalEl = document.getElementById('modal-time-total');
  const mFillEl = document.getElementById('modal-progress-fill');
  if (mCurrEl) mCurrEl.textContent = formatTime(curr);
  if (mTotalEl) mTotalEl.textContent = formatTime(dur);
  if (mFillEl && dur > 0) mFillEl.style.width = `${Math.min(100, (curr / dur) * 100)}%`;

  const matchedScene = (clip.scenes && clip.scenes.find(s => curr >= s.start && curr < s.end)) || (clip.scenes && clip.scenes[clip.scenes.length - 1]);
  if (matchedScene) {
    const sceneNameEl = document.getElementById('studio-scene-name');
    const subEl = document.getElementById('studio-live-subtitle');
    if (sceneNameEl) sceneNameEl.textContent = matchedScene.label;
    if (subEl) subEl.innerHTML = matchedScene.subtitle;

    const mSceneNameEl = document.getElementById('modal-scene-name');
    const mSubEl = document.getElementById('modal-live-subtitle');
    if (mSceneNameEl) mSceneNameEl.textContent = matchedScene.label;
    if (mSubEl) mSubEl.innerHTML = matchedScene.subtitle;
  }
}

// Play & Pause
function toggleStudioPlay() {
  isPlaying = !isPlaying;
  const iframes = [document.getElementById('studio-yt-iframe'), document.getElementById('modal-yt-iframe')];
  const vids = [document.getElementById('studio-video'), document.getElementById('modal-studio-video')];
  const aud = document.getElementById('modal-studio-audio');

  iframes.forEach(f => f && sendYtCommand(f.id, isPlaying ? 'playVideo' : 'pauseVideo'));
  vids.forEach(v => {
    if (v && !v.classList.contains('hidden')) {
      if (isPlaying) v.play().catch(e => console.log(e));
      else v.pause();
    }
  });
  if (aud && !aud.classList.contains('hidden')) {
    if (isPlaying) aud.play().catch(e => console.log(e));
    else aud.pause();
  }

  updatePlayIcons(isPlaying);
}

function toggleModalStudioPlay() {
  toggleStudioPlay();
}

function updatePlayIcons(playing) {
  const icon1 = document.getElementById('studio-play-icon');
  const icon2 = document.getElementById('modal-play-icon');
  const pauseSvg = '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>';
  const playSvg = '<polygon points="5 3 19 12 5 21 5 3"></polygon>';
  if (icon1) icon1.innerHTML = playing ? pauseSvg : playSvg;
  if (icon2) icon2.innerHTML = playing ? pauseSvg : playSvg;
}

// Audio Mute & Unmute
function toggleStudioAudio() {
  isMuted = !isMuted;
  const iframes = [document.getElementById('studio-yt-iframe'), document.getElementById('modal-yt-iframe')];
  const vids = [document.getElementById('studio-video'), document.getElementById('modal-studio-video')];
  const aud = document.getElementById('modal-studio-audio');

  iframes.forEach(f => f && sendYtCommand(f.id, isMuted ? 'mute' : 'unMute'));
  vids.forEach(v => { if (v) v.muted = isMuted; });
  if (aud) aud.muted = isMuted;

  updateSoundIcons(!isMuted);
  showToast(isMuted ? '소리가 꺼졌습니다. 🔇' : '소리가 켜졌습니다. 🔊', isMuted ? '🔇' : '🔊');
}

function toggleModalStudioAudio() {
  toggleStudioAudio();
}

function updateSoundIcons(hasSound) {
  const icon1 = document.getElementById('studio-sound-icon');
  const icon2 = document.getElementById('modal-sound-icon');
  const soundOnSvg = '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>';
  const soundOffSvg = '<path d="M11 5L6 9H2v6h4l5 4V5z"></path><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>';
  if (icon1) icon1.innerHTML = hasSound ? soundOnSvg : soundOffSvg;
  if (icon2) icon2.innerHTML = hasSound ? soundOnSvg : soundOffSvg;
}

// Scrubbing / Seeking
function seekStudioVideo(e) {
  const track = document.getElementById('studio-progress-track');
  if (!track) return;
  const rect = track.getBoundingClientRect();
  const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  const clip = studioClips[currentClipIndex] || studioClips[1];
  clipElapsedSec = pct * clip.duration;

  if (currentInputMode === 'file' && currentFileVideoUrl) {
    const vids = [document.getElementById('studio-video'), document.getElementById('modal-studio-video')];
    vids.forEach(v => { if (v && v.duration) v.currentTime = clipElapsedSec; });
  } else {
    const targetSec = clip.startSec + clipElapsedSec;
    const iframes = [document.getElementById('studio-yt-iframe'), document.getElementById('modal-yt-iframe')];
    iframes.forEach(f => f && sendYtCommand(f.id, 'seekTo', [targetSec, true]));
  }
  updatePlayerUI();
}

function seekModalStudioVideo(e) {
  const track = document.getElementById('modal-progress-track');
  if (!track) return;
  const rect = track.getBoundingClientRect();
  const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  const clip = studioClips[currentClipIndex] || studioClips[1];
  clipElapsedSec = pct * clip.duration;

  if (currentInputMode === 'file' && currentFileVideoUrl) {
    const vids = [document.getElementById('studio-video'), document.getElementById('modal-studio-video')];
    vids.forEach(v => { if (v && v.duration) v.currentTime = clipElapsedSec; });
  } else {
    const targetSec = clip.startSec + clipElapsedSec;
    const iframes = [document.getElementById('studio-yt-iframe'), document.getElementById('modal-yt-iframe')];
    iframes.forEach(f => f && sendYtCommand(f.id, 'seekTo', [targetSec, true]));
  }
  updatePlayerUI();
}

// ================= EXPORT DIALOG HANDLING =================
function openExportModal() {
  const modal = document.getElementById('shorts-export-modal');
  const clip = studioClips[currentClipIndex] || studioClips[1];
  const desc = document.getElementById('export-modal-desc');
  const ytBox = document.getElementById('export-yt-link-box');
  const ytUrlBtn = document.getElementById('export-yt-url-btn');

  if (desc) desc.textContent = `[${clip.title}] 9:16 설교 쇼츠와 자막, 사역 자료를 바로 내려받으실 수 있습니다.`;
  if (currentInputMode === 'yt' && ytUrlBtn) {
    if (ytBox) ytBox.classList.remove('hidden');
    ytUrlBtn.href = `https://www.youtube.com/watch?v=${currentYouTubeId}&t=${clip.startSec}s`;
  } else if (ytBox) {
    ytBox.classList.add('hidden');
  }

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeExportModal() {
  const modal = document.getElementById('shorts-export-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function downloadCurrentShortsMP4() {
  openExportModal();
}

function executeMP4Download() {
  const clip = studioClips[currentClipIndex] || studioClips[1];
  const fileName = `설교쇼츠_${clip.title.replace(/[\s\/:*?"<>|]+/g, '_')}_9x16.mp4`;
  showToast(`'${fileName}' 다운로드를 시작합니다...`, '⏳');

  let downloadUrl = '';
  if (currentInputMode === 'file' && currentFileVideoUrl) {
    downloadUrl = currentFileVideoUrl;
  } else {
    downloadUrl = 'assets/sample-shorts-1.mp4';
  }

  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setTimeout(() => {
    showToast(`✅ '${fileName}' 다운로드 완료!`, '🎉');
  }, 1000);
}

function formatSrtTime(sec) {
  const h = String(Math.floor(sec / 3600)).padStart(2, '0');
  const m = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
  const s = String(Math.floor(sec % 60)).padStart(2, '0');
  return `${h}:${m}:${s},000`;
}

function downloadSubtitlesSRTFile() {
  const clip = studioClips[currentClipIndex] || studioClips[1];
  let srtContent = '';
  if (clip.scenes) {
    clip.scenes.forEach((sc, idx) => {
      const sTime = formatSrtTime(sc.start);
      const eTime = formatSrtTime(sc.end);
      const cleanSub = sc.subtitle.replace(/<[^>]*>?/gm, '');
      srtContent += `${idx + 1}\n${sTime} --> ${eTime}\n${cleanSub}\n\n`;
    });
  }

  const blob = new Blob([srtContent], { type: 'text/plain;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `01_설교쇼츠_${clip.title.replace(/[\s\/:*?"<>|]+/g, '_')}_자막.srt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast('쇼츠 자막(SRT) 파일이 다운로드되었습니다!', '📄');
}

function copySubtitlesSRT() {
  const clip = studioClips[currentClipIndex] || studioClips[1];
  let srtContent = '';
  if (clip.scenes) {
    clip.scenes.forEach((sc, idx) => {
      const sTime = formatSrtTime(sc.start);
      const eTime = formatSrtTime(sc.end);
      const cleanSub = sc.subtitle.replace(/<[^>]*>?/gm, '');
      srtContent += `${idx + 1}\n${sTime} --> ${eTime}\n${cleanSub}\n\n`;
    });
  }
  navigator.clipboard.writeText(srtContent).then(() => {
    showToast('쇼츠 자막(SRT)이 클립보드에 복사되었습니다! 프리미어/캡컷에 바로 붙여넣으세요.', '📋');
  });
}

// ================= 10-MATERIAL FULL ZIP DOWNLOAD =================
async function downloadAllMaterials() {
  showToast('전체 10종 사역 자료 압축 파일을 생성 중입니다...', '📦');

  const clip = studioClips[currentClipIndex] || studioClips[1];
  const title = (generatedMinistryAssets.sermonTitle || '주일설교').replace(/[\s\/:*?"<>|]+/g, '_');

  try {
    if (typeof JSZip !== 'undefined') {
      const zip = new JSZip();
      zip.file('01_설교요약_및_3대지_구조화.txt', generatedMinistryAssets.outlineText);
      zip.file('02_소그룹_나눔_질문지.txt', generatedMinistryAssets.smallGroupText);
      zip.file('03_주간_QT_6일치_묵상집.txt', generatedMinistryAssets.qtText);
      zip.file('04_인스타그램_카드뉴스_7장_텍스트.txt', generatedMinistryAssets.cardNewsText);
      zip.file('05_성도_단톡방_알림톡_목회서신.txt', generatedMinistryAssets.kakaoText);
      zip.file('06_교회주보_요약_및_주일대표기도문.txt', generatedMinistryAssets.bulletinText);
      zip.file('07_설교쇼츠_자막대본_SRT.srt', generatedMinistryAssets.srtText);
      zip.file('08_유튜브_쇼츠_타임스탬프_안내.txt', generatedMinistryAssets.ytInfoText);

      try {
        let vidUrl = (currentInputMode === 'file' && currentFileVideoUrl) ? currentFileVideoUrl : 'assets/sample-shorts-1.mp4';
        const vidRes = await fetch(vidUrl);
        if (vidRes.ok) {
          const vidBlob = await vidRes.blob();
          zip.file(`설교쇼츠_${clip.title.replace(/[\s\/:*?"<>|]+/g, '_')}_9x16.mp4`, vidBlob);
        }
      } catch (err) {
        console.warn('Video bundle skipped in ZIP', err);
      }

      const content = await zip.generateAsync({ type: 'blob' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(content);
      a.download = `2026_한주사역자료_${title}_10종_패키지.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast('✅ 전체 10종 사역 자료(ZIP) 다운로드 완료!', '🎉');
      return;
    }
  } catch (e) {
    console.error('JSZip error:', e);
  }

  // Fallback: Single Consolidated Text Package
  const combined = [
    generatedMinistryAssets.outlineText,
    generatedMinistryAssets.smallGroupText,
    generatedMinistryAssets.qtText,
    generatedMinistryAssets.cardNewsText,
    generatedMinistryAssets.kakaoText,
    generatedMinistryAssets.bulletinText,
    generatedMinistryAssets.ytInfoText
  ].join('\n\n' + '='.repeat(60) + '\n\n');

  const fallbackBlob = new Blob([combined], { type: 'text/plain;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(fallbackBlob);
  a.download = `2026_한주사역자료_${title}_통합본.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast('사역 자료 텍스트 패키지가 다운로드되었습니다.', '📄');
}

function openHelpChat() {
  alert('카카오톡 채널 [AI 사역도구] 1:1 목회자 전담 상담톡으로 연결됩니다. (운영시간 10:00 ~ 18:00)');
}


// ================= DEDICATED YOUTUBE MODAL HELPERS (MATCHING ORIGINAL SITE) =================
function openYouTubeModal() {
  const m = document.getElementById('youtube-link-modal');
  if (m) {
    m.classList.remove('hidden');
    m.classList.add('flex');
    const input = document.getElementById('modal-youtube-url-input');
    if (input) {
      setTimeout(() => input.focus(), 100);
      if (currentYouTubeId && (!input.value || input.value.trim().length === 0)) {
        input.value = `https://www.youtube.com/watch?v=${currentYouTubeId}`;
        handleModalYouTubeInput(input.value);
      }
    }
  }
}

function closeYouTubeModal() {
  const m = document.getElementById('youtube-link-modal');
  if (m) {
    m.classList.add('hidden');
    m.classList.remove('flex');
  }
}

async function pasteToModalYouTubeInput() {
  const input = document.getElementById('modal-youtube-url-input');
  if (!input) return;
  try {
    if (navigator.clipboard && navigator.clipboard.readText) {
      const text = await navigator.clipboard.readText();
      if (text && text.trim().length > 0) {
        input.value = text.trim();
        handleModalYouTubeInput(input.value);
        showToast('유튜브 링크를 붙여넣었습니다! ✓', '📋');
        return;
      }
    }
  } catch (e) {
    console.warn(e);
  }
  input.focus();
  showToast('단축키(Ctrl+V / Cmd+V)로 링크를 붙여넣어 주세요.', 'ℹ️');
}

function handleModalYouTubeInput(val) {
  const id = extractYouTubeId(val);
  const card = document.getElementById('modal-yt-recognized-card');
  const thumb = document.getElementById('modal-yt-recognized-thumb');
  const titleEl = document.getElementById('modal-yt-recognized-title');
  const idEl = document.getElementById('modal-yt-recognized-id');

  if (id) {
    currentYouTubeId = id;
    if (card) { card.classList.remove('hidden'); card.classList.add('flex'); }
    if (thumb) thumb.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    const preset = sermonPresets[id];
    if (preset) {
      currentYouTubeTitle = preset.title;
      currentYouTubeScripture = preset.scripture;
      if (titleEl) titleEl.textContent = `"${preset.title}" (${preset.scripture})`;
    } else {
      if (titleEl) titleEl.textContent = '주일 예배 설교 영상';
    }
    if (idEl) idEl.textContent = `유튜브 ID: ${id} · 쇼츠 생성 준비 완료`;
  } else {
    if (card) { card.classList.add('hidden'); card.classList.remove('flex'); }
  }
}

function loadPresetToModal(id, title, scripture) {
  const input = document.getElementById('modal-youtube-url-input');
  if (input) {
    input.value = `https://www.youtube.com/watch?v=${id}`;
    handleModalYouTubeInput(input.value);
  }
  currentYouTubeId = id;
  currentYouTubeTitle = title;
  currentYouTubeScripture = scripture;
  showToast(`"${title}" 설교 영상이 선택되었습니다.`, '✨');
}

function submitModalYouTubeAndStart() {
  const input = document.getElementById('modal-youtube-url-input');
  const val = input ? input.value.trim() : '';
  const id = extractYouTubeId(val);
  if (id) {
    currentYouTubeId = id;
    currentInputMode = 'yt';
    closeYouTubeModal();
    startStudioGeneration();
  } else {
    showToast('올바른 유튜브 영상 링크를 입력해 주세요.', '⚠️');
  }
}

// Recent Sermon One-Click Studio Opener
function loadRecentSermon(id, title, scripture) {
  if (id === 'custom') {
    currentInputMode = 'paste';
    const ta = document.getElementById('manuscript-input');
    if (ta) {
      ta.value = `[${scripture} "${title}"]\n\n■ 서론: 시련 앞에서 성도가 취해야 할 믿음의 태도\n■ 1대지: 여러 가지 시험을 만나거든 온전히 기쁘게 여기라\n■ 2대지: 믿음의 시련이 인내를 만들어 내는 신비\n■ 3대지: 인내를 온전히 이루라 이는 너희로 온전하고 구비하여 부족함이 없게 함이라\n■ 결론: 흔들리지 않는 믿음으로 승리하는 삶`;
      updateCharCount(ta);
    }
    selectUploadTab('paste');
  } else {
    currentInputMode = 'yt';
    currentYouTubeId = id;
    currentYouTubeTitle = title;
    currentYouTubeScripture = scripture;
    selectUploadTab('yt');
  }
  showToast(`최근 설교 ["${title}"] 자료를 불러옵니다...`, '⚡️');
  startStudioGeneration();
}

// Auto initialize studio player and select default paste tab
window.addEventListener('DOMContentLoaded', () => {
  selectUploadTab('paste');
  initStudioPlayer();
  analyzeAndGenerateMinistryAssets();
});

// ================= 10-ASSET SHOWCASE ONE-CLICK LAUNCHER =================
function openAssetFeature(key) {
  // Ensure active sermon is generated
  analyzeAndGenerateMinistryAssets();
  const studio = document.getElementById('studio-modal');

  if (key === 'shorts') {
    if (studio) { studio.classList.remove('hidden'); studio.classList.add('flex'); }
    switchStudioTab('shorts');
    selectStudioClip(1);
    initStudioPlayer();
    showToast('📱 9:16 설교 쇼츠 3편 스튜디오가 활성화되었습니다.', '🎬');
  } else if (key === 'smallgroup') {
    if (studio) { studio.classList.remove('hidden'); studio.classList.add('flex'); }
    switchStudioTab('smallgroup');
    showToast('👥 구역·순·셀 소그룹 나눔 질문지가 준비되었습니다.', '📋');
  } else if (key === 'qt') {
    if (studio) { studio.classList.remove('hidden'); studio.classList.add('flex'); }
    switchStudioTab('qt');
    showToast('☀️ 월~토 주간 QT 6일치 묵상 가이드가 준비되었습니다.', '📖');
  } else if (key === 'cardnews') {
    if (studio) { studio.classList.remove('hidden'); studio.classList.add('flex'); }
    switchStudioTab('cardnews');
    showToast('🖼️ 인스타그램 카드뉴스 7장이 렌더링되었습니다.', '🎨');
  } else if (key === 'outline') {
    if (studio) { studio.classList.remove('hidden'); studio.classList.add('flex'); }
    switchStudioTab('outline');
    showToast('📝 설교 3대지 구조화 요약 리포트가 열렸습니다.', '📑');
  } else if (key === 'kakao') {
    if (studio) { studio.classList.remove('hidden'); studio.classList.add('flex'); }
    switchStudioTab('kakao');
    showToast('💬 성도 단톡방 알림톡 목회 서신이 준비되었습니다.', '💬');
  } else if (key === 'bulletin') {
    if (studio) { studio.classList.remove('hidden'); studio.classList.add('flex'); }
    switchStudioTab('bulletin');
    showToast('📜 주보 요약 500자 및 주일 대표 기도문이 열렸습니다.', '📜');
  } else if (key === 'srt') {
    if (studio) { studio.classList.remove('hidden'); studio.classList.add('flex'); }
    switchStudioTab('srt');
    downloadSubtitlesSRTFile();
    copySubtitlesSRT();
    showToast('📄 쇼츠 자막(SRT) 파일 다운로드 및 클립보드 복사 완료!', '🎬');
  } else if (key === 'timestamp') {
    if (studio) { studio.classList.remove('hidden'); studio.classList.add('flex'); }
    switchStudioTab('timestamp');
    copyYouTubeTimestamps();
    showToast('⏱️ 유튜브 타임스탬프가 복사되었습니다! 설명란에 붙여넣으세요.', '⏱️');
  } else if (key === 'zip') {
    downloadAllMaterials();
    showToast('📦 전체 10종 사역 자료 압축팩(ZIP) 다운로드를 시작합니다.', '🎉');
  }
}

function copyYouTubeTimestamps() {
  const text = (generatedMinistryAssets && generatedMinistryAssets.ytInfoText) ?
    generatedMinistryAssets.ytInfoText :
    (document.getElementById('content-timestamp-body')?.textContent || '');
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('유튜브 타임스탬프 안내문이 클립보드에 복사되었습니다! 유튜브 설명란에 붙여넣으세요.', '⏱️');
    });
  } else {
    showToast('타임스탬프 복사 완료!', '⏱️');
  }
}

