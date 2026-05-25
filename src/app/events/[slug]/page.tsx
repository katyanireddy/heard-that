import { notFound } from "next/navigation";
import { RsvpCard } from "@/components/events/rsvp-card";
import { SectionTitle } from "@/components/ui/section-title";
import { getEvents } from "@/lib/events-store";
import { formatDateTime } from "@/lib/utils";

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = getEvents().find((item) => item.slug === slug);

  if (!event) notFound();

  return (
    <main className="px-4 py-12 md:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[1.4rem] border-4 border-ink bg-gradient-to-br from-mango via-chai to-blush p-6 shadow-[10px_10px_0_#2a1408]">
          <SectionTitle eyebrow="Event Details" title={event.title} description={event.description} />
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="paper-card bg-cream p-4">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-jam">Date & Time</p>
              <p className="mt-2 text-sm font-semibold">{formatDateTime(event.dateTime)}</p>
            </div>
            <div className="paper-card bg-cream p-4">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-jam">Venue</p>
              <p className="mt-2 text-sm font-semibold">{event.location}</p>
            </div>
            <div className="paper-card bg-cream p-4">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-jam">Mood</p>
              <p className="mt-2 text-sm font-semibold">{event.mood}</p>
            </div>
            <div className="paper-card bg-cream p-4">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-jam">Spots Left</p>
              <p className="mt-2 text-sm font-semibold">
                {event.seatsLeft} / {event.seatsTotal}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {event.tags.map((tag) => (
              <span key={tag} className="rounded-full border-2 border-ink bg-lime px-3 py-1 text-xs font-bold uppercase">
                {tag}
              </span>
            ))}
          </div>
        </section>

        <section>
          <RsvpCard event={event} />
        </section>
      </div>
    </main>
  );
}
