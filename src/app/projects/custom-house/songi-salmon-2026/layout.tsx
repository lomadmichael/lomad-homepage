import "./songi.css";

// 축제 접수 화면 전용 레이아웃.
// - 축제 서체(Pretendard + 학교안심 알림장)는 이 경로에서만 불러온다 (React 19 <link precedence> → <head>로 올라감).
// - 사이트 공통 LOMAD 상단바·하단 푸터는 이 경로에서만 숨긴다. 일반 <style>(precedence 없음)이라
//   다른 페이지로 이동하면 함께 사라진다. 운영 표기는 Shell 하단 "운영 : 로마드 협동조합"으로 대신한다.
export default function SongiLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        precedence="default"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/fonts-archive/HakgyoansimAllimjang/subsets/HakgyoansimAllimjang-dynamic-subset.css"
        precedence="default"
      />
      <style>{`body > nav, body > footer { display: none !important; } body { background: #F5EEDF; }`}</style>
      {children}
    </>
  );
}
