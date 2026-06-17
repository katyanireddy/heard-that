import { NextResponse } from "next/server";
import { sendConfirmationEmail } from "@/lib/email";
import { createBooking } from "@/lib/events-store";
import { VibeTag } from "@/lib/types";

export async function POST(request: Request) {
  const body = await request.json();
  const { eventId, attendeeName, attendeeEmail, vibes, note } = body;

  if (!eventId || !attendeeName || !attendeeEmail) {
    return NextResponse.json({ error: "Missing required booking fields." }, { status: 400 });
  }

const result = await createBooking({
  eventId,
  attendeeName,
  attendeeEmail,
  vibes,
  note,
  paymentId: "manual",
  amount: 0,
});

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  await sendConfirmationEmail({
    to: attendeeEmail,
    subject: `Heard That? Ticket Confirmed • ${result.event.title}`,
    html: `<p>Your ticket code is <b>${result.booking.ticketCode}</b>.</p>`,
  });

  return NextResponse.json({ booking: result.booking }, { status: 201 });
}
