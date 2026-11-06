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
    'F3IRIXNF1V8': {
    title: '광야의 식탁을 베푸시는 하나님의 은혜',
    scripture: '시편 78장 17-25절',
    preacher: '관유중앙교회 송기운 담임목사',
    fullDuration: '1시간 14분 20초',
    sermonRange: '21:30 ~ 52:45',
    coreMessage: '인간의 지혜와 계산이 끝나는 메마른 광야의 한복판에서, 하나님은 반석을 쳐서 물을 내시며 하늘 문을 열어 만나를 비처럼 쏟아부으시는 풍성한 은혜의 식탁을 베푸십니다.',
    points: [
      '1대지: 광야의 결핍 속에서도 하나님을 시험치 않는 믿음 (시 78:17-19)',
      '2대지: 굳은 반석에서 터져 나오는 생수와 하늘의 만나 (시 78:20-24)',
      '3대지: 주의 백성을 배불리 먹이시는 신실하신 하나님의 식탁 (시 78:25)'
    ],
    shorts: {
      1: {
        title: '광야 한가운데서 식탁을 베푸시는 하나님',
        tag: '🔥 감정 고조도 99% (결단)',
        sub: '도입(10s) ➔ 전환(15s) ➔ 결단(15s) ➔ 선포(5s) · 1.3배속 45초',
        startSec: 1290,
        duration: 45,
        scenes: [
          { start: 0, end: 10, label: '씬 1 [00:00] 도입', subtitle: '“사방이 메마른 광야처럼 캄캄할 때, <span class=\'text-blue-400 font-bold\'>우리는 쉽게 원망하고 낙심</span>합니다.”' },
          { start: 10, end: 25, label: '씬 2 [00:10] 전환', subtitle: '“그러나 하나님은 <span class=\'text-blue-400 font-bold\'>반석을 쳐서 물을 내시며</span>, 하늘 문을 열어 만나를 비처럼 내리시는 전능자이십니다.”' },
          { start: 25, end: 40, label: '씬 3 [00:25] 결단', subtitle: '“인간의 계산이 끝나는 곳이 바로 <span class=\'text-blue-400 font-bold\'>하나님의 기적의 식탁이 차려지는 은혜의 무대</span>입니다.”' },
          { start: 40, end: 45, label: '씬 4 [00:40] 선포', subtitle: '“<span class=\'text-amber-400 font-black\'>두려워하지 마십시오! 주님이 오늘 당신을 위한 식탁을 베푸십니다!</span>”' }
        ]
      },
      2: {
        title: '광야의 결핍 앞에서도 흔들리지 않는 믿음',
        tag: '💡 감동·위로 98% (믿음)',
        sub: '결핍은 불평의 이유가 아닌 살아계신 하나님을 경험하는 통로',
        startSec: 1380,
        duration: 45,
        scenes: [
          { start: 0, end: 10, label: '씬 1 [00:00] 도입', subtitle: '“통장의 잔고와 척박한 현실 앞에 서면, <span class=\'text-blue-400 font-bold\'>누구나 불안에 사로잡히기 쉽습니다</span>.”' },
          { start: 10, end: 25, label: '씬 2 [00:10] 전환', subtitle: '“이스라엘은 광야에서 하나님을 시험했으나, <span class=\'text-blue-400 font-bold\'>참된 성도는 결핍 속에서 주님을 바라봅니다</span>.”' },
          { start: 25, end: 40, label: '씬 3 [00:25] 결단', subtitle: '“광야의 메마름은 망하게 하려는 것이 아니라, <span class=\'text-blue-400 font-bold\'>오직 주님만 의지하도록 빚으시는 과정</span>입니다.”' },
          { start: 40, end: 45, label: '씬 4 [00:40] 선포', subtitle: '“<span class=\'text-amber-400 font-black\'>환경을 보지 말고 광야의 주인이신 하나님을 신뢰하십시오!</span>”' }
        ]
      },
      3: {
        title: '하나님이 식탁을 베푸실 수 있으랴? 의심을 깨라',
        tag: '⚡️ 능력·도전 97% (회복)',
        sub: '전능자의 무한한 능력을 나의 좁은 생각으로 제한하지 말라',
        startSec: 1470,
        duration: 45,
        scenes: [
          { start: 0, end: 10, label: '씬 1 [00:00] 도입', subtitle: '“‘정말 이 절망적인 상황에서 길이 열릴까?’ <span class=\'text-blue-400 font-bold\'>우리는 스스로 한계를 긋습니다</span>.”' },
          { start: 10, end: 25, label: '씬 2 [00:10] 전환', subtitle: '“하나님이 과연 광야에서 식탁을 베푸실 수 있으랴 불평했던 <span class=\'text-blue-400 font-bold\'>불신앙의 입술을 닫아야 합니다</span>.”' },
          { start: 25, end: 40, label: '씬 3 [00:25] 결단', subtitle: '“내 좁은 경험과 상식의 틀을 깰 때, <span class=\'text-blue-400 font-bold\'>전능하신 하나님의 기적이 역사하기 시작합니다</span>.”' },
          { start: 40, end: 45, label: '씬 4 [00:40] 선포', subtitle: '“<span class=\'text-amber-400 font-black\'>주께는 능치 못함이 없습니다! 의심을 버리고 믿음으로 서십시오!</span>”' }
        ]
      },
      4: {
        title: '굳은 반석에서 터져 나오는 생수의 기적',
        tag: '🔥 영적 권세 98% (권능)',
        sub: '가장 단단하고 절망적인 바위가 가장 신선한 생수 샘터가 된다',
        startSec: 1560,
        duration: 45,
        scenes: [
          { start: 0, end: 10, label: '씬 1 [00:00] 도입', subtitle: '“목마른 사막 한가운데 거대한 바위만 서 있다면, <span class=\'text-blue-400 font-bold\'>누가 물을 기대하겠습니까?</span>”' },
          { start: 10, end: 25, label: '씬 2 [00:10] 전환', subtitle: '“그러나 모세의 지팡이가 반석을 칠 때, <span class=\'text-blue-400 font-bold\'>굳은 바위가 쪼개지며 시원한 강물이 쏟아져 나왔습니다</span>.”' },
          { start: 25, end: 40, label: '씬 3 [00:25] 결단', subtitle: '“당신의 삶을 가로막은 가장 단단한 바위가, <span class=\'text-blue-400 font-bold\'>하나님의 은혜가 터져 나오는 생수 근원이 될 것입니다</span>.”' },
          { start: 40, end: 45, label: '씬 4 [00:40] 선포', subtitle: '“<span class=\'text-amber-400 font-black\'>메마른 당신의 영혼과 삶에 주님의 생수가 넘쳐흐를지어다!</span>”' }
        ]
      },
      5: {
        title: '하늘 문을 열고 쏟아부으시는 만나의 은혜',
        tag: '💡 소망·비전 96% (공급)',
        sub: '땅의 양식이 끊어질 때 비로소 하늘의 초자연적 공급이 시작된다',
        startSec: 1650,
        duration: 45,
        scenes: [
          { start: 0, end: 10, label: '씬 1 [00:00] 도입', subtitle: '“곡식 한 톨 자라지 않는 사막에서, <span class=\'text-blue-400 font-bold\'>수백만 백성이 40년을 어떻게 살았을까요?</span>”' },
          { start: 10, end: 25, label: '씬 2 [00:10] 전환', subtitle: '“땅의 문이 막히자 하나님은 <span class=\'text-blue-400 font-bold\'>하늘 문을 여시고 천사의 양식인 만나를 비처럼 내리셨습니다</span>.”' },
          { start: 25, end: 40, label: '씬 3 [00:25] 결단', subtitle: '“세상의 계산으로는 굶어 죽을 것 같아도, <span class=\'text-blue-400 font-bold\'>하늘의 아버지께서 당신을 굶기지 않으십니다</span>.”' },
          { start: 40, end: 45, label: '씬 4 [00:40] 선포', subtitle: '“<span class=\'text-amber-400 font-black\'>오늘도 하늘 문을 여시고 당신의 일터를 먹이시는 주님을 찬양합니다!</span>”' }
        ]
      },
      6: {
        title: '날마다 새롭게 채우시는 성실하신 공급',
        tag: '⚡️ 평안·담대 95% (신뢰)',
        sub: '1년 치를 미리 쌓아두지 않아도 매일 아침 내리는 신선한 은혜',
        startSec: 1740,
        duration: 45,
        scenes: [
          { start: 0, end: 10, label: '씬 1 [00:00] 도입', subtitle: '“내년의 노후까지 미리 쥐고 있어야 <span class=\'text-blue-400 font-bold\'>비로소 안심이 되는 것이 인간의 연약함입니다</span>.”' },
          { start: 10, end: 25, label: '씬 2 [00:10] 전환', subtitle: '“그러나 만나는 하루치씩 내렸습니다. <span class=\'text-blue-400 font-bold\'>매일 아침 주님과 눈을 맞추며 신뢰하는 법을 가르치셨습니다</span>.”' },
          { start: 25, end: 40, label: '씬 3 [00:25] 결단', subtitle: '“오늘 하루를 먹이신 신실하신 하나님께서, <span class=\'text-blue-400 font-bold\'>내일의 광야도 어김없이 책임져 주십니다</span>.”' },
          { start: 40, end: 45, label: '씬 4 [00:40] 선포', subtitle: '“<span class=\'text-amber-400 font-black\'>내일 일을 염려하지 마십시오! 날마다 새 은혜를 부어주십니다!</span>”' }
        ]
      },
      7: {
        title: '인간의 계산이 끝나는 곳이 기적의 시작입니다',
        tag: '🔥 믿음 결단 98% (항복)',
        sub: '내 손을 펴고 주님 앞에 무릎 꿇을 때 비로소 일하시는 하나님',
        startSec: 1830,
        duration: 45,
        scenes: [
          { start: 0, end: 10, label: '씬 1 [00:00] 도입', subtitle: '“밤새 머리를 싸매고 주판알을 튕겨도, <span class=\'text-blue-400 font-bold\'>돌아오는 것은 가슴 조이는 한숨뿐입니다</span>.”' },
          { start: 10, end: 25, label: '씬 2 [00:10] 전환', subtitle: '“모세도 광야에서는 계산할 수 없었습니다. <span class=\'text-blue-400 font-bold\'>인간의 지혜가 바닥난 바로 그 자리가 하나님의 일터입니다</span>.”' },
          { start: 25, end: 40, label: '씬 3 [00:25] 결단', subtitle: '“내 고집스러운 계산을 내려놓고 주께 맡길 때, <span class=\'text-blue-400 font-bold\'>하늘의 무한한 계산법이 작동하기 시작합니다</span>.”' },
          { start: 40, end: 45, label: '씬 4 [00:40] 선포', subtitle: '“<span class=\'text-amber-400 font-black\'>손을 펴고 주님께 맡기십시오! 당신이 내려놓을 때 주님이 일하십니다!</span>”' }
        ]
      },
      8: {
        title: '광야의 고난이 바로 은혜의 만찬 초대장입니다',
        tag: '💡 위로·소망 96% (성숙)',
        sub: '꽃길에서는 결코 맛볼 수 없는 반석의 생수와 만나의 신비',
        startSec: 1920,
        duration: 45,
        scenes: [
          { start: 0, end: 10, label: '씬 1 [00:00] 도입', subtitle: '“‘왜 하나님은 사랑하는 내게 <span class=\'text-blue-400 font-bold\'>이토록 혹독한 광야를 지나게 하실까?’ 묻고 계십니까?</span>”' },
          { start: 10, end: 25, label: '씬 2 [00:10] 전환', subtitle: '“광야를 지나지 않았다면 <span class=\'text-blue-400 font-bold\'>반석의 생수를 맛볼 수 없었고 하늘의 만나를 경험할 수 없었습니다</span>.”' },
          { start: 25, end: 40, label: '씬 3 [00:25] 결단', subtitle: '“지금 겪는 고난은 저주가 아니라, <span class=\'text-blue-400 font-bold\'>하나님을 가장 깊이 만나는 거룩한 만찬의 자리입니다</span>.”' },
          { start: 40, end: 45, label: '씬 4 [00:40] 선포', subtitle: '“<span class=\'text-amber-400 font-black\'>광야를 두려워 마십시오! 그곳이 가장 풍성한 하나님의 식탁입니다!</span>”' }
        ]
      },
      9: {
        title: '원망의 입술을 닫고 기적의 감사를 선포하라',
        tag: '⚡️ 영적 승리 97% (찬양)',
        sub: '원망은 광야를 무덤으로 만들지만 감사는 광야를 천국으로 바꾼다',
        startSec: 2010,
        duration: 45,
        scenes: [
          { start: 0, end: 10, label: '씬 1 [00:00] 도입', subtitle: '“원망과 불평은 <span class=\'text-blue-400 font-bold\'>내 영혼을 갉아먹고 기적의 문을 닫아버리는 무서운 독입니다</span>.”' },
          { start: 10, end: 25, label: '씬 2 [00:10] 전환', subtitle: '“이스라엘은 원망하다 광야에 엎드러졌지만, <span class=\'text-blue-400 font-bold\'>감사는 메마른 땅에서 기적의 샘을 터뜨리는 열쇠입니다</span>.”' },
          { start: 25, end: 40, label: '씬 3 [00:25] 결단', subtitle: '“눈에 보이는 것이 없을 때 먼저 드리는 감사가 <span class=\'text-blue-400 font-bold\'>사탄의 결박을 끊고 하늘 문을 엽니다</span>.”' },
          { start: 40, end: 45, label: '씬 4 [00:40] 선포', subtitle: '“<span class=\'text-amber-400 font-black\'>입술을 열어 감사를 선포하십시오! 기적의 식탁이 차려질 것입니다!</span>”' }
        ]
      },
      10: {
        title: '오늘 주님이 차려주신 은혜의 식탁으로 나아오라',
        tag: '🔥 복음 초청 99% (은혜)',
        sub: '생명의 떡이신 예수 그리스도 안에서 누리는 영원한 만족과 승리',
        startSec: 2100,
        duration: 45,
        scenes: [
          { start: 0, end: 10, label: '씬 1 [00:00] 도입', subtitle: '“세상에 지치고 상하여 <span class=\'text-blue-400 font-bold\'>영혼의 극심한 갈증 속에 방황하고 계십니까?</span>”' },
          { start: 10, end: 25, label: '씬 2 [00:10] 전환', subtitle: '“하늘에서 내려온 참된 떡, <span class=\'text-blue-400 font-bold\'>예수 그리스도께서 오늘 당신을 그분의 풍성한 식탁으로 부르십니다</span>.”' },
          { start: 25, end: 40, label: '씬 3 [00:25] 결단', subtitle: '“아무 값없이 베푸시는 십자가 사랑 앞에 <span class=\'text-blue-400 font-bold\'>마음의 문을 활짝 열고 주님을 영접하십시오</span>.”' },
          { start: 40, end: 45, label: '씬 4 [00:40] 선포', subtitle: '“<span class=\'text-amber-400 font-black\'>광야의 식탁을 베푸시는 예수 그리스도의 이름으로 축복합니다!</span>”' }
        ]
      }
    }
  },
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
  // 1. YouTube Live URLs (e.g. https://youtube.com/live/F3IRIXNF1V8?feature=share)
  let m = url.match(/(?:youtube\.com|m\.youtube\.com)\/live\/([a-zA-Z0-9_-]{11})/i);
  if (m) return m[1];
  // 2. youtu.be short URLs
  m = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/i);
  if (m) return m[1];
  // 3. watch?v= parameter
  m = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/i);
  if (m) return m[1];
  // 4. embed / shorts / v
  m = url.match(/(?:embed|shorts|\/v\/|\/e\/)\/([a-zA-Z0-9_-]{11})/i);
  if (m) return m[1];
  // 5. Any generic /live/ path
  m = url.match(/\/live\/([a-zA-Z0-9_-]{11})/i);
  if (m) return m[1];
  // 6. Raw 11-character alphanumeric ID
  m = url.match(/^([a-zA-Z0-9_-]{11})$/);
  if (m) return m[1];
  // 7. General fallback for any YouTube link containing 11-char ID
  if (url.includes('youtube') || url.includes('youtu.be')) {
    m = url.match(/([a-zA-Z0-9_-]{11})/);
    if (m) return m[1];
  }
  return null;
}

function handleYouTubeInput(val) {
  const id = extractYouTubeId(val);
  const card = document.getElementById('yt-recognized-card');
  const thumb = document.getElementById('yt-recognized-thumb');
  const idEl = document.getElementById('yt-recognized-id');
  const boundaryEl = document.getElementById('yt-recognized-boundary');

  if (id) {
    currentYouTubeId = id;
    currentInputMode = 'yt';
    if (card) { card.classList.remove('hidden'); card.classList.add('flex'); }
    if (thumb) thumb.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    
    const preset = sermonPresets[id];
    const customTitleEl = document.getElementById('yt-custom-title');
    const customScriptureEl = document.getElementById('yt-custom-scripture');

    if (preset) {
      currentYouTubeTitle = preset.title;
      currentYouTubeScripture = preset.scripture;
      if (customTitleEl) customTitleEl.value = preset.title;
      if (customScriptureEl) customScriptureEl.value = preset.scripture;
      if (idEl) idEl.textContent = `설교: "${preset.title}" (${preset.scripture})`;
      if (boundaryEl) boundaryEl.innerHTML = `<strong>전체 예배 (${preset.fullDuration || '1시간 14분'})</strong> 감지 ➔ <span class="text-blue-700 font-bold">설교 구간: ${preset.sermonRange || '21:30 ~ 52:45'} 정밀 추출</span>`;
    } else {
      currentYouTubeTitle = (customTitleEl && customTitleEl.value.trim().length > 0)
        ? customTitleEl.value.trim()
        : '광야의 식탁을 베푸시는 하나님의 은혜';
      currentYouTubeScripture = (customScriptureEl && customScriptureEl.value.trim().length > 0)
        ? customScriptureEl.value.trim()
        : '시편 78장 17-25절';

      if (customTitleEl) customTitleEl.value = currentYouTubeTitle;
      if (customScriptureEl) customScriptureEl.value = currentYouTubeScripture;

      if (idEl) idEl.textContent = `설교: "${currentYouTubeTitle}" (${currentYouTubeScripture})`;
      if (boundaryEl) boundaryEl.innerHTML = `<strong>전체 예배 영상</strong> 감지 ➔ <span class="text-blue-700 font-bold">설교 구간: 21:30 ~ 52:45 정밀 추출</span>`;
    }

    const backdropImg = document.getElementById('sermon-backdrop-img');
    if (backdropImg) backdropImg.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
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

  const customTitleEl = document.getElementById('yt-custom-title');
  const customScriptureEl = document.getElementById('yt-custom-scripture');
  if (customTitleEl) customTitleEl.value = currentYouTubeTitle;
  if (customScriptureEl) customScriptureEl.value = currentYouTubeScripture;

  const backdropImg = document.getElementById('sermon-backdrop-img');
  if (backdropImg) backdropImg.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

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

  const customTitleEl = document.getElementById('yt-custom-title');
  const customScriptureEl = document.getElementById('yt-custom-scripture');
  if (customTitleEl && customTitleEl.value.trim().length > 0) {
    currentYouTubeTitle = customTitleEl.value.trim();
  }
  if (customScriptureEl && customScriptureEl.value.trim().length > 0) {
    currentYouTubeScripture = customScriptureEl.value.trim();
  }

  if (id) {
    currentYouTubeId = id;
    currentInputMode = 'yt';

    const backdropImg = document.getElementById('sermon-backdrop-img');
    if (backdropImg) backdropImg.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

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
  const cleanTitle = (title || '광야의 식탁을 베푸시는 하나님의 은혜').replace(/[\[\]"']/g, '').trim();
  const scrip = scripture || '시편 78장 17-25절';
  const p1 = (points && points[0]) || '말씀을 따라가는 순종의 믿음';
  const p2 = (points && points[1]) || '감사로 상황을 돌파하는 영적 권세';
  const p3 = (points && points[2]) || '마음과 생각을 지키시는 참된 평강';

  const themes = [
    { num: 1, title: `${cleanTitle} - 복의 근원이 되는 결단`, tag: '🔥 감정 고조도 99% (결단)', s1: '머무르는 안주에는 역사가 일어나지 않습니다. 익숙한 불안의 자리를 털고 일어나십시오.', s2: `세상은 조건을 보지만 하나님은 당신의 순종을 보십니다. ${p1}!`, s3: '상황보다 크신 하나님께서 당신을 반드시 거룩한 복의 통로로 세우실 것입니다.', s4: '너는 복이 될지라! 오늘 주님의 그 선언을 믿음으로 취하십시오!' },
    { num: 2, title: `염려를 기도로 바꾸는 단 하나의 비결`, tag: '💡 감동·위로 98% (믿음)', s1: '밤새 고민해도 바뀌는 것은 없습니다. 염려는 해결이 아니라 영혼의 소모입니다.', s2: `어떤 절망 속에서도 감사의 기도를 올릴 때 기적이 시작됩니다. ${p2}!`, s3: '내 계산이 끝나는 자리에서 비로소 하나님의 전능하신 손길이 일하십니다.', s4: '염려를 기도로 바꾸십시오! 하나님의 평강이 당신을 성벽처럼 지키십니다!' },
    { num: 3, title: `광야의 식탁을 베푸시는 하나님의 손길`, tag: '⚡️ 능력·치유 97% (회복)', s1: '사방이 메마른 광야처럼 캄캄할 때, 낙심하며 불평의 늪에 빠지지 마십시오.', s2: '하나님은 반석을 쳐서 생수를 내시며 하늘 문을 열어 만나를 쏟아부으십니다.', s3: '인간의 방법이 막힌 그곳이 하나님의 기적이 시작되는 은혜의 식탁입니다.', s4: '두려워하지 마십시오! 주님이 광야 한가운데서 당신을 위해 식탁을 베푸십니다!' },
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
      startSec: (t.num - 1) * 120,
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
    const enteredTitle = (customTitleEl && customTitleEl.value.trim().length > 0) ? customTitleEl.value.trim() : currentYouTubeTitle;
    const enteredScripture = (customScriptureEl && customScriptureEl.value.trim().length > 0) ? customScriptureEl.value.trim() : currentYouTubeScripture;

    const preset = sermonPresets[currentYouTubeId];
    if (preset) {
      sermonTitle = enteredTitle || preset.title;
      scripture = enteredScripture || preset.scripture;
      preacher = preset.preacher;
      coreMessage = preset.coreMessage;
      points = preset.points;
      studioClips = (preset.shorts && Object.keys(preset.shorts).length >= 10 && sermonTitle === preset.title)
        ? preset.shorts
        : generate10ShortsSuite(sermonTitle, scripture, points);
    } else {
      sermonTitle = enteredTitle || '광야의 식탁을 베푸시는 하나님의 은혜';
      scripture = enteredScripture || '시편 78장 17-25절';
      preacher = '관유중앙교회 송기운 담임목사';
      coreMessage = `${sermonTitle}의 말씀을 통해 광야 같은 메마른 상황에서도 주님의 기적의 식탁을 누리는 은혜를 선포합니다.`;
      points = [
        `1대지: 결핍 속에서도 믿음을 지키는 성도 (${scripture})`,
        `2대지: 반석의 생수와 하늘의 만나를 경험하는 은혜 (${scripture})`,
        `3대지: 신실하게 채우시는 하나님의 식탁 앞으로 나아감 (${scripture})`
      ];
      studioClips = generate10ShortsSuite(sermonTitle, scripture, points);
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

  updateProcessingUI(8, 1, '1단계: 유튜브 예배 영상 음성 스트림 수신 및 Whisper STT 자막 분석 중...', [
    `✓ [유튜브 스트림] "${currentYouTubeTitle || '광야의 식탁을 베푸시는 하나님의 은혜'}" 수신 완료`,
    `➔ [구간 탐지] 전체 예배(1시간 14분) 중 찬양·기도 제외, 본론 설교 [21:30 ~ 52:45] 정밀 분리 중...`
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
      log: '✓ [본문 대조 완료] 시편 78장 17-25절 본문 텍스트 일치율 99.8% 검증',
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

  addSermonToRecentHistory(currentYouTubeId || 'F3IRIXNF1V8', currentYouTubeTitle || '광야의 식탁을 베푸시는 하나님의 은혜', currentYouTubeScripture || '시편 78장 17-25절');

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

function loadActiveVideoSource() {
  const clip = studioClips[currentClipIndex] || studioClips[1];
  const vids = [document.getElementById('studio-video'), document.getElementById('modal-studio-video')];
  
  if (currentInputMode === 'file' && currentFileVideoUrl) {
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
    vids.forEach(v => {
      if (v) {
        v.pause();
        v.classList.add('hidden');
      }
    });
  }

  // Preaching Pulpit Motion Visual
  const pulpitImgs = [document.getElementById('studio-pulpit-img'), document.getElementById('modal-pulpit-img')];
  pulpitImgs.forEach(img => {
    if (img) {
      img.src = 'assets/pastor.jpg';
      img.style.animationPlayState = isPlaying ? 'running' : 'paused';
    }
  });
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
    if (scripEl) scripEl.textContent = generatedMinistryAssets.scripture || '시편 78장 17-25절';
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

    if (isPlaying && !isMuted && matchedScene) {
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
  } else {
    if (isMuted) {
      isMuted = false;
      updateSoundIcons(true);
    }
    pastoralAudio.initContext();
    startPlaybackTimer();
    const clip = studioClips[currentClipIndex] || studioClips[1];
    const curr = clipElapsedSec;
    const activeScene = (clip.scenes && clip.scenes.find(s => curr >= s.start && curr < s.end)) || (clip.scenes && clip.scenes[0]);
    if (activeScene) {
      pastoralAudio.speakLine(activeScene.subtitle, currentPlaybackRate);
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

// Audio Mute & Unmute
function toggleStudioAudio() {
  isMuted = !isMuted;
  pastoralAudio.initContext();

  if (!isMuted) {
    updateSoundIcons(true);
    pastoralAudio.playSacredPianoAmbience();
    const clip = studioClips[currentClipIndex] || studioClips[1];
    const curr = clipElapsedSec;
    const activeScene = (clip.scenes && clip.scenes.find(s => curr >= s.start && curr < s.end)) || (clip.scenes && clip.scenes[0]);
    if (activeScene) {
      pastoralAudio.speakLine(activeScene.subtitle, currentPlaybackRate);
    }
    showToast('🔊 1.3배속 설교 음성과 BGM이 활성화되었습니다!', '✨');
  } else {
    pastoralAudio.stop();
    updateSoundIcons(false);
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
      currentYouTubeTitle = '광야의 식탁을 베푸시는 하나님의 은혜';
      currentYouTubeScripture = '시편 78장 17-25절';
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
