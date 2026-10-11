import { cookies } from "next/headers";
import { adminList } from "@/lib/festeco-db";
import { findSession } from "@/lib/festeco-config";
import { verifyAdmin, ADMIN_COOKIE } from "../auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const store = await cookies();
  if (!verifyAdmin(store.get(ADMIN_COOKIE)?.value)) {
    return new Response("unauthorized", { status: 401 });
  }
  const rows = await adminList();
  const header = ["회차", "일시", "상태", "신청자", "연락처", "성인", "어린이", "총인원", "신청일시", "취소일시"];
  const esc = (s: string) => `"${(s ?? "").replace(/"/g, '""')}"`;
  const kst = (iso: string | null) =>
    iso ? new Date(iso).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }) : "";
  const lines = [header.join(",")];
  for (const r of rows) {
    const s = findSession(r.session_key);
    lines.push(
      [
        esc(s?.round ?? r.session_key),
        esc(s?.label ?? ""),
        esc(r.status === "confirmed" ? "확정" : r.status === "cancelled" ? "취소" : r.status),
        esc(r.guardian_name),
        esc(r.phone),
        esc(String(r.adults)),
        esc(String(r.children)),
        esc(String(r.total)),
        esc(kst(r.created_at)),
        esc(kst(r.cancelled_at)),
      ].join(","),
    );
  }
  const csv = "﻿" + lines.join("\r\n"); // BOM: 엑셀 한글 깨짐 방지
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="festeco-registrations.csv"`,
    },
  });
}
