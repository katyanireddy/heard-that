"use client";

import { motion } from "framer-motion";

type Sticker = {
  id: string;
  label: string;
  className?: string;
};

export function StickerCloud({ stickers }: { stickers: Sticker[] }) {
  return (
    <div className="relative h-56 w-full">
      {stickers.map((sticker, idx) => (
        <motion.div
          key={sticker.id}
          initial={{ y: 20, opacity: 0, rotate: -8 + idx * 3 }}
          animate={{
            y: [0, -8, 0],
            opacity: 1,
            rotate: [-3, 3, -3],
          }}
          transition={{
            opacity: { duration: 0.4, delay: idx * 0.1 },
            y: { duration: 3 + idx * 0.4, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 5 + idx * 0.4, repeat: Infinity, ease: "easeInOut" },
          }}
          className={`sticker absolute ${sticker.className ?? ""}`}
        >
          {sticker.label}
        </motion.div>
      ))}
    </div>
  );
}
