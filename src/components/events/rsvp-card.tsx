"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { vibes } from "@/lib/data";
import { bookEventAction } from "@/lib/server-actions";
import { EventItem } from "@/lib/types";
import { TicketReveal } from "@/components/events/ticket-reveal";

const initialState = {
  error: "",
  success: "",
  ticketCode: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-full border-[3px] border-ink bg-jam px-5 py-2 text-sm font-black uppercase tracking-wide text-cream shadow-[4px_4px_0_#2a1408] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? <Loader2 className="animate-spin" size={16} /> : "Get My Ticket"}
    </button>
  );
}

export function RsvpCard({ event }: { event: EventItem }) {
  const [state, action] = useActionState(bookEventAction, initialState);

  return (
    <div className="space-y-5">
      <form action={action} className="space-y-4 rounded-[1.3rem] border-4 border-ink bg-cream p-5 shadow-[8px_8px_0_#2a1408]">
        <input type="hidden" name="eventId" value={event.id} />

        <div>
          <label htmlFor="attendeeName" className="text-sm font-black uppercase tracking-wide">
            Your name
          </label>
          <input
            id="attendeeName"
            name="attendeeName"
            required
            className="mt-1 w-full rounded-xl border-2 border-ink bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet"
            placeholder="Name"
          />
        </div>

        <div>
          <label htmlFor="attendeeEmail" className="text-sm font-black uppercase tracking-wide">
            Email
          </label>
          <input
            id="attendeeEmail"
            name="attendeeEmail"
            type="email"
            required
            className="mt-1 w-full rounded-xl border-2 border-ink bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <p className="text-sm font-black uppercase tracking-wide">Choose your vibes</p>
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {vibes.map((vibe) => (
              <label
                key={vibe.title}
                className="flex items-center gap-2 rounded-xl border-2 border-ink bg-blush/50 px-3 py-2 text-sm font-semibold"
              >
                <input type="checkbox" name="vibes" value={vibe.title} className="h-4 w-4 accent-jam" />
                <span>{vibe.title}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="note" className="text-sm font-black uppercase tracking-wide">
            Extra note (optional)
          </label>
          <textarea
            id="note"
            name="note"
            rows={3}
            className="mt-1 w-full rounded-xl border-2 border-ink bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet"
            placeholder="Food preferences, accessibility, or just say hi"
          />
        </div>

        <SubmitButton />

        {state.error ? <p className="rounded-lg bg-red-100 px-3 py-2 text-sm font-semibold text-red-700">{state.error}</p> : null}
        {state.success ? <p className="rounded-lg bg-lime px-3 py-2 text-sm font-bold">{state.success}</p> : null}
      </form>

      {state.ticketCode ? <TicketReveal ticketCode={state.ticketCode} eventTitle={event.title} /> : null}
    </div>
  );
}
