// ==========================================================================
// 1. 블록(Tetrimino) 데이터 정의
// ==========================================================================
const MINO_MAP = [
    // 1. I 블록
    [
        [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
        [[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]],
        [[0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0]],
        [[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]]
    ],
    // 2. J 블록
    [
        [[2,0,0,0],[2,2,2,0],[0,0,0,0],[0,0,0,0]],
        [[0,2,2,0],[0,2,0,0],[0,2,0,0],[0,0,0,0]],
        [[0,0,0,0],[2,2,2,0],[0,0,2,0],[0,0,0,0]],
        [[0,2,0,0],[0,2,0,0],[2,2,0,0],[0,0,0,0]]
    ],
    // 3. L 블록
    [
        [[0,0,3,0],[3,3,3,0],[0,0,0,0],[0,0,0,0]],
        [[0,3,0,0],[0,3,0,0],[0,3,3,0],[0,0,0,0]],
        [[0,0,0,0],[3,3,3,0],[3,0,0,0],[0,0,0,0]],
        [[3,3,0,0],[0,3,0,0],[0,3,0,0],[0,0,0,0]]
    ],
    // 4. O 블록
    [
        [[0,4,4,0],[0,4,4,0],[0,0,0,0],[0,0,0,0]],
        [[0,4,4,0],[0,4,4,0],[0,0,0,0],[0,0,0,0]],
        [[0,4,4,0],[0,4,4,0],[0,0,0,0],[0,0,0,0]],
        [[0,4,4,0],[0,4,4,0],[0,0,0,0],[0,0,0,0]]
    ],
    // 5. S 블록
    [
        [[0,5,5,0],[5,5,0,0],[0,0,0,0],[0,0,0,0]],
        [[0,5,0,0],[0,5,5,0],[0,0,5,0],[0,0,0,0]],
        [[0,0,0,0],[0,5,5,0],[5,5,0,0],[0,0,0,0]],
        [[5,0,0,0],[5,5,0,0],[0,5,0,0],[0,0,0,0]]
    ],
    // 6. T 블록
    [
        [[0,6,0,0],[6,6,6,0],[0,0,0,0],[0,0,0,0]],
        [[0,6,0,0],[0,6,6,0],[0,6,0,0],[0,0,0,0]],
        [[0,0,0,0],[6,6,6,0],[0,6,0,0],[0,0,0,0]],
        [[0,6,0,0],[6,6,0,0],[0,6,0,0],[0,0,0,0]]
    ],
    // 7. Z 블록
    [
        [[7,7,0,0],[0,7,7,0],[0,0,0,0],[0,0,0,0]],
        [[0,0,7,0],[0,7,7,0],[0,7,0,0],[0,0,0,0]],
        [[0,0,0,0],[7,7,0,0],[0,7,7,0],[0,0,0,0]],
        [[0,7,0,0],[7,7,0,0],[7,0,0,0],[0,0,0,0]]
    ]
];

// 네온 블록 색상 정보
const MINO_COLORS = {
    1: '#00e5ff', // Cyan (I)
    2: '#1b76ff', // Blue (J)
    3: '#ff7b00', // Orange (L)
    4: '#ffe600', // Yellow (O)
    5: '#39ff14', // Green (S)
    6: '#bd40f2', // Purple (T)
    7: '#ff2a6d'  // Red (Z)
};

// ==========================================================================
// 2. 오디오 합성기 (Web Audio API)
// ==========================================================================
class SoundSynth {
    constructor() {
        this.ctx = null;
        this.musicVolume = 0.5;
        this.effectVolume = 0.5;
        this.bgmPlaying = false;
        this.bgmTimer = null;
        this.bgmTempo = 150; // bpm
        this.bgmStep = 0;
        this.bgmType = 'retro';

        // 테트리스 클래식 멜로디 (코로베이니키) 음계
        // [음높이, 박자(1=8분음표)]
        this.korobeiniki = [
            ['E5', 2], ['B4', 1], ['C5', 1], ['D5', 2], ['C5', 1], ['B4', 1],
            ['A4', 2], ['A4', 1], ['C5', 1], ['E5', 2], ['D5', 1], ['C5', 1],
            ['B4', 3], ['C5', 1], ['D5', 2], ['E5', 2],
            ['C5', 2], ['A4', 2], ['A4', 2], ['rest', 2],
            
            ['D5', 3], ['F5', 1], ['A5', 2], ['G5', 1], ['F5', 1],
            ['E5', 3], ['C5', 1], ['E5', 2], ['D5', 1], ['C5', 1],
            ['B4', 2], ['B4', 1], ['C5', 1], ['D5', 2], ['E5', 2],
            ['C5', 2], ['A4', 2], ['A4', 2], ['rest', 2]
        ];

        // 칠아웃 BGM용 간단한 화음 진행
        this.chillChords = [
            ['A3', 'C4', 'E4'], ['G3', 'B3', 'D4'], ['F3', 'A3', 'C4'], ['E3', 'G3', 'B3']
        ];
    }

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    noteFreq(note) {
        const notes = {
            'A3': 220.00, 'B3': 246.94, 'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F3': 174.61, 'G3': 196.00,
            'A4': 440.00, 'B4': 493.88, 'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'A5': 880.00
        };
        return notes[note] || 0;
    }

    playTone(freq, type, duration, vol, sweepTo = null) {
        if (!this.ctx) return;
        
        // AudioContext가 정지된 경우(브라우저 보안) 재개
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }

        const osc = this.ctx.createOscillator();
        const gainNode = this.ctx.createGain();

        osc.type = type;
        osc.frequency.value = freq;

        gainNode.gain.setValueAtTime(vol * this.effectVolume * 0.15, this.ctx.currentTime);
        // 부드러운 볼륨 감소 효과음
        gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

        if (sweepTo) {
            osc.frequency.exponentialRampToValueAtTime(sweepTo, this.ctx.currentTime + duration);
        }

        osc.connect(gainNode);
        gainNode.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    }

    // --- 효과음(SFX) 재생 함수들 ---
    playMove() {
        this.init();
        this.playTone(150, 'triangle', 0.05, 0.6);
    }

    playRotate() {
        this.init();
        this.playTone(330, 'square', 0.08, 0.4, 440);
    }

    playDrop() {
        this.init();
        this.playTone(600, 'triangle', 0.12, 0.5, 80);
    }

    playLineClear() {
        this.init();
        const now = this.ctx.currentTime;
        // 한 줄 지웠을 때 나오는 기분 좋은 3음 아르페지오
        setTimeout(() => this.playTone(523.25, 'sine', 0.1, 0.6), 0);   // C5
        setTimeout(() => this.playTone(659.25, 'sine', 0.1, 0.6), 80);  // E5
        setTimeout(() => this.playTone(783.99, 'sine', 0.2, 0.6), 160); // G5
    }

    playGameOver() {
        this.init();
        this.playTone(220, 'sawtooth', 0.6, 0.5, 55);
    }

    // --- 배경음(BGM) 관리 함수들 ---
    startBGM() {
        this.init();
        if (this.bgmPlaying) return;
        this.bgmPlaying = true;
        this.bgmStep = 0;
        this.scheduler();
    }

    stopBGM() {
        this.bgmPlaying = false;
        if (this.bgmTimer) {
            clearTimeout(this.bgmTimer);
            this.bgmTimer = null;
        }
    }

    scheduler() {
        if (!this.bgmPlaying) return;

        let nextTickTime = 60 / this.bgmTempo / 2 * 1000; // 8분음표 기준 밀리초

        if (this.bgmType === 'retro') {
            const currentNote = this.korobeiniki[this.bgmStep];
            if (currentNote && currentNote[0] !== 'rest') {
                const freq = this.noteFreq(currentNote[0]);
                const duration = currentNote[1] * (60 / this.bgmTempo / 2);
                this.playBGMTone(freq, 'triangle', duration, 0.4);
            }
            
            this.bgmStep = (this.bgmStep + 1) % this.korobeiniki.length;
            this.bgmTimer = setTimeout(() => this.scheduler(), nextTickTime);
        } else if (this.bgmType === 'chill') {
            // 칠아웃 스타일 - 4분음표마다 부드러운 패드 화음
            if (this.bgmStep % 4 === 0) {
                const chordIndex = (this.bgmStep / 4) % this.chillChords.length;
                const chord = this.chillChords[chordIndex];
                const duration = 1.2;
                chord.forEach(note => {
                    const freq = this.noteFreq(note);
                    this.playBGMTone(freq, 'sine', duration, 0.25);
                });
            }
            
            this.bgmStep = (this.bgmStep + 1) % 16;
            this.bgmTimer = setTimeout(() => this.scheduler(), nextTickTime * 2);
        } else {
            // 소리 없음
            this.bgmTimer = setTimeout(() => this.scheduler(), 500);
        }
    }

    playBGMTone(freq, type, duration, vol) {
        if (!this.ctx || freq === 0) return;
        const osc = this.ctx.createOscillator();
        const gainNode = this.ctx.createGain();

        osc.type = type;
        osc.frequency.value = freq;

        gainNode.gain.setValueAtTime(vol * this.musicVolume * 0.12, this.ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

        osc.connect(gainNode);
        gainNode.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    }
}

const sound = new SoundSynth();

// ==========================================================================
// 3. UI 및 상태 관리 변수
// ==========================================================================
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

let currentMode = 'easy'; // easy, hard, multi, training
let isGameOver = false;
let isPaused = false;
let gameInterval = null;
let gameTime = 0;
let hardModeTimer = null;
let remainingTime = 60;

// 플레이어 1 상태
let board1P = Array.from({length: BOARD_WIDTH}, () => Array(BOARD_HEIGHT).fill(0));
let score1P = 0;
let level1P = 1;
let goal1P = 5;
let combo1P = 0;
let nextMinos1P = [];
let holdMino1P = -1;
let hasHeld1P = false;
let curMino1P = null; // {x, y, shapeIndex, rotation}
let keyReverse1P = false;
let keyReverseTimer1P = null;

// 플레이어 2 상태 (멀티플레이 전용)
let board2P = Array.from({length: BOARD_WIDTH}, () => Array(BOARD_HEIGHT).fill(0));
let score2P = 0;
let level2P = 1;
let goal2P = 5;
let combo2P = 0;
let nextMinos2P = [];
let holdMino2P = -1;
let hasHeld2P = false;
let curMino2P = null;
let keyReverse2P = false;
let keyReverseTimer2P = null;

// 트레이닝 모드 관련
let trainingStep = 0;
const trainingInstructions = [
    "블록을 왼쪽/오른쪽으로 이동해 보세요! (1P: A/D 키, 2P: ←/→ 방향키)",
    "블록을 회전시켜 보세요! (1P: W 키로 오른쪽 회전, Q 키로 왼쪽 회전)",
    "소프트드롭(천천히 내리기)을 해보세요! (1P: S 키, 2P: ↓ 방향키)",
    "하드드롭(한번에 내리기)을 해보세요! (1P: E 키, 2P: Space 키)",
    "홀드(블록 저장) 기능을 써보세요! (1P: Shift 키)",
    "훌륭합니다! 이제 블록을 쌓고 줄을 지워 점수를 내며 연습해 보세요!"
];
let trainingUserActions = {
    move: false,
    rotate: false,
    softDrop: false,
    hardDrop: false,
    hold: false
};

// 캔버스 객체 및 컨텍스트
let canvas1P, ctx1P, canvasHold1P, ctxHold1P, canvasNext1P, ctxNext1P;
let canvas2P, ctx2P, canvasHold2P, ctxHold2P, canvasNext2P, ctxNext2P;

// ==========================================================================
// 4. 로직 핵심 기능 함수
// ==========================================================================

// 무작위 블록 생성
function getRandomMino() {
    return Math.floor(Math.random() * 7);
}

// 새 블록 떨어뜨리기 준비
function spawnMino(player) {
    const shapeIndex = player === 1 ? nextMinos1P.shift() : nextMinos2P.shift();
    if (player === 1) {
        nextMinos1P.push(getRandomMino());
        curMino1P = {
            x: 3,
            y: 0,
            shapeIndex: shapeIndex,
            rotation: 0
        };
        hasHeld1P = false;
        
        // 생성 위치 충돌 체크 -> 게임 오버
        if (checkCollision(curMino1P.x, curMino1P.y, curMino1P.shapeIndex, curMino1P.rotation, board1P)) {
            triggerGameOver();
        }
    } else {
        nextMinos2P.push(getRandomMino());
        curMino2P = {
            x: 3,
            y: 0,
            shapeIndex: shapeIndex,
            rotation: 0
        };
        hasHeld2P = false;

        if (checkCollision(curMino2P.x, curMino2P.y, curMino2P.shapeIndex, curMino2P.rotation, board2P)) {
            triggerGameOver();
        }
    }
}

// 충돌 검사
function checkCollision(x, y, shapeIndex, rotation, board) {
    const shape = MINO_MAP[shapeIndex][rotation];
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            if (shape[r][c] !== 0) {
                const targetX = x + c;
                const targetY = y + r;
                
                // 경계선 및 다른 블록 확인
                if (targetX < 0 || targetX >= BOARD_WIDTH || targetY >= BOARD_HEIGHT) {
                    return true;
                }
                // 보드의 윗 부분(y < 0)은 화면 밖이므로 경계 충돌은 넘어가되 음수 인덱스로 보드 참조하면 에러 발생하므로 체크
                if (targetY >= 0 && board[targetX][targetY] !== 0) {
                    return true;
                }
            }
        }
    }
    return false;
}

// 블록 보드에 굳히기
function lockMino(player) {
    const cur = player === 1 ? curMino1P : curMino2P;
    const board = player === 1 ? board1P : board2P;
    const shape = MINO_MAP[cur.shapeIndex][cur.rotation];

    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            if (shape[r][c] !== 0) {
                const targetX = cur.x + c;
                const targetY = cur.y + r;
                if (targetY >= 0 && targetY < BOARD_HEIGHT) {
                    board[targetX][targetY] = cur.shapeIndex + 1;
                }
            }
        }
    }

    sound.playDrop();
    clearLines(player);
    spawnMino(player);
}

// 고스트 블록 Y값 계산
function getGhostY(cur, board) {
    let ghostY = cur.y;
    while (!checkCollision(cur.x, ghostY + 1, cur.shapeIndex, cur.rotation, board)) {
        ghostY++;
    }
    return ghostY;
}

// 블록 이동
function moveLeft(player) {
    const cur = player === 1 ? curMino1P : curMino2P;
    const board = player === 1 ? board1P : board2P;
    const reverse = player === 1 ? keyReverse1P : keyReverse2P;

    // 키 반전 상태면 방향 반대로
    const step = reverse ? 1 : -1;

    if (!checkCollision(cur.x + step, cur.y, cur.shapeIndex, cur.rotation, board)) {
        cur.x += step;
        sound.playMove();
        if (currentMode === 'training' && !trainingUserActions.move) {
            trainingUserActions.move = true;
            checkTrainingProgress();
        }
    }
}

function moveRight(player) {
    const cur = player === 1 ? curMino1P : curMino2P;
    const board = player === 1 ? board1P : board2P;
    const reverse = player === 1 ? keyReverse1P : keyReverse2P;

    const step = reverse ? -1 : 1;

    if (!checkCollision(cur.x + step, cur.y, cur.shapeIndex, cur.rotation, board)) {
        cur.x += step;
        sound.playMove();
        if (currentMode === 'training' && !trainingUserActions.move) {
            trainingUserActions.move = true;
            checkTrainingProgress();
        }
    }
}

function rotateRight(player) {
    const cur = player === 1 ? curMino1P : curMino2P;
    const board = player === 1 ? board1P : board2P;
    const nextRot = (cur.rotation + 1) % 4;

    if (!checkCollision(cur.x, cur.y, cur.shapeIndex, nextRot, board)) {
        cur.rotation = nextRot;
        sound.playRotate();
        if (currentMode === 'training' && !trainingUserActions.rotate) {
            trainingUserActions.rotate = true;
            checkTrainingProgress();
        }
    } else {
        // Wall Kick 단순 구현 (좌우 1칸 이동 시 회전 가능한지 확인)
        if (!checkCollision(cur.x - 1, cur.y, cur.shapeIndex, nextRot, board)) {
            cur.x -= 1;
            cur.rotation = nextRot;
            sound.playRotate();
        } else if (!checkCollision(cur.x + 1, cur.y, cur.shapeIndex, nextRot, board)) {
            cur.x += 1;
            cur.rotation = nextRot;
            sound.playRotate();
        }
    }
}

function rotateLeft(player) {
    const cur = player === 1 ? curMino1P : curMino2P;
    const board = player === 1 ? board1P : board2P;
    const nextRot = (cur.rotation + 3) % 4; // -1 대신 +3

    if (!checkCollision(cur.x, cur.y, cur.shapeIndex, nextRot, board)) {
        cur.rotation = nextRot;
        sound.playRotate();
        if (currentMode === 'training' && !trainingUserActions.rotate) {
            trainingUserActions.rotate = true;
            checkTrainingProgress();
        }
    } else {
        if (!checkCollision(cur.x - 1, cur.y, cur.shapeIndex, nextRot, board)) {
            cur.x -= 1;
            cur.rotation = nextRot;
            sound.playRotate();
        } else if (!checkCollision(cur.x + 1, cur.y, cur.shapeIndex, nextRot, board)) {
            cur.x += 1;
            cur.rotation = nextRot;
            sound.playRotate();
        }
    }
}

function softDrop(player) {
    const cur = player === 1 ? curMino1P : curMino2P;
    const board = player === 1 ? board1P : board2P;

    if (!checkCollision(cur.x, cur.y + 1, cur.shapeIndex, cur.rotation, board)) {
        cur.y += 1;
        if (player === 1) score1P += 1;
        else score2P += 1;
        updateUI();
        if (currentMode === 'training' && !trainingUserActions.softDrop) {
            trainingUserActions.softDrop = true;
            checkTrainingProgress();
        }
    }
}

function hardDrop(player) {
    const cur = player === 1 ? curMino1P : curMino2P;
    const board = player === 1 ? board1P : board2P;
    
    let dropCount = 0;
    while (!checkCollision(cur.x, cur.y + 1, cur.shapeIndex, cur.rotation, board)) {
        cur.y += 1;
        dropCount++;
    }
    
    if (player === 1) score1P += dropCount * 2;
    else score2P += dropCount * 2;

    if (currentMode === 'training' && !trainingUserActions.hardDrop) {
        trainingUserActions.hardDrop = true;
        checkTrainingProgress();
    }

    lockMino(player);
    updateUI();
}

function holdMino(player) {
    if (player === 1) {
        if (hasHeld1P) return;
        const temp = holdMino1P;
        holdMino1P = curMino1P.shapeIndex;
        if (temp === -1) {
            spawnMino(1);
        } else {
            curMino1P = {
                x: 3,
                y: 0,
                shapeIndex: temp,
                rotation: 0
            };
        }
        hasHeld1P = true;
        sound.playMove();

        if (currentMode === 'training' && !trainingUserActions.hold) {
            trainingUserActions.hold = true;
            checkTrainingProgress();
        }
    } else {
        if (hasHeld2P) return;
        const temp = holdMino2P;
        holdMino2P = curMino2P.shapeIndex;
        if (temp === -1) {
            spawnMino(2);
        } else {
            curMino2P = {
                x: 3,
                y: 0,
                shapeIndex: temp,
                rotation: 0
            };
        }
        hasHeld2P = true;
        sound.playMove();
    }
    updateUI();
}

// 훈련(튜토리얼) 진척도 확인
function checkTrainingProgress() {
    if (currentMode !== 'training') return;
    
    if (trainingStep === 0 && trainingUserActions.move) {
        trainingStep = 1;
    } else if (trainingStep === 1 && trainingUserActions.rotate) {
        trainingStep = 2;
    } else if (trainingStep === 2 && trainingUserActions.softDrop) {
        trainingStep = 3;
    } else if (trainingStep === 3 && trainingUserActions.hardDrop) {
        trainingStep = 4;
    } else if (trainingStep === 4 && trainingUserActions.hold) {
        trainingStep = 5;
    }
    
    document.getElementById('training-instruction').innerText = trainingInstructions[trainingStep];
}

// 줄 지우기
function clearLines(player) {
    const board = player === 1 ? board1P : board2P;
    let cleared = 0;

    for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
        let isFull = true;
        for (let x = 0; x < BOARD_WIDTH; x++) {
            if (board[x][y] === 0) {
                isFull = false;
                break;
            }
        }

        if (isFull) {
            cleared++;
            // 줄 당기기
            for (let ty = y; ty > 0; ty--) {
                for (let tx = 0; tx < BOARD_WIDTH; tx++) {
                    board[tx][ty] = board[tx][ty - 1];
                }
            }
            // 가장 윗줄 비우기
            for (let tx = 0; tx < BOARD_WIDTH; tx++) {
                board[tx][0] = 0;
            }
            y++; // 지운 자리에 새로 내려왔으므로 다시 검사
        }
    }

    if (cleared > 0) {
        sound.playLineClear();
        
        let scoreAdd = 0;
        let lvl = player === 1 ? level1P : level2P;

        if (cleared === 1) scoreAdd = 50 * lvl;
        else if (cleared === 2) scoreAdd = 150 * lvl;
        else if (cleared === 3) scoreAdd = 350 * lvl;
        else if (cleared === 4) scoreAdd = 1000 * lvl;

        // 콤보 계산
        if (player === 1) {
            combo1P++;
            score1P += scoreAdd;
            goal1P -= cleared;
            if (goal1P <= 0) {
                level1P = Math.min(15, level1P + 1);
                goal1P = level1P * 5;
                // 난이도 상승에 따른 루프 속도 갱신
                restartGameInterval();
            }
        } else {
            combo2P++;
            score2P += scoreAdd;
            goal2P -= cleared;
            if (goal2P <= 0) {
                level2P = Math.min(15, level2P + 1);
                goal2P = level2P * 5;
            }
        }

        // 멀티플레이 모드 전용 이벤트: 콤보 공격 시 상대방 조작키 반전
        if (currentMode === 'multi' && cleared >= 2) {
            triggerKeyReverse(player === 1 ? 2 : 1);
        }
    } else {
        if (player === 1) combo1P = 0;
        else combo2P = 0;
    }
}

// 2인용 키 반전 이벤트 발생
function triggerKeyReverse(targetPlayer) {
    if (targetPlayer === 1) {
        if (keyReverseTimer1P) clearTimeout(keyReverseTimer1P);
        keyReverse1P = true;
        document.getElementById('key-reverse-warning-1p').classList.remove('hidden');
        keyReverseTimer1P = setTimeout(() => {
            keyReverse1P = false;
            document.getElementById('key-reverse-warning-1p').classList.add('hidden');
        }, 5000); // 5초간 유지
    } else {
        if (keyReverseTimer2P) clearTimeout(keyReverseTimer2P);
        keyReverse2P = true;
        document.getElementById('key-reverse-warning-2p').classList.remove('hidden');
        keyReverseTimer2P = setTimeout(() => {
            keyReverse2P = false;
            document.getElementById('key-reverse-warning-2p').classList.add('hidden');
        }, 5000);
    }
}

// ==========================================================================
// 5. 렌더링 (Canvas 그리기)
// ==========================================================================
const BLOCK_SIZE = 30;

function drawGrid(ctx) {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= BOARD_WIDTH; x++) {
        ctx.beginPath();
        ctx.moveTo(x * BLOCK_SIZE, 0);
        ctx.lineTo(x * BLOCK_SIZE, BOARD_HEIGHT * BLOCK_SIZE);
        ctx.stroke();
    }
    for (let y = 0; y <= BOARD_HEIGHT; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * BLOCK_SIZE);
        ctx.lineTo(BOARD_WIDTH * BLOCK_SIZE, y * BLOCK_SIZE);
        ctx.stroke();
    }
}

function drawBlock(ctx, x, y, minoIndex, isGhost = false) {
    const color = MINO_COLORS[minoIndex];
    const px = x * BLOCK_SIZE;
    const py = y * BLOCK_SIZE;

    ctx.save();
    if (isGhost) {
        // 고스트는 점선과 은은한 윤곽선으로 그리기
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
        
        ctx.shadowBlur = 8;
        ctx.shadowColor = color;
        
        // 둥근 사각형 그리기
        drawRoundedRect(ctx, px + 2, py + 2, BLOCK_SIZE - 4, BLOCK_SIZE - 4, 6);
        ctx.fill();
        ctx.stroke();
    } else {
        // 프리미엄 네온 블록 디자인
        ctx.fillStyle = color;
        ctx.shadowBlur = 12;
        ctx.shadowColor = color;
        
        drawRoundedRect(ctx, px + 1, py + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2, 6);
        ctx.fill();

        // 은은한 입체감을 위한 내부 밝은 테두리
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1;
        ctx.setLineDash([]);
        drawRoundedRect(ctx, px + 3, py + 3, BLOCK_SIZE - 6, BLOCK_SIZE - 6, 4);
        ctx.stroke();
    }
    ctx.restore();
}

function drawRoundedRect(ctx, x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
}

// 미노 미리보기 (Hold / Next 캔버스에 그리기)
function drawPreviewMino(ctx, canvas, shapeIndex) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (shapeIndex === -1 || shapeIndex === undefined) return;

    // 미노 모양 획득 (가장 첫번째 회전 모양 기준)
    const shape = MINO_MAP[shapeIndex][0];
    
    // 블록이 가운데 오도록 오프셋 계산
    let minX = 4, maxX = 0, minY = 4, maxY = 0;
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            if (shape[r][c] !== 0) {
                if (c < minX) minX = c;
                if (c > maxX) maxX = c;
                if (r < minY) minY = r;
                if (r > maxY) maxY = r;
            }
        }
    }
    
    const shapeW = (maxX - minX + 1) * BLOCK_SIZE;
    const shapeH = (maxY - minY + 1) * BLOCK_SIZE;
    const offsetX = (canvas.width - shapeW) / 2 - minX * BLOCK_SIZE;
    const offsetY = (canvas.height - shapeH) / 2 - minY * BLOCK_SIZE;

    ctx.save();
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            if (shape[r][c] !== 0) {
                const color = MINO_COLORS[shapeIndex + 1];
                ctx.fillStyle = color;
                ctx.shadowBlur = 10;
                ctx.shadowColor = color;
                drawRoundedRect(ctx, offsetX + c * BLOCK_SIZE + 1, offsetY + r * BLOCK_SIZE + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2, 6);
                ctx.fill();
            }
        }
    }
    ctx.restore();
}

// 보드 화면 렌더링
function renderBoard(player) {
    const ctx = player === 1 ? ctx1P : ctx2P;
    const canvas = player === 1 ? canvas1P : canvas2P;
    const board = player === 1 ? board1P : board2P;
    const cur = player === 1 ? curMino1P : curMino2P;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx);

    // 굳어있는 블록 그리기
    for (let x = 0; x < BOARD_WIDTH; x++) {
        for (let y = 0; y < BOARD_HEIGHT; y++) {
            if (board[x][y] !== 0) {
                drawBlock(ctx, x, y, board[x][y]);
            }
        }
    }

    // 현재 제어 중인 블록 그리기
    if (cur) {
        // 1. 고스트 블록 먼저 그리기
        const ghostY = getGhostY(cur, board);
        if (ghostY > cur.y) {
            const shape = MINO_MAP[cur.shapeIndex][cur.rotation];
            for (let r = 0; r < 4; r++) {
                for (let c = 0; c < 4; c++) {
                    if (shape[r][c] !== 0) {
                        drawBlock(ctx, cur.x + c, ghostY + r, cur.shapeIndex + 1, true);
                    }
                }
            }
        }

        // 2. 실제 블록 그리기
        const shape = MINO_MAP[cur.shapeIndex][cur.rotation];
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                if (shape[r][c] !== 0) {
                    drawBlock(ctx, cur.x + c, cur.y + r, cur.shapeIndex + 1);
                }
            }
        }
    }
}

// ==========================================================================
// 6. 게임 루프 및 모드 통제
// ==========================================================================

function updateUI() {
    document.getElementById('score-1p').innerText = score1P;
    document.getElementById('level-1p').innerText = level1P;
    document.getElementById('goal-1p').innerText = goal1P;
    document.getElementById('combo-1p').innerText = combo1P;
    document.getElementById('time-left').innerText = remainingTime;

    if (currentMode === 'multi') {
        document.getElementById('score-2p').innerText = score2P;
        document.getElementById('level-2p').innerText = level2P;
        document.getElementById('goal-2p').innerText = goal2P;
        document.getElementById('combo-2p').innerText = combo2P;
    }
}

// 속도(프레임율) 획득
function getDropSpeed(level) {
    // 레벨이 높을수록 떨어지는 속도가 빨라짐 (밀리초 단위)
    return Math.max(50, 1000 - (level - 1) * 65);
}

function startGameInterval() {
    if (gameInterval) clearInterval(gameInterval);
    
    // 1P 게임 틱 주기 설정
    const speed = getDropSpeed(level1P);
    gameInterval = setInterval(() => {
        if (isGameOver || isPaused) return;

        // 1P 자동 하강
        if (!checkCollision(curMino1P.x, curMino1P.y + 1, curMino1P.shapeIndex, curMino1P.rotation, board1P)) {
            curMino1P.y += 1;
        } else {
            lockMino(1);
        }

        // 2P 자동 하강 (멀티플레이 모드일 때만)
        if (currentMode === 'multi' && curMino2P) {
            if (!checkCollision(curMino2P.x, curMino2P.y + 1, curMino2P.shapeIndex, curMino2P.rotation, board2P)) {
                curMino2P.y += 1;
            } else {
                lockMino(2);
            }
        }

        renderBoard(1);
        if (currentMode === 'multi') {
            renderBoard(2);
        }
    }, speed);
}

function startHardModeTimer() {
    if (hardModeTimer) clearInterval(hardModeTimer);
    remainingTime = 60;
    document.getElementById('time-left').innerText = remainingTime;
    
    hardModeTimer = setInterval(() => {
        if (isGameOver || isPaused) return;
        remainingTime--;
        document.getElementById('time-left').innerText = remainingTime;
        
        if (remainingTime <= 0) {
            triggerGameOver();
        }
    }, 1000);
}

function restartGameInterval() {
    startGameInterval();
}

function initGame(mode) {
    currentMode = mode;
    isGameOver = false;
    isPaused = false;
    
    // 보드 초기화
    board1P = Array.from({length: BOARD_WIDTH}, () => Array(BOARD_HEIGHT).fill(0));
    board2P = Array.from({length: BOARD_WIDTH}, () => Array(BOARD_HEIGHT).fill(0));
    
    score1P = 0;
    level1P = 1;
    goal1P = 5;
    combo1P = 0;
    holdMino1P = -1;
    hasHeld1P = false;
    keyReverse1P = false;
    
    score2P = 0;
    level2P = 1;
    goal2P = 5;
    combo2P = 0;
    holdMino2P = -1;
    hasHeld2P = false;
    keyReverse2P = false;

    if (keyReverseTimer1P) clearTimeout(keyReverseTimer1P);
    if (keyReverseTimer2P) clearTimeout(keyReverseTimer2P);
    document.getElementById('key-reverse-warning-1p').classList.add('hidden');
    document.getElementById('key-reverse-warning-2p').classList.add('hidden');

    // 무작위 큐 생성
    nextMinos1P = [getRandomMino(), getRandomMino(), getRandomMino()];
    nextMinos2P = [getRandomMino(), getRandomMino(), getRandomMino()];
    
    spawnMino(1);
    if (mode === 'multi') {
        spawnMino(2);
        document.getElementById('player2-area').classList.remove('hidden');
    } else {
        document.getElementById('player2-area').classList.add('hidden');
    }

    // 모드 전용 UI 요소 표시
    if (mode === 'hard') {
        document.getElementById('time-container').classList.remove('hidden');
        document.getElementById('level-container-1p').classList.add('hidden');
        document.getElementById('goal-container-1p').classList.add('hidden');
        startHardModeTimer();
    } else {
        document.getElementById('time-container').classList.add('hidden');
        document.getElementById('level-container-1p').classList.remove('hidden');
        document.getElementById('goal-container-1p').classList.remove('hidden');
        if (hardModeTimer) {
            clearInterval(hardModeTimer);
            hardModeTimer = null;
        }
    }

    if (mode === 'training') {
        trainingStep = 0;
        trainingUserActions = { move: false, rotate: false, softDrop: false, hardDrop: false, hold: false };
        document.getElementById('training-banner').classList.remove('hidden');
        document.getElementById('training-instruction').innerText = trainingInstructions[0];
    } else {
        document.getElementById('training-banner').classList.add('hidden');
    }

    updateUI();
    
    // 화면 전환
    document.getElementById('main-menu').classList.remove('active');
    document.getElementById('game-screen').classList.add('active');
    
    // 타이머 및 사운드 시작
    startGameInterval();
    sound.startBGM();

    // 렌더링
    renderBoard(1);
    drawPreviewMino(ctxHold1P, canvasHold1P, holdMino1P);
    drawPreviewMino(ctxNext1P, canvasNext1P, nextMinos1P[0]);

    if (mode === 'multi') {
        renderBoard(2);
        drawPreviewMino(ctxHold2P, canvasHold2P, holdMino2P);
        drawPreviewMino(ctxNext2P, canvasNext2P, nextMinos2P[0]);
    }
}

function triggerGameOver() {
    isGameOver = true;
    if (gameInterval) clearInterval(gameInterval);
    if (hardModeTimer) clearInterval(hardModeTimer);
    sound.stopBGM();
    sound.playGameOver();

    // 멀티플레이 승자 결정
    let titleText = "GAME OVER";
    if (currentMode === 'multi') {
        if (score1P > score2P) {
            titleText = "PLAYER 1 WIN!";
        } else if (score2P > score1P) {
            titleText = "PLAYER 2 WIN!";
        } else {
            titleText = "DRAW GAME";
        }
    }

    document.getElementById('gameover-title').innerText = titleText;
    document.getElementById('gameover-score').innerText = score1P;
    
    // 하이 스코어 등록 화면 보이기 (싱글플레이 전용)
    if (currentMode === 'easy' || currentMode === 'hard') {
        document.getElementById('highscore-form').classList.remove('hidden');
    } else {
        document.getElementById('highscore-form').classList.add('hidden');
    }

    document.getElementById('gameover-modal').classList.add('active');
}

function togglePause() {
    if (isGameOver) return;
    isPaused = !isPaused;
    
    if (isPaused) {
        sound.stopBGM();
        document.getElementById('pause-modal').classList.add('active');
    } else {
        sound.startBGM();
        document.getElementById('pause-modal').classList.remove('active');
    }
}

// ==========================================================================
// 7. 리더보드 점수 관리 (LocalStorage)
// ==========================================================================
function getLeaderboard(mode) {
    const key = `leaderboard_${mode}`;
    const defaultData = [
        {name: 'AAA', score: 1000},
        {name: 'BBB', score: 500},
        {name: 'CCC', score: 200}
    ];
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultData;
}

function saveScore(mode, name, score) {
    const list = getLeaderboard(mode);
    list.push({name: name.toUpperCase(), score: score});
    // 정렬 후 상위 10개만 유지
    list.sort((a, b) => b.score - a.score);
    const top10 = list.slice(0, 10);
    localStorage.setItem(`leaderboard_${mode}`, JSON.stringify(top10));
}

function renderLeaderboard(mode) {
    const list = getLeaderboard(mode);
    const tbody = document.getElementById('leaderboard-body');
    tbody.innerHTML = '';
    
    list.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.score}</td>
        `;
        tbody.appendChild(tr);
    });
}

// ==========================================================================
// 8. 키 입력 및 이벤트 핸들링
// ==========================================================================
window.addEventListener('keydown', (e) => {
    if (isGameOver) return;

    // 일시 정지 토글 (P 또는 ESC)
    if (e.key === 'Escape' || e.code === 'KeyP') {
        // 게임 화면일 때만 일시정지 작동
        if (document.getElementById('game-screen').classList.contains('active')) {
            togglePause();
            e.preventDefault();
        }
        return;
    }

    if (isPaused) return;

    // --- 1P 조작 (Keyboard WASD & Q, E, Shift) ---
    if (curMino1P) {
        switch(e.code) {
            case 'KeyA':
                moveLeft(1);
                renderBoard(1);
                e.preventDefault();
                break;
            case 'KeyD':
                moveRight(1);
                renderBoard(1);
                e.preventDefault();
                break;
            case 'KeyW':
                rotateRight(1);
                renderBoard(1);
                e.preventDefault();
                break;
            case 'KeyQ':
                rotateLeft(1);
                renderBoard(1);
                e.preventDefault();
                break;
            case 'KeyS':
                softDrop(1);
                renderBoard(1);
                e.preventDefault();
                break;
            case 'KeyE':
                hardDrop(1);
                drawPreviewMino(ctxHold1P, canvasHold1P, holdMino1P);
                drawPreviewMino(ctxNext1P, canvasNext1P, nextMinos1P[0]);
                renderBoard(1);
                e.preventDefault();
                break;
            case 'ShiftLeft':
            case 'ShiftRight':
                holdMino(1);
                drawPreviewMino(ctxHold1P, canvasHold1P, holdMino1P);
                drawPreviewMino(ctxNext1P, canvasNext1P, nextMinos1P[0]);
                renderBoard(1);
                e.preventDefault();
                break;
        }
    }

    // --- 2P 조작 (Arrow Keys & M, Space, C) ---
    if (currentMode === 'multi' && curMino2P) {
        switch(e.code) {
            case 'ArrowLeft':
                moveLeft(2);
                renderBoard(2);
                e.preventDefault();
                break;
            case 'ArrowRight':
                moveRight(2);
                renderBoard(2);
                e.preventDefault();
                break;
            case 'ArrowUp':
                rotateRight(2);
                renderBoard(2);
                e.preventDefault();
                break;
            case 'KeyM':
                rotateLeft(2);
                renderBoard(2);
                e.preventDefault();
                break;
            case 'ArrowDown':
                softDrop(2);
                renderBoard(2);
                e.preventDefault();
                break;
            case 'Space':
                hardDrop(2);
                drawPreviewMino(ctxHold2P, canvasHold2P, holdMino2P);
                drawPreviewMino(ctxNext2P, canvasNext2P, nextMinos2P[0]);
                renderBoard(2);
                e.preventDefault();
                break;
            case 'KeyC':
                holdMino(2);
                drawPreviewMino(ctxHold2P, canvasHold2P, holdMino2P);
                drawPreviewMino(ctxNext2P, canvasNext2P, nextMinos2P[0]);
                renderBoard(2);
                e.preventDefault();
                break;
        }
    }
});

// ==========================================================================
// 9. 초기화 및 UI 이벤트 바인딩
// ==========================================================================
window.addEventListener('DOMContentLoaded', () => {
    function safeAddListener(id, event, callback) {
        const el = document.getElementById(id);
        if (el) el.addEventListener(event, callback);
    }

    // 1P 캔버스 획득
    canvas1P = document.getElementById('canvas-board-1p');
    if (canvas1P) ctx1P = canvas1P.getContext('2d');
    canvasHold1P = document.getElementById('canvas-hold-1p');
    if (canvasHold1P) ctxHold1P = canvasHold1P.getContext('2d');
    canvasNext1P = document.getElementById('canvas-next-1p');
    if (canvasNext1P) ctxNext1P = canvasNext1P.getContext('2d');

    // 2P 캔버스 획득
    canvas2P = document.getElementById('canvas-board-2p');
    if (canvas2P) ctx2P = canvas2P.getContext('2d');
    canvasHold2P = document.getElementById('canvas-hold-2p');
    if (canvasHold2P) ctxHold2P = canvasHold2P.getContext('2d');
    canvasNext2P = document.getElementById('canvas-next-2p');
    if (canvasNext2P) ctxNext2P = canvasNext2P.getContext('2d');

    // --- 메뉴 버튼 연결 ---
    safeAddListener('btn-easy', 'click', () => initGame('easy'));
    safeAddListener('btn-hard', 'click', () => initGame('hard'));
    safeAddListener('btn-multi', 'click', () => initGame('multi'));
    safeAddListener('btn-training', 'click', () => initGame('training'));

    // --- 리더보드 모달 ---
    safeAddListener('btn-leaderboard', 'click', () => {
        renderLeaderboard('easy');
        const tabE = document.getElementById('tab-easy');
        const tabH = document.getElementById('tab-hard');
        const lbM = document.getElementById('leaderboard-modal');
        if (tabE) tabE.classList.add('active');
        if (tabH) tabH.classList.remove('active');
        if (lbM) lbM.classList.add('active');
    });

    safeAddListener('tab-easy', 'click', () => {
        renderLeaderboard('easy');
        const tabE = document.getElementById('tab-easy');
        const tabH = document.getElementById('tab-hard');
        if (tabE) tabE.classList.add('active');
        if (tabH) tabH.classList.remove('active');
    });

    safeAddListener('tab-hard', 'click', () => {
        renderLeaderboard('hard');
        const tabE = document.getElementById('tab-easy');
        const tabH = document.getElementById('tab-hard');
        if (tabE) tabE.classList.remove('active');
        if (tabH) tabH.classList.add('active');
    });

    safeAddListener('btn-close-leaderboard', 'click', () => {
        const lbM = document.getElementById('leaderboard-modal');
        if (lbM) lbM.classList.remove('active');
    });

    // --- 설정 모달 ---
    safeAddListener('btn-settings', 'click', () => {
        const sm = document.getElementById('settings-modal');
        if (sm) sm.classList.add('active');
    });

    safeAddListener('vol-music', 'input', (e) => {
        const val = e.target.value;
        const valM = document.getElementById('val-music');
        if (valM) valM.innerText = val;
        sound.musicVolume = val / 10;
    });

    safeAddListener('vol-effect', 'input', (e) => {
        const val = e.target.value;
        const valE = document.getElementById('val-effect');
        if (valE) valE.innerText = val;
        sound.effectVolume = val / 10;
        sound.playMove(); // 변경 확인용 효과음 피드백
    });

    safeAddListener('bgm-select', 'change', (e) => {
        sound.bgmType = e.target.value;
        if (sound.bgmPlaying) {
            sound.stopBGM();
            sound.startBGM();
        }
    });

    safeAddListener('btn-close-settings', 'click', () => {
        const sm = document.getElementById('settings-modal');
        if (sm) sm.classList.remove('active');
    });

    // --- 일시정지 제어 ---
    safeAddListener('btn-pause', 'click', () => togglePause());
    safeAddListener('btn-resume', 'click', () => togglePause());
    safeAddListener('btn-pause-settings', 'click', () => {
        const sm = document.getElementById('settings-modal');
        if (sm) sm.classList.add('active');
    });
    safeAddListener('btn-pause-quit', 'click', () => {
        const pm = document.getElementById('pause-modal');
        if (pm) pm.classList.remove('active');
        quitToMenu();
    });
    safeAddListener('btn-quit', 'click', () => quitToMenu());

    // --- 게임오버 제어 ---
    safeAddListener('btn-restart', 'click', () => {
        const gom = document.getElementById('gameover-modal');
        if (gom) gom.classList.remove('active');
        initGame(currentMode);
    });

    safeAddListener('btn-gameover-quit', 'click', () => {
        const gom = document.getElementById('gameover-modal');
        if (gom) gom.classList.remove('active');
        quitToMenu();
    });

    safeAddListener('btn-save-score', 'click', () => {
        const nameInput = document.getElementById('player-name-input');
        const name = nameInput ? (nameInput.value.trim() || 'AAA') : 'AAA';
        saveScore(currentMode, name, score1P);
        
        const hf = document.getElementById('highscore-form');
        if (hf) hf.classList.add('hidden');
        
        renderLeaderboard(currentMode);
        const lbM = document.getElementById('leaderboard-modal');
        if (lbM) lbM.classList.add('active');
    });
});

function quitToMenu() {
    isGameOver = true;
    sound.stopBGM();
    if (gameInterval) clearInterval(gameInterval);
    if (hardModeTimer) clearInterval(hardModeTimer);
    
    document.getElementById('game-screen').classList.remove('active');
    document.getElementById('main-menu').classList.add('active');
}
