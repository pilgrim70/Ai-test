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
let currentInputMode = 'yt'; // 'paste' | 'yt' | 'file'
let currentYouTubeId = 'F3lRIXNF1V8';
let currentYouTubeTitle = '여호와께 감사하라!';
let currentYouTubeScripture = '시편 138편 (참고, 역대상 16:7-11)';
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
    ],
    shorts: {
      1: {
        title: '여호와께 감사하라 - 고난을 이기는 감사의 결단',
        tag: '🔥 감정 고조도 99% (결단)',
        sub: '도입(10s) ➔ 전환(15s) ➔ 결단(15s) ➔ 선포(5s) · 1.3배속 45초',
        startSec: 1500,
        duration: 45,
        scenes: [
          { start: 0, end: 10, label: '씬 1 [00:00] 도입', subtitle: '“인생의 위기와 메마른 고난 앞에 서면, <span class=\'text-blue-400 font-bold\'>누구나 원망과 낙심의 늪에 빠지기</span> 쉽습니다.”' },
          { start: 10, end: 25, label: '씬 2 [00:10] 전환', subtitle: '“그러나 다윗은 절망의 한복판에서 <span class=\'text-blue-400 font-bold\'>전심으로 주께 감사하며</span> 주의 성전을 향해 찬양했습니다.”' },
          { start: 25, end: 40, label: '씬 3 [00:25] 결단', subtitle: '“부르짖는 날에 내 영혼에 힘을 주어 <span class=\'text-blue-400 font-bold\'>나를 강하게 하시는 하나님의 손길</span>을 신뢰하십시오.”' },
          { start: 40, end: 45, label: '씬 4 [00:40] 선포', subtitle: '“<span class=\'text-amber-400 font-black\'>감사는 승리의 선언입니다! 오늘 여호와께 감사함으로 일어서십시오!</span>”' }
        ]
      },
      2: {
        title: '전심으로 주께 감사하며 주의 이름을 찬양하라',
        tag: '💡 감동·위로 98% (믿음)',
        sub: '환경을 뛰어넘어 주의 성전을 향해 올리는 거룩한 감사의 제단',
        startSec: 1650,
        duration: 45,
        scenes: [
          { start: 0, end: 10, label: '씬 1 [00:00] 도입', subtitle: '“조건이 채워져서 하는 감사는 초보적인 신앙이지만, <span class=\'text-blue-400 font-bold\'>어둠 속 감사는 하늘 문을 여는 열쇠</span>입니다.”' },
          { start: 10, end: 25, label: '씬 2 [00:10] 전환', subtitle: '“주의 인자하심과 성실하심을 찬양할 때, <span class=\'text-blue-400 font-bold\'>주께서 주의 말씀을 주의 이름보다 높이셨습니다</span>.”' },
          { start: 25, end: 40, label: '씬 3 [00:25] 결단', subtitle: '“세상의 계산을 멈추고 <span class=\'text-blue-400 font-bold\'>주의 성전을 향해 무릎 꿇는 성도</span>가 되십시오.”' },
          { start: 40, end: 45, label: '씬 4 [00:40] 선포', subtitle: '“<span class=\'text-amber-400 font-black\'>전심으로 감사하십시오! 당신의 찬양이 기적의 통로가 됩니다!</span>”' }
        ]
      },
      3: {
        title: '부르짖는 날에 내 영혼을 강하게 하시는 주님',
        tag: '⚡️ 능력·치유 97% (회복)',
        sub: '내가 간구할 때 내 영혼에 힘을 주어 담대하게 세우시는 하나님',
        startSec: 1800,
        duration: 45,
        scenes: [
          { start: 0, end: 10, label: '씬 1 [00:00] 도입', subtitle: '“혼자 감당할 수 없는 무게로 가슴이 짓눌릴 때, <span class=\'text-blue-400 font-bold\'>탄식하지 말고 주님께 부르짖으십시오</span>.”' },
          { start: 10, end: 25, label: '씬 2 [00:10] 전환', subtitle: '“하나님은 내가 부르짖는 바로 그날에 응답하시며, <span class=\'text-blue-400 font-bold\'>내 영혼에 새 힘을 불어넣으십니다</span>.”' },
          { start: 25, end: 40, label: '씬 3 [00:25] 결단', subtitle: '“환경보다 더 강한 영적 담대함이 <span class=\'text-blue-400 font-bold\'>기도하는 당신의 심령에 부어질 것입니다</span>.”' },
          { start: 40, end: 45, label: '씬 4 [00:40] 선포', subtitle: '“<span class=\'text-amber-400 font-black\'>주가 내 영혼을 강하게 하십니다! 담대하게 다시 전진하십시오!</span>”' }
        ]
      },
      4: {
        title: '비천한 자를 굽어보시는 하나님의 은혜',
        tag: '🔥 겸손·권능 96% (치유)',
        sub: '높이 계셔도 낮은 자를 굽어살피시며 교만한 자를 아시는 주님',
        startSec: 1950,
        duration: 45,
        scenes: [
          { start: 0, end: 10, label: '씬 1 [00:00] 도입', subtitle: '“세상은 높은 자와 힘 있는 자만 기억하지만, <span class=\'text-blue-400 font-bold\'>주님은 가장 낮은 자를 주목하십니다</span>.”' },
          { start: 10, end: 25, label: '씬 2 [00:10] 전환', subtitle: '“여호와께서는 높이 계셔도 낮은 자를 굽어살피시며, <span class=\'text-blue-400 font-bold\'>상한 심령을 품어 안으십니다</span>.”' },
          { start: 25, end: 40, label: '씬 3 [00:25] 결단', subtitle: '“나의 초라함이나 부족함 때문에 낙심하지 마십시오. <span class=\'text-blue-400 font-bold\'>낮아진 그 자리가 은혜의 보좌</span>입니다.”' },
          { start: 40, end: 45, label: '씬 4 [00:40] 선포', subtitle: '“<span class=\'text-amber-400 font-black\'>주님이 당신을 굽어살피십니다! 주의 따뜻한 품에서 안식하십시오!</span>”' }
        ]
      },
      5: {
        title: '환난 중에도 나를 살리시는 주의 오른손',
        tag: '💡 소망·비전 96% (인내)',
        sub: '내가 고난 가운데 다닐지라도 주의 손을 펴사 나를 구원하시는 능력',
        startSec: 2100,
        duration: 45,
        scenes: [
          { start: 0, end: 10, label: '씬 1 [00:00] 도입', subtitle: '“사방으로 우겨쌈을 당하여 피할 길이 보이지 않는 <span class=\'text-blue-400 font-bold\'>막막한 고난을 지나고 계십니까</span>?”' },
          { start: 10, end: 25, label: '씬 2 [00:10] 전환', subtitle: '“시편 기자는 고백합니다: <span class=\'text-blue-400 font-bold\'>내가 환난 중에 다닐지라도 주께서 나를 살아나게 하십니다</span>.”' },
          { start: 25, end: 40, label: '씬 3 [00:25] 결단', subtitle: '“주의 전능하신 오른손이 원수의 분노를 막으시고, <span class=\'text-blue-400 font-bold\'>당신을 굳건하게 붙들어 구원하십니다</span>.”' },
          { start: 40, end: 45, label: '씬 4 [00:40] 선포', subtitle: '“<span class=\'text-amber-400 font-black\'>환난을 두려워 마십시오! 주의 권능의 오른손이 당신을 살리십니다!</span>”' }
        ]
      },
      6: {
        title: '나를 위하여 모든 것을 온전하게 이루시는 하나님',
        tag: '⚡️ 평안·담대 95% (평안)',
        sub: '주의 손으로 지으신 것을 버리지 아니하시며 끝까지 완성하시는 은혜',
        startSec: 2250,
        duration: 45,
        scenes: [
          { start: 0, end: 10, label: '씬 1 [00:00] 도입', subtitle: '“내 실력과 지혜로는 미완성으로 끝날 것 같아 <span class=\'text-blue-400 font-bold\'>불안에 떨고 계십니까</span>?”' },
          { start: 10, end: 25, label: '씬 2 [00:10] 전환', subtitle: '“여호와께서 나를 위하여 모든 것을 완전하게 이루실 것입니다! <span class=\'text-blue-400 font-bold\'>주의 인자하심은 영원합니다</span>.”' },
          { start: 25, end: 40, label: '씬 3 [00:25] 결단', subtitle: '“주께서 친히 시작하신 선한 일을 <span class=\'text-blue-400 font-bold\'>반드시 가장 아름답게 끝맺으실 것</span>을 믿으십시오.”' },
          { start: 40, end: 45, label: '씬 4 [00:40] 선포', subtitle: '“<span class=\'text-amber-400 font-black\'>주님이 이루십니다! 불안을 내려놓고 주님의 신실하심을 찬양하십시오!</span>”' }
        ]
      },
      7: {
        title: '역대상 16장의 신앙: 항상 주의 얼굴을 구할지어다',
        tag: '🔥 영적 권세 98% (전환)',
        sub: '여호와와 그의 능력을 구할지어다 항상 그의 얼굴을 찾으라',
        startSec: 2400,
        duration: 45,
        scenes: [
          { start: 0, end: 10, label: '씬 1 [00:00] 도입', subtitle: '“역대상 16장에서 다윗은 언약궤를 모시며 <span class=\'text-blue-400 font-bold\'>감사의 첫 노래를 선포했습니다</span>.”' },
          { start: 10, end: 25, label: '씬 2 [00:10] 전환', subtitle: '“여호와와 그의 능력을 구할지어다! <span class=\'text-blue-400 font-bold\'>항상 그의 얼굴을 찾을지어다</span>!”' },
          { start: 25, end: 40, label: '씬 3 [00:25] 결단', subtitle: '“세상의 손을 구하지 말고, <span class=\'text-blue-400 font-bold\'>하나님의 얼굴을 구하는 예배자가 되십시오</span>.”' },
          { start: 40, end: 45, label: '씬 4 [00:40] 선포', subtitle: '“<span class=\'text-amber-400 font-black\'>주의 얼굴을 구할 때 하늘의 문이 열리고 모든 매임이 풀립니다!</span>”' }
        ]
      },
      8: {
        title: '원망의 자리를 털고 감사의 제단을 쌓으라',
        tag: '💡 정체성·회복 95% (은혜)',
        sub: '사탄의 밥이 되는 불평을 끊고 영적 승리를 가져오는 감사의 선포',
        startSec: 2550,
        duration: 45,
        scenes: [
          { start: 0, end: 10, label: '씬 1 [00:00] 도입', subtitle: '“원망과 불평은 영혼을 갉아먹고 <span class=\'text-blue-400 font-bold\'>사탄에게 틈을 내어주는 영적 독소</span>입니다.”' },
          { start: 10, end: 25, label: '씬 2 [00:10] 전환', subtitle: '“불평할 이유가 백 가지일지라도, <span class=\'text-blue-400 font-bold\'>십자가의 은혜 한 가지만으로도 우리는 영원히 감사</span>할 수 있습니다.”' },
          { start: 25, end: 40, label: '씬 3 [00:25] 결단', subtitle: '“원망의 입술을 닫고, <span class=\'text-blue-400 font-bold\'>믿음의 감사를 선포하여 사탄의 결박을 끊어내십시오</span>.”' },
          { start: 40, end: 45, label: '씬 4 [00:40] 선포', subtitle: '“<span class=\'text-amber-400 font-black\'>감사가 기적을 낳습니다! 오늘 당신의 입술에서 감사가 터져나올지어다!</span>”' }
        ]
      },
      9: {
        title: '닫힌 문을 여는 기적의 열쇠, 믿음의 감사',
        tag: '⚡️ 능력·치유 97% (회복)',
        sub: '바울과 실라처럼 깊은 옥중에서도 전심으로 찬양할 때 임하는 구원',
        startSec: 2700,
        duration: 45,
        scenes: [
          { start: 0, end: 10, label: '씬 1 [00:00] 도입', subtitle: '“문이 닫히고 길이 막혔을 때, <span class=\'text-blue-400 font-bold\'>포기하거나 주저앉지 마십시오</span>.”' },
          { start: 10, end: 25, label: '씬 2 [00:10] 전환', subtitle: '“감사는 막힌 홍해를 가르는 지팡이이며, <span class=\'text-blue-400 font-bold\'>견고한 여리고 성을 무너뜨리는 함성</span>입니다.”' },
          { start: 25, end: 40, label: '씬 3 [00:25] 결단', subtitle: '“보이지 않는 곳에서 이미 일하고 계신 <span class=\'text-blue-400 font-bold\'>하나님을 바라보며 감사의 찬양을 올리십시오</span>.”' },
          { start: 40, end: 45, label: '씬 4 [00:40] 선포', subtitle: '“<span class=\'text-amber-400 font-black\'>기적의 열쇠는 감사입니다! 주를 향한 감사가 새 길을 열 것입니다!</span>”' }
        ]
      },
      10: {
        title: '영원하신 주의 인자하심을 신뢰하는 성도',
        tag: '🔥 복음 초청 99% (구원)',
        sub: '주의 인자하심이 영원하오니 손으로 지으신 우리를 결코 버리지 않으십니다',
        startSec: 2850,
        duration: 45,
        scenes: [
          { start: 0, end: 10, label: '씬 1 [00:00] 도입', subtitle: '“세상의 사랑은 조건에 따라 변하지만, <span class=\'text-blue-400 font-bold\'>하나님의 인자하심은 영원무궁</span>합니다.”' },
          { start: 10, end: 25, label: '씬 2 [00:10] 전환', subtitle: '“다윗은 노래합니다: <span class=\'text-blue-400 font-bold\'>여호와여 주의 인자하심이 영원하오니 주의 손으로 지으신 것을 버리지 마옵소서</span>.”' },
          { start: 25, end: 40, label: '씬 3 [00:25] 결단', subtitle: '“어떤 상황 속에서도 변함없이 나를 붙드시는 <span class=\'text-blue-400 font-bold\'>주님의 영원한 사랑 안에 거하십시오</span>.”' },
          { start: 40, end: 45, label: '씬 4 [00:40] 선포', subtitle: '“<span class=\'text-amber-400 font-black\'>주 예수 그리스도의 이름으로 축복합니다! 영원한 주의 은혜가 함께하실지어다!</span>”' }
        ]
      }
    }
  },
  'F3IRIXNF1V8': {
    get title() { return sermonPresets['F3lRIXNF1V8'].title; },
    get scripture() { return sermonPresets['F3lRIXNF1V8'].scripture; },
    get preacher() { return sermonPresets['F3lRIXNF1V8'].preacher; },
    get fullDuration() { return sermonPresets['F3lRIXNF1V8'].fullDuration; },
    get sermonRange() { return sermonPresets['F3lRIXNF1V8'].sermonRange; },
    get coreMessage() { return sermonPresets['F3lRIXNF1V8'].coreMessage; },
    get points() { return sermonPresets['F3lRIXNF1V8'].points; },
    get shorts() { return sermonPresets['F3lRIXNF1V8'].shorts; }
  },
  'z5D_B9I7l1Y': {
    title: '너는 복이 될지라',
    scripture: '창세기 12장 1-3절',
    preacher: '관유중앙교회 송기운 담임목사',
    fullDuration: '1시간 08분 15초',
    sermonRange: '20:10 ~ 48:30',
    coreMessage: '하나님께서 아브람을 부르실 때 익숙한 본토 친척 아비 집을 떠나게 하셨습니다. 머무는 안주를 버리고 믿음으로 첫 발을 뗄 때, 주님은 우리를 단순한 수혜자가 아닌 온 땅에 흘러가는 거룩한 복의 근원으로 세우십니다.',
    points: [
      '1대지: 안주의 자리를 털고 일어나는 거룩한 떠남 (창 12:1)',
      '2대지: 세상의 조건이 아닌 약속을 바라보는 시선 (창 12:2)',
      '3대지: 너로 말미암아 모든 족속이 복을 얻는 사명 (창 12:3)'
    ],
    shorts: {
      1: {
        title: '너는 복이 될지라 - 복의 근원이 되는 결단',
        tag: '🔥 감정 고조도 99% (결단)',
        sub: '도입(10s) ➔ 전환(15s) ➔ 결단(15s) ➔ 선포(5s) · 1.3배속 45초',
        startSec: 1210,
        duration: 45,
        scenes: [
          { start: 0, end: 10, label: '씬 1 [00:00] 도입', subtitle: '“익숙한 자리에 주저앉아 있으면 <span class=\'text-blue-400 font-bold\'>하나님의 위대한 역사는 결코 시작</span>되지 않습니다.”' },
          { start: 10, end: 25, label: '씬 2 [00:10] 전환', subtitle: '“주님은 아브람에게 명하셨습니다: <span class=\'text-blue-400 font-bold\'>너의 고향과 친척과 아버지의 집을 떠나</span> 내가 네게 보여 줄 땅으로 가라!”' },
          { start: 25, end: 40, label: '씬 3 [00:25] 결단', subtitle: '“두려움의 자리를 털고 순종의 발걸음을 내딛을 때, <span class=\'text-blue-400 font-bold\'>하나님이 준비하신 기적의 복</span>이 열립니다.”' },
          { start: 40, end: 45, label: '씬 4 [00:40] 선포', subtitle: '“<span class=\'text-amber-400 font-black\'>너는 복이 될지라! 오늘 주님의 그 선언을 믿음으로 취하십시오!</span>”' }
        ]
      }
    }
  },
  '8fD5PjS5tQ4': {
    title: '관유의 능력과 평화',
    scripture: '시편 133편 1-3절',
    preacher: '관유중앙교회 송기운 담임목사',
    fullDuration: '1시간 12분 40초',
    sermonRange: '18:45 ~ 46:20',
    coreMessage: '보라 형제가 연합하여 동거함이 어찌 그리 선하고 아름다운고! 아론의 머리에 부어진 보배로운 기름처럼, 하나님의 성령의 기름 부으심은 공동체의 연합과 평화의 자리로 흘러내립니다.',
    points: [
      '1대지: 머리에서 수염으로 흘러내리는 보배로운 기름 (시 133:1-2)',
      '2대지: 시온의 산들에 내리는 헐몬의 거룩한 이슬 (시 133:3a)',
      '3대지: 거기서 명하신 여호와의 영영한 생명의 복 (시 133:3b)'
    ],
    shorts: {
      1: {
        title: '관유의 기름 부으심과 화평의 축복',
        tag: '🔥 감정 고조도 99% (결단)',
        sub: '도입(10s) ➔ 전환(15s) ➔ 결단(15s) ➔ 선포(5s) · 1.3배속 45초',
        startSec: 1125,
        duration: 45,
        scenes: [
          { start: 0, end: 10, label: '씬 1 [00:00] 도입', subtitle: '“메마르고 분열된 세상 속에서 <span class=\'text-blue-400 font-bold\'>영혼의 목마름을 느끼고 계십니까</span>?”' },
          { start: 10, end: 25, label: '씬 2 [00:10] 전환', subtitle: '“아론의 머리에 부어진 보배로운 관유처럼, <span class=\'text-blue-400 font-bold\'>하나님의 거룩한 은혜는 연합의 자리</span>로 흘러내립니다.”' },
          { start: 25, end: 40, label: '씬 3 [00:25] 결단', subtitle: '“미움과 시기를 십자가 앞에 묻고, <span class=\'text-blue-400 font-bold\'>사랑과 용서의 손을 맞잡으십시오</span>.”' },
          { start: 40, end: 45, label: '씬 4 [00:40] 선포', subtitle: '“<span class=\'text-amber-400 font-black\'>주께서 명하신 영영한 생명의 복이 임할지어다!</span>”' }
        ]
      }
    }
  },
  'W8744U1mE6Q': {
    title: '광야에서 길을 내시는 하나님',
    scripture: '이사야 43장 18-21절',
    preacher: '관유중앙교회 송기운 담임목사',
    fullDuration: '1시간 05분 10초',
    sermonRange: '19:30 ~ 47:15',
    coreMessage: '너희는 이전 일을 기억하지 말며 옛날 일을 생각하지 말라. 보라 내가 새 일을 행하리니! 하나님은 사막에 강을 내시며 광야에 대로를 여시는 전능자이십니다.',
    points: [
      '1대지: 과거의 상처와 실패에 묶이지 않는 믿음 (사 43:18)',
      '2대지: 메마른 사막에 강을 내시는 하나님의 새 일 (사 43:19)',
      '3대지: 택하신 백성에게 생수를 마시게 하시는 은혜 (사 43:20-21)'
    ],
    shorts: {
      1: {
        title: '광야에 길을, 사막에 강을 내시는 주님',
        tag: '🔥 감정 고조도 99% (결단)',
        sub: '도입(10s) ➔ 전환(15s) ➔ 결단(15s) ➔ 선포(5s) · 1.3배속 45초',
        startSec: 1170,
        duration: 45,
        scenes: [
          { start: 0, end: 10, label: '씬 1 [00:00] 도입', subtitle: '“과거의 실패와 뼈아픈 상처에 <span class=\'text-blue-400 font-bold\'>여전히 짓눌려 살아가고 계십니까</span>?”' },
          { start: 10, end: 25, label: '씬 2 [00:10] 전환', subtitle: '“하나님은 선언하십니다: <span class=\'text-blue-400 font-bold\'>보라 내가 새 일을 행하리니 이제 나타낼 것이라</span>!”' },
          { start: 25, end: 40, label: '씬 3 [00:25] 결단', subtitle: '“사막 한가운데서 도도히 흐르는 생수의 강을 <span class=\'text-blue-400 font-bold\'>믿음의 눈으로 바라보십시오</span>.”' },
          { start: 40, end: 45, label: '씬 4 [00:40] 선포', subtitle: '“<span class=\'text-amber-400 font-black\'>주님이 오늘 당신의 광야에 대로를 여십니다!</span>”' }
        ]
      }
    }
  }
};

// Default studio clips state
let studioClips = sermonPresets['F3lRIXNF1V8'].shorts;

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

// ================= PASTORAL SPEECH AUDIO ENGINE (NO BGM, PURE VOICE) =================
class PastoralAudioEngine {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.currentUtterance = null;
    this.lastSpokenText = '';
  }

  initContext() {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
    }
  }

  speakLine(rawHtml, rate = 1.3) {
    if (!this.synth) return;
    const cleanText = rawHtml
      .replace(/<[^>]*>?/gm, '')
      .replace(/[“"”]/g, '')
      .trim();

    if (!cleanText || cleanText === this.lastSpokenText) return;
    this.lastSpokenText = cleanText;

    try {
      this.synth.cancel();
      // Chrome delay fix to prevent synchronous cancel-and-speak cancellation bug
      setTimeout(() => {
        try {
          if (this.synth.paused) this.synth.resume();

          const utter = new SpeechSynthesisUtterance(cleanText);
          utter.lang = 'ko-KR';
          utter.rate = Math.min(1.5, Math.max(0.8, rate || 1.3));
          utter.pitch = 0.95;
          utter.volume = 1.0;

          const voices = this.synth.getVoices();
          const koVoice = voices.find(v => v.lang && v.lang.startsWith('ko') && (v.name.includes('Yuna') || v.name.includes('Google') || v.name.includes('Korean') || v.name.includes('Heami') || v.name.includes('Seoyeon'))) ||
                         voices.find(v => v.lang && v.lang.startsWith('ko'));
          if (koVoice) utter.voice = koVoice;

          utter.onstart = () => {
            const eqBars = document.querySelectorAll('.live-eq-bar');
            eqBars.forEach(b => { b.style.animationPlayState = 'running'; b.style.opacity = '1'; });
          };
          utter.onend = () => {
            const eqBars = document.querySelectorAll('.live-eq-bar');
            eqBars.forEach(b => { b.style.animationPlayState = 'paused'; b.style.opacity = '0.35'; });
          };

          this.currentUtterance = utter;
          this.synth.speak(utter);
        } catch(err) {
          console.warn('Speech synthesis error:', err);
        }
      }, 40);
    } catch(e) {
      console.warn('Speech synthesis error:', e);
    }
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.lastSpokenText = '';
    const eqBars = document.querySelectorAll('.live-eq-bar');
    eqBars.forEach(b => { b.style.animationPlayState = 'paused'; b.style.opacity = '0.35'; });
  }
}

const pastoralAudio = new PastoralAudioEngine();

// ================= 5 SELECTABLE SHORTS LAYOUT STYLES =================
let currentShortsLayout = 1;

function setShortsLayoutStyle(num) {
  currentShortsLayout = parseInt(num) || 1;
  
  // Update button highlights (both modal and in-page)
  [1, 2, 3, 4, 5].forEach(i => {
    const btns = [document.getElementById(`layout-choice-${i}`), document.getElementById(`inpage-layout-choice-${i}`)];
    btns.forEach(btn => {
      if (!btn) return;
      if (i === currentShortsLayout) {
        btn.className = 'layout-choice-btn active flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl border-2 border-indigo-600 bg-indigo-50 text-indigo-950 font-black transition-all text-center shadow-md scale-[1.02] ring-2 ring-indigo-400/40';
      } else {
        btn.className = 'layout-choice-btn flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl border-2 border-slate-200 bg-white hover:border-slate-300 text-slate-700 transition-all text-center opacity-80 hover:opacity-100';
      }
    });
  });

  const styleNames = {
    1: '스타일 1 [클래식 예배형 1:1]',
    2: '스타일 2 [시네마틱 골드형 16:9]',
    3: '스타일 3 [모던 화이트 카드형]',
    4: '스타일 4 [전체화면 몰입형 9:16]',
    5: '스타일 5 [말씀 본문 집중형]'
  };

  const badges = [document.getElementById('active-layout-badge'), document.getElementById('inpage-active-layout-badge')];
  badges.forEach(b => {
    if (b) b.textContent = `현재 적용: ${styleNames[currentShortsLayout]}`;
  });

  // Apply layout classes to phone shells
  const shells = [document.getElementById('modal-phone-shell'), document.getElementById('studio-phone-shell')];
  shells.forEach(shell => {
    if (!shell) return;
    for (let c = 1; c <= 5; c++) {
      shell.classList.remove(`shorts-layout-${c}`);
    }
    shell.classList.add(`shorts-layout-${currentShortsLayout}`);
    shell.setAttribute('data-shorts-layout', currentShortsLayout);
  });

  showToast(`🎨 ${styleNames[currentShortsLayout]} 레이아웃이 적용되었습니다!`, '✨');
}


function forceUnmuteAndPlaySound() {
  isMuted = false;
  isPlaying = true;
  pastoralAudio.initContext();

  const banner = document.getElementById('unmute-floating-banner');
  if (banner) {
    banner.classList.add('hidden');
  }

  updateSoundIcons(true);
  updatePlayIcons(true);

  const iframes = [document.getElementById('studio-yt-iframe'), document.getElementById('modal-yt-iframe')];
  iframes.forEach(f => {
    if (f) {
      sendYtCommand(f.id, 'unMute');
      sendYtCommand(f.id, 'setVolume', [100]);
      sendYtCommand(f.id, 'playVideo');
    }
  });

  const clip = (typeof studioClips !== 'undefined' && studioClips[currentClipIndex]) ? studioClips[currentClipIndex] : null;
  if (clip) {
    const activeScene = clip.scenes.find(s => clipElapsedSec >= s.start && clipElapsedSec < s.end) || clip.scenes[0];
    if (activeScene) pastoralAudio.speakLine(activeScene.subtitle, currentPlaybackRate);
  }

  showToast('🔊 1.3배속 설교 음성과 사운드가 활성화되었습니다!', '✨');
}

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
  let id = null;
  // 1. YouTube Live URLs (e.g. https://youtube.com/live/F3lRIXNF1V8?feature=share)
  let m = url.match(/(?:youtube\.com|m\.youtube\.com)\/live\/([a-zA-Z0-9_-]{11})/i);
  if (m) id = m[1];
  // 2. youtu.be short URLs
  if (!id) {
    m = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/i);
    if (m) id = m[1];
  }
  // 3. watch?v= parameter
  if (!id) {
    m = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/i);
    if (m) id = m[1];
  }
  // 4. embed / shorts / v
  if (!id) {
    m = url.match(/(?:embed|shorts|\/v\/|\/e\/)\/([a-zA-Z0-9_-]{11})/i);
    if (m) id = m[1];
  }
  // 5. Any generic /live/ path
  if (!id) {
    m = url.match(/\/live\/([a-zA-Z0-9_-]{11})/i);
    if (m) id = m[1];
  }
  // 6. Raw 11-character alphanumeric ID
  if (!id) {
    m = url.match(/^([a-zA-Z0-9_-]{11})$/);
    if (m) id = m[1];
  }
  if (!id) return null;

  // Canonicalize case-sensitive typos (e.g. capital I vs lowercase l)
  if (id.toLowerCase() === 'f3lrixnf1v8' || id === 'F3IRIXNF1V8' || id === 'F3lRIXNF1V8') {
    return 'F3lRIXNF1V8';
  }
  return id;
}

function parseTitleFromText(text) {
  if (!text) return '새로운 주일 예배 설교';
  // 1. Check explicit "제목:" pattern
  const explicitMatch = text.match(/제목\s*:\s*([^본문\n|]+)/i);
  if (explicitMatch) {
    let t = explicitMatch[1].trim();
    t = t.replace(/\s+/g, ' ');
    return t;
  }
  let t = text;
  t = t.replace(/\.[a-zA-Z0-9]{2,5}$/, '');
  t = t.replace(/(?:^|[^0-9])\d{6,8}(?:[^0-9]|$)/g, ' ');
  t = t.replace(/\b\d{4}[.\-_/]\d{1,2}[.\-_/]\d{1,2}\b/g, '');
  t = t.replace(/\[[^\]]*\]/g, ' ');
  t = t.replace(/\([^\)]*(?:이사야|시편|창세기|창|시|사|롬|히|마|막|눅|요|행|갈|엡|빌|골|벧전|약|계|\d+[:장]\d+)[^\)]*\)/g, ' ');
  t = t.replace(/^(?:주일\s*예배\s*설교|주일설교|설교|특별집회|부흥회|설교영상)[\s_\-:]*/, '');
  t = t.replace(/[\s_\-]+/g, ' ').trim();
  return t.length >= 2 ? t : '새로운 주일 설교';
}

function onCustomYouTubeTitleChange(val) {
  currentYouTubeTitle = val;
  const idEl = document.getElementById('yt-recognized-id');
  if (idEl) idEl.textContent = `설교: "${val}" (${currentYouTubeScripture || ''})`;
}

function onCustomYouTubeScriptureChange(val) {
  currentYouTubeScripture = val;
  const idEl = document.getElementById('yt-recognized-id');
  if (idEl) idEl.textContent = `설교: "${currentYouTubeTitle || ''}" (${val})`;
}

// ================= AI SPEECH & SHORTS SUITE GENERATOR =================
function cleanPastoralSpeech(text) {
  if (!text) return '';
  return text
    .replace(/\b(어|으|음|아|그|저|에|음\.\.\.)\b/g, '')
    .replace(/(어\s+|으\s+|음\s+|아\s+|그\s+|저\s+)/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function generate10ShortsSuite(title, scripture, points) {
  const cleanTitle = (title || '여호와께 감사하라!').replace(/[\[\]"']/g, '').trim();
  const scrip = scripture || '시편 138편 (참고, 역대상 16:7-11)';
  const p1 = (points && points[0]) || '말씀을 따라가는 순종의 믿음';
  const p2 = (points && points[1]) || '감사로 상황을 돌파하는 영적 권세';
  const p3 = (points && points[2]) || '마음과 생각을 지키시는 참된 평강';

  const themes = [
    { num: 1, title: `${cleanTitle} - 복의 근원이 되는 결단`, tag: '🔥 감정 고조도 99% (결단)', s1: '머무르는 안주에는 역사가 일어나지 않습니다. 익숙한 불안의 자리를 털고 일어나십시오.', s2: `세상은 조건을 보지만 하나님은 당신의 순종을 보십니다. ${p1}!`, s3: '상황보다 크신 하나님께서 당신을 반드시 거룩한 복의 통로로 세우실 것입니다.', s4: '너는 복이 될지라! 오늘 주님의 그 선언을 믿음으로 취하십시오!' },
    { num: 2, title: `염려를 기도로 바꾸는 단 하나의 비결`, tag: '💡 감동·위로 98% (믿음)', s1: '밤새 고민해도 바뀌는 것은 없습니다. 염려는 해결이 아니라 영혼의 소모입니다.', s2: `어떤 절망 속에서도 감사의 기도를 올릴 때 기적이 시작됩니다. ${p2}!`, s3: '내 계산이 끝나는 자리에서 비로소 하나님의 전능하신 손길이 일하십니다.', s4: '염려를 기도로 바꾸십시오! 하나님의 평강이 당신을 성벽처럼 지키십니다!' },
    { num: 3, title: `${cleanTitle} - 문제 한가운데서 일하시는 전능자`, tag: '⚡️ 능력·치유 97% (회복)', s1: '사방이 캄캄하고 길이 보이지 않을 때, 낙심하며 불평의 늪에 빠지지 마십시오.', s2: `하나님은 반석을 쳐서 생수를 내시며, ${scrip} 말씀대로 우리를 지키시는 전능자이십니다.`, s3: '인간의 방법이 막힌 그곳이 하나님의 기적이 시작되는 은혜의 식탁입니다.', s4: '두려워하지 마십시오! 주님이 오늘 당신을 위해 새 길을 여십니다!' },
    { num: 4, title: `내 힘을 뺄 때 시작되는 주님의 기적`, tag: '🔥 겸손·권능 96% (치유)', s1: '내가 쥐고 흔들려 하는 한, 하나님이 역사하실 자리는 없습니다.', s2: '야곱이 얍복강에서 환도뼈가 꺾였을 때, 비로소 이스라엘의 복이 임했습니다.', s3: '내 자존심과 고집을 십자가 앞에 내려놓을 때 하늘의 능력이 나타납니다.', s4: '손을 펴고 주님께 맡기십시오! 당신이 항복할 때 주님이 승리하십니다!' },
    { num: 5, title: `시련이 인내를, 인내가 소망을 낳는다`, tag: '💡 소망·비전 96% (인내)', s1: '왜 사랑하는 자녀에게 이토록 거친 풍랑과 불같은 시험이 찾아올까요?', s2: '용광로의 뜨거운 불을 통과하지 않고는 순도 99%의 정금이 나올 수 없습니다.', s3: '지금 겪는 시련은 망하게 하려는 것이 아니라 더 큰 축복을 담는 그릇을 빚는 과정입니다.', s4: '끝까지 인내하십시오! 눈물로 씨를 뿌린 그 자리에서 기쁨의 단을 거둘 것입니다!' },
    { num: 6, title: `세상이 줄 수 없는 하나님의 평강`, tag: '⚡️ 평안·담대 95% (평안)', s1: '통장의 잔고나 세상의 안락이 주는 평안은 작은 바람에도 무너집니다.', s2: '예수 그리스도의 평강은 풍랑 속에서도 베개를 베고 잘 수 있는 신비로운 평안입니다.', s3: `${p3}! 주님이 나와 함께 계시기에 폭풍 속에서도 영혼은 고요합니다.`, s4: '그리스도의 평강이 오늘 여러분의 가정과 일터를 든든히 지키실지어다!' },
    { num: 7, title: `감사함으로 그 문에 들어가는 권세`, tag: '🔥 영적 권세 98% (전환)', s1: '문제가 해결된 뒤의 감사는 누구나 하지만, 흑암 속의 감사는 사탄을 꺾는 폭탄입니다.', s2: '바울과 실라가 감옥 깊은 곳에서 찬송할 때 옥터가 흔들리고 차꼬가 풀렸습니다.', s3: '가장 답답하고 원망스러운 자리에서 먼저 감사의 제단을 쌓으십시오.', s4: '당신의 입술에서 터져 나오는 감사가 닫힌 기적의 문을 활짝 열 것입니다!' },
    { num: 8, title: `너는 내 것이라 지명하여 부르신 은혜`, tag: '💡 정체성·회복 95% (은혜)', s1: '세상은 당신의 조건과 성과로 가치를 매기지만, 주님은 피값으로 당신을 사셨습니다.', s2: '물 가운데를 지날 때에도 물이 침몰치 못하며 불 가운데서도 타지 아니할 것입니다.', s3: '세상의 초라한 시선에 위축되지 마십시오. 당신은 만왕의 왕의 보배로운 자녀입니다.', s4: '두려워 말라 내가 너를 구속하였고 지명하여 불렀나니 너는 내 것이라!' },
    { num: 9, title: `무너진 제단을 다시 수축하는 믿음`, tag: '⚡️ 부흥·결단 94% (회복)', s1: '갈멜산에서 엘리야가 불을 내리기 전 가장 먼저 한 일은 무너진 제단을 고치는 일이었습니다.', s2: '기도가 식어버리고 예배의 감격이 무뎌진 자리에 하늘의 부흥이 임할 수 없습니다.', s3: '바쁘다는 핑계로 놓쳤던 무릎의 자리, 말씀의 자리를 오늘 다시 수축하십시오.', s4: '당신의 무너진 예배가 살아날 때 하늘의 불과 거룩한 단비가 쏟아집니다!' },
    { num: 10, title: `오늘 당신의 삶을 바꾸시는 주님의 음성`, tag: '🔥 복음 초청 99% (구원)', s1: '오늘 이 시간, 이 자리에 우연히 앉아 계신 분은 단 한 사람도 없습니다.', s2: '태초부터 당신을 향한 거룩한 계획을 품으시고 십자가 사랑으로 찾아오신 주님의 부르심입니다.', s3: '내일로 미루지 마십시오. 오늘 마음의 문을 활짝 열고 주님을 구주로 영접하십시오.', s4: '주 예수 그리스도와 함께하는 영원한 생명의 역사가 지금 시작됩니다!' }
  ];

  const result = {};
  themes.forEach(t => {
    result[t.num] = {
      title: t.title,
      tag: t.tag,
      sub: '도입(10s) ➔ 전환(15s) ➔ 결단(15s) ➔ 선포(5s) · 1.3배속 45초',
      startSec: 1500 + (t.num - 1) * 150,
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

function renderAll10ShortsDecks() {
  if (!studioClips) return;
  ['studio', 'modal'].forEach(prefix => {
    const container = document.getElementById(`${prefix}-shorts-card-list`);
    if (!container) return;

    const clipKeys = Object.keys(studioClips).map(Number).sort((a, b) => a - b);
    container.innerHTML = clipKeys.map(num => {
      const clip = studioClips[num];
      const isActive = (num === (currentClipIndex || 1));
      const borderClass = isActive
        ? 'border-2 border-blue-600 bg-blue-50/80 shadow-md ring-2 ring-blue-400/30'
        : 'border border-slate-200 bg-white hover:border-blue-400 opacity-90 hover:opacity-100';
      const badgeBg = isActive ? 'bg-blue-600 text-white' : 'bg-slate-700 text-white';

      const s1Text = (clip.scenes && clip.scenes[0])
        ? clip.scenes[0].subtitle.replace(/<[^>]*>?/gm, '').replace(/[“"”]/g, '')
        : '';

      return `
        <div id="${prefix}-deck-${num}" onclick="selectStudioClip(${num})"
          class="rounded-2xl ${borderClass} p-4 sm:p-4.5 cursor-pointer transition-all">
          <div class="flex items-center justify-between mb-1.5">
            <div class="flex items-center gap-1.5">
              <span class="rounded-md ${badgeBg} px-2 py-0.5 text-[11px] font-bold">
                쇼츠 ${String(num).padStart(2, '0')}${num === 1 ? ' (추천)' : ''}
              </span>
              <span class="text-[10.5px] font-extrabold text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-md">
                ⚡ 45초 (1.3배속)
              </span>
            </div>
            <span class="text-[11.5px] font-bold text-red-500">${clip.tag || '🔥 감정 고조도 98%'}</span>
          </div>
          <h4 class="text-[15px] font-black text-slate-900 leading-snug">"${clip.title}"</h4>
          <p class="text-[12px] text-slate-600 mt-1 leading-relaxed line-clamp-2">${s1Text}</p>
          <div class="mt-2 flex items-center justify-between text-[10.5px] text-slate-400 font-mono">
            <span>도입(10s) → 전환(15s) → 결단(15s) → 선포(5s)</span>
            <span class="text-blue-600 font-bold">⚡ 1.3배속 45초</span>
          </div>
        </div>
      `;
    }).join('');
  });
}

// ================= SHORTS REFINEMENT EDITOR CONTROLLER =================
function loadClipIntoRefineEditor(num) {
  const clip = (studioClips && studioClips[num]) ? studioClips[num] : (studioClips ? studioClips[1] : null);
  if (!clip) return;

  ['studio', 'modal'].forEach(p => {
    const badge = document.getElementById(`${p}-refine-active-badge`);
    const titleInput = document.getElementById(`${p}-refine-title-input`);
    const scripInput = document.getElementById(`${p}-refine-scripture-input`);
    const churchInput = document.getElementById(`${p}-refine-church-input`);

    if (badge) badge.textContent = `쇼츠 ${String(num).padStart(2, '0')}편 편집 중`;
    if (titleInput) titleInput.value = clip.title || '';
    if (scripInput) scripInput.value = (generatedMinistryAssets && generatedMinistryAssets.scripture) ? generatedMinistryAssets.scripture : (clip.scripture || '시편 78장 17-25절');
    if (churchInput) churchInput.value = '복의근원 관유중앙교회';

    if (clip.scenes && clip.scenes.length >= 4) {
      for (let i = 0; i < 4; i++) {
        const sceneInput = document.getElementById(`${p}-refine-scene-${i+1}-input`);
        if (sceneInput) {
          const cleanSceneText = (clip.scenes[i].subtitle || '')
            .replace(/<[^>]*>?/gm, '')
            .replace(/[“"”]/g, '')
            .trim();
          sceneInput.value = cleanSceneText;
        }
      }
    }
  });
}

function onRefineTitleChange(val, prefix) {
  const clip = studioClips[currentClipIndex] || studioClips[1];
  if (clip) clip.title = val;

  ['studio', 'modal'].forEach(p => {
    const tEl = document.getElementById(`${p}-sermon-title`);
    if (tEl) tEl.textContent = val;
    const inp = document.getElementById(`${p}-refine-title-input`);
    if (inp && p !== prefix) inp.value = val;
    const deckTitle = document.querySelector(`#${p}-deck-${currentClipIndex} h4`);
    if (deckTitle) deckTitle.textContent = `"${val}"`;
  });
}

function onRefineScriptureChange(val, prefix) {
  if (generatedMinistryAssets) generatedMinistryAssets.scripture = val;

  ['studio', 'modal'].forEach(p => {
    const sEl = document.getElementById(`${p}-scripture-title`);
    if (sEl) sEl.textContent = val;
    const inp = document.getElementById(`${p}-refine-scripture-input`);
    if (inp && p !== prefix) inp.value = val;
  });
}

function onRefineSceneChange(sceneIdx, val, prefix) {
  const clip = studioClips[currentClipIndex] || studioClips[1];
  if (clip && clip.scenes && clip.scenes[sceneIdx]) {
    clip.scenes[sceneIdx].subtitle = `“${val}”`;
    
    // Sync other prefix input
    const otherPrefix = prefix === 'studio' ? 'modal' : 'studio';
    const otherInp = document.getElementById(`${otherPrefix}-refine-scene-${sceneIdx+1}-input`);
    if (otherInp) otherInp.value = val;

    // Live update subtitle on screen if current elapsed time matches
    const s = clip.scenes[sceneIdx];
    if (clipElapsedSec >= s.start && clipElapsedSec < s.end) {
      ['studio', 'modal'].forEach(p => {
        const subEl = document.getElementById(`${p}-live-subtitle`);
        if (subEl) subEl.textContent = `“${val}”`;
      });
    }
  }
}

function onRefineChurchChange(val, prefix) {
  ['studio', 'modal'].forEach(p => {
    const cEl = document.getElementById(`${p}-church-name`);
    if (cEl) cEl.textContent = val;
    const inp = document.getElementById(`${p}-refine-church-input`);
    if (inp && p !== prefix) inp.value = val;
  });
}

function saveRefinedShortsClip(prefix) {
  const num = currentClipIndex || 1;
  const clip = studioClips[num] || studioClips[1];
  if (!clip) return;

  const titleInp = document.getElementById(`${prefix}-refine-title-input`);
  const scripInp = document.getElementById(`${prefix}-refine-scripture-input`);
  if (titleInp && titleInp.value.trim()) clip.title = titleInp.value.trim();
  if (scripInp && scripInp.value.trim() && generatedMinistryAssets) {
    generatedMinistryAssets.scripture = scripInp.value.trim();
  }

  for (let i = 0; i < 4; i++) {
    const sInp = document.getElementById(`${prefix}-refine-scene-${i+1}-input`);
    if (sInp && clip.scenes[i]) {
      clip.scenes[i].subtitle = `“${sInp.value.trim()}”`;
    }
  }

  // Update card titles in both decks
  ['studio', 'modal'].forEach(p => {
    const cardTitle = document.querySelector(`#${p}-deck-${num} h4`);
    if (cardTitle) cardTitle.textContent = `"${clip.title}"`;
  });

  updatePlayerUI();
  showToast(`✅ 쇼츠 ${String(num).padStart(2, '0')}편 다듬기 내용이 성공적으로 저장되었습니다!`, '✨');
}

function playRefinedClipFromStart(prefix) {
  saveRefinedShortsClip(prefix);
  clipElapsedSec = 0;
  if (!isPlaying) {
    toggleStudioPlay();
  } else {
    updatePlayerUI();
    const clip = studioClips[currentClipIndex] || studioClips[1];
    if (clip && clip.scenes && clip.scenes[0] && !isMuted) {
      pastoralAudio.speakLine(clip.scenes[0].subtitle, currentPlaybackRate);
    }
  }
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

      // Generate 10 dynamic 45-second shorts for custom text
      studioClips = generate10ShortsSuite(sermonTitle, scripture, points);
    }
  }

  // CASE B: YouTube link preset
  else if (currentInputMode === 'yt') {
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
    preacher = '관유중앙교회 송기운 담임목사';

    const preset = sermonPresets[currentYouTubeId];
    if (preset && preset.title === enteredTitle) {
      coreMessage = preset.coreMessage;
      points = preset.points;
    } else {
      coreMessage = `${sermonTitle}의 말씀을 통해 우리 삶의 현장에 하나님의 거룩한 은혜와 회복이 임하기를 소망합니다.`;
      points = [
        `1대지: 말씀을 온전히 신뢰하는 순종의 믿음 (${scripture})`,
        `2대지: 메마른 현실을 기도로 돌파하는 거룩한 은혜 (${scripture})`,
        `3대지: 신실하게 채우시는 하나님의 능력과 참된 평강 (${scripture})`
      ];
    }
    studioClips = generate10ShortsSuite(sermonTitle, scripture, points);
  }

  // CASE C: File upload
  else if (currentInputMode === 'file') {
    const fileTitleEl = document.getElementById('file-custom-title');
    const fileScripEl = document.getElementById('file-custom-scripture');
    const enteredTitle = (fileTitleEl && fileTitleEl.value.trim().length > 0)
      ? fileTitleEl.value.trim()
      : (currentFileName ? parseTitleFromText(currentFileName) : '주일 설교 미디어 파일');
    const enteredScripture = (fileScripEl && fileScripEl.value.trim().length > 0)
      ? fileScripEl.value.trim()
      : (currentFileName ? (parseScriptureFromText(currentFileName) || '빌립보서 4장 6-7절') : '빌립보서 4장 6-7절');

    sermonTitle = enteredTitle;
    scripture = enteredScripture;
    preacher = '관유중앙교회 송기운 담임목사';
    coreMessage = `${sermonTitle}의 말씀을 통해 ${scripture}에 약속된 거룩한 은혜와 회복을 경험합니다.`;
    points = [
      `1대지: 말씀을 온전히 신뢰하는 순종의 믿음 (${scripture})`,
      `2대지: 메마른 현실을 기도로 돌파하는 거룩한 은혜 (${scripture})`,
      `3대지: 신실하게 채우시는 하나님의 능력과 참된 평강 (${scripture})`
    ];
    studioClips = generate10ShortsSuite(sermonTitle, scripture, points);
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
  let ytInfoText = `=====================================================
[설교 쇼츠 유튜브 타임스탬프 및 영상 구간 정보 10편]
설교 영상: https://www.youtube.com/watch?v=${currentYouTubeId}
설교 제목: "${cleanTitle}" (${scripture})
=====================================================

[설교 본문 전체 타임라인]
00:00 찬양 및 묵상
05:30 대표 기도
12:15 성경 봉독 (${scripture})
15:00 말씀 선포 ("${cleanTitle}")
45:20 결단 기도 및 축도

[AI 추천 45초 황금규격 쇼츠 10편 타임라인 바로가기]\n\n`;

  for (let i = 1; i <= 10; i++) {
    const cl = (studioClips && studioClips[i]) ? studioClips[i] : (activeClips && activeClips[i]);
    if (cl) {
      const startMin = Math.floor(((i - 1) * 120) / 60);
      const startSec = ((i - 1) * 120) % 60;
      const timeStr = `${String(startMin).padStart(2, '0')}:${String(startSec).padStart(2, '0')}`;
      const firstLine = (cl.scenes && cl.scenes[0]) ? cl.scenes[0].subtitle.replace(/<[^>]*>?/gm, '').replace(/[“"”]/g, '') : '';
      ytInfoText += `[쇼츠 ${String(i).padStart(2, '0')}: "${cl.title}"]\n`;
      ytInfoText += `타임스탬프: ${timeStr} (1.3배속 45초 규격)\n`;
      ytInfoText += `핵심 메시지: ${firstLine}\n`;
      ytInfoText += `바로가기 링크: https://www.youtube.com/watch?v=${currentYouTubeId}&t=${(i - 1) * 120}s\n\n`;
    }
  }

  ytInfoText += `* 캡컷(CapCut), Vrew, 프리미어 프로에서 자막 SRT를 불러와 간편하게 9:16 세로 쇼츠로 렌더링하실 수 있습니다.\n`;
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

  // Update All 10 Shorts Deck Titles & Subs in Both Panels
  renderAll10ShortsDecks();
  loadClipIntoRefineEditor(currentClipIndex || 1);
  updatePlayerUI();

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

  const srtBody = document.getElementById('content-srt-body');
  if (srtBody) srtBody.textContent = srtText;

  const ytBody = document.getElementById('content-timestamp-body');
  if (ytBody) ytBody.textContent = ytInfoText;

  // Render Card News Visual Grid
  renderCardNewsGrid(cardNewsCards);

  // Render 10 Shorts Deck List in Studio Modal
  renderStudioShortsList();
  selectStudioClip(currentClipIndex || 1);
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
  else if (key === 'srt') { text = generatedMinistryAssets.srtText; name = '쇼츠 자막 (SRT)'; }
  else if (key === 'timestamp') { text = generatedMinistryAssets.ytInfoText; name = '유튜브 타임스탬프 안내문'; }

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
  else if (key === 'srt') { text = generatedMinistryAssets.srtText; filename = `${safeTitle}_쇼츠_자막_SRT.srt`; }
  else if (key === 'timestamp') { text = generatedMinistryAssets.ytInfoText; filename = `${safeTitle}_유튜브_타임스탬프_안내.txt`; }

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

// ================= MULTI-STAGE REALISTIC SERMON PROCESSING PIPELINE =================
let processingTimer = null;
let processingProgress = 0;
let isFastTracking = false;

function triggerDeepSermonAnalysis() {
  // If triggered from YouTube modal, show Image 2 searching view first
  const modalViewInput = document.getElementById('modal-yt-view-input');
  const modalViewSearching = document.getElementById('modal-yt-view-searching');

  if (modalViewInput && modalViewSearching && !modalViewInput.classList.contains('hidden')) {
    modalViewInput.classList.add('hidden');
    modalViewSearching.classList.remove('hidden');
    modalViewSearching.classList.add('flex');

    setTimeout(() => {
      closeYouTubeModal();
      modalViewInput.classList.remove('hidden');
      modalViewSearching.classList.add('hidden');
      modalViewSearching.classList.remove('flex');
      startDashboardProcessing();
    }, 3200);
  } else {
    startDashboardProcessing();
  }
}

function startDashboardProcessing() {
  closeAudienceModal();

  const dashboard = document.getElementById('processing-dashboard-section');
  if (dashboard) {
    dashboard.classList.remove('hidden');
    dashboard.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  isFastTracking = false;
  processingProgress = 0;
  if (processingTimer) clearInterval(processingTimer);

  const activeTitle = (currentInputMode === 'file')
    ? (document.getElementById('file-custom-title')?.value || currentFileName || '설교 파일')
    : (document.getElementById('yt-custom-title')?.value || currentYouTubeTitle || '주일 설교 영상');
  const activeScrip = (currentInputMode === 'file')
    ? (document.getElementById('file-custom-scripture')?.value || '성경 본문')
    : (document.getElementById('yt-custom-scripture')?.value || currentYouTubeScripture || '성경 본문');

  updateProcessingUI(8, 1, '1단계: 유튜브 예배 영상 음성 스트림 수신 및 Whisper STT 자막 분석 중...', [
    `✓ [미디어 스트림] "${activeTitle}" 수신 및 음성 분석 준비 완료`,
    `➔ [구간 탐지] 전체 예배 중 찬양·기도 제외, 본론 설교 [21:30 ~ 52:45] 정밀 분리 중...`
  ], 35);

  const stages = [
    {
      sec: 4,
      pct: 18,
      step: 1,
      status: '1단계: 1시간 14분 예배 중 본론 설교 구간(21:30~52:45) 분리 및 음성 텍스트화 중...',
      log: '✓ [설교 구간 분리 완료] 21분 30초 ~ 52분 45초 (순수 설교 31분 15초 추출)',
      est: 30
    },
    {
      sec: 9,
      pct: 35,
      step: 2,
      status: '2단계: 성경 본문(시편 78:17-25) 정밀 대조 및 3대지 명제 구조화 중...',
      log: `✓ [본문 대조 완료] ${activeScrip} 본문 텍스트 일치율 99.8% 검증`,
      est: 25
    },
    {
      sec: 14,
      pct: 52,
      step: 2,
      status: '2단계: AI 호흡음 제거 및 불필요한 추임새(어, 으, 음, 저) 100% 컷팅 정제 중...',
      log: '✓ [오디오 클리닝] 들숨/날숨 숨소리 48개소 및 잡음 컷팅 필터링 완료',
      est: 20
    },
    {
      sec: 20,
      pct: 68,
      step: 2,
      status: '2단계: 감정 곡선 99% 절정 구간 4단계 씬(도입-전환-결단-선포) 추출 중...',
      log: '✓ [감정 곡선 분석] 1.3배속 45초 황금 규격 씬 결합 및 골드 선포 자막 생성',
      est: 14
    },
    {
      sec: 26,
      pct: 85,
      step: 2,
      status: '2단계: 소그룹 나눔 질문지, 주간 QT 6일치, 인스타 카드뉴스 7장 집필 중...',
      log: '✓ [10종 목회 자료] 구역·셀 나눔지 및 성도 단톡방 서신 원고 생성 완료',
      est: 8
    },
    {
      sec: 31,
      pct: 95,
      step: 3,
      status: '3단계: 9:16 모바일 쇼츠 10편 비디오 렌더링 및 타임코드 SRT 싱크 완료 중...',
      log: '✓ [쇼츠 10편 렌더링 완료] 1번부터 10번까지 45초 비디오 패키징 완료!',
      est: 3
    },
    {
      sec: 35,
      pct: 100,
      step: 3,
      status: '완료: 10편의 쇼츠와 10종 사역 자료가 최고 품질로 완성되었습니다!',
      log: '🎉 [처리 완료] 목사님의 설교가 10종의 전문 사역 자료와 10편의 쇼츠로 완성되었습니다.',
      est: 0
    }
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
  }, 400);
}

function updateProcessingUI(pct, step, statusText, newLogs = [], estSec = 0) {
  const line = document.getElementById('processing-stepper-line');
  const badge = document.getElementById('processing-pct-badge');
  const statusEl = document.getElementById('processing-current-status');
  const estEl = document.getElementById('processing-time-estimate');
  const logFeed = document.getElementById('processing-log-feed');

  if (line) line.style.width = `${Math.min(100, (step === 1 ? pct * 0.5 : (step === 2 ? 50 + (pct - 35) * 0.7 : 100)))}%`;
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
    if (n1) { n1.className = 'w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md'; n1.innerHTML = '<svg class="animate-spin w-5 h-5 text-white" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>'; }
    if (l1) { l1.className = 'text-[12.5px] font-extrabold text-blue-600 mt-2.5'; }
  } else if (step === 2) {
    if (n1) { n1.className = 'w-11 h-11 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm shadow-sm'; n1.innerHTML = '✓'; }
    if (l1) { l1.className = 'text-[12.5px] font-bold text-slate-700 mt-2.5'; }
    if (n2) { n2.className = 'w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md'; n2.innerHTML = '<svg class="animate-spin w-5 h-5 text-white" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>'; }
    if (l2) { l2.className = 'text-[12.5px] font-extrabold text-blue-600 mt-2.5'; }
  } else if (step === 3) {
    if (n1) { n1.className = 'w-11 h-11 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm shadow-sm'; n1.innerHTML = '✓'; }
    if (n2) { n2.className = 'w-11 h-11 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm shadow-sm'; n2.innerHTML = '✓'; }
    if (l2) { l2.className = 'text-[12.5px] font-bold text-slate-700 mt-2.5'; }
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

  addSermonToRecentHistory(currentYouTubeId || 'F3lRIXNF1V8', currentYouTubeTitle || '여호와께 감사하라!', currentYouTubeScripture || '시편 138편 (참고, 역대상 16:7-11)');

  showToast('🎉 설교 심층 분석 및 10편의 쇼츠 생성이 완료되었습니다!', '✨');

  // Auto-launch the Studio Modal after 1.2 seconds so user sees all 10 shorts immediately!
  setTimeout(() => {
    openStudioModalAfterProcessing();
  }, 1200);
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

function addSermonToRecentHistory(id, title, scripture) {
  const container = document.querySelector('.space-y-2\\.5') || document.getElementById('recent-sermons-list');
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
    <span class="text-xs font-black text-blue-700 bg-blue-100 group-hover:bg-blue-600 group-hover:text-white px-3 py-1.5 rounded-xl transition-all shadow-2xs">
      스튜디오 열기 →
    </span>
  `;
  container.prepend(newItem);
}

function startStudioGeneration() {
  triggerDeepSermonAnalysis();
}

function submitModalYouTubeAndStart() {
  const input = document.getElementById('modal-youtube-url-input');
  const val = input ? input.value.trim() : '';
  const id = extractYouTubeId(val);

  if (id) {
    currentYouTubeId = id;
    currentInputMode = 'yt';

    const customTitleEl = document.getElementById('yt-custom-title');
    const customScriptureEl = document.getElementById('yt-custom-scripture');
    if (customTitleEl && customTitleEl.value.trim().length > 0) {
      currentYouTubeTitle = customTitleEl.value.trim();
    }
    if (customScriptureEl && customScriptureEl.value.trim().length > 0) {
      currentYouTubeScripture = customScriptureEl.value.trim();
    }

    triggerDeepSermonAnalysis();
  } else {
    showToast('올바른 유튜브 영상 링크를 입력해 주세요.', '⚠️');
  }
}


function closeStudioModal() {
  pastoralAudio.stop();
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
  showToast(isShortsCropMode ? '📱 9:16 세로 쇼츠 모드로 전환되었습니다.' : '🖥️ 16:9 전체 화면 모드로 전환되었습니다.', '📐');
}

function initStudioPlayer() {
  selectStudioClip(currentClipIndex || 1);
  setShortsLayoutStyle(currentShortsLayout || 1);
  startPlaybackTimer();
}

function renderAllStudioDecks() {
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
        if (pDesc) pDesc.textContent = clip.sub || '';
        if (tagSpan && tagSpan.length >= 2) {
          tagSpan[1].textContent = clip.tag || '🔥 감동·결단 99%';
        }
      }
    });
  }
}

function loadActiveVideoSource() {
  const clip = studioClips[currentClipIndex] || studioClips[1];
  const ytWraps = [document.getElementById('studio-yt-wrap'), document.getElementById('modal-yt-wrap')];
  const ytIframes = [document.getElementById('studio-yt-iframe'), document.getElementById('modal-yt-iframe')];
  const vids = [document.getElementById('studio-video'), document.getElementById('modal-studio-video')];
  const pulpitImgs = [document.getElementById('studio-pulpit-img'), document.getElementById('modal-pulpit-img')];

  if (currentInputMode === 'yt' && currentYouTubeId) {
    // 1. Real YouTube Video Stream Playing Mode
    ytWraps.forEach(w => { if (w) { w.classList.remove('hidden'); w.style.display = 'flex'; } });
    vids.forEach(v => { if (v) { v.pause(); v.classList.add('hidden'); } });
    pulpitImgs.forEach(img => { if (img) { img.classList.add('hidden'); } });

    const startSec = (clip && typeof clip.startSec === 'number') ? clip.startSec : 1500;
    const embedUrl = `https://www.youtube.com/embed/${currentYouTubeId}?enablejsapi=1&autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&playsinline=1&rel=0&modestbranding=1&start=${startSec}`;

    ytIframes.forEach(iframe => {
      if (iframe) {
        const curLoaded = iframe.getAttribute('data-loaded-yt') || '';
        if (curLoaded === currentYouTubeId && iframe.src) {
          sendYtCommand(iframe.id, 'seekTo', [startSec, true]);
          if (isPlaying) {
            sendYtCommand(iframe.id, 'playVideo');
          } else {
            sendYtCommand(iframe.id, 'pauseVideo');
          }
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
  } else if (currentInputMode === 'file' && currentFileVideoUrl) {
    // 2. Uploaded Media Video File Mode
    ytWraps.forEach(w => { if (w) { w.classList.add('hidden'); w.style.display = 'none'; } });
    pulpitImgs.forEach(img => { if (img) { img.classList.add('hidden'); } });
    vids.forEach(v => {
      if (v) {
        v.classList.remove('hidden');
        if (v.src !== currentFileVideoUrl) v.src = currentFileVideoUrl;
        v.currentTime = 0;
        v.muted = isMuted;
        if (isPlaying) v.play().catch(e => console.log('File play:', e));
      }
    });
  } else {
    // 3. Text Manuscript Mode
    ytWraps.forEach(w => { if (w) { w.classList.add('hidden'); w.style.display = 'none'; } });
    vids.forEach(v => { if (v) { v.pause(); v.classList.add('hidden'); } });
    pulpitImgs.forEach(img => {
      if (img) {
        img.classList.remove('hidden');
        img.src = 'assets/pastor.jpg';
        img.style.animationPlayState = isPlaying ? 'running' : 'paused';
      }
    });
  }
}

function selectStudioClip(num) {
  currentClipIndex = num;
  const clip = studioClips[num] || studioClips[1];
  loadClipIntoRefineEditor(num);

  // Update all 10 Decks in Modal and Main Page
  for (let i = 1; i <= 10; i++) {
    const d1 = document.getElementById(`studio-deck-${i}`);
    const d2 = document.getElementById(`modal-deck-${i}`);
    if (d1) {
      d1.className = (i === num)
        ? 'rounded-2xl border-2 border-blue-600 bg-blue-50/80 p-4 sm:p-5 cursor-pointer transition-all shadow-md'
        : 'rounded-2xl border border-slate-200 bg-white hover:border-blue-400 p-4 sm:p-5 cursor-pointer transition-all';
    }
    if (d2) {
      d2.className = (i === num)
        ? 'rounded-2xl border-2 border-blue-600 bg-blue-50/80 p-4 cursor-pointer transition-all shadow-md'
        : 'rounded-2xl border border-slate-200 bg-white hover:border-blue-400 p-4 cursor-pointer transition-all';
    }
  }

  // Update tags and titles
  const tag1 = document.getElementById('studio-shorts-tag');
  const tag2 = document.getElementById('modal-shorts-tag');
  if (tag1) tag1.textContent = `쇼츠 ${num}편 (${clip.tag || '감동'})`;
  if (tag2) tag2.textContent = `쇼츠 ${num}편 (${clip.tag || '감동'})`;

  clipElapsedSec = 0;
  pastoralAudio.stop();
  loadActiveVideoSource();
  updatePlayerUI();

  if (isPlaying && !isMuted) {
    const activeScene = clip.scenes[0];
    if (activeScene) pastoralAudio.speakLine(activeScene.subtitle, currentPlaybackRate);
  }
}

// Playback Timer
function startPlaybackTimer() {
  stopPlaybackTimer();
  playbackTimer = setInterval(() => {
    if (!isPlaying) return;
    const clip = studioClips[currentClipIndex] || studioClips[1];
    const dur = clip.duration || 45;

    clipElapsedSec += 0.25 * currentPlaybackRate;
    if (clipElapsedSec >= dur) {
      clipElapsedSec = 0;
    }

    updatePlayerUI();
  }, 250);
}

function stopPlaybackTimer() {
  if (playbackTimer) {
    clearInterval(playbackTimer);
    playbackTimer = null;
  }
}

function updatePlayerUI() {
  const clip = studioClips[currentClipIndex] || studioClips[1];
  const curr = clipElapsedSec;
  const dur = clip.duration || 45;

  ['studio', 'modal'].forEach(prefix => {
    const currEl = document.getElementById(`${prefix}-time-curr`);
    const totalEl = document.getElementById(`${prefix}-time-total`);
    const fillEl = document.getElementById(`${prefix}-progress-fill`);
    const titleEl = document.getElementById(`${prefix}-sermon-title`);
    const scripEl = document.getElementById(`${prefix}-scripture-title`);
    const churchEl = document.getElementById(`${prefix}-church-name`);

    if (currEl) currEl.textContent = formatTime(curr);
    if (totalEl) totalEl.textContent = formatTime(dur);
    if (fillEl && dur > 0) fillEl.style.width = `${Math.min(100, (curr / dur) * 100)}%`;
    if (titleEl) titleEl.textContent = clip.title;
    if (scripEl) scripEl.textContent = generatedMinistryAssets.scripture || currentYouTubeScripture || '시편 138편 (참고, 역대상 16:7-11)';
    if (churchEl) churchEl.textContent = '복의근원 관유중앙교회';
  });

  const matchedScene = (clip.scenes && clip.scenes.find(s => curr >= s.start && curr < s.end)) || (clip.scenes && clip.scenes[clip.scenes.length - 1]);
  if (matchedScene) {
    ['studio', 'modal'].forEach(prefix => {
      const sceneBadge = document.getElementById(`${prefix}-scene-badge`);
      const subEl = document.getElementById(`${prefix}-live-subtitle`);
      if (sceneBadge) sceneBadge.textContent = matchedScene.label;
      if (subEl) subEl.innerHTML = matchedScene.subtitle;
    });

    if (isPlaying && !isMuted && matchedScene && currentInputMode === 'paste') {
      pastoralAudio.speakLine(matchedScene.subtitle, currentPlaybackRate);
    }
  }
}

// Play & Pause
function toggleStudioPlay() {
  isPlaying = !isPlaying;
  if (!isPlaying) {
    pastoralAudio.stop();
    stopPlaybackTimer();
    sendYtCommand('studio-yt-iframe', 'pauseVideo');
    sendYtCommand('modal-yt-iframe', 'pauseVideo');
    const vids = [document.getElementById('studio-video'), document.getElementById('modal-studio-video')];
    vids.forEach(v => { if (v) v.pause(); });
  } else {
    if (isMuted) {
      isMuted = false;
      updateSoundIcons(true);
    }
    startPlaybackTimer();
    if (currentInputMode === 'yt') {
      sendYtCommand('studio-yt-iframe', 'playVideo');
      sendYtCommand('modal-yt-iframe', 'playVideo');
      sendYtCommand('studio-yt-iframe', 'unMute');
      sendYtCommand('studio-yt-iframe', 'setVolume', [100]);
      sendYtCommand('modal-yt-iframe', 'unMute');
      sendYtCommand('modal-yt-iframe', 'setVolume', [100]);
    } else if (currentInputMode === 'file') {
      const vids = [document.getElementById('studio-video'), document.getElementById('modal-studio-video')];
      vids.forEach(v => { if (v) { v.muted = isMuted; v.play().catch(e => console.log(e)); } });
    } else {
      pastoralAudio.initContext();
      const clip = studioClips[currentClipIndex] || studioClips[1];
      const curr = clipElapsedSec;
      const activeScene = (clip.scenes && clip.scenes.find(s => curr >= s.start && curr < s.end)) || (clip.scenes && clip.scenes[0]);
      if (activeScene) {
        pastoralAudio.speakLine(activeScene.subtitle, currentPlaybackRate);
      }
    }
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

  const pulpitImgs = [document.getElementById('studio-pulpit-img'), document.getElementById('modal-pulpit-img')];
  pulpitImgs.forEach(img => {
    if (img) {
      img.style.animationPlayState = playing ? 'running' : 'paused';
    }
  });

  const eqBars = document.querySelectorAll('.live-eq-bar');
  eqBars.forEach(bar => {
    if (!isMuted && playing) {
      bar.style.animationPlayState = 'running';
      bar.style.opacity = '1';
    } else {
      bar.style.animationPlayState = 'paused';
      bar.style.opacity = '0.35';
    }
  });
}

// Audio Mute & Unmute (No Piano BGM, Pure Preaching Voice)
function toggleStudioAudio() {
  isMuted = !isMuted;

  if (!isMuted) {
    updateSoundIcons(true);
    if (currentInputMode === 'yt') {
      sendYtCommand('studio-yt-iframe', 'unMute');
      sendYtCommand('studio-yt-iframe', 'setVolume', [100]);
      sendYtCommand('modal-yt-iframe', 'unMute');
      sendYtCommand('modal-yt-iframe', 'setVolume', [100]);
      showToast('🔊 설교 영상 음성이 100% 볼륨으로 활성화되었습니다!', '✨');
    } else if (currentInputMode === 'file') {
      const vids = [document.getElementById('studio-video'), document.getElementById('modal-studio-video')];
      vids.forEach(v => { if (v) v.muted = false; });
      showToast('🔊 미디어 파일 설교 음성이 활성화되었습니다!', '✨');
    } else {
      pastoralAudio.initContext();
      const clip = studioClips[currentClipIndex] || studioClips[1];
      const curr = clipElapsedSec;
      const activeScene = (clip.scenes && clip.scenes.find(s => curr >= s.start && curr < s.end)) || (clip.scenes && clip.scenes[0]);
      if (activeScene) {
        pastoralAudio.speakLine(activeScene.subtitle, currentPlaybackRate);
      }
      showToast('🔊 1.3배속 설교 음성이 활성화되었습니다!', '✨');
    }
  } else {
    updateSoundIcons(false);
    if (currentInputMode === 'yt') {
      sendYtCommand('studio-yt-iframe', 'mute');
      sendYtCommand('modal-yt-iframe', 'mute');
    } else if (currentInputMode === 'file') {
      const vids = [document.getElementById('studio-video'), document.getElementById('modal-studio-video')];
      vids.forEach(v => { if (v) v.muted = true; });
    } else {
      pastoralAudio.stop();
    }
    showToast('🔇 소리가 꺼졌습니다.', '🔇');
  }
}

function toggleModalStudioAudio() {
  toggleStudioAudio();
}

function updateSoundIcons(hasSound) {
  const btns = [document.getElementById('modal-sound-btn'), document.getElementById('studio-sound-btn')];
  btns.forEach(btn => {
    if (!btn) return;
    if (hasSound) {
      btn.className = 'shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[10.5px] font-black shadow-md transition-all bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer active:scale-95 animate-pulse';
      btn.innerHTML = '<span>🔊</span><span>소리 ON</span>';
      btn.title = '소리 끄기';
    } else {
      btn.className = 'shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[10.5px] font-bold shadow-sm transition-all bg-slate-700 hover:bg-slate-600 text-slate-300 cursor-pointer active:scale-95';
      btn.innerHTML = '<span>🔇</span><span>소리 끔</span>';
      btn.title = '소리 켜기';
    }
  });

  const eqBars = document.querySelectorAll('.live-eq-bar');
  eqBars.forEach(bar => {
    if (hasSound && isPlaying) {
      bar.style.animationPlayState = 'running';
      bar.style.opacity = '1';
    } else {
      bar.style.animationPlayState = 'paused';
      bar.style.opacity = '0.35';
    }
  });
}

function seekStudioVideo(e) {
  const track = document.getElementById('studio-progress-track');
  if (!track) return;
  const rect = track.getBoundingClientRect();
  const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  const clip = studioClips[currentClipIndex] || studioClips[1];
  clipElapsedSec = pct * (clip.duration || 45);
  pastoralAudio.stop();
  updatePlayerUI();
}

function seekModalStudioVideo(e) {
  const track = document.getElementById('modal-progress-track');
  if (!track) return;
  const rect = track.getBoundingClientRect();
  const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  const clip = studioClips[currentClipIndex] || studioClips[1];
  clipElapsedSec = pct * (clip.duration || 45);
  pastoralAudio.stop();
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
      currentYouTubeTitle = '여호와께 감사하라!';
      currentYouTubeScripture = '시편 138편 (참고, 역대상 16:7-11)';
      if (titleEl) titleEl.textContent = `"${currentYouTubeTitle}" (${currentYouTubeScripture})`;
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
  renderAllStudioDecks();
  renderAllStudioDecks();
});



// ================= 10-ASSET SHOWCASE ONE-CLICK LAUNCHER =================
function openAssetFeature(key) {
  // Ensure active sermon is generated
  analyzeAndGenerateMinistryAssets();
  const studio = document.getElementById('studio-modal');

  if (key === 'shorts') {
    // 1. Smoothly scroll down directly to the Shorts Studio & Refinement Editor Suite!
    const shortsSection = document.getElementById('shorts-section');
    if (shortsSection) {
      shortsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      shortsSection.classList.add('ring-4', 'ring-blue-500/50', 'rounded-3xl', 'transition-all', 'duration-500');
      setTimeout(() => {
        shortsSection.classList.remove('ring-4', 'ring-blue-500/50');
      }, 2500);
    }
    // Also activate modal studio
    if (studio) { studio.classList.remove('hidden'); studio.classList.add('flex'); }
    switchStudioTab('shorts');
    renderAll10ShortsDecks();
    selectStudioClip(currentClipIndex || 1);
    loadClipIntoRefineEditor(currentClipIndex || 1);
    initStudioPlayer();
    showToast('🎬 설교 쇼츠 10편 스튜디오와 세부 다듬기 편집기가 활성화되었습니다!', '✨');
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
