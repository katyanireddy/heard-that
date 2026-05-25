"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { EventItem } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";
import { SectionTitle } from "@/components/ui/section-title";

export function EventsBento({ events }: { events: EventItem[] }) {
  return (
    <section className="px-4 py-14 md:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <SectionTitle
          eyebrow="Upcoming Events"
          title="Bento Style Event Board"
          description="Scrapbook tickets, board-game card vibes, and spot counters with hover tilt + glow."
        />

        <div className="mt-8 grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {events.slice(0, 4).map((event, idx) => {
            const sizeClass =
              idx === 0
                ? "sm:col-span-2 sm:row-span-2"
                : idx === 1
                  ? "lg:col-span-2"
                  : "sm:col-span-1";

            return (
              <motion.article
                key={event.id}
                className={`group relative overflow-hidden rounded-[1.5rem] border-4 border-ink bg-cream p-5 shadow-[8px_8px_0_#2a1408] ${sizeClass}`}
                whileHover={{ rotate: -0.8, y: -8, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 200, damping: 16 }}
              >
                <div className="noise-overlay" />
                <div className="relative flex h-full flex-col justify-between">
                  <div>
                    <p className="inline-flex rounded-full border-2 border-ink bg-lime px-3 py-1 text-xs font-black uppercase tracking-wide">
                      {event.emoji} {event.theme}
                    </p>
                    <h3 className="mt-3 font-display text-2xl uppercase leading-tight text-ink md:text-3xl">
                      {event.title}
                    </h3>
                    <p className="mt-2 text-sm font-semibold">{formatDateTime(event.dateTime)}</p>
                    <p className="text-sm">{event.location}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {event.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border-2 border-ink bg-chai px-2 py-0.5 text-[11px] font-bold uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex items-end justify-between">
                    <p className="rounded-xl border-2 border-ink bg-blush px-3 py-2 text-sm font-black text-ink">
                      {event.seatsLeft} spots left
                    </p>
                    <Link
                      href={`/events/${event.slug}`}
                      className="rounded-full border-2 border-ink bg-jam px-4 py-2 text-xs font-black uppercase tracking-wide text-cream transition group-hover:bg-violet"
                    >
                      Book Ticket
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
