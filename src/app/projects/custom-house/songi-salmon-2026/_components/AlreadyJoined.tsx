/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { BASE_PATH } from "@/lib/customhouse-config";
import { IMG, btnPrimary } from "./Shell";

export default function AlreadyJoined() {
  return (
    <div className="text-center pt-6 space-y-5">
      <img src={`${IMG}/songsong-dance.webp`} alt="" width={253} height={258} className="w-[130px] h-auto mx-auto" />
      <h1 className="sx-hand text-[30px] leading-tight">이미 참여하셨어요</h1>
      <p className="text-[16px] font-semibold text-[#262120]/75 break-keep">
        대표 휴대폰 번호 기준으로 축제 기간 중 한 번만 참여할 수 있어요.
      </p>
      <Link href={`${BASE_PATH}/ticket`} className={btnPrimary}>
        내 회차권 보기
      </Link>
    </div>
  );
}
