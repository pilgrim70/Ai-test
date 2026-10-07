/* ==========================================================================
   GraceClip AI - Interactive Logic & Media Processor Simulation
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initTabs();
    initStudioHighlights();
    initSeolgyoSidebarNav();
    initDropzone();
    initPlaySimulation();
});

/* 1. Sample Video Datasets */
const sampleData = {
    pastor_lee: {
        title: "2026_신년대예배_두려움을이기는믿음.mp4",
        length: "1시간 40분 (설교: 38분)",
        highlights: [
            {
                title: `"두려움을 이기는 담대한 믿음의 3가지 원리"`,
                quote: `"인생의 폭풍이 불어올 때 우리가 바라보아야 할 것은 파도가 아니라 바로 예수 그리스도의 말씀입니다!"`,
                ref: "📖 마태복음 14:29-31",
                time: "32:14 ~ 33:12 (58초)",
                tag: "#믿음 #승리 #은혜",
                viral: "🔥 조회수 예측 99점"
            },
            {
                title: `"고난 속에서도 감사해야 하는 진짜 이유"`,
                quote: `"하나님의 거절은 더 큰 축복을 위한 거룩한 기다림입니다. 오늘 당신의 기도는 결코 땅에 떨어지지 않습니다."`,
                ref: "📖 데살로니가전서 5:16-18",
                time: "41:05 ~ 42:01 (56초)",
                tag: "#감사 #기도 #위로",
                viral: "✨ 은혜/결단 강추"
            },
            {
                title: `"말씀으로 하루를 시작할 때 일어나는 기적"`,
                quote: `"아침의 첫 10분을 하나님께 드릴 때, 당신의 하루 24시간이 하나님의 능력 안에 머물게 됩니다."`,
                ref: "📖 시편 5:3",
                time: "48:50 ~ 49:50 (60초)",
                tag: "#QT #아침기도 #청년",
                viral: "📱 청년부 공유 추천"
            }
        ]
    },
    pastor_kim: {
        title: "2026_금요기도회_성령의능력과회복.mp4",
        length: "2시간 05분 (설교: 45분)",
        highlights: [
            {
                title: `"막힌 기도의 문을 열어젖히는 턴어라운드"`,
                quote: `"내 힘으로 안 될 때가 바로 하나님의 역사가 시작되는 시간입니다. 멈추지 말고 부르짖으십시오!"`,
                ref: "📖 예레미야 33:3",
                time: "55:10 ~ 56:10 (60초)",
                tag: "#기도 #성령 #회복",
                viral: "🔥 조회수 예측 98점"
            },
            {
                title: `"상처받은 마음을 치유하시는 주님의 손길"`,
                quote: `"사람은 날 버려도 주님은 결코 나를 포기하지 않으십니다. 십자가의 사랑을 기억하십시오."`,
                ref: "📖 이사야 41:10",
                time: "1:12:00 ~ 1:12:55 (55초)",
                tag: "#치유 #사랑 #위로",
                viral: "✨ 은혜/결단 강추"
            },
            {
                title: `"새 일을 행하시는 하나님을 바라보라"`,
                quote: `"광야에 길을 내시고 사막에 강을 내시는 주님의 기적이 당신의 가문과 삶에 임합니다!"`,
                ref: "📖 이사야 43:19",
                time: "1:25:30 ~ 1:26:28 (58초)",
                tag: "#비전 #새해 #소망",
                viral: "📱 청년부 공유 추천"
            }
        ]
    }
};

let currentDataset = sampleData.pastor_lee;
let currentHighlightIdx = 0;
let isPlaying = false;

/* 2. Theme Toggle */
function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const icon = toggleBtn.querySelector('i');
        if (document.body.classList.contains('light-theme')) {
            icon.className = 'fa-solid fa-sun';
            showToast('라이트 모드로 전환되었습니다.');
        } else {
            icon.className = 'fa-solid fa-moon';
            showToast('다크 모드로 전환되었습니다.');
        }
    });
}

/* 3. Input Tab Switcher */
function initTabs() {
    const tabBtns = document.querySelectorAll('.input-tabs .tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const target = btn.dataset.target;
            document.querySelectorAll('.hero-input-box .tab-content').forEach(c => c.classList.remove('active'));
            document.getElementById(target).classList.add('active');
        });
    });

    const startBtn = document.getElementById('start-ai-youtube');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            const url = document.getElementById('youtube-url-input').value;
            if (!url) {
                showToast('유튜브 URL을 입력해주세요!', 'warning');
                return;
            }
            showToast('⚡ AI가 예배 풀영상 분석을 시작합니다...');
            setTimeout(() => {
                scrollToSection('studio');
                showToast('✨ AI 설교 구간 탐지 및 1분 쇼츠 생성 완료!');
            }, 1000);
        });
    }
}

/* 4. Load Sample Video Preset */
function loadSampleVideo(key) {
    if (!sampleData[key]) return;
    currentDataset = sampleData[key];
    currentHighlightIdx = 0;

    document.getElementById('current-project-title').textContent = `Project: ${currentDataset.title}`;
    document.getElementById('ai-status-text').textContent = `AI 설교 구간 추출 완료 (${currentDataset.length})`;

    // Re-render highlight cards
    const cards = document.querySelectorAll('.hl-card');
    cards.forEach((card, idx) => {
        const item = currentDataset.highlights[idx];
        if (item) {
            card.querySelector('.hl-badge').textContent = item.viral;
            card.querySelector('.hl-title').textContent = item.title;
            card.querySelector('.hl-quote').textContent = item.quote;
            card.querySelector('.hl-meta span:first-child').innerHTML = `<i class="fa-regular fa-clock"></i> ${item.time}`;
            card.querySelector('.hl-tag').textContent = item.tag;
        }
    });

    selectHighlight(0);
    scrollToSection('studio');
    showToast(`🎬 ${currentDataset.title} 샘플 데이터가 로드되었습니다.`);
}

/* 5. Highlight Card Selection */
function initStudioHighlights() {
    selectHighlight(0);
}

function selectHighlight(idx) {
    currentHighlightIdx = idx;
    const cards = document.querySelectorAll('.hl-card');
    cards.forEach((c, i) => {
        if (i === idx) c.classList.add('active');
        else c.classList.remove('active');
    });

    const currentItem = currentDataset.highlights[idx];
    if (currentItem) {
        document.getElementById('sub-bible-ref').textContent = currentItem.ref;
        document.getElementById('sub-text-box').innerHTML = currentItem.quote.replace(
            /(예수|믿음|하나님|기도|기적|성령|치유|십자가)/g,
            '<span class="highlight-word">$1</span>'
        );
    }
}

/* 6. Subtitle Style Preset Switcher */
function setSubtitleStyle(styleName) {
    const subBox = document.getElementById('sub-text-box');
    subBox.className = `sub-text-box style-${styleName}`;

    document.querySelectorAll('.preset-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    showToast(`자막 스타일이 '${getStyleTitle(styleName)}'(으)로 변경되었습니다.`);
}

function getStyleTitle(name) {
    const names = { neon: '네온 강조', modern: '깔끔 모던', classic: '클래식', box: '박스 자막' };
    return names[name] || name;
}

/* 7. Video Play/Pause Simulator */
function initPlaySimulation() {
    const playBtn = document.getElementById('phone-play-btn');
    const eqBars = document.querySelectorAll('.audio-equalizer span');

    // Pause equalizer by default
    eqBars.forEach(bar => bar.style.animationPlayState = 'paused');
}

function toggleShortsPlay() {
    isPlaying = !isPlaying;
    const icon = document.getElementById('phone-play-icon');
    const eqBars = document.querySelectorAll('.audio-equalizer span');
    const imgLayer = document.getElementById('preview-img-layer');

    if (isPlaying) {
        icon.className = 'fa-solid fa-pause';
        eqBars.forEach(bar => bar.style.animationPlayState = 'running');
        imgLayer.style.transform = 'scale(1.05)';
        showToast('▶️ 1분 은혜 쇼츠 미리보기 재생 중...');
    } else {
        icon.className = 'fa-solid fa-play';
        eqBars.forEach(bar => bar.style.animationPlayState = 'paused');
        imgLayer.style.transform = 'scale(1)';
        showToast('⏸️ 일시 정지');
    }
}

/* 8. Reference Screenshot Sidebar Navigation & Generators */
function initSeolgyoSidebarNav() {
    const navItems = document.querySelectorAll('.side-nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            const tabId = item.dataset.tab;
            document.querySelectorAll('.content-tab-pane').forEach(pane => pane.classList.remove('active'));
            const targetPane = document.getElementById(tabId);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
}

/* 6 Generators from Reference Screenshot */
function triggerGenerator(type) {
    switch (type) {
        case 'ppt':
            showToast('💻 [설교 PPT 다운로드] 16:9 빔프로젝터 템플릿(.pptx)이 자동 생성되었습니다!');
            break;
        case 'audio':
            showToast('🎧 [음성으로 듣기] AI 목회 오디오 팟캐스트 변환 완료! (재생 시작)');
            break;
        case 'family':
            showToast('🏡 [가정예배지 만들기] 주간 온가족 가정예배지 1장 PDF 다운로드 완료!');
            break;
        case 'review':
            showToast('✍️ [설교 점검·제안] AI 설교 가독성 및 메시지 명확도 점검 완료 (점수: 98점)');
            break;
        case 'leader':
            showToast('📄 [소그룹 리더가이드] 순장/구역장용 깊이 있는 나눔 팁 교안 생성 완료!');
            break;
        case 'versecard':
            showToast('🖼️ [말씀카드 이미지] 캘리그라피 모바일 말씀 카드 3종 이미지 생성 완료!');
            break;
        default:
            showToast('✨ 생성 요청이 완료되었습니다.');
    }
}

/* 9. Drag and Drop File Zone */
function initDropzone() {
    const dropzone = document.getElementById('dropzone');
    if (!dropzone) return;

    ['dragenter', 'dragover'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            dropzone.classList.add('dragover');
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            dropzone.classList.remove('dragover');
        });
    });

    dropzone.addEventListener('drop', (e) => {
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    });

    const fileInput = document.getElementById('file-input');
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileUpload(e.target.files[0]);
        }
    });
}

function triggerFileSelect() {
    document.getElementById('file-input').click();
}

function handleFileUpload(file) {
    showToast(`📂 파일 '${file.name}' 업로드 분석 중...`);
    setTimeout(() => {
        document.getElementById('current-project-title').textContent = `Project: ${file.name}`;
        scrollToSection('studio');
        showToast('✨ AI 설교 구간 탐지 및 1분 쇼츠 생성이 완료되었습니다!');
    }, 1200);
}

/* 10. Downloads & Copy Helpers */
function triggerShortsExport() {
    showToast('📥 1분 은혜 쇼츠 고화질 MP4 파일 다운로드를 시작합니다.');
}

function copySummaryText() {
    showToast('📋 설교 요약 및 3가지 대지 텍스트 복사 완료!');
}

function downloadSummaryDoc() {
    showToast('📄 설교 요약 워드 문서(.docx) 다운로드 완료!');
}

function copyCardNewsText() {
    showToast('📋 카드뉴스 캡션 텍스트가 클립보드에 복사되었습니다!');
}

function downloadCardNews() {
    showToast('📦 카드뉴스 이미지 5장 (.zip) 다운로드가 진행됩니다.');
}

function copyDocText() {
    showToast('📋 소그룹 나눔지 전체가 복사되었습니다!');
}

function downloadDoc(type) {
    showToast('📄 소그룹 교안 파일(.docx) 다운로드 완료!');
}

function copyQtText() {
    showToast('📱 성도 카톡 공유용 5일치 QT 텍스트가 복사되었습니다!');
}

function downloadQtPdf() {
    showToast('📕 주간 QT 소책자 PDF 파일이 다운로드됩니다.');
}

function copyScript() {
    showToast('📝 숏폼 비디오 대본 스크립트 복사 완료!');
}

/* 11. Utilities */
function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
    }
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    const toastIcon = document.getElementById('toast-icon');

    if (type === 'warning') {
        toastIcon.className = 'fa-solid fa-triangle-exclamation';
        toastIcon.style.color = '#f59e0b';
    } else {
        toastIcon.className = 'fa-solid fa-circle-check';
        toastIcon.style.color = '#10b981';
    }

    toastMsg.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3200);
}
