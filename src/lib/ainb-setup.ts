// Ai 내일바꿈 설치 가이드(위저드) 콘텐츠 — OS별 단계 / 화면-행동 / 성공 확인 / 트러블슈팅
// 페이지: /projects/ai-naeilbakkum/setup
// 이미지: public/ainb/setup/{win,mac}/Wxx.png · Mxx.png (번호는 촬영 목록과 동일). 파일이 없으면 화면에 '스크린샷 준비 중' 자리표시.

export type SetupOs = "windows" | "mac";

/** 스크린샷 한 장 + 그 화면에서 할 행동 한 가지 */
export type Shot = {
  /** 이미지 경로(/ainb/setup/…). 없으면 자리표시 박스에 alt만 표시 */
  img?: string;
  /** 어떤 화면인지 한 줄(이미지 대체 텍스트 겸 자리표시 문구) */
  alt: string;
  /** 굵게 보이는 지시 한 줄 — 반드시 행동 하나 */
  action: string;
  /** 보조 설명(선택) */
  note?: string;
  /** 붙여넣을 명령(선택) — 복사 버튼과 함께 표시 */
  command?: string;
  /** 붙여넣을 프롬프트(선택) — 복사 버튼과 함께 표시 */
  prompt?: string;
  /** 링크 버튼(선택) */
  link?: { label: string; href: string };
};

export type Trouble = {
  /** 이렇게 나오면 (증상) */
  symptom: string;
  /** 이렇게 하세요 */
  fix: string;
  command?: string;
  /** 참고 화면(선택) — 파일이 있을 때만 표시 */
  img?: string;
  imgAlt?: string;
};

export type SetupStep = {
  id: string;
  title: string;
  minutes: string;
  /** 한 줄 목표 */
  goal: string;
  shots: Shot[];
  /** 이 화면이 보이면 성공 */
  success: { img?: string; alt?: string; text: string };
  troubles: Trouble[];
};

export type SetupTrack = {
  os: SetupOs;
  label: string;
  /** OS 선택 카드에 보이는 구분법 */
  hint: string;
  steps: SetupStep[];
};

export const SETUP_TEL = "010-9542-3775";
export const SETUP_FOLDER = "내일바꿈";
export const NODE_MAC = "https://nodejs.org/dist/v24.20.0/node-v24.20.0.pkg";
export const NODE_WIN = "https://nodejs.org/dist/v24.20.0/node-v24.20.0-x64.msi";

const W = (n: number) => `/ainb/setup/win/W${String(n).padStart(2, "0")}.png`;
const M = (n: number) => `/ainb/setup/mac/M${String(n).padStart(2, "0")}.png`;

/* ───────────────────────── 공통 조각 ───────────────────────── */

// 2기(9/9 형님 결정): 1기 계정은 팀에서 제거 후 재초대 → 1기와 같이 「초대 메일 수락 → 로그인」 흐름.
// 1기 원문 백업: `커리큘럼개발/교재용_백업_1기_계정초대수락_로그인절차.md`
const LOGIN_SHOTS = (img: { addAccount?: string; claudeLogin?: string; pickAccount?: string; cont?: string }): Shot[] => [
  {
    img: img.addAccount,
    alt: "gmail 오른쪽 위 프로필 → '다른 계정 추가' 메뉴",
    action: "① gmail.com을 열고, 오른쪽 위 동그란 프로필 → 「다른 계정 추가」를 누르세요.",
    note: "체크카드에 적힌 ai○○@lomadcoop.com 과 비밀번호를 입력합니다. 약관 화면이 뜨면 「동의」, 복구 전화번호는 「건너뛰기」.",
    link: { label: "gmail.com 열기", href: "https://mail.google.com" },
  },
  {
    alt: "받은편지함의 'Lomadcoop 팀 초대' 메일",
    action: "② 받은편지함에서 「Lomadcoop 팀 초대」 메일을 열고 수락 버튼을 누르세요.",
    note: "메일이 없으면 스팸함 확인. 그래도 없으면 손을 들어 주세요 — 바로 다시 보내 드립니다.",
  },
  {
    img: img.claudeLogin,
    alt: "claude.ai 첫 화면 — 「Google로 계속하기」 버튼",
    action: "③ claude.ai 로그인 화면에서 「Google로 계속하기」를 누르세요.",
    link: { label: "claude.ai 열기", href: "https://claude.ai" },
  },
  {
    img: img.pickAccount,
    alt: "Google 계정 선택 화면 — ai○○@lomadcoop.com 선택",
    action: "④ 계정 목록에서 반드시 방금 로그인한 ai○○@lomadcoop.com 을 고르세요.",
    note: "개인 구글 계정을 고르면 팀 시트가 연결되지 않아 Code 탭이 안 열립니다.",
  },
  {
    img: img.cont,
    alt: "Claude 로그인 확인 화면 — 「계속」 버튼",
    action: "⑤ 「계속」을 누르세요.",
  },
  {
    alt: "Claude 채팅 화면",
    action: "⑥ 채팅창에 아래 첫 인사를 붙여넣고 답이 오면 이 단계는 끝입니다.",
    prompt:
      "안녕! 나는 오늘 Ai를 처음 제대로 배우기 시작했어. 앞으로 4일 동안 내 비서가 되어 줘. 어려운 말은 쉬운 우리말로 풀어서 설명해줘. 먼저 네가 나 같은 사람에게 도와줄 수 있는 일 5가지만 알려줘.",
  },
];

const LOGIN_TROUBLES: Trouble[] = [
  {
    symptom: "'유효하지 않은 초대 링크 — 이 초대 링크는 다른 계정용입니다'가 뜬다",
    fix: "이미 개인 Claude 계정으로 로그인돼 있는 것입니다. 화면의 「로그아웃」을 누른 뒤, 초대 메일의 링크를 다시 클릭하세요.",
  },
  {
    symptom: "초대 메일이 안 왔다",
    fix: "스팸함을 먼저 보세요. 없으면 손을 들어 주세요. 운영진이 바로 다시 보냅니다.",
  },
  {
    symptom: "Google 로그인 화면에 ai○○ 계정이 목록에 없다",
    fix: "「다른 계정 사용」을 누르고 ai○○@lomadcoop.com 과 비밀번호를 직접 입력하세요.",
  },
  {
    symptom: "「Google로 계속하기」가 안 되거나 개인 계정으로 자꾸 들어간다",
    fix: "「이메일로 계속하기」 칸에 ai○○@lomadcoop.com 을 넣고 계속 → gmail 받은편지함에 「Claude.ai의 보안 링크가 도착했습니다」 메일이 옵니다 → 그 안의 「로그인」 버튼을 누르세요(10분 안에). 코드 6자리가 뜨면 그 숫자를 원래 창에 입력.",
    img: W(33),
    imgAlt: "gmail의 Claude 로그인 메일 — 「로그인」 버튼",
  },
];

const CODE_TAB_SHOTS = (img: { toggle?: string; codeHome?: string; newFolder?: string; folderName?: string; picker?: string; autoMode?: string; model?: string }): Shot[] => [
  {
    img: img.toggle,
    alt: "Claude 앱 왼쪽 위 「홈 ｜ Code」 토글",
    action: "① 앱 왼쪽 위 토글에서 「Code」를 누르세요.",
    note: "로그인 직후 뜨는 '커넥터 연결' 안내는 「완료」, '이 컴퓨터에 연결' 배너는 「나중에」로 넘기세요. 오늘은 안 씁니다.",
  },
  {
    img: img.codeHome,
    alt: "Code 탭 입력창 아래 「로컬 · 폴더 없음」 칩 → 「폴더 열기…」",
    action: "② 입력창 아래 「폴더 없음」 칩을 누르고 「폴더 열기…」를 고르세요.",
  },
  {
    img: img.newFolder,
    alt: "바탕화면 빈 곳 오른쪽 클릭 → 「새 폴더」",
    action: "③ 폴더 선택 창이 뜨면 왼쪽에서 「바탕 화면」을 고르고, 빈 곳을 오른쪽 클릭 → 「새 폴더」.",
    note: "이미 바탕화면에 폴더를 만들어 뒀다면 이 단계는 건너뛰고 그 폴더를 고르면 됩니다.",
  },
  {
    img: img.folderName,
    alt: `새 폴더 이름을 「${SETUP_FOLDER}」으로 입력`,
    action: `④ 이름을 「${SETUP_FOLDER}」으로 치고 Enter.`,
  },
  {
    img: img.picker,
    alt: `폴더 선택 창 — 「${SETUP_FOLDER}」 안에서 「폴더 선택」 버튼`,
    action: `⑤ 「${SETUP_FOLDER}」 폴더를 한 번 클릭한 뒤 아래 「폴더 선택」을 누르세요.`,
  },
  {
    img: img.autoMode,
    alt: "'자동 모드를 기본 권한 모드로 설정하시겠어요?' 창",
    action: "⑥ '자동 모드로 설정하시겠어요?'가 뜨면 「자동으로 전환」을 누르세요.",
    note: "안 뜨면 입력창 아래 「수동」 칩을 눌러 「자동」으로 바꾸면 됩니다. 자동이어야 Claude가 파일을 만들 때마다 묻지 않습니다.",
  },
  {
    img: img.model,
    alt: "모델 선택 — 「Opus 5」",
    action: "⑦ 입력창 오른쪽 아래 모델 이름(Sonnet 5)을 눌러 「Opus 5」로 바꾸세요.",
    note: "한도 경고가 뜨면 그때 Sonnet으로 내리면 됩니다.",
  },
];

const CODE_TAB_SUCCESS = (img?: string) => ({
  img,
  alt: `입력창 아래 칩에 '${SETUP_FOLDER}'이 표시된 화면`,
  text: `입력창 아래에 「${SETUP_FOLDER}」 칩과 「자동 · Opus 5」가 보이면 내 컴퓨터와 연결된 것입니다.`,
});

const FIRST_HELLO_SHOTS: Shot[] = [
  {
    img: W(38),
    alt: "Code 탭 입력창에 첫 인사 프롬프트를 붙여넣은 화면",
    action: "① 아래 문장을 Code 탭 입력창에 붙여넣고 Enter.",
    prompt: "안녕! 지금 열려 있는 폴더 이름이 뭔지 알려주고, 앞으로 이 폴더에서 네가 나를 어떻게 도와줄 수 있는지 세 줄로 설명해줘.",
    note: `폴더 이름(${SETUP_FOLDER})을 맞게 답하면 연결 성공입니다.`,
  },
  {
    alt: "Code 탭 입력창",
    action: "② 이어서 아래 문장을 붙여넣으세요. 여러분이 처음으로 Ai에게 컴퓨터 일을 시키는 순간입니다.",
    prompt: "node 버전을 확인해서 알려줘. 설치가 안 되어 있으면 어떻게 해야 하는지도 알려줘.",
    note: "버전 숫자(예: v24.20.0)를 알려주면 Node.js까지 정상입니다.",
  },
];

const FIRST_HELLO_TROUBLES: Trouble[] = [
  {
    symptom: "Code 탭을 눌렀더니 「업그레이드」 안내가 뜬다",
    fix: "팀 시트가 아직 안 붙은 것입니다. 개인 계정으로 로그인했는지 확인하고, 아니면 손을 들어 주세요.",
  },
  {
    symptom: "「온라인 로그인」을 하라고 한다",
    fix: "브라우저에서 로그인을 마친 뒤, 앱을 완전히 껐다가 다시 켜세요.",
  },
  {
    symptom: "node 를 못 찾는다고 한다",
    fix: "Node.js 설치 직후에는 앱이 새 프로그램을 모를 수 있습니다. 앱을 완전히 껐다가 다시 켠 뒤 같은 문장을 다시 보내세요. 그래도 안 되면 Node.js 설치 단계를 다시 확인하세요.",
  },
  {
    symptom: "폴더 이름을 엉뚱하게 답한다",
    fix: `입력창 아래 칩을 확인하세요. 「${SETUP_FOLDER}」이 아니면 폴더 아이콘을 눌러 다시 선택합니다.`,
  },
];

/* ───────────────────────── Windows ───────────────────────── */

const WINDOWS: SetupTrack = {
  os: "windows",
  label: "Windows 노트북",
  hint: "삼성·LG 등 대부분의 노트북. 왼쪽 아래 창문 모양 시작 버튼이 있으면 Windows입니다.",
  steps: [
    {
      id: "w1",
      title: "Claude 계정 — 초대 수락하고 로그인",
      minutes: "10분",
      goal: "실습용 구글 계정으로 Claude에 로그인해서 채팅 답을 한 번 받습니다.",
      shots: LOGIN_SHOTS({ addAccount: W(1), claudeLogin: W(3), pickAccount: W(26), cont: W(27) }),
      success: { img: W(28), alt: "Claude 첫 화면 — 가운데 입력창", text: "이런 첫 화면이 뜨고 채팅에 답이 오면 성공. 이 브라우저 창은 닫지 말고 두세요." },
      troubles: LOGIN_TROUBLES,
    },
    {
      id: "w2",
      title: "Claude 데스크톱 앱 설치",
      minutes: "10분",
      goal: "'말로 시키는 컴퓨터' Claude Code가 들어 있는 앱을 설치하고 같은 계정으로 로그인합니다.",
      shots: [
        {
          img: W(5),
          alt: "claude.ai/download 페이지 — Windows 다운로드 버튼",
          action: "① 아래 버튼으로 다운로드 페이지를 열고 「Windows」 다운로드를 누르세요.",
          link: { label: "Claude 앱 다운로드 페이지", href: "https://claude.ai/download" },
        },
        {
          img: W(6),
          alt: "브라우저 오른쪽 위 다운로드 완료 표시",
          action: "② 다운로드가 끝나면 오른쪽 위 다운로드 표시에서 파일을 클릭해 실행하세요.",
          note: "'이 앱이 디바이스를 변경하도록 허용하시겠습니까?'가 뜨면 「예」.",
        },
        {
          img: W(7),
          alt: "Claude 설치 진행 화면",
          action: "③ 설치는 자동으로 진행됩니다. 아무것도 누르지 말고 기다리세요.",
          note: "끝나면 앱이 저절로 열립니다.",
        },
        {
          img: W(8),
          alt: "Claude 앱 로그인 화면 — 「Google로 계속하기」",
          action: "④ 앱의 로그인 화면에서 「Google로 계속하기」를 누르세요. 브라우저가 열립니다.",
        },
        {
          img: W(29),
          alt: "브라우저의 Google 계정 선택 — ai○○@lomadcoop.com",
          action: "⑤ 브라우저의 계정 목록에 ai○○@lomadcoop.com 이 있으면 그것을, 없으면 「다른 계정 사용」을 눌러 ai○○@lomadcoop.com 을 입력하세요.",
          note: "1단계와 똑같은 계정이어야 합니다.",
        },
        {
          img: W(30),
          alt: "Claude 로그인 확인 — 「계속」",
          action: "⑥ 「계속」.",
        },
        {
          img: W(31),
          alt: "'Claude 앱에서 로그인 완료하기' — 「Claude 열기」",
          action: "⑦ 「Claude 열기」를 눌러 앱으로 돌아오세요. 브라우저가 '열겠습니까?'라고 물으면 「Claude 열기」.",
        },
      ],
      success: { img: W(9), alt: "Claude 앱 첫 화면 — 왼쪽 위 「홈 ｜ Code」 토글", text: "앱이 열리고 채팅 화면이 보이면 성공. 다음 단계에서 Git과 Node.js를 설치한 뒤에 Code 탭을 엽니다." },
      troubles: [
        {
          symptom: "'Windows의 PC 보호' 파란 창이 뜬다",
          fix: "「추가 정보」를 누른 뒤 「실행」을 누르세요. 공식 사이트에서 받은 파일이라 안전합니다.",
        },
        {
          symptom: "다운로드한 파일이 어디 있는지 모르겠다",
          fix: "파일 탐색기 → 「다운로드」 폴더에 Claude 로 시작하는 파일이 있습니다. 더블클릭하세요.",
        },
        {
          symptom: "앱에서 로그인이 계속 브라우저로만 간다",
          fix: "브라우저에서 로그인을 끝내면 '앱에서 열기' 팝업이 뜹니다. 「열기」를 누르세요. 안 뜨면 앱을 껐다 켜세요.",
        },
      ],
    },
    {
      id: "w3",
      title: "Git 설치 — Next 만 누르면 됩니다",
      minutes: "10분",
      goal: "Code 탭이 내 폴더를 열 때 필요한 부품입니다. 화면이 열 번 넘게 바뀌지만 전부 「Next」입니다.",
      shots: [
        {
          img: W(10),
          alt: "git-scm.com Windows 다운로드 페이지 — 'Click here to download' 링크",
          action: "① 아래 버튼으로 다운로드 페이지를 열고 맨 위 「Click here to download」를 누르세요.",
          link: { label: "Git 다운로드 페이지 (Windows)", href: "https://git-scm.com/downloads/win" },
          note: "와이파이가 느리면 운영진 USB에 같은 파일이 있습니다.",
        },
        {
          alt: "Git 설치 첫 화면 — 사용권(License) 화면",
          action: "② 받은 파일을 실행하면 이 화면이 뜹니다. 「Next」.",
          note: "'이 앱이 디바이스를 변경하도록 허용하시겠습니까?'가 먼저 뜨면 「예」.",
        },
        {
          alt: "Git 설치 중간 화면 예 — Select Components",
          action: "③ 이런 화면이 계속 나옵니다. 체크박스·선택지는 건드리지 말고 「Next」만 누르세요.",
          note: "설치 위치, 구성요소, 편집기, 브랜치 이름, PATH, SSH, HTTPS, 줄바꿈, 터미널, pull, 자격증명, 추가 옵션 순서로 지나갑니다. 전부 기본값이 정답입니다.",
        },
        {
          img: W(13),
          alt: "Git 설치 마지막 화면 — 「Install」 버튼",
          action: "④ 「Install」 버튼이 보이면 누르세요.",
        },
        {
          img: W(14),
          alt: "Git 설치 완료 화면 — 「Finish」",
          action: "⑤ 「Finish」. 체크박스(View Release Notes 등)는 해제해도 되고 그대로 둬도 됩니다.",
        },
      ],
      success: { text: "「Finish」를 누르고 창이 닫히면 성공. 확인은 마지막 단계에서 Claude에게 시킵니다." },
      troubles: [
        {
          symptom: "다운로드 페이지에서 뭘 눌러야 할지 모르겠다",
          fix: "페이지 맨 위 큰 글씨 「Click here to download」 하나만 누르면 됩니다. 아래 다른 버튼들은 필요 없습니다.",
        },
        {
          symptom: "실수로 설치 창을 닫았다",
          fix: "받은 파일을 다시 더블클릭하면 처음부터 다시 시작됩니다. 이미 설치가 끝난 뒤였다면 그냥 두고 다음 단계로 가세요.",
        },
      ],
    },
    {
      id: "w4",
      title: "Node.js 설치 — 역시 Next 만",
      minutes: "10분",
      goal: "3일차에 내 작품을 인터넷에 올리는 도구(Vercel)가 쓰는 부품입니다.",
      shots: [
        {
          alt: "Node.js 설치 파일 다운로드",
          action: "① 아래 버튼을 누르면 설치 파일(.msi)이 바로 내려옵니다. 다 받으면 실행하세요.",
          link: { label: "Windows용 Node.js 설치 파일 (.msi)", href: NODE_WIN },
          note: "와이파이가 느리면 운영진 USB에 같은 파일이 있습니다. 화면의 버전 숫자(v24.xx)가 조금 달라도 정상입니다.",
        },
        {
          img: W(15),
          alt: "Node.js 설치 첫 화면 — Welcome",
          action: "② 「Next」.",
        },
        {
          img: W(16),
          alt: "Node.js 사용권 화면 — 'I accept' 체크박스",
          action: "③ 「I accept the terms…」 체크박스에 체크한 뒤 「Next」.",
        },
        {
          img: W(17),
          alt: "Node.js 설치 위치 화면 — Destination Folder",
          action: "④ 위치는 바꾸지 말고 「Next」.",
        },
        {
          img: W(18),
          alt: "Node.js Custom Setup 화면",
          action: "⑤ 아무것도 건드리지 말고 「Next」.",
        },
        {
          img: W(19),
          alt: "Tools for Native Modules 화면 — 체크박스",
          action: "⑥ 여기 체크박스는 체크하지 마세요. 그대로 「Next」.",
          note: "체크하면 다른 프로그램까지 깔리며 오래 걸립니다.",
        },
        {
          img: W(20),
          alt: "Ready to install 화면 — 「Install」 버튼",
          action: "⑦ 「Install」 → '허용하시겠습니까?'에 「예」.",
        },
        {
          alt: "Node.js 설치 완료 화면 — 「Finish」",
          action: "⑧ 「Finish」.",
        },
      ],
      success: { text: "「Finish」를 누르고 창이 닫히면 성공. 확인은 마지막 단계에서 Claude에게 시킵니다." },
      troubles: [
        {
          symptom: "설치 파일을 실행했는데 Repair / Remove 화면이 뜬다",
          fix: "이미 Node.js가 있는 컴퓨터입니다. 「Cancel」로 닫고 다음 단계로 가세요.",
        },
        {
          symptom: "'허용하시겠습니까?' 창이 뒤로 숨었다",
          fix: "작업 표시줄에 깜빡이는 방패 아이콘을 눌러 「예」를 누르세요.",
        },
      ],
    },
    {
      id: "w5",
      title: "Code 탭 열고 내 폴더 연결",
      minutes: "5분",
      goal: `Claude 앱의 Code 탭에서 바탕화면의 '${SETUP_FOLDER}' 폴더를 연결합니다.`,
      shots: [
        {
          alt: "Claude 앱 다시 실행",
          action: "① Git·Node.js를 설치했으니 Claude 앱을 완전히 껐다가 다시 여세요.",
          note: "앱 오른쪽 위 ✕로 닫은 뒤 다시 실행. 새로 설치한 프로그램을 앱이 인식하게 하는 과정입니다.",
        },
        ...CODE_TAB_SHOTS({ toggle: W(22), codeHome: W(23), newFolder: W(35), folderName: W(36), picker: W(24), autoMode: W(37), model: W(39) }),
      ],
      success: CODE_TAB_SUCCESS(W(25)),
      troubles: [
        {
          symptom: "Code 탭을 눌렀더니 「업그레이드」 안내가 뜬다",
          fix: "팀 시트가 아직 안 붙은 것입니다. 로그인 계정이 ai○○@lomadcoop.com 인지 확인하고, 맞는데도 뜨면 손을 들어 주세요.",
        },
        {
          symptom: "폴더 아이콘을 눌러도 아무 일이 없다",
          fix: "3단계 Git 설치가 안 된 것일 수 있습니다. Git 설치 후 앱을 껐다 켜고 다시 시도하세요.",
        },
        {
          symptom: "폴더 선택 창에서 바탕화면을 못 찾겠다",
          fix: "왼쪽 목록에서 「바탕 화면」을 누르세요. 없으면 「내 PC」 → 「바탕 화면」.",
        },
      ],
    },
    {
      id: "w6",
      title: "첫 인사 — 연결 확인",
      minutes: "5분",
      goal: "Claude에게 폴더 이름과 Node.js 버전을 물어봐서 세팅이 끝났는지 확인합니다.",
      shots: FIRST_HELLO_SHOTS,
      success: { text: `폴더 이름 「${SETUP_FOLDER}」과 Node 버전 숫자를 모두 답하면 세팅 완료입니다. 실습 가이드 1일차로 돌아가세요.` },
      troubles: FIRST_HELLO_TROUBLES,
    },
  ],
};

/* ───────────────────────── Mac ───────────────────────── */

const MAC: SetupTrack = {
  os: "mac",
  label: "Mac 노트북",
  hint: "애플 맥북(MacBook). 뚜껑에 사과 로고, 화면 왼쪽 위에 사과 메뉴가 있으면 Mac입니다.",
  steps: [
    {
      id: "m1",
      title: "개발자 도구 설치 — 제일 먼저, 10분 걸립니다",
      minutes: "10~15분 (기다리는 동안 다음 단계 진행)",
      goal: "Code 탭이 내 폴더를 열 때 꼭 필요한 부품입니다. 오래 걸리니 맨 먼저 걸어 두고, 기다리는 동안 2·3단계를 합니다.",
      shots: [
        {
          img: M(1),
          alt: "Spotlight 검색창에 '터미널' 입력",
          action: "① 키보드 Cmd + Space 를 누르고 「터미널」이라고 친 뒤 Enter.",
        },
        {
          img: M(2),
          alt: "터미널 창이 열린 상태",
          action: "② 검은(또는 흰) 창이 뜨면 아래 명령을 복사해 붙여넣고 Enter.",
          command: "xcode-select --install",
        },
        {
          img: M(3),
          alt: "'명령어 라인 개발자 도구를 설치하시겠습니까?' 팝업",
          action: "③ 팝업에서 「설치」를 누르세요.",
          note: "'이미 설치되어 있습니다'라고 나오면 이 단계는 끝입니다. 2단계로 가세요.",
        },
        {
          img: M(4),
          alt: "사용권 계약 화면",
          action: "④ 「동의」.",
        },
        {
          img: M(5),
          alt: "다운로드·설치 진행 막대",
          action: "⑤ 5~10분 기다립니다. 진행 막대가 멈춘 것처럼 보여도 그대로 두세요.",
          note: "이 창은 그대로 두고, 아래 「다음」을 눌러 2단계(로그인)를 먼저 하세요.",
        },
      ],
      success: { img: M(6), alt: "'소프트웨어가 설치되었습니다' 완료 화면", text: "'소프트웨어가 설치되었습니다'가 뜨면 성공. 「완료」를 누르세요. (기다리는 동안 다음 단계로 넘어가도 됩니다.)" },
      troubles: [
        {
          symptom: "'이미 설치되어 있습니다'라고 나온다",
          fix: "정상입니다. 이 단계는 끝났으니 다음으로 가세요.",
        },
        {
          symptom: "설치를 중간에 「중지」했거나, '이미 설치'라는데 나중에 Code 탭에서 폴더 선택이 안 된다",
          fix: "반쯤 남은 설치 흔적을 지우고 다시 설치합니다. 터미널에 아래 명령을 붙여넣고 Enter → Mac 로그인 비밀번호 입력(타이핑해도 화면에 아무것도 안 보이는 게 정상) → Enter. 그다음 ②의 xcode-select --install 을 다시 실행하세요.",
          command: "sudo rm -rf /Library/Developer/CommandLineTools",
        },
        {
          symptom: "'소프트웨어를 찾을 수 없음' 또는 다운로드 오류가 뜬다",
          fix: "와이파이가 끊긴 것입니다. 와이파이를 확인하고 ②부터 다시 하세요. 계속 안 되면 손을 들어 주세요.",
        },
      ],
    },
    {
      id: "m2",
      title: "Claude 계정 — 초대 수락하고 로그인 (기다리는 동안)",
      minutes: "10분",
      goal: "실습용 구글 계정으로 Claude에 로그인해서 채팅 답을 한 번 받습니다.",
      shots: LOGIN_SHOTS({ addAccount: W(1), claudeLogin: W(3), pickAccount: W(26), cont: W(27) }),
      success: { img: W(28), alt: "Claude 첫 화면 — 가운데 입력창", text: "이런 첫 화면이 뜨고 채팅에 답이 오면 성공. 이 브라우저 창은 닫지 말고 두세요." },
      troubles: LOGIN_TROUBLES,
    },
    {
      id: "m3",
      title: "Claude 데스크톱 앱 설치",
      minutes: "10분",
      goal: "'말로 시키는 컴퓨터' Claude Code가 들어 있는 앱을 설치하고 같은 계정으로 로그인합니다.",
      shots: [
        {
          img: M(9),
          alt: "claude.ai/download 페이지 — Mac 다운로드 버튼",
          action: "① 아래 버튼으로 다운로드 페이지를 열고 「Mac」 다운로드를 누르세요.",
          link: { label: "Claude 앱 다운로드 페이지", href: "https://claude.ai/download" },
        },
        {
          img: M(10),
          alt: "다운로드 완료된 .dmg 파일",
          action: "② 다 받으면 브라우저 오른쪽 위 다운로드 표시에서 파일(Claude….dmg)을 클릭하세요.",
        },
        {
          img: M(11),
          alt: "dmg 창 — Claude 아이콘을 Applications 폴더로 드래그",
          action: "③ 창이 뜨면 Claude 아이콘을 오른쪽 「Applications」 폴더 위로 끌어다 놓으세요.",
        },
        {
          img: M(12),
          alt: "'인터넷에서 다운로드한 앱입니다. 열겠습니까?' 경고",
          action: "④ 「응용 프로그램」 폴더(또는 Launchpad)에서 Claude를 열고, 경고가 뜨면 「열기」.",
        },
        {
          img: M(13),
          alt: "Claude 앱 로그인 화면",
          action: "⑤ 「Google로 계속하기」 → 브라우저에서 ai○○@lomadcoop.com 선택 → 「계속」 → 「Claude 열기」로 앱으로 돌아오기.",
          note: "2단계와 똑같은 계정이어야 합니다.",
        },
      ],
      success: { img: M(16), alt: "앱 메인 화면 — 왼쪽 위 토글", text: "앱이 열리고 채팅 화면이 보이면 성공. Code 탭은 개발자 도구와 Node.js 설치가 끝난 뒤 5단계에서 엽니다." },
      troubles: [
        {
          symptom: "'열 수 없습니다. 확인되지 않은 개발자' 라고 뜬다",
          fix: "시스템 설정 → 개인정보 보호 및 보안 → 아래로 내려 「그래도 열기」를 누르세요.",
        },
        {
          symptom: "dmg 창을 닫아 버렸다",
          fix: "다운로드 폴더의 .dmg 파일을 다시 더블클릭하면 같은 창이 뜹니다.",
        },
        {
          symptom: "앱에서 로그인이 계속 브라우저로만 간다",
          fix: "브라우저에서 로그인을 끝내면 'Claude에서 열기' 팝업이 뜹니다. 「열기」. 안 뜨면 앱을 Cmd + Q로 완전히 종료했다가 다시 여세요.",
        },
      ],
    },
    {
      id: "m4",
      title: "Node.js 설치 — 계속·동의·설치",
      minutes: "5분",
      goal: "3일차에 내 작품을 인터넷에 올리는 도구(Vercel)가 쓰는 부품입니다.",
      shots: [
        {
          alt: "Node.js 설치 파일 다운로드",
          action: "① 아래 버튼을 누르면 설치 파일(.pkg)이 바로 내려옵니다. 다 받으면 더블클릭.",
          link: { label: "Mac용 Node.js 설치 파일 (.pkg)", href: NODE_MAC },
          note: "M1·M2·M3·인텔 어떤 Mac이든 이 파일 하나면 됩니다. 와이파이가 느리면 운영진 USB.",
        },
        {
          img: M(19),
          alt: "설치 프로그램 첫 화면 — 소개",
          action: "② 「계속」.",
        },
        {
          img: M(20),
          alt: "사용권 계약 — 「동의」 버튼",
          action: "③ 「계속」 → 「동의」.",
        },
        {
          img: M(21),
          alt: "설치 버튼 화면",
          action: "④ 「설치」.",
        },
        {
          img: M(22),
          alt: "Mac 비밀번호(또는 Touch ID) 입력 팝업",
          action: "⑤ Mac 로그인 비밀번호를 입력하거나 Touch ID.",
        },
      ],
      success: { img: M(23), alt: "'설치가 성공적으로 완료되었습니다' 화면", text: "'설치가 성공적으로 완료되었습니다'가 뜨면 성공. 「닫기」 → 설치 파일을 휴지통으로 옮길지 물으면 「휴지통으로 이동」." },
      troubles: [
        {
          symptom: "비밀번호를 쳐도 안 넘어간다",
          fix: "Mac에 로그인할 때 쓰는 비밀번호입니다(Apple ID 비밀번호가 아닙니다). 모르면 손을 들어 주세요.",
        },
      ],
    },
    {
      id: "m5",
      title: "Code 탭 열고 내 폴더 연결",
      minutes: "5분",
      goal: `Claude 앱의 Code 탭에서 데스크탑의 '${SETUP_FOLDER}' 폴더를 연결합니다.`,
      shots: [
        {
          alt: "개발자 도구 설치 완료 확인",
          action: "① 1단계 개발자 도구 설치가 「완료」되었는지 확인하고, Claude 앱을 Cmd + Q로 완전히 종료했다가 다시 여세요.",
          note: "앱을 다시 켜야 방금 설치한 개발자 도구를 인식합니다. 창만 닫으면(빨간 버튼) 종료가 아닙니다. 꼭 Cmd + Q.",
        },
        ...CODE_TAB_SHOTS({ toggle: M(16), codeHome: M(17), picker: M(18), autoMode: W(37), model: W(39) }),
      ],
      success: CODE_TAB_SUCCESS(M(24)),
      troubles: [
        {
          symptom: "폴더 아이콘을 눌러도 아무 일이 없거나, 선택해도 연결이 안 된다",
          fix: "개발자 도구가 아직 없는 것입니다. 1단계가 끝났는지 확인하고, 끝났는데도 안 되면 1단계 트러블슈팅의 '반쯤 남은 설치 흔적 지우기'를 한 뒤 앱을 Cmd + Q로 재시작하세요.",
          command: "sudo rm -rf /Library/Developer/CommandLineTools",
        },
        {
          symptom: "Code 탭을 눌렀더니 「업그레이드」 안내가 뜬다",
          fix: "팀 시트가 아직 안 붙은 것입니다. 로그인 계정이 ai○○@lomadcoop.com 인지 확인하고, 맞는데도 뜨면 손을 들어 주세요.",
        },
        {
          symptom: "폴더 선택 창에서 데스크탑을 못 찾겠다",
          fix: "왼쪽 목록에서 「데스크탑」을 누르세요. 없으면 위쪽 검색창에 '데스크탑'.",
        },
      ],
    },
    {
      id: "m6",
      title: "첫 인사 — 연결 확인",
      minutes: "5분",
      goal: "Claude에게 폴더 이름과 Node.js 버전을 물어봐서 세팅이 끝났는지 확인합니다.",
      shots: FIRST_HELLO_SHOTS,
      success: { text: `폴더 이름 「${SETUP_FOLDER}」과 Node 버전 숫자를 모두 답하면 세팅 완료입니다. 실습 가이드 1일차로 돌아가세요.` },
      troubles: FIRST_HELLO_TROUBLES,
    },
  ],
};

export const SETUP_TRACKS: SetupTrack[] = [WINDOWS, MAC];

export function getTrack(os: SetupOs): SetupTrack {
  return SETUP_TRACKS.find((t) => t.os === os) ?? WINDOWS;
}
