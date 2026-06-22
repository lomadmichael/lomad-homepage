import { adminList } from "@/lib/festival-db";
import { experienceLabel } from "@/lib/festival-experiences";
import { isAdmin } from "../actions";

export const dynamic = "force-dynamic";

const STATUS_KO: Record<string, string> = { confirmed: "확정", waitlist: "대기", cancelled: "취소" };

function csvCell(v: string | number | null | undefined): string {
  const s = v == null ? "" : String(v);
  return `"${s.replace(/"/g, '""')}"`;
}

export async function GET() {
  if (!(await isAdmin())) {
    return new Response("Unauthorized", { status: 401 });
  }

  const regs = await adminList();
  const header = [
    "신청시각", "신청자", "연락처", "참가지역", "캠핑", "캠핑상태", "텐트대여", "참가자", "나이", "체험", "상태", "비고",
  ];
  const rows: string[] = [header.map(csvCell).join(",")];

  for (const r of regs) {
    const when = new Date(r.created_at).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
    const camping = r.camping === "deck" ? "데크" : r.camping === "noji" ? "노지" : "";
    const campingStatus = r.camping_status ? STATUS_KO[r.camping_status] ?? r.camping_status : "";
    const tent = r.camping ? (r.tent_rental ? "필요" : "지참") : "";
    for (const p of r.participants) {
      const base = [when, r.rep_name, r.phone, r.region, camping, campingStatus, tent, p.name, p.age];
      if (p.signups.length === 0) {
        rows.push([...base, "", "", r.note ?? ""].map(csvCell).join(","));
      } else {
        for (const s of p.signups) {
          rows.push(
            [...base, experienceLabel(s.experience_key, s.time_slot), STATUS_KO[s.status] ?? s.status, r.note ?? ""]
              .map(csvCell)
              .join(","),
          );
        }
      }
    }
  }

  const csv = "﻿" + rows.join("\r\n"); // BOM: Excel 한글 깨짐 방지
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="festival-registrations.csv"`,
    },
  });
}
