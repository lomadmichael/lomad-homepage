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

/** 영문 안내 페이지용 거점명 매핑. */
export const LOCATION_EN: Record<FestivalLocation, string> = {
  죽도: "Jukdo Beach",
  북분리: "Bukbun-ri Beach",
};

export interface ExperienceSlot {
  /** 타임 식별자 (예: "16:00"). DB의 time_slot 값과 동일. */
  slot: string;
  label: string;
  capacity: number;
}

export interface Experience {
  key: string;
  label: string;
  /** 영문 안내 페이지용 라벨 (없으면 label 폴백) */
  labelEn?: string;
  location: FestivalLocation;
  /** 단일 정원 (slots 가 없을 때) */
  capacity?: number;
  /** 온라인 사전접수 정원 명시값(비슬롯 체험). 없으면 capacity의 70%(반올림). */
  onlineCap?: number;
  /** 타임별 정원 (볼더링) */
  slots?: ExperienceSlot[];
  /** 유료 안내 문구 (무료면 비움) */
  fee?: string;
  /** 영문 유료 안내 문구 (없으면 fee 폴백) */
  feeEn?: string;
  /** 검증용 최소 만 나이 (미정이면 undefined) */
  minAge?: number;
  /** 사용자 표시용 연령 안내 (미정이면 undefined) */
  ageLimit?: string;
  /** 영문 연령 안내 (없으면 ageLimit 폴백) */
  ageLimitEn?: string;
  /** 진행 시간 표시 (예: "13:00", "7/5(일) 10:00"). slots 가 있으면 슬롯 라벨이 시간을 대신함 */
  time?: string;
  /** 영문 진행 시간 표시 (없으면 time 폴백 — 한글 포함된 경우만 명시) */
  timeEn?: string;
  /**
   * 배타 그룹. 같은 그룹의 체험은 한 참가자당 1개만 신청 가능(택1).
   * 예: 수상·클라이밍 계열(서핑·SUP·랜드서핑·볼더링) = "activity".
   */
  exclusiveGroup?: string;
  /** 설명 (초안) */
  desc: string;
  /** 영문 설명 (없으면 desc 폴백) */
  descEn?: string;
}

/** 1인 1종목만 신청 가능한 배타 그룹 안내 문구. */
export const EXCLUSIVE_GROUP_LABELS: Record<string, string> = {
  activity: "서핑 · SUP · 랜드서핑 · 볼더링은 한 분당 1종목만 신청할 수 있습니다.",
};

/** 배타 그룹 영문 안내 문구. */
export const EXCLUSIVE_GROUP_LABELS_EN: Record<string, string> = {
  activity: "Surfing · SUP · Land Surfing · Bouldering — choose one per person.",
};

export const EXPERIENCES: Experience[] = [
  {
    key: "surf",
    label: "서핑",
    labelEn: "Surfing",
    location: "죽도",
    capacity: 80,
    minAge: 10,
    ageLimit: "만 10세 이상",
    ageLimitEn: "Age 10+",
    time: "13:00 · 15:00",
    exclusiveGroup: "activity",
    desc: "강사와 함께 죽도해변에서 파도를 타보는 입문 서핑. 보드·슈트 제공.",
    descEn: "Beginner surf lesson at Jukdo Beach with an instructor. Board and wetsuit provided.",
  },
  {
    key: "sup",
    label: "SUP",
    labelEn: "SUP",
    location: "죽도",
    capacity: 10,
    minAge: 10,
    ageLimit: "만 10세 이상",
    ageLimitEn: "Age 10+",
    time: "13:00 · 15:00",
    exclusiveGroup: "activity",
    desc: "스탠드업 패들보드 위에 서서 노를 저으며 잔잔한 물 위를 즐기는 체험.",
    descEn: "Stand-up paddleboarding — glide across calm water standing on the board.",
  },
  {
    key: "landsurf",
    label: "랜드서핑",
    labelEn: "Land Surfing",
    location: "죽도",
    capacity: 15,
    onlineCap: 14,
    minAge: 10,
    ageLimit: "만 10세 이상",
    ageLimitEn: "Age 10+",
    time: "15:00",
    exclusiveGroup: "activity",
    desc: "랜드서핑 보드로 땅 위에서 서핑 감각을 익히는 3시간 클래스.",
    descEn: "A 3-hour class learning the feel of surfing on land with a land-surf board.",
  },
  {
    key: "boulder",
    label: "볼더링",
    labelEn: "Bouldering",
    location: "죽도",
    minAge: 13,
    ageLimit: "만 13세 이상",
    ageLimitEn: "Age 13+",
    exclusiveGroup: "activity",
    slots: [
      { slot: "16:00", label: "7/4(토) 오후 4시", capacity: 8 },
      { slot: "17:00", label: "7/4(토) 오후 5시", capacity: 8 },
    ],
    desc: "낮은 인공 암벽을 밧줄 없이 오르는 클라이밍 체험. 타임당 8명.",
    descEn: "Rope-free climbing on a low artificial wall. 8 people per time slot.",
  },
  {
    key: "cooking",
    label: "로컬 쿠킹클래스 — 블루베리 모찌",
    labelEn: "Local Cooking Class — Blueberry Mochi",
    location: "북분리",
    capacity: 50,
    time: "13:00",
    desc: "현남 블루베리로 만드는 모찌(찹쌀떡) 만들기 클래스.",
    descEn: "Make mochi (sweet rice cakes) with locally grown Hyeonnam blueberries.",
  },
  {
    key: "running",
    label: "비치 러닝",
    labelEn: "Beach Running",
    location: "죽도",
    capacity: 30,
    time: "18:00",
    desc: "죽도 해변을 함께 달리는 선셋 비치 러닝.",
    descEn: "A sunset group run along Jukdo Beach.",
  },
  {
    key: "yoga",
    label: "요가와 자연 만다라",
    labelEn: "Yoga & Nature Mandala",
    location: "북분리",
    capacity: 20,
    onlineCap: 18,
    time: "7/5(일) 10:00",
    timeEn: "Sun, Jul 5 · 10:00",
    desc: "일요일 아침 북분리 캠핑장 솔숲에서 요가로 몸을 깨우고, 자연물로 만다라를 만드는 힐링 프로그램.",
    descEn: "Sunday morning yoga in the Bukbun-ri campground pine forest, followed by making a mandala from natural materials.",
  },
  {
    key: "sunset",
    label: "선셋 비치 테이블",
    labelEn: "Sunset Beach Table",
    location: "북분리",
    capacity: 80,
    // 온라인 신청 60명 + 마을 주민 초대 20명(현장 배정) = 80석
    onlineCap: 60,
    time: "18:00",
    fee: "2만원 (현장 결제)",
    feeEn: "₩20,000 (on-site)",
    desc: "노을 아래 긴 테이블에 둘러앉아 음식을 나누는 교류 만찬.",
    descEn: "A communal dinner around one long table under the sunset — where surfers and the village share a meal.",
  },
  {
    key: "hyrox",
    label: "해변 하이록스",
    labelEn: "Beach Hyrox",
    location: "죽도",
    capacity: 30,
    time: "16:00~18:00",
    desc: "하이록스는 달리기와 기능성 운동(스쿼트·런지·버피 등)을 번갈아 하는 피트니스 프로그램이에요. 순위를 겨루는 대신, 모래밭에서 다 같이 땀 흘리는 그룹 운동으로 진행해요. 운동이 처음이어도 자기 페이스로 참여하면 됩니다.",
    descEn: "Hyrox is a fitness program that alternates running with functional exercises like squats, lunges, and burpees. Instead of competing for rank, we do it together as a group workout on the sand — beginners can join at their own pace.",
  },
  {
    key: "barre",
    label: "해변 선셋 바레",
    labelEn: "Sunset Beach Barre",
    location: "죽도",
    capacity: 20,
    time: "18:00",
    desc: "바레는 발레의 기본 동작에 필라테스·요가를 더한 전신 운동이에요. 작고 정교한 동작을 반복하며 코어와 자세·균형을 잡아줘요. 노을 지는 해변에서 누구나 따라 할 수 있는 힐링 클래스로 진행해요.",
    descEn: "Barre blends ballet-inspired moves with pilates and yoga. Small, controlled movements wake up your core, posture, and balance — a relaxing class anyone can follow, on the beach at sunset.",
  },
  {
    key: "cooking_pm",
    label: "로컬 쿠킹클래스 — 블루베리 모찌 (2회차)",
    labelEn: "Local Cooking Class — Blueberry Mochi (2nd)",
    location: "북분리",
    capacity: 50,
    onlineCap: 50,
    time: "14:00",
    desc: "현남 블루베리로 만드는 모찌(찹쌀떡) 만들기 클래스. 뜨거운 인기로 추가 개설된 14:00 회차.",
    descEn: "Make mochi with locally grown Hyeonnam blueberries. An added 14:00 session due to high demand.",
  },
  {
    key: "yoga_sadam",
    label: "요가와 자연 만다라 — 사담요가",
    labelEn: "Yoga & Nature Mandala — Sadam Yoga",
    location: "북분리",
    capacity: 40,
    onlineCap: 40,
    time: "7/5(일) 10:00",
    timeEn: "Sun, Jul 5 · 10:00",
    desc: "일요일 아침 북분리 캠핑장 솔숲에서 진행하는 요가와 자연 만다라. 사담요가 진행 · 추가 개설 클래스.",
    descEn: "Sunday morning yoga & nature mandala in the Bukbun-ri pine forest, led by Sadam Yoga. An added class.",
  },
];

/**
 * 시간 충돌 판정용 — 같은 시간대 체험 중복 신청 방지.
 * day: 1 = 7/4(토), 2 = 7/5(일) · 분 단위 [start, end) (끝점은 겹침 아님).
 * 시간 미지정 체험(surf·sup·landsurf)은 등록 안 함 → exclusiveGroup(1인1종목)으로만 관리.
 */
const TIME_RANGES: Record<string, { day: number; start: number; end: number }> = {
  cooking: { day: 1, start: 13 * 60, end: 14 * 60 + 30 },
  cooking_pm: { day: 1, start: 14 * 60, end: 15 * 60 + 30 },
  "boulder|16:00": { day: 1, start: 16 * 60, end: 17 * 60 },
  "boulder|17:00": { day: 1, start: 17 * 60, end: 18 * 60 },
  hyrox: { day: 1, start: 16 * 60, end: 18 * 60 },
  running: { day: 1, start: 18 * 60, end: 19 * 60 },
  sunset: { day: 1, start: 18 * 60, end: 20 * 60 },
  barre: { day: 1, start: 18 * 60, end: 19 * 60 },
  yoga: { day: 2, start: 10 * 60, end: 11 * 60 + 30 },
  yoga_sadam: { day: 2, start: 10 * 60, end: 11 * 60 + 30 },
};

function timeRangeKey(key: string, slot?: string | null): string {
  return slot ? `${key}|${slot}` : key;
}

/** 두 체험(+타임)이 같은 시간대로 겹치는지. */
export function experiencesTimeConflict(
  aKey: string,
  aSlot: string | null,
  bKey: string,
  bSlot: string | null,
): boolean {
  const a = TIME_RANGES[timeRangeKey(aKey, aSlot)];
  const b = TIME_RANGES[timeRangeKey(bKey, bSlot)];
  if (!a || !b || a.day !== b.day) return false;
  return a.start < b.end && b.start < a.end;
}

export interface CampingOption {
  key: "deck" | "noji";
  label: string;
  capacity: number;
  fee: string;
}

export const CAMPING: CampingOption[] = [
  // 양양군 농업기술센터 후원으로 데크 무료 제공 (2026-06)
  { key: "deck", label: "데크", capacity: 70, fee: "무료" },
  { key: "noji", label: "노지", capacity: 10, fee: "무료" },
];

/** 영문 안내 페이지용 캠핑 라벨/요금 매핑. */
export const CAMPING_EN: Record<CampingOption["key"], { label: string; fee: string }> = {
  deck: { label: "Deck", fee: "Free" },
  noji: { label: "Field", fee: "Free" },
};

/**
 * 온라인 사전접수 비율. 전체 정원의 70%만 온라인으로 받고, 나머지 30%는 현장 접수 몫으로 남긴다.
 * 정원 판정(확정/대기)·폼/현황 표시는 모두 "온라인 정원" 기준.
 */
export const ONLINE_RATIO = 0.9;

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

/** 선택 가능한 (체험·타임) 평면 옵션 — value = key 또는 key|slot. */
export interface ExperienceOption {
  value: string;
  key: string;
  slot: string | null;
  label: string;
  minAge?: number;
  ageLimit?: string;
  fee?: string;
  exclusiveGroup?: string;
}

export const EXPERIENCE_OPTIONS: ExperienceOption[] = EXPERIENCES.flatMap((exp): ExperienceOption[] =>
  exp.slots
    ? exp.slots.map((s) => ({
        value: `${exp.key}|${s.slot}`,
        key: exp.key,
        slot: s.slot,
        label: `${exp.label} · ${s.label}`,
        minAge: exp.minAge,
        ageLimit: exp.ageLimit,
        fee: exp.fee,
        exclusiveGroup: exp.exclusiveGroup,
      }))
    : [
        {
          value: exp.key,
          key: exp.key,
          slot: null,
          label: exp.label,
          minAge: exp.minAge,
          ageLimit: exp.ageLimit,
          fee: exp.fee,
          exclusiveGroup: exp.exclusiveGroup,
        },
      ],
);

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
