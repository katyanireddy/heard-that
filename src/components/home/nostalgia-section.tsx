"use client";

import { motion } from "framer-motion";
import { nostalgiaItems } from "@/lib/data";
import { SectionTitle } from "@/components/ui/section-title";

export function NostalgiaSection() {
  return (
    <section className="px-4 py-14 md:px-8">
      <div className="mx-auto w-full max-w-7xl rounded-[1.8rem] border-4 border-ink bg-violet p-6 text-cream shadow-[10px_10px_0_#2a1408]">
        <div className="noise-overlay" />
        <SectionTitle
          eyebrow="Nostalgia Engine"
          title="Childhood, Cartoons, and Old Internet Chaos"
          description="VHS textures, old notebook energy, and desi core references we all grew up with."
          className="relative text-cream"
        />

        <div className="relative mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {nostalgiaItems.map((item, idx) => (
            <motion.article
              key={item.title}
              whileHover={{ y: -8, rotate: idx % 2 ? -1.5 : 1.5 }}
              className="rounded-[1.2rem] border-[3px] border-ink bg-cream p-4 text-ink shadow-[6px_6px_0_#2a1408]"
            >
              <p className="text-3xl">{item.emoji}</p>
              <h3 className="mt-2 font-display text-2xl uppercase leading-tight">{item.title}</h3>
              <p className="mt-2 text-sm font-semibold">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
