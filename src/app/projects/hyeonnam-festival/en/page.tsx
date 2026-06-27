import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import FadeIn from "@/components/ui/FadeIn";
import CountdownTimer from "@/components/projects/festival/CountdownTimer";
import Marquee from "@/components/projects/festival/Marquee";
import {
  EXPERIENCES,
  onlineCapacity,
  nonSlotOnlineCap,
  LOCATION_EN,
} from "@/lib/festival-experiences";

const EMAIL = "lomad.coop@gmail.com";
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "Hyeonnam Life Festival — Inquiry",
)}`;

const MARQUEE_ITEMS = [
  "Jul 4 (SAT) ~ 5 (SUN), 2026",
  "Yangyang · Jukdo · Bukbun-ri",
  "Hyeonnam Life Festival",
  "Surftown × Village",
  "2 Days · Yangyang Surf Road",
  "Free Entry",
];

const DAY1 = [
  ["10:00", "Opening · Surf Pass handout · Booths & Flea Market"],
  ["11:00", "Activity sessions — Surfing·SUP·Land Surfing·Climbing (first 110)"],
  ["13:00", "Local Cooking Class — Blueberry Mochi (Bukbun-ri · 50)"],
  ["16:00", "Camping check-in · Settlement consulting"],
  ["18:00", "◎ Sunset Beach Table (Bukbun-ri) · Beach Running (Jukdo)"],
  ["19:00", "★ Surfer's Night — Live band (Jukdo)"],
  ["21:00", "★★ Fireworks Finale (Jukdo)"],
];

const DAY2 = [
  ["10:00", "Yoga & Nature Mandala (Bukbun-ri)"],
  ["11:00", "Stamp event · Receipt-event prize pickup"],
  ["12:00", "Closing"],
];

export const metadata: Metadata = {
  title: "Hyeonnam Life Festival (English) | LOMAD",
  description:
    "One night, two days on Yangyang Surf Road. July 4–5, 2026, at Jukdo & Bukbun-ri Beach, Yangyang, Korea. Free entry — an English guide for visitors.",
  alternates: {
    canonical: "/projects/hyeonnam-festival/en",
    languages: {
      "ko-KR": "/projects/hyeonnam-festival",
      en: "/projects/hyeonnam-festival/en",
    },
  },
  openGraph: {
    title: "Hyeonnam Life Festival · July 4–5, 2026",
    description: "One night, two days on Yangyang Surf Road",
    images: ["/images/festival-hero-bg.png"],
  },
};

export default function HyeonnamFestivalEnPage() {
  return (
    <main className="bg-black text-white">
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/festival-hero-bg.png"
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,31,58,0.55) 0%, rgba(11,31,58,0.35) 35%, rgba(11,31,58,0.65) 75%, rgba(11,31,58,0.85) 100%)",
          }}
        />
        <div
          className="absolute inset-0 z-0 mix-blend-overlay opacity-50"
          style={{
            background:
              "radial-gradient(ellipse at 80% 100%, #FF6B6B 0%, transparent 55%), radial-gradient(ellipse at 0% 0%, #006B7A 0%, transparent 50%)",
          }}
        />

        {/* 상단 마퀴 */}
        <div className="relative z-10">
          <Marquee items={MARQUEE_ITEMS} dark={true} />
        </div>

        {/* 네비 */}
        <header className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5">
          <Link
            href="/"
            className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[3px] uppercase text-white/70 hover:text-white"
          >
            ← LOMAD
          </Link>
          <nav className="hidden md:flex items-center gap-7 font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[2px] uppercase text-white/70">
            <a href="#about" className="hover:text-white">About</a>
            <a href="#zones" className="hover:text-white">Zones</a>
            <a href="#schedule" className="hover:text-white">Schedule</a>
            <a href="#programs" className="hover:text-white">Programs</a>
            <a href="#visit" className="hover:text-white">Visit</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/projects/hyeonnam-festival"
              className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[2px] uppercase text-white/70 hover:text-white"
            >
              한국어
            </Link>
            <a
              href={MAILTO}
              className="font-[family-name:var(--font-karla)] text-[11px] md:text-[12px] font-extrabold tracking-[2px] uppercase border border-white px-4 md:px-5 py-2.5 hover:bg-white hover:text-black transition-colors"
            >
              Email Us
            </a>
          </div>
        </header>

        {/* Hero 콘텐츠 */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
          <p className="font-[family-name:var(--font-karla)] text-[10px] md:text-[12px] tracking-[4px] font-bold uppercase text-[#FF6B6B] mb-6">
            2026 · Yangyang Surf Road Festival
          </p>
          <h1 className="font-[family-name:var(--font-karla)] text-[34px] md:text-[68px] font-black leading-[1.05] mb-5 tracking-tight uppercase">
            Hyeonnam Life Festival
          </h1>
          <p className="font-[family-name:var(--font-karla)] text-[14px] md:text-[19px] text-white/80 mb-12 max-w-[640px] leading-relaxed tracking-wide">
            One night, two days on Yangyang Surf Road
          </p>

          {/* D-DAY 카운트다운 */}
          <div className="mb-12">
            <p className="font-[family-name:var(--font-karla)] text-[10px] tracking-[3px] font-bold uppercase text-white/50 mb-5">
              Festival Starts In
            </p>
            <CountdownTimer />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="#programs"
              className="font-[family-name:var(--font-karla)] text-[11px] md:text-[12px] font-extrabold tracking-[3px] uppercase bg-white text-black px-7 py-4 hover:bg-[#FF6B6B] hover:text-white transition-colors"
            >
              See Programs →
            </a>
            <a
              href="#visit"
              className="font-[family-name:var(--font-karla)] text-[11px] md:text-[12px] font-extrabold tracking-[3px] uppercase border border-white/40 text-white px-7 py-4 hover:bg-white/10 transition-colors"
            >
              How to Join
            </a>
          </div>
          <p className="mt-5 font-[family-name:var(--font-karla)] text-[11px] md:text-[12px] text-white/60 tracking-wide">
            Free entry · No online sign-up needed — register on-site on the day
          </p>
        </div>

        {/* 하단 메타 */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 border-t border-white/15 text-white/80">
          {[
            ["DATE", "Jul 4 — 5, 2026"],
            ["WHERE", "Yangyang · Jukdo · Bukbun-ri"],
            ["FORMAT", "2 Days · 2 Zones"],
            ["ENTRY", "Free · Some pre-booked"],
          ].map(([k, v]) => (
            <div key={k} className="px-4 md:px-8 py-5 border-r border-white/15 last:border-r-0">
              <p className="font-[family-name:var(--font-karla)] text-[9px] md:text-[10px] tracking-[2px] font-bold uppercase opacity-60 mb-1">
                {k}
              </p>
              <p className="font-[family-name:var(--font-karla)] text-[12px] md:text-[14px] font-black">
                {v}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── ABOUT ──────────────────────────────────────────────── */}
      <section id="about" className="bg-[#FAF5EE] text-text py-[120px] px-6">
        <div className="max-w-[900px] mx-auto text-center">
          <FadeIn>
            <p className="font-[family-name:var(--font-karla)] text-[10px] tracking-[3px] font-bold uppercase text-text-muted mb-4">
              About
            </p>
            <h2 className="font-[family-name:var(--font-karla)] text-[26px] md:text-[40px] font-black mb-10 leading-tight">
              Not one stage, but a festival that{" "}
              <span className="text-[#006B7A]">circles four spots</span>
            </h2>
            <p className="font-[family-name:var(--font-karla)] text-[15px] md:text-[18px] leading-[1.9] text-text-sub max-w-[760px] mx-auto">
              Start at WaveWorks and pick up your “Hyeonnam Surf Pass,” wander
              between Jukdo and Bukbun-ri spending at local shops, share a meal
              with the village at the{" "}
              <span className="text-text font-black">Sunset Beach Table in Bukbun-ri</span>,
              and stay into the night for the{" "}
              <span className="text-text font-black">9 PM fireworks finale over Jukdo’s sea</span>.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ─── VISION CINEMATIC BANNER ────────────────────────────── */}
      <section className="relative h-[60vh] min-h-[420px] md:h-[80vh] md:min-h-[560px] overflow-hidden flex items-center justify-center text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/festival-vision-aurora.png"
            alt="Bukbun-ri pine-forest festival concept at dusk"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 40%, rgba(11,31,58,0.55) 100%)",
          }}
        />
        <FadeIn>
          <div className="relative z-10 text-center px-6 max-w-[900px]">
            <p className="font-[family-name:var(--font-karla)] text-[10px] md:text-[12px] tracking-[4px] font-bold uppercase text-[#FFD66E] mb-5">
              First Look · Bukbun-ri Beach
            </p>
            <h2 className="font-[family-name:var(--font-karla)] text-[30px] md:text-[58px] font-black leading-[1.1] mb-6 drop-shadow-lg">
              At dusk, between
              <br />
              the pines and the sea
            </h2>
            <p className="font-[family-name:var(--font-karla)] text-[14px] md:text-[17px] text-white/85 leading-relaxed max-w-[560px] mx-auto drop-shadow">
              A table set by the village, guests from afar, fairy lights and
              tents among the pines.
              <br className="hidden md:block" />
              This one scene is the whole festival.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ─── ZONES ─────────────────────────────────────────────── */}
      <section id="zones" className="relative">
        <FadeIn>
          {/* Activity Zone — Jukdo */}
          <div className="relative min-h-[600px] md:min-h-[680px] flex items-center text-white overflow-hidden">
            <Image
              src="/images/festival-zone-jukdo.png"
              alt="Jukdo Activity Zone — beach festival concept"
              fill
              className="object-cover z-0"
              sizes="100vw"
            />
            <div
              className="absolute inset-0 z-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,78,90,0.92) 0%, rgba(0,107,122,0.82) 50%, rgba(0,131,143,0.78) 100%)",
              }}
            />
            <div
              className="absolute -bottom-10 md:-bottom-20 -right-4 md:right-10 font-[family-name:var(--font-karla)] font-black tracking-tighter text-white/[0.05] select-none pointer-events-none"
              style={{ fontSize: "clamp(180px, 30vw, 460px)", lineHeight: 1 }}
            >
              ACTIVITY
            </div>
            <div className="relative z-10 max-w-[1200px] mx-auto w-full grid md:grid-cols-2 gap-10 md:gap-16 px-6 md:px-12 py-[100px]">
              <div>
                <p className="font-[family-name:var(--font-karla)] text-[10px] tracking-[4px] font-bold uppercase text-[#FF6B6B] mb-5">
                  Zone 01 · Daylight to Night
                </p>
                <h2 className="font-[family-name:var(--font-karla)] text-[44px] md:text-[80px] font-black mb-3 leading-[0.95]">
                  ACTIVITY
                </h2>
                <h3 className="font-[family-name:var(--font-karla)] text-[26px] md:text-[34px] font-black mb-4">
                  Jukdo Zone
                </h3>
                <p className="font-[family-name:var(--font-karla)] text-[14px] md:text-[15px] text-white/70 italic mb-6">
                  WaveWorks / Yangyang’s home of surfing
                </p>
                <p className="font-[family-name:var(--font-karla)] text-[14px] md:text-[16px] text-white/85 leading-[1.9] max-w-[440px]">
                  Surf-lifestyle energy from day to night. Activity sessions,
                  beach running, Surfer’s Night, and the fireworks — the
                  daytime signatures all happen here.
                </p>
              </div>
              <ul className="space-y-3 md:pt-12 text-[14px] md:text-[15px] font-[family-name:var(--font-karla)]">
                {[
                  ["Activity sessions — Surfing·SUP·Land Surfing·Climbing (110)", true],
                  ["Main info · Hyeonnam Life showcase · Merch", false],
                  ["Beach Running (18:00)", false],
                  ["Surfer’s Night (19:00)", true],
                  ["Fireworks Finale (21:00)", true],
                ].map(([txt, hi]) => (
                  <li key={String(txt)} className="flex items-start gap-3 py-2 border-b border-white/10">
                    <span className="text-[#FF6B6B] mt-0.5">●</span>
                    <span className={hi ? "font-black" : ""}>{txt as string}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Nature Zone — Bukbun-ri */}
          <div className="relative min-h-[600px] md:min-h-[680px] flex items-center text-white overflow-hidden">
            <Image
              src="/images/festival-zone-bukbunri.png"
              alt="Bukbun-ri Nature Zone — pine-forest camping & Sunset Beach Table concept"
              fill
              className="object-cover z-0"
              sizes="100vw"
            />
            <div
              className="absolute inset-0 z-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(44,24,16,0.90) 0%, rgba(92,58,30,0.80) 40%, rgba(139,69,19,0.74) 70%, rgba(184,92,44,0.72) 100%)",
              }}
            />
            <div
              className="absolute -bottom-10 md:-bottom-20 -left-4 md:left-10 font-[family-name:var(--font-karla)] font-black tracking-tighter text-white/[0.06] select-none pointer-events-none"
              style={{ fontSize: "clamp(180px, 30vw, 460px)", lineHeight: 1 }}
            >
              NATURE
            </div>
            <div className="relative z-10 max-w-[1200px] mx-auto w-full grid md:grid-cols-2 gap-10 md:gap-16 px-6 md:px-12 py-[100px]">
              <div className="md:order-2 md:text-right">
                <p className="font-[family-name:var(--font-karla)] text-[10px] tracking-[4px] font-bold uppercase text-[#FFD66E] mb-5">
                  Zone 02 · Sleep Under the Stars
                </p>
                <h2 className="font-[family-name:var(--font-karla)] text-[44px] md:text-[80px] font-black mb-3 leading-[0.95]">
                  NATURE
                </h2>
                <h3 className="font-[family-name:var(--font-karla)] text-[26px] md:text-[34px] font-black mb-4">
                  Bukbun-ri Zone
                </h3>
                <p className="font-[family-name:var(--font-karla)] text-[14px] md:text-[15px] text-white/70 italic mb-6">
                  Bukbun-ri village campground
                </p>
                <p className="font-[family-name:var(--font-karla)] text-[14px] md:text-[16px] text-white/85 leading-[1.9] max-w-[440px] md:ml-auto">
                  A local cooking class, the Sunset Beach Table, and Yoga &
                  Nature Mandala fill the pine forest’s day and night.
                </p>
              </div>
              <ul className="md:order-1 space-y-3 md:pt-12 text-[14px] md:text-[15px] font-[family-name:var(--font-karla)]">
                {[
                  ["Camping stay · Flea market", false],
                  ["Local Cooking Class — Blueberry Mochi (13:00)", false],
                  ["Sunset Beach Table (18:00)", true],
                  ["Yoga & Nature Mandala (Sun 10:00)", true],
                ].map(([txt, hi]) => (
                  <li key={String(txt)} className="flex items-start gap-3 py-2 border-b border-white/10">
                    <span className="text-[#FFD66E] mt-0.5">●</span>
                    <span className={hi ? "font-black" : ""}>{txt as string}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeIn>

        <p className="bg-black text-center py-5 font-[family-name:var(--font-karla)] text-[10px] md:text-[11px] tracking-[2px] uppercase text-white/50">
          + Ingu · Dongsan = waypoint sub-spots · stamp tour · local shops
        </p>
      </section>

      {/* ─── SCHEDULE ──────────────────────────────────────────── */}
      <section id="schedule" className="bg-[#FAF5EE] text-text py-[120px] px-6">
        <div className="max-w-[960px] mx-auto">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="font-[family-name:var(--font-karla)] text-[10px] tracking-[3px] font-bold uppercase text-text-muted mb-4">
                Schedule
              </p>
              <h2 className="font-[family-name:var(--font-karla)] text-[26px] md:text-[40px] font-black leading-tight">
                Two Days, One Night
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-baseline gap-4 mb-6 pb-4 border-b border-text">
                  <p className="font-[family-name:var(--font-karla)] text-[36px] font-black leading-none">
                    DAY 1
                  </p>
                  <p className="font-[family-name:var(--font-karla)] text-[14px] font-bold text-text-sub">
                    Jul 4 (Sat) — Main Day
                  </p>
                </div>
                <ul className="space-y-2">
                  {DAY1.map(([time, prog]) => (
                    <li key={time} className="flex gap-4 py-2 border-b border-border text-[13px]">
                      <span className="font-[family-name:var(--font-karla)] font-bold text-[#006B7A] w-14 shrink-0">
                        {time}
                      </span>
                      <span className="font-[family-name:var(--font-karla)] flex-1">{prog}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="flex items-baseline gap-4 mb-6 pb-4 border-b border-text">
                  <p className="font-[family-name:var(--font-karla)] text-[36px] font-black leading-none">
                    DAY 2
                  </p>
                  <p className="font-[family-name:var(--font-karla)] text-[14px] font-bold text-text-sub">
                    Jul 5 (Sun)
                  </p>
                </div>
                <ul className="space-y-2">
                  {DAY2.map(([time, prog]) => (
                    <li key={time} className="flex gap-4 py-2 border-b border-border text-[13px]">
                      <span className="font-[family-name:var(--font-karla)] font-bold text-[#FF6B6B] w-14 shrink-0">
                        {time}
                      </span>
                      <span className="font-[family-name:var(--font-karla)] flex-1">{prog}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── PROGRAMS ──────────────────────────────────────────── */}
      <section id="programs" className="bg-white text-text py-[120px] px-6">
        <div className="max-w-[1080px] mx-auto">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="font-[family-name:var(--font-karla)] text-[10px] tracking-[3px] font-bold uppercase text-text-muted mb-4">
                Programs
              </p>
              <h2 className="font-[family-name:var(--font-karla)] text-[26px] md:text-[40px] font-black leading-tight">
                Things to Do
              </h2>
              <p className="font-[family-name:var(--font-karla)] text-[14px] text-text-sub mt-5 max-w-[680px] mx-auto leading-relaxed">
                Programs along Yangyang Surf Road. Most are <b>free</b> (only the
                Sunset Beach Table is ₩20,000, paid on-site). Pre-booking is in
                Korean only — <b>visitors can register on-site on the day</b>,
                subject to remaining spots.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {EXPERIENCES.map((exp) => {
                const total = exp.slots
                  ? exp.slots.reduce((s, x) => s + x.capacity, 0)
                  : exp.capacity ?? 0;
                const online = exp.slots
                  ? exp.slots.reduce((s, x) => s + onlineCapacity(x.capacity), 0)
                  : nonSlotOnlineCap(exp);
                const onsite = total - online;
                return (
                  <div key={exp.key} className="border border-border p-5 flex flex-col bg-[#FAF5EE]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-[family-name:var(--font-karla)] text-[10px] tracking-[2px] uppercase font-bold text-[#006B7A]">
                        {LOCATION_EN[exp.location]}
                      </span>
                      <span className={`font-[family-name:var(--font-karla)] text-[11px] font-bold ${exp.fee ? "text-[#b45309]" : "text-[#0B7A5A]"}`}>
                        {exp.feeEn ?? (exp.fee ? exp.fee : "Free")}
                      </span>
                    </div>
                    <h3 className="font-[family-name:var(--font-karla)] text-[17px] font-black mb-1.5 leading-snug">
                      {exp.labelEn ?? exp.label}
                    </h3>
                    <p className="font-[family-name:var(--font-karla)] text-[13px] text-text-sub leading-relaxed mb-4 flex-1">
                      {exp.descEn ?? exp.desc}
                    </p>
                    <div className="font-[family-name:var(--font-karla)] text-[12px] space-y-1 pt-3 border-t border-border">
                      <p>
                        <span className="text-text-muted">Capacity</span> <b>{total}</b>
                        <span className="text-text-muted"> · pre {online} / on-site {onsite}</span>
                        {exp.slots && (
                          <span className="text-text-muted">
                            {" "}
                            ({exp.slots[0].capacity} per slot · {exp.slots.map((s) => s.slot).join("·")})
                          </span>
                        )}
                      </p>
                      <p>
                        <span className="text-text-muted">Age</span> {exp.ageLimitEn ?? exp.ageLimit ?? "All ages"}
                      </p>
                      {(exp.time || exp.slots) && (
                        <p>
                          <span className="text-text-muted">Time</span>{" "}
                          {exp.slots ? exp.slots.map((s) => s.slot).join(" / ") : exp.timeEn ?? exp.time}
                        </p>
                      )}
                      {exp.exclusiveGroup === "activity" && (
                        <p className="text-[#b45309] text-[11px]">※ Surfing·SUP·Land Surfing·Bouldering — pick one</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 캠핑 사이트 안내 */}
            <div className="mt-6 border border-border bg-[#0B1F3A] text-white p-5 md:p-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
              <span className="font-[family-name:var(--font-karla)] text-[10px] tracking-[2px] uppercase font-bold text-[#FFD66E] shrink-0">
                Camping
              </span>
              <p className="font-[family-name:var(--font-karla)] text-[13px] md:text-[14px] leading-relaxed flex-1">
                Bukbun-ri village campground — <b>Deck (70 sites) · Field (10 sites), all free</b>{" "}
                (sponsored by the Yangyang Agricultural Technology Center).
                Overnight campers also enjoy the Sunset Beach Table and Sunday
                yoga. Camping sign-up is handled in Korean — please email us to
                arrange a spot.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── SIGNATURE MOMENTS ─────────────────────────────────── */}
      <section
        className="text-white py-[120px] px-6"
        style={{ backgroundColor: "#0B1F3A" }}
      >
        <div className="max-w-[1100px] mx-auto">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="font-[family-name:var(--font-karla)] text-[10px] tracking-[3px] font-bold uppercase text-white/60 mb-4">
                Signature Moments
              </p>
              <h2 className="font-[family-name:var(--font-karla)] text-[26px] md:text-[40px] font-black leading-tight">
                Two Signature Moments
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {/* 18:00 Sunset Beach Table */}
              <div
                className="relative p-10 md:p-14 border text-center overflow-hidden min-h-[340px] md:min-h-[420px] flex flex-col items-center justify-center"
                style={{ borderColor: "rgba(255,107,107,0.5)" }}
              >
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/images/festival-sunset-table.png"
                    alt="Sunset Beach Table concept"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div
                  className="absolute inset-0 z-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(11,31,58,0.55) 50%, rgba(0,0,0,0.85) 100%)",
                  }}
                />
                <div className="relative z-10">
                  <p
                    className="font-[family-name:var(--font-karla)] text-[64px] md:text-[100px] font-black leading-none mb-4 drop-shadow-lg"
                    style={{ color: "#FF6B6B" }}
                  >
                    18:00
                  </p>
                  <p className="font-[family-name:var(--font-karla)] text-[20px] md:text-[26px] font-black mb-3 drop-shadow">
                    Sunset Beach Table
                  </p>
                  <p className="font-[family-name:var(--font-karla)] text-[13px] text-white/90 leading-relaxed drop-shadow">
                    Village, guests and surfers share one table in Bukbun-ri’s pines
                  </p>
                </div>
              </div>

              {/* 21:00 Fireworks */}
              <div
                className="relative p-10 md:p-14 border text-center overflow-hidden min-h-[340px] md:min-h-[420px] flex flex-col items-center justify-center"
                style={{ borderColor: "rgba(127,221,208,0.5)" }}
              >
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/images/festival-fireworks.png"
                    alt="Jukdo fireworks finale concept"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div
                  className="absolute inset-0 z-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(11,31,58,0.6) 0%, rgba(0,75,90,0.55) 50%, rgba(11,31,58,0.9) 100%)",
                  }}
                />
                <div className="relative z-10">
                  <p
                    className="font-[family-name:var(--font-karla)] text-[64px] md:text-[100px] font-black leading-none mb-4 drop-shadow-lg"
                    style={{ color: "#7FDDD0" }}
                  >
                    21:00
                  </p>
                  <p className="font-[family-name:var(--font-karla)] text-[20px] md:text-[26px] font-black mb-3 drop-shadow">
                    Fireworks Finale
                  </p>
                  <p className="font-[family-name:var(--font-karla)] text-[13px] text-white/90 leading-relaxed drop-shadow">
                    A finale of fireworks over Jukdo’s night sea
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── VISIT / GOOD TO KNOW ──────────────────────────────── */}
      <section id="visit" className="bg-[#FAF5EE] text-text py-[120px] px-6">
        <div className="max-w-[860px] mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="font-[family-name:var(--font-karla)] text-[10px] tracking-[3px] font-bold uppercase text-text-muted mb-4">
                For Visitors
              </p>
              <h2 className="font-[family-name:var(--font-karla)] text-[26px] md:text-[40px] font-black leading-tight">
                Good to Know
              </h2>
            </div>
            <ul className="grid sm:grid-cols-2 gap-4 font-[family-name:var(--font-karla)] text-[14px] leading-relaxed">
              {[
                ["Free entry", "The festival grounds are free to enter — just come."],
                ["Free vs paid", "Most programs are free. Only the Sunset Beach Table costs ₩20,000, paid on-site."],
                ["How to join", "No online sign-up needed. Walk in and register on-site on the day, subject to remaining spots."],
                ["Payment", "Bring some cash to be safe — not every booth accepts cards."],
                ["Two locations", "Jukdo Beach (daytime activities) and Bukbun-ri Beach (sunset to night), both in Yangyang."],
                ["Language", "This page is an English guide. On-site help is mainly in Korean — a translation app may come in handy."],
              ].map(([title, body]) => (
                <li key={title} className="border border-border bg-white p-5">
                  <p className="font-black text-[15px] mb-1.5">{title}</p>
                  <p className="text-text-sub">{body}</p>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* ─── BOTTOM CTA ────────────────────────────────────────── */}
      <section className="bg-black text-white py-[140px] px-6 text-center">
        <FadeIn>
          <p className="font-[family-name:var(--font-karla)] text-[10px] tracking-[4px] font-bold uppercase text-[#FF6B6B] mb-5">
            Join Us
          </p>
          <h2 className="font-[family-name:var(--font-karla)] text-[30px] md:text-[52px] font-black mb-3 leading-tight">
            The first village feast on Yangyang Surf Road
          </h2>
          <p className="font-[family-name:var(--font-karla)] text-[15px] md:text-[17px] text-white/70 mb-10 max-w-[640px] mx-auto leading-relaxed">
            Surfers and the village at one table — come spend two days with us.
          </p>
          <a
            href={MAILTO}
            className="inline-block font-[family-name:var(--font-karla)] text-[12px] md:text-[14px] font-extrabold tracking-[3px] uppercase bg-[#FF6B6B] text-white px-10 py-5 hover:bg-white hover:text-black transition-colors"
          >
            Questions? Email Us →
          </a>
          <p className="mt-5 font-[family-name:var(--font-karla)] text-[13px] text-white/60">
            {EMAIL}
          </p>
          <div className="mt-12 pt-12 border-t border-white/15 text-[11px] text-white/50 font-[family-name:var(--font-karla)]">
            <p className="mb-2">
              Hosted by <span className="text-white/80">LOMAD Cooperative</span> · Funded by the Rural Village Revitalization Program
            </p>
            <p>
              <Link href="/projects/hyeonnam-festival" className="underline hover:text-white">
                한국어 안내 보기 →
              </Link>
            </p>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
