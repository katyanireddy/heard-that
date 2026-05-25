import { CommunityPreview } from "@/components/home/community-preview";
import { EventsBento } from "@/components/home/events-bento";
import { HeroSection } from "@/components/home/hero-section";
import { MapSection } from "@/components/home/map-section";
import { NostalgiaSection } from "@/components/home/nostalgia-section";
import { TonightVibe } from "@/components/home/tonight-vibe";
import { VibeSelector } from "@/components/home/vibe-selector";
import { CharacterLounge } from "@/components/home/character-lounge";
import { getCommunityNotes } from "@/lib/community-store";
import { getEvents } from "@/lib/events-store";
import { getSession } from "@/lib/session";

export default async function HomePage() {
  const [events, notes, session] = await Promise.all([getEvents(), getCommunityNotes(), getSession()]);
  const latestEvent = events[0];

  return (
    <>
      <HeroSection event={latestEvent} />
      <EventsBento events={events} />
      <VibeSelector loggedIn={Boolean(session)} />
      <TonightVibe />
      <CharacterLounge />
      <NostalgiaSection />
      <CommunityPreview notes={notes} loggedIn={Boolean(session)} />
      <MapSection />
    </>
  );
}
