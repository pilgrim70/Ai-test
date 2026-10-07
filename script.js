/* ==========================================================================
   GraceClip AI - Full Interactive Studio & Program Suite Engine
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
    if (!toggleBtn) return;
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
            const targetEl = document.getElementById(target);
            if (targetEl) targetEl.classList.add('active');
        });
    });

    const startBtn = document.getElementById('start-ai-youtube');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            const urlInput = document.getElementById('youtube-url-input');
            const url = urlInput ? urlInput.value : '';
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

    const projTitle = document.getElementById('current-project-title');
    const aiStatus = document.getElementById('ai-status-text');
    if (projTitle) projTitle.textContent = `Project: ${currentDataset.title}`;
    if (aiStatus) aiStatus.textContent = `AI 설교 구간 추출 완료 (${currentDataset.length})`;

    // Re-render highlight cards
    const cards = document.querySelectorAll('.hl-card');
    cards.forEach((card, idx) => {
        const item = currentDataset.highlights[idx];
        if (item) {
            const badge = card.querySelector('.hl-badge');
            const title = card.querySelector('.hl-title');
            const quote = card.querySelector('.hl-quote');
            const metaTime = card.querySelector('.hl-meta span:first-child');
            const tag = card.querySelector('.hl-tag');

            if (badge) badge.textContent = item.viral;
            if (title) title.textContent = item.title;
            if (quote) quote.textContent = item.quote;
            if (metaTime) metaTime.innerHTML = `<i class="fa-regular fa-clock"></i> ${item.time}`;
            if (tag) tag.textContent = item.tag;
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
        const subRef = document.getElementById('sub-bible-ref');
        const subText = document.getElementById('sub-text-box');
        if (subRef) subRef.textContent = currentItem.ref;
        if (subText) {
            subText.innerHTML = currentItem.quote.replace(
                /(예수|믿음|하나님|기도|기적|성령|치유|십자가)/g,
                '<span class="highlight-word">$1</span>'
            );
        }
    }
}

/* 6. Subtitle Style Preset Switcher */
function setSubtitleStyle(styleName) {
    const subBox = document.getElementById('sub-text-box');
    if (subBox) subBox.className = `sub-text-box style-${styleName}`;

    document.querySelectorAll('.preset-btn').forEach(btn => btn.classList.remove('active'));
    if (window.event && window.event.target) window.event.target.classList.add('active');

    showToast(`자막 스타일이 '${getStyleTitle(styleName)}'(으)로 변경되었습니다.`);
}

function getStyleTitle(name) {
    const names = { neon: '네온 강조', modern: '깔끔 모던', classic: '클래식', box: '박스 자막' };
    return names[name] || name;
}

/* 7. Video Play/Pause Simulator */
function initPlaySimulation() {
    const eqBars = document.querySelectorAll('.audio-equalizer span');
    eqBars.forEach(bar => bar.style.animationPlayState = 'paused');
}

function toggleShortsPlay() {
    isPlaying = !isPlaying;
    const icon = document.getElementById('phone-play-icon');
    const eqBars = document.querySelectorAll('.audio-equalizer span');
    const imgLayer = document.getElementById('preview-img-layer');

    if (isPlaying) {
        if (icon) icon.className = 'fa-solid fa-pause';
        eqBars.forEach(bar => bar.style.animationPlayState = 'running');
        if (imgLayer) imgLayer.style.transform = 'scale(1.05)';
        showToast('▶️ 1분 은혜 쇼츠 미리보기 재생 중...');
    } else {
        if (icon) icon.className = 'fa-solid fa-play';
        eqBars.forEach(bar => bar.style.animationPlayState = 'paused');
        if (imgLayer) imgLayer.style.transform = 'scale(1)';
        showToast('⏸️ 일시 정지');
    }
}

/* 8. Reference Sidebar Navigation */
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

/* 9. Modal Management System */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// 6 Generators Popup Openers
function triggerGenerator(type) {
    switch (type) {
        case 'ppt':
            openModal('modal-ppt');
            showToast('💻 설교 PPT 슬라이드 프리뷰가 열렸습니다.');
            break;
        case 'audio':
            openModal('modal-audio');
            showToast('🎧 AI 음성 팟캐스트 플레이어가 열렸습니다.');
            break;
        case 'family':
            openModal('modal-family');
            showToast('🏡 온가족 가정예배지가 생성되었습니다.');
            break;
        case 'review':
            openModal('modal-review');
            showToast('✍️ AI 설교 진단 & 메시지 리포트가 열렸습니다.');
            break;
        case 'leader':
            openModal('modal-leader');
            showToast('📄 소그룹 순장/구역장 리더가이드가 열렸습니다.');
            break;
        case 'versecard':
            openModal('modal-versecard');
            showToast('🖼️ 캘리그라피 말씀카드 이미지 생성기가 열렸습니다.');
            break;
        default:
            showToast('✨ 해당 프로그램이 준비되었습니다.');
    }
}

/* 10. PPT Generator Modal Logic */
const pptSlides = [
    {
        title: "두려움을 이기는 담대한 믿음",
        body: `"풍랑을 보지 말고 물 위를 걸어오시는 예수 그리스도를 바라보라"`,
        ref: "마태복음 14:22~33",
        hdr: "은혜샘교회 주일 설교 (Slide 1/5)"
    },
    {
        title: "대지 1. 시선을 어디에 두는가?",
        body: `"베드로가 바람을 보았을 때 빠졌으나, 예수님께 시선을 고정했을 때 물 위를 걸었습니다."`,
        ref: "마태복음 14:28-30",
        hdr: "대지 1 슬라이드 (Slide 2/5)"
    },
    {
        title: "대지 2. 배 밖으로 발을 내딛으라",
        body: `"안전지대에만 머물면 기적을 경험할 수 없습니다. 주님의 말씀을 의지해 결단하십시오."`,
        ref: "마태복음 14:29",
        hdr: "대지 2 슬라이드 (Slide 3/5)"
    },
    {
        title: "대지 3. 빠져들 때 즉시 부르짖으라",
        body: `"의심으로 빠져들어갈 때 '주여 나를 구원하소서' 외치면 주님은 즉시 손을 내미십니다."`,
        ref: "마태복음 14:31",
        hdr: "대지 3 슬라이드 (Slide 4/5)"
    },
    {
        title: "결단과 기도",
        body: `"오늘 우리 삶의 파도 앞에서도 담대히 전진하는 믿음의 성도들이 되기를 축원합니다."`,
        ref: "아멘",
        hdr: "결단 슬라이드 (Slide 5/5)"
    }
];

let currPptIdx = 0;

function changePptSlide(delta) {
    currPptIdx = (currPptIdx + delta + pptSlides.length) % pptSlides.length;
    const slide = pptSlides[currPptIdx];

    document.getElementById('ppt-slide-hdr').textContent = slide.hdr;
    document.getElementById('ppt-slide-title').textContent = slide.title;
    document.getElementById('ppt-slide-body').textContent = slide.body;
    document.getElementById('ppt-slide-num').textContent = `${currPptIdx + 1} / ${pptSlides.length} Slide`;
}

function setPptTheme(themeName) {
    const canvas = document.getElementById('ppt-slide-canvas');
    if (canvas) canvas.className = `ppt-slide-canvas theme-${themeName}`;

    document.querySelectorAll('.ppt-theme-select .theme-chip').forEach(c => c.classList.remove('active'));
    if (window.event && window.event.target) window.event.target.classList.add('active');

    showToast(`PPT 템플릿 테마가 '${themeName.toUpperCase()}'(으)로 적용되었습니다.`);
}

/* 11. Audio Player Modal Logic */
let isModalAudioPlaying = false;
let audioProgressTimer = null;

function toggleModalAudioPlay() {
    isModalAudioPlaying = !isModalAudioPlaying;
    const btn = document.getElementById('modal-audio-play-icon');
    const wf = document.querySelectorAll('#waveform span');

    if (isModalAudioPlaying) {
        if (btn) btn.className = 'fa-solid fa-pause';
        wf.forEach(span => span.style.height = `${Math.floor(Math.random() * 30 + 10)}px`);
        audioProgressTimer = setInterval(() => {
            const prog = document.getElementById('audio-progress');
            if (prog) {
                let val = parseInt(prog.value) + 1;
                if (val > 100) val = 0;
                prog.value = val;
                const sec = Math.floor((val / 100) * 225);
                const minStr = String(Math.floor(sec / 60)).padStart(2, '0');
                const secStr = String(sec % 60).padStart(2, '0');
                const currTime = document.getElementById('audio-curr-time');
                if (currTime) currTime.textContent = `${minStr}:${secStr}`;
            }
            wf.forEach(span => span.style.height = `${Math.floor(Math.random() * 30 + 8)}px`);
        }, 1000);
        showToast('▶️ AI 음성 설교 팟캐스트 재생을 시작합니다.');
    } else {
        if (btn) btn.className = 'fa-solid fa-play';
        clearInterval(audioProgressTimer);
        showToast('⏸️ 오디오 일시정지');
    }
}

function changeVoiceTone() {
    const sel = document.getElementById('voice-select');
    const name = sel ? sel.options[sel.selectedIndex].text : '';
    showToast(`AI 음성 톤이 '${name}'(으)로 변경되었습니다.`);
}

function setAudioSpeed(speed) {
    document.querySelectorAll('.audio-speed-group .speed-btn').forEach(b => b.classList.remove('active'));
    if (window.event && window.event.target) window.event.target.classList.add('active');
    showToast(`재생 속도가 ${speed}배속으로 변경되었습니다.`);
}

function seekAudio(seconds) {
    showToast(`${seconds > 0 ? '+' : ''}${seconds}초 탐색`);
}

function scrubAudio(val) {
    const sec = Math.floor((val / 100) * 225);
    const minStr = String(Math.floor(sec / 60)).padStart(2, '0');
    const secStr = String(sec % 60).padStart(2, '0');
    const currTime = document.getElementById('audio-curr-time');
    if (currTime) currTime.textContent = `${minStr}:${secStr}`;
}

/* 12. Verse Card Canvas Logic */
function setVerseBg(theme) {
    const cvs = document.getElementById('versecard-canvas');
    if (cvs) cvs.className = `versecard-canvas bg-${theme}`;

    document.querySelectorAll('.vc-bg-select .vc-theme-btn').forEach(b => b.classList.remove('active'));
    if (window.event && window.event.target) window.event.target.classList.add('active');

    showToast(`말씀카드 배경 테마가 적용되었습니다.`);
}

/* 13. Inline Content Editor Logic */
function openEditModal() {
    const summaryTitle = document.querySelector('#tab-summary h2');
    const summaryText = document.querySelector('#tab-summary .pane-paper-view');

    if (summaryTitle && document.getElementById('edit-title-input')) {
        document.getElementById('edit-title-input').value = summaryTitle.textContent;
    }
    if (summaryText && document.getElementById('edit-content-input')) {
        document.getElementById('edit-content-input').value = summaryText.innerText;
    }
    openModal('modal-edit');
}

function saveEditedContent() {
    const titleVal = document.getElementById('edit-title-input').value;
    const contentVal = document.getElementById('edit-content-input').value;

    const summaryTitle = document.querySelector('#tab-summary h2');
    const summaryPaper = document.querySelector('#tab-summary .pane-paper-view');

    if (summaryTitle) summaryTitle.textContent = titleVal;
    if (summaryPaper) summaryPaper.innerText = contentVal;

    closeModal('modal-edit');
    showToast('✨ 수정된 설교 요약 내용이 저장되었습니다!');
}

/* 14. Real File Downloader & Helper Utilities */
function downloadFile(filename, content, contentType = 'text/plain;charset=utf-8') {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`📥 파일 '${filename}' 다운로드가 시작되었습니다!`);
}

function copyTextToClipboard(text, successMsg = '📋 클립보드에 복사되었습니다!') {
    navigator.clipboard.writeText(text).then(() => {
        showToast(successMsg);
    }).catch(() => {
        showToast('📋 텍스트가 복사되었습니다!');
    });
}

// Concrete Action Handlers for Buttons
function downloadPptFile() {
    const content = `[GraceClip AI] 설교 요약 PPT 템플릿\n제목: 두려움을 이기는 담대한 믿음\n본문: 마태복음 14:22~33\n\n대지 1: 풍랑이 아닌 주님의 말씀을 청종하라.\n대지 2: 의심을 버리고 순종의 발을 내딛으라.\n대지 3: 빠져들 때 즉시 구원의 주를 부르짖으라.`;
    downloadFile('GraceClip_설교요약_PPT.pptx', content);
}

function downloadMp3File() {
    downloadFile('GraceClip_AI_설교팟캐스트.mp3', 'AUDIO_BINARY_STREAM_SIMULATION');
}

function downloadFamilyPdf() {
    const text = document.getElementById('family-doc-print').innerText;
    downloadFile('GraceClip_가정예배지.pdf', text);
}

function downloadReviewReport() {
    const text = `[GraceClip AI] 설교 진단 & 메시지 강화 리포트\n종합 점수: 98점 (A+)\n- 메시지 명확성: 99점\n- 성경본문 연계성: 97점\n- 청중 적용성: 98점\n- 딜리버리 템포: 96점\n\n개선 제안:\n- 32분 14초 어조 강조 파트에서 5초간 묵음 포즈(Pause) 추천.`;
    downloadFile('GraceClip_설교진단리포트.pdf', text);
}

function downloadLeaderDoc() {
    const text = document.getElementById('leader-doc-print').innerText;
    downloadFile('GraceClip_소그룹_리더가이드.docx', text);
}

function copyLeaderDoc() {
    const text = document.getElementById('leader-doc-print').innerText;
    copyTextToClipboard(text, '📋 소그룹 리더가이드가 복사되었습니다!');
}

function downloadVerseImage() {
    downloadFile('GraceClip_캘리그라피_말씀카드.jpg', 'IMAGE_BINARY_DATA');
}

function printModalDoc(elementId) {
    const content = document.getElementById(elementId);
    if (!content) return;
    const printWin = window.open('', '', 'width=800,height=600');
    printWin.document.write(`<html><head><title>인쇄</title><style>body{font-family:sans-serif;padding:30px;line-height:1.6;}</style></head><body>${content.innerHTML}</body></html>`);
    printWin.document.close();
    printWin.focus();
    printWin.print();
    printWin.close();
}

function triggerShortsExport() {
    downloadFile('GraceClip_1분은혜쇼츠_HD.mp4', 'VIDEO_STREAM_DATA');
}

function copySummaryText() {
    const text = document.querySelector('#tab-summary .pane-paper-view').innerText;
    copyTextToClipboard(text, '📋 설교 요약 내용이 클립보드에 복사되었습니다!');
}

function downloadSummaryDoc() {
    const text = document.querySelector('#tab-summary .pane-paper-view').innerText;
    downloadFile('GraceClip_설교요약.docx', text);
}

function copyCardNewsText() {
    const text = `[두려움을 이기는 담대한 믿음]\n본문: 마태복음 14:22~33\n\n01. 시선을 바꾸십시오.\n02. 순종의 발을 내딛으십시오.\n03. 즉시 주를 부르짖으십시오.`;
    copyTextToClipboard(text, '📋 카드뉴스 캡션 문구가 복사되었습니다!');
}

function downloadCardNews() {
    downloadFile('GraceClip_카드뉴스_5장.zip', 'ZIP_DATA');
}

function copyDocText() {
    const text = document.querySelector('#tab-smallgroup .pane-paper-view').innerText;
    copyTextToClipboard(text, '📋 소그룹 나눔지 내용이 복사되었습니다!');
}

function downloadDoc(type) {
    const text = document.querySelector('#tab-smallgroup .pane-paper-view').innerText;
    downloadFile(`GraceClip_소그룹나눔지_${type}.docx`, text);
}

function copyQtText() {
    const text = `[주간 QT 5일치 모음]\n월요일: 마 14:22-25 밤사경의 오심\n화요일: 마 14:26-27 안심하라 나니\n수요일: 마 14:28-29 배 밖으로 발 내딛기\n목요일: 마 14:30-31 즉시 내민 손\n금요일: 마 14:32-33 잔잔해진 바다`;
    copyTextToClipboard(text, '📱 카톡 공유용 5일치 QT 텍스트가 복사되었습니다!');
}

function downloadQtPdf() {
    const text = document.querySelector('#tab-qt .qt-grid-view').innerText;
    downloadFile('GraceClip_주간QT_소책자.pdf', text);
}

function copyScript() {
    const text = document.querySelector('#tab-script .script-view-box').innerText;
    copyTextToClipboard(text, '📝 숏폼 비디오 대본 스크립트 복사 완료!');
}

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
    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                handleFileUpload(e.target.files[0]);
            }
        });
    }
}

function triggerFileSelect() {
    const fi = document.getElementById('file-input');
    if (fi) fi.click();
}

function handleFileUpload(file) {
    showToast(`📂 파일 '${file.name}' 업로드 분석 중...`);
    setTimeout(() => {
        const projTitle = document.getElementById('current-project-title');
        if (projTitle) projTitle.textContent = `Project: ${file.name}`;
        scrollToSection('studio');
        showToast('✨ AI 설교 구간 탐지 및 1분 쇼츠 생성이 완료되었습니다!');
    }, 1200);
}

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

    if (!toast || !toastMsg || !toastIcon) return;

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

/* ==========================================================================
   15. TopBar & Navigation Actions System
   ========================================================================== */
function openTopBarModal(type) {
    const titleEl = document.getElementById('topbar-modal-title');
    const bodyEl = document.getElementById('topbar-modal-body');

    if (!titleEl || !bodyEl) return;

    switch (type) {
        case 'happyday':
            titleEl.innerHTML = '<i class="fa-solid fa-gift orange-icon"></i> 🎁 Happy Day 특별 이벤트';
            bodyEl.innerHTML = `
                <div style="text-align: center; padding: 10px;">
                    <div style="font-size: 48px; margin-bottom: 12px;">🎉</div>
                    <h3 style="font-size: 20px; font-weight: 700; color: #1e293b; margin-bottom: 8px;">신규 회원 100% 당첨 혜택</h3>
                    <p style="color: #64748b; font-size: 14px; margin-bottom: 20px;">GraceClip AI & 모두의 게임 특별 프로모션 쿠폰이 지급되었습니다!</p>
                    <div style="background: #fff7ed; border: 2px dashed #f97316; border-radius: 12px; padding: 16px; margin-bottom: 20px;">
                        <span style="font-size: 12px; color: #ea580c; font-weight: 700; display: block; margin-bottom: 4px;">시크릿 쿠폰 코드</span>
                        <strong style="font-size: 22px; color: #c2410c; letter-spacing: 2px;">HAPPY-DAY-2026-FREE</strong>
                    </div>
                    <button class="btn btn-primary btn-full" onclick="copyTextToClipboard('HAPPY-DAY-2026-FREE', '🎁 쿠폰 코드가 복사되었습니다! 결제 시 등록하세요.'); closeModal('modal-topbar');">
                        <i class="fa-solid fa-copy"></i> 쿠폰 코드 복사하기
                    </button>
                </div>
            `;
            break;

        case 'api':
            titleEl.innerHTML = '<i class="fa-solid fa-key green-icon"></i> 🔑 Developer API Key 관리';
            bodyEl.innerHTML = `
                <div style="padding: 10px;">
                    <p style="color: #64748b; font-size: 13px; margin-bottom: 16px;">GraceClip AI 및 모두의 게임 엔드포인트를 외부 웹/앱 서비스에 연동하세요.</p>
                    <div style="margin-bottom: 16px;">
                        <label style="font-size: 12px; font-weight: 700; color: #334155; display: block; margin-bottom: 6px;">개인 API Key (v2 REST API)</label>
                        <div style="display: flex; gap: 8px;">
                            <input type="text" readonly value="gc_live_99f84a1204859bcde2026" style="flex: 1; background: #f1f5f9; border: 1px solid #cbd5e1; padding: 8px 12px; border-radius: 8px; font-family: monospace; font-size: 13px;">
                            <button class="btn btn-secondary" onclick="copyTextToClipboard('gc_live_99f84a1204859bcde2026', '🔑 API 키가 복사되었습니다!')">복사</button>
                        </div>
                    </div>
                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px; font-size: 12px; color: #475569;">
                        <strong>POST</strong> https://api.seolgyo-ai.com/v2/shorts/detect<br>
                        <strong>Header:</strong> Authorization: Bearer {YOUR_API_KEY}
                    </div>
                </div>
            `;
            break;

        case 'mypage':
            titleEl.innerHTML = '<i class="fa-solid fa-user blue-icon"></i> 👤 마이페이지 & 사역 대시보드';
            bodyEl.innerHTML = `
                <div style="padding: 10px;">
                    <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px; background: #f8fafc; padding: 16px; border-radius: 12px; border: 1px solid #e2e8f0;">
                        <div style="width: 50px; height: 50px; background: #2563eb; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 700;">목</div>
                        <div>
                            <h4 style="margin: 0; font-size: 16px; color: #0f172a;">이성훈 목사님</h4>
                            <span style="font-size: 12px; color: #64748b;">선한목자교회 미디어팀 · Pro 멤버십 사용 중</span>
                        </div>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px;">
                        <div style="background: #eff6ff; border: 1px solid #bfdbfe; padding: 12px; border-radius: 10px; text-align: center;">
                            <span style="font-size: 11px; color: #1d4ed8; font-weight: 700;">이번 달 생성 쇼츠</span>
                            <h3 style="margin: 4px 0 0 0; color: #1e40af;">42개</h3>
                        </div>
                        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 12px; border-radius: 10px; text-align: center;">
                            <span style="font-size: 11px; color: #15803d; font-weight: 700;">저장된 클라우드 용량</span>
                            <h3 style="margin: 4px 0 0 0; color: #166534;">18.4 GB</h3>
                        </div>
                    </div>
                </div>
            `;
            break;

        case 'logout':
            titleEl.innerHTML = '<i class="fa-solid fa-right-from-bracket red-icon"></i> ↪ 로그아웃';
            bodyEl.innerHTML = `
                <div style="text-align: center; padding: 16px;">
                    <p style="font-size: 15px; color: #334155; margin-bottom: 20px;">정말 로그아웃 하시겠습니까?<br><span style="font-size: 13px; color: #94a3b8;">작업 중인 쇼츠 프로젝트 데이터는 자동 저장됩니다.</span></p>
                    <div style="display: flex; gap: 10px; justify-content: center;">
                        <button class="btn btn-secondary" onclick="closeModal('modal-topbar')">취소</button>
                        <button class="btn btn-primary" style="background: #ef4444;" onclick="showToast('로그아웃 되었습니다.'); closeModal('modal-topbar');">로그아웃</button>
                    </div>
                </div>
            `;
            break;

        case 'subscription':
            titleEl.innerHTML = '<i class="fa-solid fa-crown purple-icon"></i> 👑 Pro 멤버십 구독 플랜';
            bodyEl.innerHTML = `
                <div style="padding: 10px;">
                    <div style="background: linear-gradient(135deg, #4f46e5, #9333ea); color: white; padding: 20px; border-radius: 16px; margin-bottom: 20px;">
                        <span style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.9;">CURRENT PLAN</span>
                        <h2 style="margin: 4px 0 8px 0; font-size: 24px;">Pro 목회자 패키지</h2>
                        <p style="margin: 0; font-size: 13px; opacity: 0.9;">무제한 4K 쇼츠 생성 + 미디어 사역 패키지 자동화</p>
                    </div>
                    <ul style="list-style: none; padding: 0; margin: 0 0 20px 0; font-size: 13px; color: #334155; display: flex; flex-direction: column; gap: 8px;">
                        <li><i class="fa-solid fa-check green-icon"></i> 4K/1080p 초고화질 무워터마크 비디오</li>
                        <li><i class="fa-solid fa-check green-icon"></i> 9:16 목사님 동선 AI 얼굴 오토트래킹</li>
                        <li><i class="fa-solid fa-check green-icon"></i> 모두의 게임 허브 무제한 플레이 권한</li>
                    </ul>
                </div>
            `;
            break;
    }

    openModal('modal-topbar');
}

/* ==========================================================================
   16. Game Category Showcase Modal System
   ========================================================================== */
const categoryGamesData = {
    arcade: {
        title: "🕹️ 아케이드 명작 컬렉션",
        games: [
            { title: "테트리스 프로", desc: "7-Bag SRS 회전 자작 엔진", icon: "🧱", gameId: "tetris" },
            { title: "갤러그 (Galaga)", desc: "레트로 우주 슈팅 클론", icon: "🚀", gameId: "galaga" },
            { title: "2048 퍼즐", desc: "숫자 합체 타일 게임", icon: "🔢", gameId: "slide" },
            { title: "브레이크아웃", desc: "벽돌깨기 아케이드", icon: "🏓", gameId: "galaga" },
            { title: "팩맨 클론", desc: "미로 스트리트 팩맨", icon: "🟡", gameId: "flappy" }
        ]
    },
    puzzle: {
        title: "🧩 퍼즐 & 두뇌 게임",
        games: [
            { title: "15 슬라이드 퍼즐", desc: "순서 맞추기 타일 퍼즐", icon: "🧩", gameId: "slide" },
            { title: "지뢰찾기 Pro", desc: "클래식 지뢰 탐지", icon: "💣", gameId: "slide" },
            { title: "오목 (Gomoku)", desc: "5단계 AI 대국", icon: "⚫", gameId: "gomoku" },
            { title: "메모리 매치", desc: "카드 짝 맞추기", icon: "🃏", gameId: "slide" }
        ]
    },
    board: {
        title: "♟️ 보드 & 카드 게임",
        games: [
            { title: "오목 (Gomoku)", desc: "15x15 5수 연속 완성", icon: "⚫", gameId: "gomoku" },
            { title: "장기 (Janggi)", desc: "9x10 전통 장기 대국", icon: "🔴", gameId: "janggi" },
            { title: "클래식 체스", desc: "AI 킹 체스 마스터", icon: "♟️", gameId: "janggi" },
            { title: "솔리테어", desc: "클래식 카드 게임", icon: "♠️", gameId: "slide" }
        ]
    },
    shooting: {
        title: "🚀 액션 & 슈팅 게임",
        games: [
            { title: "갤러그 (Galaga)", desc: "외계 침략자 퇴치 슈팅", icon: "🚀", gameId: "galaga" },
            { title: "스네이크 바이트", desc: "뱀 게임 클래식", icon: "🐍", gameId: "flappy" },
            { title: "아스테로이드", desc: "소행성 파괴 슈팅", icon: "☄️", gameId: "galaga" }
        ]
    },
    strategy: {
        title: "🏰 전략 & 시뮬레이션",
        games: [
            { title: "장기 (Janggi)", desc: "전략적 기물 전개 대국", icon: "🏰", gameId: "janggi" },
            { title: "오목 (Gomoku)", desc: "AI 착수 수읽기 대국", icon: "🎯", gameId: "gomoku" },
            { title: "타워 디펜스", desc: "적군 침략 방어막", icon: "🛡️", gameId: "galaga" }
        ]
    },
    casual: {
        title: "🍬 캐주얼 & 미니 게임",
        games: [
            { title: "플래피 짭새", desc: "파랑새 장애물 회피", icon: "🐥", gameId: "flappy" },
            { title: "공룡 달리기", desc: "사막 장애물 뛰어넘기", icon: "🦖", gameId: "flappy" },
            { title: "슬라이드 퍼즐", desc: "타임어택 퍼즐", icon: "🧩", gameId: "slide" }
        ]
    }
};

function openGameCategoryModal(category) {
    const data = categoryGamesData[category] || categoryGamesData.arcade;
    const titleEl = document.getElementById('category-modal-title');
    const gridEl = document.getElementById('category-games-grid');

    if (titleEl) titleEl.innerHTML = `<i class="fa-solid fa-gamepad blue-icon"></i> ${data.title}`;
    if (gridEl) {
        gridEl.innerHTML = data.games.map(g => `
            <div class="game-hub-card" onclick="closeModal('modal-game-category'); openGameModal('${g.gameId}');" style="background: #121724; border: 1px solid #1E2638; border-radius: 12px; padding: 16px; cursor: pointer; transition: all 0.2s;">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                    <span style="font-size: 24px;">${g.icon}</span>
                    <div>
                        <h4 style="margin: 0; font-size: 14px; color: #fff;">${g.title}</h4>
                        <span style="font-size: 10px; color: #10B981; font-weight: 700;">PLAY NOW</span>
                    </div>
                </div>
                <p style="font-size: 11px; color: #718096; margin: 0; line-height: 1.4;">${g.desc}</p>
            </div>
        `).join('');
    }

    openModal('modal-game-category');
}

/* ==========================================================================
   17. Unified Game Launcher Modal Routing
   ========================================================================== */
function openGameModal(gameId) {
    switch (gameId) {
        case 'tetris':
            openModal('modal-game-tetris');
            const mm = document.getElementById('main-menu');
            const gs = document.getElementById('game-screen');
            if (mm) { mm.classList.add('active'); mm.style.display = 'block'; }
            if (gs) { gs.classList.remove('active'); gs.style.display = 'none'; }
            showToast('🧩 테트리스 프로 엔진이 활성화되었습니다. 난이도 모드를 선택하세요!');
            break;
        case 'galaga':
            openModal('modal-game-galaga');
            initGalagaGame();
            showToast('🚀 갤러그 아케이드 슈팅 게임이 준비되었습니다!');
            break;
        case 'gomoku':
            openModal('modal-game-gomoku');
            initGomokuGame();
            showToast('⚫ 오목 15x15 AI 대국판이 초기화되었습니다!');
            break;
        case 'janggi':
            openModal('modal-game-janggi');
            initJanggiGame();
            showToast('🔴 장기 9x10 대국판이 준비되었습니다!');
            break;
        case 'slide':
            openModal('modal-game-slide');
            initSlidePuzzle();
            showToast('🧩 15 슬라이딩 퍼즐이 준비되었습니다!');
            break;
        case 'flappy':
            openModal('modal-game-flappy');
            initFlappyGame();
            showToast('🐥 플래피 짭새 게임이 준비되었습니다!');
            break;
        default:
            openModal('modal-game-tetris');
    }
}

function simulateTetrisKey(code) {
    const evt = new KeyboardEvent('keydown', { code: code, bubbles: true });
    window.dispatchEvent(evt);
}

/* ==========================================================================
   18. Galaga Retro 2D Canvas Space Shooter Engine
   ========================================================================== */
let galagaCtx, galagaLoopId;
let galagaPlayer = { x: 280, y: 370, w: 40, h: 30, speed: 8 };
let galagaBullets = [];
let galagaEnemies = [];
let galagaScore = 0;
let galagaLives = 3;
let galagaRunning = false;

function initGalagaGame() {
    const canvas = document.getElementById('galaga-canvas');
    if (!canvas) return;
    galagaCtx = canvas.getContext('2d');
    
    // Draw initial preview
    galagaCtx.fillStyle = '#030712';
    galagaCtx.fillRect(0, 0, 600, 420);
    
    // Draw Stars
    galagaCtx.fillStyle = '#ffffff';
    for (let i = 0; i < 50; i++) {
        galagaCtx.fillRect(Math.random() * 600, Math.random() * 420, 2, 2);
    }
    
    document.getElementById('galaga-overlay').style.display = 'flex';

    // Mouse movement & click shooting for Galaga
    canvas.onmousemove = (e) => {
        if (!galagaRunning) return;
        const rect = canvas.getBoundingClientRect();
        galagaPlayer.x = Math.max(10, Math.min(550, e.clientX - rect.left - 20));
    };
    canvas.onclick = () => {
        if (galagaRunning) galagaShoot();
    };
}

function startGalagaGame() {
    document.getElementById('galaga-overlay').style.display = 'none';
    galagaScore = 0;
    galagaLives = 3;
    galagaPlayer.x = 280;
    galagaBullets = [];
    galagaEnemies = [];
    galagaRunning = true;

    // Spawn 3 rows of enemies
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 8; c++) {
            galagaEnemies.push({
                x: 60 + c * 60,
                y: 40 + r * 40,
                w: 32,
                h: 24,
                alive: true,
                dir: 1
            });
        }
    }

    document.getElementById('galaga-score').textContent = galagaScore;
    document.getElementById('galaga-lives').textContent = '❤️'.repeat(galagaLives);

    if (galagaLoopId) cancelAnimationFrame(galagaLoopId);
    galagaLoop();
}

function galagaMoveLeft() { galagaPlayer.x = Math.max(10, galagaPlayer.x - 25); }
function galagaMoveRight() { galagaPlayer.x = Math.min(550, galagaPlayer.x + 25); }
function galagaShoot() {
    if (!galagaRunning) return;
    galagaBullets.push({ x: galagaPlayer.x + 18, y: galagaPlayer.y, speed: 12 });
}

window.addEventListener('keydown', (e) => {
    const galagaModal = document.getElementById('modal-game-galaga');
    if (galagaModal && galagaModal.classList.contains('active') && galagaRunning) {
        if (e.code === 'ArrowLeft') galagaMoveLeft();
        if (e.code === 'ArrowRight') galagaMoveRight();
        if (e.code === 'Space') galagaShoot();
    }
});

function galagaLoop() {
    if (!galagaRunning) return;

    galagaCtx.fillStyle = '#030712';
    galagaCtx.fillRect(0, 0, 600, 420);

    // Stars background
    galagaCtx.fillStyle = '#475569';
    for (let i = 0; i < 30; i++) {
        galagaCtx.fillRect((i * 37) % 600, (i * 23 + Date.now() * 0.05) % 420, 2, 2);
    }

    // Draw Player Ship
    galagaCtx.fillStyle = '#38bdf8';
    galagaCtx.beginPath();
    galagaCtx.moveTo(galagaPlayer.x + 20, galagaPlayer.y);
    galagaCtx.lineTo(galagaPlayer.x + 40, galagaPlayer.y + 30);
    galagaCtx.lineTo(galagaPlayer.x, galagaPlayer.y + 30);
    galagaCtx.closePath();
    galagaCtx.fill();

    // Update Bullets
    galagaCtx.fillStyle = '#f59e0b';
    galagaBullets.forEach((b, idx) => {
        b.y -= b.speed;
        galagaCtx.fillRect(b.x, b.y, 4, 12);
        if (b.y < 0) galagaBullets.splice(idx, 1);
    });

    // Update Enemies
    let aliveCount = 0;
    galagaEnemies.forEach(e => {
        if (!e.alive) return;
        aliveCount++;
        e.x += e.dir * 1.2;
        if (e.x > 540 || e.x < 20) e.dir *= -1;

        // Draw Alien Bug
        galagaCtx.fillStyle = '#ef4444';
        galagaCtx.fillRect(e.x, e.y, e.w, e.h);
        galagaCtx.fillStyle = '#fef08a';
        galagaCtx.fillRect(e.x + 6, e.y + 6, 6, 6);
        galagaCtx.fillRect(e.x + 20, e.y + 6, 6, 6);

        // Bullet Collision
        galagaBullets.forEach((b, bIdx) => {
            if (b.x >= e.x && b.x <= e.x + e.w && b.y >= e.y && b.y <= e.y + e.h) {
                e.alive = false;
                galagaBullets.splice(bIdx, 1);
                galagaScore += 100;
                document.getElementById('galaga-score').textContent = galagaScore;
            }
        });
    });

    if (aliveCount === 0) {
        galagaRunning = false;
        showToast('🎉 축하합니다! 갤러그 적을 모두 소탕했습니다!');
        document.getElementById('galaga-overlay').style.display = 'flex';
        return;
    }

    galagaLoopId = requestAnimationFrame(galagaLoop);
}

/* ==========================================================================
   19. Gomoku (오목) 15x15 AI Engine
   ========================================================================== */
let gomokuCtx;
let gomokuBoard = Array(15).fill(null).map(() => Array(15).fill(0));
let gomokuCurrentTurn = 1; // 1: Player (Black), 2: AI (White)
let gomokuGameOver = false;

function initGomokuGame() {
    const canvas = document.getElementById('gomoku-canvas');
    if (!canvas) return;
    gomokuCtx = canvas.getContext('2d');
    gomokuBoard = Array(15).fill(null).map(() => Array(15).fill(0));
    gomokuCurrentTurn = 1;
    gomokuGameOver = false;

    document.getElementById('gomoku-turn').innerHTML = '⚫ 흑돌 (당신의 차례)';
    document.getElementById('gomoku-status').textContent = '바둑판 교차점을 클릭하여 흑돌을 두세요.';

    drawGomokuBoard();

    canvas.onclick = (e) => {
        if (gomokuGameOver || gomokuCurrentTurn !== 1) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cellW = 480 / 16;
        const col = Math.round(x / cellW) - 1;
        const row = Math.round(y / cellW) - 1;

        if (col >= 0 && col < 15 && row >= 0 && row < 15 && gomokuBoard[row][col] === 0) {
            placeGomokuStone(row, col, 1);
            if (checkGomokuWin(row, col, 1)) {
                gomokuGameOver = true;
                document.getElementById('gomoku-status').textContent = '🎉 흑돌(당신)의 승리입니다!';
                showToast('🎉 오목 대국에서 승리하셨습니다!');
                return;
            }
            gomokuCurrentTurn = 2;
            document.getElementById('gomoku-turn').innerHTML = '⚪ 백돌 (AI 수읽기 중...)';
            setTimeout(playGomokuAI, 350);
        }
    };
}

function drawGomokuBoard() {
    gomokuCtx.fillStyle = '#d97706';
    gomokuCtx.fillRect(0, 0, 480, 480);

    const step = 480 / 16;
    gomokuCtx.strokeStyle = '#451a03';
    gomokuCtx.lineWidth = 1;

    for (let i = 1; i <= 15; i++) {
        gomokuCtx.beginPath();
        gomokuCtx.moveTo(step * i, step);
        gomokuCtx.lineTo(step * i, step * 15);
        gomokuCtx.stroke();

        gomokuCtx.beginPath();
        gomokuCtx.moveTo(step, step * i);
        gomokuCtx.lineTo(step * 15, step * i);
        gomokuCtx.stroke();
    }

    // Draw Stones
    for (let r = 0; r < 15; r++) {
        for (let c = 0; c < 15; c++) {
            if (gomokuBoard[r][c] !== 0) {
                gomokuCtx.beginPath();
                gomokuCtx.arc(step * (c + 1), step * (r + 1), step * 0.42, 0, Math.PI * 2);
                if (gomokuBoard[r][c] === 1) {
                    gomokuCtx.fillStyle = '#111827';
                    gomokuCtx.fill();
                } else {
                    gomokuCtx.fillStyle = '#f9fafb';
                    gomokuCtx.fill();
                    gomokuCtx.strokeStyle = '#9ca3af';
                    gomokuCtx.stroke();
                }
            }
        }
    }
}

function placeGomokuStone(row, col, player) {
    gomokuBoard[row][col] = player;
    drawGomokuBoard();
}

function checkGomokuWin(r, c, p) {
    const dirs = [[0,1], [1,0], [1,1], [1,-1]];
    for (let [dr, dc] of dirs) {
        let count = 1;
        for (let i = 1; i < 5; i++) {
            let nr = r + dr * i, nc = c + dc * i;
            if (nr >= 0 && nr < 15 && nc >= 0 && nc < 15 && gomokuBoard[nr][nc] === p) count++;
            else break;
        }
        for (let i = 1; i < 5; i++) {
            let nr = r - dr * i, nc = c - dc * i;
            if (nr >= 0 && nr < 15 && nc >= 0 && nc < 15 && gomokuBoard[nr][nc] === p) count++;
            else break;
        }
        if (count >= 5) return true;
    }
    return false;
}

function playGomokuAI() {
    if (gomokuGameOver) return;

    let targetR = -1, targetC = -1;

    // AI Check for winning move or blocking player
    for (let r = 0; r < 15 && targetR === -1; r++) {
        for (let c = 0; c < 15 && targetR === -1; c++) {
            if (gomokuBoard[r][c] === 0) {
                gomokuBoard[r][c] = 2;
                if (checkGomokuWin(r, c, 2)) { targetR = r; targetC = c; }
                gomokuBoard[r][c] = 0;
            }
        }
    }

    for (let r = 0; r < 15 && targetR === -1; r++) {
        for (let c = 0; c < 15 && targetR === -1; c++) {
            if (gomokuBoard[r][c] === 0) {
                gomokuBoard[r][c] = 1;
                if (checkGomokuWin(r, c, 1)) { targetR = r; targetC = c; }
                gomokuBoard[r][c] = 0;
            }
        }
    }

    if (targetR === -1) {
        let emptySpots = [];
        for (let r = 0; r < 15; r++) {
            for (let c = 0; c < 15; c++) {
                if (gomokuBoard[r][c] === 0) emptySpots.push({ r, c });
            }
        }
        if (emptySpots.length > 0) {
            const spot = emptySpots[Math.floor(Math.random() * emptySpots.length)];
            targetR = spot.r; targetC = spot.c;
        }
    }

    if (targetR !== -1 && targetC !== -1) {
        placeGomokuStone(targetR, targetC, 2);
        if (checkGomokuWin(targetR, targetC, 2)) {
            gomokuGameOver = true;
            document.getElementById('gomoku-status').textContent = '🤖 백돌(AI)의 승리입니다.';
            return;
        }
    }

    gomokuCurrentTurn = 1;
    document.getElementById('gomoku-turn').innerHTML = '⚫ 흑돌 (당신의 차례)';
}

/* ==========================================================================
   20. Playable Janggi (장기) Engine
   ========================================================================== */
let janggiCtx;
let janggiPieces = [];
let selectedJanggiIndex = -1;

function initJanggiGame() {
    const canvas = document.getElementById('janggi-canvas');
    if (!canvas) return;
    janggiCtx = canvas.getContext('2d');
    selectedJanggiIndex = -1;

    // Initialize 9x10 Board Pieces
    janggiPieces = [
        // 漢 Side (Blue / Top)
        { r: 0, c: 0, t: '車', side: 'han' }, { r: 0, c: 1, t: '馬', side: 'han' }, { r: 0, c: 2, t: '象', side: 'han' }, { r: 0, c: 3, t: '士', side: 'han' }, { r: 0, c: 5, t: '士', side: 'han' }, { r: 0, c: 6, t: '象', side: 'han' }, { r: 0, c: 7, t: '馬', side: 'han' }, { r: 0, c: 8, t: '車', side: 'han' },
        { r: 1, c: 4, t: '漢', side: 'han' },
        { r: 2, c: 1, t: '包', side: 'han' }, { r: 2, c: 7, t: '包', side: 'han' },
        { r: 3, c: 0, t: '卒', side: 'han' }, { r: 3, c: 2, t: '卒', side: 'han' }, { r: 3, c: 4, t: '卒', side: 'han' }, { r: 3, c: 6, t: '卒', side: 'han' }, { r: 3, c: 8, t: '卒', side: 'han' },

        // 楚 Side (Red / Bottom)
        { r: 9, c: 0, t: '車', side: 'cho' }, { r: 9, c: 1, t: '馬', side: 'cho' }, { r: 9, c: 2, t: '象', side: 'cho' }, { r: 9, c: 3, t: '士', side: 'cho' }, { r: 9, c: 5, t: '士', side: 'cho' }, { r: 9, c: 6, t: '象', side: 'cho' }, { r: 9, c: 7, t: '馬', side: 'cho' }, { r: 9, c: 8, t: '車', side: 'cho' },
        { r: 8, c: 4, t: '楚', side: 'cho' },
        { r: 7, c: 1, t: '包', side: 'cho' }, { r: 7, c: 7, t: '包', side: 'cho' },
        { r: 6, c: 0, t: '兵', side: 'cho' }, { r: 6, c: 2, t: '兵', side: 'cho' }, { r: 6, c: 4, t: '兵', side: 'cho' }, { r: 6, c: 6, t: '兵', side: 'cho' }, { r: 6, c: 8, t: '兵', side: 'cho' }
    ];

    drawJanggiBoard();

    canvas.onclick = (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const col = Math.round((x - 30) / 50);
        const row = Math.round((y - 25) / 50);

        if (col >= 0 && col < 9 && row >= 0 && row < 10) {
            const clickedIdx = janggiPieces.findIndex(p => p.r === row && p.c === col);
            if (clickedIdx !== -1) {
                selectedJanggiIndex = clickedIdx;
                document.getElementById('janggi-status').textContent = `'${janggiPieces[clickedIdx].t}' 기물이 선택되었습니다. 이동할 위치를 클릭하세요.`;
                drawJanggiBoard();
            } else if (selectedJanggiIndex !== -1) {
                janggiPieces[selectedJanggiIndex].r = row;
                janggiPieces[selectedJanggiIndex].c = col;
                document.getElementById('janggi-status').textContent = `'${janggiPieces[selectedJanggiIndex].t}' 기물이 (${row}, ${col}) 위치로 이동했습니다.`;
                selectedJanggiIndex = -1;
                drawJanggiBoard();
                showToast('⚔️ 장기 기물이 이동되었습니다!');
            }
        }
    };
}

function drawJanggiBoard() {
    janggiCtx.fillStyle = '#b45309';
    janggiCtx.fillRect(0, 0, 460, 500);

    janggiCtx.strokeStyle = '#451a03';
    janggiCtx.lineWidth = 1.5;

    // Grid lines
    for (let i = 0; i < 9; i++) {
        janggiCtx.beginPath();
        janggiCtx.moveTo(30 + i * 50, 25);
        janggiCtx.lineTo(30 + i * 50, 475);
        janggiCtx.stroke();
    }
    for (let i = 0; i < 10; i++) {
        janggiCtx.beginPath();
        janggiCtx.moveTo(30, 25 + i * 50);
        janggiCtx.lineTo(430, 25 + i * 50);
        janggiCtx.stroke();
    }

    // Draw Pieces
    janggiPieces.forEach((p, idx) => {
        const x = 30 + p.c * 50;
        const y = 25 + p.r * 50;
        const isSelected = (idx === selectedJanggiIndex);

        janggiCtx.fillStyle = isSelected ? '#fef08a' : '#fef3c7';
        janggiCtx.beginPath();
        janggiCtx.arc(x, y, 19, 0, Math.PI * 2);
        janggiCtx.fill();
        janggiCtx.strokeStyle = isSelected ? '#ef4444' : '#78350f';
        janggiCtx.lineWidth = isSelected ? 3 : 1.5;
        janggiCtx.stroke();

        janggiCtx.fillStyle = (p.side === 'han') ? '#1e3a8a' : '#dc2626';
        janggiCtx.font = 'bold 16px sans-serif';
        janggiCtx.textAlign = 'center';
        janggiCtx.textBaseline = 'middle';
        janggiCtx.fillText(p.t, x, y);
    });
}

/* ==========================================================================
   21. 15 Slide Puzzle Engine
   ========================================================================== */
let slideTiles = [];
let slideMoves = 0;

function initSlidePuzzle() {
    slideTiles = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0];
    slideMoves = 0;
    
    // Shuffle tiles
    for (let i = 0; i < 100; i++) {
        const emptyIdx = slideTiles.indexOf(0);
        const validMoves = getSlideValidMoves(emptyIdx);
        const randMove = validMoves[Math.floor(Math.random() * validMoves.length)];
        slideTiles[emptyIdx] = slideTiles[randMove];
        slideTiles[randMove] = 0;
    }

    renderSlidePuzzle();
}

function getSlideValidMoves(idx) {
    const moves = [];
    const r = Math.floor(idx / 4);
    const c = idx % 4;

    if (r > 0) moves.push(idx - 4);
    if (r < 3) moves.push(idx + 4);
    if (c > 0) moves.push(idx - 1);
    if (c < 3) moves.push(idx + 1);

    return moves;
}

function renderSlidePuzzle() {
    const gridEl = document.getElementById('slide-grid');
    if (!gridEl) return;

    document.getElementById('slide-moves').textContent = slideMoves;

    gridEl.innerHTML = slideTiles.map((val, idx) => `
        <div onclick="moveSlideTile(${idx})" style="
            background: ${val === 0 ? 'transparent' : '#3b82f6'};
            color: #fff;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            font-weight: 700;
            cursor: ${val === 0 ? 'default' : 'pointer'};
            box-shadow: ${val === 0 ? 'none' : '0 4px 10px rgba(0,0,0,0.3)'};
            transition: all 0.1s;
        ">
            ${val === 0 ? '' : val}
        </div>
    `).join('');
}

function moveSlideTile(idx) {
    const emptyIdx = slideTiles.indexOf(0);
    const validMoves = getSlideValidMoves(emptyIdx);

    if (validMoves.includes(idx)) {
        slideTiles[emptyIdx] = slideTiles[idx];
        slideTiles[idx] = 0;
        slideMoves++;
        renderSlidePuzzle();

        // Check Win
        if (slideTiles.join(',') === '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0') {
            showToast('🎉 퍼즐 완성! 15 슬라이딩 퍼즐을 해결하셨습니다!');
        }
    }
}

/* ==========================================================================
   22. Flappy Bird Engine
   ========================================================================== */
let flappyCtx, flappyLoopId;
let flappyBird = { y: 200, vel: 0, gravity: 0.5, jump: -8 };
let flappyPipes = [];
let flappyScore = 0;
let flappyRunning = false;

function initFlappyGame() {
    const canvas = document.getElementById('flappy-canvas');
    if (!canvas) return;
    flappyCtx = canvas.getContext('2d');

    flappyCtx.fillStyle = '#70c5ce';
    flappyCtx.fillRect(0, 0, 360, 480);

    document.getElementById('flappy-overlay').style.display = 'flex';
}

function startFlappyGame() {
    document.getElementById('flappy-overlay').style.display = 'none';
    flappyBird = { y: 200, vel: 0, gravity: 0.5, jump: -8 };
    flappyPipes = [];
    flappyScore = 0;
    flappyRunning = true;

    document.getElementById('flappy-score').textContent = 0;

    const canvas = document.getElementById('flappy-canvas');
    canvas.onclick = flappyJump;

    if (flappyLoopId) cancelAnimationFrame(flappyLoopId);
    flappyLoop();
}

function flappyJump() {
    if (!flappyRunning) return;
    flappyBird.vel = flappyBird.jump;
}

window.addEventListener('keydown', (e) => {
    const flappyModal = document.getElementById('modal-game-flappy');
    if (flappyModal && flappyModal.classList.contains('active') && e.code === 'Space') {
        flappyJump();
    }
});

function flappyLoop() {
    if (!flappyRunning) return;

    flappyCtx.fillStyle = '#70c5ce';
    flappyCtx.fillRect(0, 0, 360, 480);

    // Bird Physics
    flappyBird.vel += flappyBird.gravity;
    flappyBird.y += flappyBird.vel;

    // Draw Bird
    flappyCtx.fillStyle = '#f59e0b';
    flappyCtx.beginPath();
    flappyCtx.arc(80, flappyBird.y, 14, 0, Math.PI * 2);
    flappyCtx.fill();

    // Spawn Pipes
    if (flappyPipes.length === 0 || flappyPipes[flappyPipes.length - 1].x < 200) {
        const topH = Math.floor(Math.random() * 200) + 50;
        flappyPipes.push({ x: 360, topH: topH, gap: 120, passed: false });
    }

    // Update Pipes
    flappyCtx.fillStyle = '#22c55e';
    flappyPipes.forEach((p, idx) => {
        p.x -= 2;

        // Top Pipe
        flappyCtx.fillRect(p.x, 0, 50, p.topH);
        // Bottom Pipe
        flappyCtx.fillRect(p.x, p.topH + p.gap, 50, 480 - (p.topH + p.gap));

        // Score Check
        if (p.x < 80 && !p.passed) {
            p.passed = true;
            flappyScore++;
            document.getElementById('flappy-score').textContent = flappyScore;
        }

        // Collision Check
        if (p.x < 94 && p.x + 50 > 66) {
            if (flappyBird.y - 14 < p.topH || flappyBird.y + 14 > p.topH + p.gap) {
                flappyGameOver();
            }
        }
    });

    // Floor/Ceiling Collision
    if (flappyBird.y > 460 || flappyBird.y < 0) {
        flappyGameOver();
    }

    flappyLoopId = requestAnimationFrame(flappyLoop);
}

function flappyGameOver() {
    flappyRunning = false;
    document.getElementById('flappy-overlay').style.display = 'flex';
    showToast(`GAME OVER! 최종 점수: ${flappyScore}점`);
}

