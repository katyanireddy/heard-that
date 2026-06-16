import Image from "next/image";
import { SectionTitle } from "@/components/ui/section-title";
import { founders } from "@/lib/data";

export default function AboutPage() {
  return (
    <main className="px-4 py-12 md:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <SectionTitle
          eyebrow="About Us"
          title="Two Psychology Students. One Offline Internet."
          description="We bonded over movies, sitcoms, nostalgia, books, art, cafes, board games, philosophy, literature, and meeting new people. Heard That? grew from that exact chaos."
        />

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {founders.map((founder, index) => (
            <article
              key={founder.name}
              className={`overflow-hidden rounded-[1.3rem] border-4 border-ink shadow-[8px_8px_0_#2a1408] ${
                index % 2 === 0 ? "bg-blush" : "bg-aqua"
              }`}
            >
              <Image
                src={founder.image}
                alt={founder.name}
                width={900}
                height={700}
                className="h-110 w-full border-b-4 border-ink object-cover"
              />
              <div className="p-5">
                <h3 className="font-display text-3xl uppercase leading-tight">{founder.name}</h3>
                <p className="mt-2 text-sm font-semibold">{founder.bio}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {founder.interests.map((interest) => (
                    <span key={interest} className="rounded-full border-2 border-ink bg-cream px-3 py-1 text-xs font-black uppercase">
                      {interest}
                    </span>
                  ))}
                </div>
                <a
                  href={founder.social}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex rounded-full border-2 border-ink bg-jam px-4 py-2 text-xs font-black uppercase tracking-wide text-cream"
                >
                  Stalk Their Recs
                </a>
              </div>
            </article>
          ))}
        </div>

        <section className="relative mt-8 overflow-hidden rounded-[1.5rem] border-4 border-ink bg-[#071a46] p-6 text-cream shadow-[10px_10px_0_#2a1408] md:p-8">
          <div className="noise-overlay" />
          <div className="relative">
            <p className="inline-flex rounded-full border-2 border-cream/80 bg-[#12409a] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-cream">
              The Manifesto
            </p>
            <h2 className="mt-3 font-display text-4xl uppercase text-[#3f78f8] md:text-6xl">The Manifesto</h2>
            <div className="mt-4 max-w-4xl space-y-4 text-base leading-relaxed md:text-2xl">
              <p>
                We started Heard That? because we were tired of events that felt like LinkedIn in real life.
              </p>
              <p>
                We wanted spaces where you could debate sitcom endings, get too competitive at Catan, and have
                random deep conversations at 2 AM without it being weird.
              </p>
              <p className="font-black text-lime">
                We&apos;re building the offline internet. Real people, actual fun, zero forced networking.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[1.3rem] border-4 border-ink bg-cream p-5 shadow-[8px_8px_0_#2a1408]">
          <h3 className="font-display text-3xl uppercase">Slide Into Our Inbox</h3>
          <p className="mt-2 text-sm font-semibold">Email: hello@heardthat.in</p>
          <p className="text-sm font-semibold">Instagram: @heard._.that</p>
        </section>
      </div>
    </main>
  );
}
