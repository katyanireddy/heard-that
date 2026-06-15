"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { EventItem } from "@/lib/types";
import { heardThatIntro, socialLinks } from "@/lib/data";
import { formatDateTime } from "@/lib/utils";
import { StickerCloud } from "@/components/ui/sticker-cloud";

export function HeroSection({ event }: { event: EventItem }) {
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (!titleRef.current) return;
    const words = titleRef.current.querySelectorAll(".hero-word");
    gsap.fromTo(
      words,
      { yPercent: 120, rotate: 3, opacity: 0 },
      {
        yPercent: 0,
        rotate: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.08,
        ease: "back.out(1.4)",
      },
    );
  }, []);

  return (
    <section className="relative overflow-hidden px-4 pb-14 pt-10 md:px-8 md:pt-16">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[20%] top-[30%] h-2 w-2 rounded-full bg-cream/40 animate-pulse" />
<div className="absolute right-[25%] top-[20%] h-3 w-3 rounded-full bg-lime/30 animate-pulse" />
<div className="absolute bottom-[25%] left-[40%] h-2 w-2 rounded-full bg-aqua/40 animate-pulse" />
</div>
      <div className="noise-overlay" />
      <div className="relative mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="mb-4 inline-block rounded-full border-2 border-ink bg-blush px-4 py-1 text-xs font-black uppercase tracking-[0.2em] text-ink">
            Bangalore Community Platform
          </p>
          <h1
            ref={titleRef}
            className="font-display text-4xl uppercase leading-[0.95] text-ink md:text-6xl lg:text-7xl"
          >
            <span className="hero-word inline-block">Bored in Bangalore?</span>
            <br />
            <span className="hero-word inline-block text-jam">Come make friends offline.</span>
            <br />
            <span className="hero-word inline-block text-violet">For people who miss feeling excited to go out.</span>
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-relaxed md:text-xl">
            {heardThatIntro}
            <span className="font-script text-3xl text-jam"> shared experiences only.</span>
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/events"
              className="rounded-full border-[3px] border-ink bg-lime px-6 py-3 text-sm font-black uppercase tracking-wide shadow-[5px_5px_0_#2a1408] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03]"
            >
              
              Browse Upcoming Events
            </Link>
            <a
              href="https://chat.whatsapp.com/CaV0E4v0Ja60kXTeFkH9FB?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQPOTM2NjE5NzQzMzkyNDU5AAGnCfq7HCx8sOsIeWab2xggrlOWjHp2myzKlysigIsHDKSw9e779zuZ-fBkCys_aem_zXLKYf7m9fbJM5EGFo2J8g"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border-[3px] border-ink bg-aqua px-6 py-3 text-sm font-black uppercase tracking-wide shadow-[5px_5px_0_#2a1408] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03]"
            >
              Join WhatsApp Community
            </a>
            
          </div>
          <p className="mt-4 text-sm font-medium text-ink/70 italic">
  currently assembling emotionally unstable extroverts...
</p>


          <div className="mt-4 flex flex-wrap gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border-2 border-ink bg-cream px-3 py-1 text-xs font-black uppercase tracking-wide"
              >
                {social.label}
              </a>
            ))}
          </div>

          <div className="mt-8 rounded-[1.4rem] border-[3px] border-ink bg-cream p-5 shadow-[8px_8px_0_#2a1408] md:max-w-xl">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-jam">Most Recent Upcoming Event</p>
            <h3 className="mt-2 font-display text-3xl uppercase leading-tight">{event.title}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
  <span className="rounded-full bg-blush px-3 py-1 text-xs font-bold uppercase border-2 border-ink">
    chaos level: 8/10
  </span>

  <span className="rounded-full bg-lime px-3 py-1 text-xs font-bold uppercase border-2 border-ink">
    best for overthinkers
  </span>

  <span className="rounded-full bg-aqua px-3 py-1 text-xs font-bold uppercase border-2 border-ink">
    social battery friendly
  </span>
</div>
            <p className="mt-2 text-sm font-semibold">{formatDateTime(event.dateTime)}</p>
            <p className="text-sm">{event.location}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {event.tags.map((tag) => (
                <span key={tag} className="rounded-full border-2 border-ink bg-chai px-3 py-1 text-xs font-bold">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative rounded-[2rem] border-0 border-ink bg-gradient-to-br from-jam via-violet to-chai p-6 shadow-[10px_10px_0_#2a1408] overflow-hidden">
  <div className="noise-overlay" />

  {/* Header */}
  <div className="relative z-10">
    <p className="font-script text-3xl text-cream">
      Tonight's vibe
    </p>

    <p className="font-display text-4xl uppercase text-cream">
      Chai + Chaos + Comfort
    </p>

    <p className="mt-3 text-base text-cream/90">
      Cozy curated events for people who love board games,
      movies, nostalgia, random conversations, psychology,
      art and cafe hopping.
    </p>

    <div className="mt-4 h-px bg-cream/30" />

    <p className="mt-4 text-sm font-bold uppercase tracking-[0.12em] text-chai">
      Bangalore, India
    </p>
  </div>

  {/* Moodboard */}
<div className="relative mt-8 h-[580px]">

  {/* Top Left Sticker */}
  <div className="absolute left-0 top-4 rotate-[-8deg] rounded-full border-2 border-ink bg-cream px-3 py-1 text-xs font-black">
    retro nights
  </div>

  {/* Top Right Sticker */}
  <div className="absolute right-0 top-6 rotate-[6deg] rounded-full border-2 border-ink bg-cream px-3 py-1 text-xs font-black">
    movie yappers
  </div>

  {/* Founders */}
  <div className="absolute left-8 top-16 rotate-[-5deg]">
    <Image
      src="/images/founders.jpg"
      alt=""
      width={180}
      height={230}
      className="rounded-xl border-4 border-cream shadow-xl"
    />
  </div>

  {/* Group Photo */}
  <div className="absolute right-8 top-32 rotate-[4deg]">
    <Image
      src="/images/all.jpg"
      alt=""
      width={180}
      height={230}
      className="rounded-xl border-4 border-cream shadow-xl"
    />
  </div>

  {/* Center Message */}
  <div className="absolute left-1/2 top-[340px] z-20 rotate-[-3deg] rounded-full border-2 border-ink bg-cream px-5 py-3 text-sm font-black shadow-lg">
    started as strangers • left as friends
  </div>

  {/* Board Games */}
  <div className="absolute left-6 top-[320px] rotate-[3deg]">
    <Image
      src="/images/playing.jpg"
      alt=""
      width={190}
      height={150}
      className="rounded-xl border-4 border-cream shadow-xl"
    />
  </div>

  {/* Extra Photo 1 */}
  <div className="absolute right-8 top-[420px] rotate-[-4deg]">
    <Image
      src="/images/e2.jpg"
      alt=""
      width={170}
      height={140}
      className="rounded-xl border-4 border-cream shadow-xl"
    />
  </div>

  {/* Extra Photo 2 */}
  <div className="absolute left-1/2 top-[520px] -translate-x-1/2 rotate-[2deg]">
    <Image
      src="/images/e1.jpg"
      alt=""
      width={170}
      height={140}
      className="rounded-xl border-4 border-cream shadow-xl"
    />
  </div>

  {/* Bottom Stickers */}
  <div className="absolute left-8 bottom-1 rotate-[5deg] rounded-full border-2 border-ink bg-cream px-3 py-1 text-xs font-black">
    board game goblins
  </div>

  <div className="absolute right-8 bottom-0 rotate-[-5deg] rounded-full border-2 border-ink bg-cream px-3 text-xs font-black">
    new friends
  </div>

  {/* Bottom Community Strip */}
  <div className="absolute left-1/2 top-[730px] -translate-x-1/2 flex gap-3 z-20">
  <div className="rounded-full border-2 border-ink bg-cream px-4 py-2 text-xs font-black">
    🎲 board games
  </div>

  <div className="rounded-full border-2 border-ink bg-cream px-4 py-2 text-xs font-black">
    ☕ chai talks
  </div>

  <div className="rounded-full border-2 border-ink bg-cream px-4 py-2 text-xs font-black">
    🎬 movie nights
  </div>
</div>
</div>
</div>
      </div>
    </section>
  );
}
