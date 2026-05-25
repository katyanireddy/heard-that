"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createCommunityNoteAction } from "@/lib/server-actions";
import { CommunityNote } from "@/lib/types";

const initialState = {
  error: "",
  success: "",
};

function PostButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full border-[3px] border-ink bg-jam px-5 py-2 text-sm font-black uppercase tracking-wide text-cream shadow-[4px_4px_0_#2a1408] transition hover:-translate-y-0.5 disabled:opacity-60"
    >
      {pending ? "Posting..." : "Pin Note"}
    </button>
  );
}

export function CommunityWall({ notes, canPost }: { notes: CommunityNote[]; canPost: boolean }) {
  const [state, action] = useActionState(createCommunityNoteAction, initialState);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-[1.3rem] border-4 border-ink bg-cream p-5 shadow-[8px_8px_0_#2a1408]">
        <h3 className="font-display text-3xl uppercase">Drop a sticky note</h3>
        <p className="mt-2 text-sm">
          Share a thought, memory, mini confession, or post-event feeling. Keep it kind, playful, and real.
        </p>

        {canPost ? (
          <form action={action} className="mt-4 space-y-3">
            <div>
              <label htmlFor="message" className="text-sm font-black uppercase tracking-wide">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="mt-1 w-full rounded-xl border-2 border-ink bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet"
                placeholder="Something wholesome or hilariously specific"
              />
            </div>
            <div>
              <label htmlFor="image" className="text-sm font-black uppercase tracking-wide">
                Image URL (optional)
              </label>
              <input
                id="image"
                name="image"
                className="mt-1 w-full rounded-xl border-2 border-ink bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet"
                placeholder="https://..."
              />
            </div>
            <label className="inline-flex items-center gap-2 text-sm font-semibold">
              <input type="checkbox" name="anonymous" className="h-4 w-4 accent-jam" />
              Post anonymously
            </label>

            <PostButton />
            {state.error ? <p className="rounded-lg bg-red-100 px-3 py-2 text-sm font-semibold text-red-700">{state.error}</p> : null}
            {state.success ? <p className="rounded-lg bg-lime px-3 py-2 text-sm font-semibold">{state.success}</p> : null}
          </form>
        ) : (
          <p className="mt-4 rounded-xl border-2 border-ink bg-blush p-3 text-sm font-semibold">
            Log in to post on the wall. Browsing is open to everyone.
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {notes.map((note, index) => (
          <article
            key={note.id}
            className="relative rounded-[1rem] border-[3px] border-ink bg-[color:var(--note-color)] p-4 shadow-[5px_5px_0_#2a1408]"
            style={{
              transform: `rotate(${index % 2 === 0 ? -1.6 : 1.8}deg)`,
              ["--note-color" as string]: index % 3 === 0 ? "#fff2b7" : index % 3 === 1 ? "#c0f8ff" : "#ffd8ea",
            }}
          >
            <p className="text-xs font-black uppercase tracking-[0.14em] text-jam">{note.author}</p>
            <p className="mt-2 text-sm leading-relaxed">{note.message}</p>
            {note.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={note.image}
                alt="Community submission"
                className="mt-3 h-32 w-full rounded-lg border-2 border-ink object-cover"
              />
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
