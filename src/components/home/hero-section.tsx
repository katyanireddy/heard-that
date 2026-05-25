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
            <span className="hero-word inline-block text-violet">Curated nights.</span>
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-relaxed md:text-xl">
            {heardThatIntro}
            <span className="font-script text-3xl text-jam"> shared experiences only.</span>
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/events"
              className="rounded-full border-[3px] border-ink bg-lime px-6 py-3 text-sm font-black uppercase tracking-wide shadow-[5px_5px_0_#2a1408] transition hover:-translate-y-1"
            >
              Browse Upcoming Events
            </Link>
            <a
              href="https://chat.whatsapp.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border-[3px] border-ink bg-aqua px-6 py-3 text-sm font-black uppercase tracking-wide shadow-[5px_5px_0_#2a1408] transition hover:-translate-y-1"
            >
              Join WhatsApp Community
            </a>
          </div>

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

        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="relative rounded-[2rem] border-4 border-ink bg-gradient-to-br from-jam via-violet to-chai p-6 shadow-[10px_10px_0_#2a1408]"
        >
          <div className="noise-overlay" />
          <div className="relative">
            <p className="font-script text-3xl text-cream">Tonight&apos;s vibe</p>
            <p className="font-display text-4xl uppercase text-cream">Chai + Chaos + Comfort</p>
            <p className="mt-3 text-base text-cream/90">
              Cozy curated events for people who love board games, movies, nostalgia, random conversations,
              psychology, art, and cafe hopping.
            </p>
            <div className="mt-6 h-px bg-cream/40" />
            <p className="mt-4 text-sm font-bold uppercase tracking-[0.12em] text-chai">Location: Bangalore, India</p>
          </div>

          <div className="relative mt-6">
            <StickerCloud
              stickers={[
                { id: "s1", label: "retro nights", className: "left-0 top-0 bg-lime" },
                { id: "s2", label: "movie yappers", className: "right-6 top-6 bg-chai" },
                { id: "s3", label: "board game goblins", className: "left-12 top-20 bg-blush" },
                { id: "s4", label: "new friends", className: "right-0 top-32 bg-aqua" },
              ]}
            />
          </div>

          <div className="absolute -bottom-5 -right-3 rotate-[8deg] rounded-xl border-[3px] border-ink bg-cream p-2 shadow-[6px_6px_0_#2a1408]">
            <Image
              src="/characters/disco-didi.svg"
              alt="Retro character sticker"
              width={90}
              height={106}
              className="h-[84px] w-auto"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
