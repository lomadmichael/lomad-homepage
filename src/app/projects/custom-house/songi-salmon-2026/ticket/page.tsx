/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import {
  BASE_PATH,
  GRACE_MINUTES,
  PLACE,
  SLOT_COLORS,
  dateLabel,
  hourLabel,
} from "@/lib/customhouse-config";
import { findActiveByPhone, getRegistration, type Registration } from "@/lib/customhouse-db";
import { verifyTicket } from "@/lib/customhouse-otp";
import { sessionPhone } from "@/lib/customhouse-auth";
import { Card, IMG, ReceiptZig, Shell, btnGhost, btnPrimary } from "../_components/Shell";
import AutoRefresh from "../_components/AutoRefresh";
import { logoutAction } from "../actions";
import LookupGate from "./LookupGate";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "내 회차권 · 커스텀 티셔츠 만들기",
  robots: { index: false },
};

type SP = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function TicketPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const t = typeof sp.t === "string" ? sp.t : undefined;
  const tokenId = verifyTicket(t);
  const phone = tokenId ? null : await sessionPhone();

  let reg: Registration | null = null;
  let failed = false;
  try {
    if (tokenId) reg = await getRegistration(tokenId);
    else if (phone) reg = await findActiveByPhone(phone);
  } catch (e) {
    console.error("[customhouse] ticket lookup failed:", e);
    failed = true;
  }

  if (!tokenId && !phone) {
    return (
      <Shell back={{ href: BASE_PATH, label: "안내" }}>
        <h1 className="sx-hand text-[30px] leading-tight mb-2">내 회차권 보기</h1>
        <p className="text-[15px] font-medium text-[#262120]/70 mb-5">접수할 때 쓴 대표 휴대폰 번호로 인증해 주세요.</p>
        {t && <p className="text-[15px] font-bold text-[#B2453A] mb-3">링크가 만료됐거나 올바르지 않아요.</p>}
        <Card>
          <LookupGate />
        </Card>
      </Shell>
    );
  }

  if (failed) {
    return (
      <Shell>
        <AutoRefresh intervalMs={8000} />
        <p className="sx-hand text-center pt-16 text-[22px] break-keep">연결이 불안정해요. 잠시 후 자동으로 다시 불러와요.</p>
      </Shell>
    );
  }

  if (!reg) {
    return (
      <Shell back={{ href: BASE_PATH, label: "안내" }}>
        <div className="text-center pt-10 space-y-4">
          <img src={`${IMG}/fish-hat.webp`} alt="" width={260} height={172} className="w-[120px] h-auto mx-auto" />
          <h1 className="sx-hand text-[28px]">접수 내역이 없어요</h1>
          <Link href={`${BASE_PATH}/apply`} className={btnPrimary}>
            접수하기
          </Link>
          {phone && (
            <form action={logoutAction}>
              <button className={btnGhost}>다른 번호로 보기</button>
            </form>
          )}
        </div>
      </Shell>
    );
  }

  return (
    <Shell back={{ href: BASE_PATH, label: "안내" }}>
      {reg.status !== "cancelled" && <AutoRefresh intervalMs={5000} />}
      <TicketView reg={reg} />
    </Shell>
  );
}

function TicketView({ reg }: { reg: Registration }) {
  if (reg.status === "pending") {
    return (
      <div className="space-y-7">
        <section className="sx-rcpt pt-6 pb-7 mr-1.5 text-center">
          <p className="sx-rhead text-[12px]">RECEIPT · 양양송이연어축제</p>
          <p className="sx-hand text-[20px] text-[#8C4A42] mt-4">접수번호</p>
          <p className="text-[76px] leading-none font-black tracking-[-0.03em] my-2 tabular-nums">{reg.code}</p>
          <div className="sx-dash mx-5 mt-4" />
          <dl className="grid grid-cols-3 px-4 pt-4 text-center">
            <div>
              <dt className="text-[13px] font-bold text-[#262120]/55">대표</dt>
              <dd className="text-[17px] font-extrabold mt-0.5 break-all">{reg.rep_name}</dd>
            </div>
            <div>
              <dt className="text-[13px] font-bold text-[#262120]/55">인원</dt>
              <dd className="text-[17px] font-extrabold mt-0.5">{reg.party_size}명</dd>
            </div>
            <div>
              <dt className="text-[13px] font-bold text-[#262120]/55">영수증</dt>
              <dd className="text-[17px] font-extrabold mt-0.5 tabular-nums">{reg.receipt_total.toLocaleString("ko-KR")}원</dd>
            </div>
          </dl>
          <ReceiptZig />
        </section>

        <div className="relative rounded-[22px] border-[4px] border-[#262120] bg-[#E07F74] text-white px-5 pt-6 pb-5 text-center shadow-[5px_6px_0_#262120]">
          <img
            src={`${IMG}/salmon-surf.webp`}
            alt=""
            width={360}
            height={319}
            className="sx-sticker -top-10 -right-3 w-[78px] rotate-[8deg]"
          />
          <p className="sx-hand text-[28px] leading-[1.2] [text-shadow:2px_3px_0_#262120] break-keep">
            데스크에 영수증을
            <br />
            보여주세요
          </p>
          <p className="text-[15px] font-semibold mt-3 break-keep">
            확인이 끝나면 이 화면이 회차권으로 바뀌고, 문자로도 보내 드려요.
          </p>
        </div>
        <p className="flex items-center justify-center gap-2 text-[14px] font-semibold text-[#262120]/60">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E07F74] border-2 border-[#262120] animate-pulse" /> 승인 대기 중 · 자동으로 새로고침돼요
        </p>
      </div>
    );
  }

  if (reg.status === "cancelled") {
    return (
      <Card className="text-center py-9">
        <img src={`${IMG}/songsong-face.webp`} alt="" width={115} height={144} className="w-[64px] h-auto mx-auto mb-3 grayscale-[.4]" />
        <p className="sx-hand text-[26px] mb-2">취소된 접수예요</p>
        <p className="text-[15px] font-medium text-[#262120]/65">접수번호 {reg.code} · 문의는 부스 데스크로 와 주세요.</p>
      </Card>
    );
  }

  if (reg.status === "no_show" || reg.slot_hour == null || !reg.slot_date) {
    return (
      <Card className="text-center py-9">
        <img src={`${IMG}/yeondong-front.webp`} alt="" width={233} height={240} className="w-[90px] h-auto mx-auto mb-3" />
        <p className="sx-hand text-[26px] mb-2 break-keep">회차 자리가 해제됐어요</p>
        <p className="text-[15px] font-medium text-[#262120]/70 break-keep">
          회차 시작 {GRACE_MINUTES}분이 지나 자리가 다른 분께 넘어갔어요. 데스크에 접수번호 <b>{reg.code}</b>를 말씀해 주시면
          남은 회차로 다시 안내해 드릴게요.
        </p>
      </Card>
    );
  }

  const color = SLOT_COLORS[reg.slot_hour] ?? { bg: "#262120", fg: "#F5EEDF", name: "" };
  const done = reg.status === "checked_in";

  return (
    <div className="space-y-7">
      <section className="sx-ticket" aria-label="회차권">
        {/* 회차 색 띠 */}
        <div
          className="rounded-t-[22px] border-b-[4px] border-[#262120] px-5 pt-3.5 pb-3 flex items-center justify-between gap-2"
          style={{ backgroundColor: color.bg, color: color.fg }}
        >
          <span className="sx-hand text-[20px] leading-none pt-0.5">{dateLabel(reg.slot_date)}</span>
        </div>

        <div className="relative px-6 pt-4 pb-5">
          <img
            src={`${IMG}/songsong-dance.webp`}
            alt=""
            width={253}
            height={258}
            className="sx-sticker right-3 bottom-3 w-[58px] rotate-[8deg]"
          />
          <p className="text-[12px] font-bold tracking-[4px] text-[#8a7f72]">TICKET · 커스텀 티셔츠</p>
          <p className="sx-hand text-[86px] leading-[0.95] tabular-nums mt-3 tracking-[-0.02em]">{hourLabel(reg.slot_hour)}</p>
          <p className="sx-hand text-[18px] text-[#262120]/55 mt-1">~ {hourLabel(reg.slot_hour + 1)} 입장</p>

          {done && (
            <div
              className="sx-stamp absolute right-4 top-[46px] w-[128px] h-[128px] rotate-[-12deg] z-[2]"
              role="img"
              aria-label="입장 완료"
            >
              <span className="text-[17px]">CHECKED</span>
              <b className="text-[30px] mt-1.5">입장 완료</b>
            </div>
          )}
        </div>

        <div className="sx-perf" aria-hidden />

        <div className="grid grid-cols-2 px-6 pt-4 pb-5">
          <div>
            <p className="text-[13px] font-bold text-[#262120]/55">인원</p>
            <p className="sx-hand text-[40px] leading-none mt-1">{reg.party_size}명</p>
          </div>
          <div className="text-right">
            <p className="text-[13px] font-bold text-[#262120]/55">접수번호</p>
            <p className="text-[38px] font-black leading-none mt-1 tabular-nums">{reg.code}</p>
          </div>
          <p className="col-span-2 mt-4 text-[15px] font-bold text-[#262120]/75">{reg.rep_name}님</p>
        </div>
      </section>

      {done ? (
        <Card className="text-center">
          <p className="sx-hand text-[22px]">즐거운 티셔츠 만들기 되세요!</p>
        </Card>
      ) : (
        <Card className="text-[15px] leading-relaxed space-y-2">
          <p>
            <b className="text-[#8C4A42]">장소</b> · {PLACE}
          </p>
          <p>
            <b className="text-[#8C4A42]">입장</b> · 회차 시작 시간에 이 화면을 보여주세요. 시작 10분 전에 알림 문자를 보내 드려요.
          </p>
          <p className="text-[#B2453A] font-bold break-keep">
            회차 시작 {GRACE_MINUTES}분이 지나도 오지 않으시면 자리가 다른 분께 넘어갈 수 있어요.
          </p>
        </Card>
      )}
    </div>
  );
}
