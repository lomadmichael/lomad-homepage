import { adminList } from "@/lib/ecology-db";
import { sendReminderSms } from "@/lib/ecology-sms";

export const dynamic = "force-dynamic";

/** 내일(KST) 날짜를 YYYY-MM-DD 로 — cron이 UTC 09:00(=KST 18:00)에 도므로 KST 기준 +1일. */
function tomorrowKstKey(): string {
  const nowKst = new Date(Date.now() + 9 * 3600 * 1000);
  const t = new Date(nowKst.getTime() + 24 * 3600 * 1000);
  return `${t.getUTCFullYear()}-${String(t.getUTCMonth() + 1).padStart(2, "0")}-${String(
    t.getUTCDate(),
  ).padStart(2, "0")}`;
}

export async function GET(request: Request) {
  const secret = process.env.ECOLOGY_CRON_SECRET;
  const auth = request.headers.get("authorization");
  const provided =
    request.headers.get("x-cron-secret") ?? (auth?.startsWith("Bearer ") ? auth.slice(7) : null);
  if (!secret || provided !== secret) {
    return new Response(JSON.stringify({ ok: false, error: "unauthorized" }), { status: 401 });
  }

  const target = tomorrowKstKey();
  let sent = 0,
    failed = 0;
  try {
    const rows = await adminList();
    const todo = rows.filter((r) => r.session_key === target && r.status === "confirmed");
    for (const r of todo) {
      try {
        await sendReminderSms({
          phone: r.phone,
          guardianName: r.guardian_name,
          sessionKey: r.session_key,
        });
        sent++;
      } catch (e) {
        console.error("[ecology] reminder send failed:", e);
        failed++;
      }
    }
  } catch (e) {
    console.error("[ecology] reminder cron failed:", e);
    return new Response(JSON.stringify({ ok: false, error: "list failed" }), { status: 500 });
  }
  return new Response(JSON.stringify({ ok: true, target, sent, failed }), {
    headers: { "Content-Type": "application/json" },
  });
}
