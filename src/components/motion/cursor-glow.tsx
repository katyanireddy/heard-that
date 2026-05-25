"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CursorGlow() {
  const [point, setPoint] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      setPoint({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed z-40 hidden h-24 w-24 rounded-full bg-[radial-gradient(circle,_rgba(255,243,153,0.85)_0%,_rgba(255,243,153,0)_70%)] mix-blend-multiply md:block"
      animate={{ x: point.x - 48, y: point.y - 48 }}
      transition={{ type: "spring", stiffness: 120, damping: 18, mass: 0.1 }}
    />
  );
}
