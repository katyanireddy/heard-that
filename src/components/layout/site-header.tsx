import Link from "next/link";
import Image from "next/image";
import { logoutAction } from "@/lib/server-actions";
import { getSession } from "@/lib/session";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Upcoming" },
  { href: "/gallery", label: "Gallery" },
  { href: "/community", label: "Community Wall" },
  { href: "/collab", label: "Collab" },
  { href: "/about", label: "About" },
];

export async function SiteHeader() {
  const session = await getSession();

  return (
    <header className="sticky top-0 z-50 border-b-4 border-ink bg-gradient-to-r from-mango via-chai to-aqua">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-full border-[3px] border-ink bg-jam px-3 py-2 text-lg font-black text-cream shadow-[4px_4px_0_#2a1408]">
            <Image
              src="/logoheardthat.png"
              alt="Heard That logo"
              width={32}
              height={32}
              className="h-8 w-8 rounded-full border-2 border-cream object-cover"
            />
            <span>Heard That?</span>
          </div>
        </Link>

        <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold text-ink md:text-base">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border-2 border-ink bg-cream px-3 py-1 transition hover:-translate-y-0.5 hover:bg-lime"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {session ? (
            <>
              <Link
                href={session.role === "admin" ? "/admin" : "/dashboard"}
                className="rounded-full border-2 border-ink bg-violet px-3 py-1 text-sm font-bold text-cream transition hover:-translate-y-0.5"
              >
                {session.role === "admin" ? "Organizer" : "Dashboard"}
              </Link>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="rounded-full border-2 border-ink bg-cream px-3 py-1 text-sm font-bold transition hover:-translate-y-0.5 hover:bg-blush"
                >
                  Log out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/signup"
                className="rounded-full border-2 border-ink bg-lime px-3 py-1 text-sm font-bold transition hover:-translate-y-0.5"
              >
                Sign up
              </Link>
              <Link
                href="/login"
                className="rounded-full border-2 border-ink bg-cream px-3 py-1 text-sm font-bold transition hover:-translate-y-0.5"
              >
                Log in
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
