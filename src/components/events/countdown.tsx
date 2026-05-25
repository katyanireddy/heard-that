"use client";

import { useEffect, useState } from "react";

function buildCountdown(dateTime: string) {
  const target = new Date(dateTime).getTime();
  const diff = target - Date.now();
  if (diff <= 0) return "Live now";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  return `${days}d ${hours}h ${mins}m`;
}

export function Countdown({ dateTime }: { dateTime: string }) {
  const [label, setLabel] = useState(() => buildCountdown(dateTime));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setLabel(buildCountdown(dateTime));
    }, 60000);

    return () => window.clearInterval(timer);
  }, [dateTime]);

  return <p className="rounded-full border-2 border-ink bg-lime px-3 py-1 text-xs font-black uppercase tracking-wide">{label}</p>;
}
