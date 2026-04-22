import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };
export const alt = "로마드 협동조합";

export default async function OpengraphImage() {
  // 로컬 PNG를 base64로 인라인 (ImageResponse는 외부 URL 대신 data URI 선호)
  const logoPath = join(process.cwd(), "public/images/logo-new-03.png");
  const logoBuffer = await readFile(logoPath);
  const logoDataUri = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FFFFFF",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoDataUri}
          alt="LOMAD"
          width={680}
          height={240}
          style={{ objectFit: "contain" }}
        />
      </div>
    ),
    { ...size },
  );
}
