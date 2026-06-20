/**
 * 현남생활 페스티벌 체험·캠핑 정원 단일 진실 소스.
 *
 * 정원/연령 변경은 이 파일만 고치고 재배포하면 폼·검증·현황·관리자 화면에 일괄 반영된다.
 * - `capacity` 또는 `slots[].capacity` = 체험별 정원
 * - `minAge` = 검증용 최소 만 나이(미정이면 비워둠 → 검증 통과)
 * - `ageLimit` = 사용자에게 보이는 연령 안내 문구(미정이면 비워둠)
 * - `desc` = 신청 시 보여줄 설명(초안 — 형님 검수 대상)
 */

export type FestivalLocation = "죽도" | "북분리";

export interface ExperienceSlot {
  /** 타임 식별자 (예: "16:00"). DB의 time_slot 값과 동일. */
  slot: string;
  label: string;
  capacity: number;
}

export interface Experience {
  key: string;
  label: string;
  location: FestivalLocation;
  /** 단일 정원 (slots 가 없을 때) */
  capacity?: number;
  /** 온라인 사전접수 정원 명시값(비슬롯 체험). 없으면 capacity의 70%(반올림). */
  onlineCap?: number;
  /** 타임별 정원 (볼더링) */
  slots?: ExperienceSlot[];
  /** 유료 안내 문구 (무료면 비움) */
  fee?: string;
  /** 검증용 최소 만 나이 (미정이면 undefined) */
  minAge?: number;
  /** 사용자 표시용 연령 안내 (미정이면 undefined) */
  ageLimit?: string;
  /** 진행 시간 표시 (예: "13:00", "7/5(일) 10:00"). slots 가 있으면 슬롯 라벨이 시간을 대신함 */
  time?: string;
  /**
   * 배타 그룹. 같은 그룹의 체험은 한 참가자당 1개만 신청 가능(택1).
   * 예: 수상·클라이밍 계열(서핑·SUP·랜드서핑·볼더링) = "activity".
   */
  exclusiveGroup?: string;
  /** 설명 (초안) */
  desc: string;
}

/** 1인 1종목만 신청 가능한 배타 그룹 안내 문구. */
export const EXCLUSIVE_GROUP_LABELS: Record<string, string> = {
  activity: "서핑 · SUP · 랜드서핑 · 볼더링은 한 분당 1종목만 신청할 수 있습니다.",
};

export const EXPERIENCES: Experience[] = [
  {
    key: "surf",
    label: "서핑",
    location: "죽도",
    capacity: 80,
    minAge: 10,
    ageLimit: "만 10세 이상",
    exclusiveGroup: "activity",
    desc: "강사와 함께 죽도해변에서 파도를 타보는 입문 서핑. 보드·슈트 제공.",
  },
  {
    key: "sup",
    label: "SUP",
    location: "죽도",
    capacity: 10,
    minAge: 10,
    ageLimit: "만 10세 이상",
    exclusiveGroup: "activity",
    desc: "스탠드업 패들보드 위에 서서 노를 저으며 잔잔한 물 위를 즐기는 체험.",
  },
  {
    key: "landsurf",
    label: "랜드서핑",
    location: "죽도",
    capacity: 15,
    onlineCap: 10,
    minAge: 10,
    ageLimit: "만 10세 이상",
    exclusiveGroup: "activity",
    desc: "랜드서핑 보드로 땅 위에서 서핑 감각을 익히는 3시간 클래스.",
  },
  {
    key: "boulder",
    label: "볼더링",
    location: "죽도",
    minAge: 13,
    ageLimit: "만 13세 이상",
    exclusiveGroup: "activity",
    slots: [
      { slot: "16:00", label: "7/4(토) 오후 4시", capacity: 8 },
      { slot: "17:00", label: "7/4(토) 오후 5시", capacity: 8 },
    ],
    desc: "낮은 인공 암벽을 밧줄 없이 오르는 클라이밍 체험. 타임당 8명.",
  },
  {
    key: "cooking",
    label: "로컬 쿠킹클래스 — 블루베리 모찌",
    location: "북분리",
    capacity: 50,
    time: "13:00",
    desc: "현남 블루베리로 만드는 모찌(찹쌀떡) 만들기 클래스.",
  },
  {
    key: "running",
    label: "비치 러닝",
    location: "죽도",
    capacity: 30,
    time: "18:00",
    desc: "죽도 해변을 함께 달리는 선셋 비치 러닝.",
  },
  {
    key: "yoga",
    label: "요가와 자연 만다라",
    location: "북분리",
    capacity: 20,
    onlineCap: 15,
    time: "7/5(일) 10:00",
    desc: "일요일 아침 북분리 해변에서 요가로 몸을 깨우고, 자연물로 만다라를 만드는 힐링 프로그램.",
  },
  {
    key: "sunset",
    label: "선셋 비치 테이블",
    location: "북분리",
    capacity: 80,
    time: "18:00",
    fee: "2만원 (현장 결제)",
    desc: "노을 아래 긴 테이블에 둘러앉아 음식을 나누는 교류 만찬.",
  },
];

export interface CampingOption {
  key: "deck" | "noji";
  label: string;
  capacity: number;
  fee: string;
}

export const CAMPING: CampingOption[] = [
  { key: "deck", label: "데크", capacity: 60, fee: "1만원" },
  { key: "noji", label: "노지", capacity: 10, fee: "무료" },
];

/**
 * 온라인 사전접수 비율. 전체 정원의 70%만 온라인으로 받고, 나머지 30%는 현장 접수 몫으로 남긴다.
 * 정원 판정(확정/대기)·폼/현황 표시는 모두 "온라인 정원" 기준.
 */
export const ONLINE_RATIO = 0.7;

/** 전체 정원 → 온라인 사전접수 정원(70%, 반올림). */
export function onlineCapacity(total: number): number {
  return Math.round(total * ONLINE_RATIO);
}

/** 전체 정원 → 현장 접수 정원(나머지 30%). */
export function onsiteCapacity(total: number): number {
  return total - onlineCapacity(total);
}

/** 비슬롯 체험의 온라인 정원: onlineCap 명시값 우선, 없으면 70%(반올림). */
export function nonSlotOnlineCap(exp: Experience): number {
  return exp.onlineCap ?? onlineCapacity(exp.capacity ?? 0);
}

/**
 * RPC capacities 맵: 체험(key 또는 key|slot) + 캠핑(camping_deck/noji).
 * 체험은 온라인 정원(70%), 캠핑은 온라인 100%(전체 정원).
 */
export function buildCapacities(): Record<string, number> {
  const caps: Record<string, number> = {};
  for (const exp of EXPERIENCES) {
    if (exp.slots) {
      for (const s of exp.slots) caps[`${exp.key}|${s.slot}`] = onlineCapacity(s.capacity);
    } else if (typeof exp.capacity === "number") {
      caps[exp.key] = nonSlotOnlineCap(exp);
    }
  }
  // 캠핑은 70/30 분배 없이 전체 정원을 온라인으로 받는다.
  for (const c of CAMPING) caps[`camping_${c.key}`] = c.capacity;
  return caps;
}

export function getExperience(key: string): Experience | undefined {
  return EXPERIENCES.find((e) => e.key === key);
}

/** 체험(+타임) 사람이 읽는 라벨. */
export function experienceLabel(key: string, slot?: string | null): string {
  const exp = getExperience(key);
  if (!exp) return key;
  if (slot && exp.slots) {
    const s = exp.slots.find((x) => x.slot === slot);
    return s ? `${exp.label} (${s.label})` : `${exp.label} (${slot})`;
  }
  return exp.label;
}

export const CAMPING_KEYS = CAMPING.map((c) => c.key);
