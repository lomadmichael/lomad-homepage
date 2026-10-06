import { STATUS_LABEL, formatKstTime, hourLabel, todayKst } from "@/lib/customhouse-config";
import { adminList } from "@/lib/customhouse-db";
import { isAdmin } from "@/lib/customhouse-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdmin())) return new Response("unauthorized", { status: 401 });
  const rows = await adminList();
  const header = [
    "접수번호",
    "상태",
    "회차일",
    "회차",
    "대표자",
    "휴대폰",
    "인원",
    "참여자(이름/성별/나이)",
    "영수증합계",
    "영수증상세",
    "접수시각",
    "승인시각",
    "입장시각",
    "경로",
    "법정대리인동의",
  ];
  const esc = (s: string | number | null | undefined) => `"${String(s ?? "").replace(/"/g, '""')}"`;
  const lines = [header.map(esc).join(",")];
  for (const r of rows) {
    lines.push(
      [
        r.code,
        STATUS_LABEL[r.status] ?? r.status,
        r.slot_date ?? "",
        r.slot_hour != null ? hourLabel(r.slot_hour) : "",
        r.rep_name,
        r.phone,
        r.party_size,
        r.participants.map((p) => `${p.name}/${p.gender ?? "-"}/${p.age ?? "-"}`).join(" · "),
        r.receipt_total,
        r.receipts.map((x) => `${x.amount}${x.store ? `(${x.store})` : ""}`).join(" + "),
        formatKstTime(r.created_at),
        formatKstTime(r.approved_at),
        formatKstTime(r.checked_in_at),
        r.via === "proxy" ? "대리" : "셀프",
        r.guardian_consent ? "Y" : "",
      ]
        .map(esc)
        .join(","),
    );
  }
  const csv = "﻿" + lines.join("\r\n"); // BOM: 엑셀 한글 깨짐 방지
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="customhouse-songi-${todayKst()}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
