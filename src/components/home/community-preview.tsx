import Link from "next/link";
import { CommunityNote } from "@/lib/types";
import { SectionTitle } from "@/components/ui/section-title";

export function CommunityPreview({ notes, loggedIn }: { notes: CommunityNote[]; loggedIn: boolean }) {
  return (
    <section className="px-4 py-14 md:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <SectionTitle
          eyebrow="Community Wall"
          title="Floating Sticky Notes"
          description="A chaotic scrapbook where people share thoughts, jokes, and tiny memories."
        />

        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {notes.slice(0, 3).map((note, index) => (
            <article
              key={note.id}
              className="paper-card rotate-[-1deg] bg-cream p-4"
              style={{ transform: `rotate(${index % 2 === 0 ? -1.4 : 1.5}deg)` }}
            >
              <p className="text-xs font-black uppercase tracking-wide text-jam">{note.author}</p>
              <p className="mt-2 text-sm leading-relaxed">{note.message}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href="/community"
            className="rounded-full border-[3px] border-ink bg-lime px-5 py-2 text-sm font-black uppercase shadow-[4px_4px_0_#2a1408] transition hover:-translate-y-0.5"
          >
            Open full wall
          </Link>
          {!loggedIn ? (
            <p className="rounded-full border-2 border-ink bg-blush px-4 py-2 text-xs font-bold uppercase tracking-wide">
              Login required for posting
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
