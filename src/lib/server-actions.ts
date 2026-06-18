"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { collaborationTypes } from "@/lib/data";
import { createInquiry } from "@/lib/collab-store";
import { createCommunityNote, deleteCommunityNote } from "@/lib/community-store";
import { sendConfirmationEmail } from "@/lib/email";
import { createBooking, deleteEvent, getEventById, upsertEvent, getEvents} from "@/lib/events-store";
import { clearSession, getSession, setSession } from "@/lib/session";
import { EventItem, VibeTag } from "@/lib/types";
import { toSlug } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabase-admin";
import QRCode from "qrcode";





type FormState = {
  error?: string;
  success?: string;
  ticketCode?: string;
};

const vibeSet = new Set<VibeTag>([
  "Board Game Goblin",
  "Movie Yapper",
  "Cafe Hopper",
  "Psychology Overthinker",
  "Playlist Curator",
  "Sitcom Rewatch Addict",
  "2AM Philosopher",
]);

function parseVibes(formData: FormData) {
  return formData
    .getAll("vibes")
    .map((value) => String(value))
    .filter((value): value is VibeTag => vibeSet.has(value as VibeTag));
}

export async function loginAction(_: FormState, formData: FormData): Promise<FormState> {
  console.log("LOGIN ACTION HIT");
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();

  if (!email || !password) {
    return { error: "Please enter both email and password." };
  }

 const { data, error } =
  await supabase.auth.signInWithPassword({
    email,
    password,
  });

if (error) {
  return {
    error: error.message,
  };
}
const { data: profile } =
  await supabaseAdmin
    .from("profiles")
    .select("*")
    .eq("id", data.user.id)
    .single();

    console.log("AUTH USER:", data.user);
console.log("PROFILE:", profile);
if (!profile) {
  return {
    error: "Profile not found. Please contact admin.",
  };
}

await setSession({
  id: data.user.id,
  name: profile.name,
  email: profile.email,
  role: profile.role,
  vibes: profile.vibes ?? [],
  interests: profile.vibes ?? [],
});

  redirect(
  profile.role === "admin"
    ? "/admin"
    : "/dashboard"
);
}

export async function signupAction(_: FormState, formData: FormData): Promise<FormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "").trim();
  const vibes = parseVibes(formData);

  if (!name || !email || !password) {
    return { error: "Name, email, and password are required." };
  }

  if (password.length < 6) {
    return { error: "Use at least 6 characters for the password." };
  }
  const { data: existingUser } =
  await supabaseAdmin
    .from("users")
    .select("id")
    .eq("email", email)
    .maybeSingle();


if (existingUser) {
  return {
    error: "Email already registered. Please login.",
  };
}

  const { data, error } =
  await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });

if (error) {
  return {
    error: error.message,
  };
}

if (data.user) {
  await supabaseAdmin
  .from("profiles")
  .insert({
    id: data.user.id,
    name,
    email,
    role: "member",
    vibes,
  });
}
return {
  success:
    "Account created successfully. Please login.",
};
}

export async function logoutAction() {
  await clearSession();
  redirect("/");
}

export async function updateMyVibesAction(
  _: FormState,
  formData: FormData
): Promise<FormState> {
  const session = await getSession();

  if (!session) {
    return {
      error: "Please log in first.",
    };
  }

  const selected = parseVibes(formData);

  const { error } = await supabaseAdmin
    .from("profiles")
    .update({
      vibes: selected,
    })
    .eq("id", session.id);

  if (error) {
    return {
      error: error.message,
    };
  }

  await setSession({
    ...session,
    vibes: selected,
    interests: selected,
  });

  return {
    success: "Vibes updated successfully.",
  };
}
export async function bookEventAction(_: FormState, formData: FormData): Promise<FormState> {

  const eventId = String(formData.get("eventId") ?? "");
  const attendeeName = String(formData.get("attendeeName") ?? "").trim();
  const attendeeEmail = String(formData.get("attendeeEmail") ?? "").trim().toLowerCase();
  const note = String(formData.get("note") ?? "").trim();
  const selectedVibes = parseVibes(formData);
const paymentId = String(
  formData.get("paymentId") ?? ""
);

const event = await getEventById(eventId);

if (!event) {
  return {
    error: "Event not found.",
  };
}
if (event.is_closed) {
  return {
    error: "This event is closed.",
  };
}
if (!paymentId) {
  return {
    error: "Payment not completed.",
  };
}

  if (!eventId || !attendeeName || !attendeeEmail) {
    return { error: "Please complete your name and email." };
  }

  
const session = await getSession();

const { data: existingBooking } =
  await supabaseAdmin
    .from("bookings")
    .select("id")
    .eq("event_id", eventId)
    .eq("attendee_email", attendeeEmail)
    .maybeSingle();

if (existingBooking) {
  return {
    error: "You have already booked this event.",
  };
}

const result = await createBooking({
  eventId,
  attendeeName,
  attendeeEmail,
  vibes: selectedVibes,
  note,
  userId: session?.id,
  paymentId,
  amount: event.priceInr,
});


  if ("error" in result) {
    return { error: result.error };
  }

  if (session?.id) {
  await supabaseAdmin
    .from("user_events")
    .insert({
      user_id: session.id,
      event_id: eventId,
    });
}

  const qrCode = await QRCode.toDataURL(
  JSON.stringify({
    ticket: result.booking.ticketCode,
    event: result.event.title,
    email: attendeeEmail,
  })
);

  await sendConfirmationEmail({
    to: attendeeEmail,
    subject: `Heard That? Ticket Confirmed • ${result.event.title}`,
    html: `
    
<div style="
background:#fff6e5;
padding:30px;
font-family:Arial,sans-serif;
">

<h2 style="margin-bottom:20px;">
🎉 You're In!
</h2>

<p>
Hi ${attendeeName},
your booking for
<b>${result.event.title}</b>
is confirmed.
</p>

<div style="
background:#ffffff;
border-radius:20px;
padding:20px;
border:3px dashed #6b2f2f;
max-width:500px;
margin-top:20px;
">

<h2>🎟 Heard That? Ticket</h2>

<p>
<b>Event:</b>
${result.event.title}
</p>

<p>
<b>Venue:</b>
${result.event.location}
</p>

<p>
<b>Date:</b>
${new Date(result.event.dateTime).toLocaleString("en-IN", {
  dateStyle: "full",
  timeStyle: "short",
  timeZone: "Asia/Kolkata",
})}
</p>

<div style="margin:20px 0;">
<img
  src="cid:ticketqr@heardthat"
  width="220"
  alt="Ticket QR"
/>
</div>

<div style="
background:#f5f5f5;
padding:12px;
text-align:center;
font-size:24px;
font-weight:bold;
border-radius:12px;
">
${result.booking.ticketCode}
</div>

</div>

<p style="margin-top:20px;">
Bring your cozy vibe.
We saved your spot ✨
</p>

</div>

    `,
    attachments: [
  {
    filename: "ticket-qr.png",
    path: qrCode,
  },
],
  });

  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath(`/events/${result.event.slug}`);
  revalidatePath("/dashboard");
  revalidatePath("/admin");

  return {
    success: "Booking confirmed. Ticket generated.",
    ticketCode: result.booking.ticketCode,
  };
}

export async function createCommunityNoteAction(_: FormState, formData: FormData): Promise<FormState> {
  const session = await getSession();
  if (!session) {
    return { error: "Login to post on the community wall." };
  }

  const message = String(formData.get("message") ?? "").trim();
  const anonymous = String(formData.get("anonymous") ?? "") === "on";
  const image = String(formData.get("image") ?? "").trim();

  if (!message) {
    return { error: "Please add a note before posting." };
  }

await createCommunityNote({
  author: session.name,
  message,
  anonymous,
  image: image || undefined,
});

  revalidatePath("/community");
  revalidatePath("/");
  revalidatePath("/admin");

  return { success: "Posted to the wall." };
}

export async function createCollaborationAction(_: FormState, formData: FormData): Promise<FormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const org = String(formData.get("org") ?? "").trim();
  const collaborationType = String(formData.get("collaborationType") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !collaborationType || !message) {
    return { error: "Please fill all required collaboration fields." };
  }

  if (!collaborationTypes.includes(collaborationType)) {
    return { error: "Pick one of the available collaboration types." };
  }

  const { error } = await supabaseAdmin
  .from("collaborations")
  .insert({
    name,
    email,
    org,
    collaboration_type: collaborationType,
    message,
  });

if (error) {
  return {
    error: error.message,
  };
}

  revalidatePath("/collab");
  revalidatePath("/admin");

  return { success: "Inquiry sent. Team Heard That? will reply soon." };
}

export async function adminDeleteEventAction(
  formData: FormData
) {
  const session = await getSession();

  if (!session || session.role !== "admin") {
    return;
  }

  const id = String(
    formData.get("eventId") ?? ""
  );

  if (!id) return;

  const { error } =
    await supabaseAdmin
      .from("events")
      .delete()
      .eq("id", id);

  if (error) {
    console.error(error);
    return;
  }

  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath("/admin");
}

export async function adminUpsertEventAction(_: FormState, formData: FormData): Promise<FormState> {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return { error: "Admin access required." };
  }

  const title = String(formData.get("title") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const dateTime = String(formData.get("dateTime") ?? "").trim();
  const seatsTotal = Number(String(formData.get("seatsTotal") ?? "0"));
  const seatsLeft = Number(String(formData.get("seatsLeft") ?? "0"));
  const priceInr = Number(String(formData.get("priceInr") ?? "0"));
  const description = String(formData.get("description") ?? "").trim();
  const mood = String(formData.get("mood") ?? "").trim();
  const theme = String(formData.get("theme") ?? "").trim();
  const emoji = String(formData.get("emoji") ?? "🎉").trim();
  const tags = String(formData.get("tags") ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  if (!title || !location || !dateTime || !description) {
    return { error: "Please fill all essential event fields." };
  }

  const id = `evt_${randomUUID().slice(0, 6)}`;
  const item: EventItem = {
    id,
    slug: toSlug(title),
    title,
    location,
    dateTime,
    seatsTotal: Number.isFinite(seatsTotal) && seatsTotal > 0 ? seatsTotal : 30,
    seatsLeft: Number.isFinite(seatsLeft) && seatsLeft >= 0 ? seatsLeft : 20,
    priceInr: Number.isFinite(priceInr) && priceInr > 0 ? priceInr : 699,
    description,
    mood: mood || "Community night",
    theme: theme || "Cozy conversations",
    emoji: emoji || "🎉",
    tags: tags.length ? tags : ["community"],
    coverImage:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
  };

  const { error } = await supabaseAdmin
  .from("events")
  .insert({
    title,
    slug: toSlug(title),
    description,
    date_time: dateTime,
    location,
    theme,
    price: priceInr,
    seats_total: seatsTotal,
    seats_left: seatsLeft,
  });

if (error) {
  console.error(error);
  return { error: error.message };
}
  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath("/admin");
  return { success: `${title} added.` };
}

export async function adminDeleteCommunityNoteAction(formData: FormData) {
  const session = await getSession();
  if (!session || session.role !== "admin") return;
  const noteId = String(formData.get("noteId") ?? "");
  if (!noteId) return;
  await deleteCommunityNote(noteId);
  revalidatePath("/community");
  revalidatePath("/admin");
}

export async function fetchEventForRoute(slug: string) {
  const events = await getEvents();
  return events.find((event) => event.slug === slug) ?? null;
}
export async function checkAdmin() {
  const session = await getSession();
  return session?.role === "admin";
}

export async function checkLoggedIn() {
  return Boolean(await getSession());
}

export async function currentUserSession() {
  return getSession();
}

export async function findEventByIdOrSlug(value: string) {
  const events = [getEventById(value)];
  const match = events.find(Boolean);
  if (match) return match;

  const all = await (await import("@/lib/events-store")).getEvents();
  return all.find((event) => event.slug === value) ?? null;
}




export async function approveMemoryAction(formData: FormData) {
  const id = String(formData.get("memoryId"));

  const { error } = await supabase
    .from("gallery_submissions")
    .update({
      status: "approved",
    })
    .eq("id", id);

  if (error) {
    console.error(error);
  }

  revalidatePath("/admin");
  revalidatePath("/gallery");
}

export async function rejectMemoryAction(formData: FormData) {
  const id = String(formData.get("memoryId"));

  const { error } = await supabase
    .from("gallery_submissions")
    .update({
      status: "rejected",
    })
    .eq("id", id);

  if (error) {
    console.error(error);
  }

  revalidatePath("/admin");
  revalidatePath("/gallery");
}
export async function deleteMemoryAction(
  formData: FormData
) {
  const memoryId = String(
    formData.get("memoryId")
  );

  if (!memoryId) return;

  await supabaseAdmin
    .from("gallery_submissions")
    .delete()
    .eq("id", memoryId);

  revalidatePath("/admin");
  revalidatePath("/gallery");
}

export async function checkBookingAction(
  eventId: string,
  attendeeEmail: string
) {
  const { data } = await supabaseAdmin
    .from("bookings")
    .select("id")
    .eq("event_id", eventId)
    .eq("attendee_email", attendeeEmail)
    .maybeSingle();

  return !!data;
}

export async function forgotPasswordAction(
  _: FormState,
  formData: FormData
): Promise<FormState> {
  const email = String(
    formData.get("email") ?? ""
  ).trim();

  const { error } =
    await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo:
`${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`
      }
    );

  if (error) {
    return {
      error: error.message,
    };
  }

  return {
    success:
      "Password reset link sent to your email.",
  };
}

export async function deleteCollaborationAction(
  formData: FormData
) {
  const id = String(
    formData.get("collaborationId")
  );

  if (!id) return;

  await supabaseAdmin
    .from("collaborations")
    .delete()
    .eq("id", id);

  revalidatePath("/admin");
}

export async function closeEventAction(
  formData: FormData
) {
  const eventId = String(
    formData.get("eventId")
  );

  await supabaseAdmin
    .from("events")
    .update({
      is_closed: true,
    })
    .eq("id", eventId);

  revalidatePath("/events");
  revalidatePath("/admin");
}