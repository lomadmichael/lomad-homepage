import { cookies } from "next/headers";
import { adminList } from "@/lib/ecology-db";
import { sessionLabel } from "@/lib/ecology-config";
import { verifyAdmin, ADMIN_COOKIE } from "../auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const store = await cookies();
  if (!verifyAdmin(store.get(ADMIN_COOKIE)?.value)) {
    return new Response("unauthorized", { status: 401 });
  }
  const rows = await adminList();
  const header = ["회차", "상태", "신청자", "연락처", "이메일", "참가자", "인원", "건강특이사항", "비고"];
  const esc = (s: string) => `"${(s ?? "").replace(/"/g, '""')}"`;
  const lines = [header.join(",")];
  for (const r of rows) {
    lines.push(
      [
        esc(sessionLabel(r.session_key)),
        esc(r.status === "confirmed" ? "확정" : r.status === "waitlist" ? "대기" : r.status),
        esc(r.guardian_name),
        esc(r.phone),
        esc(r.email ?? ""),
        esc(r.participants.map((c) => `${c.name}(만 ${c.age}세·${c.category ?? ""})`).join(" / ")),
        esc(String(r.participants.length)),
        esc(r.health_note ?? ""),
        esc(r.note ?? ""),
      ].join(","),
    );
  }
  const csv = "﻿" + lines.join("\r\n"); // BOM: 엑셀 한글 깨짐 방지
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="ecology-registrations.csv"`,
    },
  });
}
