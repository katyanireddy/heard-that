"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { mapSpots } from "@/lib/data";
import { SectionTitle } from "@/components/ui/section-title";
import Image from "next/image";

export function MapSection() {
  const [activeId, setActiveId] = useState(mapSpots[0]?.id);

  return (
    <section className="px-4 py-14 md:px-8">
      <div className="mx-auto w-full max-w-7xl rounded-[1.6rem] border-4 border-ink bg-aqua p-6 shadow-[10px_10px_0_#2a1408]">
        <SectionTitle
          eyebrow="Bangalore Map"
          title="Our Cozy Corners"
          description="Stylized map of event locations, cafes, and hidden gems around the city."
        />

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative min-h-[360px] overflow-hidden rounded-[1.2rem] border-[3px] border-ink bg-cream">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,143,74,0.25),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(127,83,216,0.2),transparent_35%)]" />
            {mapSpots.map((spot, idx) => (
              <motion.button
                key={spot.id}
                type="button"
                onMouseEnter={() => setActiveId(spot.id)}
                onClick={() => setActiveId(spot.id)}
                className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2 + idx * 0.3, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="h-5 w-5 rounded-full border-2 border-ink bg-jam" />
                <span className="mt-1 rounded-full border-2 border-ink bg-lime px-2 py-0.5 text-[10px] font-black uppercase">
                  {idx + 1}
                </span>
              </motion.button>
            ))}
            <p className="absolute bottom-3 left-3 rounded-full border-2 border-ink bg-cream px-3 py-1 text-xs font-bold uppercase">
              Stylized map - Bangalore
            </p>
          </div>

          <div className="space-y-3">
            {mapSpots.map((spot) => (
              <article
                key={spot.id}
                className={`rounded-2xl border-[3px] border-ink p-4 shadow-[4px_4px_0_#2a1408] ${
                  activeId === spot.id ? "bg-lime" : "bg-cream"
                }`}
              >
                <p className="text-xs font-black uppercase tracking-[0.14em] text-jam">{spot.kind}</p>
                <h3 className="font-display text-2xl uppercase leading-tight">{spot.name}</h3>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
