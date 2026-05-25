import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 items-center px-4 py-20 md:px-8">
      <section className="relative w-full rounded-[1.8rem] border-4 border-ink bg-gradient-to-br from-mango via-chai to-blush p-8 text-center shadow-[10px_10px_0_#2a1408]">
        <div className="noise-overlay" />
        <div className="relative">
          <p className="font-script text-5xl text-jam">Oops</p>
          <h1 className="font-display text-5xl uppercase leading-tight text-ink md:text-7xl">Lost in Bangalore traffic?</h1>
          <p className="mx-auto mt-4 max-w-xl text-base font-semibold md:text-lg">
            This page took a wrong U-turn near Silk Board. Let&apos;s get you back to the community lane.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="rounded-full border-[3px] border-ink bg-lime px-6 py-2 text-sm font-black uppercase tracking-wide shadow-[4px_4px_0_#2a1408]"
            >
              Back Home
            </Link>
            <Link
              href="/events"
              className="rounded-full border-[3px] border-ink bg-jam px-6 py-2 text-sm font-black uppercase tracking-wide text-cream shadow-[4px_4px_0_#2a1408]"
            >
              Find Events
            </Link>
          </div>
          <div className="mt-8 flex justify-center gap-3 text-4xl">
            <span className="animate-float">🚕</span>
            <span className="animate-bounce-soft">🌀</span>
            <span className="animate-wobble">🗺️</span>
          </div>
        </div>
      </section>
    </main>
  );
}
