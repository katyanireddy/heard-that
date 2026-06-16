"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export function WhatsAppFloat() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Popup */}
      {open && (
        <div className="fixed bottom-24 right-6 z-[999] w-[320px] rounded-[1.5rem] border-4 border-ink bg-cream p-5 shadow-[8px_8px_0_#2a1408]">
          <button
            onClick={() => setOpen(false)}
            className="absolute right-3 top-2"
          >
            <X size={18} />
          </button>

          <p className="font-script text-2xl text-jam">
            Heard That?
          </p>

          <h3 className="mt-2 font-display text-2xl uppercase">
            Join The Community
          </h3>

          <p className="mt-2 text-sm">
            Meet movie yappers, board game goblins, cafe hoppers,
            overthinkers and future best friends.
          </p>

          <p className="mt-3 text-xs italic text-jam">
            currently assembling emotionally unstable extroverts...
          </p>

          <a
            href="https://chat.whatsapp.com/CaV0E4v0Ja60kXTeFkH9FB?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQPOTM2NjE5NzQzMzkyNDU5AAGnCfq7HCx8sOsIeWab2xggrlOWjHp2myzKlysigIsHDKSw9e779zuZ-fBkCys_aem_zXLKYf7m9fbJM5EGFo2J8"
            target="_blank"
            rel="noreferrer"
            className="mt-4 flex w-full items-center justify-center rounded-full border-2 border-ink bg-[#25D366] px-4 py-3 font-black text-white shadow-[4px_4px_0_#2a1408]"
          >
            Join WhatsApp →
          </a>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-[999] flex h-16 w-16 items-center justify-center rounded-full border-4 border-ink bg-[#25D366] shadow-[6px_6px_0_#2a1408] transition-all hover:scale-110"
      >
        <MessageCircle className="h-8 w-8 text-white" />
      </button>
    </>
  );
}