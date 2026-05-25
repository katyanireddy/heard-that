"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { vibes } from "@/lib/data";
import { signupAction } from "@/lib/server-actions";

const initialState = {
  error: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="w-full rounded-full border-[3px] border-ink bg-lime px-5 py-2 text-sm font-black uppercase tracking-wide shadow-[4px_4px_0_#2a1408]"
      disabled={pending}
    >
      {pending ? "Creating..." : "Create account"}
    </button>
  );
}

export function SignupForm() {
  const [state, action] = useActionState(signupAction, initialState);

  return (
    <form action={action} className="space-y-3 rounded-[1.2rem] border-4 border-ink bg-cream p-5 shadow-[8px_8px_0_#2a1408]">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-jam">Join Heard That?</p>
      <h1 className="font-display text-4xl uppercase">Make friends offline</h1>

      <div>
        <label htmlFor="name" className="text-sm font-black uppercase tracking-wide">
          Name
        </label>
        <input id="name" name="name" required className="mt-1 w-full rounded-xl border-2 border-ink bg-white px-3 py-2 text-sm" />
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
          className="mt-1 w-full rounded-xl border-2 border-ink bg-white px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label htmlFor="password" className="text-sm font-black uppercase tracking-wide">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={6}
          className="mt-1 w-full rounded-xl border-2 border-ink bg-white px-3 py-2 text-sm"
        />
      </div>

      <div>
        <p className="text-sm font-black uppercase tracking-wide">Pick your vibe(s)</p>
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {vibes.map((vibe) => (
            <label key={vibe.title} className="flex items-center gap-2 rounded-xl border-2 border-ink bg-blush/50 px-3 py-2 text-sm font-semibold">
              <input type="checkbox" name="vibes" value={vibe.title} className="h-4 w-4 accent-jam" />
              <span>{vibe.title}</span>
            </label>
          ))}
        </div>
      </div>

      <SubmitButton />
      {state.error ? <p className="rounded-lg bg-red-100 px-3 py-2 text-sm font-semibold text-red-700">{state.error}</p> : null}

      <p className="text-sm font-semibold">
        Already in?{" "}
        <Link className="underline decoration-2" href="/login">
          Log in
        </Link>
      </p>
    </form>
  );
}
