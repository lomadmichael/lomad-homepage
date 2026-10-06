/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { BASE_PATH, isTestMode, registrationGate } from "@/lib/customhouse-config";
import { findActiveByPhone } from "@/lib/customhouse-db";
import { sessionPhone } from "@/lib/customhouse-auth";
import { IMG, Shell, btnGhost } from "../_components/Shell";
import ApplyFlow from "./ApplyFlow";
import AlreadyJoined from "../_components/AlreadyJoined";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "접수하기 · 커스텀 티셔츠 만들기",
  robots: { index: false },
};

export default async function ApplyPage() {
  const gate = registrationGate(new Date(), isTestMode());
  const phone = await sessionPhone();
  let existing = false;
  if (phone) {
    try {
      existing = !!(await findActiveByPhone(phone));
    } catch (e) {
      console.error("[customhouse] apply lookup failed:", e);
    }
  }

  if (existing) {
    return (
      <Shell>
        <AlreadyJoined />
      </Shell>
    );
  }

  if (!gate.open) {
    return (
      <Shell>
        <div className="text-center pt-10 space-y-4">
          <img src={`${IMG}/yeondong-front.webp`} alt="" width={233} height={240} className="w-[120px] h-auto mx-auto" />
          <h1 className="sx-hand text-[28px] leading-tight break-keep">{gate.message}</h1>
          <p className="text-[15px] font-semibold text-[#262120]/65">접수는 행사일 10:00 ~ 17:10에 열려요.</p>
          <Link href={BASE_PATH} className={btnGhost}>
            안내로 돌아가기
          </Link>
        </div>
      </Shell>
    );
  }

  return (
    <Shell back={{ href: BASE_PATH, label: "안내" }}>
      <ApplyFlow verified={!!phone} />
    </Shell>
  );
}
