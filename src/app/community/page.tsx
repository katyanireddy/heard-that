import { CommunityWall } from "@/components/community/community-wall";
import { SectionTitle } from "@/components/ui/section-title";
import { getCommunityNotes } from "@/lib/community-store";
import { getSession } from "@/lib/session";

export default async function CommunityPage() {
  const [notes, session] = await Promise.all([getCommunityNotes(), getSession()]);

  return (
    <main className="px-4 py-12 md:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <SectionTitle
          eyebrow="Community"
          title="Floating Community Wall"
          description="Sticky-note board for notes, thoughts, memories, and anonymous confessions."
        />

        <div className="mt-8">
          <CommunityWall notes={notes} canPost={Boolean(session)} />
        </div>
      </div>
    </main>
  );
}
