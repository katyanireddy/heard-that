"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { loginAction } from "@/lib/server-actions";

const initialState = {
  error: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="w-full rounded-full border-[3px] border-ink bg-jam px-5 py-2 text-sm font-black uppercase tracking-wide text-cream shadow-[4px_4px_0_#2a1408]"
      disabled={pending}
    >
      {pending ? "Logging in..." : "Log in"}
    </button>
  );
}

export function LoginForm() {
  const [state, action] = useActionState(loginAction, initialState);

  return (
    <form action={action} className="space-y-3 rounded-[1.2rem] border-4 border-ink bg-cream p-5 shadow-[8px_8px_0_#2a1408]">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-jam">Community Login</p>
      <h1 className="font-display text-4xl uppercase">Welcome back</h1>

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
          className="mt-1 w-full rounded-xl border-2 border-ink bg-white px-3 py-2 text-sm"
        />
      </div>

      <SubmitButton />
      {state.error ? <p className="rounded-lg bg-red-100 px-3 py-2 text-sm font-semibold text-red-700">{state.error}</p> : null}

      <p className="text-sm font-semibold">
        New here?{" "}
        <Link className="underline decoration-2" href="/signup">
          Create account
        </Link>
      </p>
      <div className="mt-2 text-right">
  <Link
    href="/forgot-password"
    className="text-sm underline"
  >
    Forgot Password?
  </Link>
</div>
<p className="text-xs text-neutral-600">
  Admin Login:
  admin@heardthat.in
</p>
    </form>
  );
}
