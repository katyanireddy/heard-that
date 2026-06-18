import "server-only";

import { randomUUID } from "node:crypto";
import { events } from "@/lib/data";
import { Booking, EventItem, VibeTag } from "@/lib/types";
import { supabaseAdmin } from "@/lib/supabase-admin";

const eventStore: EventItem[] = structuredClone(events);
const bookings: Booking[] = [];

export async function getEvents() {
  const { data, error } = await supabaseAdmin
    .from("events")
    .select("*");

 console.log("COUNT =", data?.length);
console.log("FIRST =", data?.[0]);
console.log("SERVICE KEY EXISTS =", !!process.env.SUPABASE_SERVICE_ROLE_KEY);

 return (data ?? []).map((event) => ({
  id: event.id,
  title: event.title,
  slug: event.slug,
  description: event.description,
  location: event.location,
  dateTime: event.date_time,
  seatsTotal: event.seats_total,
  seatsLeft: event.seats_left,
  theme: event.theme,
  priceInr: event.price,
  is_closed: event.is_closed,

  tags: ["community"],
  mood: "Cozy Conversations",
  emoji: "☕",
  coverImage: "",
}));
}

export function getEventBySlug(slug: string) {
  return eventStore.find((event) => event.slug === slug);
}

export async function getEventById(id: string) {
  const { data } = await supabaseAdmin
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) return null;

  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    description: data.description,
    location: data.location,
    dateTime: data.date_time,
    seatsTotal: data.seats_total,
    seatsLeft: data.seats_left,
    theme: data.theme,
    priceInr: data.price,
    tags: ["community"],
    mood: "Cozy Conversations",
    emoji: "☕",
    coverImage: "",
  };
}

export async function getBookings() {
  const { data, error } = await supabaseAdmin
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

return data.map((booking) => ({
  id: booking.id,
  eventId: booking.event_id,
  attendeeName: booking.attendee_name,
  attendeeEmail: booking.attendee_email,
  eventTitle: booking.event_title || "Event",
  ticketCode: booking.ticket_code,

  
  paymentId: booking.payment_id,
  paymentStatus: booking.payment_status,

  amount: booking.amount,

  vibes: booking.vibes || [],

  note: booking.note,
  createdAt: booking.created_at,
}));
}

export async function createBooking(input: {
  eventId: string;
  attendeeName: string;
  attendeeEmail: string;
  vibes: VibeTag[];
  note?: string;
  userId?: string;
  paymentId: string;
  amount: number;
}) {
  
  const event = await getEventById(input.eventId);

  if (!event)
    return { error: "Event not found." as const };

  if (event.seatsLeft <= 0)
    return { error: "No spots left for this event." as const };

  const booking: Booking = {
    id: `book_${randomUUID().slice(0, 8)}`,
    eventId: input.eventId,
    eventTitle: event.title,
    attendeeName: input.attendeeName,
    attendeeEmail: input.attendeeEmail.toLowerCase(),
    vibes: input.vibes,
    note: input.note,
    userId: input.userId,
    createdAt: new Date().toISOString(),
    ticketCode: `HT-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
  };

  // SAVE BOOKING IN SUPABASE
  await supabaseAdmin
  .from("bookings")
  .insert({
    event_id: booking.eventId,
    event_title: booking.eventTitle,
    attendee_name: booking.attendeeName,
    attendee_email: booking.attendeeEmail,
    vibes: booking.vibes,
    note: booking.note,
    ticket_code: booking.ticketCode,

    payment_id: input.paymentId,
    payment_status: "paid",
    amount: input.amount,
  });

  // UPDATE SEATS
  await supabaseAdmin
    .from("events")
    .update({
      seats_left: event.seatsLeft - 1,
    })
    .eq("id", event.id);

  return { booking, event };
}

export function upsertEvent(input: EventItem) {
  const index = eventStore.findIndex((event) => event.id === input.id);
  if (index >= 0) {
    eventStore[index] = input;
    return;
  }
  eventStore.push(input);
}

export function deleteEvent(id: string) {
  const index = eventStore.findIndex((event) => event.id === id);
  if (index >= 0) {
    eventStore.splice(index, 1);
  }
}
