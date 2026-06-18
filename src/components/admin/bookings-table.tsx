"use client";

import { useMemo, useState } from "react";

export default function BookingsTable({
  bookings,
  events,
}: {
  bookings: any[];
  events: any[];
}) {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [search, setSearch] = useState("");

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesEvent =
        !selectedEvent ||
        booking.eventTitle === selectedEvent;

      const matchesSearch =
        !search ||
        booking.attendeeEmail
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        booking.paymentId
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesDate =
        !selectedDate ||
        booking.createdAt
          ?.slice(0, 10) === selectedDate;

      return (
        matchesEvent &&
        matchesSearch &&
        matchesDate
      );
    });
  }, [
    bookings,
    selectedEvent,
    selectedDate,
    search,
  ]);

  return (
    <>
      <div className="mb-4 flex flex-wrap gap-3">

        <select
          value={selectedEvent}
          onChange={(e) =>
            setSelectedEvent(e.target.value)
          }
          className="rounded-xl border-2 border-ink px-3 py-2"
        >
          <option value="">
            All Events
          </option>

          {events.map((event) => (
            <option
              key={event.id}
              value={event.title}
            >
              {event.title}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) =>
            setSelectedDate(e.target.value)
          }
          className="rounded-xl border-2 border-ink px-3 py-2"
        />

        <input
          placeholder="Email / Payment ID"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="rounded-xl border-2 border-ink px-3 py-2 min-w-[250px]"
        />

        <button
  type="button"
  onClick={() => {
    setSelectedEvent("");
    setSelectedDate("");
    setSearch("");
  }}
  className="rounded-xl border-2 border-ink bg-blush px-10 py-2 font-black uppercase"
>
  Reset Filters
</button>

      </div>

      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className="border-2 border-ink p-2">
              Attendee
            </th>
            <th className="border-2 border-ink p-2">
              Email
            </th>
            <th className="border-2 border-ink p-2">
              Event
            </th>
            <th className="border-2 border-ink p-2">
              Ticket
            </th>
            <th className="border-2 border-ink p-2">
              Payment ID
            </th>
            <th className="border-2 border-ink p-2">
              Status
            </th>
            <th className="border-2 border-ink p-2">
              Amount
            </th>
            <th className="border-2 border-ink p-2">
              Date
            </th>
          </tr>
        </thead>

        <tbody>
          {filteredBookings.map((booking) => (
            <tr key={booking.id}>
              <td className="border-2 border-ink p-2">
                {booking.attendeeName}
              </td>

              <td className="border-2 border-ink p-2">
                {booking.attendeeEmail}
              </td>

              <td className="border-2 border-ink p-2">
                {booking.eventTitle}
              </td>

              <td className="border-2 border-ink p-2 font-bold">
                {booking.ticketCode}
              </td>

              <td className="border-2 border-ink p-2 text-xs">
                {booking.paymentId}
              </td>

              <td className="border-2 border-ink p-2">
                {booking.paymentStatus}
              </td>

              <td className="border-2 border-ink p-2">
                ₹{booking.amount}
              </td>

              <td className="border-2 border-ink p-2">
                {new Intl.DateTimeFormat(
  "en-GB",
  {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }
).format(
  new Date(booking.createdAt)
)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}