import { redirect } from "next/navigation";
import { MemberDashboard } from "@/components/dashboard/member-dashboard";
import { SectionTitle } from "@/components/ui/section-title";
import { getEvents } from "@/lib/events-store";
import { getSession } from "@/lib/session";
import { findUserById } from "@/lib/user-store";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const user = findUserById(session.id);
  if (!user) redirect("/login");

  const events = getEvents();
  const joinedEvents = events.filter((event) => user.joinedEventIds.includes(event.id));

  return (
    <main className="px-4 py-12 md:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <SectionTitle
          eyebrow="Member Dashboard"
          title="Your Heard That Space"
          description="Profile, vibe preferences, booked events, and memory cards in one scrapbook dashboard."
        />
        <div className="mt-8">
          <MemberDashboard session={session} joinedEvents={joinedEvents} />
        </div>
      </div>
    </main>
  );
}
