"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { galleryMemories, vibes } from "@/lib/data";
import { updateMyVibesAction } from "@/lib/server-actions";
import { AppSession, EventItem } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";

const initialState = {
  error: "",
  success: "",
};

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="rounded-full border-[3px] border-ink bg-jam px-4 py-2 text-xs font-black uppercase tracking-wide text-cream shadow-[4px_4px_0_#2a1408]"
      disabled={pending}
    >
      {pending ? "Saving..." : "Save Vibes"}
    </button>
  );
}

export function MemberDashboard({ session, joinedEvents }: { session: AppSession; joinedEvents: EventItem[] }) {
  const [state, action] = useActionState(updateMyVibesAction, initialState);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <aside className="space-y-4">
        <section className="rounded-[1.3rem] border-4 border-ink bg-cream p-5 shadow-[8px_8px_0_#2a1408]">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-jam">Profile</p>
          <h2 className="mt-2 font-display text-3xl uppercase">{session.name}</h2>
          <p className="text-sm font-semibold">{session.email}</p>
          <p className="mt-2 rounded-full border-2 border-ink bg-lime px-3 py-1 text-xs font-black uppercase inline-block">
            {session.role}
          </p>
          <p className="mt-3 text-sm">Selected vibes: {session.vibes.length ? session.vibes.join(", ") : "No vibes yet"}</p>
        </section>

        <section className="rounded-[1.3rem] border-4 border-ink bg-aqua p-5 shadow-[8px_8px_0_#2a1408]">
          <h3 className="font-display text-2xl uppercase">Update My Vibe Palette</h3>
          <form action={action} className="mt-3 space-y-2">
            {vibes.map((vibe) => (
              <label key={vibe.title} className="flex items-center gap-2 rounded-xl border-2 border-ink bg-cream px-3 py-2 text-sm font-semibold">
                <input
                  type="checkbox"
                  name="vibes"
                  value={vibe.title}
                  className="h-4 w-4 accent-jam"
                  defaultChecked={session.vibes.includes(vibe.title)}
                />
                <span>{vibe.title}</span>
              </label>
            ))}
            <div className="pt-1">
              <SaveButton />
            </div>
            {state.error ? <p className="text-sm font-semibold text-red-700">{state.error}</p> : null}
            {state.success ? <p className="text-sm font-semibold text-green-700">{state.success}</p> : null}
          </form>
        </section>
      </aside>

      <main className="space-y-4">
        <section className="rounded-[1.3rem] border-4 border-ink bg-blush p-5 shadow-[8px_8px_0_#2a1408]">
          <h3 className="font-display text-3xl uppercase">Upcoming Booked Events</h3>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {joinedEvents.length ? (
              joinedEvents.map((event) => (
                <article key={event.id} className="rounded-xl border-[3px] border-ink bg-cream p-3">
                  <p className="text-xs font-black uppercase tracking-wide text-jam">{event.theme}</p>
                  <h4 className="mt-1 font-display text-2xl uppercase leading-tight">{event.title}</h4>
                  <p className="text-sm font-semibold">{formatDateTime(event.dateTime)}</p>
                  <p className="text-sm">{event.location}</p>
                </article>
              ))
            ) : (
              <p className="rounded-xl border-2 border-ink bg-cream p-3 text-sm font-semibold">
                No booked events yet. Let&apos;s change that.
              </p>
            )}
          </div>
          <Link
            href="/events"
            className="mt-4 inline-flex rounded-full border-[3px] border-ink bg-lime px-4 py-2 text-xs font-black uppercase shadow-[4px_4px_0_#2a1408]"
          >
            Book another night
          </Link>
        </section>

        <section className="rounded-[1.3rem] border-4 border-ink bg-cream p-5 shadow-[8px_8px_0_#2a1408]">
          <h3 className="font-display text-3xl uppercase">Saved Memories</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {galleryMemories.map((memory) => (
              <article key={memory.id} className="rounded-xl border-[3px] border-ink bg-chai/50 p-3">
                <p className="text-xs font-black uppercase tracking-wide text-jam">{memory.event}</p>
                <h4 className="mt-1 text-lg font-bold">{memory.title}</h4>
                <p className="text-sm">{memory.quote}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
