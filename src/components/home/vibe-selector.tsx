"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { vibes } from "@/lib/data";
import { VibeTag } from "@/lib/types";
import { SectionTitle } from "@/components/ui/section-title";

export function VibeSelector({ loggedIn }: { loggedIn: boolean }) {
  const [selected, setSelected] = useState<VibeTag | null>(null);

  const suggestion = useMemo(() => {
    return vibes.find((item) => item.title === selected)?.suggestion;
  }, [selected]);

  return (
    <section className="px-4 py-14 md:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <SectionTitle
          eyebrow="Interactive"
          title="What's Your Vibe?"
          description="Pick your personality card and we'll suggest your kind of night."
        />

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {vibes.map((vibe, index) => (
            <motion.button
              key={vibe.title}
              type="button"
              onClick={() => setSelected(vibe.title)}
              whileHover={{ rotate: index % 2 === 0 ? -2 : 2, y: -8 }}
              className={`group text-left rounded-[1.2rem] border-[3px] border-ink p-4 shadow-[6px_6px_0_#2a1408] transition ${
                selected === vibe.title ? "bg-lime" : "bg-cream hover:bg-blush"
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="text-2xl">{vibe.icon}</p>
                <p className="text-xs font-black uppercase tracking-wide text-jam">Tap me</p>
              </div>
              <h3 className="mt-2 font-display text-2xl uppercase leading-tight">{vibe.title}</h3>
              <p className="mt-2 text-sm">{vibe.description}</p>
            </motion.button>
          ))}
        </div>

        <motion.div
          key={`${suggestion}-${loggedIn}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 rounded-[1.2rem] border-[3px] border-ink bg-aqua p-5 shadow-[7px_7px_0_#2a1408]"
        >
          {selected ? (
            loggedIn ? (
              <p className="text-lg font-bold">{suggestion}</p>
            ) : (
              <p className="text-base font-semibold">
                Vibe matched. Login to unlock your personalized Heard That? recommendations.
              </p>
            )
          ) : (
            <p className="text-base font-semibold">Select a card to reveal personalized event suggestions.</p>
          )}

          {!loggedIn ? (
            <div className="mt-3 flex items-center gap-2 rounded-xl border-2 border-ink bg-cream px-3 py-2 text-sm font-semibold">
              <Lock size={16} />
              Log in to save this vibe to your profile and unlock personalized dashboard recommendations.
            </div>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
