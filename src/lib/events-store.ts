import "server-only";

import { randomUUID } from "node:crypto";
import { events } from "@/lib/data";
import { Booking, EventItem, VibeTag } from "@/lib/types";

const eventStore: EventItem[] = structuredClone(events);
const bookings: Booking[] = [];

export function getEvents() {
  return eventStore.sort((a, b) =>
    new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime(),
  );
}

export function getEventBySlug(slug: string) {
  return eventStore.find((event) => event.slug === slug);
}

export function getEventById(id: string) {
  return eventStore.find((event) => event.id === id);
}

export function getBookings() {
  return [...bookings].sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function createBooking(input: {
  eventId: string;
  attendeeName: string;
  attendeeEmail: string;
  vibes: VibeTag[];
  note?: string;
  userId?: string;
}) {
  const event = getEventById(input.eventId);
  if (!event) return { error: "Event not found." as const };
  if (event.seatsLeft <= 0) return { error: "No spots left for this event." as const };

  event.seatsLeft = Math.max(0, event.seatsLeft - 1);

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

  bookings.unshift(booking);
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
