"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { collaborationTypes } from "@/lib/data";
import { createCollaborationAction } from "@/lib/server-actions";

const initialState = {
  error: "",
  success: "",
};

function SendButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full border-[3px] border-ink bg-jam px-5 py-2 text-sm font-black uppercase tracking-wide text-cream shadow-[4px_4px_0_#2a1408] transition hover:-translate-y-0.5 disabled:opacity-60"
    >
      {pending ? "Cooking..." : "Let's Cook"}
    </button>
  );
}

export function CollabForm() {
  const [state, action] = useActionState(createCollaborationAction, initialState);

  return (
    <form action={action} className="rounded-[1.3rem] border-4 border-ink bg-cream p-5 shadow-[8px_8px_0_#2a1408]">
      <h3 className="font-display text-3xl uppercase leading-tight">Pitch It To Us</h3>
      <p className="mt-1 text-sm font-semibold">Drop your idea. We&apos;ll get back with chai and excitement.</p>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-black uppercase tracking-wide">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            className="mt-1 w-full rounded-xl border-2 border-ink bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-black uppercase tracking-wide">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-xl border-2 border-ink bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet"
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="org" className="text-sm font-black uppercase tracking-wide">
          Brand / Org Name (optional)
        </label>
        <input
          id="org"
          name="org"
          className="mt-1 w-full rounded-xl border-2 border-ink bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet"
        />
      </div>

      <div className="mt-3">
        <label htmlFor="collaborationType" className="text-sm font-black uppercase tracking-wide">
          Collaboration Type
        </label>
        <select
          id="collaborationType"
          name="collaborationType"
          required
          className="mt-1 w-full rounded-xl border-2 border-ink bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet"
          defaultValue=""
        >
          <option value="" disabled>
            Select one
          </option>
          {collaborationTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-3">
        <label htmlFor="message" className="text-sm font-black uppercase tracking-wide">
          Pitch It To Us
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="mt-1 w-full rounded-xl border-2 border-ink bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet"
          placeholder="Tell us what we should build together..."
        />
      </div>

      <div className="mt-4 flex items-center gap-3">
        <SendButton />
        {state.error ? <p className="text-sm font-semibold text-red-700">{state.error}</p> : null}
        {state.success ? <p className="text-sm font-semibold text-green-700">{state.success}</p> : null}
      </div>
    </form>
  );
}
