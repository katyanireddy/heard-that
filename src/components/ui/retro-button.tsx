import Link from "next/link";
import { cn } from "@/lib/utils";

export function RetroButton({
  href,
  label,
  variant = "primary",
  className,
}: {
  href: string;
  label: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}) {
  const styles = {
    primary: "bg-lime text-ink hover:bg-aqua",
    secondary: "bg-jam text-cream hover:bg-violet",
    ghost: "bg-cream text-ink hover:bg-chai",
  }[variant];

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full border-[3px] border-ink px-5 py-2 text-sm font-black uppercase tracking-wide shadow-[4px_4px_0_#2a1408] transition hover:-translate-y-0.5",
        styles,
        className,
      )}
    >
      {label}
    </Link>
  );
}
