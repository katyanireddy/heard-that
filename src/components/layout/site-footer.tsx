"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { socialLinks } from "@/lib/data";

const footerLines = [
  "Made with chai & chaos.",
  "Strangers today. Meme-sharing besties tomorrow.",
  "Community first. Algorithm never.",
  "Soft spaces for loud personalities.",
];

export function SiteFooter() {
  const line = footerLines[new Date().getDate() % footerLines.length];

  return (
    <footer className="relative mt-16 border-t-4 border-ink bg-jam px-4 py-12 text-cream md:px-8">
      <div className="noise-overlay" />
      <div className="relative mx-auto grid w-full max-w-7xl gap-8 md:grid-cols-[1.4fr_1fr]">
        <div>
          <h3 className="font-display text-3xl uppercase tracking-wide">Heard That?</h3>
          <p className="mt-3 max-w-xl text-base md:text-lg">{line}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="sticker bg-chai text-ink">#Bangalore</span>
            <span className="sticker bg-aqua text-ink">#OfflineFriends</span>
            <span className="sticker bg-lime text-ink">#NostalgiaNights</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              initial={{ rotate: -2, y: 8, opacity: 0 }}
              whileInView={{ rotate: 0, y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="paper-card block bg-cream p-4 text-[#2a1408] transition hover:-translate-y-1 hover:bg-lime"
            >
              <p className="font-display text-xl text-[#2a1408]">{social.label}</p>
              <p className="mt-1 text-sm font-semibold text-[#3a2518]">Come hang out with the crew.</p>
            </motion.a>
          ))}
          <Link
            href="/community"
            className="paper-card block bg-aqua p-4 text-[#2a1408] transition hover:-translate-y-1 hover:bg-[#7ea59f]"
          >
            <p className="font-display text-xl text-[#2a1408]">Wall Notes</p>
            <p className="mt-1 text-sm font-semibold text-[#3a2518]">Drop a thought on the sticky wall.</p>
          </Link>
          <Link
            href="/events"
            className="paper-card block bg-chai p-4 text-[#2a1408] transition hover:-translate-y-1 hover:bg-[#c7a160]"
          >
            <p className="font-display text-xl text-[#2a1408]">Book A Night</p>
            <p className="mt-1 text-sm font-semibold text-[#3a2518]">Tickets, vibes, and cozy chaos.</p>
          </Link>
        </div>
      </div>
    </footer>
  );
}
