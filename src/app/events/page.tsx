import Link from "next/link";
import { Countdown } from "@/components/events/countdown";
import { SectionTitle } from "@/components/ui/section-title";
import { getEvents } from "@/lib/events-store";
import { formatDateTime } from "@/lib/utils";

export default async function EventsPage() {
  const allEvents = getEvents();

  return (
    <main className="px-4 py-12 md:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <SectionTitle
          eyebrow="Upcoming Events"
          title="Tickets, RSVP, and Countdown"
          description="Choose your vibe, reserve your spot, and reveal your retro ticket after registration."
        />

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {allEvents.map((event, index) => (
            <article
              key={event.id}
              className={`ticket-edge rounded-[1.3rem] border-4 border-ink p-5 shadow-[8px_8px_0_#2a1408] ${
                index % 2 === 0 ? "bg-cream" : "bg-blush"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-jam">{event.theme}</p>
                  <h2 className="font-display text-3xl uppercase leading-tight">{event.title}</h2>
                </div>
                <Countdown dateTime={event.dateTime} />
              </div>

              <p className="mt-2 text-sm font-semibold">{formatDateTime(event.dateTime)}</p>
              <p className="text-sm">{event.location}</p>
              <p className="mt-2 text-sm">{event.description}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <span key={tag} className="rounded-full border-2 border-ink bg-chai px-3 py-1 text-xs font-bold uppercase">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <p className="rounded-full border-2 border-ink bg-lime px-3 py-1 text-xs font-black uppercase tracking-wide">
                  {event.seatsLeft}/{event.seatsTotal} spots left
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-black">INR {event.priceInr}</p>
                  <Link
                    href={`/events/${event.slug}`}
                    className="rounded-full border-[3px] border-ink bg-jam px-4 py-2 text-xs font-black uppercase tracking-wide text-cream shadow-[4px_4px_0_#2a1408]"
                  >
                    RSVP
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
