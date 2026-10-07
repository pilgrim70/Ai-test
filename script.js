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
