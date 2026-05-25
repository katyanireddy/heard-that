"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { tonightVibeData } from "@/lib/data";
import { SectionTitle } from "@/components/ui/section-title";

export function TonightVibe() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % tonightVibeData.quotePool.length);
    }, 3500);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="px-4 py-14 md:px-8">
      <div className="mx-auto w-full max-w-7xl rounded-[1.6rem] border-4 border-ink bg-gradient-to-br from-blush via-chai to-mango p-6 shadow-[10px_10px_0_#2a1408]">
        <SectionTitle eyebrow="Live Mood" title="Tonight's Vibe" description={tonightVibeData.mood} />

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="paper-card bg-cream p-4"
          >
            <p className="text-xs font-black uppercase tracking-[0.14em] text-jam">Random quote</p>
            <p className="mt-2 text-xl font-bold">“{tonightVibeData.quotePool[index]}”</p>
          </motion.div>

          <div className="paper-card bg-cream p-4">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-jam">Ongoing obsessions</p>
            <ul className="mt-2 space-y-1 text-sm font-semibold">
              {tonightVibeData.obsessions.map((obsession) => (
                <li key={obsession}>• {obsession}</li>
              ))}
            </ul>
          </div>

          <div className="paper-card bg-cream p-4">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-jam">Upcoming themes</p>
            <ul className="mt-2 space-y-1 text-sm font-semibold">
              {tonightVibeData.upcomingThemes.map((theme) => (
                <li key={theme}>• {theme}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
