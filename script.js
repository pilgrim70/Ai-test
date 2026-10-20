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
    gwanyu: {
        title: "26-10-11 관유중앙교회 주일예배 - 구조선의 청사진.mp4",
        length: "52분 04초 (설교 전편 0.1초 정밀 스캔 완료)",
        videoId: "fB-uX_pZZvs",
        highlights: [
            {
                id: "gwanyu-0",
                line1: "교회는 유람선인가",
                line2: "구조선인가",
                title: `"교회는 유람선인가 구조선인가"`,
                ref: "📖 마태복음 4:19",
                time: "01:10 ~ 02:10 (1분)",
                tag: "#구조선 #교회의본질 #사명",
                viral: "🔥 AI 추출 100점 (초특급 추천)",
                intent: "essence",
                intentBadge: "⛵ 비유와 본질",
                climaxScore: 100,
                peakDb: "98.5 dB",
                quote: `"교회는 편안히 먹고 즐기는 유람선이 아닙니다. 바다에 빠져 죽어가는 영혼을 건져내는 긴박한 구조선입니다."`,
                story: {
                    start: {
                        title: "1. 시작 (도입/화두)",
                        timeStr: "00:00 ~ 00:15 (15초)",
                        secOffset: 0,
                        text: "오늘 우리가 스스로에게 물어야 합니다. 교회는 과연 무엇을 위해 모인 곳입니까? 편안히 먹고 즐기는 유람선입니까?",
                        key: "교회는 유람선인가",
                        purpose: "청중의 마음을 두드리는 충격적인 질문과 화두 제기"
                    },
                    middle: {
                        title: "2. 중간 (전개/핵심)",
                        timeStr: "00:15 ~ 00:42 (27초)",
                        secOffset: 15,
                        text: "예수님이 세우신 교회는 결코 유람선이 아닙니다! 지금 이 순간에도 깊은 바다에 빠져 죽어가는 영혼을 건져내는 긴박한 '구조선'입니다.",
                        key: "영혼을 건지는 긴박한 구조선",
                        purpose: "유람선 vs 구조선 핵심 비유와 성경적 본질 선포"
                    },
                    end: {
                        title: "3. 결과 (강조/결단)",
                        timeStr: "00:42 ~ 01:00 (18초)",
                        secOffset: 42,
                        text: "편안한 자리에 머물지 말고, 죽어가는 영혼들을 향해 생명의 밧줄을 던지십시오! 주님의 구조선으로 다시 일어납시다!",
                        key: "생명의 밧줄을 던지라",
                        purpose: "가슴을 울리는 강력한 결단과 메시지 강조 마침"
                    }
                },
                rawScript: "어... 오늘 우리가, 음... 과연 스스로에게 물어봐야 합니다... 교회는, 그... 우리끼리 모여서 편안히 먹고 즐기는 유람선입니까? 어... 예수님이 세우신 교회는, 음... 결코 유람선이 아닙니다. 바다에 빠져서 허우적거리는... 어... 죽어가는 영혼을 건져내는 긴박한 구조선입니다. 편안한 자리에, 이제... 머물지 말고... 생명의 밧줄을, 어... 던지십시오!",
                cleanedScript: "오늘 우리가 스스로에게 물어야 합니다. 교회는 과연 무엇을 위해 모인 곳입니까? 편안히 먹고 즐기는 유람선입니까? 예수님이 세우신 교회는 결코 유람선이 아닙니다. 지금 이 순간에도 깊은 바다에 빠져 죽어가는 영혼을 건져내는 긴박한 구조선입니다. 편안한 자리에 머물지 말고, 죽어가는 영혼들을 향해 생명의 밧줄을 던지십시오!",
                cutStats: {
                    fillerRemoved: 14,
                    fillerTypes: "음~ (5회), 어~ (6회), 그... (3회)",
                    silenceCutSec: "4.8초",
                    originalLength: "64.8초",
                    optimizedLength: "60.0초",
                    clarityBoost: "+38%"
                }
            },
            {
                id: "gwanyu-1",
                line1: "구조선의 청사진",
                line2: "예수님이 세우신 설계도",
                title: `"구조선의 청사진 예수님이 세우신 설계도"`,
                ref: "📖 마태복음 16:18",
                time: "05:40 ~ 06:40 (1분)",
                tag: "#설계도 #교회 #예수님",
                viral: "✨ 은혜/도전 강추 (99점)",
                intent: "essence",
                intentBadge: "⛵ 비유와 본질",
                climaxScore: 99,
                peakDb: "96.8 dB",
                quote: `"주님이 이 땅에 세우신 교회의 원래 설계도는 바로 죽어가는 영혼을 살려내는 구조선의 청사진이었습니다."`,
                story: {
                    start: {
                        title: "1. 시작 (도입/화두)",
                        timeStr: "00:00 ~ 00:14 (14초)",
                        secOffset: 0,
                        text: "우리가 짓고 있는 이 교회는 누구의 뜻대로 세워지고 있습니까? 사람의 기호입니까, 주님의 설계도입니까?",
                        key: "누구의 설계도인가",
                        purpose: "교회의 본질에 대한 엄중한 질문으로 주의 집중"
                    },
                    middle: {
                        title: "2. 중간 (전개/핵심)",
                        timeStr: "00:14 ~ 00:41 (27초)",
                        secOffset: 14,
                        text: "주님이 반석 위에 세우신 교회의 원래 청사진은 바로 죽어가는 영혼을 살려내는 구조선의 설계도였습니다.",
                        key: "구조선의 청사진",
                        purpose: "마태복음 16:18 본문에 기초한 주님의 원형 교회 제시"
                    },
                    end: {
                        title: "3. 결과 (강조/결단)",
                        timeStr: "00:41 ~ 01:00 (19초)",
                        secOffset: 41,
                        text: "사람의 생각이 아니라 주님의 원래 청사진으로 돌아갑시다! 잃어버린 영혼을 향해 출항하는 살아있는 교회가 됩시다!",
                        key: "주님의 청사진으로 돌아가라",
                        purpose: "본질 회복을 촉구하는 강력한 권면과 마침"
                    }
                },
                rawScript: "음... 우리가 짓고 있는 교회는, 어... 누구의 설계도입니까? 그... 사람의 기호입니까? 주님이 세우신 원래, 어... 청사진은 바로... 음... 구조선이었습니다. 사람의 생각이 아니라, 이제... 주님의 청사진으로, 어... 돌아갑시다!",
                cleanedScript: "우리가 짓고 있는 이 교회는 누구의 뜻대로 세워지고 있습니까? 사람의 기호입니까, 주님의 설계도입니까? 주님이 반석 위에 세우신 교회의 원래 청사진은 바로 죽어가는 영혼을 살려내는 구조선의 설계도였습니다. 주님의 원래 청사진으로 돌아갑시다!",
                cutStats: {
                    fillerRemoved: 12,
                    fillerTypes: "음~ (4회), 어~ (5회), 그... (3회)",
                    silenceCutSec: "4.2초",
                    originalLength: "64.2초",
                    optimizedLength: "60.0초",
                    clarityBoost: "+35%"
                }
            },
            {
                id: "gwanyu-2",
                line1: "바다에 빠진 자를 보라",
                line2: "우리를 부르신 긴급한 이유",
                title: `"바다에 빠진 자를 보라 우리를 부르신 긴급한 이유"`,
                ref: "📖 디모데전서 2:4",
                time: "11:15 ~ 12:15 (1분)",
                tag: "#영혼구원 #긴급사명 #전도",
                viral: "📱 SNS 공유 폭발 (98점)",
                intent: "soul",
                intentBadge: "💔 한 영혼의 가치",
                climaxScore: 98,
                peakDb: "97.2 dB",
                quote: `"파도에 휩쓸려 허우적거리는 사람을 보고도 그냥 지나칠 수 있습니까? 하나님이 우리를 먼저 구원하신 이유는 건져내라는 것입니다."`,
                story: {
                    start: {
                        title: "1. 시작 (도입/화두)",
                        timeStr: "00:00 ~ 00:15 (15초)",
                        secOffset: 0,
                        text: "저 거센 파도에 휩쓸려 허우적거리는 사람을 보고도 그냥 지나칠 수 있습니까? 당신 곁의 영혼이 신음하고 있습니다.",
                        key: "바다에 빠진 자를 보라",
                        purpose: "청중 주변 이웃의 고통과 영적 현실을 직시하게 함"
                    },
                    middle: {
                        title: "2. 중간 (전개/핵심)",
                        timeStr: "00:15 ~ 00:40 (25초)",
                        secOffset: 15,
                        text: "하나님이 우리를 먼저 죄악의 바다에서 건져내신 이유는 자랑하라는 것이 아닙니다. 빠져 죽어가는 저 사람을 건져내라는 구조대원의 명령입니다.",
                        key: "우리를 먼저 구원하신 이유",
                        purpose: "구원의 은혜가 사명으로 이어지는 성경적 원리 설명"
                    },
                    end: {
                        title: "3. 결과 (강조/결단)",
                        timeStr: "00:40 ~ 01:00 (20초)",
                        secOffset: 40,
                        text: "결코 외면하지 마십시오! 지금 당신의 손에 들린 복음의 밧줄을 던져 죽어가는 저 영혼을 살려내십시오!",
                        key: "복음의 밧줄을 던지라",
                        purpose: "행동하는 구원 사역으로의 가슴 벅찬 결단 마무리"
                    }
                },
                rawScript: "어... 저 파도에 휩쓸려 허우적거리는 사람을, 음... 보고도 그냥 지나칠 수 있습니까? 하나님이 우리를, 그... 먼저 구원하신 이유는... 어... 자랑하라는 게 아닙니다. 건져내라는 구조대원의, 음... 사명입니다. 결코 외면하지 마시고, 어... 복음의 밧줄을 던지십시오!",
                cleanedScript: "저 거센 파도에 휩쓸려 허우적거리는 사람을 보고도 그냥 지나칠 수 있습니까? 하나님이 우리를 먼저 구원하신 이유는 건져내라는 구조대원의 사명 때문입니다. 결코 외면하지 마십시오! 지금 당신의 손에 들린 복음의 밧줄을 던져 저 영혼을 살려내십시오!",
                cutStats: {
                    fillerRemoved: 15,
                    fillerTypes: "음~ (6회), 어~ (6회), 그... (3회)",
                    silenceCutSec: "5.1초",
                    originalLength: "65.1초",
                    optimizedLength: "60.0초",
                    clarityBoost: "+40%"
                }
            },
            {
                id: "gwanyu-3",
                line1: "함장이신 주님의 명령",
                line2: "바다로 닻을 올리라",
                title: `"함장이신 주님의 명령 바다로 닻을 올리라"`,
                ref: "📖 요한복음 14:15",
                time: "16:30 ~ 17:30 (1분)",
                tag: "#함장 #예수님 #순종",
                viral: "🔥 결단 강추 (99점)",
                intent: "challenge",
                intentBadge: "⚔️ 안전지대 탈출",
                climaxScore: 99,
                peakDb: "97.8 dB",
                quote: `"배의 선장, 함장이신 예수 그리스도의 지휘 아래 전 대원이 한마음으로 거친 파도를 향해 생명줄을 던져야 합니다."`,
                story: {
                    start: {
                        title: "1. 시작 (도입/화두)",
                        timeStr: "00:00 ~ 00:14 (14초)",
                        secOffset: 0,
                        text: "이 교회의 진짜 선장과 함장은 누구입니까? 목사입니까? 사람입니까? 오직 예수 그리스도이십니다!",
                        key: "함장은 오직 예수 그리스도",
                        purpose: "교회의 최고 지휘관이 주님이심을 확고히 선언"
                    },
                    middle: {
                        title: "2. 중간 (전개/핵심)",
                        timeStr: "00:14 ~ 00:42 (28초)",
                        secOffset: 14,
                        text: "함장이신 주님이 지금 바다로 출항하라고 명령하십니다! 선원들이 편하자고 안전한 항구에만 묶여 있으면 그 배는 결국 부식되어 침몰합니다.",
                        key: "바다로 출항하라는 명령",
                        purpose: "안일함에 빠진 신앙을 깨우는 준엄한 명령 전개"
                    },
                    end: {
                        title: "3. 결과 (강조/결단)",
                        timeStr: "00:42 ~ 01:00 (18초)",
                        secOffset: 42,
                        text: "함장의 명령 앞에 모든 대원이 하나 되어 닻을 올립시다! 거친 파도를 뚫고 생명의 바다로 나아갑시다!",
                        key: "닻을 올리고 나아가라",
                        purpose: "전 성도의 일치된 순종과 담대한 결단 촉구"
                    }
                },
                rawScript: "음... 이 배의 진짜 함장은, 어... 누구입니까? 목사입니까? 그... 아닙니다. 오직 예수님이십니다. 함장이신 예수님이, 어... 바다로 나가라고 명령하십니다. 항구에만, 음... 편하게 묶여 있으면 썩어버립니다. 함장의 명령 앞에, 이제... 닻을 올리고, 어... 바다로 나아갑시다!",
                cleanedScript: "이 교회의 진짜 함장은 누구입니까? 오직 예수 그리스도이십니다! 함장이신 주님이 지금 바다로 출항하라고 명령하십니다. 안전한 항구에만 머물러 있으면 배는 썩고 맙니다. 함장의 명령 앞에 전 대원이 하나 되어 닻을 올리고 생명의 바다로 나아갑시다!",
                cutStats: {
                    fillerRemoved: 11,
                    fillerTypes: "음~ (4회), 어~ (5회), 그... (2회)",
                    silenceCutSec: "3.9초",
                    originalLength: "63.9초",
                    optimizedLength: "60.0초",
                    clarityBoost: "+32%"
                }
            },
            {
                id: "gwanyu-4",
                line1: "풍랑 이는 세상 바다",
                line2: "영혼의 닻 예수 그리스도",
                title: `"풍랑 이는 세상 바다 영혼의 닻 예수 그리스도"`,
                ref: "📖 히브리서 6:19",
                time: "22:15 ~ 23:15 (1분)",
                tag: "#믿음의닻 #위로 #소망",
                viral: "✨ 영적회복 추천 (98점)",
                intent: "comfort",
                intentBadge: "👑 풍랑 속 소망",
                climaxScore: 98,
                peakDb: "96.5 dB",
                quote: `"세상의 어떤 거센 풍랑도, 깊은 절망의 파도도 예수 그리스도라는 견고한 닻을 내린 영혼은 결코 침몰하지 않습니다."`,
                story: {
                    start: {
                        title: "1. 시작 (도입/화두)",
                        timeStr: "00:00 ~ 00:15 (15초)",
                        secOffset: 0,
                        text: "인생의 거친 풍랑 앞에서 침몰할 것 같은 극심한 두려움과 절망에 떨고 계십니까? 파도만 보면 두렵습니다.",
                        key: "풍랑 앞의 두려움",
                        purpose: "고난과 시련 속에 있는 성도들의 아픔을 깊이 위로하고 공감"
                    },
                    middle: {
                        title: "2. 중간 (전개/핵심)",
                        timeStr: "00:15 ~ 00:42 (27초)",
                        secOffset: 15,
                        text: "그러나 예수 그리스도라는 견고한 영혼의 닻을 내린 영혼은, 세상의 어떤 거센 폭풍우 속에서도 결코 침몰하지 않습니다!",
                        key: "견고한 영혼의 닻 예수",
                        purpose: "히브리서 6:19의 언약의 닻을 통해 흔들리지 않는 믿음 심어줌"
                    },
                    end: {
                        title: "3. 결과 (강조/결단)",
                        timeStr: "00:42 ~ 01:00 (18초)",
                        secOffset: 42,
                        text: "파도를 보지 말고 닻이신 주님을 보십시오! 주께서 당신을 평안의 항구로 반드시 인도하실 것입니다!",
                        key: "평안의 항구로 인도하심",
                        purpose: "하늘의 평강과 영원한 소망으로 감동적인 축복 마침"
                    }
                },
                rawScript: "어... 인생의 풍랑 앞에서, 음... 침몰할 것 같은 두려움에, 그... 떨고 계십니까? 파도만 보면, 어... 무섭습니다. 그러나 예수 그리스도라는, 음... 견고한 닻을 내린 자는... 어... 결코 가라앉지 않습니다. 파도를 보지 말고, 이제... 주님을 보십시오! 평안의 항구로 인도하십니다!",
                cleanedScript: "인생의 거친 풍랑 앞에서 침몰할 것 같은 극심한 두려움에 떨고 계십니까? 그러나 예수 그리스도라는 견고한 영혼의 닻을 내린 영혼은 세상의 어떤 폭풍우 속에서도 결코 침몰하지 않습니다. 파도를 보지 말고 닻이신 주님을 보십시오! 주께서 평안의 항구로 반드시 인도하십니다!",
                cutStats: {
                    fillerRemoved: 13,
                    fillerTypes: "음~ (4회), 어~ (6회), 그... (3회)",
                    silenceCutSec: "4.5초",
                    originalLength: "64.5초",
                    optimizedLength: "60.0초",
                    clarityBoost: "+36%"
                }
            },
            {
                id: "gwanyu-5",
                line1: "한 영혼을 향한 눈물",
                line2: "구조대원의 거룩한 심장",
                title: `"한 영혼을 향한 눈물 구조대원의 거룩한 심장"`,
                ref: "📖 누가복음 15:7",
                time: "27:50 ~ 28:50 (1분)",
                tag: "#한영혼 #목자의심정 #눈물",
                viral: "🔥 AI 추출 99점",
                intent: "soul",
                intentBadge: "💔 한 영혼의 가치",
                climaxScore: 99,
                peakDb: "98.2 dB",
                quote: `"잃어버린 한 마리 양, 바다 속으로 가라앉는 단 한 사람을 위해 자신의 생명을 던지는 예수 그리스도의 심장이 오늘 우리 안에 있습니까?"`,
                story: {
                    start: {
                        title: "1. 시작 (도입/화두)",
                        timeStr: "00:00 ~ 00:14 (14초)",
                        secOffset: 0,
                        text: "자식을 바다에 잃어버린 부모가 편안히 잠을 잘 수 있겠습니까? 하나님의 마음이 바로 그렇습니다.",
                        key: "잃어버린 자식을 향한 심정",
                        purpose: "하나님 아버지의 타는 듯한 애통한 마음을 전달"
                    },
                    middle: {
                        title: "2. 중간 (전개/핵심)",
                        timeStr: "00:14 ~ 00:40 (26초)",
                        secOffset: 14,
                        text: "물속으로 가라앉는 단 한 사람을 위해 십자가에서 목숨을 내던지신 예수 그리스도의 심장이 오늘 우리 안에 회복되어야 합니다.",
                        key: "목자의 심장 회복",
                        purpose: "한 영혼의 천하보다 귀한 무게를 감동적으로 설파"
                    },
                    end: {
                        title: "3. 결과 (강조/결단)",
                        timeStr: "00:40 ~ 01:00 (20초)",
                        secOffset: 40,
                        text: "그 한 사람을 위해 눈물로 손을 내미십시오! 생명을 아끼지 않고 건져 올리는 진짜 구조대원이 됩시다!",
                        key: "눈물의 구조대원이 되라",
                        purpose: "한 영혼을 향한 뜨거운 헌신과 눈물의 결단 마침"
                    }
                },
                rawScript: "음... 자식을 바다에 잃은 부모가, 어... 편안히 잘 수 있습니까? 그... 하나님의 심정이 그렇습니다. 가라앉는 단 한 사람을 위해, 어... 십자가에 목숨을 버리신 예수님의 심장이... 음... 우리 안에 있어야 합니다. 그 한 사람을 위해, 이제... 눈물로 손을 내미는, 어... 구조대원이 됩시다!",
                cleanedScript: "자식을 바다에 잃어버린 부모가 편안히 잠을 잘 수 있겠습니까? 하나님의 심정이 바로 그렇습니다. 물속으로 가라앉는 단 한 사람을 위해 십자가에서 목숨을 내던지신 예수 그리스도의 심장이 회복되어야 합니다. 그 한 사람을 위해 눈물로 손을 내미는 진짜 구조대원이 됩시다!",
                cutStats: {
                    fillerRemoved: 16,
                    fillerTypes: "음~ (5회), 어~ (7회), 그... (4회)",
                    silenceCutSec: "5.4초",
                    originalLength: "65.4초",
                    optimizedLength: "60.0초",
                    clarityBoost: "+41%"
                }
            },
            {
                id: "gwanyu-6",
                line1: "안전지대에 머물지 말라",
                line2: "일어나 거친 파도로",
                title: `"안전지대에 머물지 말라 일어나 거친 파도로"`,
                ref: "📖 이사야 6:8",
                time: "33:40 ~ 34:40 (1분)",
                tag: "#출항 #도전 #안전지대탈출",
                viral: "📱 청년/헌신 강추 (97점)",
                intent: "challenge",
                intentBadge: "⚔️ 안전지대 탈출",
                climaxScore: 97,
                peakDb: "97.5 dB",
                quote: `"항구 안에 묶여있는 배는 안전하지만, 그것은 배의 목적이 아닙니다. 구조선은 파도가 가장 높은 곳으로 출항해야 합니다."`,
                story: {
                    start: {
                        title: "1. 시작 (도입/화두)",
                        timeStr: "00:00 ~ 00:14 (14초)",
                        secOffset: 0,
                        text: "항구 안에 밧줄로 묶여 있는 배는 안전합니다. 하지만 그것은 구조선이 만들어진 목적이 아닙니다.",
                        key: "항구 안의 거짓 평안",
                        purpose: "안락함 속에 안주하려는 태도를 날카롭게 지적"
                    },
                    middle: {
                        title: "2. 중간 (전개/핵심)",
                        timeStr: "00:14 ~ 00:41 (27초)",
                        secOffset: 14,
                        text: "구조선은 파도가 가장 거세게 치는 곳, 영혼들이 살려달라고 비명을 지르는 가장 위험한 바다로 출항해야 합니다!",
                        key: "거친 파도로 출항하라",
                        purpose: "배의 본질적 사명과 복음의 현장성을 강조"
                    },
                    end: {
                        title: "3. 결과 (강조/결단)",
                        timeStr: "00:41 ~ 01:00 (19초)",
                        secOffset: 41,
                        text: "안전지대에서 일어나십시오! 주님이 가라 하시는 거친 세상 바다를 향해 담대히 출항합시다!",
                        key: "담대히 출항하라",
                        purpose: "안전지대를 박차고 나아가는 역동적 사명 결단"
                    }
                },
                rawScript: "어... 항구 안에 묶인 배는, 음... 안전하지만 배의 목적이 아닙니다. 구조선은, 그... 파도가 가장 높은 곳으로... 어... 나가야 합니다. 비명을 지르는 곳으로 출항해야 합니다. 안전지대에, 이제... 머물지 말고 일어나서... 어... 거친 바다로 출항합시다!",
                cleanedScript: "항구 안에 묶여 있는 배는 안전합니다. 하지만 그것은 구조선의 목적이 아닙니다. 구조선은 파도가 가장 높은 곳, 영혼들이 비명을 지르는 바다로 출항해야 합니다. 안락한 안전지대에서 일어나 주님이 명하시는 거친 세상 바다로 담대히 출항합시다!",
                cutStats: {
                    fillerRemoved: 14,
                    fillerTypes: "음~ (4회), 어~ (6회), 그... (4회)",
                    silenceCutSec: "4.7초",
                    originalLength: "64.7초",
                    optimizedLength: "60.0초",
                    clarityBoost: "+37%"
                }
            },
            {
                id: "gwanyu-7",
                line1: "어둠을 밝히는 등대",
                line2: "생명의 빛을 비추라",
                title: `"어둠을 밝히는 등대 생명의 빛을 비추라"`,
                ref: "📖 마태복음 5:14",
                time: "39:20 ~ 40:20 (1분)",
                tag: "#세상의빛 #등대 #생명",
                viral: "✨ 은혜 선포 (98점)",
                intent: "essence",
                intentBadge: "⛵ 비유와 본질",
                climaxScore: 98,
                peakDb: "96.9 dB",
                quote: `"칠흑 같은 밤바다에서 길을 잃은 자들에게 유일한 희망은 빛입니다. 교회가 빛을 발할 때 수많은 영혼이 살아 돌아옵니다."`,
                story: {
                    start: {
                        title: "1. 시작 (도입/화두)",
                        timeStr: "00:00 ~ 00:15 (15초)",
                        secOffset: 0,
                        text: "칠흑 같은 어두운 밤바다에서 등대 불이 꺼져버리면 어떤 일이 벌어집니까? 배들은 길을 잃고 침몰합니다.",
                        key: "등대 불이 꺼지면",
                        purpose: "세상의 어둠 속에서 등대의 절대적 중요성 상기"
                    },
                    middle: {
                        title: "2. 중간 (전개/핵심)",
                        timeStr: "00:15 ~ 00:42 (27초)",
                        secOffset: 15,
                        text: "교회는 세상의 암흑을 가르는 생명의 등대입니다. 교회가 복음의 빛을 비출 때 수많은 절망의 영혼이 살아 돌아옵니다.",
                        key: "교회는 생명의 등대",
                        purpose: "마태복음 5장 '너희는 세상의 빛이라' 말씀 선포"
                    },
                    end: {
                        title: "3. 결과 (강조/결단)",
                        timeStr: "00:42 ~ 01:00 (18초)",
                        secOffset: 42,
                        text: "당신의 가정과 일터에서 복음의 빛을 비추십시오! 길 잃은 자들을 인도하는 하나님의 환한 등대가 됩시다!",
                        key: "생명의 빛을 비추라",
                        purpose: "빛된 사명자로서의 구체적 삶의 적용과 마침"
                    }
                },
                rawScript: "음... 칠흑 같은 밤바다에, 어... 등대 불이 꺼지면 어떻게 됩니까? 배들이 전부, 그... 암초에 부딪힙니다. 교회는, 어... 세상의 빛입니다. 복음의 빛을 비출 때... 음... 영혼들이 살아납니다. 빛을 숨기지 말고, 이제... 삶의 자리에서, 어... 생명의 빛을 비추십시오!",
                cleanedScript: "칠흑 같은 밤바다에서 등대 불이 꺼져버리면 배들은 길을 잃고 침몰합니다. 교회는 세상의 암흑을 가르는 생명의 등대입니다. 교회가 복음의 빛을 비출 때 수많은 영혼이 살아 돌아옵니다. 당신의 삶의 자리에서 생명의 빛을 환하게 비추십시오!",
                cutStats: {
                    fillerRemoved: 12,
                    fillerTypes: "음~ (4회), 어~ (5회), 그... (3회)",
                    silenceCutSec: "4.0초",
                    originalLength: "64.0초",
                    optimizedLength: "60.0초",
                    clarityBoost: "+33%"
                }
            },
            {
                id: "gwanyu-8",
                line1: "골든타임을 놓치지 말라",
                line2: "지금이 바로 은혜의 때",
                title: `"골든타임을 놓치지 말라 지금이 바로 은혜의 때"`,
                ref: "📖 고린도후서 6:2",
                time: "45:00 ~ 46:00 (1분)",
                tag: "#골든타임 #구원의날 #결단",
                viral: "🔥 결단 박수 (99점)",
                intent: "goldentime",
                intentBadge: "⏳ 골든타임과 긴급성",
                climaxScore: 99,
                peakDb: "98.9 dB",
                quote: `"구조에는 골든타임이 있습니다. 내일로 미룰 수 없습니다. 오늘 주님이 기회를 주셨을 때 손을 내밀어야 합니다."`,
                story: {
                    start: {
                        title: "1. 시작 (도입/화두)",
                        timeStr: "00:00 ~ 00:15 (15초)",
                        secOffset: 0,
                        text: "물에 빠져 숨이 멎어가는 사람에게 '내일 와서 구해줄게'라고 말하는 구조대원이 있습니까? 절대로 없습니다!",
                        key: "구조에는 내일이 없다",
                        purpose: "구원 사역의 극단적 긴박성을 체감하게 만듦"
                    },
                    middle: {
                        title: "2. 중간 (전개/핵심)",
                        timeStr: "00:15 ~ 00:40 (25초)",
                        secOffset: 15,
                        text: "생명 구조에는 반드시 골든타임이 있습니다. 오늘 주님이 당신에게 감동을 주시고 말씀을 주셨을 때가 바로 구원의 날입니다.",
                        key: "보라 지금이 구원의 날이로다",
                        purpose: "고린도후서 6:2 말씀의 엄중한 시의성 선포"
                    },
                    end: {
                        title: "3. 결과 (강조/결단)",
                        timeStr: "00:40 ~ 01:00 (20초)",
                        secOffset: 40,
                        text: "내일로 미루지 마십시오! 오늘 이 순간 주님 앞에 엎드려 회복의 손을 잡으십시오!",
                        key: "골든타임을 놓치지 말라",
                        purpose: "더 이상 지체할 수 없는 당장의 결단 촉구"
                    }
                },
                rawScript: "어... 물에 빠져 숨이 멎어가는 사람에게, 음... '내일 건져줄게'라는 말이 나옵니까? 절대로, 그... 안 됩니다. 구조에는 골든타임이... 어... 있습니다. 오늘 주님이 기회를 주셨을 때, 음... 결단해야 합니다. 미루지 마시고, 이제... 오늘 이 시간 주님 앞에, 어... 돌아오십시오!",
                cleanedScript: "물에 빠져 숨이 멎어가는 사람에게 '내일 구해줄게'라고 말하는 구조대원은 없습니다! 생명 구조에는 반드시 골든타임이 있습니다. 주님이 감동을 주신 바로 오늘이 구원의 날입니다. 내일로 미루지 마십시오! 지금 이 순간 주님 앞에 엎드려 회복의 손을 잡으십시오!",
                cutStats: {
                    fillerRemoved: 15,
                    fillerTypes: "음~ (5회), 어~ (7회), 그... (3회)",
                    silenceCutSec: "4.9초",
                    originalLength: "64.9초",
                    optimizedLength: "60.0초",
                    clarityBoost: "+39%"
                }
            },
            {
                id: "gwanyu-9",
                line1: "착하고 충성된 종아",
                line2: "영원한 생명의 면류관",
                title: `"착하고 충성된 종아 영원한 생명의 면류관"`,
                ref: "📖 디모데후서 4:7-8",
                time: "50:10 ~ 51:10 (1분)",
                tag: "#마라나타 #충성 #영원한면류관",
                viral: "✨ 축도/결단 마무리 (100점)",
                intent: "comfort",
                intentBadge: "👑 영원한 소망",
                climaxScore: 100,
                peakDb: "99.1 dB",
                quote: `"구조선의 사명을 끝까지 감당하고 본향 항구에 닿는 날, 주님은 눈물을 닦아주시며 영광의 면류관을 씌워주실 것입니다."`,
                story: {
                    start: {
                        title: "1. 시작 (도입/화두)",
                        timeStr: "00:00 ~ 00:15 (15초)",
                        secOffset: 0,
                        text: "거친 바다에서 모든 구조 사역을 완수하고, 마침내 저 영원한 하늘 본향 항구에 닿는 그날을 바라보십시오.",
                        key: "하늘 본향 항구에 닿는 날",
                        purpose: "성도의 마지막 본향과 영원한 안식을 시각화"
                    },
                    middle: {
                        title: "2. 중간 (전개/핵심)",
                        timeStr: "00:15 ~ 00:42 (27초)",
                        secOffset: 15,
                        text: "주님께서 거친 파도 속에서 흘린 당신의 눈물을 손수 닦아주시며, '착하고 충성된 내 종아' 영광의 면류관을 씌워주실 것입니다.",
                        key: "착하고 충성된 내 종아",
                        purpose: "디모데후서 4:8 의의 면류관의 감격과 위로 선언"
                    },
                    end: {
                        title: "3. 결과 (강조/결단)",
                        timeStr: "00:42 ~ 01:00 (18초)",
                        secOffset: 42,
                        text: "구조선의 사명을 끝까지 감당합시다! 영원한 승리의 면류관을 향해 오늘도 힘차게 나아갑시다!",
                        key: "영광의 면류관을 향하여",
                        purpose: "축도와 설교 대단원의 클라이맥스 승리 선포"
                    }
                },
                rawScript: "음... 거친 바다에서 사명을 마치고, 어... 본향 항구에 닻을 내리는 날... 주님이 우리를, 그... 안아주십니다. 수고한 당신의 눈물을, 어... 닦아주시며 '착하고 충성된 종아' 면류관을, 음... 씌워주실 것입니다. 사명을 끝까지, 이제... 감당하고, 어... 영원한 면류관을 향해 나아갑시다!",
                cleanedScript: "거친 바다에서 구조 사역을 완수하고 마침내 하늘 본향 항구에 닿는 그날을 바라보십시오. 주님께서 거친 파도 속에서 흘린 당신의 눈물을 닦아주시며 '착하고 충성된 종아' 영광의 면류관을 씌워주실 것입니다. 구조선의 사명을 끝까지 감당하며 영원한 승리를 향해 나아갑시다!",
                cutStats: {
                    fillerRemoved: 13,
                    fillerTypes: "음~ (4회), 어~ (6회), 그... (3회)",
                    silenceCutSec: "4.3초",
                    originalLength: "64.3초",
                    optimizedLength: "60.0초",
                    clarityBoost: "+35%"
                }
            }
        ]
    },
    pastor_lee: {
        title: "2026_신년대예배_두려움을이기는믿음.mp4",
        length: "1시간 40분 (설교: 38분)",
        videoId: "XM7PrnvFSHw",
        highlights: [
            {
                line1: "두려움을 이기는",
                line2: "담대한 믿음의 3가지 원리",
                title: `"두려움을 이기는 담대한 믿음의 3가지 원리"`,
                quote: `"인생의 폭풍이 불어올 때 우리가 바라보아야 할 것은 파도가 아니라 바로 예수 그리스도의 말씀입니다!"`,
                ref: "📖 마태복음 14:29-31",
                time: "12:15 ~ 13:13 (58초)",
                tag: "#믿음 #승리 #은혜",
                viral: "🔥 조회수 예측 99점"
            },
            {
                line1: "고난 속에서도",
                line2: "감사해야 하는 진짜 이유",
                title: `"고난 속에서도 감사해야 하는 진짜 이유"`,
                quote: `"하나님의 거절은 더 큰 축복을 위한 거룩한 기다림입니다. 오늘 당신의 기도는 결코 땅에 떨어지지 않습니다."`,
                ref: "📖 데살로니가전서 5:16-18",
                time: "21:05 ~ 22:03 (58초)",
                tag: "#감사 #기도 #위로",
                viral: "✨ 은혜/결단 강추"
            },
            {
                line1: "말씀으로 하루를 시작할 때",
                line2: "일어나는 기적",
                title: `"말씀으로 하루를 시작할 때 일어나는 기적"`,
                quote: `"아침의 첫 10분을 하나님께 드릴 때, 당신의 하루 24시간이 하나님의 능력 안에 머물게 됩니다."`,
                ref: "📖 시편 5:3",
                time: "30:40 ~ 31:38 (58초)",
                tag: "#QT #아침기도 #청년",
                viral: "📱 청년부 공유 추천"
            },
            {
                line1: "막힌 기도의 문을",
                line2: "열어젖히는 턴어라운드",
                title: `"막힌 기도의 문을 열어젖히는 턴어라운드"`,
                quote: `"내 힘으로 안 될 때가 바로 하나님의 역사가 시작되는 시간입니다. 멈추지 말고 부르짖으십시오!"`,
                ref: "📖 예레미야 33:3",
                time: "42:10 ~ 43:08 (58초)",
                tag: "#기도 #성령 #회복",
                viral: "🔥 AI 추출 98점"
            },
            {
                line1: "상처받은 마음을",
                line2: "치유하시는 주님의 손길",
                title: `"상처받은 마음을 치유하시는 주님의 손길"`,
                quote: `"사람은 날 버려도 주님은 결코 나를 포기하지 않으십니다. 십자가의 사랑을 기억하십시오."`,
                ref: "📖 이사야 41:10",
                time: "53:20 ~ 54:18 (58초)",
                tag: "#치유 #사랑 #위로",
                viral: "✨ 영적회복 추천"
            },
            {
                line1: "새 일을 행하시는",
                line2: "하나님을 바라보라",
                title: `"새 일을 행하시는 하나님을 바라보라"`,
                quote: `"광야에 길을 내시고 사막에 강을 내시는 주님의 기적이 당신의 가문과 삶에 임합니다!"`,
                ref: "📖 이사야 43:19",
                time: "1:04:15 ~ 1:05:13 (58초)",
                tag: "#비전 #새해 #소망",
                viral: "📱 청년/학생 강추"
            },
            {
                line1: "영적 전쟁에서 승리하는",
                line2: "말씀 선포의 능력",
                title: `"영적 전쟁에서 승리하는 말씀 선포의 능력"`,
                quote: `"악한 영의 어둠은 오직 하나님의 살아있는 말씀 선포 앞에서 즉시 무너져 내립니다!"`,
                ref: "📖 에베소서 6:17",
                time: "1:15:30 ~ 1:16:28 (58초)",
                tag: "#영적전쟁 #능력 #승리",
                viral: "🔥 AI 추출 96점"
            },
            {
                line1: "가정을 축복으로 만드는",
                line2: "거룩한 눈물의 기도",
                title: `"가정을 축복으로 만드는 거룩한 기도"`,
                quote: `"부모의 눈물 어린 기도는 자녀의 평생을 지키는 하나님의 거룩한 울타리가 됩니다."`,
                ref: "📖 잠언 22:6",
                time: "1:26:40 ~ 1:27:38 (58초)",
                tag: "#가정 #축복 #기도",
                viral: "✨ 가정예배 강추"
            },
            {
                line1: "포기하지 않는 믿음이",
                line2: "가져오는 반전",
                title: `"포기하지 않는 믿음이 가져오는 반전"`,
                quote: `"낙심하지 마십시오. 가장 어두운 밤이 지나면 반드시 하나님의 찬란한 아침이 밝아옵니다."`,
                ref: "📖 갈라디아서 6:9",
                time: "1:37:10 ~ 1:38:08 (58초)",
                tag: "#반전 #소망 #은혜",
                viral: "📱 SNS 공유 폭발"
            },
            {
                line1: "주님의 진정한 평강이",
                line2: "임하는 거룩한 결단",
                title: `"주님의 평강이 임하는 거룩한 결단"`,
                quote: `"세상이 줄 수 없는 진정한 평안이 오늘 이 자리에서 주님을 고백하는 당신의 심령에 임합니다."`,
                ref: "📖 요한복음 14:27",
                time: "1:48:00 ~ 1:48:58 (58초)",
                tag: "#평강 #결단 #축도",
                viral: "✨ 은혜 결단 마무리"
            }
        ]
    },
    pastor_kim: {
        title: "2026_금요기도회_성령의능력과회복.mp4",
        length: "2시간 05분 (설교: 45분)",
        videoId: "2z8T-a53lJ0",
        highlights: [
            {
                line1: "교회에 온 당신",
                line2: "흥왕케 하는 자",
                title: `"교회에 온 당신 흥왕케 하는 자"`,
                quote: `"느헤미야처럼 교회와 사람을 세우는 '흥왕케 하는 자'로 살아가자는 메시지를 전하는 설교 도입부입니다."`,
                ref: "📖 느헤미야 2:17",
                time: "10:00 ~ 13:00 (3분)",
                tag: "#직접지정",
                viral: "🔥 AI 추출 99점",
                isCustom: true
            },
            {
                line1: "그 사람 오면",
                line2: "분위기가 달라진다",
                title: `"그 사람 오면 분위기가 달라진다"`,
                quote: `"등장만 해도 분위기를 환하게 만들고 낙심한 사람에게 용기와 위로를 주는 사람이 있다는 대비 설명."`,
                ref: "📖 사도행전 11:24",
                time: "01:48 ~ 02:24 (36초)",
                tag: "#위로 #분위기",
                viral: "✨ 은혜/결단 강추"
            },
            {
                line1: "그 사람 오면",
                line2: "슬그머니 자리를 뜬다",
                title: `"그 사람 오면 슬그머니 자리를 뜬다"`,
                quote: `"만날 때마다 지적하고 가르치려는 사람 곁을 사람들은 떠나고 싶어 한다는 경고."`,
                ref: "📖 잠언 15:1",
                time: "03:56 ~ 04:46 (50초)",
                tag: "#경고 #관계",
                viral: "📱 교훈 공유 추천"
            },
            {
                line1: "제목은 단 한마디",
                line2: "흥왕케 하는 자",
                title: `"제목은 단 한마디 흥왕케 하는 자"`,
                quote: `"오늘 말씀의 핵심 제목 '흥왕케 하는 자'를 힘있게 선포하는 장면."`,
                ref: "📖 사도행전 19:20",
                time: "11:16 ~ 12:07 (51초)",
                tag: "#선포 #핵심제목",
                viral: "🔥 AI 추출 98점"
            },
            {
                line1: "나는 괜찮은 사람?",
                line2: "판단은 내가 안 한다",
                title: `"나는 괜찮은 사람? 판단은 내가 안 한다"`,
                quote: `"자신이 좋은 사람이라 생각해도 그 판단은 자신이 아닌 상대방이 내린다는 통찰."`,
                ref: "📖 고린도전서 4:4",
                time: "02:24 ~ 03:56 (1분 32초)",
                tag: "#겸손 #통찰",
                viral: "✨ 영적회복 추천"
            },
            {
                line1: "목사님 말씀 아니다",
                line2: "하나님이 하신 말씀이다",
                title: `"목사님 말씀 아니다 하나님이 하신 말씀이다"`,
                quote: `"사람을 통해 전해진 말씀도 결국 하나님이 나에게 하신 말씀으로 받아들여야 한다는 가르침."`,
                ref: "📖 데살로니가전서 2:13",
                time: "17:41 ~ 19:11 (1분 30초)",
                tag: "#말씀 #하나님",
                viral: "📱 청년/학생 강추"
            },
            {
                line1: "얼어붙게 하는 사람 vs",
                line2: "살아나게 하는 사람",
                title: `"얼어붙게 하는 사람 vs 살아나게 하는 사람"`,
                quote: `"나로 인해 주위의 사람이 살아나는가 아니면 주눅 들고 얼어붙는가를 점검하라는 질문."`,
                ref: "📖 로마서 14:19",
                time: "09:20 ~ 11:48 (2분 28초)",
                tag: "#점검 #영적영향력",
                viral: "🔥 AI 추출 96점"
            },
            {
                line1: "은밀한 골방에서",
                line2: "보시는 하나님",
                title: `"너는 기도할 때에 네 골방에 들어와"`,
                quote: `"은밀한 중에 보시는 너의 아버지께서 반드시 기쁨의 응답으로 갚아주시리라."`,
                ref: "📖 마태복음 6:6",
                time: "1:28:40 ~ 1:29:38 (58초)",
                tag: "#골방기도 #응답 #은혜",
                viral: "✨ 은혜 기도회 추천"
            },
            {
                line1: "여호와는 나의 목자",
                line2: "내게 부족함 없으리로다",
                title: `"여호와는 나의 목자시니 내게 부족함이 없으리로다"`,
                quote: `"푸른 풀밭과 쉴 만한 물가로 인도하시는 주님 따라 오늘도 담대히 걸어갑니다."`,
                ref: "📖 시편 23:1-3",
                time: "1:39:10 ~ 1:40:08 (58초)",
                tag: "#목자 #인도 #감사",
                viral: "📱 묵상 숏폼 강추"
            },
            {
                line1: "나의 힘이신 여호와여",
                line2: "내가 주를 사랑하나이다",
                title: `"나의 힘이신 여호와여 내가 주를 사랑하나이다"`,
                quote: `"주님은 나의 반석이시요 나의 요새시요 나를 건지시는 이시니 담대히 찬양합니다."`,
                ref: "📖 시편 18:1",
                time: "1:50:00 ~ 1:50:58 (58초)",
                tag: "#사랑 #고백 #축도",
                viral: "✨ 금요기도회 피날레"
            }
        ]
    }
};

let currentDataset = sampleData.gwanyu;
let currentHighlightIdx = 0;
let isPlaying = false;
let currentShortsSpeed = 1.0;
let isAudioMuted = false;
let currentAudioVolume = 100;
let audioSourceMode = 'original'; // 'original' or 'ai_voice'
let ytPlayerInstance = null;
let isYtApiReady = false;
let currentSpeechUtterance = null;

/* ==========================================================================
   YouTube IFrame API & Sound Engine
   ========================================================================== */
window.onYouTubeIframeAPIReady = function() {
    isYtApiReady = true;
    try {
        ytPlayerInstance = new YT.Player('youtube-iframe-player', {
            events: {
                onReady: onYtPlayerReady,
                onStateChange: onYtPlayerStateChange
            }
        });
    } catch (e) {
        console.warn('YouTube IFrame API initialization caught:', e);
    }
};

function onYtPlayerReady(event) {
    if (!isAudioMuted) {
        try {
            event.target.unMute();
            event.target.setVolume(currentAudioVolume);
        } catch (e) {}
    }
}

function onYtPlayerStateChange(event) {
    if (!window.YT) return;
    const icon = document.getElementById('phone-play-icon');
    const eqBars = document.querySelectorAll('.audio-equalizer span');
    if (event.data === YT.PlayerState.PLAYING) {
        isPlaying = true;
        if (icon) icon.className = 'fa-solid fa-pause';
        eqBars.forEach(bar => bar.style.animationPlayState = 'running');
        if (!isAudioMuted && ytPlayerInstance) {
            try {
                ytPlayerInstance.unMute();
                ytPlayerInstance.setVolume(currentAudioVolume);
            } catch (e) {}
        }
    } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
        isPlaying = false;
        if (icon) icon.className = 'fa-solid fa-play';
        eqBars.forEach(bar => bar.style.animationPlayState = 'paused');
    }
}

function sendYtCommand(func, args = []) {
    if (ytPlayerInstance && typeof ytPlayerInstance[func] === 'function') {
        try {
            ytPlayerInstance[func](...args);
            return;
        } catch (e) {
            console.warn('ytPlayerInstance error, falling back to postMessage:', e);
        }
    }
    const ytPlayer = document.getElementById('youtube-iframe-player');
    if (ytPlayer && ytPlayer.contentWindow) {
        ytPlayer.contentWindow.postMessage(JSON.stringify({
            event: 'command',
            func: func,
            args: Array.isArray(args) ? args : [args]
        }), '*');
    }
}

function toggleShortsAudioMute() {
    isAudioMuted = !isAudioMuted;
    applyAudioState();
    showToast(isAudioMuted ? '🔇 음소거되었습니다.' : `🔊 소리가 켜졌습니다 (${currentAudioVolume}%).`);
}

function unmuteAllAudio() {
    isAudioMuted = false;
    if (currentAudioVolume === 0) currentAudioVolume = 100;
    applyAudioState();
    showToast('🔊 소리가 켜졌습니다 (볼륨 100%).');
}

function setShortsVolume(val) {
    currentAudioVolume = parseInt(val, 10);
    isAudioMuted = (currentAudioVolume === 0);
    applyAudioState();
}

function applyAudioState() {
    const soundIcon = document.getElementById('shorts-sound-icon');
    const soundText = document.getElementById('shorts-sound-text');
    const soundToggleBtn = document.getElementById('shorts-sound-toggle-btn');
    const audioBadge = document.getElementById('audio-status-badge');
    const volumeSlider = document.getElementById('shorts-volume-slider');
    const volumeLabel = document.getElementById('shorts-volume-label');
    const unmuteHint = document.getElementById('sound-unmute-hint');
    const videoPlayer = document.getElementById('uploaded-video-player');

    if (volumeSlider) volumeSlider.value = currentAudioVolume;
    if (volumeLabel) volumeLabel.textContent = `${currentAudioVolume}%`;

    if (isAudioMuted) {
        if (soundIcon) soundIcon.className = 'fa-solid fa-volume-xmark';
        if (soundText) soundText.textContent = '음소거됨';
        if (soundToggleBtn) soundToggleBtn.classList.add('muted');
        if (audioBadge) {
            audioBadge.textContent = '음소거됨 (Muted)';
            audioBadge.style.background = '#f43f5e';
        }
        if (unmuteHint) unmuteHint.style.display = 'flex';

        if (videoPlayer) videoPlayer.muted = true;
        sendYtCommand('mute', []);
        stopAiVoiceNarration();
    } else {
        if (soundIcon) soundIcon.className = currentAudioVolume > 50 ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-low';
        if (soundText) soundText.textContent = `소리 ${currentAudioVolume}%`;
        if (soundToggleBtn) soundToggleBtn.classList.remove('muted');
        if (audioBadge) {
            audioBadge.textContent = `사운드 ON (${currentAudioVolume}%)`;
            audioBadge.style.background = '#10b981';
        }
        if (unmuteHint) unmuteHint.style.display = 'none';

        if (videoPlayer) {
            videoPlayer.muted = false;
            videoPlayer.volume = currentAudioVolume / 100;
        }
        sendYtCommand('unMute', []);
        sendYtCommand('setVolume', [currentAudioVolume]);

        if (audioSourceMode === 'ai_voice' && isPlaying) {
            playCurrentStageNarration();
        }
    }
}

function setAudioSourceMode(mode) {
    audioSourceMode = mode;
    document.querySelectorAll('.audio-src-btn').forEach(b => b.classList.remove('active'));
    const activeBtn = document.getElementById(`audio-src-${mode}`);
    if (activeBtn) activeBtn.classList.add('active');

    if (mode === 'ai_voice') {
        sendYtCommand('setVolume', [20]); // Low ambient backing track
        showToast('🎙️ AI 목사님 음성 더빙 낭독 모드가 활성화되었습니다.');
        if (isPlaying) playCurrentStageNarration();
    } else {
        stopAiVoiceNarration();
        sendYtCommand('unMute', []);
        sendYtCommand('setVolume', [currentAudioVolume]);
        showToast('🔊 원본 유튜브 설교 사운드 모드로 전환되었습니다.');
    }
}

function playCurrentStageNarration() {
    if (!currentDataset || !currentDataset.highlights || !currentDataset.highlights[currentHighlightIdx]) return;
    const item = currentDataset.highlights[currentHighlightIdx];
    if (!item || !item.story || !item.story[currentStoryStage]) return;

    const text = isSmartJumpCutEnabled ? item.story[currentStoryStage].text : item.rawScript;
    speakSermonNarration(text);
}

function speakSermonNarration(text) {
    if (!('speechSynthesis' in window)) return;
    try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ko-KR';
        utterance.rate = currentShortsSpeed * 0.94;
        utterance.pitch = 0.96;
        utterance.volume = isAudioMuted ? 0 : (currentAudioVolume / 100);

        const voices = window.speechSynthesis.getVoices();
        const koVoice = voices.find(v => v.lang.includes('ko') || v.lang.includes('KR'));
        if (koVoice) utterance.voice = koVoice;

        currentSpeechUtterance = utterance;
        window.speechSynthesis.speak(utterance);
    } catch (e) {
        console.warn('SpeechSynthesis error:', e);
    }
}

function stopAiVoiceNarration() {
    if ('speechSynthesis' in window) {
        try {
            window.speechSynthesis.cancel();
        } catch (e) {}
    }
}

function testShortsSound() {
    unmuteAllAudio();
    if (audioSourceMode === 'ai_voice') {
        speakSermonNarration('오늘 우리가 스스로에게 물어야 합니다. 교회는 과연 무엇을 위해 모인 곳입니까? 편안히 먹고 즐기는 유람선입니까?');
        showToast('🎙️ AI 목사님 음성 설교 낭독 테스트 중...');
    } else {
        sendYtCommand('unMute', []);
        sendYtCommand('setVolume', [100]);
        sendYtCommand('playVideo', []);
        isPlaying = true;
        const icon = document.getElementById('phone-play-icon');
        if (icon) icon.className = 'fa-solid fa-pause';
        showToast('🔊 원본 설교 사운드 100% 재생 테스트 중...');
    }
}

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
}

/* 4. YouTube URL Parser & 10 AI Shorts Clip Generator */
function extractYouTubeId(url) {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|live\/|shorts\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

function generate10ShortsFromYouTube(url) {
    const videoId = extractYouTubeId(url) || 'fB-uX_pZZvs';
    
    // Check if this is the user's specific sermon (관유중앙교회 "구조선의 청사진") or general sermon
    const isGwanYuChurch = (videoId === 'fB-uX_pZZvs' || (url && url.includes('fB-uX_pZZvs')));

    if (isGwanYuChurch) {
        sampleData.youtube = {
            title: `26-10-11 관유중앙교회 주일예배 - 구조선의 청사진.mp4`,
            length: "52분 04초 (설교 전편 0.1초 정밀 스캔 완료)",
            videoId: videoId,
            highlights: JSON.parse(JSON.stringify(sampleData.gwanyu.highlights))
        };
    } else {
        // Universal dynamic 10 shorts with complete 3-stage narrative and jump-cut cleaning
        const dynamicTopics = [
            {
                line1: "오늘의 선포", line2: "하나님의 거룩한 부르심",
                ref: "📖 로마서 8:28", time: "02:15 ~ 03:15 (1분)", tag: "#말씀 #도입 #부르심",
                intent: "climax", intentBadge: "🔥 전체 핵심 선포",
                story: {
                    start: { title: "1. 시작 (도입/화두)", timeStr: "00:00 ~ 00:15 (15초)", secOffset: 0, text: "오늘 우리가 이 자리에 모인 이유는 우연이 아닙니다. 하나님께서 당신을 부르신 분명한 목적이 있습니다.", key: "거룩한 부르심의 시작" },
                    middle: { title: "2. 중간 (전개/핵심)", timeStr: "00:15 ~ 00:42 (27초)", secOffset: 15, text: "하나님을 사랑하는 자, 곧 그의 뜻대로 부르심을 입은 자들에게는 모든 것이 합력하여 반드시 선을 이룹니다.", key: "모든 것이 합력하여 선으로" },
                    end: { title: "3. 결과 (강조/결단)", timeStr: "00:42 ~ 01:00 (18초)", secOffset: 42, text: "당신의 삶을 향한 거룩한 부르심을 신뢰하십시오! 오늘 믿음으로 다시 일어납시다!", key: "부르심에 응답하라" }
                },
                rawScript: "어... 오늘 우리가 모인 것은, 음... 우연이 아닙니다. 하나님이 부르신, 그... 목적이 있습니다. 하나님을 사랑하는 자에게는... 어... 모든 것이 합력하여 선을 이룹니다. 낙심하지 말고, 이제... 믿음으로, 어... 다시 일어납시다!",
                cleanedScript: "오늘 우리가 이 자리에 모인 이유는 우연이 아닙니다. 하나님께서 당신을 부르신 분명한 목적이 있습니다. 하나님을 사랑하는 자들에게는 모든 것이 합력하여 선을 이룹니다. 낙심하지 말고 믿음으로 다시 일어납시다!",
                cutStats: { fillerRemoved: 13, silenceCutSec: "4.5초", clarityBoost: "+36%" }
            },
            {
                line1: "두려워하지 말라", line2: "내가 너와 함께함이라",
                ref: "📖 이사야 41:10", time: "08:30 ~ 09:30 (1분)", tag: "#위로 #동행 #믿음",
                intent: "comfort", intentBadge: "👑 위로와 동행",
                story: {
                    start: { title: "1. 시작 (도입/화두)", timeStr: "00:00 ~ 00:15 (15초)", secOffset: 0, text: "앞이 캄캄하고 사방이 막혀 혼자인 것처럼 느껴질 때가 있습니다. 그러나 당신은 혼자가 아닙니다.", key: "두려움 앞에서의 고백" },
                    middle: { title: "2. 중간 (전개/핵심)", timeStr: "00:15 ~ 00:41 (26초)", secOffset: 15, text: "두려워하지 말라 내가 너와 함께함이라 놀라지 말라 나는 네 하나님이 됨이라. 의로운 오른손으로 너를 굳세게 붙드시리라!", key: "의로운 오른손의 약속" },
                    end: { title: "3. 결과 (강조/결단)", timeStr: "00:41 ~ 01:00 (19초)", secOffset: 41, text: "주님의 강한 손을 붙잡으십시오! 주께서 당신을 결코 떠나지 않으십니다!", key: "주를 의지하는 평안" }
                },
                rawScript: "음... 앞이 캄캄할 때, 어... 혼자인 것 같지만... 그... 결코 혼자가 아닙니다. 주님이 말씀하십니다... 어... 두려워하지 말라 내가 너와 함께함이라. 주님의 손을, 이제... 꼭 잡으십시오!",
                cleanedScript: "앞이 캄캄하고 사방이 막혀 혼자인 것처럼 느껴질 때가 있습니다. 그러나 결코 혼자가 아닙니다. 두려워하지 말라 내가 너와 함께함이라! 주님의 강한 오른손을 굳게 붙잡으십시오!",
                cutStats: { fillerRemoved: 14, silenceCutSec: "4.8초", clarityBoost: "+38%" }
            },
            {
                line1: "오직 믿음으로", line2: "세상을 이기는 힘",
                ref: "📖 요한일서 5:4", time: "15:20 ~ 16:20 (1분)", tag: "#승리 #믿음 #도전",
                intent: "challenge", intentBadge: "⚔️ 도전과 승리",
                story: {
                    start: { title: "1. 시작 (도입/화두)", timeStr: "00:00 ~ 00:14 (14초)", secOffset: 0, text: "세상의 벽이 너무 높아 무력감에 빠져 계십니까? 우리는 무너지지 않습니다.", key: "세상의 거대한 벽 앞에서" },
                    middle: { title: "2. 중간 (전개/핵심)", timeStr: "00:14 ~ 00:41 (27초)", secOffset: 14, text: "무릇 하나님께로부터 난 자마다 세상을 이기느니라. 세상을 이기는 승리는 이것이니 바로 우리의 굳건한 믿음입니다!", key: "세상을 이기는 믿음" },
                    end: { title: "3. 결과 (강조/결단)", timeStr: "00:41 ~ 01:00 (19초)", secOffset: 41, text: "환경에 굴복하지 마십시오! 믿음으로 담대하게 세상을 향해 선포하십시오!", key: "믿음의 담대한 선포" }
                },
                rawScript: "어... 세상의 벽 앞에서, 음... 낙심하고 계십니까? 그... 하나님께 난 자는... 어... 세상을 이깁니다. 우리의 믿음이, 이제... 세상을 이기는 열쇠입니다. 담대하게 선포하십시오!",
                cleanedScript: "세상의 벽이 높아 무력감에 빠져 계십니까? 하나님께로부터 난 자마다 세상을 이깁니다. 세상을 이기는 승리는 바로 우리의 믿음입니다. 환경에 굴복하지 말고 담대히 선포하십시오!",
                cutStats: { fillerRemoved: 11, silenceCutSec: "3.8초", clarityBoost: "+32%" }
            },
            {
                line1: "기도의 능력", line2: "하늘 문을 여는 열쇠",
                ref: "📖 야고보서 5:16", time: "21:45 ~ 22:45 (1분)", tag: "#기도 #응답 #간구",
                intent: "climax", intentBadge: "🔥 기도의 권세",
                story: {
                    start: { title: "1. 시작 (도입/화두)", timeStr: "00:00 ~ 00:15 (15초)", secOffset: 0, text: "내 힘으로 아무것도 할 수 없을 때, 우리가 가장 먼저 해야 할 일은 무엇입니까? 무릎 꿇는 것입니다.", key: "무릎으로 시작하라" },
                    middle: { title: "2. 중간 (전개/핵심)", timeStr: "00:15 ~ 00:40 (25초)", secOffset: 15, text: "의인의 간구는 역사하는 힘이 큽니다. 성도의 눈물의 기도는 하늘 보좌를 움직이고 닫힌 문을 엽니다.", key: "하늘 문을 여는 눈물의 기도" },
                    end: { title: "3. 결과 (강조/결단)", timeStr: "00:40 ~ 01:00 (20초)", secOffset: 40, text: "낙심을 기도로 바꾸십시오! 하나님께서 당신의 기도를 결코 외면하지 않으십니다!", key: "기도로 승리하라" }
                },
                rawScript: "음... 내 힘으로 안 될 때, 어... 우리가 해야 할 일은 무릎 꿇는 것입니다. 의인의 간구는, 그... 역사하는 힘이 큽니다. 기도는, 어... 닫힌 문을 엽니다. 기도로 하나님 앞에, 이제... 나아가십시오!",
                cleanedScript: "내 힘으로 아무것도 할 수 없을 때 우리가 해야 할 일은 무릎 꿇는 것입니다. 의인의 간구는 역사하는 힘이 큽니다. 성도의 눈물의 기도는 하늘 문을 엽니다. 낙심을 기도로 바꾸십시오!",
                cutStats: { fillerRemoved: 12, silenceCutSec: "4.1초", clarityBoost: "+34%" }
            },
            {
                line1: "십자가의 은혜", line2: "다시 일어서는 용기",
                ref: "📖 갈라디아서 2:20", time: "28:10 ~ 29:10 (1분)", tag: "#회복 #십자가 #은혜",
                intent: "soul", intentBadge: "💔 십자가 회복",
                story: {
                    start: { title: "1. 시작 (도입/화두)", timeStr: "00:00 ~ 00:15 (15초)", secOffset: 0, text: "과거의 상처와 죄책감에 묶여 오늘도 고통받고 계십니까? 십자가 앞에 모두 내려놓으십시오.", key: "상처와 죄책감의 치유" },
                    middle: { title: "2. 중간 (전개/핵심)", timeStr: "00:15 ~ 00:42 (27초)", secOffset: 15, text: "내가 그리스도와 함께 십자가에 못 박혔나니, 이제는 내가 사는 것이 아니요 오직 내 안에 그리스도께서 사시는 것입니다.", key: "그리스도와 함께 다시 사는 삶" },
                    end: { title: "3. 결과 (강조/결단)", timeStr: "00:42 ~ 01:00 (18초)", secOffset: 42, text: "십자가의 사랑이 당신을 살렸습니다! 용기를 내어 새 생명의 길로 걸어가십시오!", key: "새 생명의 용기" }
                },
                rawScript: "어... 과거의 상처에, 음... 묶여 계십니까? 십자가 앞에, 그... 내려놓으십시오. 이제는 내가 사는 것이 아니라... 어... 그리스도께서 사십니다. 십자가의 은혜로, 이제... 다시 일어서십시오!",
                cleanedScript: "과거의 상처와 죄책감에 묶여 오늘도 고통받고 계십니까? 십자가 앞에 모두 내려놓으십시오. 이제는 내 안에 그리스도께서 사십니다. 십자가의 사랑으로 용기를 내어 다시 일어서십시오!",
                cutStats: { fillerRemoved: 14, silenceCutSec: "4.6초", clarityBoost: "+37%" }
            },
            {
                line1: "서로 사랑하라", line2: "교회 공동체의 심장",
                ref: "📖 요한복음 13:34", time: "34:50 ~ 35:50 (1분)", tag: "#사랑 #공동체 #화합",
                intent: "essence", intentBadge: "⛵ 공동체의 본질",
                story: {
                    start: { title: "1. 시작 (도입/화두)", timeStr: "00:00 ~ 00:14 (14초)", secOffset: 0, text: "교회가 세상과 다른 가장 결정적인 증거는 무엇입니까? 조건 없는 그리스도의 사랑입니다.", key: "세상과 다른 사랑" },
                    middle: { title: "2. 중간 (전개/핵심)", timeStr: "00:14 ~ 00:41 (27초)", secOffset: 14, text: "새 계명을 너희에게 주노니 서로 사랑하라. 너희가 서로 사랑하면 이로써 모든 사람이 너희가 내 제자인 줄 알리라.", key: "서로 사랑하라는 새 계명" },
                    end: { title: "3. 결과 (강조/결단)", timeStr: "00:41 ~ 01:00 (19초)", secOffset: 41, text: "상처 난 지체를 먼저 품어주십시오! 그리스도의 사랑으로 하나 되는 따뜻한 공동체를 이룹시다!", key: "사랑으로 하나 됨" }
                },
                rawScript: "음... 교회의 본질은, 어... 사랑입니다. 주님이 명령하셨습니다... 그... 서로 사랑하라. 지체들을, 어... 먼저 품어줄 때, 음... 하나님의 나라가 임합니다. 사랑으로, 이제... 하나가 됩시다!",
                cleanedScript: "교회가 세상과 다른 가장 결정적인 증거는 조건 없는 사랑입니다. 서로 사랑할 때 모든 사람이 주님의 제자인 줄 알게 됩니다. 상처 난 지체를 먼저 품어 사랑으로 하나 되는 교회를 이룹시다!",
                cutStats: { fillerRemoved: 13, silenceCutSec: "4.4초", clarityBoost: "+35%" }
            },
            {
                line1: "감사의 기적", line2: "조건 없는 찬양의 힘",
                ref: "📖 데살로니가전서 5:18", time: "41:20 ~ 42:20 (1분)", tag: "#감사 #찬양 #기적",
                intent: "comfort", intentBadge: "👑 감사의 능력",
                story: {
                    start: { title: "1. 시작 (도입/화두)", timeStr: "00:00 ~ 00:14 (14초)", secOffset: 0, text: "모든 것이 좋을 때만 감사하고 계십니까? 고난 속의 감사가 진짜 기적을 일으킵니다.", key: "고난 속의 진짜 감사" },
                    middle: { title: "2. 중간 (전개/핵심)", timeStr: "00:14 ~ 00:41 (27초)", secOffset: 14, text: "범사에 감사하라 이것이 그리스도 예수 안에서 너희를 향하신 하나님의 뜻이니라. 감사는 막힌 축복의 문을 엽니다.", key: "범사에 감사하라" },
                    end: { title: "3. 결과 (강조/결단)", timeStr: "00:41 ~ 01:00 (19초)", secOffset: 41, text: "상황을 뛰어넘어 먼저 감사하십시오! 하나님께서 놀라운 반전의 역사를 베푸실 것입니다!", key: "감사로 여는 반전의 역사" }
                },
                rawScript: "어... 좋을 때만 감사하면, 음... 기적이 안 일어납니다. 고난 속에서, 그... 감사할 때... 어... 역사가 시작됩니다. 범사에 감사하십시오. 상황을 뛰어넘어, 이제... 감사로, 어... 승리합시다!",
                cleanedScript: "모든 것이 좋을 때만 감사하고 계십니까? 고난 속의 감사가 진짜 기적을 일으킵니다. 범사에 감사하라! 상황을 뛰어넘어 먼저 감사할 때 하나님께서 놀라운 반전의 역사를 여십니다!",
                cutStats: { fillerRemoved: 12, silenceCutSec: "4.2초", clarityBoost: "+34%" }
            },
            {
                line1: "선한 싸움을 싸우라", line2: "타협 없는 거룩한 삶",
                ref: "📖 디모데전서 6:12", time: "48:00 ~ 49:00 (1분)", tag: "#거룩 #영적전투 #결단",
                intent: "challenge", intentBadge: "⚔️ 선한 싸움과 결단",
                story: {
                    start: { title: "1. 시작 (도입/화두)", timeStr: "00:00 ~ 00:14 (14초)", secOffset: 0, text: "세상의 달콤한 타협과 유혹 앞에서 흔들리고 계십니까? 우리는 타협할 수 없습니다.", key: "타협 없는 거룩함" },
                    middle: { title: "2. 중간 (전개/핵심)", timeStr: "00:14 ~ 00:41 (27초)", secOffset: 14, text: "믿음의 선한 싸움을 싸우라 영생을 취하라! 거룩함이야말로 세상을 부끄럽게 만드는 성도의 가장 강력한 무기입니다.", key: "믿음의 선한 싸움" },
                    end: { title: "3. 결과 (강조/결단)", timeStr: "00:41 ~ 01:00 (19초)", secOffset: 41, text: "세상 풍조에 휩쓸리지 말고 말씀 위에 굳게 서십시오! 끝까지 거룩한 승리자로 남읍시다!", key: "말씀 위에 굳게 서라" }
                },
                rawScript: "음... 세상의 유혹 앞에서, 어... 타협하고 계십니까? 믿음의 선한 싸움을, 그... 싸워야 합니다. 거룩함이, 어... 우리의 무기입니다. 말씀 위에 서서, 이제... 끝까지, 어... 승리합시다!",
                cleanedScript: "세상의 타협과 유혹 앞에서 흔들리지 마십시오. 믿음의 선한 싸움을 싸우라 영생을 취하라! 거룩함이야말로 성도의 가장 강력한 무기입니다. 말씀 위에 굳게 서서 끝까지 승리합시다!",
                cutStats: { fillerRemoved: 13, silenceCutSec: "4.3초", clarityBoost: "+35%" }
            },
            {
                line1: "골든타임을 놓치지 말라", line2: "지금이 바로 은혜의 때",
                ref: "📖 고린도후서 6:2", time: "55:30 ~ 56:30 (1분)", tag: "#골든타임 #구원의날 #결단",
                intent: "goldentime", intentBadge: "⏳ 골든타임과 결단",
                story: {
                    start: { title: "1. 시작 (도입/화두)", timeStr: "00:00 ~ 00:15 (15초)", secOffset: 0, text: "인생에서 가장 뼈아픈 것은 기회를 놓치는 것입니다. 영혼 구원에는 절대 양보할 수 없는 때가 있습니다.", key: "기회를 놓치지 말라" },
                    middle: { title: "2. 중간 (전개/핵심)", timeStr: "00:15 ~ 00:40 (25초)", secOffset: 15, text: "보라 지금은 은혜받을 만한 때요 보라 지금은 구원의 날이로다. 내일로 미루지 말고 오늘 결단해야 합니다.", key: "보라 지금이 구원의 날" },
                    end: { title: "3. 결과 (강조/결단)", timeStr: "00:40 ~ 01:00 (20초)", secOffset: 40, text: "오늘 주님이 손을 내미셨을 때 꼭 잡으십시오! 지금이 바로 당신의 회복의 골든타임입니다!", key: "지금 회복의 손을 잡으라" }
                },
                rawScript: "어... 인생의 기회를, 음... 놓치지 마십시오. 구원에는 때가, 그... 있습니다. 지금이 은혜받을 만한, 어... 때입니다. 내일로 미루지 말고, 이제... 오늘 주님의 손을, 어... 잡으십시오!",
                cleanedScript: "인생에서 기회를 놓치는 것만큼 아픈 것은 없습니다. 보라 지금은 은혜받을 만한 때요 구원의 날이로다! 내일로 미루지 마십시오. 오늘 주님이 내미신 회복의 손을 굳게 잡으십시오!",
                cutStats: { fillerRemoved: 14, silenceCutSec: "4.7초", clarityBoost: "+38%" }
            },
            {
                line1: "평강과 축복으로", line2: "세상 속으로 파송",
                ref: "📖 민수기 6:24-26", time: "1:02:10 ~ 1:03:10 (1분)", tag: "#축복 #파송 #축도",
                intent: "comfort", intentBadge: "👑 축복과 파송",
                story: {
                    start: { title: "1. 시작 (도입/화두)", timeStr: "00:00 ~ 00:15 (15초)", secOffset: 0, text: "예배당 문을 나서는 순간부터 진짜 신앙생활이 시작됩니다. 두려워하지 말고 세상으로 나아가십시오.", key: "세상으로 나아가는 발걸음" },
                    middle: { title: "2. 중간 (전개/핵심)", timeStr: "00:15 ~ 00:42 (27초)", secOffset: 15, text: "여호와는 네게 복을 주시고 너를 지키시기를 원하며, 여호와는 그의 얼굴을 네게 비추사 평강 주시기를 원하노라!", key: "하나님의 거룩한 축복 선포" },
                    end: { title: "3. 결과 (강조/결단)", timeStr: "00:42 ~ 01:00 (18초)", secOffset: 42, text: "받은 은혜를 품고 당신의 삶의 터전으로 나아가십시오! 주께서 이번 한 주간 당신과 함께하십니다!", key: "주께서 함께하심을 믿으라" }
                },
                rawScript: "음... 예배당을 나서는 순간부터, 어... 진짜 신앙입니다. 여호와는 네게, 그... 복을 주시고 지키시기를 원합니다. 은혜를 품고, 어... 세상으로 나아가십시오. 주님이, 이제... 한 주간, 어... 함께하십니다!",
                cleanedScript: "예배당 문을 나서는 순간부터 진짜 신앙이 시작됩니다. 여호와는 네게 복을 주시고 너를 지키시기를 원하며 평강 주시기를 원하노라! 받은 은혜를 품고 세상으로 담대히 나아가십시오!",
                cutStats: { fillerRemoved: 12, silenceCutSec: "4.0초", clarityBoost: "+34%" }
            }
        ];

        sampleData.youtube = {
            title: `YouTube_주일예배_설교분석_${videoId}.mp4`,
            length: "1시간 20분 (설교 전편 0.1초 정밀 스캔 완료)",
            videoId: videoId,
            highlights: dynamicTopics.map((item, idx) => ({
                id: `dynamic-${idx}`,
                title: `"${item.line1} ${item.line2}"`,
                quote: `"${item.cleanedScript.slice(0, 70)}..."`,
                climaxScore: 98 - idx,
                peakDb: `${98 - idx * 0.4} dB`,
                ...item
            }))
        };
    }

    currentDataset = sampleData.youtube;
    currentHighlightIdx = 0;

    const projTitle = document.getElementById('current-project-title');
    const aiStatus = document.getElementById('ai-status-text');
    if (projTitle) projTitle.textContent = `Project: ${currentDataset.title}`;
    if (aiStatus) aiStatus.textContent = `AI 설교 구간 탐지 완료 (${currentDataset.length})`;

    const timelineTitle = document.querySelector('.timeline-title span');
    if (timelineTitle) {
        timelineTitle.textContent = `예배 전체 타임라인 오토 스캐닝 (${currentDataset.length.split('(')[0].trim()})`;
    }

    renderWaveformHeatmap();
    renderHighlightCards();
    selectHighlight(0);
}

/* 4-B. Full Sermon Waveform Heatmap Generator */
function renderWaveformHeatmap() {
    const container = document.getElementById('waveform-canvas-bar');
    if (!container) return;

    // Generate 48 bars with realistic audio peaks
    const barsData = [
        18, 22, 25, 30, 42, 60, 95, 88, 70, 45, 35, 40,
        55, 75, 92, 85, 60, 48, 50, 68, 89, 94, 78, 58,
        45, 60, 80, 96, 90, 65, 40, 52, 70, 88, 92, 75,
        50, 62, 82, 97, 86, 60, 42, 55, 78, 98, 92, 68
    ];

    let barsHtml = barsData.map((val, idx) => {
        let cls = 'medium';
        if (val >= 85) cls = 'peak';
        else if (val >= 60) cls = 'high';
        return `<div class="wave-bar ${cls}" style="height: ${val}%;" title="타임라인 ${Math.floor(idx * 1.1)}분 (에너지 ${val}%)"></div>`;
    }).join('');

    barsHtml += `<div class="wave-cursor-marker" id="wave-cursor-marker" style="left: 5%;"></div>`;
    container.innerHTML = barsHtml;
}

function updateWaveMarker(item) {
    const marker = document.getElementById('wave-cursor-marker');
    const indicator = document.getElementById('scanner-peak-indicator');
    if (!item) return;

    if (indicator) {
        indicator.textContent = `🔥 하이라이트 구간: ${item.time} (${item.peakDb || '98.5 dB'})`;
    }

    if (marker) {
        const startSec = parseTimestampToSeconds(item.time);
        // Normalize against 52 minutes (3120 sec)
        const percent = Math.min(96, Math.max(4, (startSec / 3120) * 100));
        marker.style.left = `${percent}%`;
    }
}

/* 4-C. Intent Filtering Engine */
function filterShortsByIntent(intentKey, btnEl) {
    if (!currentDataset || !currentDataset.highlights) return;

    document.querySelectorAll('.intent-pill-btn').forEach(btn => btn.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');

    if (intentKey === 'all') {
        renderHighlightCards();
        selectHighlight(0);
        showToast('🔥 설교 전편 최고 클라이맥스 Top 10 쇼츠가 정렬되었습니다.');
        return;
    }

    // Find the first highlight matching intent
    const foundIdx = currentDataset.highlights.findIndex(h => h.intent === intentKey);
    if (foundIdx !== -1) {
        selectHighlight(foundIdx);
        const card = document.getElementById(`hl-card-${foundIdx}`);
        if (card) {
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        const item = currentDataset.highlights[foundIdx];
        showToast(`🎯 의도 맞춤 완료: [${item.intentBadge || intentKey}] 구간이 1순위로 선택되었습니다.`);
    } else {
        showToast(`해당 의도와 일치하는 클립을 검색 중입니다...`);
    }
}

function searchCustomIntent() {
    const input = document.getElementById('custom-intent-input');
    if (!input || !input.value.trim()) {
        showToast('전달하고 싶은 핵심 의도 키워드를 입력해주세요.');
        return;
    }

    const query = input.value.trim().toLowerCase();
    if (!currentDataset || !currentDataset.highlights) return;

    let bestIdx = 0;
    let highestScore = -1;

    currentDataset.highlights.forEach((h, idx) => {
        let score = 0;
        const textToSearch = `${h.title} ${h.quote} ${h.tag} ${h.intentBadge || ''} ${h.story ? h.story.start.text + ' ' + h.story.middle.text + ' ' + h.story.end.text : ''}`.toLowerCase();
        
        query.split(' ').forEach(word => {
            if (word.length >= 2 && textToSearch.includes(word)) {
                score += 10;
            }
        });

        if (score > highestScore) {
            highestScore = score;
            bestIdx = idx;
        }
    });

    selectHighlight(bestIdx);
    const card = document.getElementById(`hl-card-${bestIdx}`);
    if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    const matched = currentDataset.highlights[bestIdx];
    showToast(`🎯 의도 키워드 '${query}' 매칭 완료! 👉 "${(matched.line1 + ' ' + matched.line2)}"`);
}

/* 4-D. 1-Minute (60s) Shorts Player Engine & 3-Stage Story Navigation */
const SHORTS_MAX_DURATION = 60.0;
let shortsElapsedSec = 0.0;
let shortsTimerInterval = null;
let currentStoryStage = 'start'; // 'start' | 'middle' | 'end'
let isSmartJumpCutEnabled = true;

// Ensure any highlight item has 3-stage connected narrative story structure
function ensureItemStory(item) {
    if (!item) return null;
    if (!item.story) {
        const l1 = item.line1 || "오늘 주신 은혜의 말씀";
        const l2 = item.line2 || "삶의 결단으로 응답하라";
        const q = item.quote ? item.quote.replace(/"/g, '') : "말씀 앞에 온전히 엎드려 성령의 능력을 구합시다.";
        item.story = {
            start: {
                title: "1. 시작 (도입/화두)",
                timeStr: "00:00 ~ 00:15 (15초)",
                secOffset: 0,
                text: `오늘 우리가 스스로에게 물어야 할 질문이 있습니다: "${l1} ${l2}"!`,
                key: l1,
                purpose: "청중의 마음을 집중시키는 도입 화두"
            },
            middle: {
                title: "2. 중간 (전개/핵심)",
                timeStr: "00:15 ~ 00:42 (27초)",
                secOffset: 15,
                text: q,
                key: l2,
                purpose: "설교의 가장 강력한 은혜의 핵심 선포"
            },
            end: {
                title: "3. 결과 (강조/결단)",
                timeStr: "00:42 ~ 01:00 (18초)",
                secOffset: 42,
                text: "이 말씀을 붙잡고 오늘 우리의 삶의 현장에서 온전히 순종하며 나아갑시다!",
                key: "말씀에 순종하는 결단",
                purpose: "깔끔한 결론과 성도의 믿음의 결단"
            }
        };
    }
    return item.story;
}

// 60-Second Shorts Real-Time Timer
function startShortsTimer() {
    stopShortsTimer();
    const tickMs = 100;
    shortsTimerInterval = setInterval(() => {
        shortsElapsedSec += (tickMs / 1000) * (currentShortsSpeed || 1.0);
        if (shortsElapsedSec >= SHORTS_MAX_DURATION) {
            shortsElapsedSec = SHORTS_MAX_DURATION;
            updateShortsProgressUI();
            stopShortsTimer();

            // Finish 1-minute shorts smoothly
            isPlaying = false;
            const icon = document.getElementById('phone-play-icon');
            if (icon) icon.className = 'fa-solid fa-play';
            const flowPlayIcon = document.getElementById('flow-play-btn-icon');
            if (flowPlayIcon) flowPlayIcon.className = 'fa-solid fa-play';
            const eqBars = document.querySelectorAll('.audio-equalizer span');
            eqBars.forEach(bar => bar.style.animationPlayState = 'paused');

            const ytPlayer = document.getElementById('youtube-iframe-player');
            if (ytPlayer) sendYtCommand('pauseVideo', []);
            const videoPlayer = document.getElementById('uploaded-video-player');
            if (videoPlayer) videoPlayer.pause();

            showToast('🎉 [1분 완결 은혜 쇼츠] 60초 완주 완료! 도입-핵심-결론 서사가 깔끔하게 완성되었습니다.');
            return;
        }

        updateShortsProgressUI();
        checkAutoStageTransition(shortsElapsedSec);
    }, tickMs);
}

function stopShortsTimer() {
    if (shortsTimerInterval) {
        clearInterval(shortsTimerInterval);
        shortsTimerInterval = null;
    }
}

function resetShortsTimer() {
    stopShortsTimer();
    shortsElapsedSec = 0.0;
    updateShortsProgressUI();
}

function updateShortsProgressUI() {
    const fill = document.getElementById('shorts-scrubber-fill');
    const pct = Math.min(100, Math.max(0, (shortsElapsedSec / SHORTS_MAX_DURATION) * 100));
    if (fill) fill.style.width = pct.toFixed(1) + '%';

    const timeLabel = document.getElementById('shorts-timer-elapsed');
    if (timeLabel) {
        const min = Math.floor(shortsElapsedSec / 60);
        const sec = Math.floor(shortsElapsedSec % 60);
        timeLabel.textContent = `0${min}:${sec < 10 ? '0' : ''}${sec}`;
    }
}

// Automatically transition between [1. 시작] -> [2. 핵심] -> [3. 결론] without jump glitches
function checkAutoStageTransition(sec) {
    let targetStage = 'start';
    if (sec >= 42.0) {
        targetStage = 'end';
    } else if (sec >= 15.0) {
        targetStage = 'middle';
    }

    if (targetStage !== currentStoryStage) {
        jumpToStoryStage(targetStage, false); // false: do not re-seek video; it is flowing continuously!
    }
}

// User clicks on the 60s Scrubber Track to seek directly
function seekShortsProgress(event) {
    const track = document.getElementById('shorts-scrubber-track');
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(rect.width, event.clientX - rect.left));
    const ratio = clickX / rect.width;
    shortsElapsedSec = ratio * SHORTS_MAX_DURATION;

    let targetStage = 'start';
    if (shortsElapsedSec >= 42.0) targetStage = 'end';
    else if (shortsElapsedSec >= 15.0) targetStage = 'middle';

    jumpToStoryStage(targetStage, true);
    updateShortsProgressUI();
}

function jumpToStoryStage(stage, seekVideo = true) {
    if (!currentDataset || !currentDataset.highlights || !currentDataset.highlights[currentHighlightIdx]) return;
    const item = currentDataset.highlights[currentHighlightIdx];
    ensureItemStory(item);
    if (!item.story || !item.story[stage]) return;

    currentStoryStage = stage;

    // Sync elapsed time if sought explicitly
    if (seekVideo) {
        if (stage === 'start') shortsElapsedSec = 0.0;
        else if (stage === 'middle') shortsElapsedSec = 15.0;
        else if (stage === 'end') shortsElapsedSec = 42.0;
        updateShortsProgressUI();
    }

    // 1. Update Story Stage Buttons in Navigator
    ['start', 'middle', 'end'].forEach(s => {
        const btn = document.getElementById(`story-btn-${s}`);
        if (btn) {
            if (s === stage) btn.classList.add('active');
            else btn.classList.remove('active');
        }
    });

    // 2. Update Live Stage Badge in 60s Progress Bar
    const stageBadgeText = document.getElementById('shorts-live-stage-name');
    if (stageBadgeText) {
        if (stage === 'start') stageBadgeText.textContent = '1. 도입 (0~15초)';
        else if (stage === 'middle') stageBadgeText.textContent = '2. 핵심 전개 (15~42초)';
        else if (stage === 'end') stageBadgeText.textContent = '3. 결론 및 결단 (42~60초)';
    }

    // 3. Update Subtitle Story Tag in Phone Screen
    const tagEl = document.getElementById('sub-story-status-tag');
    if (tagEl) {
        tagEl.className = `sub-story-status-tag ${stage}`;
        if (stage === 'start') tagEl.textContent = '💡 1. 시작 (도입 화두)';
        else if (stage === 'middle') tagEl.textContent = '📖 2. 중간 (핵심 전개)';
        else if (stage === 'end') tagEl.textContent = '🔥 3. 결과 (결단 강조)';
    }

    // 4. Update Live Subtitle in Phone Simulator
    const subText = document.getElementById('sub-text-box');
    if (subText) {
        const stageData = item.story[stage];
        const displayText = isSmartJumpCutEnabled ? stageData.text : (item.rawScript ? item.rawScript.slice(0, 60) + '...' : stageData.text);
        subText.innerHTML = `"${displayText}"<br><span class="highlight-word" style="color: #facc15; font-size: 11px; display: block; margin-top: 3px;">📌 ${stageData.key}</span>`;
    }

    // 5. Update Storyboard Flow Card Active Step
    ['start', 'middle', 'end'].forEach(s => {
        const flowBox = document.getElementById(`flow-step-${s}`);
        if (flowBox) {
            if (s === stage) flowBox.classList.add('active');
            else flowBox.classList.remove('active');
        }
    });

    // 6. Jump Underlying Video Player Time if requested
    if (seekVideo) {
        const baseSec = parseTimestampToSeconds(item.time);
        const targetSec = baseSec + (item.story[stage].secOffset || 0);

        const videoPlayer = document.getElementById('uploaded-video-player');
        const ytPlayer = document.getElementById('youtube-iframe-player');

        if (currentDataset.videoId && ytPlayer) {
            if (ytPlayer.src && ytPlayer.src.includes(currentDataset.videoId)) {
                sendYtCommand('seekTo', [targetSec, true]);
                if (!isAudioMuted) {
                    sendYtCommand('unMute', []);
                    sendYtCommand('setVolume', [currentAudioVolume]);
                }
                sendYtCommand('playVideo', []);
            } else {
                const origin = encodeURIComponent(window.location.origin || 'http://localhost:8080');
                ytPlayer.src = `https://www.youtube.com/embed/${currentDataset.videoId}?enablejsapi=1&autoplay=1&mute=0&start=${targetSec}&end=${baseSec + 60}&rel=0&origin=${origin}&widget_referrer=${origin}`;
            }
        } else if (videoPlayer && videoPlayer.src) {
            videoPlayer.currentTime = targetSec;
            videoPlayer.muted = isAudioMuted;
            videoPlayer.volume = isAudioMuted ? 0 : (currentAudioVolume / 100);
            videoPlayer.play().catch(() => {});
        }

        if (audioSourceMode === 'ai_voice' && isPlaying) {
            playCurrentStageNarration();
        }

        showToast(`📍 [${stage === 'start' ? '1. 시작 화두' : stage === 'middle' ? '2. 핵심 전개' : '3. 결단 강조'}] 구간으로 이동했습니다.`);
    }
}

function updateStoryNavigatorUI(item) {
    if (!item) return;
    ensureItemStory(item);
    const s = item.story;

    const tStart = document.getElementById('story-nav-title-start');
    const tMiddle = document.getElementById('story-nav-title-middle');
    const tEnd = document.getElementById('story-nav-title-end');

    const timeStart = document.getElementById('story-nav-time-start');
    const timeMiddle = document.getElementById('story-nav-time-middle');
    const timeEnd = document.getElementById('story-nav-time-end');

    if (tStart) tStart.textContent = s.start.key || '도입 화두';
    if (tMiddle) tMiddle.textContent = s.middle.key || '핵심 비유 전개';
    if (tEnd) tEnd.textContent = s.end.key || '결단 강조 마침';

    if (timeStart) timeStart.textContent = s.start.timeStr || '00:00 ~ 00:15 (15초)';
    if (timeMiddle) timeMiddle.textContent = s.middle.timeStr || '00:15 ~ 00:42 (27초)';
    if (timeEnd) timeEnd.textContent = s.end.timeStr || '00:42 ~ 01:00 (18초)';

    updateStoryFlowSummaryUI(item);
}

function updateStoryFlowSummaryUI(item) {
    if (!item) return;
    ensureItemStory(item);
    const s = item.story;

    const flowTitle = document.getElementById('flow-title');
    if (flowTitle) {
        flowTitle.textContent = `1분 은혜 쇼츠 완성 스토리보드: ${item.line1 || ''} ${item.line2 || ''}`;
    }

    const keyStart = document.getElementById('flow-key-start');
    const textStart = document.getElementById('flow-text-start');
    const timeStart = document.getElementById('flow-time-start');

    const keyMiddle = document.getElementById('flow-key-middle');
    const textMiddle = document.getElementById('flow-text-middle');
    const timeMiddle = document.getElementById('flow-time-middle');

    const keyEnd = document.getElementById('flow-key-end');
    const textEnd = document.getElementById('flow-text-end');
    const timeEnd = document.getElementById('flow-time-end');

    if (keyStart) keyStart.textContent = s.start.key;
    if (textStart) textStart.textContent = `"${s.start.text}"`;
    if (timeStart) timeStart.textContent = s.start.timeStr || '00:00 ~ 00:15 (15초)';

    if (keyMiddle) keyMiddle.textContent = s.middle.key;
    if (textMiddle) textMiddle.textContent = `"${s.middle.text}"`;
    if (timeMiddle) timeMiddle.textContent = s.middle.timeStr || '00:15 ~ 00:42 (27초)';

    if (keyEnd) keyEnd.textContent = s.end.key;
    if (textEnd) textEnd.textContent = `"${s.end.text}"`;
    if (timeEnd) timeEnd.textContent = s.end.timeStr || '00:42 ~ 01:00 (18초)';
}

// Instant 1-Minute Shorts Producer & Auto-Player
function produceAndPlay1MinShorts(idx) {
    selectHighlight(idx);
    resetShortsTimer();
    jumpToStoryStage('start', true);

    if (!isPlaying) {
        toggleShortsPlay();
    } else {
        startShortsTimer();
    }

    showToast(`🎬 [1분 완결 쇼츠 #${idx + 1}] 제작 완료! (도입 ➔ 핵심 ➔ 결론 서사 연결)`);

    const phone = document.getElementById('shorts-phone-container');
    if (phone) {
        phone.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function replay1MinShortsFromStart() {
    resetShortsTimer();
    jumpToStoryStage('start', true);
    if (!isPlaying) {
        toggleShortsPlay();
    } else {
        startShortsTimer();
    }
    showToast('🔄 1분 완결 쇼츠를 처음(00:00)부터 다시 재생합니다.');
}

/* 4-E. Smart Jump-Cut & Filler Word Cleaner Handlers */
function toggleSmartJumpCut(checked) {
    isSmartJumpCutEnabled = checked;
    const statusText = document.getElementById('jumpcut-status-text');
    if (statusText) {
        statusText.textContent = checked ? '필터 가동 중' : '필터 해제됨 (원음)';
        statusText.style.color = checked ? '#10b981' : '#94a3b8';
    }

    if (!currentDataset || !currentDataset.highlights || !currentDataset.highlights[currentHighlightIdx]) return;
    const item = currentDataset.highlights[currentHighlightIdx];

    // Refresh Subtitle
    jumpToStoryStage(currentStoryStage);

    if (checked) {
        showToast('✂️ AI 스마트 컷 가동: 음~, 어~ 및 불필요한 호흡이 0.1초 단위로 자동 삭제되었습니다.');
    } else {
        showToast('원본 음성 모드로 전환되었습니다. (불필요한 호흡 및 추임새 포함)');
    }
}

function updateCutOptions() {
    showToast('⚡ 필러워드 & 무음 점프컷 설정이 실시간 적용되었습니다.');
    if (!currentDataset || !currentDataset.highlights) return;
    jumpToStoryStage(currentStoryStage);
}

function updateJumpCutStatsUI(item) {
    if (!item || !item.cutStats) return;

    const statFiller = document.getElementById('stat-filler-count');
    const statTime = document.getElementById('stat-time-saved');
    const statClarity = document.getElementById('stat-clarity-boost');

    if (statFiller) statFiller.textContent = `${item.cutStats.fillerRemoved}개`;
    if (statTime) statTime.textContent = `${item.cutStats.silenceCutSec} 절약`;
    if (statClarity) statClarity.textContent = `${item.cutStats.clarityBoost || '+38%'} 향상`;
}

function openScriptCompareModal() {
    if (!currentDataset || !currentDataset.highlights || !currentDataset.highlights[currentHighlightIdx]) return;
    const item = currentDataset.highlights[currentHighlightIdx];

    const modal = document.getElementById('modal-script-compare');
    if (!modal) return;

    const statFiller = document.getElementById('modal-stat-filler');
    const statTime = document.getElementById('modal-stat-time');
    const statClarity = document.getElementById('modal-stat-clarity');

    if (statFiller) statFiller.textContent = `${item.cutStats.fillerRemoved}개 (${item.cutStats.fillerTypes || '음~, 어~'})`;
    if (statTime) statTime.textContent = `${item.cutStats.silenceCutSec} 단축 (60초 완벽 핏)`;
    if (statClarity) statClarity.textContent = `${item.cutStats.clarityBoost || '+38%'} 향상 (99.8%)`;

    // Format raw script with red strikethrough badges
    const rawBox = document.getElementById('modal-raw-script-box');
    if (rawBox && item.rawScript) {
        let rawHtml = item.rawScript
            .replace(/(음\.\.\.|음~|어\.\.\.|어~|그\.\.\.|이제\.\.\.)/g, '<span class="filler-word-bad">$1</span>');
        rawBox.innerHTML = rawHtml;
    }

    // Format cleaned script with yellow key badges
    const cleanBox = document.getElementById('modal-clean-script-box');
    if (cleanBox && item.cleanedScript) {
        cleanBox.innerHTML = `<span class="key-word-good">"${item.cleanedScript}"</span>`;
    }

    // Breakdown
    const storyList = document.getElementById('modal-story-breakdown-list');
    if (storyList && item.story) {
        storyList.innerHTML = `
            <div style="display: flex; gap: 8px;">
                <span class="story-row-tag tag-start" style="font-weight: 800;">1. 시작 (도입 화두)</span>
                <span>${item.story.start.text}</span>
            </div>
            <div style="display: flex; gap: 8px;">
                <span class="story-row-tag tag-middle" style="font-weight: 800;">2. 중간 (핵심 전개)</span>
                <span>${item.story.middle.text}</span>
            </div>
            <div style="display: flex; gap: 8px;">
                <span class="story-row-tag tag-end" style="font-weight: 800;">3. 결과 (강조 마침)</span>
                <span>${item.story.end.text}</span>
            </div>
        `;
    }

    modal.style.display = 'flex';
}

/* 5. Highlight Cards Renderer with 3-Stage Story Summaries */
function renderHighlightCards() {
    const container = document.getElementById('highlight-cards-list');
    const modalContainer = document.getElementById('modal-hl-cards-list');
    
    if (!currentDataset || !currentDataset.highlights) return;

    if (container) {
        container.innerHTML = currentDataset.highlights.map((item, idx) => {
            const isSelected = (idx === currentHighlightIdx);
            const line1 = item.line1 || '설교 하이라이트';
            const line2 = item.line2 || '핵심 은혜 선포';
            const timeRange = item.timeRange || (item.time.includes('(') ? item.time.split('(')[0].trim() : item.time);
            const duration = item.duration || (item.time.includes('(') ? item.time.split('(')[1].replace(')', '').trim() : '1분');

            const sStart = item.story ? item.story.start.text : item.quote;
            const sMiddle = item.story ? item.story.middle.text : '';
            const sEnd = item.story ? item.story.end.text : '';
            const fillerCount = item.cutStats ? item.cutStats.fillerRemoved : 14;
            const timeSaved = item.cutStats ? item.cutStats.silenceCutSec : '4.8초';

            return `
                <div class="seolgyo-card ${isSelected ? 'active' : ''}" onclick="selectHighlight(${idx})" id="hl-card-${idx}">
                    <!-- Top Right Blue Check Circle -->
                    <div class="card-check-icon">
                        <i class="${isSelected ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle'}"></i>
                    </div>

                    <!-- Black 9:16 Vertical Phone Screen Mockup -->
                    <div class="card-screen-mockup">
                        <div class="mockup-text-line1" id="hl-line1-preview-${idx}">${line1}</div>
                        <div class="mockup-text-line2" id="hl-line2-preview-${idx}">${line2}</div>
                    </div>

                    <!-- Time Header & Badges -->
                    <div class="card-time-row">
                        <span class="card-time-range">${timeRange}</span>
                        <span class="card-dur-badge">${duration}</span>
                        <span class="card-story-badge"><i class="fa-solid fa-layer-group"></i> 서사 완결 100%</span>
                        <span style="font-size: 10px; color: #facc15; font-weight: 700; margin-left: auto;">${item.intentBadge || '🔥 클라이맥스'}</span>
                    </div>

                    <!-- 3-Stage Story Breakdown Block -->
                    <div class="card-story-breakdown">
                        <div class="story-row-item">
                            <span class="story-row-tag tag-start">시작</span>
                            <span class="story-row-text">${sStart.slice(0, 36)}...</span>
                        </div>
                        ${sMiddle ? `
                        <div class="story-row-item">
                            <span class="story-row-tag tag-middle">중간</span>
                            <span class="story-row-text">${sMiddle.slice(0, 36)}...</span>
                        </div>` : ''}
                        ${sEnd ? `
                        <div class="story-row-item">
                            <span class="story-row-tag tag-end">결과</span>
                            <span class="story-row-text">${sEnd.slice(0, 36)}...</span>
                        </div>` : ''}
                    </div>

                    <!-- Jump-Cut Cleansing Badge -->
                    <div style="font-size: 10.5px; color: #10b981; margin-bottom: 8px; display: flex; align-items: center; gap: 5px;">
                        <i class="fa-solid fa-scissors"></i>
                        <span>AI 정제: 추임새 ${fillerCount}개 삭제 · ${timeSaved} 단축 (완벽 1분 핏)</span>
                    </div>

                    <!-- 1-Minute Completed Shorts Instant Production & Play Button -->
                    <button class="card-produce-shorts-btn" onclick="event.stopPropagation(); produceAndPlay1MinShorts(${idx});">
                        <i class="fa-solid fa-wand-magic-sparkles"></i> 🎬 1분 완결 쇼츠 바로 제작 & 재생 (60초)
                    </button>

                    <!-- Editable Title Inputs (Direct Editable Fields) -->
                    <div class="card-edit-section" onclick="event.stopPropagation();">
                        <span class="card-edit-label">제목 (직접 수정 가능)</span>
                        <input type="text" class="card-input-box" value="${line1}" 
                               oninput="updateHighlightTitle(${idx}, 'line1', this.value)" 
                               placeholder="상단 제목 입력">
                        <input type="text" class="card-input-box yellow-highlight" value="${line2}" 
                               oninput="updateHighlightTitle(${idx}, 'line2', this.value)" 
                               placeholder="강조 제목(노란색) 입력">
                    </div>
                </div>
            `;
        }).join('');
    }

    if (modalContainer) {
        modalContainer.innerHTML = currentDataset.highlights.map((item, idx) => `
            <div class="modal-hl-card ${idx === currentHighlightIdx ? 'active' : ''}" onclick="selectModalHighlight(${idx})" style="background: ${idx === currentHighlightIdx ? 'rgba(30, 41, 59, 0.9)' : 'rgba(30, 41, 59, 0.4)'}; border: 1px solid ${idx === currentHighlightIdx ? '#38bdf8' : '#334155'}; border-radius: 10px; padding: 10px; cursor: pointer; transition: all 0.2s;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                    <span style="font-size: 10px; background: rgba(59, 130, 246, 0.25); color: #38bdf8; padding: 2px 6px; border-radius: 4px; font-weight: 800;">${item.viral || '🔥 98점'}</span>
                    <span style="font-size: 9px; color: #10b981; font-weight: 700;">✂️ 정제 완료</span>
                </div>
                <h5 style="font-size: 12px; font-weight: 700; color: #fff; margin: 4px 0 2px 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${(item.line1 ? item.line1 + ' ' + item.line2 : item.title).replace(/"/g, '')}</h5>
                <p style="font-size: 11px; color: #94a3b8; margin: 0;">${item.time}</p>
            </div>
        `).join('');
    }
}

function updateHighlightTitle(idx, field, value) {
    if (!currentDataset || !currentDataset.highlights || !currentDataset.highlights[idx]) return;
    
    currentDataset.highlights[idx][field] = value;
    
    // Update card mockup text
    const previewEl = document.getElementById(`hl-${field}-preview-${idx}`);
    if (previewEl) {
        previewEl.textContent = value;
    }
    
    const item = currentDataset.highlights[idx];
    item.title = `"${item.line1 || ''} ${item.line2 || ''}"`;
    
    // If active card, update live 9:16 simulator hook title
    if (idx === currentHighlightIdx) {
        const hook1 = document.getElementById('seolgyo-hook-line-1');
        const hook2 = document.getElementById('seolgyo-hook-line-2');
        if (field === 'line1' && hook1) hook1.textContent = value;
        if (field === 'line2' && hook2) hook2.textContent = value;
    }
}

function loadSampleVideo(key) {
    if (!sampleData[key]) return;
    currentDataset = sampleData[key];
    currentHighlightIdx = 0;

    // Unmute audio on user gesture
    unmuteAllAudio();

    const projTitle = document.getElementById('current-project-title');
    const aiStatus = document.getElementById('ai-status-text');
    if (projTitle) projTitle.textContent = `Project: ${currentDataset.title}`;
    if (aiStatus) aiStatus.textContent = `AI 설교 구간 추출 완료 (${currentDataset.length})`;

    if (key === 'gwanyu') {
        const ytInput = document.getElementById('youtube-url-input');
        if (ytInput) ytInput.value = 'https://youtube.com/live/fB-uX_pZZvs?feature=share';
        const successBanner = document.getElementById('ai-result-success-banner');
        if (successBanner) {
            successBanner.style.display = 'block';
            const bTitle = document.getElementById('success-banner-title');
            const bSub = document.getElementById('success-banner-subtitle');
            if (bTitle) bTitle.textContent = currentDataset.title.replace('.mp4', '');
            if (bSub) bSub.textContent = `전체 ${currentDataset.length.split('(')[0].trim()} 영상에서 가장 중요하고 은혜로운 1분 핵심 쇼츠 10개가 준비되었습니다!`;
        }
    }

    renderWaveformHeatmap();
    renderHighlightCards();
    selectHighlight(0);
    scrollToSection('studio-workspace');
    showToast(`🎬 ${currentDataset.title.replace('.mp4', '')} 데이터가 로드되었습니다.`);
}

function initStudioHighlights() {
    const projTitle = document.getElementById('current-project-title');
    const aiStatus = document.getElementById('ai-status-text');
    if (projTitle && currentDataset) projTitle.textContent = `Project: ${currentDataset.title}`;
    if (aiStatus && currentDataset) aiStatus.textContent = `AI 설교 구간 추출 완료 (${currentDataset.length})`;

    renderWaveformHeatmap();
    renderHighlightCards();
    selectHighlight(0);
}

function parseTimestampToSeconds(timeStr) {
    if (!timeStr) return 0;
    const firstPart = timeStr.split('~')[0].trim();
    const parts = firstPart.split(':').map(p => parseInt(p.trim(), 10));
    if (parts.length === 3) {
        return parts[0] * 3600 + parts[1] * 60 + parts[2];
    } else if (parts.length === 2) {
        return parts[0] * 60 + parts[1];
    } else if (parts.length === 1 && !isNaN(parts[0])) {
        return parts[0];
    }
    return 0;
}

function selectHighlight(idx) {
    if (!currentDataset || !currentDataset.highlights || !currentDataset.highlights[idx]) return;
    currentHighlightIdx = idx;

    const cards = document.querySelectorAll('.seolgyo-card');
    cards.forEach((c, i) => {
        const icon = c.querySelector('.card-check-icon i');
        if (i === idx) {
            c.classList.add('active');
            if (icon) icon.className = 'fa-solid fa-circle-check';
        } else {
            c.classList.remove('active');
            if (icon) icon.className = 'fa-regular fa-circle';
        }
    });

    const modalCards = document.querySelectorAll('.modal-hl-card');
    modalCards.forEach((c, i) => {
        if (i === idx) {
            c.classList.add('active');
            c.style.borderColor = '#38bdf8';
            c.style.background = 'rgba(30, 41, 59, 0.9)';
        } else {
            c.classList.remove('active');
            c.style.borderColor = '#334155';
            c.style.background = 'rgba(30, 41, 59, 0.4)';
        }
    });

    const currentItem = currentDataset.highlights[idx];
    if (currentItem) {
        // 1. Update Top 2-Line Hook Title (Seolgyo AI Standard)
        const hook1 = document.getElementById('seolgyo-hook-line-1');
        const hook2 = document.getElementById('seolgyo-hook-line-2');
        const hookInput1 = document.getElementById('hook-title-line1');
        const hookInput2 = document.getElementById('hook-title-line2');

        const l1 = currentItem.line1 || "교회는 유람선인가";
        const l2 = currentItem.line2 || "구조선인가";

        if (hook1) hook1.textContent = l1;
        if (hook2) hook2.textContent = l2;
        if (hookInput1) hookInput1.value = l1;
        if (hookInput2) hookInput2.value = l2;

        // 2. Update Scripture Reference
        const subRef = document.getElementById('sub-bible-ref');
        if (subRef) subRef.textContent = currentItem.ref || '📖 설교 하이라이트';

        // 3. Update Story Navigator & Jump-Cut Stats & Wave Marker
        updateStoryNavigatorUI(currentItem);
        updateJumpCutStatsUI(currentItem);
        updateWaveMarker(currentItem);

        // 4. Set Initial Story Stage (Start: Hook) & Reset 60s Shorts Timer
        currentStoryStage = 'start';
        resetShortsTimer();
        jumpToStoryStage('start', false);

        // 5. Update Description
        const descBox = document.getElementById('shorts-desc-text');
        if (descBox) {
            descBox.textContent = `[복의근원 관유중앙교회] ${currentItem.title.replace(/^"|"$/g, '')} · ${currentItem.tag}`;
        }

        const startSec = parseTimestampToSeconds(currentItem.time);

        const videoPlayer = document.getElementById('uploaded-video-player');
        const ytPlayer = document.getElementById('youtube-iframe-player');
        const imgLayer = document.getElementById('preview-img-layer');

        if (currentDataset.videoId) {
            const origin = encodeURIComponent(window.location.origin || 'http://localhost:8080');
            const targetSrc = `https://www.youtube.com/embed/${currentDataset.videoId}?enablejsapi=1&autoplay=1&mute=0&start=${startSec}&end=${startSec + 60}&rel=0&origin=${origin}&widget_referrer=${origin}`;
            if (ytPlayer) {
                if (ytPlayer.src && ytPlayer.src.includes(currentDataset.videoId)) {
                    sendYtCommand('seekTo', [startSec, true]);
                    if (!isAudioMuted) {
                        sendYtCommand('unMute', []);
                        sendYtCommand('setVolume', [currentAudioVolume]);
                    }
                    sendYtCommand('playVideo', []);
                } else {
                    ytPlayer.src = targetSrc;
                }
                ytPlayer.style.display = 'block';
                setTimeout(() => {
                    if (!isAudioMuted) {
                        sendYtCommand('unMute', []);
                        sendYtCommand('setVolume', [currentAudioVolume]);
                    }
                    sendYtCommand('setPlaybackRate', [currentShortsSpeed]);
                }, 500);
            }
            if (videoPlayer) videoPlayer.style.display = 'none';
            if (imgLayer) imgLayer.style.display = 'none';
            isPlaying = true;
            const icon = document.getElementById('phone-play-icon');
            if (icon) icon.className = 'fa-solid fa-pause';
            const flowIcon = document.getElementById('flow-play-btn-icon');
            if (flowIcon) flowIcon.className = 'fa-solid fa-pause';
            const btnFlowPlay = document.getElementById('btn-flow-play');
            if (btnFlowPlay) btnFlowPlay.innerHTML = '<i class="fa-solid fa-pause" id="flow-play-btn-icon"></i> 1분 쇼츠 일시정지';
            const eqBars = document.querySelectorAll('.audio-equalizer span');
            eqBars.forEach(bar => bar.style.animationPlayState = 'running');

            startShortsTimer();

            if (audioSourceMode === 'ai_voice') {
                playCurrentStageNarration();
            }
        } else if (videoPlayer && videoPlayer.src) {
            if (ytPlayer) ytPlayer.style.display = 'none';
            if (imgLayer) imgLayer.style.display = 'none';
            videoPlayer.style.display = 'block';
            videoPlayer.playbackRate = currentShortsSpeed;
            videoPlayer.muted = isAudioMuted;
            videoPlayer.volume = isAudioMuted ? 0 : (currentAudioVolume / 100);

            if (videoPlayer.duration && !isNaN(videoPlayer.duration)) {
                const targetTime = Math.min(startSec, Math.max(0, videoPlayer.duration - 1));
                videoPlayer.currentTime = targetTime;
            } else {
                videoPlayer.currentTime = 0;
            }
            videoPlayer.play().then(() => {
                videoPlayer.playbackRate = currentShortsSpeed;
                isPlaying = true;
                const icon = document.getElementById('phone-play-icon');
                if (icon) icon.className = 'fa-solid fa-pause';
                const flowIcon = document.getElementById('flow-play-btn-icon');
                if (flowIcon) flowIcon.className = 'fa-solid fa-pause';
                const btnFlowPlay = document.getElementById('btn-flow-play');
                if (btnFlowPlay) btnFlowPlay.innerHTML = '<i class="fa-solid fa-pause" id="flow-play-btn-icon"></i> 1분 쇼츠 일시정지';
                const eqBars = document.querySelectorAll('.audio-equalizer span');
                eqBars.forEach(bar => bar.style.animationPlayState = 'running');

                startShortsTimer();
            }).catch(() => {
                isPlaying = false;
            });

            if (audioSourceMode === 'ai_voice') {
                playCurrentStageNarration();
            }
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
    const flowIcon = document.getElementById('flow-play-btn-icon');
    const btnFlowPlay = document.getElementById('btn-flow-play');
    const eqBars = document.querySelectorAll('.audio-equalizer span');
    const imgLayer = document.getElementById('preview-img-layer');
    const videoPlayer = document.getElementById('uploaded-video-player');
    const ytPlayer = document.getElementById('youtube-iframe-player');

    if (isPlaying) {
        if (icon) icon.className = 'fa-solid fa-pause';
        if (flowIcon) flowIcon.className = 'fa-solid fa-pause';
        if (btnFlowPlay) btnFlowPlay.innerHTML = '<i class="fa-solid fa-pause" id="flow-play-btn-icon"></i> 1분 쇼츠 일시정지';
        eqBars.forEach(bar => bar.style.animationPlayState = 'running');

        // Always hide static image overlay when playing so active video is visible
        if (imgLayer) imgLayer.style.display = 'none';

        if (videoPlayer && videoPlayer.style.display !== 'none' && videoPlayer.src) {
            videoPlayer.muted = isAudioMuted;
            videoPlayer.volume = isAudioMuted ? 0 : (currentAudioVolume / 100);
            videoPlayer.play().catch(e => console.warn('Video play error:', e));
        } else if (ytPlayer) {
            ytPlayer.style.display = 'block';
            sendYtCommand('playVideo', []);
            if (!isAudioMuted) {
                sendYtCommand('unMute', []);
                sendYtCommand('setVolume', [currentAudioVolume]);
            }
        }

        // Start 60s shorts timer
        startShortsTimer();

        if (audioSourceMode === 'ai_voice') {
            playCurrentStageNarration();
        }

        showToast('▶️ 1분 완결 쇼츠 재생 시작 (60초 카운트다운)');
    } else {
        if (icon) icon.className = 'fa-solid fa-play';
        if (flowIcon) flowIcon.className = 'fa-solid fa-play';
        if (btnFlowPlay) btnFlowPlay.innerHTML = '<i class="fa-solid fa-play" id="flow-play-btn-icon"></i> 1분 쇼츠 재생';
        eqBars.forEach(bar => bar.style.animationPlayState = 'paused');

        if (videoPlayer && videoPlayer.src) {
            videoPlayer.pause();
        }
        if (ytPlayer) {
            sendYtCommand('pauseVideo', []);
        }

        // Stop 60s shorts timer
        stopShortsTimer();
        stopAiVoiceNarration();
        showToast('⏸️ 1분 쇼츠 일시 정지');
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
        hdr: "복의근원 관유중앙교회 주일 설교 (Slide 1/5)"
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
    const text = `[주간 QT 6일치 모음]\n월요일: 마 14:22-25 밤사경의 오심\n화요일: 마 14:26-27 안심하라 나니\n수요일: 마 14:28-29 배 밖으로 발 내딛기\n목요일: 마 14:30-31 즉시 내민 손\n금요일: 마 14:32-33 잔잔해진 바다\n토요일: 마 14:33 참으로 하나님의 아들이로소이다`;
    copyTextToClipboard(text, '📱 카톡 공유용 6일치 QT 텍스트가 복사되었습니다!');
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
    if (!file) return;

    // Check video file extension or MIME type
    const isVideo = file.type.startsWith('video/') || /\.(mp4|mov|mkv|webm|avi|m4v)$/i.test(file.name);
    if (!isVideo) {
        showToast('⚠️ 올바른 동영상 파일(MP4, MOV, MKV, WebM)을 선택해주세요.', 'warning');
        return;
    }

    const objectUrl = URL.createObjectURL(file);
    const videoPlayer = document.getElementById('uploaded-video-player');
    const imgLayer = document.getElementById('preview-img-layer');
    const projTitle = document.getElementById('current-project-title');
    const aiStatus = document.getElementById('ai-status-text');
    const dropzoneBox = document.getElementById('dropzone');

    showToast(`📂 동영상 파일 '${file.name}' 업로드 분석 중...`);

    if (projTitle) projTitle.textContent = `Project: ${file.name}`;
    
    // Update Dropzone Visual Status
    if (dropzoneBox) {
        const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
        dropzoneBox.style.borderColor = '#10b981';
        dropzoneBox.style.background = 'rgba(16, 185, 129, 0.1)';
        dropzoneBox.innerHTML = `
            <i class="fa-solid fa-circle-check" style="font-size: 32px; color: #10b981; margin-bottom: 8px;"></i>
            <div style="font-weight: 800; font-size: 14px; color: #10b981; margin-bottom: 4px;">✅ 업로드 완료: ${file.name} (${sizeMb} MB)</div>
            <div style="font-size: 12px; color: #94a3b8;">AI가 설교 구간을 탐지하고 1분 쇼츠를 준비했습니다. 다른 파일로 변경하려면 클릭하세요.</div>
            <input type="file" id="file-input" accept="video/*" style="display: none;">
        `;
        const newFileInput = document.getElementById('file-input');
        if (newFileInput) {
            newFileInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) handleFileUpload(e.target.files[0]);
            });
        }
    }

    // Set Video Source & Load Metadata
    const ytPlayer = document.getElementById('youtube-iframe-player');
    if (ytPlayer) ytPlayer.style.display = 'none';

    if (videoPlayer) {
        videoPlayer.src = objectUrl;
        videoPlayer.style.display = 'block';
        if (imgLayer) imgLayer.style.display = 'none';

        videoPlayer.onloadedmetadata = () => {
            const durationSec = Math.floor(videoPlayer.duration || 60);
            const mins = Math.floor(durationSec / 60);
            const secs = durationSec % 60;
            const durationStr = `${mins}분 ${secs}초`;

            if (aiStatus) {
                aiStatus.textContent = `AI 설교 구간 추출 완료 (업로드 영상 길이: ${durationStr})`;
            }

            // Update Trimmer default start and end times
            const trimStartMin = document.getElementById('trim-start-min');
            const trimStartSec = document.getElementById('trim-start-sec');
            const trimEndMin = document.getElementById('trim-end-min');
            const trimEndSec = document.getElementById('trim-end-sec');

            if (trimStartMin) trimStartMin.value = 0;
            if (trimStartSec) trimStartSec.value = 0;
            
            const endOffsetSec = Math.min(60, durationSec);
            if (trimEndMin) trimEndMin.value = Math.floor(endOffsetSec / 60);
            if (trimEndSec) trimEndSec.value = endOffsetSec % 60;

            if (typeof updateTrimmerTime === 'function') {
                updateTrimmerTime();
            }

            // Update AI Highlight Dataset for Uploaded Video using actual video duration
            updateHighlightsForUploadedVideo(file.name, videoPlayer.duration);

            // Play the uploaded video
            videoPlayer.play().then(() => {
                isPlaying = true;
                const icon = document.getElementById('phone-play-icon');
                if (icon) icon.className = 'fa-solid fa-pause';
                const eqBars = document.querySelectorAll('.audio-equalizer span');
                eqBars.forEach(bar => bar.style.animationPlayState = 'running');
            }).catch(() => {
                // Autoplay policy fallback
                isPlaying = false;
            });
        };
    }

    // Initial trigger with default fallback
    updateHighlightsForUploadedVideo(file.name, 600);

    setTimeout(() => {
        scrollToSection('studio');
        showToast('✨ 업로드된 MP4 동영상으로 1분 은혜 쇼츠 생성이 완료되었습니다!');
    }, 600);
}

function formatSecToMinSec(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function updateHighlightsForUploadedVideo(fileName, durationSec) {
    const cleanName = fileName.replace(/\.[^/.]+$/, "");
    const dur = Math.max(30, Math.floor(durationSec || 600));
    const step = dur > 60 ? (dur - 30) / 9 : dur / 10;

    const titles = [
        `"${cleanName} 핵심 명장면 쇼츠"`,
        `"${cleanName} 결단과 감사의 순간"`,
        `"${cleanName} 두려움을 이기는 담대한 믿음"`,
        `"${cleanName} 막힌 기도의 문을 열어젖히는 능력"`,
        `"${cleanName} 상처받은 마음을 치유하시는 주님"`,
        `"${cleanName} 광야에 길을 내하시는 하나님의 기적"`,
        `"${cleanName} 영적 전쟁에서 승리하는 말씀 선포"`,
        `"${cleanName} 가정을 축복으로 만드는 거룩한 기도"`,
        `"${cleanName} 포기하지 않는 믿음이 가져오는 반전"`,
        `"${cleanName} 주님의 평강이 임하는 거룩한 결단"`
    ];

    const quotes = [
        `"오늘 우리가 함께 듣는 이 말씀이 삶의 모든 어려움을 이겨낼 거룩한 능력이 될 것입니다!"`,
        `"하나님의 은혜는 결코 우연이 아닙니다. 지금 기도하는 당신에게 주님의 위로가 임합니다."`,
        `"인생의 폭풍이 불어올 때 우리가 바라보아야 할 것은 파도가 아니라 바로 예수 그리스도의 말씀입니다!"`,
        `"내 힘으로 안 될 때가 바로 하나님의 역사가 시작되는 시간입니다. 멈추지 말고 부르짖으십시오!"`,
        `"사람은 날 버려도 주님은 결코 나를 포기하지 않으십니다. 십자가의 사랑을 기억하십시오."`,
        `"광야에 길을 내시고 사막에 강을 내시는 주님의 기적이 당신의 가문과 삶에 임합니다!"`,
        `"악한 영의 어둠은 오직 하나님의 살아있는 말씀 선포 앞에서 즉시 무너져 내립니다!"`,
        `"부모의 눈물 어린 기도는 자녀의 평생을 지키는 하나님의 거룩한 울타리가 됩니다."`,
        `"낙심하지 마십시오. 가장 어두운 밤이 지나면 반드시 하나님의 찬란한 아침이 밝아옵니다."`,
        `"세상이 줄 수 없는 진정한 평안이 오늘 이 자리에서 주님을 고백하는 당신의 심령에 임합니다."`
    ];

    const refs = [
        "📖 설교 하이라이트 #1", "📖 설교 하이라이트 #2", "📖 마태복음 14:29", "📖 예레미야 33:3",
        "📖 이사야 41:10", "📖 이사야 43:19", "📖 에베소서 6:17", "📖 잠언 22:6",
        "📖 갈라디아서 6:9", "📖 요한복음 14:27"
    ];

    const tags = [
        "#말씀 #은혜 #쇼츠", "#감사 #기도 #위로", "#믿음 #승리 #은혜", "#기도 #성령 #회복",
        "#치유 #사랑 #위로", "#비전 #새해 #소망", "#영적전쟁 #능력 #승리", "#가정 #축복 #기도",
        "#반전 #소망 #은혜", "#평강 #결단 #축도"
    ];

    const virals = [
        "🔥 AI 추출 99점", "✨ 은혜/결단 강추", "🔥 조회수 예측 98점", "📱 청년부 공유 추천",
        "✨ 영적회복 추천", "📱 청년/학생 강추", "🔥 AI 추출 96점", "✨ 가정예배 강추",
        "📱 SNS 공유 폭발", "✨ 은혜 결단 마무리"
    ];

    const line1s = [
        "교회에 온 당신",
        "그 사람 오면",
        "그 사람 오면",
        "제목은 단 한마디",
        "나는 괜찮은 사람?",
        "목사님 말씀 아니다",
        "얼어붙게 하는 사람 vs",
        "두려움을 이기는",
        "포기하지 않는 믿음이",
        "주님의 진정한 평강이"
    ];
    const line2s = [
        "흥왕케 하는 자",
        "분위기가 달라진다",
        "슬그머니 자리를 뜬다",
        "흥왕케 하는 자",
        "판단은 내가 안 한다",
        "하나님이 하신 말씀이다",
        "살아나게 하는 사람",
        "담대한 믿음 선포",
        "가져오는 반전의 역사",
        "임하는 거룩한 결단"
    ];

    const highlights = [];
    for (let i = 0; i < 10; i++) {
        const start = Math.floor(i * step);
        const end = Math.min(dur, start + Math.min(60, Math.floor(dur / 5)));
        const startStr = formatSecToMinSec(start);
        const endStr = formatSecToMinSec(end);
        const clipLen = Math.max(5, end - start);
        highlights.push({
            line1: line1s[i],
            line2: line2s[i],
            title: titles[i],
            quote: quotes[i],
            ref: refs[i],
            time: `${startStr} ~ ${endStr} (${clipLen}초)`,
            tag: tags[i],
            viral: virals[i]
        });
    }

    sampleData.uploaded = {
        title: fileName,
        length: `업로드 동영상 (${Math.floor(dur / 60)}분 ${dur % 60}초)`,
        highlights: highlights
    };

    currentDataset = sampleData.uploaded;
    currentHighlightIdx = 0;

    const projTitle = document.getElementById('current-project-title');
    const aiStatus = document.getElementById('ai-status-text');
    if (projTitle) projTitle.textContent = `Project: ${fileName}`;
    if (aiStatus) aiStatus.textContent = `AI 설교 구간 탐지 완료 (동영상 ${Math.floor(dur / 60)}분 중 1분 쇼츠 10개 추출)`;

    renderHighlightCards();
    selectHighlight(0);
}

function scrollToSection(id) {
    let targetId = id;
    if (targetId === 'studio') {
        const workspace = document.getElementById('studio-workspace');
        if (workspace) targetId = 'studio-workspace';
    }
    const el = document.getElementById(targetId);
    if (el) {
        const headerOffset = 80;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: 'smooth'
        });
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
                            <span style="font-size: 12px; color: #64748b;">복의근원 관유중앙교회 미디어팀 · Pro 멤버십 사용 중</span>
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

/* ==========================================================================
   Unlimited Shorts Creator Engine & Studio Workbench Handlers
   ========================================================================== */

function openShortsMakerModal(customUrl) {
    const modal = document.getElementById('modal-shorts-creator');
    if (modal) {
        modal.classList.add('active');
        const heroYt = document.getElementById('youtube-url-input');
        const defaultUrl = (heroYt && heroYt.value.trim()) ? heroYt.value.trim() : 'https://youtube.com/live/fB-uX_pZZvs?feature=share';
        const urlInput = document.getElementById('modal-yt-url');
        if (urlInput) urlInput.value = customUrl || defaultUrl;
        processModalShortsCreation();
    } else {
        scrollToSection('hero-input-box');
    }
}

function processShortsCreation() {
    const ytInput = document.getElementById('youtube-url-input');
    let url = ytInput ? ytInput.value.trim() : '';
    
    // Default to the user's specific live link if empty
    if (!url) {
        url = 'https://youtube.com/live/fB-uX_pZZvs?feature=share';
        if (ytInput) ytInput.value = url;
    }

    const startBtn = document.getElementById('start-ai-youtube');
    const originalBtnContent = startBtn ? startBtn.innerHTML : '';
    if (startBtn) {
        startBtn.disabled = true;
        startBtn.style.opacity = '0.7';
        startBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>AI 분석 진행 중...</span>';
    }

    // Show Progress Box and Hide previous success banner
    const progressCard = document.getElementById('ai-processing-status-card');
    const successBanner = document.getElementById('ai-result-success-banner');
    const pTitle = document.getElementById('ai-process-title');
    const pBar = document.getElementById('ai-process-bar');
    const pDesc = document.getElementById('ai-process-desc');

    if (successBanner) successBanner.style.display = 'none';
    if (progressCard) {
        progressCard.style.display = 'block';
        if (pBar) pBar.style.width = '20%';
        if (pTitle) pTitle.textContent = 'AI 설교 전편 고속 정밀 스캐닝 중... (20%)';
        if (pDesc) pDesc.textContent = '🎙️ 설교 전편 52분 음성 트랙 파싱 및 클라이맥스(dB 피크) 감정선 스캐닝 중...';
    }

    showToast('⚡ 설교 전편을 0.1초 단위로 스캔하여 [시작-중간-결과] 완결 쇼츠를 엄선 중입니다...');

    // Progress Step 2 (350ms): 3-Stage Story Structure Analysis
    setTimeout(() => {
        if (pBar) pBar.style.width = '55%';
        if (pTitle) pTitle.textContent = '3단 완결 서사 구조 (시작-중간-결과) 검증 중... (55%)';
        if (pDesc) pDesc.textContent = '📖 단순 자르기 방지: 도입 화두 ➔ 핵심 비유 ➔ 결단 강조가 이어지는 완결성 100% 구간 감지 중...';
        const step2 = document.getElementById('step-context');
        if (step2) step2.style.color = '#38bdf8';
    }, 350);

    // Progress Step 3 (750ms): Smart Jump-Cut & Filler Word Cleaner
    setTimeout(() => {
        if (pBar) pBar.style.width = '85%';
        if (pTitle) pTitle.textContent = 'AI 스마트 무음 & 추임새 0.1초 자동 컷편집 중... (85%)';
        if (pDesc) pDesc.textContent = '✂️ 음~, 어~, 말더듬, 습관적 반복어구 및 불필요한 호흡 공백 정밀 삭제 중...';
        const step3 = document.getElementById('step-peak');
        if (step3) step3.style.color = '#f59e0b';
    }, 750);

    // Progress Step 4 - Finish & Render (1200ms)
    setTimeout(() => {
        if (pBar) pBar.style.width = '100%';
        if (pTitle) pTitle.textContent = 'AI 정밀 쇼츠 10개 완성! (100%)';
        if (pDesc) pDesc.textContent = '🎉 [시작-중간-결과] 서사와 추임새 정제가 완료된 깔끔한 1분 은혜 쇼츠가 준비되었습니다!';
        const step4 = document.getElementById('step-shorts');
        if (step4) step4.style.color = '#10b981';

        // Generate the 10 shorts dataset
        generate10ShortsFromYouTube(url);

        // Restore button
        if (startBtn) {
            startBtn.disabled = false;
            startBtn.style.opacity = '1';
            startBtn.innerHTML = originalBtnContent || '<i class="fa-solid fa-wand-magic-sparkles"></i> <span>무료로 쇼츠 만들기</span>';
        }

        // Show Success Banner
        if (successBanner) {
            successBanner.style.display = 'block';
            const bTitle = document.getElementById('success-banner-title');
            const bSub = document.getElementById('success-banner-subtitle');
            if (bTitle) bTitle.textContent = currentDataset.title.replace('.mp4', '');
            if (bSub) bSub.textContent = `전체 ${currentDataset.length.split('(')[0].trim()} 영상에서 가장 중요하고 은혜로운 1분 핵심 쇼츠 10개가 생성되었습니다!`;
        }

        // Hide progress card after 900ms
        setTimeout(() => {
            if (progressCard) progressCard.style.display = 'none';
        }, 900);

        // Smooth scroll directly to the studio workspace
        scrollToSection('studio-workspace');

        // Add visual flash effect to workspace
        const workspace = document.getElementById('studio-workspace');
        if (workspace) {
            workspace.style.transition = 'box-shadow 0.5s ease';
            workspace.style.boxShadow = '0 0 35px rgba(56, 189, 248, 0.6)';
            setTimeout(() => {
                workspace.style.boxShadow = '';
            }, 2500);
        }

        showToast('🎉 AI 추출 완료! 영상 전체에서 10개의 1분 은혜 쇼츠가 생성되었습니다. 각 쇼츠를 클릭하여 9:16 플레이어로 감상하세요!');
    }, 1200);
}

function processModalShortsCreation() {
    const modalYt = document.getElementById('modal-yt-url');
    const heroYt = document.getElementById('youtube-url-input');
    const url = (modalYt && modalYt.value.trim()) ? modalYt.value.trim() : ((heroYt && heroYt.value.trim()) ? heroYt.value.trim() : 'https://youtube.com/live/fB-uX_pZZvs?feature=share');
    if (modalYt) modalYt.value = url;
    if (heroYt) heroYt.value = url;

    const scanBar = document.getElementById('modal-scan-bar');
    const scanStatus = document.getElementById('modal-scan-status');
    const scanTitle = document.getElementById('modal-scan-title');
    
    if (scanBar) scanBar.style.width = '15%';
    if (scanTitle) scanTitle.textContent = 'AI 설교 구간 스캐닝 중... (15%)';
    if (scanStatus) scanStatus.textContent = '🎙️ 영상 메타데이터 파싱 및 설교 음성 트랙 추출 중...';
    
    setTimeout(() => {
        if (scanBar) scanBar.style.width = '55%';
        if (scanTitle) scanTitle.textContent = '설교 오디오 분석 & 10개 1분 쇼츠 컷팅 중... (55%)';
        if (scanStatus) scanStatus.textContent = '📖 본문 말씀 감지 및 1분 쇼츠 10개 구간 자동 계산 중...';
    }, 400);

    setTimeout(() => {
        if (scanBar) scanBar.style.width = '100%';
        if (scanTitle) scanTitle.textContent = 'AI 설교 구간 추출 완료! (100%)';
        if (scanStatus) scanStatus.textContent = `✅ 영상 전체 분석 완료 · 🔥 1분 쇼츠 10개가 자동 생성되었습니다.`;
        
        generate10ShortsFromYouTube(url);
        showToast('🎉 10개의 1분 은혜 쇼츠 생성이 완료되었습니다!');
    }, 900);
}

function selectModalHighlight(idx) {
    document.querySelectorAll('.modal-hl-card').forEach((card, i) => {
        if (i === idx) {
            card.classList.add('active');
            card.style.borderColor = '#38bdf8';
            card.style.background = 'rgba(30, 41, 59, 0.8)';
        } else {
            card.classList.remove('active');
            card.style.borderColor = '#334155';
            card.style.background = 'rgba(30, 41, 59, 0.4)';
        }
    });
    selectHighlight(idx);
}

function scrollToStudioAndCloseModal() {
    closeModal('modal-shorts-creator');
    scrollToSection('studio');
}

function setAspectRatio(ratio) {
    const phoneFrame = document.querySelector('.phone-frame');
    document.querySelectorAll('.aspect-btn').forEach(btn => {
        if (btn.innerText.includes(ratio)) {
            btn.classList.add('active');
            btn.style.borderColor = '#38bdf8';
            btn.style.background = 'rgba(30, 41, 59, 0.9)';
            btn.style.color = '#ffffff';
        } else {
            btn.classList.remove('active');
            btn.style.borderColor = '#334155';
            btn.style.background = 'rgba(30, 41, 59, 0.4)';
            btn.style.color = '#94a3b8';
        }
    });

    if (phoneFrame) {
        if (ratio === '16:9') {
            phoneFrame.style.aspectRatio = '16 / 9';
            phoneFrame.style.maxHeight = '320px';
        } else if (ratio === '1:1') {
            phoneFrame.style.aspectRatio = '1 / 1';
            phoneFrame.style.maxHeight = '400px';
        } else {
            phoneFrame.style.aspectRatio = '9 / 16';
            phoneFrame.style.maxHeight = '580px';
        }
    }
    showToast(`📐 화면 비율이 '${ratio}'(으)로 변경되었습니다.`);
}

function setShortsPlaybackSpeed(rate) {
    currentShortsSpeed = parseFloat(rate);

    // Update Speed Badge Text
    const badge = document.getElementById('speed-badge');
    if (badge) {
        badge.textContent = `${rate}x 배속`;
    }

    // Update Speed Chips Buttons UI
    document.querySelectorAll('.speed-selector-grid .speed-chip').forEach(btn => {
        btn.classList.remove('active');
        btn.style.background = 'rgba(30, 41, 59, 0.6)';
        btn.style.borderColor = '#334155';
        btn.style.color = '#cbd5e1';
        btn.style.fontWeight = '700';
    });

    const activeBtn = document.getElementById(`speed-btn-${rate.toFixed(1)}`) || document.getElementById(`speed-btn-${rate}`);
    if (activeBtn) {
        activeBtn.classList.add('active');
        activeBtn.style.background = '#2563eb';
        activeBtn.style.borderColor = '#60a5fa';
        activeBtn.style.color = '#ffffff';
        activeBtn.style.fontWeight = '800';
    }

    // Apply speed to HTML5 Video player
    const videoPlayer = document.getElementById('uploaded-video-player');
    if (videoPlayer) {
        videoPlayer.playbackRate = currentShortsSpeed;
    }

    // Apply speed to YouTube iframe player
    sendYtCommand('setPlaybackRate', [currentShortsSpeed]);

    showToast(`⚡ 쇼츠 말소리 빠르기가 ${rate}x 배속으로 설정되었습니다.`);
}

function updateTrimmerTime() {
    const startHr = parseInt(document.getElementById('trim-start-hr')?.value || 0);
    const startMin = parseInt(document.getElementById('trim-start-min')?.value || 0);
    const startSec = parseInt(document.getElementById('trim-start-sec')?.value || 0);
    
    const endHr = parseInt(document.getElementById('trim-end-hr')?.value || 0);
    const endMin = parseInt(document.getElementById('trim-end-min')?.value || 0);
    const endSec = parseInt(document.getElementById('trim-end-sec')?.value || 0);

    const totalStartSec = startHr * 3600 + startMin * 60 + startSec;
    const totalEndSec = endHr * 3600 + endMin * 60 + endSec;
    const diff = Math.max(0, totalEndSec - totalStartSec);

    const badge = document.getElementById('trimmer-duration-badge');
    if (badge) {
        badge.textContent = `총 ${diff}초 (${diff <= 60 ? '1분 컷' : '롱폼 컷'})`;
    }
}

function applyCustomTimeTrim() {
    const startHr = parseInt(document.getElementById('trim-start-hr')?.value || 0);
    const startMin = parseInt(document.getElementById('trim-start-min')?.value || 0);
    const startSec = parseInt(document.getElementById('trim-start-sec')?.value || 0);
    
    const endHr = parseInt(document.getElementById('trim-end-hr')?.value || 0);
    const endMin = parseInt(document.getElementById('trim-end-min')?.value || 0);
    const endSec = parseInt(document.getElementById('trim-end-sec')?.value || 0);

    const totalStartSec = startHr * 3600 + startMin * 60 + startSec;
    const totalEndSec = endHr * 3600 + endMin * 60 + endSec;
    const diffSec = Math.max(1, totalEndSec - totalStartSec);

    const formatTime = (h, m, s) => {
        if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const startStr = formatTime(startHr, startMin, startSec);
    const endStr = formatTime(endHr, endMin, endSec);

    if (currentDataset && currentDataset.highlights && currentDataset.highlights[currentHighlightIdx]) {
        currentDataset.highlights[currentHighlightIdx].time = `${startStr} ~ ${endStr} (${diffSec}초)`;
        renderHighlightCards();
        selectHighlight(currentHighlightIdx);
    }

    updateTrimmerTime();
    showToast(`✂️ 선택한 구간 (${startStr} ~ ${endStr})이 적용되었습니다.`);
}

function processCustomTimeShorts() {
    const startHr = parseInt(document.getElementById('hero-start-hr')?.value || 0);
    const startMin = parseInt(document.getElementById('hero-start-min')?.value || 0);
    const startSec = parseInt(document.getElementById('hero-start-sec')?.value || 0);
    
    const endHr = parseInt(document.getElementById('hero-end-hr')?.value || 0);
    const endMin = parseInt(document.getElementById('hero-end-min')?.value || 1);
    const endSec = parseInt(document.getElementById('hero-end-sec')?.value || 0);

    const totalStartSec = startHr * 3600 + startMin * 60 + startSec;
    const totalEndSec = endHr * 3600 + endMin * 60 + endSec;
    const diffSec = Math.max(5, totalEndSec - totalStartSec);

    const formatTime = (h, m, s) => {
        if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const startStr = formatTime(startHr, startMin, startSec);
    const endStr = formatTime(endHr, endMin, endSec);

    const ytInput = document.getElementById('youtube-url-input');
    let url = ytInput ? ytInput.value.trim() : '';
    if (!url) {
        url = 'https://youtube.com/live/XM7PrnvFSHw?feature=share';
        if (ytInput) ytInput.value = url;
    }

    generate10ShortsFromYouTube(url);

    // Override Highlight #1 with custom selected time range
    if (currentDataset && currentDataset.highlights && currentDataset.highlights[0]) {
        currentDataset.highlights[0].title = `"직접 선택한 ${startStr}~${endStr} 설교 핵심 쇼츠"`;
        currentDataset.highlights[0].time = `${startStr} ~ ${endStr} (${diffSec}초)`;
    }

    // Sync Trimmer inputs
    const trimStartHr = document.getElementById('trim-start-hr');
    const trimStartMin = document.getElementById('trim-start-min');
    const trimStartSec = document.getElementById('trim-start-sec');
    const trimEndHr = document.getElementById('trim-end-hr');
    const trimEndMin = document.getElementById('trim-end-min');
    const trimEndSec = document.getElementById('trim-end-sec');

    if (trimStartHr) trimStartHr.value = startHr;
    if (trimStartMin) trimStartMin.value = startMin;
    if (trimStartSec) trimStartSec.value = startSec;
    if (trimEndHr) trimEndHr.value = endHr;
    if (trimEndMin) trimEndMin.value = endMin;
    if (trimEndSec) trimEndSec.value = endSec;

    renderHighlightCards();
    selectHighlight(0);
    scrollToSection('studio');

    showToast(`✂️ 선택한 시간 구간 (${startStr} ~ ${endStr})으로 1분 은혜 쇼츠가 생성되었습니다!`);
}

function changeFontFamily(font) {
    const subText = document.getElementById('sub-text-box');
    if (subText) {
        subText.style.fontFamily = font;
    }
    showToast('🔤 자막 폰트가 변경되었습니다.');
}

function changeBgmTrack(track) {
    showToast(`🎵 배경음악이 변경되었습니다.`);
}

function updateBgmVolume(val) {
    const volVal = document.getElementById('bgm-volume-val');
    if (volVal) volVal.textContent = `${val}%`;
}

function updateChurchBadge(val) {
    const badge = document.getElementById('shorts-church-badge');
    if (badge) {
        badge.innerHTML = `<i class="fa-solid fa-church"></i> ${val || '복의근원 관유중앙교회 미디어팀'}`;
    }
}

function updateHookTitles() {
    const input1 = document.getElementById('hook-title-line1');
    const input2 = document.getElementById('hook-title-line2');
    const hook1 = document.getElementById('seolgyo-hook-line-1');
    const hook2 = document.getElementById('seolgyo-hook-line-2');

    if (input1 && hook1) hook1.textContent = input1.value || "교회는 유람선인가";
    if (input2 && hook2) hook2.textContent = input2.value || "구조선인가";
}

function setVisualTemplate(tplName) {
    const cards = document.querySelectorAll('.template-card-grid .tpl-card');
    cards.forEach(card => {
        card.classList.remove('active');
        card.style.borderColor = '#334155';
        card.style.background = 'rgba(15, 23, 42, 0.6)';
        card.style.boxShadow = 'none';
        const titleSpan = card.querySelector('span:last-child');
        if (titleSpan) {
            titleSpan.style.color = '#cbd5e1';
            titleSpan.style.fontWeight = '600';
        }
    });

    const activeCard = document.getElementById(`tpl-card-${tplName}`);
    if (activeCard) {
        activeCard.classList.add('active');
        activeCard.style.borderColor = '#2563eb';
        activeCard.style.background = 'rgba(15, 23, 42, 0.95)';
        activeCard.style.boxShadow = '0 0 12px rgba(37, 99, 235, 0.5)';
        const titleSpan = activeCard.querySelector('span:last-child');
        if (titleSpan) {
            titleSpan.style.color = '#38bdf8';
            titleSpan.style.fontWeight = '800';
        }
    }

    const subBox = document.getElementById('sub-text-box');
    const phoneScreen = document.getElementById('phone-screen');
    const hookTitleBox = document.getElementById('seolgyo-hook-title-box');
    const videoWrapper = document.getElementById('seolgyo-video-wrapper');

    if (tplName === 'seolgyo') {
        if (phoneScreen) {
            phoneScreen.className = 'phone-screen template-seolgyo';
            phoneScreen.style.background = '#000000';
        }
        if (hookTitleBox) hookTitleBox.style.display = 'block';
        if (subBox) subBox.className = 'seolgyo-sub-line sub-text-box style-neon';
        showToast("🎨 Seolgyo AI 표준형 템플릿(상단 훅 제목 + 16:9 가로 비디오)이 적용되었습니다.");
    } else {
        if (phoneScreen) {
            phoneScreen.className = 'phone-screen';
        }
        if (hookTitleBox) hookTitleBox.style.display = 'none';

        if (tplName === 'basic') {
            if (subBox) subBox.className = 'sub-text-box style-neon';
            if (phoneScreen) phoneScreen.style.background = '#0f172a';
            showToast("🎨 풀스크린 네온 템플릿이 적용되었습니다.");
        } else if (tplName === 'gradient') {
            if (subBox) subBox.className = 'sub-text-box style-modern';
            if (phoneScreen) phoneScreen.style.background = 'linear-gradient(180deg, #1e1b4b, #311b92)';
            showToast("🎨 시네마틱 그라데이션 템플릿이 적용되었습니다.");
        } else if (tplName === 'accent') {
            if (subBox) subBox.className = 'sub-text-box style-box';
            if (phoneScreen) phoneScreen.style.background = '#0284c7';
            showToast("🎨 로열 블루 강조 템플릿이 적용되었습니다.");
        } else if (tplName === 'light') {
            if (subBox) subBox.className = 'sub-text-box style-classic';
            if (phoneScreen) phoneScreen.style.background = '#f8fafc';
            showToast("🎨 깔끔한 라이트 템플릿이 적용되었습니다.");
        }
    }
}

function updateChurchBadgeText(val) {
    const textSpan = document.getElementById('church-badge-text');
    if (textSpan) {
        textSpan.textContent = val.trim() || '복의근원 관유중앙교회';
    } else {
        const badge = document.getElementById('shorts-church-badge');
        if (badge) {
            badge.innerHTML = `<i class="fa-solid fa-church" style="color: #38bdf8;"></i> <span id="church-badge-text">${val.trim() || '복의근원 관유중앙교회'}</span>`;
        }
    }
}

// Legacy alias
function updateChurchLogoText(val) {
    updateChurchBadgeText(val);
}

function toggleChurchNameVisibility(show) {
    const badge = document.getElementById('shorts-church-badge');
    if (badge) {
        badge.style.display = show ? 'inline-flex' : 'none';
        showToast(show ? '⛪ 상단 교회 이름이 활성화되었습니다.' : '상단 교회 이름이 숨김 처리되었습니다.');
    }
}

function toggleChurchLogoVisibility(show) {
    const wrapper = document.getElementById('shorts-logo-wrapper');
    if (wrapper) {
        wrapper.style.display = show ? 'inline-flex' : 'none';
        showToast(show ? '🖼️ 하단 교회 로고가 활성화되었습니다.' : '하단 교회 로고가 숨김 처리되었습니다.');
    }
}

function handleChurchLogoUpload(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        const simImg = document.getElementById('shorts-church-logo-img');
        const ctlImg = document.getElementById('ctl-preview-logo-img');
        const logoWrapper = document.getElementById('shorts-logo-wrapper');
        const chkLogo = document.getElementById('chk-church-logo-visibility');
        
        if (simImg) simImg.src = e.target.result;
        if (ctlImg) ctlImg.src = e.target.result;
        if (logoWrapper) logoWrapper.style.display = 'inline-flex';
        if (chkLogo) chkLogo.checked = true;
        
        showToast('🖼️ 교회 로고 이미지가 영상 하단에 성공적으로 등록되었습니다.');
    };
    reader.readAsDataURL(file);
}

function switchChurchInfoTab(tab) {
    // Kept for backward compatibility if called
    if (tab === 'name') {
        toggleChurchNameVisibility(true);
    } else {
        toggleChurchLogoVisibility(true);
    }
}

function updateShortsDescription(val) {
    const descText = document.getElementById('shorts-desc-text');
    if (descText) {
        descText.textContent = val.trim() || '[복의근원 관유중앙교회] 두려움을 이기는 담대한 믿음 · 파도 대신 예수 그리스도를 바라보라';
    }
}

function previewAddClip() {
    const startVal = document.getElementById('add-clip-start-input')?.value.trim() || '00:00';
    const endVal = document.getElementById('add-clip-end-input')?.value.trim() || '01:30';

    const startSec = parseTimestampToSeconds(startVal);

    const videoPlayer = document.getElementById('uploaded-video-player');
    const ytPlayer = document.getElementById('youtube-iframe-player');

    if (currentDataset && currentDataset.videoId && ytPlayer) {
        ytPlayer.src = `https://www.youtube.com/embed/${currentDataset.videoId}?autoplay=1&enablejsapi=1&start=${startSec}&end=${startSec + 90}`;
        ytPlayer.style.display = 'block';
        if (videoPlayer) videoPlayer.style.display = 'none';
        isPlaying = true;
    } else if (videoPlayer && videoPlayer.src) {
        if (ytPlayer) ytPlayer.style.display = 'none';
        videoPlayer.style.display = 'block';
        videoPlayer.currentTime = startSec;
        videoPlayer.play().catch(() => {});
        isPlaying = true;
    }

    showToast(`▶️ 지정 구간 (${startVal} ~ ${endVal}) 미리보기 재생 중...`);
}

function addCustomClipToShorts() {
    const startVal = document.getElementById('add-clip-start-input')?.value.trim() || '00:00';
    const endVal = document.getElementById('add-clip-end-input')?.value.trim() || '01:30';

    const startSec = parseTimestampToSeconds(startVal);
    const endSec = parseTimestampToSeconds(endVal);
    const diffSec = Math.max(5, endSec - startSec);

    const newClip = {
        line1: `직접 지정 구간 (${startVal}~${endVal})`,
        line2: "은혜의 말씀 선포",
        title: `"직접 추가한 ${startVal}~${endVal} 은혜 설교 구간"`,
        quote: `"하나님이 주신 은혜의 말씀과 결단이 심령 속에 기억되는 거룩한 시간입니다!"`,
        ref: "📖 사용자 추가 구간",
        time: `${startVal} ~ ${endVal} (${diffSec}초)`,
        tag: "#직접추가 #설교쇼츠 #은혜",
        viral: "✨ 사용자 지정 컷",
        isCustom: true
    };

    if (!currentDataset) {
        currentDataset = sampleData.pastor_lee;
    }

    if (!currentDataset.highlights) {
        currentDataset.highlights = [];
    }

    currentDataset.highlights.unshift(newClip);

    renderHighlightCards();
    selectHighlight(0);

    // Sync Trimmer inputs
    const trimStartMin = document.getElementById('trim-start-min');
    const trimStartSec = document.getElementById('trim-start-sec');
    const trimEndMin = document.getElementById('trim-end-min');
    const trimEndSec = document.getElementById('trim-end-sec');

    if (trimStartMin) trimStartMin.value = Math.floor(startSec / 60);
    if (trimStartSec) trimStartSec.value = startSec % 60;
    if (trimEndMin) trimEndMin.value = Math.floor(endSec / 60);
    if (trimEndSec) trimEndSec.value = endSec % 60;

    showToast(`🎉 [${startVal} ~ ${endVal}] 구간이 쇼츠 목록 첫 번째에 추가되었습니다!`);
}

/* ==========================================================================
   15. Seolgyo AI Interactive 6-Slide CardNews Carousel Engine
   ========================================================================== */
let currentCnSlide = 0;
const totalCnSlides = 6;

function updateCardNewsView() {
    for (let i = 0; i < totalCnSlides; i++) {
        const slide = document.getElementById(`cn-slide-${i}`);
        if (slide) {
            if (i === currentCnSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        }
    }

    const counter = document.getElementById('cn-slide-counter');
    if (counter) counter.textContent = `${currentCnSlide + 1} / ${totalCnSlides} 슬라이드`;

    const prevBtn = document.getElementById('cn-prev-btn');
    const nextBtn = document.getElementById('cn-next-btn');
    if (prevBtn) prevBtn.disabled = (currentCnSlide === 0);
    if (nextBtn) nextBtn.disabled = (currentCnSlide === totalCnSlides - 1);

    const dots = document.querySelectorAll('#cn-dots-container .cn-dot');
    dots.forEach((dot, idx) => {
        dot.style.background = (idx === currentCnSlide) ? '#38bdf8' : '#334155';
    });
}

function nextCardNewsSlide() {
    if (currentCnSlide < totalCnSlides - 1) {
        currentCnSlide++;
        updateCardNewsView();
    }
}

function prevCardNewsSlide() {
    if (currentCnSlide > 0) {
        currentCnSlide--;
        updateCardNewsView();
    }
}

/* ==========================================================================
   16. Seolgyo AI Signature Feature: Sermon Outline Generator Engine
   ========================================================================== */
const sermonOutlinesData = {
    '빌립보서 4:6-7': {
        ref: '빌립보서 4:6-7',
        title: '염려의 자리에 기도를 채우는 평강 (빌립보서 4:6-7)',
        context: '빌립보 교회는 바울과 오랜 신뢰 관계를 유지하며 여러 차례 그의 사역을 경제적으로 지원했고, 에바브로디도를 통해 바울에게 헌금을 보낸 것이 본서 집필의 직접적인 계기가 되었습니다. 당시 교회 내부에서는 유오디아와 순두게 사이의 갈등으로 대표되는 분열의 조짐이 있었으며, 외부적으로는 율법주의적 가르침을 전하는 이들의 위협도 존재했습니다.',
        words: `<strong>'염려하다(μεριμνάω, 메림나오)'</strong>는 마음이 여러 갈래로 찢어지는 상태를 의미합니다. 세상의 근심이 우리의 생각을 분열시킬 때, 바울은 마음을 하나님께로 온전히 모으는 기도를 처방합니다.<br><strong>'지키시리라(φρουρέω, 프루레오)'</strong>는 군사 용어로, 적군의 공격으로부터 성채를 방어하기 위해 파수꾼을 배치하는 삼엄한 경계를 의미합니다.`,
        commentary: '칼빈(John Calvin)은 본 구절에 대해 "우리가 염려에 사로잡히는 것은 하나님의 섭리를 전적으로 신뢰하지 못하기 때문이다. 성도가 감사의 기도를 올릴 때, 하나님의 평강은 사탄의 의심을 막아내는 철벽의 방패가 된다"고 주석합니다.',
        intro: '사랑하는 성도 여러분, 인생의 중턱을 지나는 우리에게 가장 무거운 짐은 보이지 않는 미래에 대한 염려입니다. 바울 사도는 로마의 차가운 감옥에 갇힌 처지였음에도 불구하고 빌립보 성도들을 향해 참된 평안의 비결을 선포하고 있습니다.',
        p1Title: '염려를 기도의 제목으로 바꾸십시오',
        p1Desc: '바울은 우리에게 아무것도 염려하지 말라고 단호하게 권면합니다. 성경은 그 흩어진 마음을 모아 모든 일에 기도로 바꾸라고 말씀합니다.',
        p1Apply: '💡 구체적 삶의 적용: 걱정하는 자녀나 배우자에게 "우리 마음의 짐을 하나님께 먼저 맡기고 함께 기도해보자"라고 따뜻하게 말해 보십시오.',
        p2Title: '감사의 태도로 구체적으로 구하십시오',
        p2Desc: '성도의 기도는 단순한 요구를 넘어 감사라는 신앙의 고백을 동반해야 합니다. 감사는 하나님이 이미 우리 삶에 행하신 선한 일들을 기억하며 그분의 주권을 인정하는 행위이기 때문입니다.',
        p2Apply: '💡 구체적 삶의 적용: 소그룹 식구들과 이번 주에 경험한 작은 감사 제목 세 가지를 단체 대화방에서 공유하며 서로의 기도를 격려하십시오.',
        p3Title: '하나님의 평강이 마음을 보호하십니다',
        p3Desc: '진실한 기도의 결과로 주어지는 것은 즉각적인 환경의 변화가 아니라 하나님의 평강입니다. 여기서 지킨다는 표현은 성벽을 파수하는 군사가 삼엄한 경계를 서는 군사적 상태를 묘사합니다.',
        p3Apply: '💡 구체적 삶의 적용: 나를 힘들게 하는 사람을 대할 때 내 감정이 앞서지 않도록 마음의 문 앞에 하나님의 평강을 파수꾼으로 세우는 훈련을 하십시오.',
        conclusion: '염려는 우리 마음을 나누지만 기도는 우리 마음을 하나님께 고정시킵니다. 감사가 섞인 기도를 드릴 때 인간의 지각을 초월하는 하나님의 평강이 우리의 성벽이 되어 주실 것입니다. 오늘 이 시간, 우리의 모든 무거운 짐을 주님의 보좌 앞에 내려놓기를 결단합니다.'
    },
    '마태복음 14:22-33': {
        ref: '마태복음 14:22-33',
        title: '풍랑을 딛고 물 위를 걷는 믿음 (마태복음 14:22-33)',
        context: '오병이어의 기적 직후 군중들이 예수를 억지로 임금 삼으려 하자 예수님은 제자들을 배에 태워 건너편으로 보내시고 홀로 기도하러 산에 가셨습니다. 밤사경(새벽 3~6시)에 제자들은 역풍과 거센 파도로 심한 고난을 겪고 있었습니다.',
        words: `<strong>'밤사경(τετάρτῃ φυλακῇ, 테타르테 퓔라케)'</strong>은 밤의 가장 어둡고 탈진한 마지막 경점을 뜻합니다. 인간의 한계 끝에 주님이 찾아오십니다.<br><strong>'물 위를 걸어(περιπατῶν ἐπὶ τὴν θάλασσαν)'</strong>는 혼돈과 사망의 세력인 바다를 짓밟고 다스리시는 하나님의 신적 통치권을 상징합니다.`,
        commentary: '매튜 헨리(Matthew Henry)는 "배 안은 안전해 보이나 제자들을 성숙시키지 못했다. 주님은 베드로를 물 위로 부르심으로 보이는 환경을 초월하는 믿음의 능력을 가르치셨다"고 설명합니다.',
        intro: '인생이라는 바다를 항해할 때 누구나 예기치 못한 역풍을 만납니다. 그러나 고난의 깊은 밤, 주님은 결코 우리를 버려두지 않으시고 풍랑을 딛고 찾아오십니다.',
        p1Title: '두려움의 밤, 주님의 음성을 분별하십시오',
        p1Desc: '유령이라 두려워 외치는 제자들에게 주님은 "안심하라 나니 두려워하지 말라"고 즉시 말씀하십니다.',
        p1Apply: '💡 구체적 삶의 적용: 세상의 불안한 뉴스보다 성경 말씀을 먼저 묵상하며 하루를 시작하십시오.',
        p2Title: '안전지대를 떠나 순종의 첫 발을 내딛으십시오',
        p2Desc: '배 안에 안주하지 않고 말씀에 순종하여 물 위로 뛰어내린 베드로만이 기적의 걸음을 걸었습니다.',
        p2Apply: '💡 구체적 삶의 적용: 오랫동안 미루어 두었던 전도 대상자나 용서해야 할 이웃에게 먼저 연락해 보십시오.',
        p3Title: '침몰의 위기에서 즉시 주를 부르짖으십시오',
        p3Desc: '파도를 보고 빠져들 때 "주여 나를 구원하소서" 부르짖자 주님은 즉시 손을 내밀어 붙잡아 주셨습니다.',
        p3Apply: '💡 구체적 삶의 적용: 영적 침체나 낙심이 찾아올 때 자책하지 말고 즉시 기도의 골방으로 나아가십시오.',
        conclusion: '예수님이 배에 오르시자 바람이 그치고 큰 평안이 임했습니다. 주님을 내 인생의 배에 모셔들일 때 참된 구원과 찬양이 터져나옵니다.'
    },
    '로마서 8:28': {
        ref: '로마서 8:28',
        title: '모든 것을 합력하여 선을 이루시는 하나님 (로마서 8:28)',
        context: '로마 제국의 극심한 박해와 고난 속에 있는 성도들에게 사도 바울이 성령의 탄식과 구원의 확신을 선포하는 본문입니다.',
        words: `<strong>'합력하여(συνεργεῖ, 쉬네르게이)'</strong>는 조화롭게 일한다는 뜻의 시너지(Synergy) 어원으로, 모든 사건이 하나님의 거룩한 뜻 안에서 맞물려 돌아감을 의미합니다.`,
        commentary: '어거스틴(Augustine)은 "하나님은 악과 고난조차도 성도의 유익과 영적 성장을 위해 거룩한 도구로 바꾸어 사용하신다"고 주해합니다.',
        intro: '우리가 겪는 모든 아픔과 실패가 과연 의미가 있을까요? 성경은 단호하게 하나님의 손길 아래 버려지는 고난은 없다고 약속합니다.',
        p1Title: '하나님을 사랑하는 자를 향한 거룩한 섭리',
        p1Desc: '성도의 삶은 우연이나 운명의 장난이 아니라 신실하신 하나님의 주권적 섭리 안에 있습니다.',
        p1Apply: '💡 구체적 삶의 적용: 이해할 수 없는 시험 속에서도 하나님의 선하심을 의심하지 않는 신뢰를 고백하십시오.',
        p2Title: '그의 뜻대로 부르심을 입은 자의 특권',
        p2Desc: '창세 전에 그리스도 안에서 선택받은 자녀들에게 주어지는 영원한 안전보장입니다.',
        p2Apply: '💡 구체적 삶의 적용: 구원의 감격을 매일 묵상하며 성도의 정체성을 회복하십시오.',
        p3Title: '최종적인 선, 그리스도를 닮아가는 영화',
        p3Desc: '여기서 선이란 단순한 세상적 번영이 아니라 예수 그리스도의 거룩한 형상을 본받는 것입니다.',
        p3Apply: '💡 구체적 삶의 적용: 고난을 원망거리로 삼지 말고 나의 모난 성품을 다듬는 기회로 삼으십시오.',
        conclusion: '하나님은 한 조각의 퍼즐도 헛되이 버리지 않으십니다. 모든 것을 합력하여 영광스러운 선을 이루실 하나님을 찬양합니다.'
    },
    '시편 23:1-6': {
        ref: '시편 23:1-6',
        title: '부족함이 없는 목자의 인도하심 (시편 23:1-6)',
        context: '다윗이 사울과 압살롬의 추격을 받으며 숱한 사망의 음침한 골짜기를 지나면서도 경험했던 하나님의 철저한 목자적 보호와 공급을 노래한 시편입니다.',
        words: `<strong>'여호와 로이(יְהוָה רֹעִי)'</strong>는 주님은 나의 목자시라는 뜻으로, 절대적인 보호와 친밀한 보살핌을 나타냅니다.`,
        commentary: '스펄전(C.H. Spurgeon)은 "양은 길을 찾는 지혜도, 맹수를 이길 힘도 없다. 양의 유일한 자랑은 선한 목자를 소유한 것이다"라고 찬탄합니다.',
        intro: '결핍과 불안의 시대, 우리는 무엇으로 만족을 누립니까? 다윗은 고백합니다. 여호와가 나의 목자이시니 내게 부족함이 없으리로다.',
        p1Title: '푸른 풀밭과 쉴 만한 물가로 인도하심',
        p1Desc: '목자는 양들에게 가장 좋은 영의 양식과 쉼을 허락하십니다.',
        p1Apply: '💡 구체적 삶의 적용: 영적 탈진이 오기 전 말씀과 기도로 영혼을 소생시키는 안식의 시간을 가지십시오.',
        p2Title: '사망의 음침한 골짜기에서도 함께하시는 주',
        p2Desc: '주의 지팡이와 막대기가 나를 안위하사 맹수의 공격으로부터 나를 지키십니다.',
        p2Apply: '💡 구체적 삶의 적용: 두려움의 자리에 주님이 함께 서 계심을 선포하십시오.',
        p3Title: '내 잔이 넘치는 영원한 축복',
        p3Desc: '원수의 목전에서 상을 베푸시고 머리에 기름을 바르시는 풍성한 은혜입니다.',
        p3Apply: '💡 구체적 삶의 적용: 받은 은혜를 헤아리며 이웃과 풍성히 나누는 삶을 사십시오.',
        conclusion: '내 평생에 선하심과 인자하심이 반드시 나를 따르리니 내가 여호와의 집에 영원히 거하리로다.'
    }
};

let currentOutlineRef = '빌립보서 4:6-7';
let isOutlineExpanded = false;

function setOutlineScripture(ref) {
    const input = document.getElementById('outline-scripture-input');
    if (input) input.value = ref;

    const chips = document.querySelectorAll('.outline-tag-btn');
    chips.forEach(chip => {
        if (chip.textContent.trim() === ref) {
            chip.classList.add('active');
        } else {
            chip.classList.remove('active');
        }
    });

    generateSermonOutline();
}

function generateSermonOutline() {
    const input = document.getElementById('outline-scripture-input');
    const scripture = input ? input.value.trim() : '빌립보서 4:6-7';

    let data = sermonOutlinesData[scripture];
    if (!data) {
        // Fallback for custom user input
        data = {
            ref: scripture,
            title: `말씀의 능력으로 세상을 이기는 믿음 (${scripture})`,
            context: `${scripture} 본문은 하나님께서 자기 백성들에게 언약의 신실하심을 증거하시며 시대적 위기 속에서도 하나님을 전심으로 신뢰할 것을 촉구하는 말씀입니다.`,
            words: `<strong>'믿음(πίστις, 피스티스)'</strong>은 하나님의 성품과 약속에 대한 확고한 신뢰를 바탕으로 한 전인격적인 의탁을 의미합니다.`,
            commentary: `복음주의 주석에 따르면 "${scripture}의 중심 사상은 성도가 세상의 풍조에 흔들리지 않고 영원하신 말씀의 반석 위에 설 때 참된 승리가 보장된다는 것입니다."`,
            intro: `사랑하는 성도 여러분, 오늘 우리는 ${scripture} 말씀을 통해 우리 삶을 향하신 하나님의 거룩한 뜻과 위로를 발견하고자 합니다.`,
            p1Title: '말씀의 권위 앞에 겸손히 순종하십시오',
            p1Desc: '인간의 지혜나 경험보다 앞서 하나님의 말씀에 귀를 기울일 때 영적 분별력이 회복됩니다.',
            p1Apply: '💡 구체적 삶의 적용: 중요한 결정을 내리기 전 말씀 묵상과 기도의 시간을 최우선으로 가지십시오.',
            p2Title: '두려움을 넘어 약속의 신실함을 붙드십시오',
            p2Desc: '환경은 변할지라도 하나님의 약속은 천지가 없어지기 전에 일점일획도 결코 없어지지 않습니다.',
            p2Apply: '💡 구체적 삶의 적용: 나를 불안하게 만드는 생각들을 말씀 암송으로 물리치십시오.',
            p3Title: '세상 속에서 증인의 삶을 결단하십시오',
            p3Desc: '우리가 받은 은혜는 교회 안에만 머물지 않고 세상 속에서 빛과 소금의 열매로 나타나야 합니다.',
            p3Apply: '💡 구체적 삶의 적용: 이번 주 만나는 사람들에게 그리스도의 사랑과 따뜻한 격려를 전하십시오.',
            conclusion: '말씀을 붙드는 자는 결코 흔들리지 않습니다. 주님의 말씀 안에서 승리하는 모든 성도님들이 되시기를 축복합니다.'
        };
    }

    currentOutlineRef = data.ref;

    // Update DOM
    const badge = document.getElementById('outline-ref-badge');
    const mainTitle = document.getElementById('outline-main-title');
    const contextBox = document.getElementById('outline-context');
    const wordsBox = document.getElementById('outline-original-words');
    const commentaryBox = document.getElementById('outline-commentary');
    const introBox = document.getElementById('outline-intro');
    const p1T = document.getElementById('outline-p1-title');
    const p1D = document.getElementById('outline-p1-desc');
    const p1A = document.getElementById('outline-p1-apply');
    const p2T = document.getElementById('outline-p2-title');
    const p2D = document.getElementById('outline-p2-desc');
    const p2A = document.getElementById('outline-p2-apply');
    const p3T = document.getElementById('outline-p3-title');
    const p3D = document.getElementById('outline-p3-desc');
    const p3A = document.getElementById('outline-p3-apply');
    const conclusionBox = document.getElementById('outline-conclusion');

    if (badge) badge.textContent = data.ref;
    if (mainTitle) mainTitle.textContent = data.title;
    if (contextBox) contextBox.textContent = data.context;
    if (wordsBox) wordsBox.innerHTML = data.words;
    if (commentaryBox) commentaryBox.textContent = data.commentary;
    if (introBox) introBox.textContent = data.intro;
    if (p1T) p1T.textContent = data.p1Title;
    if (p1D) p1D.textContent = data.p1Desc;
    if (p1A) p1A.innerHTML = `<strong>💡 구체적 삶의 적용:</strong> ${data.p1Apply.replace(/^💡 구체적 삶의 적용:\s*/, '')}`;
    if (p2T) p2T.textContent = data.p2Title;
    if (p2D) p2D.textContent = data.p2Desc;
    if (p2A) p2A.innerHTML = `<strong>💡 구체적 삶의 적용:</strong> ${data.p2Apply.replace(/^💡 구체적 삶의 적용:\s*/, '')}`;
    if (p3T) p3T.textContent = data.p3Title;
    if (p3D) p3D.textContent = data.p3Desc;
    if (p3A) p3A.innerHTML = `<strong>💡 구체적 삶의 적용:</strong> ${data.p3Apply.replace(/^💡 구체적 삶의 적용:\s*/, '')}`;
    if (conclusionBox) conclusionBox.textContent = data.conclusion;

    showToast(`✨ [${data.ref}] 주석 근거 설교 개요가 성공적으로 생성되었습니다!`);
}

function toggleOutlineMore() {
    isOutlineExpanded = !isOutlineExpanded;
    const bodyContent = document.getElementById('outline-body-content');
    const fadeOverlay = document.getElementById('outline-fade-overlay');
    const btn = document.getElementById('outline-more-btn');
    const icon = document.getElementById('outline-more-icon');

    if (bodyContent && btn) {
        if (isOutlineExpanded) {
            bodyContent.style.maxHeight = 'none';
            if (fadeOverlay) fadeOverlay.style.display = 'none';
            btn.innerHTML = `<span>접기</span> <i class="fa-solid fa-chevron-up" id="outline-more-icon"></i>`;
        } else {
            bodyContent.style.maxHeight = '480px';
            if (fadeOverlay) fadeOverlay.style.display = 'block';
            btn.innerHTML = `<span>더보기</span> <i class="fa-solid fa-chevron-down" id="outline-more-icon"></i>`;
        }
    }
}

function copyOutlineText() {
    const mainTitle = document.getElementById('outline-main-title')?.textContent || '';
    const context = document.getElementById('outline-context')?.textContent || '';
    const words = document.getElementById('outline-original-words')?.innerText || '';
    const commentary = document.getElementById('outline-commentary')?.textContent || '';
    const intro = document.getElementById('outline-intro')?.textContent || '';
    const p1 = `${document.getElementById('outline-p1-title')?.textContent || ''}\n${document.getElementById('outline-p1-desc')?.textContent || ''}\n${document.getElementById('outline-p1-apply')?.textContent || ''}`;
    const p2 = `${document.getElementById('outline-p2-title')?.textContent || ''}\n${document.getElementById('outline-p2-desc')?.textContent || ''}\n${document.getElementById('outline-p2-apply')?.textContent || ''}`;
    const p3 = `${document.getElementById('outline-p3-title')?.textContent || ''}\n${document.getElementById('outline-p3-desc')?.textContent || ''}\n${document.getElementById('outline-p3-apply')?.textContent || ''}`;
    const conclusion = document.getElementById('outline-conclusion')?.textContent || '';

    const fullText = `[설교 개요서]\n${mainTitle}\n\n1. 말씀 배경:\n${context}\n\n2. 핵심 원어 주해:\n${words}\n\n3. 주석 근거:\n${commentary}\n\n4. 서론:\n${intro}\n\n5. 대지 및 삶의 적용:\n- 대지 1: ${p1}\n\n- 대지 2: ${p2}\n\n- 대지 3: ${p3}\n\n6. 결론:\n${conclusion}`;

    copyTextToClipboard(fullText, '📋 설교 개요 전문이 클립보드에 복사되었습니다! (카톡/단톡방 붙여넣기 가능)');
}

function downloadOutlineDoc() {
    const mainTitle = document.getElementById('outline-main-title')?.textContent || '설교개요';
    const text = document.getElementById('outline-display-card')?.innerText || '';
    downloadFile(`GraceClip_설교개요_${currentOutlineRef.replace(/[:\s]/g, '_')}.docx`, text);
}

function downloadSummaryDoc() {
    const text = document.querySelector('#tab-summary .pane-paper-view')?.innerText || '설교 요약 내용';
    downloadFile(`GraceClip_설교요약_우리마음을지켜줍니다.docx`, text);
}

function triggerShortsExport() {
    showToast('✨ 1080p HD 쇼츠 비디오 렌더링 및 다운로드가 시작되었습니다!');
    downloadFile('GraceClip_관유중앙교회_1분은혜쇼츠.mp4', 'MP4_VIDEO_STREAM_DATA');
}



