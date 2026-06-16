"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Memory = {
  id: string;
  image_url: string;
  caption: string;
  event_name: string;
  user_name: string;
};

export function ScrapbookGallery({
  memories,
}: {
  memories: Memory[];
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {memories.map((memory, index) => (
        <motion.article
          key={memory.id}
          whileHover={{
            y: -10,
            rotate: index % 2 === 0 ? -1 : 1,
          }}
          className="group relative overflow-hidden rounded-[1.2rem] border-4 border-ink bg-cream p-3 shadow-[8px_8px_0_#2a1408]"
        >
          <span className="absolute left-8 top-1 z-10 h-6 w-20 rounded-b-md border-2 border-ink bg-blush" />

          <div className="overflow-hidden rounded-xl border-[3px] border-ink">
            <img
  src={memory.image_url}
  alt={memory.event_name}
  className="h-60 w-full object-cover"
/>
          </div>

          <div className="mt-3">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-jam">
              {memory.event_name}
            </p>

            <h3 className="font-display text-2xl uppercase leading-tight">
              {memory.user_name}
            </h3>

            <p className="mt-1 text-sm font-semibold">
              "{memory.caption}"
            </p>
          </div>
        </motion.article>
      ))}
    </div>
  );
}