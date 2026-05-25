import { CollabForm } from "@/components/forms/collab-form";
import { SectionTitle } from "@/components/ui/section-title";

const collabCards = [
  {
    title: "Got A Venue?",
    text: "Cafes, bookstores, terraces, weird corners, and cozy spaces where strangers can become friends.",
  },
  {
    title: "Making Art?",
    text: "Artists, storytellers, game hosts, moodboard magicians, and culture curators are all welcome.",
  },
  {
    title: "Sponsor Chai?",
    text: "Snack brands and cafe teams who want to fuel conversation-heavy nights with comfort food energy.",
  },
];

export default function CollabPage() {
  return (
    <main className="px-4 py-12 md:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <section>
          <SectionTitle
            eyebrow="Collab With Us"
            title="Let&apos;s Cook."
            description="Got a venue? Making art? Want to sponsor chai? Let&apos;s build something fun and unhinged."
          />

          <article className="mt-5 rotate-[-1deg] rounded-2xl border-[3px] border-cream bg-[#071a46] p-4 text-cream shadow-[6px_6px_0_#2a1408]">
            <p className="text-sm font-semibold">
              We&apos;re always looking for cool spaces, creative souls, and ideas that feel like internet culture
              but offline.
            </p>
          </article>

          <div className="mt-4 space-y-3">
            {collabCards.map((card) => (
              <article key={card.title} className="rounded-[1.2rem] border-[3px] border-ink bg-chai/80 p-4 shadow-[5px_5px_0_#2a1408]">
                <h3 className="font-display text-2xl uppercase leading-tight">{card.title}</h3>
                <p className="mt-1 text-sm font-semibold">{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <CollabForm />
        </section>
      </div>
    </main>
  );
}
