"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/section-title";

const characters = [
  {
    id: "char-1",
    name: "Disco Didi",
    role: "Nostalgia party starter",
    image: "/characters/disco-didi.svg",
    bg: "bg-blush",
  },
  {
    id: "char-2",
    name: "Game Goblin",
    role: "Board game chaos captain",
    image: "/characters/game-goblin.svg",
    bg: "bg-aqua",
  },
  {
    id: "char-3",
    name: "Chai Thinker",
    role: "2AM philosophy ambassador",
    image: "/characters/chai-thinker.svg",
    bg: "bg-chai",
  },
];

export function CharacterLounge() {
  return (
    <section className="px-4 py-14 md:px-8">
      <div className="mx-auto w-full max-w-7xl rounded-[1.6rem] border-4 border-ink bg-cream p-6 shadow-[10px_10px_0_#2a1408]">
        <SectionTitle
          eyebrow="Mood Board Characters"
          title="Meet The Heard That Crew"
          description="Retro character stickers inspired by your mood board vibe."
        />

        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {characters.map((character, index) => (
            <motion.article
              key={character.id}
              whileHover={{ y: -8, rotate: index % 2 === 0 ? -1 : 1 }}
              className={`overflow-hidden rounded-[1.2rem] border-[3px] border-ink ${character.bg} p-4 shadow-[6px_6px_0_#2a1408]`}
            >
              <div className="rounded-xl border-2 border-ink bg-cream p-2">
                <Image
                  src={character.image}
                  alt={character.name}
                  width={220}
                  height={260}
                  className="mx-auto h-52 w-auto object-contain"
                />
              </div>
              <h3 className="mt-3 font-display text-2xl uppercase leading-tight text-ink">{character.name}</h3>
              <p className="mt-1 text-sm font-semibold text-ink">{character.role}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
