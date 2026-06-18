"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleReset = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    const { error } =
      await supabase.auth.updateUser({
        password,
      });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setMessage(
      "Password updated successfully!"
    );

    setTimeout(() => {
      router.push("/login");
    }, 2000);

    setLoading(false);
  };

  return (
    <main className="mx-auto max-w-md px-4 py-20">
      <div className="rounded-[1.3rem] border-4 border-ink bg-cream p-6 shadow-[8px_8px_0_#2a1408]">
        <h1 className="font-display text-4xl uppercase">
          Reset Password
        </h1>

        <form
          onSubmit={handleReset}
          className="mt-4 space-y-4"
        >
          <div>
            <label className="text-sm font-black uppercase">
              New Password
            </label>

            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="mt-1 w-full rounded-xl border-2 border-ink bg-white px-3 py-2"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full border-[3px] border-ink bg-jam px-5 py-2 font-black uppercase text-cream"
          >
            {loading
              ? "Updating..."
              : "Update Password"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm font-semibold">
            {message}
          </p>
        )}
      </div>
    </main>
  );
}