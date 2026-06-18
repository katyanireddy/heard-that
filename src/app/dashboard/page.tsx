import { redirect } from "next/navigation";
import { MemberDashboard } from "@/components/dashboard/member-dashboard";
import { SectionTitle } from "@/components/ui/section-title";
import { getEvents } from "@/lib/events-store";
import { getSession } from "@/lib/session";
import { supabaseAdmin } from "@/lib/supabase-admin";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

const { data: profile } =
  await supabaseAdmin
    .from("profiles")
    .select("*")
    .eq("id", session.id)
    .single();
    

if (!profile) {
  redirect("/login");
}

  const events = await getEvents();
  const { data: userEvents } =
  await supabaseAdmin
    .from("user_events")
    .select("event_id")
    .eq("user_id", session.id);

const joinedIds =
  userEvents?.map(
    (item) => item.event_id
  ) || [];

const joinedEvents =
  events.filter((event) =>
    joinedIds.includes(event.id)
  );
 const { data: myMemories } =
  await supabaseAdmin
    .from("gallery_submissions")
    .select("*")
    .eq("user_id", session.id)
    .order("created_at", {
      ascending: false,
    });

  return (
    <main className="px-4 py-12 md:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <SectionTitle
          eyebrow="Member Dashboard"
          title="Your Heard That Space"
          description="Profile, vibe preferences, booked events, and memory cards in one scrapbook dashboard."
        />
        <div className="mt-8">
<MemberDashboard
  session={{
    ...session,
    vibes: profile.vibes || [],
    interests: profile.vibes || [],
  }}
  joinedEvents={joinedEvents}
  myMemories={myMemories || []}
/>
        </div>
      </div>
    </main>
  );
}
