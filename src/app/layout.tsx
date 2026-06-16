import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { CursorGlow } from "@/components/motion/cursor-glow";
import { PageTransition } from "@/components/motion/page-transition";
import "./globals.css";
import { WhatsAppFloat } from "@/components/ui/whatsapp-float";

export const metadata: Metadata = {
  title: "Heard That? | Bangalore Community",
  description:
    "A playful, nostalgia-powered Bangalore community platform where strangers become friends through curated events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="relative flex min-h-full flex-col bg-cream text-ink">
        <CursorGlow />
        <div className="fixed inset-0 -z-10 retro-grid" />
        <SiteHeader />
        <PageTransition>{children}</PageTransition>
        <SiteFooter />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
