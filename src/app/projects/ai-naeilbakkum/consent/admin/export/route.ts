import { cookies } from "next/headers";
import { listConsents, decryptRrn } from "@/lib/ainb-consent-db";
import { verifyAdmin, ADMIN_COOKIE } from "../auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const store = await cookies();
  if (!verifyAdmin(store.get(ADMIN_COOKIE)?.value)) {
    return new Response("unauthorized", { status: 401 });
  }
  const rows = await listConsents();
  const esc = (s: string) => `"${(s ?? "").replace(/"/g, '""')}"`;
  const yn = (b: boolean) => (b ? "O" : "X");

  const header = [
    "기수",
    "제출일시",
    "성명",
    "연락처",
    "이메일",
    "보험가입 이름",
    "주민등록번호",
    "주소",
    "환불계좌",
    "개인정보",
    "프로그램",
    "보험가입",
    "촬영",
    "환불조건",
    "자율책임",
    "이용수칙",
    "비고",
  ];
  const lines = [header.join(",")];
  for (const r of rows) {
    const rrn = r.rrn_purged_at ? "파기됨" : decryptRrn(r.rrn_enc);
    lines.push(
      [
        esc(r.cohort),
        esc(new Date(r.created_at).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })),
        esc(r.name),
        esc(r.phone),
        esc(r.email ?? ""),
        esc(r.insured_name),
        esc(rrn),
        esc(r.address),
        esc(r.refund_account),
        yn(r.consent_privacy),
        yn(r.consent_program),
        yn(r.consent_insurance),
        yn(r.consent_media),
        yn(r.consent_refund),
        yn(r.consent_selfrisk),
        yn(r.consent_rules),
        esc(r.note ?? ""),
      ].join(","),
    );
  }
  // 엑셀에서 한글이 깨지지 않도록 BOM 부착
  const body = "﻿" + lines.join("\r\n");
  return new Response(body, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="ainb_consents.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
