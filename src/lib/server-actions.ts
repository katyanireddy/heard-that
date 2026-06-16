"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { collaborationTypes } from "@/lib/data";
import { createInquiry } from "@/lib/collab-store";
import { createCommunityNote, deleteCommunityNote } from "@/lib/community-store";
import { sendConfirmationEmail } from "@/lib/email";
import { createBooking, deleteEvent, getEventById, upsertEvent } from "@/lib/events-store";
import { clearSession, getSession, setSession } from "@/lib/session";
import { EventItem, VibeTag } from "@/lib/types";
import { attachJoinedEvent, createUser, verifyUserCredentials, updateUserVibes } from "@/lib/user-store";
import { toSlug } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabase-admin";

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
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();

  if (!email || !password) {
    return { error: "Please enter both email and password." };
  }

  const user = verifyUserCredentials(email, password);
  if (!user) {
    return { error: "Incorrect email or password." };
  }

  await setSession({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    vibes: user.vibes,
    interests: user.interests,
  });

  redirect(user.role === "admin" ? "/admin" : "/dashboard");
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

  const result = createUser({ name, email, password, vibes, interests: vibes });
  if ("error" in result) {
    return { error: result.error };
  }

  await setSession({
    id: result.user.id,
    name: result.user.name,
    email: result.user.email,
    role: result.user.role,
    vibes: result.user.vibes,
    interests: result.user.interests,
  });

  redirect("/dashboard");
}

export async function logoutAction() {
  await clearSession();
  redirect("/");
}

export async function updateMyVibesAction(_: FormState, formData: FormData): Promise<FormState> {
  const session = await getSession();
  if (!session) return { error: "Please log in first." };
  const selected = parseVibes(formData);
  updateUserVibes(session.id, selected);
  await setSession({ ...session, vibes: selected, interests: selected });
  revalidatePath("/dashboard");
  return { success: "Vibe profile updated." };
}

export async function bookEventAction(_: FormState, formData: FormData): Promise<FormState> {
  const eventId = String(formData.get("eventId") ?? "");
  const attendeeName = String(formData.get("attendeeName") ?? "").trim();
  const attendeeEmail = String(formData.get("attendeeEmail") ?? "").trim().toLowerCase();
  const note = String(formData.get("note") ?? "").trim();
  const selectedVibes = parseVibes(formData);

  if (!eventId || !attendeeName || !attendeeEmail) {
    return { error: "Please complete your name and email." };
  }

  const session = await getSession();
  const result = createBooking({
    eventId,
    attendeeName,
    attendeeEmail,
    note,
    vibes: selectedVibes,
    userId: session?.id,
  });

  if ("error" in result) {
    return { error: result.error };
  }

  if (session?.id) {
    attachJoinedEvent(session.id, eventId);
  }

  await sendConfirmationEmail({
    to: attendeeEmail,
    subject: `Heard That? Ticket Confirmed • ${result.event.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; background: #fff6e5; padding: 24px; border: 2px dashed #2e1800;">
        <h2 style="margin:0 0 10px;">You're in 🎉</h2>
        <p>Hi ${attendeeName}, your booking for <b>${result.event.title}</b> is confirmed.</p>
        <p><b>Ticket code:</b> ${result.booking.ticketCode}</p>
        <p><b>Date:</b> ${new Date(result.event.dateTime).toLocaleString("en-IN", {
          dateStyle: "full",
          timeStyle: "short",
          timeZone: "Asia/Kolkata",
        })}</p>
        <p><b>Venue:</b> ${result.event.location}</p>
        <p>Bring your cozy vibe. We saved your spot.</p>
      </div>
    `,
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

  createCommunityNote({
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

  createInquiry({ name, email, org, collaborationType, message });

  revalidatePath("/collab");
  revalidatePath("/admin");

  return { success: "Inquiry sent. Team Heard That? will reply soon." };
}

export async function adminDeleteEventAction(formData: FormData) {
  const session = await getSession();
  if (!session || session.role !== "admin") return;
  const id = String(formData.get("eventId") ?? "");
  if (!id) return;
  deleteEvent(id);
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

  upsertEvent(item);
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
  deleteCommunityNote(noteId);
  revalidatePath("/community");
  revalidatePath("/admin");
}

export async function fetchEventForRoute(slug: string) {
  return getEventById(slug) ?? null;
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

  const all = (await import("@/lib/events-store")).getEvents();
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

