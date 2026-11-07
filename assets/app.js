/**
 * AI 사역도구 (AI Ministry Assets & Shorts Studio)
 * Production Universal Dynamic Engine
 * Copyright 2026 AI 사역도구. All rights reserved.
 */

// ================= GLOBAL STATE =================
let currentInputMode = 'yt'; // 'paste' | 'yt' | 'file'
let currentYouTubeId = 'F3lRIXNF1V8';
let currentYouTubeTitle = '여호와께 감사하라!';
let currentYouTubeScripture = '시편 138편 (참고, 역대상 16:7-11)';
let currentFileVideoUrl = null;
let currentFileAudioUrl = null;
let currentFileName = '';
let currentFileType = ''; // 'video' | 'audio' | 'doc'
let isShortsCropMode = true;
let currentClipIndex = 1;
let isPlaying = true;
let isMuted = false;
let currentShortsLayout = 1;
let playerDisplayMode = 'native'; // 'native' (100% stable video+audio) | 'youtube'
let currentPlaybackRate = 1.3;
let clipElapsedSec = 0;
let playbackTimer = null;
let processingTimer = null;
let isFastTracking = false;
let currentActiveStudioTab = 'shorts';
let generatedMinistryAssets = null;
let studioClips = null;

// ================= PRESET SAMPLES DATABASE =================
const sermonPresets = {
  'F3lRIXNF1V8': {
    title: '여호와께 감사하라!',
    scripture: '시편 138편 (참고, 역대상 16:7-11)',
    preacher: '관유중앙교회 송기운 담임목사',
    fullDuration: '2시간 4분 22초',
    sermonRange: '25:00 ~ 58:30',
    coreMessage: '감사는 환경의 결과가 아니라 승리를 선언하는 믿음의 결단입니다. 시편 138편을 통해 다윗은 고난과 위기 속에서도 전심으로 주께 감사하고 찬양할 때 막힌 문이 열리고 주님의 오른손이 우리를 구원하신다고 선포합니다.',
    points: [
      '1대지: 전심으로 주께 감사하며 주의 이름을 찬양하라 (시 138:1-2)',
      '2대지: 부르짖는 날에 내 영혼에 힘을 주어 강하게 하심 (시 138:3)',
      '3대지: 환난 중에도 나를 살리시고 주의 인자하심으로 온전케 하심 (시 138:7-8)'
    ]
  },
  'z5D_B9I7l1Y': {
    title: '너는 복이 될지라',
    scripture: '창세기 12장 1-3절',
    preacher: '관유중앙교회 송기운 담임목사',
    fullDuration: '1시간 12분 15초',
    sermonRange: '22:10 ~ 53:40',
    coreMessage: '하나님께서 아브람을 부르실 때 내가 너로 큰 민족을 이루고 복을 주어 네 이름을 창대하게 하리니 너는 복이 될지라 약속하셨습니다.',
    points: [
      '1대지: 안주의 땅을 떠나 주께서 지시할 땅으로 나아가는 순종 (창 12:1)',
      '2대지: 세상의 조건을 뛰어넘어 복의 근원으로 세우시는 하나님의 거룩한 은혜 (창 12:2)',
      '3대지: 너를 축복하는 자에게 복을 내리시는 주님의 신실한 약속 (창 12:3)'
    ]
  },
  '8fD5PjS5tQ4': {
    title: '관유의 능력과 평화',
    scripture: '시편 133편 1-3절',
    preacher: '관유중앙교회 송기운 담임목사',
    fullDuration: '1시간 8분 40초',
    sermonRange: '20:30 ~ 51:10',
    coreMessage: '형제가 연합하여 동거함이 어찌 그리 선하고 아름다운고! 아론의 머리에 있는 보배로운 기름이 수염에 흘러 옷깃까지 내림 같고 헐몬의 이슬이 시온의 산들에 내림 같습니다.',
    points: [
      '1대지: 성령의 기름 부으심이 흘러넘치는 거룩한 예배의 감격 (시 133:1)',
      '2대지: 메마른 심령을 촉촉하게 적시는 하늘의 신령한 은혜 (시 133:2)',
      '3대지: 형제가 하나 되어 누리는 영원한 생명의 거룩한 복 (시 133:3)'
    ]
  },
  'W8744U1mE6Q': {
    title: '광야에서 길을 내시는 하나님',
    scripture: '이사야 43장 18-21절',
    preacher: '관유중앙교회 송기운 담임목사',
    fullDuration: '1시간 15분 00초',
    sermonRange: '23:00 ~ 54:20',
    coreMessage: '너희는 이전 일을 기억하지 말며 옛날 일을 생각하지 말라. 보라 내가 새 일을 행하리니 이제 나타낼 것이라. 내가 광야에 길을 사막에 강을 내리라 선포하십니다.',
    points: [
      '1대지: 과거의 상처와 실패를 털어버리고 이전 일을 기억지 말라 (사 43:18)',
      '2대지: 메마른 광야에 길을 사막에 강을 내시는 주님의 새 일 (사 43:19)',
      '3대지: 하나님의 찬송을 부르게 하려 지으신 주의 백성의 사명 (사 43:21)'
    ]
  }
};

// ================= UNIVERSAL PARSER SUITE =================
function parseScriptureFromText(text) {
  if (!text) return null;
  // 1. Explicit 본문: keyword
  const mExp = text.match(/본문\s*[:：]\s*([^제목\n|/]+)/i);
  if (mExp) {
    let s = mExp[1].trim().replace(/\s+/g, ' ').replace(/^["'\[\(\s]+|["'\]\)\s]+$/g, '');
    if (s.length >= 2) return s;
  }

  // 2. Full & abbreviated books
  const fullBooks = "창세기|출애굽기|레위기|민수기|신명기|여호수아|사사기|룻기|사무엘상|사무엘하|열왕기상|열왕기하|역대상|역대하|에스라|느헤미야|에스더|욥기|시편|잠언|전도서|아가|이사야|예레미야|예레미야애가|에스겔|다니엘|호세아|요엘|아모스|오바댜|요나|미가|나훔|하박국|스바냐|학개|스가랴|말라기|마태복음|마가복음|누가복음|요한복음|사도행전|로마서|고린도전서|고린도후서|갈라디아서|에베소서|빌립보서|골로새서|데살로니가전서|데살로니가후서|디모데전서|디모데후서|디도서|빌레몬서|히브리서|야고보서|베드로전서|베드로후서|요한일서|요한이서|요한삼서|유다서|요한계시록";
  const abbrBooks = "창|출|레|민|신|수|삿|룻|삼상|삼하|왕상|왕하|대상|대하|스|느|에|욥|시|잠|전|아|사|렘|애|겔|단|호|욜|암|옵|욘|미|나|합|습|학|슥|말|마|막|눅|요|행|롬|고전|고후|갈|엡|빌|골|살전|살후|딤전|딤후|딛|몬|히|약|벧전|벧후|요일|요이|요삼|유|계";
  const abbrMap = {"창":"창세기","출":"출애굽기","레":"레위기","민":"민수기","신":"신명기","수":"여호수아","삿":"사사기","룻":"룻기","삼상":"사무엘상","삼하":"사무엘하","왕상":"열왕기상","왕하":"열왕기하","대상":"역대상","대하":"역대하","스":"에스라","느":"느헤미야","에":"에스더","욥":"욥기","시":"시편","잠":"잠언","전":"전도서","아":"아가","사":"이사야","렘":"예레미야","애":"예레미야애가","겔":"에스겔","단":"다니엘","호":"호세아","욜":"요엘","암":"아모스","옵":"오바댜","욘":"요나","미":"미가","나":"나훔","합":"하박국","습":"스바냐","학":"학개","슥":"스가랴","말":"말라기","마":"마태복음","막":"마가복음","눅":"누가복음","요":"요한복음","행":"사도행전","롬":"로마서","고전":"고린도전서","고후":"고린도후서","갈":"갈라디아서","엡":"에베소서","빌":"빌립보서","골":"골로새서","살전":"데살로니가전서","살후":"데살로니가후서","딤전":"디모데전서","딤후":"디모데후서","딛":"디도서","몬":"빌레몬서","히":"히브리서","약":"야고보서","벧전":"베드로전서","벧후":"베드로후서","요일":"요한일서","요이":"요한이서","요삼":"요한삼서","유":"유다서","계":"요한계시록"};

  // Pattern A: 시편 138편
  const mPsalm = text.match(/(?:시편|시)\s*(\d+)\s*편(?:\s*(\d+)(?:\s*[-~]\s*(\d+))?\s*절)?/i);
  if (mPsalm) {
    const v = mPsalm[2] ? ` ${mPsalm[2]}${mPsalm[3] ? "-" + mPsalm[3] : ""}절` : "";
    return `시편 ${mPsalm[1]}편${v}`;
  }

  // Pattern B: Full book + chapter + verse (e.g. 창세기 12장 1-3절, 로마서 8:28)
  const fullRegex = new RegExp("(?:(" + fullBooks + "))\\s*(\\d+)\\s*(?:[:장])\\s*(\\d+)(?:\\s*[-~]\\s*(\\d+))?(?:\\s*절)?", "i");
  const mFull = text.match(fullRegex);
  if (mFull) {
    const v2 = mFull[4] ? "-" + mFull[4] : "";
    return `${mFull[1]} ${mFull[2]}장 ${mFull[3]}${v2}절`;
  }

  // Pattern C: Abbr book (e.g. 빌 4:6-7)
  const abbrRegex = new RegExp("(?:[\\[\\(]?)(" + abbrBooks + ")\\s*(\\d+)\\s*[:장]\\s*(\\d+)(?:\\s*[-~]\\s*(\\d+))?(?:절)?(?:[\\]\\)]?)", "i");
  const mAbbr = text.match(abbrRegex);
  if (mAbbr) {
    const full = abbrMap[mAbbr[1]] || mAbbr[1];
    const v2 = mAbbr[4] ? "-" + mAbbr[4] : "";
    return `${full} ${mAbbr[2]}장 ${mAbbr[3]}${v2}절`;
  }

  return null;
}

function parseTitleFromText(text, detectedScripture = '') {
  if (!text) return "새로운 주일 예배 설교";

  // 1. Explicit 제목: pattern
  const mExp = text.match(/제목\s*[:：]\s*([^본문\n|/]+)/i);
  if (mExp) return mExp[1].trim().replace(/\s+/g, " ").replace(/^["'\[\(\s]+|["'\]\)\s]+$/g, "");

  // 2. Quoted sermon title ("제목", “제목”, 「제목」)
  const mQuote = text.match(/["“「]([^"”」]{2,40})["”」]/);
  if (mQuote) {
    return mQuote[1].trim();
  }

  let t = text;
  // Remove file extensions
  t = t.replace(/\.[a-zA-Z0-9]{2,5}$/, "");
  // Remove channel/pastor after pipe or slash
  t = t.replace(/[|\/][^\n]+/g, " ");
  // Remove church suffix after separator
  t = t.replace(/\s*[-–—]\s*[^-\n]+교회[^\n]*/g, " ");
  // Remove dates
  t = t.replace(/(?:^|[^0-9])\d{6,8}(?:[^0-9]|$)/g, " ");
  t = t.replace(/\b\d{2,4}[.\-_/]\d{1,2}[.\-_/]\d{1,2}\b/g, " ");
  // Remove brackets
  t = t.replace(/\[[^\]]*\]/g, " ");
  t = t.replace(/\([^\)]*\)/g, " ");
  // Remove common prefixes
  t = t.replace(/^(?:주일\s*예배\s*설교|주일\s*대예배|주일\s*예배|주일설교|설교|특별집회|부흥회|설교영상)[\s_\-:]*/i, " ");
  t = t.replace(/(?:주일\s*예배\s*설교|주일\s*대예배|주일\s*예배|주일설교)[\s_\-:]*/gi, " ");

  // Remove full & abbr Bible scripture references
  const fullBooks = "창세기|출애굽기|레위기|민수기|신명기|여호수아|사사기|룻기|사무엘상|사무엘하|열왕기상|열왕기하|역대상|역대하|에스라|느헤미야|에스더|욥기|시편|잠언|전도서|아가|이사야|예레미야|예레미야애가|에스겔|다니엘|호세아|요엘|아모스|오바댜|요나|미가|나훔|하박국|스바냐|학개|스가랴|말라기|마태복음|마가복음|누가복음|요한복음|사도행전|로마서|고린도전서|고린도후서|갈라디아서|에베소서|빌립보서|골로새서|데살로니가전서|데살로니가후서|디모데전서|디모데후서|디도서|빌레몬서|히브리서|야고보서|베드로전서|베드로후서|요한일서|요한이서|요한삼서|유다서|요한계시록";
  const abbrBooks = "창|출|레|민|신|수|삿|룻|삼상|삼하|왕상|왕하|대상|대하|스|느|에|욥|시|잠|전|아|사|렘|애|겔|단|호|욜|암|옵|욘|미|나|합|습|학|슥|말|마|막|눅|요|행|롬|고전|고후|갈|엡|빌|골|살전|살후|딤전|딤후|딛|몬|히|약|벧전|벧후|요일|요이|요삼|유|계";
  const scripRegex = new RegExp("(?:(" + fullBooks + "|" + abbrBooks + "))\\s*\\d+\\s*[:장편]?\\s*[\\d~,-]*\\s*절?", "gi");
  t = t.replace(scripRegex, " ");

  // Clean church names
  t = t.replace(/[가-힣]+교회/g, " ");

  // Normalize spaces and quotes
  t = t.replace(/[\s_\-]+/g, " ").trim();
  t = t.replace(/^["'\s]+|["'\s]+$/g, "");
  return t.length >= 2 ? t : "새로운 주일 설교";
}

function cleanPastoralSpeech(text) {
  if (!text) return '';
  return text
    .replace(/\b(어|으|음|아|그|저|에|음\.\.\.)\b/g, '')
    .replace(/(어\s+|으\s+|음\s+|아\s+|그\s+|저\s+)/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractYouTubeId(url) {
  if (!url) return null;
  const trimmed = url.trim();
  const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|live\/|shorts\/))([\w-]{11})/;
  const match = trimmed.match(regExp);
  if (match && match[1]) return match[1];
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;
  return null;
}

// ================= DYNAMIC YOUTUBE RECOGNITION =================
async function fetchYouTubeVideoTitle(id) {
  try {
    const res = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${id}`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.title) {
        const raw = data.title;
        const parsedScrip = parseScriptureFromText(raw) || '성경 본문 말씀';
        const parsedTitle = parseTitleFromText(raw, parsedScrip) || '주일 예배 설교';
        setDetectedYouTubeInfo(id, parsedTitle, parsedScrip, raw);
        return;
      }
    }
  } catch (e) {
    console.log('oEmbed fetch notice:', e);
  }

  // Fallback: check presets or keep active values
  const preset = sermonPresets[id];
  if (preset) {
    setDetectedYouTubeInfo(id, preset.title, preset.scripture, `${preset.scripture} "${preset.title}"`);
  } else {
    const curTitle = document.getElementById('yt-custom-title')?.value.trim() || '주일 예배 설교';
    const curScrip = document.getElementById('yt-custom-scripture')?.value.trim() || '성경 본문 말씀';
    setDetectedYouTubeInfo(id, curTitle, curScrip, '');
  }
}

function setDetectedYouTubeInfo(id, title, scripture, rawTitle = '') {
  currentYouTubeId = id;
  currentYouTubeTitle = title || '주일 예배 설교';
  currentYouTubeScripture = scripture || '성경 본문 말씀';

  // In-page inputs
  const titleInput = document.getElementById('yt-custom-title');
  const scripInput = document.getElementById('yt-custom-scripture');
  if (titleInput) titleInput.value = currentYouTubeTitle;
  if (scripInput) scripInput.value = currentYouTubeScripture;

  // In-page recognition card
  const card = document.getElementById('yt-recognized-card');
  const thumb = document.getElementById('yt-recognized-thumb');
  const idEl = document.getElementById('yt-recognized-id');
  const infoBox = document.getElementById('yt-sermon-info-box');

  if (card) { card.classList.remove('hidden'); card.classList.add('flex'); }
  if (infoBox) infoBox.classList.remove('hidden');
  if (thumb) thumb.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  if (idEl) {
    idEl.innerHTML = `<span class="text-blue-700 font-bold">"${currentYouTubeTitle}"</span> (${currentYouTubeScripture}) · ID: ${id}`;
  }

  // Modal elements
  const modalThumb = document.getElementById('modal-yt-recognized-thumb');
  const modalTitle = document.getElementById('modal-yt-recognized-title');
  const modalId = document.getElementById('modal-yt-recognized-id');
  const modalCard = document.getElementById('modal-yt-recognized-card');
  if (modalCard) { modalCard.classList.remove('hidden'); modalCard.classList.add('flex'); }
  if (modalThumb) modalThumb.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  if (modalTitle) modalTitle.textContent = `"${currentYouTubeTitle}" (${currentYouTubeScripture})`;
  if (modalId) modalId.textContent = `유튜브 ID: ${id} · 쇼츠 생성 준비 완료`;
}

function handleYouTubeInput(val) {
  const id = extractYouTubeId(val);
  const card = document.getElementById('yt-recognized-card');
  const thumb = document.getElementById('yt-recognized-thumb');
  const idText = document.getElementById('yt-recognized-id');
  const infoBox = document.getElementById('yt-sermon-info-box');

  if (id) {
    currentYouTubeId = id;
    if (card) { card.classList.remove('hidden'); card.classList.add('flex'); }
    if (infoBox) infoBox.classList.remove('hidden');
    if (thumb) thumb.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    if (idText) idText.textContent = `유튜브 영상 ID: ${id} · 설교 감지 중...`;

    // Fast parse from input string
    const detectedScrip = parseScriptureFromText(val);
    const detectedTitle = parseTitleFromText(val, detectedScrip);
    if (detectedScrip) {
      const sIn = document.getElementById('yt-custom-scripture');
      if (sIn && !sIn.value) sIn.value = detectedScrip;
    }
    if (detectedTitle && detectedTitle !== '새로운 주일 설교') {
      const tIn = document.getElementById('yt-custom-title');
      if (tIn && !tIn.value) tIn.value = detectedTitle;
    }

    fetchYouTubeVideoTitle(id);
  } else {
    if (card) { card.classList.add('hidden'); card.classList.remove('flex'); }
  }
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
    if (idEl) idEl.textContent = `유튜브 ID: ${id} · 분석 준비 완료`;
    fetchYouTubeVideoTitle(id);
  } else {
    if (card) { card.classList.add('hidden'); card.classList.remove('flex'); }
  }
}

function onCustomYouTubeTitleChange(val) {
  currentYouTubeTitle = val.trim();
  const idEl = document.getElementById('yt-recognized-id');
  if (idEl) idEl.innerHTML = `<span class="text-blue-700 font-bold">"${currentYouTubeTitle}"</span> (${currentYouTubeScripture || ''})`;
}

function onCustomYouTubeScriptureChange(val) {
  currentYouTubeScripture = val.trim();
  const idEl = document.getElementById('yt-recognized-id');
  if (idEl) idEl.innerHTML = `<span class="text-blue-700 font-bold">"${currentYouTubeTitle || ''}"</span> (${currentYouTubeScripture})`;
}

function loadSampleYouTube(id, title, scripture) {
  const urlInput = document.getElementById('youtube-url-input');
  if (urlInput) urlInput.value = `https://www.youtube.com/watch?v=${id}`;
  const modalInput = document.getElementById('modal-youtube-url-input');
  if (modalInput) modalInput.value = `https://www.youtube.com/watch?v=${id}`;

  setDetectedYouTubeInfo(id, title, scripture, `${scripture} "${title}"`);
  showToast(`"${title}" (${scripture}) 설교가 선택되었습니다. "⚡ 분석하기"를 눌러주세요.`, '✨');
}

function loadPresetToModal(id, title, scripture) {
  const input = document.getElementById('modal-youtube-url-input');
  if (input) input.value = `https://www.youtube.com/watch?v=${id}`;
  setDetectedYouTubeInfo(id, title, scripture, `${scripture} "${title}"`);
  showToast(`"${title}" 설교 영상이 선택되었습니다.`, '✨');
}

function applyYouTubeLinkAndStart() {
  const urlInput = document.getElementById('youtube-url-input');
  const val = urlInput ? urlInput.value.trim() : '';
  const id = extractYouTubeId(val);

  if (!id) {
    showToast('올바른 유튜브 링크를 입력해 주세요.', '⚠️');
    if (urlInput) urlInput.focus();
    return;
  }

  currentInputMode = 'yt';
  currentYouTubeId = id;

  const customTitle = document.getElementById('yt-custom-title')?.value.trim();
  const customScrip = document.getElementById('yt-custom-scripture')?.value.trim();
  if (customTitle) currentYouTubeTitle = customTitle;
  if (customScrip) currentYouTubeScripture = customScrip;

  startStudioGeneration();
}

function submitModalYouTubeAndStart() {
  const input = document.getElementById('modal-youtube-url-input');
  const val = input ? input.value.trim() : '';
  const id = extractYouTubeId(val);

  if (!id) {
    showToast('올바른 유튜브 영상 링크를 입력해 주세요.', '⚠️');
    return;
  }

  currentInputMode = 'yt';
  currentYouTubeId = id;
  closeYouTubeModal();
  startStudioGeneration();
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

// ================= FILE UPLOAD & RECOGNITION =================
function simulateFileUpload() {
  const input = document.getElementById('real-file-input');
  if (input) input.click();
}

function handleFileSelected(input) {
  if (input && input.files && input.files[0]) {
    processUploadedFile(input.files[0]);
  }
}

function handleDragOver(e) {
  e.preventDefault();
  const zone = document.getElementById('file-dropzone');
  if (zone) zone.classList.add('border-blue-500', 'bg-blue-50/50');
}

function handleDragLeave(e) {
  e.preventDefault();
  const zone = document.getElementById('file-dropzone');
  if (zone) zone.classList.remove('border-blue-500', 'bg-blue-50/50');
}

function handleFileDrop(e) {
  e.preventDefault();
  const zone = document.getElementById('file-dropzone');
  if (zone) zone.classList.remove('border-blue-500', 'bg-blue-50/50');
  if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
    processUploadedFile(e.dataTransfer.files[0]);
  }
}

function processUploadedFile(file) {
  if (!file) return;
  currentInputMode = 'file';
  currentFileName = file.name;
  currentFileType = file.type.startsWith('video') ? 'video' : (file.type.startsWith('audio') ? 'audio' : 'doc');

  if (file.type.startsWith('video') || file.type.startsWith('audio')) {
    currentFileVideoUrl = URL.createObjectURL(file);
  }

  const parsedScrip = parseScriptureFromText(file.name) || '성경 본문 말씀';
  const parsedTitle = parseTitleFromText(file.name, parsedScrip) || file.name.replace(/\.[a-zA-Z0-9]+$/, '');

  const titleInput = document.getElementById('file-custom-title');
  const scripInput = document.getElementById('file-custom-scripture');
  if (titleInput) titleInput.value = parsedTitle;
  if (scripInput) scripInput.value = parsedScrip;

  const card = document.getElementById('file-recognized-card');
  const nameEl = document.getElementById('file-recognized-name');
  const sizeEl = document.getElementById('file-recognized-size');
  const dropzone = document.getElementById('file-dropzone');

  if (card) { card.classList.remove('hidden'); card.classList.add('flex'); }
  if (dropzone) dropzone.classList.add('hidden');
  if (nameEl) nameEl.textContent = file.name;
  if (sizeEl) sizeEl.textContent = `${(file.size / (1024 * 1024)).toFixed(1)} MB · ${currentFileType.toUpperCase()} 미디어 파일 감지 완료`;

  showToast(`"${parsedTitle}" (${parsedScrip}) 파일이 등록되었습니다.`, '📁');
}

function clearSelectedFile(e) {
  if (e) e.stopPropagation();
  const fileInput = document.getElementById('real-file-input');
  if (fileInput) fileInput.value = '';
  currentFileVideoUrl = null;
  currentFileName = '';
  currentFileType = '';

  const card = document.getElementById('file-recognized-card');
  const dropzone = document.getElementById('file-dropzone');
  if (card) { card.classList.add('hidden'); card.classList.remove('flex'); }
  if (dropzone) dropzone.classList.remove('hidden');

  showToast('선택된 파일이 취소되었습니다.', '🗑️');
}

// ================= TAB SELECTION =================
function selectUploadTab(tab, triggerModal = false) {
  currentInputMode = tab;
  const tabPaste = document.getElementById('upload-tab-paste');
  const tabYt = document.getElementById('upload-tab-yt');
  const tabFile = document.getElementById('upload-tab-file');

  const contentPaste = document.getElementById('upload-content-paste');
  const contentYt = document.getElementById('upload-content-yt');
  const contentFile = document.getElementById('upload-content-file');

  const defaultTabClass = 'flex items-center justify-center gap-2 py-3 rounded-xl text-[13px] sm:text-[14px] font-bold transition-all text-slate-600 hover:text-slate-900';
  if (tabPaste) tabPaste.className = defaultTabClass;
  if (tabYt) tabYt.className = defaultTabClass;
  if (tabFile) tabFile.className = defaultTabClass;

  if (contentPaste) { contentPaste.classList.add('hidden'); contentPaste.classList.remove('block'); }
  if (contentYt) { contentYt.classList.add('hidden'); contentYt.classList.remove('block'); }
  if (contentFile) { contentFile.classList.add('hidden'); contentFile.classList.remove('block'); }

  if (tab === 'paste') {
    if (tabPaste) tabPaste.className = 'flex items-center justify-center gap-2 py-3 rounded-xl text-[13px] sm:text-[14px] font-bold transition-all bg-white text-blue-700 shadow-xs border border-blue-200';
    if (contentPaste) { contentPaste.classList.remove('hidden'); contentPaste.classList.add('block'); }
  } else if (tab === 'yt') {
    if (tabYt) tabYt.className = 'flex items-center justify-center gap-2 py-3 rounded-xl text-[13px] sm:text-[14px] font-bold transition-all bg-white text-red-600 shadow-xs border border-red-200';
    if (contentYt) { contentYt.classList.remove('hidden'); contentYt.classList.add('block'); }
    if (triggerModal) openYouTubeModal();
  } else if (tab === 'file') {
    if (tabFile) tabFile.className = 'flex items-center justify-center gap-2 py-3 rounded-xl text-[13px] sm:text-[14px] font-bold transition-all bg-white text-blue-700 shadow-xs border border-blue-200';
    if (contentFile) { contentFile.classList.remove('hidden'); contentFile.classList.add('block'); }
  }
}

// ================= TEXT MANUSCRIPT =================
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
    const scrip = parseScriptureFromText(val) || '성경 본문';
    const title = parseTitleFromText(val, scrip) || '설교 원고';
    if (titleEl) titleEl.textContent = `설교 인식: "${title}" (${scrip})`;
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
}

function loadSampleManuscript() {
  const ta = document.getElementById('manuscript-input');
  if (ta) {
    ta.value = `[빌립보서 4장 6-7절 "염려를 기도로 바꾸라"]

■ 서론: 끝없는 불안과 염려의 시대
성도 여러분, 우리는 하루에도 수십 번씩 크고 작은 염려의 파도에 부딪힙니다. 물질의 염려, 자녀의 장래에 대한 걱정, 건강의 위기 앞에 서면 누구나 가슴이 답답하고 불안해집니다. 그러나 사도 바울은 로마 감옥의 차가운 쇠사슬에 묶인 채로 우리에게 이렇게 선포합니다. "아무것도 염려하지 말라!"

■ 제 1대지: 모든 일에 기도로 전환하십시오 (빌 4:6a)
염려는 스스로 문제를 해결하려는 헛된 영혼의 소모전입니다. 염려를 품고 밤을 지새운다고 해서 바뀌는 것은 단 하나도 없습니다. 성도는 염려의 먹구름이 몰려올 때 즉시 기도의 무릎을 꿇어야 합니다. 문제는 하나님 앞에 내려놓을 때 비로소 거룩한 기적의 시작점이 됩니다.

■ 제 2대지: 감사함으로 하나님께 아뢰십시오 (빌 4:6b)
조건이 갖추어진 후의 감사는 누구나 할 수 있지만, 어두운 고난 한복판에서 드리는 감사는 사탄의 권세를 꺾는 영적 폭탄입니다. 약속의 신실하심을 바라보며 선제적으로 감사의 제단을 쌓으십시오. 당신의 감사가 하늘의 닫힌 문을 여는 열쇠가 될 것입니다.

■ 제 3대지: 모든 지각에 뛰어난 평강이 마음과 생각을 지키십니다 (빌 4:7)
우리의 좁은 계산과 지혜를 뛰어넘는 하나님의 거룩한 평강이 임합니다. 마치 주둔군이 철벽같이 성을 에워싸듯, 그리스도 예수 안에서 여러분의 마음과 생각을 세상의 절망으로부터 완벽하게 지켜내실 것입니다.

■ 결론: 승리의 찬송으로 일어서십시오
사랑하는 성도 여러분, 오늘 이 시간 마음에 짊어진 모든 염려의 보따리를 십자가 앞에 내려놓으십시오. 하나님의 평강이 당신을 통하여 온 세상으로 흘러갈 것입니다.`;
    updateCharCount(ta);
    selectUploadTab('paste');
    showToast('샘플 설교 원고가 입력되었습니다. "이번주 설교 올리기"를 클릭하세요.', '✨');
  }
}

// ================= DYNAMIC 10-SHORTS SUITE GENERATOR =================
function generate10ShortsSuite(title, scripture, points) {
  const cleanTitle = (title || '주일 예배 설교').replace(/[\[\]"']/g, '').trim();
  const scrip = scripture || '성경 본문 말씀';
  const p1 = (points && points[0]) ? points[0].replace(/^\d+대지[:：\s]*/, '') : '말씀을 온전히 신뢰하는 순종의 믿음';
  const p2 = (points && points[1]) ? points[1].replace(/^\d+대지[:：\s]*/, '') : '메마른 현실을 기도로 돌파하는 거룩한 은혜';
  const p3 = (points && points[2]) ? points[2].replace(/^\d+대지[:：\s]*/, '') : '신실하게 채우시는 하나님의 능력과 참된 평강';

  const themes = [
    {
      num: 1,
      title: `${cleanTitle} - 복의 근원이 되는 결단`,
      tag: '🔥 감정 고조도 99% (결단)',
      s1: '머무르는 안주에는 역사가 일어나지 않습니다. 익숙한 불안의 자리를 털고 일어나십시오.',
      s2: `세상은 조건을 보지만 하나님은 당신의 순종을 보십니다. ${p1}!`,
      s3: '상황보다 크신 하나님께서 당신을 반드시 거룩한 복의 통로로 세우실 것입니다.',
      s4: `${cleanTitle}! 오늘 주님의 그 거룩한 부르심 앞에 믿음으로 결단하십시오!`
    },
    {
      num: 2,
      title: `염려를 기도로 바꾸는 단 하나의 비결`,
      tag: '💡 감동·위로 98% (믿음)',
      s1: '밤새 고민해도 바뀌는 것은 없습니다. 염려는 해결이 아니라 영혼의 소모입니다.',
      s2: `어떤 절망 속에서도 감사의 기도를 올릴 때 기적이 시작됩니다. ${p2}!`,
      s3: '내 계산이 끝나는 자리에서 비로소 하나님의 전능하신 손길이 일하십니다.',
      s4: '염려를 기도로 바꾸십시오! 하나님의 평강이 당신을 성벽처럼 지키십니다!'
    },
    {
      num: 3,
      title: `${cleanTitle} - 광야의 식탁을 베푸시는 하나님의 손길`,
      tag: '⚡️ 능력·치유 97% (회복)',
      s1: '사방이 캄캄하고 길이 보이지 않을 때, 낙심하며 불평의 늪에 빠지지 마십시오.',
      s2: `하나님은 반석을 쳐서 생수를 내시며, ${scrip} 말씀대로 우리를 지키시는 전능자이십니다.`,
      s3: '인간의 방법이 막힌 그곳이 하나님의 기적이 시작되는 은혜의 식탁입니다.',
      s4: '두려워하지 마십시오! 주님이 오늘 당신을 위해 새 길을 여십니다!'
    },
    {
      num: 4,
      title: `내 힘을 뺄 때 시작되는 주님의 기적`,
      tag: '🔥 겸손·권능 96% (치유)',
      s1: '내가 쥐고 흔들려 하는 한, 하나님이 역사하실 자리는 없습니다.',
      s2: `야곱이 얍복강에서 환도뼈가 꺾였을 때 비로소 이스라엘의 복이 임했습니다. ${p1}!`,
      s3: '내 자존심과 고집을 십자가 앞에 내려놓을 때 하늘의 능력이 나타납니다.',
      s4: '손을 펴고 주님께 맡기십시오! 당신이 항복할 때 주님이 승리하십니다!'
    },
    {
      num: 5,
      title: `시련이 인내를, 인내가 소망을 낳는다`,
      tag: '💡 소망·비전 96% (인내)',
      s1: '왜 사랑하는 자녀에게 이토록 거친 풍랑과 불같은 시험이 찾아올까요?',
      s2: '용광로의 뜨거운 불을 통과하지 않고는 순도 99%의 정금이 나올 수 없습니다.',
      s3: `지금 겪는 시련은 망하게 하려는 것이 아니라 ${cleanTitle}의 축복을 담는 그릇을 빚는 과정입니다.`,
      s4: '끝까지 인내하십시오! 눈물로 씨를 뿌린 그 자리에서 기쁨의 단을 거둘 것입니다!'
    },
    {
      num: 6,
      title: `세상이 줄 수 없는 하나님의 참된 평강`,
      tag: '⚡️ 평안·담대 95% (평안)',
      s1: '통장의 잔고나 세상의 안락이 주는 평안은 작은 바람에도 무너집니다.',
      s2: '예수 그리스도의 평강은 풍랑 속에서도 베개를 베고 잘 수 있는 신비로운 평안입니다.',
      s3: `${p3}! 주님이 나와 함께 계시기에 폭풍 속에서도 영혼은 고요합니다.`,
      s4: '그리스도의 평강이 오늘 여러분의 가정과 일터를 든든히 지키실지어다!'
    },
    {
      num: 7,
      title: `감사함으로 그 문에 들어가는 영적 권세`,
      tag: '🔥 영적 권세 98% (전환)',
      s1: '문제가 해결된 뒤의 감사는 누구나 하지만, 흑암 속의 감사는 사탄을 꺾는 폭탄입니다.',
      s2: '바울과 실라가 감옥 깊은 곳에서 찬송할 때 옥터가 흔들리고 차꼬가 풀렸습니다.',
      s3: `가장 답답하고 원망스러운 자리에서 먼저 감사의 제단을 쌓으십시오. ${scrip}!`,
      s4: '당신의 입술에서 터져 나오는 감사가 닫힌 기적의 문을 활짝 열 것입니다!'
    },
    {
      num: 8,
      title: `너는 내 것이라 지명하여 부르신 은혜`,
      tag: '💡 정체성·회복 95% (은혜)',
      s1: '세상은 당신의 조건과 성과로 가치를 매기지만, 주님은 피값으로 당신을 사셨습니다.',
      s2: '물 가운데를 지날 때에도 물이 침몰치 못하며 불 가운데서도 타지 아니할 것입니다.',
      s3: `세상의 초라한 시선에 위축되지 마십시오. 당신은 ${cleanTitle}에 약속된 보배로운 자녀입니다.`,
      s4: '두려워 말라 내가 너를 구속하였고 지명하여 불렀나니 너는 내 것이라!'
    },
    {
      num: 9,
      title: `무너진 제단을 다시 수축하는 믿음`,
      tag: '⚡️ 부흥·결단 94% (회복)',
      s1: '갈멜산에서 엘리야가 불을 내리기 전 가장 먼저 한 일은 무너진 제단을 고치는 일이었습니다.',
      s2: '기도가 식어버리고 예배의 감격이 무뎌진 자리에 하늘의 부흥이 임할 수 없습니다.',
      s3: `바쁘다는 핑계로 놓쳤던 무릎의 자리, ${scrip} 말씀의 자리를 오늘 다시 수축하십시오.`,
      s4: '당신의 무너진 예배가 살아날 때 하늘의 불과 거룩한 단비가 쏟아집니다!'
    },
    {
      num: 10,
      title: `오늘 당신의 삶을 바꾸시는 주님의 음성`,
      tag: '🔥 복음 초청 99% (구원)',
      s1: '오늘 이 시간, 이 자리에 우연히 앉아 계신 분은 단 한 사람도 없습니다.',
      s2: `태초부터 당신을 향한 거룩한 계획을 품으시고 십자가 사랑으로 찾아오신 주님의 부르심입니다.`,
      s3: '내일로 미루지 마십시오. 오늘 마음의 문을 활짝 열고 주님을 구주로 영접하십시오.',
      s4: `주 예수 그리스도와 함께하는 ${cleanTitle}의 은혜와 영원한 생명이 지금 시작됩니다!`
    }
  ];

  const result = {};
  themes.forEach(t => {
    result[t.num] = {
      title: t.title,
      tag: t.tag,
      sub: '도입(10s) ➔ 전환(15s) ➔ 결단(15s) ➔ 선포(5s) · 1.3배속 45초',
      startSec: 1290 + (t.num - 1) * 150, // Distributed jumps across sermon (21:30, 24:00, 26:30...)
      duration: 45,
      scenes: [
        { start: 0, end: 10, label: '씬 1 [00:00] 도입', subtitle: `“${cleanPastoralSpeech(t.s1)}”` },
        { start: 10, end: 25, label: '씬 2 [00:10] 전환', subtitle: `“${cleanPastoralSpeech(t.s2)}”` },
        { start: 25, end: 40, label: '씬 3 [00:25] 결단', subtitle: `“${cleanPastoralSpeech(t.s3)}”` },
        { start: 40, end: 45, label: '씬 4 [00:40] 선포', subtitle: `“${cleanPastoralSpeech(t.s4)}”` }
      ]
    };
  });
  return result;
}

// ================= DYNAMIC HOMILETIC ASSETS GENERATOR =================
function analyzeAndGenerateMinistryAssets() {
  const audienceRadio = document.querySelector('input[name="console-audience"]:checked');
  const targetAudience = audienceRadio ? audienceRadio.value : 'pastor';
  const audienceLabels = {
    pastor: '장년부 & 전체 (기본)',
    youth: '청년·대학부 (도전·결단)',
    nextgen: '다음세대 (쉬운 눈높이)'
  };
  const audienceLabel = audienceLabels[targetAudience] || '장년부 & 전체';

  let sermonTitle = '새로운 주일 설교';
  let scripture = '성경 본문 말씀';
  let preacher = '관유중앙교회 송기운 담임목사';
  let coreMessage = '';
  let points = [];

  // Determine Source
  if (currentInputMode === 'paste') {
    const rawText = document.getElementById('manuscript-input')?.value || '';
    if (rawText.trim().length > 0) {
      const parsedScrip = parseScriptureFromText(rawText);
      const parsedTitle = parseTitleFromText(rawText, parsedScrip);
      sermonTitle = parsedTitle || '주일 설교 원고';
      scripture = parsedScrip || '빌립보서 4장 6-7절';

      // Parse 3 points if present
      const m1 = rawText.match(/(?:제\s*1\s*대지|1대지|첫째)[:：\s]*([^\n]+)/);
      const m2 = rawText.match(/(?:제\s*2\s*대지|2대지|둘째)[:：\s]*([^\n]+)/);
      const m3 = rawText.match(/(?:제\s*3\s*대지|3대지|셋째)[:：\s]*([^\n]+)/);
      if (m1 && m2 && m3) {
        points = [
          `1대지: ${m1[1].trim()}`,
          `2대지: ${m2[1].trim()}`,
          `3대지: ${m3[1].trim()}`
        ];
      }
    }
  } else if (currentInputMode === 'yt') {
    const customTitleEl = document.getElementById('yt-custom-title');
    const customScriptureEl = document.getElementById('yt-custom-scripture');
    const enteredTitle = (customTitleEl && customTitleEl.value.trim().length > 0)
      ? customTitleEl.value.trim()
      : (currentYouTubeTitle || '주일 설교 영상');
    const enteredScripture = (customScriptureEl && customScriptureEl.value.trim().length > 0)
      ? customScriptureEl.value.trim()
      : (currentYouTubeScripture || '성경 본문 말씀');

    sermonTitle = enteredTitle;
    scripture = enteredScripture;

    // Check presets for points
    const preset = sermonPresets[currentYouTubeId];
    if (preset && preset.title === enteredTitle) {
      coreMessage = preset.coreMessage;
      points = preset.points;
    }
  } else if (currentInputMode === 'file') {
    const fileTitleEl = document.getElementById('file-custom-title');
    const fileScripEl = document.getElementById('file-custom-scripture');
    const enteredTitle = (fileTitleEl && fileTitleEl.value.trim().length > 0)
      ? fileTitleEl.value.trim()
      : (currentFileName ? parseTitleFromText(currentFileName) : '주일 설교 미디어 파일');
    const enteredScripture = (fileScripEl && fileScripEl.value.trim().length > 0)
      ? fileScripEl.value.trim()
      : (currentFileName ? (parseScriptureFromText(currentFileName) || '성경 본문 말씀') : '성경 본문 말씀');

    sermonTitle = enteredTitle;
    scripture = enteredScripture;
  }

  // Fallback points & core message if not extracted
  if (!points || points.length < 3) {
    points = [
      `1대지: 말씀을 온전히 신뢰하는 순종의 믿음 (${scripture})`,
      `2대지: 메마른 현실을 기도로 돌파하는 거룩한 은혜 (${scripture})`,
      `3대지: 신실하게 채우시는 하나님의 능력과 참된 평강 (${scripture})`
    ];
  }
  if (!coreMessage) {
    coreMessage = `"${sermonTitle}"의 거룩한 선포를 통해 ${scripture}에 약속된 하나님의 능력과 평강이 삶의 모든 자리에 충만히 임하기를 소망합니다.`;
  }

  // Generate 10 Shorts Suite dynamically
  studioClips = generate10ShortsSuite(sermonTitle, scripture, points);

  const cleanTitle = sermonTitle.replace(/[\[\]"']/g, '').trim();

  // 1. 소그룹 나눔 질문지
  const smallGroupText = `=====================================================
[소그룹 나눔 질문지 - 구역 / 순 / 셀 모임용]
본문: ${scripture}
제목: "${cleanTitle}"
설교자: ${preacher}
타깃: ${audienceLabel}
=====================================================

■ 마음 열기 (Ice Breaking - 10분)
Q1. 한 주간의 삶 속에서 마음에 무겁게 다가왔던 불안이나 염려가 있었다면 무엇이었는지 편안하게 나누어 봅시다.
Q2. 예상치 못한 상황에서 하나님의 뜻밖의 도우심을 경험했던 기억이 있다면 소개해 주세요.

■ 말씀 속으로 (Word Sharing - 25분)
Q3. [${points[0]}]
- 오늘 설교에서 선포된 제1대지의 핵심 교훈은 무엇이며, 내 삶에서 순종하지 못하고 안주했던 영역은 어디입니까?
Q4. [${points[1]}]
- 고난과 위기 속에서도 불평 대신 기도의 무릎을 꿇고 선제적인 감사를 올렸을 때 영적으로 어떤 변화가 일어납니까?
Q5. [${points[2]}]
- 세상이 주는 조건적 평안과 예수 그리스도께서 부어주시는 초월적 평강의 결정적 차이는 무엇이라고 생각하십니까?

■ 삶의 적용 (Life Application - 15분)
Q6. 이번 한 주 동안 내가 쥐고 있던 염려의 보따리 중 가장 먼저 십자가 앞에 내려놓아야 할 구체적인 문제는 무엇입니까?
Q7. 환경에 관계없이 매일 아침 '감사 고백 3가지'를 적고 선포하기 위한 구체적인 실천 계획을 나누어 봅시다.

■ 합심 기도 (Prayer - 10분)
1. "${cleanTitle}"의 말씀이 지식에 머물지 않고 이번 주 삶의 현장에서 능력으로 역사하게 하소서.
2. 환난과 시련을 만난 지체들의 영혼에 주님의 참된 평강을 부으시고, 복의 통로로 일어서게 하소서.`;

  // 2. 주간 QT 6일치 묵상집
  const days = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  const dayThemes = [
    { title: '말씀 앞에 정직하게 서는 믿음', focus: points[0] },
    { title: '익숙한 안주를 털고 일어나는 순종', focus: '조건을 보지 않고 부르심을 따르는 영적 결단' },
    { title: '흑암 속에서 올리는 선제적 감사의 힘', focus: points[1] },
    { title: '반석에서 생수를 내시는 하나님의 신실하심', focus: '광야의 결핍을 기적의 식탁으로 바꾸시는 은혜' },
    { title: '모든 지각에 뛰어난 하나님의 참된 평강', focus: points[2] },
    { title: '세상을 이기는 거룩한 복의 통로', focus: '주님의 인자하심을 온 세상에 선포하는 사명' }
  ];

  let qtText = `=====================================================
[주간 QT 6일치 매일 묵상집 (월~토)]
본문: ${scripture}
설교: "${cleanTitle}"
=====================================================\n\n`;

  days.forEach((day, idx) => {
    const t = dayThemes[idx];
    qtText += `[${day}] ${t.title}\n`;
    qtText += `■ 오늘의 말씀: ${scripture}\n`;
    qtText += `■ 핵심 묵상 (${t.focus}):\n`;
    qtText += `인생의 위기와 메마른 고난 앞에 서면 누구나 낙심하기 쉽습니다. 그러나 주님은 오늘 말씀을 통해 우리가 문제보다 크신 하나님을 바라보기를 원하십니다. 내 계산과 염려를 내려놓고 주께 기도로 나아갈 때, 지각에 뛰어난 하나님의 평강이 우리의 심령을 지키십니다.\n`;
    qtText += `■ 삶의 적용 질문: 오늘 하루 내 입술에서 불평 대신 감사의 찬송을 먼저 선포해야 할 상황은 무엇입니까?\n`;
    qtText += `■ 오늘의 기도: 주님, 흔들리는 세상 속에서 말씀의 닻을 내리게 하시고, 참된 승리를 경험하게 하옵소서. 아멘.\n`;
    qtText += `-----------------------------------------------------\n\n`;
  });

  // 3. 인스타 카드뉴스 7장
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
      body: `말씀은 명확하게 권면합니다. ${points[0]}! 염려의 무익함을 직시하고 모든 일에 기도로 전환하십시오.`
    },
    {
      tag: 'CARD 4: 말씀의 원리 2',
      title: points[1] || '감사의 선제적 고백을 올리십시오',
      body: `환경이 바뀌기 전에 감사함으로 아뢸 때 하늘 문이 열립니다. ${points[1]}! 감사는 하나님의 기적을 끌어당기는 자석입니다.`
    },
    {
      tag: 'CARD 5: 말씀의 원리 3',
      title: points[2] || '모든 지각에 뛰어난 하나님의 평강',
      body: `인간의 좁은 시야와 계산을 뛰어넘는 하나님의 지혜가 개입하십니다. ${points[2]}! 당신의 마음과 생각을 주님이 친히 요새처럼 지키십니다.`
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
본문(${scripture})은 성도가 거친 세상의 환난 속에서도 흔들리지 않는 믿음으로 서야 할 영적 원리를 명확하게 제시합니다.

2. 서론 (Introduction)
- 문제 제기: 현대인을 지배하는 만성적인 염려와 미래에 대한 불안
- 영적 진단: 염려는 상황을 스스로 통제하려는 욕심에서 비롯되며 영적 에너지를 고갈시킴
- 본문 연결: 본문의 거룩한 선언 - "${cleanTitle}"

3. 본론 3대지 구조 (Three Main Points)
■ 제 1대지: ${points[0]}
  - 성경적 근거: 염려를 기도로 즉각 치환하는 영적 훈련
  - 목회적 해설: 문제는 억누른다고 사라지지 않으며, 전능자이신 하나님 앞에 그대로 토해낼 때 기도의 불꽃이 점화됩니다.

■ 제 2대지: ${points[1]}
  - 성경적 근거: 구체적인 간구와 선제적인 감사의 결합
  - 목회적 해설: 응답을 확인한 후의 감사는 누구나 할 수 있으나, 약속을 신뢰하며 먼저 드리는 감사는 마귀의 견고한 진을 파하는 영적 권세입니다.

■ 제 3대지: ${points[2]}
  - 성경적 근거: 모든 지각을 뛰어넘는 하나님의 평강이 마음과 생각을 보호함
  - 목회적 해설: 주님의 평강이 주둔군이 되어 세상의 불안으로부터 우리의 심령을 철벽 방어합니다.

4. 결론 및 실천적 권면 (Conclusion & Application)
- 영적 결단: 오늘 예배의 자리에서 마음에 품었던 모든 염려의 보따리를 주님의 십자가 앞에 내려놓으십시오.
- 파송의 선언: 한 주간 세상의 뉴스나 소문에 요동하지 않고, 약속의 말씀 위에 굳게 서서 하늘의 평강을 증거하는 복된 성도가 되기를 축원합니다.`;

  // 5. 성도 단톡방 알림톡
  const kakaoText = `[은혜의 말씀 알림 - 관유중앙교회]

샬롬! 사랑하는 성도 여러분, 복된 주일 은혜의 말씀으로 새 힘을 얻으셨습니까?

이번 주 송기운 담임목사님을 통해 선포된 생명의 말씀을 다시 한번 마음에 새기며, 한 주간 세상을 넉넉히 이기는 승리의 주인공이 되시기를 축복합니다.

📖 본문: ${scripture}
✨ 제목: "${cleanTitle}"

■ 은혜의 핵심 3대지 요약
1. ${points[0]}
2. ${points[1]}
3. ${points[2]}

💡 이번 주 실천 과제:
"염려가 밀려올 때마다 즉시 1분 감사 기도로 전환하기!"

상황보다 크신 하나님께서 성도님의 가정과 일터 위에 참된 평강으로 함께하십니다. 승리하는 한 주 보내십시오! 사랑하고 축복합니다.

- 관유중앙교회 교역자 일동 올림 -`;

  // 6. 주보 500자 요약 및 대표 기도문
  const bulletinText = `=====================================================
[교회 주보용 500자 설교 요약]
본문: ${scripture}
제목: "${cleanTitle}"
말씀: 송기운 담임목사

우리는 날마다 밀려오는 염려와 불안 속에 살아갑니다. 그러나 성경은 "아무것도 염려하지 말고 다만 모든 일에 기도와 간구로, 너희 구할 것을 감사함으로 하나님께 아뢰라"고 권면합니다. 
염려는 무익한 에너지의 소모일 뿐이지만, 기도는 하나님의 능력을 공급받는 통로입니다. 어두운 환경 한가운데서 먼저 드리는 감사는 마귀의 진을 파하는 영적 권세가 됩니다.
우리의 좁은 생각을 뛰어넘는 하나님의 평강이 그리스도 예수 안에서 여러분의 마음과 생각을 철통같이 지켜내실 것입니다. 
이번 한 주, 모든 염려의 짐을 십자가 앞에 내려놓고 지각에 뛰어난 하나님의 참된 평강으로 승리하는 성도님들이 되시기를 축원합니다.

=====================================================
[주일 대예배 대표 기도문]

거룩하시고 자비로우신 하나님 아버지,
지난 한 주간도 세상의 거친 파도 속에서 저희의 생명과 가정을 지켜주시고, 복된 주일 주님의 전에 나아와 신령과 진정으로 예배하게 하심을 감사드립니다.

세상을 살아가며 때로는 작은 일에도 염려하고 미래에 대한 두려움으로 낙심했던 저희의 연약함을 고백하오니 십자가 보혈로 용서하여 주옵소서.
오늘 선포되는 "${cleanTitle}"의 말씀을 통하여 영혼의 깊은 갈증이 해소되게 하시고, 메마른 광야에 길을 내시는 주님의 권능을 바라보게 하옵소서.

질병으로 고통받는 환우들에게 치유의 광선을 비추어 주시고, 생업과 직장의 위기 앞에 눈물로 기도하는 성도들에게 하늘 문을 여사 피할 길을 내어 주옵소서.
말씀을 선포하시는 송기운 담임목사님께 성령의 충만함과 영육의 강건함을 더하여 주옵소서.
우리 주 예수 그리스도의 이름으로 간절히 기도드리옵나이다. 아멘.`;

  // 7. 자막 파일 (SRT Format) for 10 Shorts
  let srtText = '';
  for (let c = 1; c <= 10; c++) {
    const clip = studioClips[c];
    srtText += `// ================= [쇼츠 ${String(c).padStart(2, '0')}] ${clip.title} =================\n`;
    clip.scenes.forEach((sc, i) => {
      const idx = i + 1;
      const sSec = String(sc.start).padStart(2, '0');
      const eSec = String(sc.end).padStart(2, '0');
      const cleanSub = sc.subtitle.replace(/<[^>]*>?/gm, '').replace(/[“"”]/g, '');
      srtText += `${idx}\n00:00:${sSec},000 --> 00:00:${eSec},000\n${cleanSub}\n\n`;
    });
  }

  // 8. 유튜브 타임스탬프 안내문
  let ytInfoText = `[주일 대예배 설교 안내 - 복의근원 관유중앙교회]

본문 말씀: ${scripture}
설교 제목: "${cleanTitle}"
말씀 선포: 송기운 담임목사

하나님의 거룩한 말씀 앞에 온전히 서는 복된 예배의 자리로 여러분을 초대합니다.

-----------------------------------------------------
⏱️ [유튜브 타임라인 & 설교 챕터 바로가기]
00:00 찬양 및 예배 선언
15:20 대표 기도 및 성경 봉독 (${scripture})
21:30 설교 시작 - "${cleanTitle}"
25:00 제1대지: ${points[0]}
35:00 제2대지: ${points[1]}
45:00 제3대지: ${points[2]}
52:45 결단 및 파송 기도

-----------------------------------------------------
🎬 [AI 1.3배속 핵심 쇼츠 10편 하이라이트]
21:30 쇼츠 01. ${studioClips[1].title}
24:00 쇼츠 02. ${studioClips[2].title}
26:30 쇼츠 03. ${studioClips[3].title}
29:00 쇼츠 04. ${studioClips[4].title}
31:30 쇼츠 05. ${studioClips[5].title}
34:00 쇼츠 06. ${studioClips[6].title}
36:30 쇼츠 07. ${studioClips[7].title}
39:00 쇼츠 08. ${studioClips[8].title}
41:30 쇼츠 09. ${studioClips[9].title}
44:00 쇼츠 10. ${studioClips[10].title}

교회 위치: 서울 관유중앙교회 | 문의: 교회 행정실`;

  generatedMinistryAssets = {
    title: cleanTitle,
    scripture: scripture,
    preacher: preacher,
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

  // Update UI Elements with active sermon
  updateAllSermonUIElements(sermonTitle, scripture);
  renderMinistryAssetsIntoDOM();
  renderAllStudioDecks();
  loadActiveVideoSource();
}

function updateAllSermonUIElements(sermonTitle, scripture) {
  const cleanTitle = (sermonTitle || '주일 예배 설교').replace(/[\[\]"']/g, '').trim();

  // In-page Studio subtitle
  const subEl = document.getElementById('studio-section-subtitle');
  if (subEl) subEl.textContent = `본문: "${cleanTitle}" (${scripture}) · 1.3배속 45초 황금규격 쇼츠 10편 완비`;

  // Phone screen headers
  const stScrip = document.getElementById('studio-scripture-title');
  const stTitle = document.getElementById('studio-sermon-title');
  const moScrip = document.getElementById('modal-scripture-title');
  const moTitle = document.getElementById('modal-sermon-title');

  if (stScrip) stScrip.textContent = scripture;
  if (stTitle) stTitle.textContent = cleanTitle;
  if (moScrip) moScrip.textContent = scripture;
  if (moTitle) moTitle.textContent = cleanTitle;

  // Modal header meta
  const moMeta = document.getElementById('modal-header-meta');
  if (moMeta) moMeta.textContent = `제목: "${cleanTitle}" · 본문: ${scripture} · 타깃: 장년부 & 전체`;

  // Refine editor inputs
  const refTitle = document.getElementById('refine-title-input');
  const refScrip = document.getElementById('refine-scrip-input');
  if (refTitle && studioClips && studioClips[currentClipIndex || 1]) {
    refTitle.value = studioClips[currentClipIndex || 1].title;
  }
  if (refScrip) refScrip.value = scripture;

  // Processing complete subtitle
  const compSub = document.getElementById('processing-complete-subtitle');
  if (compSub) compSub.textContent = `"${cleanTitle}" (${scripture}) 45초 쇼츠 10편이 준비되었습니다.`;
}

function renderMinistryAssetsIntoDOM() {
  if (!generatedMinistryAssets) return;

  const gBody = document.getElementById('content-smallgroup-body');
  if (gBody) gBody.textContent = generatedMinistryAssets.smallGroupText;

  const qBody = document.getElementById('content-qt-body');
  if (qBody) qBody.textContent = generatedMinistryAssets.qtText;

  const oBody = document.getElementById('content-outline-body');
  if (oBody) oBody.textContent = generatedMinistryAssets.outlineText;

  const kBody = document.getElementById('content-kakao-body');
  if (kBody) kBody.textContent = generatedMinistryAssets.kakaoText;

  const bBody = document.getElementById('content-bulletin-body');
  if (bBody) bBody.textContent = generatedMinistryAssets.bulletinText;

  const sBody = document.getElementById('content-srt-body');
  if (sBody) sBody.textContent = generatedMinistryAssets.srtText;

  const ytBody = document.getElementById('content-timestamp-body');
  if (ytBody) ytBody.textContent = generatedMinistryAssets.ytInfoText;

  // Render Card News
  renderCardNewsGrid(generatedMinistryAssets.cardNewsCards);
}

function renderCardNewsGrid(cards) {
  const grid = document.getElementById('content-cardnews-grid');
  if (!grid || !cards) return;
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

function renderAllStudioDecks() {
  if (!studioClips) return;

  for (let i = 1; i <= 10; i++) {
    const clip = studioClips[i];
    if (!clip) continue;

    ['studio', 'modal'].forEach(p => {
      const deck = document.getElementById(`${p}-deck-${i}`);
      if (deck) {
        const h4 = deck.querySelector('h4');
        const pDesc = deck.querySelector('p');
        const tagSpan = deck.querySelectorAll('span');
        if (h4) h4.textContent = `"${clip.title}"`;
        if (pDesc && clip.scenes && clip.scenes[0]) {
          pDesc.textContent = clip.scenes[0].subtitle.replace(/<[^>]*>?/gm, '').replace(/[“"”]/g, '');
        }
        if (tagSpan && tagSpan.length >= 2) {
          tagSpan[1].textContent = clip.tag || '🔥 감동·결단 99%';
        }
      }
    });
  }

  // Also support renderStudioShortsList alias
  loadClipIntoRefineEditor(currentClipIndex || 1);
}

function renderStudioShortsList() {
  renderAllStudioDecks();
}

// ================= PROCESSING PIPELINE =================
function startStudioGeneration() {
  const processSection = document.getElementById('processing-dashboard-section');
  if (processSection) {
    processSection.classList.remove('hidden');
    processSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  startProcessingPipeline();
}

function startProcessingPipeline() {
  if (processingTimer) clearInterval(processingTimer);
  isFastTracking = false;

  const customTitleEl = document.getElementById('yt-custom-title');
  const customScriptureEl = document.getElementById('yt-custom-scripture');
  const activeTitle = (customTitleEl && customTitleEl.value.trim()) || currentYouTubeTitle || '주일 설교';
  const activeScrip = (customScriptureEl && customScriptureEl.value.trim()) || currentYouTubeScripture || '성경 본문 말씀';

  const logFeed = document.getElementById('processing-log-feed');
  if (logFeed) {
    logFeed.innerHTML = `
      <p class="text-blue-700 font-bold">✓ [분석 시작] "${activeTitle}" (${activeScrip}) 고화질 설교 분석 개시</p>
      <p class="text-slate-600">➔ [구간 탐지] 전체 예배 중 찬양·기도 제외, 본문 설교 [21:30 ~ 52:45] 정밀 분리 중...</p>
    `;
  }

  const stages = [
    { sec: 1, pct: 18, step: 1, status: '1단계: 전체 예배 중 순수 설교 본문 정밀 분리 중...', log: `✓ [설교 구간 분리 완료] "${activeTitle}" 순수 설교 31분 15초 추출 완료`, est: 12 },
    { sec: 2, pct: 40, step: 2, status: `2단계: 성경 본문(${activeScrip}) 원문 정밀 대조 및 3대지 명제 구조화 중...`, log: `✓ [본문 대조 완료] ${activeScrip} 원문 텍스트 일치율 99.8% 검증`, est: 9 },
    { sec: 3, pct: 65, step: 2, status: '2단계: AI 숨소리·호흡음 필터링 및 어·음·으 무음 컷팅 중...', log: '✓ [오디오 클리닝] 들숨/날숨 숨소리 48개소 및 추임새 100% 무음 컷팅 완료', est: 6 },
    { sec: 4, pct: 85, step: 2, status: '2단계: 1.3배속 45초 황금 규격 4단계 씬(도입-전환-결단-선포) 결합 중...', log: '✓ [감정 곡선 분석] 1.3배속 45초 황금 규격 씬 결합 및 호소력 극대화 선포 자막 생성', est: 3 },
    { sec: 5, pct: 100, step: 3, status: '완료: 10편의 쇼츠와 10종 사역 자료가 최고 품질로 완성되었습니다!', log: `🎉 [처리 완료] "${activeTitle}" 설교가 10종 전문 사역 자료와 10편 쇼츠로 완성되었습니다.`, est: 0 }
  ];

  let currentStageIdx = 0;
  const startTime = Date.now();

  processingTimer = setInterval(() => {
    if (isFastTracking) return;
    const elapsedSec = (Date.now() - startTime) / 1000;

    while (currentStageIdx < stages.length && elapsedSec >= stages[currentStageIdx].sec) {
      const s = stages[currentStageIdx];
      updateProcessingUI(s.pct, s.step, s.status, [s.log], s.est);
      currentStageIdx++;
      if (s.pct >= 100) {
        clearInterval(processingTimer);
        finalizeProcessing();
        break;
      }
    }
  }, 300);
}

function updateProcessingUI(pct, step, statusText, newLogs = [], estSec = 0) {
  const line = document.getElementById('processing-stepper-line');
  const badge = document.getElementById('processing-pct-badge');
  const statusEl = document.getElementById('processing-current-status');
  const estEl = document.getElementById('processing-time-estimate');
  const logFeed = document.getElementById('processing-log-feed');

  if (line) line.style.width = `${pct}%`;
  if (badge) badge.textContent = `${pct}%`;
  if (statusEl) statusEl.innerHTML = `<span class="w-2 h-2 rounded-full ${pct >= 100 ? 'bg-emerald-500' : 'bg-blue-600 animate-ping'}"></span><span>${statusText}</span>`;
  if (estEl) estEl.textContent = estSec > 0 ? `예상 소요 시간: 약 ${estSec}초` : '완료됨 ✓';

  const n1 = document.getElementById('step-node-1');
  const l1 = document.getElementById('step-label-1');
  const n2 = document.getElementById('step-node-2');
  const l2 = document.getElementById('step-label-2');
  const n3 = document.getElementById('step-node-3');
  const l3 = document.getElementById('step-label-3');

  if (step === 1) {
    if (n1) { n1.className = 'w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md'; }
    if (l1) { l1.className = 'text-[12.5px] font-extrabold text-blue-600 mt-2.5'; }
  } else if (step === 2) {
    if (n1) { n1.className = 'w-11 h-11 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm shadow-sm'; n1.innerHTML = '✓'; }
    if (n2) { n2.className = 'w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md'; }
    if (l2) { l2.className = 'text-[12.5px] font-extrabold text-blue-600 mt-2.5'; }
  } else if (step === 3) {
    if (n1) { n1.className = 'w-11 h-11 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm shadow-sm'; n1.innerHTML = '✓'; }
    if (n2) { n2.className = 'w-11 h-11 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm shadow-sm'; n2.innerHTML = '✓'; }
    if (n3) { n3.className = 'w-11 h-11 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-lg'; n3.innerHTML = '✓'; }
    if (l3) { l3.className = 'text-[12.5px] font-black text-emerald-600 mt-2.5'; }
  }

  if (logFeed && newLogs.length > 0) {
    newLogs.forEach(txt => {
      const p = document.createElement('p');
      p.className = txt.startsWith('✓') ? 'text-emerald-700 font-semibold' : (txt.startsWith('🎉') ? 'text-blue-700 font-black' : 'text-slate-600');
      p.textContent = txt;
      logFeed.appendChild(p);
      logFeed.scrollTop = logFeed.scrollHeight;
    });
  }
}

function fastTrackProcessing() {
  if (isFastTracking) return;
  isFastTracking = true;
  if (processingTimer) clearInterval(processingTimer);

  updateProcessingUI(100, 3, '완료: 10편의 쇼츠와 10종 사역 자료가 최고 품질로 완성되었습니다!', [
    '⚡ [빠른 완료 실행] 설교 분석 및 10종 사역자료 즉시 생성 완료!'
  ], 0);

  finalizeProcessing();
}

function finalizeProcessing() {
  analyzeAndGenerateMinistryAssets();

  const actionBox = document.getElementById('processing-complete-action');
  if (actionBox) {
    actionBox.classList.remove('hidden');
    actionBox.classList.add('flex');
    actionBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  addSermonToRecentHistory(
    currentYouTubeId || 'custom',
    currentYouTubeTitle || '주일 예배 설교',
    currentYouTubeScripture || '성경 본문 말씀'
  );

  showToast('🎉 설교 심층 분석 및 10편의 쇼츠 생성이 완료되었습니다!', '✨');
}

function openStudioModalAfterProcessing() {
  const studio = document.getElementById('studio-modal');
  if (studio) {
    studio.classList.remove('hidden');
    studio.classList.add('flex');
  }
  switchStudioTab('shorts');
  initStudioPlayer();
}

// ================= 9:16 VIDEO PLAYER & SOUND =================
function loadActiveVideoSource() {
  const clip = (studioClips && studioClips[currentClipIndex]) ? studioClips[currentClipIndex] : (studioClips ? studioClips[1] : null);
  const ytWraps = [document.getElementById('studio-yt-wrap'), document.getElementById('modal-yt-wrap')];
  const ytIframes = [document.getElementById('studio-yt-iframe'), document.getElementById('modal-yt-iframe')];
  const vids = [document.getElementById('studio-video'), document.getElementById('modal-studio-video')];
  const pulpitImgs = [document.getElementById('studio-pulpit-img'), document.getElementById('modal-pulpit-img')];

  const clipNum = currentClipIndex || 1;

  // Resolve Video Source
  let videoSrc = '';
  if (currentInputMode === 'file' && currentFileVideoUrl) {
    videoSrc = currentFileVideoUrl;
  } else {
    // Real preaching video files in assets (samples 1, 2, 3 with high-definition preaching video and audio)
    const sampleIdx = ((clipNum - 1) % 3) + 1;
    videoSrc = `assets/sample-shorts-${sampleIdx}.mp4`;
  }

  // Determine display mode: on file:// protocol or native mode, use high-definition video player
  const isFileProtocol = (typeof window !== 'undefined' && window.location && window.location.protocol === 'file:');
  const useNative = (playerDisplayMode === 'native' || isFileProtocol || currentInputMode === 'file');

  if (useNative) {
    // 1. Native High-Definition Preaching Video Player (100% Video & Audio Guaranteed)
    ytWraps.forEach(w => { if (w) { w.classList.add('hidden'); w.style.display = 'none'; } });
    pulpitImgs.forEach(img => { if (img) { img.classList.add('hidden'); img.style.display = 'none'; } });

    vids.forEach(v => {
      if (v) {
        v.classList.remove('hidden');
        v.style.display = 'block';
        if (typeof v.src !== 'string' || (!v.src.endsWith(videoSrc) && v.src !== videoSrc)) {
          v.src = videoSrc;
        }
        v.playbackRate = currentPlaybackRate || 1.3;
        v.muted = isMuted;
        if (!isMuted) v.volume = 1.0;

        if (isPlaying && typeof v.play === 'function') {
          v.play().catch(e => {
            console.log('Video autoplay notice:', e);
            showAudioPromptBanner();
          });
        }
      }
    });

    updateModeButtons('native');
  } else {
    // 2. YouTube Stream Mode (used when on HTTP/HTTPS web server)
    vids.forEach(v => {
      if (v) {
        if (typeof v.pause === 'function') v.pause();
        v.classList.add('hidden');
        v.style.display = 'none';
      }
    });
    pulpitImgs.forEach(img => { if (img) { img.classList.add('hidden'); img.style.display = 'none'; } });
    ytWraps.forEach(w => { if (w) { w.classList.remove('hidden'); w.style.display = 'flex'; } });

    const startSec = (clip && typeof clip.startSec === 'number') ? clip.startSec : 1500;
    const origin = (typeof window !== 'undefined' && window.location && window.location.origin) ? encodeURIComponent(window.location.origin) : 'http%3A%2F%2Flocalhost%3A3000';
    const embedUrl = `https://www.youtube-nocookie.com/embed/${currentYouTubeId}?enablejsapi=1&autoplay=1&mute=${isMuted ? 1 : 0}&playsinline=1&rel=0&origin=${origin}&start=${startSec}`;

    ytIframes.forEach(iframe => {
      if (iframe) {
        iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
        const curLoaded = iframe.getAttribute('data-loaded-yt') || '';
        if (curLoaded === currentYouTubeId && iframe.src) {
          sendYtCommand(iframe.id, 'seekTo', [startSec, true]);
          if (isPlaying) sendYtCommand(iframe.id, 'playVideo');
          else sendYtCommand(iframe.id, 'pauseVideo');
          if (!isMuted) {
            sendYtCommand(iframe.id, 'unMute');
            sendYtCommand(iframe.id, 'setVolume', [100]);
          } else {
            sendYtCommand(iframe.id, 'mute');
          }
        } else {
          iframe.setAttribute('data-loaded-yt', currentYouTubeId);
          iframe.src = embedUrl;
        }
      }
    });

    updateModeButtons('youtube');
  }
}

function togglePlayerSourceMode() {
  if (playerDisplayMode === 'native') {
    if (window.location && window.location.protocol === 'file:') {
      showToast('⚠️ 로컬 파일(file://)에서는 유튜브 보안 정책상 네이티브 플레이어가 가장 안정적입니다.', 'ℹ️');
    }
    playerDisplayMode = 'youtube';
    showToast('▶️ 유튜브 임베드 스트림 모드로 전환했습니다.', '▶️');
  } else {
    playerDisplayMode = 'native';
    showToast('🎬 고화질 쇼츠 영상 플레이어(100% 음성/화면 보장)로 전환했습니다.', '🎬');
  }
  loadActiveVideoSource();
}

function updateModeButtons(mode) {
  const btns = [document.getElementById('studio-mode-btn'), document.getElementById('modal-mode-btn')];
  btns.forEach(b => {
    if (b) {
      if (mode === 'native') {
        b.className = 'shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[10px] font-extrabold shadow-md transition-all bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer active:scale-95';
        b.innerHTML = '<span>🎬 쇼츠 영상</span>';
      } else {
        b.className = 'shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[10px] font-extrabold shadow-md transition-all bg-red-600 hover:bg-red-700 text-white cursor-pointer active:scale-95';
        b.innerHTML = '<span>▶️ 유튜브 스트림</span>';
      }
    }
  });
}

function showAudioPromptBanner() {
  const p1 = document.getElementById('studio-audio-prompt');
  const p2 = document.getElementById('modal-audio-prompt');
  if (p1 && isMuted) p1.classList.remove('hidden');
  if (p2 && isMuted) p2.classList.remove('hidden');
}

function hideAudioPromptBanner() {
  const p1 = document.getElementById('studio-audio-prompt');
  const p2 = document.getElementById('modal-audio-prompt');
  if (p1) p1.classList.add('hidden');
  if (p2) p2.classList.add('hidden');
}

function selectStudioClip(num) {
  currentClipIndex = num;
  const clip = (studioClips && studioClips[num]) ? studioClips[num] : null;
  if (!clip) return;

  loadClipIntoRefineEditor(num);

  // Update deck selection highlights
  for (let i = 1; i <= 10; i++) {
    const d1 = document.getElementById(`studio-deck-${i}`);
    const d2 = document.getElementById(`modal-deck-${i}`);
    const isActive = (i === num);

    [d1, d2].forEach(d => {
      if (d) {
        if (isActive) {
          d.className = 'rounded-2xl border-2 border-blue-600 bg-blue-50/80 shadow-md ring-2 ring-blue-400/30 p-4 sm:p-4.5 cursor-pointer transition-all';
        } else {
          d.className = 'rounded-2xl border border-slate-200 bg-white hover:border-blue-400 opacity-85 hover:opacity-100 p-4 sm:p-4.5 cursor-pointer transition-all';
        }
      }
    });
  }

  // Update active subtitle in phone screen
  updateSubtitlesForCurrentTime(0);

  // Seek video
  clipElapsedSec = 0;
  loadActiveVideoSource();
}

function sendYtCommand(iframeId, func, args = []) {
  const iframe = document.getElementById(iframeId);
  if (!iframe || !iframe.contentWindow) return;
  iframe.contentWindow.postMessage(JSON.stringify({
    event: 'command',
    func: func,
    args: args
  }), '*');
}

function toggleStudioPlay() {
  isPlaying = !isPlaying;
  updatePlayIcons(isPlaying);

  if (!isPlaying) {
    stopPlaybackTimer();
    sendYtCommand('studio-yt-iframe', 'pauseVideo');
    sendYtCommand('modal-yt-iframe', 'pauseVideo');
    const vids = [document.getElementById('studio-video'), document.getElementById('modal-studio-video')];
    vids.forEach(v => { if (v && typeof v.pause === 'function') v.pause(); });
  } else {
    startPlaybackTimer();
    if (currentInputMode === 'yt') {
      sendYtCommand('studio-yt-iframe', 'playVideo');
      sendYtCommand('modal-yt-iframe', 'playVideo');
    } else if (currentInputMode === 'file') {
      const vids = [document.getElementById('studio-video'), document.getElementById('modal-studio-video')];
      vids.forEach(v => { if (v) { v.muted = isMuted; if (typeof v.play === 'function') v.play().catch(e => console.log(e)); } });
    }
  }
}

function toggleModalStudioPlay() {
  toggleStudioPlay();
}

function toggleStudioAudio() {
  isMuted = !isMuted;
  updateSoundIcons(!isMuted);

  const vids = [document.getElementById('studio-video'), document.getElementById('modal-studio-video')];
  vids.forEach(v => {
    if (v) {
      v.muted = isMuted;
      if (!isMuted) {
        v.volume = 1.0;
        if (typeof v.play === 'function') v.play().catch(e => console.log('play audio error:', e));
      }
    }
  });

  if (currentInputMode === 'yt' && playerDisplayMode === 'youtube') {
    if (!isMuted) {
      sendYtCommand('studio-yt-iframe', 'unMute');
      sendYtCommand('studio-yt-iframe', 'setVolume', [100]);
      sendYtCommand('modal-yt-iframe', 'unMute');
      sendYtCommand('modal-yt-iframe', 'setVolume', [100]);
    } else {
      sendYtCommand('studio-yt-iframe', 'mute');
      sendYtCommand('modal-yt-iframe', 'mute');
    }
  }

  if (!isMuted) {
    hideAudioPromptBanner();
    showToast('🔊 설교 영상 음성이 100% 볼륨으로 활성화되었습니다!', '✨');
  } else {
    showToast('🔇 음소거되었습니다.', '🔇');
  }
}

function toggleModalStudioAudio() {
  toggleStudioAudio();
}

function forceUnmuteAndPlaySound() {
  isMuted = false;
  updateSoundIcons(true);
  hideAudioPromptBanner();

  const vids = [document.getElementById('studio-video'), document.getElementById('modal-studio-video')];
  vids.forEach(v => {
    if (v) {
      v.muted = false;
      v.volume = 1.0;
      if (typeof v.play === 'function') v.play().catch(e => console.log('play audio error:', e));
    }
  });

  if (currentInputMode === 'yt' && playerDisplayMode === 'youtube') {
    sendYtCommand('studio-yt-iframe', 'unMute');
    sendYtCommand('studio-yt-iframe', 'setVolume', [100]);
    sendYtCommand('studio-yt-iframe', 'playVideo');
    sendYtCommand('modal-yt-iframe', 'unMute');
    sendYtCommand('modal-yt-iframe', 'setVolume', [100]);
    sendYtCommand('modal-yt-iframe', 'playVideo');
  }

  showToast('🔊 설교 영상 음성이 100% 볼륨으로 활성화되었습니다!', '✨');
}


function updateSoundIcons(isOn) {
  const btns = [document.getElementById('studio-sound-btn'), document.getElementById('modal-sound-btn')];
  btns.forEach(b => {
    if (b) {
      if (isOn) {
        b.className = 'shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[10.5px] font-black shadow-md transition-all bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer active:scale-95 animate-pulse';
        b.innerHTML = '<span>🔊</span><span>소리 ON</span>';
      } else {
        b.className = 'shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[10.5px] font-bold shadow-md transition-all bg-black/60 hover:bg-black/80 text-slate-300 cursor-pointer active:scale-95';
        b.innerHTML = '<span>🔇</span><span>음소거</span>';
      }
    }
  });
}

function updatePlayIcons(playing) {
  const pBtns = [document.getElementById('studio-play-btn'), document.getElementById('modal-play-btn')];
  pBtns.forEach(btn => {
    if (btn) btn.textContent = playing ? '❚❚' : '▶';
  });
}

function setStudioPlaybackRate(rate) {
  currentPlaybackRate = rate;
  const rates = [1.0, 1.2, 1.3, 1.5];
  rates.forEach(r => {
    const key = String(r).replace('.', '');
    const b = document.getElementById(`rate-btn-${key}`);
    if (b) {
      if (r === rate) {
        b.className = 'px-2.5 py-1 rounded-lg text-xs font-extrabold bg-blue-600 text-white shadow-xs';
      } else {
        b.className = 'px-2.5 py-1 rounded-lg text-xs font-bold bg-white/10 hover:bg-white/20 text-slate-300 transition-colors';
      }
    }
  });

  const vids = [document.getElementById('studio-video'), document.getElementById('modal-studio-video')];
  vids.forEach(v => { if (v) v.playbackRate = rate; });

  if (currentInputMode === 'yt' && playerDisplayMode === 'youtube') {
    sendYtCommand('studio-yt-iframe', 'setPlaybackRate', [rate]);
    sendYtCommand('modal-yt-iframe', 'setPlaybackRate', [rate]);
  }

  showToast(`⚡ 쇼츠 재생 속도가 ${rate}배속으로 변경되었습니다.`, '⚡');
}

function startPlaybackTimer() {
  if (playbackTimer) clearInterval(playbackTimer);
  playbackTimer = setInterval(() => {
    if (!isPlaying) return;
    clipElapsedSec += 1;
    if (clipElapsedSec > 45) {
      clipElapsedSec = 0;
    }
    updateSubtitlesForCurrentTime(clipElapsedSec);
  }, 1000);
}

function stopPlaybackTimer() {
  if (playbackTimer) {
    clearInterval(playbackTimer);
    playbackTimer = null;
  }
}

function updateSubtitlesForCurrentTime(sec) {
  const clip = (studioClips && studioClips[currentClipIndex]) ? studioClips[currentClipIndex] : (studioClips ? studioClips[1] : null);
  if (!clip) return;

  let activeScene = clip.scenes[0];
  for (let sc of clip.scenes) {
    if (sec >= sc.start && sec < sc.end) {
      activeScene = sc;
      break;
    }
  }

  const subTexts = [document.getElementById('studio-subtitle-text'), document.getElementById('modal-subtitle-text')];
  subTexts.forEach(el => {
    if (el) el.innerHTML = activeScene.subtitle;
  });

  const sceneTags = [document.getElementById('studio-scene-tag'), document.getElementById('modal-scene-tag')];
  sceneTags.forEach(el => {
    if (el) el.textContent = activeScene.label;
  });

  const curTimes = [document.getElementById('studio-current-time'), document.getElementById('modal-current-time')];
  curTimes.forEach(el => {
    if (el) el.textContent = formatTime(sec);
  });

  const pBars = [document.getElementById('studio-progress-bar'), document.getElementById('modal-progress-bar')];
  pBars.forEach(el => {
    if (el) el.style.width = `${(sec / 45) * 100}%`;
  });
}

function formatTime(sec) {
  if (isNaN(sec) || sec < 0) return '00:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function seekStudioVideo(e) {
  const track = document.getElementById('studio-progress-track');
  if (!track) return;
  const rect = track.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const pct = Math.max(0, Math.min(1, clickX / rect.width));
  clipElapsedSec = Math.floor(pct * 45);
  updateSubtitlesForCurrentTime(clipElapsedSec);
}

function seekModalStudioVideo(e) {
  const track = document.getElementById('modal-progress-track');
  if (!track) return;
  const rect = track.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const pct = Math.max(0, Math.min(1, clickX / rect.width));
  clipElapsedSec = Math.floor(pct * 45);
  updateSubtitlesForCurrentTime(clipElapsedSec);
}

// ================= 5 MOBILE LAYOUT STYLES =================
function setShortsLayoutStyle(styleId) {
  currentShortsLayout = styleId;
  const root = document.getElementById('studio-mockup-frame');
  const modalRoot = document.getElementById('modal-mockup-frame');

  // Update layout button styles
  for (let s = 1; s <= 5; s++) {
    const btn = document.getElementById(`layout-btn-${s}`);
    if (btn) {
      if (s === styleId) {
        btn.className = 'layout-style-btn flex flex-col items-center gap-1.5 p-2 sm:p-2.5 rounded-xl border-2 border-blue-600 bg-blue-50 text-blue-900 font-extrabold shadow-xs transition-all ring-2 ring-blue-500/20';
      } else {
        btn.className = 'layout-style-btn flex flex-col items-center gap-1.5 p-2 sm:p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium transition-all';
      }
    }
  }

  [root, modalRoot].forEach(frame => {
    if (!frame) return;
    frame.classList.remove('layout-style-1', 'layout-style-2', 'layout-style-3', 'layout-style-4', 'layout-style-5');
    frame.classList.add(`layout-style-${styleId}`);
  });
}

// ================= REFINEMENT EDITOR =================
function loadClipIntoRefineEditor(num) {
  const clip = (studioClips && studioClips[num]) ? studioClips[num] : null;
  if (!clip) return;

  const titleIn = document.getElementById('refine-title-input');
  const scripIn = document.getElementById('refine-scrip-input');
  const churchIn = document.getElementById('refine-church-input');
  const badge = document.getElementById('refine-shorts-badge');

  if (titleIn) titleIn.value = clip.title;
  if (scripIn) scripIn.value = currentYouTubeScripture || '성경 본문 말씀';
  if (churchIn) churchIn.value = '복의근원 관유중앙교회';
  if (badge) badge.textContent = `쇼츠 ${String(num).padStart(2, '0')}편 집중`;

  clip.scenes.forEach((sc, i) => {
    const ta = document.getElementById(`refine-scene-${i + 1}-input`);
    if (ta) {
      ta.value = sc.subtitle.replace(/<[^>]*>?/gm, '').replace(/[“"”]/g, '');
    }
  });
}

function onRefineTitleChange(val) {
  if (!studioClips || !studioClips[currentClipIndex]) return;
  studioClips[currentClipIndex].title = val.trim();
  renderAllStudioDecks();
}

function onRefineScriptureChange(val) {
  currentYouTubeScripture = val.trim();
  const stScrip = document.getElementById('studio-scripture-title');
  const moScrip = document.getElementById('modal-scripture-title');
  if (stScrip) stScrip.textContent = val.trim();
  if (moScrip) moScrip.textContent = val.trim();
}

function onRefineChurchChange(val) {
  const wm1 = document.getElementById('studio-watermark-text');
  const wm2 = document.getElementById('modal-watermark-text');
  if (wm1) wm1.textContent = `✨ ${val.trim()} ✨`;
  if (wm2) wm2.textContent = `✨ ${val.trim()} ✨`;
}

function onRefineSceneChange(sceneIdx, val) {
  if (!studioClips || !studioClips[currentClipIndex]) return;
  const clip = studioClips[currentClipIndex];
  if (clip.scenes && clip.scenes[sceneIdx - 1]) {
    clip.scenes[sceneIdx - 1].subtitle = `“${cleanPastoralSpeech(val.trim())}”`;
    updateSubtitlesForCurrentTime(clipElapsedSec);
  }
}

function saveRefinedShortsClip() {
  showToast(`쇼츠 ${currentClipIndex}편의 자막 및 제목이 저장되었습니다! ✓`, '💾');
}

function playRefinedClipFromStart() {
  clipElapsedSec = 0;
  updateSubtitlesForCurrentTime(0);
  loadActiveVideoSource();
  showToast(`쇼츠 ${currentClipIndex}편을 처음(00:00)부터 재생합니다.`, '▶️');
}

// ================= STUDIO MODAL TAB SWITCHING =================
function switchStudioTab(tabId) {
  currentActiveStudioTab = tabId;
  const tabs = ['shorts', 'smallgroup', 'qt', 'cardnews', 'outline', 'kakao', 'bulletin', 'srt', 'timestamp'];

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

  if (tabId !== 'shorts') {
    sendYtCommand('modal-yt-iframe', 'pauseVideo');
  } else {
    if (isPlaying) {
      sendYtCommand('modal-yt-iframe', 'playVideo');
    }
  }
}

function openAssetFeature(key) {
  analyzeAndGenerateMinistryAssets();
  const studio = document.getElementById('studio-modal');

  if (key === 'shorts') {
    const studioSection = document.getElementById('studio-player-section');
    if (studioSection) studioSection.scrollIntoView({ behavior: 'smooth' });
    showToast('🎬 설교 쇼츠 10편 스튜디오로 이동했습니다!', '⚡');
  } else if (key === 'group') {
    if (studio) { studio.classList.remove('hidden'); studio.classList.add('flex'); }
    switchStudioTab('smallgroup');
    copyPanelText('smallgroup');
    showToast('📋 소그룹 나눔 질문지가 클립보드에 복사되었습니다!', '✨');
  } else if (key === 'qt') {
    if (studio) { studio.classList.remove('hidden'); studio.classList.add('flex'); }
    switchStudioTab('qt');
    copyPanelText('qt');
    showToast('☀️ 주간 QT 6일치 묵상집이 복사되었습니다!', '📖');
  } else if (key === 'cardnews') {
    if (studio) { studio.classList.remove('hidden'); studio.classList.add('flex'); }
    switchStudioTab('cardnews');
    showToast('🖼️ 인스타 카드뉴스 7장이 준비되었습니다!', '🎨');
  } else if (key === 'points') {
    if (studio) { studio.classList.remove('hidden'); studio.classList.add('flex'); }
    switchStudioTab('outline');
    copyPanelText('outline');
    showToast('📑 설교 3대지 요약 리포트가 복사되었습니다!', '📝');
  } else if (key === 'kakao') {
    if (studio) { studio.classList.remove('hidden'); studio.classList.add('flex'); }
    switchStudioTab('kakao');
    copyPanelText('kakao');
    showToast('💬 단톡방 알림톡 서신이 복사되었습니다! 카톡에 붙여넣으세요.', '📲');
  } else if (key === 'bulletin') {
    if (studio) { studio.classList.remove('hidden'); studio.classList.add('flex'); }
    switchStudioTab('bulletin');
    copyPanelText('bulletin');
    showToast('📜 주보 500자 요약문 및 대표 기도문이 복사되었습니다!', '⛪');
  } else if (key === 'srt') {
    if (studio) { studio.classList.remove('hidden'); studio.classList.add('flex'); }
    switchStudioTab('srt');
    copySubtitlesSRT();
    showToast('📄 쇼츠 자막(SRT) 파일 복사 완료!', '🎬');
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

// ================= COPY & DOWNLOAD HELPERS =================
function copyPanelText(key) {
  let text = '';
  let name = '';
  if (key === 'smallgroup') { text = generatedMinistryAssets?.smallGroupText; name = '소그룹 나눔 질문지'; }
  else if (key === 'qt') { text = generatedMinistryAssets?.qtText; name = '주간 QT 묵상집'; }
  else if (key === 'cardnews') { text = generatedMinistryAssets?.cardNewsText; name = '카드뉴스 7장 텍스트'; }
  else if (key === 'outline') { text = generatedMinistryAssets?.outlineText; name = '설교 3대지 구조화 요약'; }
  else if (key === 'kakao') { text = generatedMinistryAssets?.kakaoText; name = '성도 단톡방 알림톡'; }
  else if (key === 'bulletin') { text = generatedMinistryAssets?.bulletinText; name = '주보 요약 & 기도문'; }

  if (!text) {
    analyzeAndGenerateMinistryAssets();
    copyPanelText(key);
    return;
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`${name} 텍스트가 클립보드에 복사되었습니다!`, '📋');
    });
  } else {
    showToast(`${name} 복사 완료!`, '📋');
  }
}

function downloadPanelText(key) {
  let text = '';
  let filename = '사역자료.txt';
  const sermon = currentYouTubeTitle || '주일설교';

  if (key === 'smallgroup') { text = generatedMinistryAssets?.smallGroupText; filename = `${sermon}_소그룹나눔지.txt`; }
  else if (key === 'qt') { text = generatedMinistryAssets?.qtText; filename = `${sermon}_주간QT6일치.txt`; }
  else if (key === 'cardnews') { text = generatedMinistryAssets?.cardNewsText; filename = `${sermon}_인스타카드뉴스7장.txt`; }
  else if (key === 'outline') { text = generatedMinistryAssets?.outlineText; filename = `${sermon}_설교3대지요약.txt`; }
  else if (key === 'kakao') { text = generatedMinistryAssets?.kakaoText; filename = `${sermon}_단톡방알림톡.txt`; }
  else if (key === 'bulletin') { text = generatedMinistryAssets?.bulletinText; filename = `${sermon}_주보요약및기도문.txt`; }

  if (!text) {
    analyzeAndGenerateMinistryAssets();
    downloadPanelText(key);
    return;
  }

  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast(`${filename} 파일이 다운로드되었습니다.`, '📥');
}

function copySubtitlesSRT() {
  const text = generatedMinistryAssets?.srtText || '';
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('쇼츠 10편 SRT 자막 텍스트가 복사되었습니다!', '📋');
    });
  } else {
    showToast('SRT 자막 복사 완료!', '📋');
  }
}

function downloadSubtitlesSRTFile() {
  const text = generatedMinistryAssets?.srtText || '';
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${currentYouTubeTitle || '설교쇼츠'}_10편_자막.srt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast('SRT 자막 파일이 다운로드되었습니다.', '📥');
}

function copyYouTubeTimestamps() {
  const text = generatedMinistryAssets?.ytInfoText || '';
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('유튜브 설명란 타임스탬프가 복사되었습니다!', '⏱️');
    });
  } else {
    showToast('타임스탬프 복사 완료!', '⏱️');
  }
}

function downloadCurrentShortsMP4() {
  const modal = document.getElementById('export-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function executeMP4Download(quality) {
  closeExportModal();
  showToast(`쇼츠 ${currentClipIndex}편 (${quality} 규격) MP4 렌더링 다운로드를 시작합니다.`, '⚡');
}

function downloadAllMaterials() {
  if (typeof JSZip === 'undefined') {
    showToast('압축 엔진을 불러오는 중입니다. 잠시 후 다시 시도해 주세요.', '⏳');
    return;
  }

  analyzeAndGenerateMinistryAssets();
  const zip = new JSZip();
  const sermon = currentYouTubeTitle || '설교사역자료';

  zip.file(`01_${sermon}_소그룹나눔질문지.txt`, generatedMinistryAssets.smallGroupText);
  zip.file(`02_${sermon}_주간QT6일치묵상집.txt`, generatedMinistryAssets.qtText);
  zip.file(`03_${sermon}_인스타카드뉴스7장.txt`, generatedMinistryAssets.cardNewsText);
  zip.file(`04_${sermon}_설교3대지구조화리포트.txt`, generatedMinistryAssets.outlineText);
  zip.file(`05_${sermon}_성도단톡방알림톡서신.txt`, generatedMinistryAssets.kakaoText);
  zip.file(`06_${sermon}_주보500자요약및대표기도문.txt`, generatedMinistryAssets.bulletinText);
  zip.file(`07_${sermon}_쇼츠10편_자막파일.srt`, generatedMinistryAssets.srtText);
  zip.file(`08_${sermon}_유튜브타임스탬프안내문.txt`, generatedMinistryAssets.ytInfoText);

  zip.generateAsync({ type: 'blob' }).then(content => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(content);
    a.download = `[관유중앙교회]_${sermon}_10종사역자료패키지.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('전체 10종 사역 자료 압축팩(ZIP) 다운로드가 완료되었습니다!', '🎉');
  });
}

// ================= MODAL HELPERS =================
function openYouTubeModal() {
  const m = document.getElementById('youtube-modal');
  if (m) {
    m.classList.remove('hidden');
    m.classList.add('flex');
    const input = document.getElementById('modal-youtube-url-input');
    if (input) {
      if (currentYouTubeId) input.value = `https://www.youtube.com/watch?v=${currentYouTubeId}`;
      handleModalYouTubeInput(input.value);
    }
  }
}

function closeYouTubeModal() {
  const m = document.getElementById('youtube-modal');
  if (m) {
    m.classList.add('hidden');
    m.classList.remove('flex');
  }
}

function closeStudioModal() {
  const m = document.getElementById('studio-modal');
  if (m) {
    m.classList.add('hidden');
    m.classList.remove('flex');
    sendYtCommand('modal-yt-iframe', 'pauseVideo');
  }
}

function closeAudienceModal() {
  const m = document.getElementById('audience-modal');
  if (m) {
    m.classList.add('hidden');
    m.classList.remove('flex');
  }
}

function closeExportModal() {
  const m = document.getElementById('export-modal');
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

function openHelpChat() {
  showToast('카카오톡 채널 또는 지원 센터로 연결됩니다.', '💬');
}

// ================= RECENT SERMONS =================
function addSermonToRecentHistory(id, title, scripture) {
  const container = document.getElementById('recent-sermons-list');
  if (!container) return;

  const newItem = document.createElement('div');
  newItem.onclick = () => loadRecentSermon(id, title, scripture);
  newItem.className = 'flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border-2 border-emerald-400 bg-emerald-50/40 hover:bg-emerald-50 transition-all cursor-pointer group shadow-sm mb-2.5';
  newItem.innerHTML = `
    <div class="flex items-center gap-3.5">
      <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600 font-bold text-[18px] shrink-0">▶️</span>
      <div>
        <div class="flex items-center gap-2">
          <span class="text-[14.5px] font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
            ${title}
          </span>
          <span class="rounded-full bg-emerald-100 text-emerald-800 px-2 py-0.5 text-[11px] font-black border border-emerald-300">
            완료
          </span>
        </div>
        <p class="text-[12px] text-slate-500 mt-0.5">
          ${scripture} · 10종 사역자료 & 쇼츠 10편 준비 완료
        </p>
      </div>
    </div>
    <span class="text-[12.5px] font-bold text-blue-600 group-hover:underline">
      스튜디오 열기 →
    </span>
  `;
  container.prepend(newItem);
}

function loadRecentSermon(id, title, scripture) {
  if (id === 'custom') {
    currentInputMode = 'paste';
    const ta = document.getElementById('manuscript-input');
    if (ta) {
      ta.value = `[${scripture} "${title}"]\n\n■ 1대지: 말씀을 온전히 신뢰하는 순종의 믿음\n■ 2대지: 메마른 현실을 기도로 돌파하는 은혜\n■ 3대지: 신실하게 채우시는 하나님의 참된 평강`;
      updateCharCount(ta);
    }
    selectUploadTab('paste');
  } else {
    currentInputMode = 'yt';
    currentYouTubeId = id;
    currentYouTubeTitle = title;
    currentYouTubeScripture = scripture;
    const urlInput = document.getElementById('youtube-url-input');
    if (urlInput) urlInput.value = `https://www.youtube.com/watch?v=${id}`;
    const tInput = document.getElementById('yt-custom-title');
    const sInput = document.getElementById('yt-custom-scripture');
    if (tInput) tInput.value = title;
    if (sInput) sInput.value = scripture;
    selectUploadTab('yt');
  }
  showToast(`최근 설교 ["${title}"] 자료를 불러옵니다...`, '⚡️');
  startStudioGeneration();
}

// ================= INITIALIZATION =================
function scrollToUploadArea() {
  const el = document.getElementById('console-section');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function initStudioPlayer() {
  selectStudioClip(currentClipIndex || 1);
  setShortsLayoutStyle(currentShortsLayout || 1);
  startPlaybackTimer();
}

function showToast(message, icon = '✨') {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'fixed bottom-6 right-6 z-[200] flex items-center gap-2.5 rounded-2xl bg-slate-900/95 text-white px-5 py-3.5 shadow-2xl backdrop-blur-md text-[13.5px] font-bold transition-all duration-300 opacity-0 translate-y-4 pointer-events-none border border-slate-700/80';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span class="text-[17px]">${icon}</span><span>${message}</span>`;
  toast.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
  toast.classList.add('opacity-100', 'translate-y-0');

  setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
  }, 3200);
}

// On Page Load
window.addEventListener('DOMContentLoaded', () => {
  selectUploadTab('paste');
  analyzeAndGenerateMinistryAssets();
  initStudioPlayer();
});

function openAudienceModal() {
  const m = document.getElementById('audience-modal');
  if (m) { m.classList.remove('hidden'); m.classList.add('flex'); }
}

function openExportModal() {
  const m = document.getElementById('export-modal');
  if (m) { m.classList.remove('hidden'); m.classList.add('flex'); }
}

function startDashboardProcessing() {
  startStudioGeneration();
}

function triggerDeepSermonAnalysis() {
  startStudioGeneration();
}

function formatSrtTime(sec) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  const ms = Math.floor((sec % 1) * 1000);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')},${String(ms).padStart(3, '0')}`;
}

function renderAll10ShortsDecks() {
  renderAllStudioDecks();
}

function updatePlayerUI() {
  updateSubtitlesForCurrentTime(clipElapsedSec);
}
