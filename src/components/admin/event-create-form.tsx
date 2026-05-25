"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { adminUpsertEventAction } from "@/lib/server-actions";

const initialState = {
  error: "",
  success: "",
};

function AddButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="rounded-full border-[3px] border-ink bg-lime px-5 py-2 text-xs font-black uppercase tracking-wide shadow-[4px_4px_0_#2a1408]"
      disabled={pending}
    >
      {pending ? "Adding..." : "Add Event"}
    </button>
  );
}

export function EventCreateForm() {
  const [state, action] = useActionState(adminUpsertEventAction, initialState);

  return (
    <form action={action} className="rounded-[1.2rem] border-4 border-ink bg-cream p-4 shadow-[6px_6px_0_#2a1408]">
      <h3 className="font-display text-2xl uppercase">Add New Event</h3>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <input name="title" required placeholder="Title" className="rounded-xl border-2 border-ink bg-white px-3 py-2 text-sm" />
        <input name="location" required placeholder="Location" className="rounded-xl border-2 border-ink bg-white px-3 py-2 text-sm" />
        <input name="dateTime" type="datetime-local" required className="rounded-xl border-2 border-ink bg-white px-3 py-2 text-sm" />
        <input name="emoji" placeholder="Emoji (🎉)" className="rounded-xl border-2 border-ink bg-white px-3 py-2 text-sm" />
        <input name="seatsTotal" type="number" min={1} placeholder="Total seats" className="rounded-xl border-2 border-ink bg-white px-3 py-2 text-sm" />
        <input name="seatsLeft" type="number" min={0} placeholder="Seats left" className="rounded-xl border-2 border-ink bg-white px-3 py-2 text-sm" />
        <input name="priceInr" type="number" min={100} placeholder="Price INR" className="rounded-xl border-2 border-ink bg-white px-3 py-2 text-sm" />
        <input name="theme" placeholder="Theme" className="rounded-xl border-2 border-ink bg-white px-3 py-2 text-sm" />
        <input name="mood" placeholder="Mood" className="rounded-xl border-2 border-ink bg-white px-3 py-2 text-sm md:col-span-2" />
        <input name="tags" placeholder="Tags comma separated" className="rounded-xl border-2 border-ink bg-white px-3 py-2 text-sm md:col-span-2" />
      </div>
      <textarea
        name="description"
        required
        rows={3}
        placeholder="Description"
        className="mt-3 w-full rounded-xl border-2 border-ink bg-white px-3 py-2 text-sm"
      />
      <div className="mt-3 flex items-center gap-3">
        <AddButton />
        {state.error ? <p className="text-sm font-semibold text-red-700">{state.error}</p> : null}
        {state.success ? <p className="text-sm font-semibold text-green-700">{state.success}</p> : null}
      </div>
    </form>
  );
}
