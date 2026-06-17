"use client";

import { useActionState } from "react";
import { forgotPasswordAction } from "@/lib/server-actions";

const initialState = {
  error: "",
  success: "",
};

export default function ForgotPasswordPage() {
  const [state, action] = useActionState(
    forgotPasswordAction,
    initialState
  );

  return (
    <main className="px-4 py-16">
      <div className="mx-auto max-w-md">
        <div className="rounded-[2rem] border-4 border-ink bg-cream p-8 shadow-[8px_8px_0_#2a1408]">

          <p className="text-xs font-black uppercase tracking-[0.2em] text-jam">
            Account Recovery
          </p>

          <h1 className="mt-2 font-display text-5xl uppercase">
            Forgot Password
          </h1>

          <p className="mt-3 text-sm">
            Enter your email and we'll send you a reset link.
          </p>

          <form action={action} className="mt-6 space-y-4">

            <div>
              <label className="text-sm font-black uppercase">
                Email
              </label>

              <input
                type="email"
                name="email"
                required
                className="mt-2 w-full rounded-xl border-2 border-ink bg-white px-4 py-3"
                placeholder="you@example.com"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full border-[3px] border-ink bg-jam px-5 py-3 font-black uppercase text-cream shadow-[4px_4px_0_#2a1408]"
            >
              Send Reset Link
            </button>

            {state.success && (
              <p className="rounded-lg bg-lime p-3 text-sm">
                {state.success}
              </p>
            )}

            {state.error && (
              <p className="rounded-lg bg-red-100 p-3 text-sm text-red-700">
                {state.error}
              </p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}