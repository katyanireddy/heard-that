import Link from "next/link";
import { CommunityNote } from "@/lib/types";
import { SectionTitle } from "@/components/ui/section-title";

export function CommunityPreview({
  notes,
  loggedIn,
}: {
  notes: CommunityNote[];
  loggedIn: boolean;
}) {
  return (
    <section className="px-4 py-14 md:px-8">
      <div className="mx-auto w-full max-w-7xl rounded-[1.6rem] border-4 border-ink bg-blush p-6 shadow-[10px_10px_0_#2a1408]">

        <SectionTitle
          eyebrow="Community Wall"
          title="Floating Sticky Notes"
          description="A chaotic scrapbook where people share thoughts, jokes, memories, and post-event moments."
        />

        <div className="relative mt-8 overflow-hidden rounded-[1.3rem] border-[3px] border-ink bg-[#f6e7c8] p-6">

          {/* Cork Board Texture */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,#8b5e3c_1px,transparent_1px)] [background-size:18px_18px]" />

          {/* Notes */}
          <div className="relative z-10 grid gap-5 md:grid-cols-3">

            {notes.slice(0, 6).map((note, index) => (
              <article
                key={note.id}
                className="relative min-h-[150px] border-[3px] border-ink p-4 shadow-[6px_6px_0_#2a1408]"
                style={{
                  background:
                    index % 3 === 0
                      ? "#FFF2B7"
                      : index % 3 === 1
                      ? "#C9F7FF"
                      : "#FFD7E8",
                  transform: `rotate(${
                    index % 2 === 0 ? "-2deg" : "2deg"
                  })`,
                }}
              >
                {/* Pin */}
                <div className="absolute left-1/2 top-2 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-ink bg-jam" />

                <p className="mt-5 text-xs font-black uppercase tracking-wide text-jam">
                  {note.author}
                </p>

                <p className="mt-3 text-sm leading-relaxed">
                  {note.message}
                </p>
              </article>
            ))}

          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href="/community"
            className="rounded-full border-[3px] border-ink bg-lime px-5 py-2 text-sm font-black uppercase shadow-[4px_4px_0_#2a1408] transition hover:-translate-y-0.5"
          >
            Open Full Wall
          </Link>

          {!loggedIn ? (
            <p className="rounded-full border-2 border-ink bg-cream px-4 py-2 text-xs font-bold uppercase tracking-wide">
              Login Required For Posting
            </p>
          ) : (
            <p className="rounded-full border-2 border-ink bg-aqua px-4 py-2 text-xs font-bold uppercase tracking-wide">
              Community Is Live
            </p>
          )}
        </div>

      </div>
    </section>
  );
}