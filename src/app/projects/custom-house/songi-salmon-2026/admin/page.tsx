import type { Metadata } from "next";
import Link from "next/link";
import {
  ADMIN_COOKIE_PATH,
  SLOT_CAPACITY,
  SLOT_COLORS,
  SLOT_HOURS,
  STATUS_LABEL,
  canReleaseNoShow,
  dateLabel,
  formatKstTime,
  hourLabel,
  isSlotAssignable,
  isTestMode,
  maxPartySize,
  suggestSlot,
  todayKst,
  type RegStatus,
} from "@/lib/customhouse-config";
import { adminList, getSeats, type Registration } from "@/lib/customhouse-db";
import { isAdmin } from "@/lib/customhouse-auth";
import { Shell } from "../_components/Shell";
import AutoRefresh from "../_components/AutoRefresh";
import AdminLogin from "./AdminLogin";
import ProxyForm from "./ProxyForm";
import { adminLogoutAction, approveAction, reassignAction, rejectAction, statusAction } from "./actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "부스 관리자 · 커스텀 티셔츠 만들기",
  robots: { index: false },
};

type SP = Promise<{ [key: string]: string | string[] | undefined }>;
const str = (v: string | string[] | undefined) => (typeof v === "string" ? v : "");
const last4 = (phone: string) => phone.slice(-4);

const STATUS_BADGE: Record<RegStatus, string> = {
  pending: "bg-[#E8A845]/20 text-[#8a5a10]",
  approved: "bg-[#4F8FB0]/15 text-[#2c5f7a]",
  checked_in: "bg-[#3E6E5C]/15 text-[#2b5444]",
  no_show: "bg-[#B2453A]/15 text-[#B2453A]",
  cancelled: "bg-[#262120]/10 text-[#262120]/50",
};

export default async function AdminPage({ searchParams }: { searchParams: SP }) {
  if (!(await isAdmin())) {
    return (
      <Shell>
        <AdminLogin />
      </Shell>
    );
  }

  const sp = await searchParams;
  const tab = (["pending", "slots", "proxy"].includes(str(sp.tab)) ? str(sp.tab) : "pending") as
    | "pending"
    | "slots"
    | "proxy";
  const msg = str(sp.msg);
  const msgOk = str(sp.ok) === "1";
  const q = str(sp.q).trim();

  const now = new Date();
  const test = isTestMode();
  const today = todayKst(now);

  let rows: Registration[] = [];
  let seats: Record<number, number> = {};
  let loadError = false;
  try {
    [rows, seats] = await Promise.all([adminList(), getSeats(today)]);
  } catch (e) {
    console.error("[customhouse] admin load failed:", e);
    loadError = true;
  }

  const pending = rows.filter((r) => r.status === "pending");
  const todays = rows.filter((r) => r.slot_date === today && r.status !== "cancelled" && r.status !== "pending");
  const totalSeats = Object.values(seats).reduce((a, b) => a + b, 0);

  const matches = (r: Registration) => {
    if (!q) return true;
    const qq = q.toUpperCase().replace(/\s/g, "");
    return r.code.toUpperCase().includes(qq) || r.phone.endsWith(q.replace(/\D/g, "") || "__none__");
  };

  return (
    <Shell wide>
      <AutoRefresh intervalMs={10000} pauseWhileEditing />
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h1 className="sx-hand text-[26px] leading-tight">부스 관리 · {dateLabel(today)}</h1>
          <p className="text-[13px] text-[#262120]/60">
            오늘 배정 {totalSeats}명 / {SLOT_CAPACITY * SLOT_HOURS.length}명 · 승인 대기 {pending.length}건
            {test && <b className="ml-2 text-[#B2453A]">테스트 모드(시간 제한 해제·문자 드라이런)</b>}
          </p>
        </div>
        <div className="flex items-center gap-4 text-[13px]">
          <a href={`${ADMIN_COOKIE_PATH}/export`} className="underline font-bold">
            CSV 내보내기
          </a>
          <form action={adminLogoutAction}>
            <button className="underline text-[#262120]/60">로그아웃</button>
          </form>
        </div>
      </div>

      <nav className="grid grid-cols-3 gap-2 mb-4">
        {(
          [
            ["pending", `승인 대기 (${pending.length})`],
            ["slots", "회차 현황"],
            ["proxy", "대리 접수"],
          ] as const
        ).map(([k, label]) => (
          <Link
            key={k}
            href={`${ADMIN_COOKIE_PATH}?tab=${k}`}
            className={`h-12 rounded-2xl border-[3px] border-[#262120] flex items-center justify-center text-[15px] font-black ${
              tab === k ? "bg-[#262120] text-[#F5EEDF]" : "bg-white text-[#262120]/70"
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>

      {msg && (
        <p
          className={`mb-4 rounded-2xl px-4 py-3 text-[15px] font-bold ${
            msgOk ? "bg-[#3E6E5C]/15 text-[#2b5444]" : "bg-[#B2453A]/15 text-[#B2453A]"
          }`}
          role="status"
        >
          {msg}
        </p>
      )}
      {loadError && (
        <p className="mb-4 rounded-2xl px-4 py-3 bg-[#B2453A]/15 text-[#B2453A] font-bold">
          데이터를 불러오지 못했어요 (DB 연결 확인). 종이 대장으로 운영하세요.
        </p>
      )}

      {tab === "pending" && (
        <PendingTab
          rows={rows}
          pending={pending.filter(matches)}
          q={q}
          seats={seats}
          today={today}
          now={now}
          test={test}
          matches={matches}
        />
      )}
      {tab === "slots" && (
        <SlotsTab todays={todays} seats={seats} today={today} now={now} test={test} focusHour={Number(str(sp.h)) || null} />
      )}
      {tab === "proxy" && <ProxyForm />}
    </Shell>
  );
}

function HourOptions({
  today,
  seats,
  now,
  test,
  party,
  exclude,
}: {
  today: string;
  seats: Record<number, number>;
  now: Date;
  test: boolean;
  party: number;
  exclude?: number | null;
}) {
  return (
    <>
      {SLOT_HOURS.map((h) => {
        const left = SLOT_CAPACITY - (seats[h] ?? 0);
        const assignable = isSlotAssignable(today, h, now, test);
        const fits = left >= party;
        return (
          <option key={h} value={h} disabled={!assignable || !fits || h === exclude}>
            {hourLabel(h)} · 남은 {left}
            {!assignable ? " (마감)" : !fits ? " (부족)" : ""}
          </option>
        );
      })}
    </>
  );
}

function PendingTab({
  rows,
  pending,
  q,
  seats,
  today,
  now,
  test,
  matches,
}: {
  rows: Registration[];
  pending: Registration[];
  q: string;
  seats: Record<number, number>;
  today: string;
  now: Date;
  test: boolean;
  matches: (r: Registration) => boolean;
}) {
  const others = q ? rows.filter((r) => r.status !== "pending" && matches(r)) : [];
  return (
    <div>
      <form className="flex gap-2 mb-4" action={ADMIN_COOKIE_PATH}>
        <input type="hidden" name="tab" value="pending" />
        <input
          name="q"
          defaultValue={q}
          inputMode="text"
          placeholder="번호 뒤 4자리 또는 접수번호 (A-012)"
          className="flex-1 h-14 rounded-2xl bg-[#FBF7EE] border-[3px] border-[#262120] px-4 text-[17px] outline-none focus:border-[#E07F74]"
        />
        <button className="h-14 px-6 rounded-2xl bg-[#262120] text-white font-black">검색</button>
        {q && (
          <Link href={`${ADMIN_COOKIE_PATH}?tab=pending`} className="h-14 px-4 rounded-2xl bg-white font-bold flex items-center">
            전체
          </Link>
        )}
      </form>

      {pending.length === 0 && <p className="text-center py-10 text-[#262120]/50 font-bold">승인 대기 중인 접수가 없어요.</p>}

      <div className="grid md:grid-cols-2 gap-3">
        {pending.map((r) => {
          const suggested = suggestSlot(today, seats, r.party_size, now, test);
          const createdDay = formatKstTime(r.created_at);
          const notToday = r.created_at && todayKst(new Date(r.created_at)) !== today;
          return (
            <form key={r.id} action={approveAction} className="rounded-3xl bg-white border-[3px] border-[#262120] shadow-[3px_4px_0_#262120] p-4 space-y-3">
              <input type="hidden" name="id" value={r.id} />
              <input type="hidden" name="q" value={q} />
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[30px] font-black leading-none tabular-nums">{r.code}</p>
                  <p className="text-[14px] mt-1">
                    <b>{r.rep_name}</b> · ****{last4(r.phone)} · {createdDay}
                    {r.via === "proxy" && <span className="ml-1 text-[#8C4A42] font-bold">대리</span>}
                  </p>
                  {notToday && <p className="text-[13px] font-bold text-[#B2453A]">⚠ 오늘 접수가 아님 — 영수증 날짜 확인</p>}
                </div>
                <span className="text-[13px] text-[#262120]/50 text-right">
                  {r.participants.map((p) => `${p.name}(${p.gender ?? "-"}·${p.age ?? "-"})`).join(", ")}
                </span>
              </div>

              <div className="rounded-2xl bg-[#F5EEDF] p-3 space-y-2">
                <p className="text-[13px] font-bold text-[#8C4A42]">영수증 (실물 확인 후 수정 가능)</p>
                {r.receipts.map((rc, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input type="hidden" name="store" value={rc.store ?? ""} />
                    <input
                      name="amount"
                      defaultValue={rc.amount}
                      inputMode="numeric"
                      className="w-36 h-11 rounded-xl bg-white px-3 text-right font-black tabular-nums"
                    />
                    <span className="text-[13px] text-[#262120]/60 truncate">원 {rc.store ?? ""}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2">
                  <input
                    name="extra_amount"
                    placeholder="추가 영수증"
                    inputMode="numeric"
                    className="w-36 h-11 rounded-xl bg-white px-3 text-right tabular-nums"
                  />
                  <span className="text-[13px] text-[#262120]/60">원</span>
                </div>
                <p className="text-[14px]">
                  합계 <b>{r.receipt_total.toLocaleString("ko-KR")}원</b> → 최대 {maxPartySize(r.receipt_total)}명
                </p>
              </div>

              <div className="grid grid-cols-[auto_1fr] gap-2 items-center">
                <label className="text-[14px] font-bold">인원</label>
                <input
                  name="party_size"
                  type="number"
                  min={1}
                  defaultValue={r.party_size}
                  className="h-12 rounded-xl bg-[#F5EEDF] px-3 text-[18px] font-black w-24"
                />
                <label className="text-[14px] font-bold">회차</label>
                <select
                  name="hour"
                  defaultValue={suggested ?? ""}
                  className="h-12 rounded-xl bg-[#F5EEDF] px-3 text-[16px] font-black"
                  required
                >
                  <option value="" disabled>
                    {suggested === null ? "오늘 남은 회차 없음" : "회차 선택"}
                  </option>
                  <HourOptions today={today} seats={seats} now={now} test={test} party={r.party_size} />
                </select>
              </div>

              <div className="grid grid-cols-[2fr_1fr] gap-2">
                <button className="h-14 rounded-2xl bg-[#E07F74] text-white text-[18px] font-black">승인 · 회차권 발급</button>
                <button
                  formAction={rejectAction}
                  formNoValidate
                  className="h-14 rounded-2xl bg-white border-2 border-[#262120]/10 text-[#262120]/60 font-bold"
                >
                  반려(취소)
                </button>
              </div>
              <input type="hidden" name="tab" value="pending" />
            </form>
          );
        })}
      </div>

      {others.length > 0 && (
        <div className="mt-8">
          <h2 className="text-[16px] font-black mb-2">다른 상태 검색 결과</h2>
          <div className="space-y-2">
            {others.map((r) => (
              <div key={r.id} className="rounded-2xl bg-white border-2 border-[#262120] px-4 py-3 flex flex-wrap items-center gap-3">
                <span className="text-[20px] font-black tabular-nums">{r.code}</span>
                <span className="text-[14px]">
                  {r.rep_name} · ****{last4(r.phone)} · {r.party_size}명
                </span>
                <span className={`text-[12px] font-bold px-2 py-0.5 rounded-full ${STATUS_BADGE[r.status]}`}>
                  {STATUS_LABEL[r.status]}
                </span>
                {r.slot_date && r.slot_hour != null && (
                  <span className="text-[14px] font-bold">
                    {dateLabel(r.slot_date)} {hourLabel(r.slot_hour)}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SlotsTab({
  todays,
  seats,
  today,
  now,
  test,
  focusHour,
}: {
  todays: Registration[];
  seats: Record<number, number>;
  today: string;
  now: Date;
  test: boolean;
  focusHour: number | null;
}) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
        {SLOT_HOURS.map((h) => (
          <a
            key={h}
            href={`#slot-${h}`}
            className="rounded-2xl py-2 text-center font-black"
            style={{ backgroundColor: SLOT_COLORS[h].bg, color: SLOT_COLORS[h].fg }}
          >
            <span className="block text-[16px] tabular-nums">{hourLabel(h)}</span>
            <span className="block text-[13px] opacity-90">
              {seats[h] ?? 0}/{SLOT_CAPACITY}
            </span>
          </a>
        ))}
      </div>

      {SLOT_HOURS.map((h) => {
        const list = todays.filter((r) => r.slot_hour === h);
        const checked = list.filter((r) => r.status === "checked_in").reduce((s, r) => s + r.party_size, 0);
        const releasable = canReleaseNoShow(today, h, now, test);
        return (
          <section
            key={h}
            id={`slot-${h}`}
            className={`rounded-3xl bg-white border-[3px] border-[#262120] overflow-hidden ${focusHour === h ? "ring-4 ring-[#E07F74]" : ""}`}
          >
            <header
              className="px-4 py-3 flex flex-wrap items-center justify-between gap-2"
              style={{ backgroundColor: SLOT_COLORS[h].bg, color: SLOT_COLORS[h].fg }}
            >
              <span className="text-[24px] font-black tabular-nums">{hourLabel(h)}</span>
              <span className="text-[14px] font-bold">
                배정 {seats[h] ?? 0}/{SLOT_CAPACITY}명 · 입장 {checked}명
              </span>
            </header>
            {list.length === 0 ? (
              <p className="px-4 py-4 text-[14px] text-[#262120]/40">배정 없음</p>
            ) : (
              <ul className="divide-y divide-[#262120]/5">
                {list.map((r) => (
                  <li key={r.id} className="px-4 py-3 flex flex-wrap items-center gap-2">
                    <span className="text-[20px] font-black tabular-nums w-20">{r.code}</span>
                    <span className="text-[14px] min-w-[150px]">
                      <b>{r.rep_name}</b> · ****{last4(r.phone)} · <b>{r.party_size}명</b>
                    </span>
                    <span className={`text-[12px] font-bold px-2 py-0.5 rounded-full ${STATUS_BADGE[r.status]}`}>
                      {STATUS_LABEL[r.status]}
                      {r.status === "checked_in" && r.checked_in_at ? ` ${formatKstTime(r.checked_in_at).split(" ")[1]}` : ""}
                    </span>
                    <div className="flex flex-wrap gap-2 ml-auto">
                      {r.status === "approved" && (
                        <StatusButton id={r.id} status="checked_in" label="입장" className="bg-[#3E6E5C] text-white" />
                      )}
                      {r.status === "checked_in" && (
                        <StatusButton id={r.id} status="approved" label="입장 취소" className="bg-white border-2 border-[#262120]/10" />
                      )}
                      {r.status === "approved" && (
                        <StatusButton
                          id={r.id}
                          status="no_show"
                          label="노쇼 해제"
                          disabled={!releasable}
                          className="bg-[#B2453A] text-white"
                        />
                      )}
                      {(r.status === "approved" || r.status === "no_show") && (
                        <form action={reassignAction} className="flex gap-1">
                          <input type="hidden" name="id" value={r.id} />
                          <select name="hour" required defaultValue="" className="h-11 rounded-xl bg-[#F5EEDF] px-2 text-[14px] font-bold">
                            <option value="" disabled>
                              재배정
                            </option>
                            <HourOptions today={today} seats={seats} now={now} test={test} party={r.party_size} exclude={r.status === "approved" ? h : null} />
                          </select>
                          <button className="h-11 px-3 rounded-xl bg-[#262120] text-white text-[14px] font-bold">이동</button>
                        </form>
                      )}
                      {(r.status === "approved" || r.status === "no_show") && (
                        <StatusButton id={r.id} status="cancelled" label="취소" className="bg-white border-2 border-[#262120]/10 text-[#262120]/60" />
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {!releasable && list.some((r) => r.status === "approved") && (
              <p className="px-4 pb-3 text-[12px] text-[#262120]/40">노쇼 해제는 {hourLabel(h)} 시작 10분 뒤부터 가능</p>
            )}
          </section>
        );
      })}
    </div>
  );
}

function StatusButton({
  id,
  status,
  label,
  className,
  disabled,
}: {
  id: string;
  status: RegStatus;
  label: string;
  className: string;
  disabled?: boolean;
}) {
  return (
    <form action={statusAction}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="status" value={status} />
      <input type="hidden" name="tab" value="slots" />
      <button disabled={disabled} className={`h-11 px-4 rounded-xl text-[14px] font-black disabled:opacity-30 ${className}`}>
        {label}
      </button>
    </form>
  );
}
