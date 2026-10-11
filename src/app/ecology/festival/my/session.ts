// "use server" 파일(actions.ts)은 async 함수만 export 가능 → 쿠키 상수는 여기 분리.
// 정규 /ecology/my 쿠키(ecology_my, path /ecology)와 겹치지 않는 이름·경로.
export const FESTECO_COOKIE = "festeco_session";
export const FESTECO_COOKIE_PATH = "/ecology/festival";
