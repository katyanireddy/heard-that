"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GalleryMemory } from "@/lib/types";

export function ScrapbookGallery({ memories }: { memories: GalleryMemory[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {memories.map((memory, index) => (
        <motion.article
          key={memory.id}
          whileHover={{ y: -10, rotate: index % 2 === 0 ? -1 : 1 }}
          className="group relative overflow-hidden rounded-[1.2rem] border-4 border-ink bg-cream p-3 shadow-[8px_8px_0_#2a1408]"
        >
          <span
            className="absolute left-8 top-1 z-10 h-6 w-20 rounded-b-md border-2 border-ink"
            style={{ backgroundColor: memory.tapeColor }}
          />

          <div className="overflow-hidden rounded-xl border-[3px] border-ink">
            <Image
              src={memory.image}
              alt={memory.title}
              width={800}
              height={640}
              className="h-60 w-full object-cover transition duration-500 group-hover:scale-110"
            />
          </div>

          <div className="mt-3">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-jam">{memory.event}</p>
            <h3 className="font-display text-2xl uppercase leading-tight">{memory.title}</h3>
            <p className="mt-1 text-sm font-semibold">“{memory.quote}”</p>
            <p className="mt-2 rounded-lg border-2 border-ink bg-blush px-2 py-1 text-xs font-semibold opacity-0 transition group-hover:opacity-100">
              {memory.caption}
            </p>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
