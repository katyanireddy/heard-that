"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function TicketReveal({ ticketCode, eventTitle }: { ticketCode: string; eventTitle: string }) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const stampRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!cardRef.current || !stampRef.current) return;

    const tl = gsap.timeline();
    tl.fromTo(cardRef.current, { x: 80, opacity: 0, rotate: 8 }, { x: 0, opacity: 1, rotate: 0, duration: 0.7 });
    tl.fromTo(
      stampRef.current,
      { scale: 2.2, opacity: 0, rotate: -18 },
      { scale: 1, opacity: 1, rotate: -12, duration: 0.4, ease: "back.out(2.2)" },
      "-=0.2",
    );
  }, []);

  return (
    <div ref={cardRef} className="ticket-edge relative overflow-hidden rounded-[1.3rem] border-[3px] border-ink bg-cream p-5 shadow-[8px_8px_0_#2a1408]">
      <div className="noise-overlay" />
      <div className="relative">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-jam">Heard That? Retro Ticket</p>
        <h4 className="mt-2 font-display text-3xl uppercase leading-tight text-ink">{eventTitle}</h4>
        <p className="mt-2 text-sm font-semibold">Ticket: {ticketCode}</p>
        <p className="text-sm">You are officially confirmed. Bring chai-energy.</p>

        <div
          ref={stampRef}
          className="absolute right-1 top-1 rounded-full border-[3px] border-ink bg-lime px-4 py-2 text-xs font-black uppercase tracking-wide text-ink"
        >
          Confirmed
        </div>
      </div>
    </div>
  );
}
