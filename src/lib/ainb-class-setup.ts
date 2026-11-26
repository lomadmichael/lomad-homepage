// 협회원·지역민 Ai 클래스(하루 과정) 설치 가이드 — 개인 구글 계정 + Claude Pro 결제판
// 페이지: /projects/ai-naeilbakkum/class/setup
// 원본(내일바꿈 팀 계정판) SETUP_TRACKS 를 가져와 계정·로그인 관련 단계만 바꿔 끼운다.
// ⚠️ ainb-setup.ts 원고는 인쇄 책자 빌드가 읽으므로 여기서는 읽기만 하고 수정하지 않는다.

import {
  SETUP_TRACKS,
  type SetupStep,
  type SetupTrack,
  type Shot,
  type Trouble,
} from "@/lib/ainb-setup";

export const CLASS_GUIDE_HREF = "/projects/ai-naeilbakkum/class/guide";
export const CLASS_SETUP_STORE_KEY = "ainb-class-setup-v1";

/* ───────────────────────── 새로 쓰는 조각 ───────────────────────── */

const PRO_LOGIN_TITLE = "Claude 계정 — 내 구글 계정으로 로그인하고 Pro 결제";

const PRO_LOGIN_GOAL =
  "내 구글 계정으로 Claude에 로그인하고, Code 탭을 쓰기 위해 Pro 요금제(월간)를 결제한 뒤 채팅 답을 한 번 받습니다.";

const PRO_LOGIN_SHOTS: Shot[] = [
  {
    img: "/ainb/setup/win/W03.png",
    alt: "claude.ai 첫 화면 — 「Google로 계속하기」 버튼",
    action: "① claude.ai를 열고 「Google로 계속하기」를 누른 뒤, 내 구글 계정을 고르세요.",
    note: "이미 Claude에 가입한 분은 그 계정을 고르면 됩니다. 처음이면 이름·약관 확인 화면이 몇 번 나오니 안내대로 넘어가세요.",
    link: { label: "claude.ai 열기", href: "https://claude.ai" },
  },
  {
    alt: "화면 왼쪽 아래 내 이름(프로필) → 요금제 업그레이드 메뉴",
    action: "② 화면 왼쪽 아래 내 이름(프로필)을 누르고, 요금제 업그레이드(Upgrade) 메뉴로 들어가 「Pro」를 고르세요.",
    note: "무료 요금제로는 오늘 쓰는 Code 탭이 열리지 않습니다. 메뉴 이름이 조금 달라도 '업그레이드' 또는 '요금제'라고 적힌 곳을 누르면 됩니다.",
  },
  {
    alt: "결제 주기 선택 — 월간(Monthly)",
    action: "③ 결제 주기에서 월간(Monthly) 결제를 고르세요.",
    note: "월 20달러입니다. 연간 결제는 200달러를 한 번에 내는 것이니 고르지 마세요.",
  },
  {
    alt: "카드 정보 입력 화면",
    action: "④ 카드 정보를 입력하고 결제하세요.",
    note: "해외 결제가 되는 카드(VISA·Master 등)여야 합니다.",
  },
  {
    alt: "Claude 채팅 화면",
    action: "⑤ 채팅창에 아래 첫 인사를 붙여넣고 답이 오면 이 단계는 끝입니다.",
    prompt:
      "안녕! 나는 오늘 Ai를 처음 제대로 배우기 시작했어. 오늘 하루 동안 내 비서가 되어 줘. 어려운 말은 쉬운 우리말로 풀어서 설명해줘. 먼저 네가 나 같은 사람에게 도와줄 수 있는 일 5가지만 알려줘.",
  },
];

const PRO_LOGIN_TROUBLES: Trouble[] = [
  {
    symptom: "이미 다른 구글 계정으로 로그인돼 있다",
    fix: "왼쪽 아래 내 이름(프로필) → 「로그아웃」을 누른 뒤, 「Google로 계속하기」에서 오늘 쓸 내 계정을 다시 고르세요. 구글 계정 목록에 원하는 계정이 없으면 「다른 계정 사용」을 누르고 직접 입력합니다.",
  },
  {
    symptom: "카드 결제가 거절된다",
    fix: "카드에 해외 결제가 막혀 있는지 카드사 앱에서 확인하세요(해외 결제 차단 해제). 그래도 안 되면 다른 카드로 시도하고, 그래도 안 되면 손을 들어 주세요.",
  },
  {
    symptom: "「Google로 계속하기」가 안 된다",
    fix: "「이메일로 계속하기」 칸에 내 메일 주소를 넣고 계속 → 메일함에 Claude에서 온 로그인 메일이 옵니다 → 그 안의 「로그인」 버튼을 누르세요. 코드 6자리가 뜨면 그 숫자를 원래 창에 입력합니다.",
  },
];

const PRO_UPGRADE_TROUBLE: Trouble = {
  symptom: "Code 탭을 눌렀더니 「업그레이드」 안내가 뜬다",
  fix: "Pro 결제가 된 계정으로 로그인했는지 확인하세요. 결제 직후라면 앱을 완전히 껐다 켜세요. 그래도 뜨면 손을 들어 주세요.",
};

const APP_LOGIN_ACTION = "방금 Pro를 결제한 내 구글 계정";

/* ───────────────────────── 변환 규칙 ───────────────────────── */

const isLoginStep = (s: SetupStep) => s.id === "w1" || s.id === "m2";

/** 문장 단위 손질 — 원본의 팀·현장 운영 표현을 하루 과정용으로 바꾼다 */
function fixText(t: string): string {
  return t
    .replace(/\s*와이파이가 느리면 운영진 USB에 같은 파일이 있습니다\.\s*/g, " ")
    .replace(/\s*와이파이가 느리면 운영진 USB\.\s*/g, " ")
    .replace("3일차에 내 작품을 인터넷에 올리는 도구(Vercel)가 쓰는 부품입니다.", "오늘 내 작품을 인터넷에 올리는 도구(Vercel)가 쓰는 부품입니다.")
    .replace("「자동 · Opus 5」", "「자동」")
    .replace("실습 가이드 1일차로 돌아가세요.", "실습 가이드 1교시로 돌아가세요.")
    .trim();
}

function fixShot(shot: Shot): Shot | null {
  // Code 탭 ⑦ 모델을 상위 모델로 바꾸는 장면은 뺀다 (모델은 Sonnet 그대로)
  if (shot.alt.startsWith("모델 선택")) return null;

  // Windows 앱 로그인 ⑤ — 계정 선택 (팀 계정 스크린샷은 붙이지 않는다)
  if (shot.alt.startsWith("브라우저의 Google 계정 선택")) {
    return {
      alt: "브라우저의 Google 계정 선택",
      action: `⑤ 브라우저의 계정 목록에서 ${APP_LOGIN_ACTION}을 고르세요. 목록에 없으면 「다른 계정 사용」을 눌러 직접 입력합니다.`,
      note: "1단계와 똑같은 계정이어야 합니다.",
    };
  }

  // Mac 앱 로그인 ⑤
  if (shot.action.startsWith("⑤ 「시작하기」")) {
    return {
      ...shot,
      action: `⑤ 「시작하기」를 누르고 로그인합니다. 「Google로 계속하기」 → 브라우저에서 ${APP_LOGIN_ACTION} 선택 → 「계속」 → 「Claude 열기」로 앱으로 돌아오기.`,
    };
  }

  const note = shot.note ? fixText(shot.note) : undefined;
  return { ...shot, action: fixText(shot.action), ...(note !== undefined ? { note: note || undefined } : {}) };
}

function fixTrouble(t: Trouble): Trouble {
  if (t.symptom.includes("「업그레이드」 안내")) return PRO_UPGRADE_TROUBLE;
  return { ...t, fix: fixText(t.fix) };
}

function toClassStep(step: SetupStep): SetupStep {
  if (isLoginStep(step)) {
    return {
      ...step,
      title: step.id === "m2" ? `${PRO_LOGIN_TITLE} (기다리는 동안)` : PRO_LOGIN_TITLE,
      minutes: "15분",
      goal: PRO_LOGIN_GOAL,
      shots: PRO_LOGIN_SHOTS,
      // 원본 성공 화면 스크린샷은 팀 계정 화면이라 붙이지 않는다
      success: { text: "채팅에 답이 오면 성공. 이 브라우저 창은 닫지 말고 두세요." },
      troubles: PRO_LOGIN_TROUBLES,
    };
  }

  return {
    ...step,
    goal: fixText(step.goal),
    shots: step.shots.map(fixShot).filter((s): s is Shot => s !== null),
    success: { ...step.success, text: fixText(step.success.text) },
    troubles: step.troubles.map(fixTrouble),
  };
}

export const CLASS_SETUP_TRACKS: SetupTrack[] = SETUP_TRACKS.map((track) => ({
  ...track,
  steps: track.steps.map(toClassStep),
}));
