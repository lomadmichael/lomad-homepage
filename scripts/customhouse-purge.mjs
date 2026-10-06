#!/usr/bin/env node
// 송이연어축제 커스텀하우스 접수 — 통계 저장 후 개인정보 파기.
// 개인정보 처리방침상 행사 종료 후 7일 내(2026-10-25까지) 실행.
//
// 사용법 (lomad-homepage 폴더에서):
//   node scripts/customhouse-purge.mjs            # 통계 JSON만 저장 (드라이런, 아무것도 지우지 않음)
//   node scripts/customhouse-purge.mjs --purge    # 통계 JSON 저장 → DB 스냅샷 저장 → 접수·OTP 전부 삭제
//
// 출력: docs/customhouse/customhouse-songi-2026-stats-<시각>.json (개인정보 없음: 일자·회차별 인원,
//       성별, 연령대, 영수증 합계)
// env: .env.local 의 SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY

import { readFileSync, mkdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function loadEnv() {
  const p = join(root, ".env.local");
  if (!existsSync(p)) return;
  // CRLF 혼재 대비: 반드시 /\r?\n/ 로 분리
  for (const line of readFileSync(p, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m || process.env[m[1]]) continue;
    process.env[m[1]] = m[2].replace(/^["']|["']$/g, "").trim();
  }
}

loadEnv();
const url = (process.env.SUPABASE_URL || "").trim();
const key = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();
if (!url || !key) {
  console.error("SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY 가 없습니다 (.env.local).");
  process.exit(1);
}
const doPurge = process.argv.includes("--purge");
const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });

const { data: stats, error } = await db.rpc("customhouse_stats");
if (error) {
  console.error("통계 조회 실패:", error.message);
  process.exit(1);
}

const outDir = join(root, "docs", "customhouse");
mkdirSync(outDir, { recursive: true });
const stamp = new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 16).replace(/[-:T]/g, "");
const outPath = join(outDir, `customhouse-songi-2026-stats-${stamp}.json`);
writeFileSync(outPath, JSON.stringify(stats, null, 2), "utf8");
console.log(`통계 저장: ${outPath}`);
console.log(`  접수 ${stats.registrations}건 · 참여 ${stats.participants}명 · 영수증 합계 ${stats.receipts?.total_amount?.toLocaleString?.() ?? "-"}원`);

if (!doPurge) {
  console.log("드라이런: 개인정보는 지우지 않았습니다. 파기하려면 --purge 를 붙여 다시 실행하세요.");
  process.exit(0);
}

const { data: res, error: perr } = await db.rpc("customhouse_purge", { p_confirm: "PURGE" });
if (perr) {
  console.error("파기 실패:", perr.message);
  process.exit(1);
}
console.log("파기 완료:", res);
