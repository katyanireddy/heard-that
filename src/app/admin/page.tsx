import { redirect } from "next/navigation";
import { EventCreateForm } from "@/components/admin/event-create-form";
import { SectionTitle } from "@/components/ui/section-title";
import { getInquiries } from "@/lib/collab-store";
import { getCommunityNotes } from "@/lib/community-store";
import { getSentEmailLog } from "@/lib/email";
import { getBookings, getEvents } from "@/lib/events-store";
import { adminDeleteCommunityNoteAction, adminDeleteEventAction } from "@/lib/server-actions";
import { getSession } from "@/lib/session";
import { formatDateTime } from "@/lib/utils";

export default async function AdminPage() {
  const session = await getSession();
  if (!session || session.role !== "admin") redirect("/login");

  const [events, bookings, notes, inquiries, emails] = [
    getEvents(),
    getBookings(),
    getCommunityNotes(),
    getInquiries(),
    getSentEmailLog(),
  ];

  return (
    <main className="px-4 py-12 md:px-8">
      <div className="mx-auto w-full max-w-7xl space-y-6">
        <SectionTitle
          eyebrow="Organizer Dashboard"
          title="Heard That Admin Control Room"
          description="Manage events, registrations, community wall moderation, collaborations, and announcement readiness."
        />

        <EventCreateForm />

        <section className="rounded-[1.3rem] border-4 border-ink bg-cream p-5 shadow-[8px_8px_0_#2a1408]">
          <h3 className="font-display text-3xl uppercase">Event Management</h3>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {events.map((event) => (
              <article key={event.id} className="rounded-xl border-[3px] border-ink bg-blush p-3">
                <p className="text-xs font-black uppercase tracking-wide text-jam">{event.theme}</p>
                <h4 className="font-display text-2xl uppercase leading-tight">{event.title}</h4>
                <p className="text-sm font-semibold">{formatDateTime(event.dateTime)}</p>
                <p className="text-sm">{event.seatsLeft}/{event.seatsTotal} spots left</p>
                <form action={adminDeleteEventAction} className="mt-2">
                  <input type="hidden" name="eventId" value={event.id} />
                  <button
                    type="submit"
                    className="rounded-full border-2 border-ink bg-cream px-3 py-1 text-xs font-black uppercase tracking-wide"
                  >
                    Delete Event
                  </button>
                </form>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[1.3rem] border-4 border-ink bg-aqua p-5 shadow-[8px_8px_0_#2a1408]">
          <h3 className="font-display text-3xl uppercase">Registrations & Tickets</h3>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[620px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className="border-2 border-ink bg-cream px-3 py-2 text-left">Attendee</th>
                  <th className="border-2 border-ink bg-cream px-3 py-2 text-left">Event</th>
                  <th className="border-2 border-ink bg-cream px-3 py-2 text-left">Ticket</th>
                  <th className="border-2 border-ink bg-cream px-3 py-2 text-left">Vibes</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="border-2 border-ink bg-white px-3 py-2">{booking.attendeeName}</td>
                    <td className="border-2 border-ink bg-white px-3 py-2">{booking.eventTitle}</td>
                    <td className="border-2 border-ink bg-white px-3 py-2 font-black">{booking.ticketCode}</td>
                    <td className="border-2 border-ink bg-white px-3 py-2">{booking.vibes.join(", ") || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-[1.2rem] border-4 border-ink bg-cream p-4 shadow-[6px_6px_0_#2a1408]">
            <h3 className="font-display text-2xl uppercase">Community Note Moderation</h3>
            <div className="mt-3 space-y-2">
              {notes.map((note) => (
                <article key={note.id} className="rounded-xl border-2 border-ink bg-blush p-3">
                  <p className="text-xs font-black uppercase tracking-wide text-jam">{note.author}</p>
                  <p className="text-sm">{note.message}</p>
                  <form action={adminDeleteCommunityNoteAction} className="mt-2">
                    <input type="hidden" name="noteId" value={note.id} />
                    <button className="rounded-full border-2 border-ink bg-cream px-3 py-1 text-xs font-black uppercase tracking-wide">
                      Remove
                    </button>
                  </form>
                </article>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[1.2rem] border-4 border-ink bg-cream p-4 shadow-[6px_6px_0_#2a1408]">
              <h3 className="font-display text-2xl uppercase">Collaboration Inquiries</h3>
              <div className="mt-3 space-y-2">
                {inquiries.length ? (
                  inquiries.map((item) => (
                    <article key={item.id} className="rounded-xl border-2 border-ink bg-chai/70 p-3">
                      <p className="text-xs font-black uppercase tracking-wide text-jam">{item.collaborationType}</p>
                      <p className="text-sm font-bold">{item.name} • {item.email}</p>
                      <p className="text-sm">{item.message}</p>
                    </article>
                  ))
                ) : (
                  <p className="text-sm font-semibold">No inquiries yet.</p>
                )}
              </div>
            </div>

            <div className="rounded-[1.2rem] border-4 border-ink bg-cream p-4 shadow-[6px_6px_0_#2a1408]">
              <h3 className="font-display text-2xl uppercase">Confirmation Email Log</h3>
              <div className="mt-3 space-y-2">
                {emails.length ? (
                  emails.map((mail) => (
                    <article key={`${mail.to}-${mail.sentAt}`} className="rounded-xl border-2 border-ink bg-lime/60 p-3">
                      <p className="text-sm font-bold">{mail.to}</p>
                      <p className="text-xs uppercase tracking-wide">{mail.subject}</p>
                    </article>
                  ))
                ) : (
                  <p className="text-sm font-semibold">No confirmation emails sent yet.</p>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
