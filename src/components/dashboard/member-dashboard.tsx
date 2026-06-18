"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { galleryMemories, vibes } from "@/lib/data";
import { updateMyVibesAction } from "@/lib/server-actions";
import { AppSession, EventItem } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { uploadMemory } from "@/lib/upload-memory";
const initialState = {
  error: "",
  success: "",
};
import { useRouter } from "next/navigation";
import { deleteMemoryAction } from "@/lib/server-actions";

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="rounded-full border-[3px] border-ink bg-jam px-4 py-2 text-xs font-black uppercase tracking-wide text-cream shadow-[4px_4px_0_#2a1408]"
      disabled={pending}
    >
      {pending ? "Saving..." : "Save Vibes"}
    </button>
  );
}

export function MemberDashboard({
  session,
  joinedEvents,
  myMemories,
}: {
  session: AppSession;
  joinedEvents: EventItem[];
  myMemories: any[];
 }) {
  const router = useRouter();
  const [state, action] = useActionState(updateMyVibesAction, initialState);
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
const [caption, setCaption] = useState("");
const [eventName, setEventName] = useState("");
const handleUpload = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!file) {
    alert("Select a photo first");
    return;
  }

  setUploading(true);

  try {
    console.log("file", file);
    console.log("caption", caption);
    console.log("event", eventName);

    const imageUrl = await uploadMemory(file);

    console.log("image uploaded:", imageUrl);

    const { data, error } = await supabase
  .from("gallery_submissions")
  .insert({
    image_url: imageUrl,
    caption,
    event_name: eventName,
    user_id: session.id,
    user_name: session.name,
    status: "pending",
  });


    console.log("supabase data", data);
    console.log("supabase error", error);

if (error) throw error;
alert("✅ Memory submitted!");

setFile(null);
setCaption("");
setEventName("");
setShowUpload(false);

router.refresh();

document
  .getElementById("my-memories-list")
  ?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    alert("Upload failed");
  } finally {
    setUploading(false);
  }
};

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <aside className="space-y-4">
        <section className="rounded-[1.3rem] border-4 border-ink bg-cream p-5 shadow-[8px_8px_0_#2a1408]">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-jam">Profile</p>
          <h2 className="mt-2 font-display text-3xl uppercase">{session.name}</h2>
          <p className="text-sm font-semibold">{session.email}</p>
          <p className="mt-2 rounded-full border-2 border-ink bg-lime px-3 py-1 text-xs font-black uppercase inline-block">
            {session.role}
          </p>
          <p className="mt-3 text-sm">Selected vibes: {session.vibes.length ? session.vibes.join(", ") : "No vibes yet"}</p>
        </section>

        <section className="rounded-[1.3rem] border-4 border-ink bg-aqua p-5 shadow-[8px_8px_0_#2a1408]">
          <h3 className="font-display text-2xl uppercase">Update My Vibe Palette</h3>
          <form action={action} className="mt-3 space-y-2">
            {vibes.map((vibe) => (
              <label key={vibe.title} className="flex items-center gap-2 rounded-xl border-2 border-ink bg-cream px-3 py-2 text-sm font-semibold">
                <input
                  type="checkbox"
                  name="vibes"
                  value={vibe.title}
                  className="h-4 w-4 accent-jam"
                  defaultChecked={session.vibes.includes(vibe.title)}
                />
                <span>{vibe.title}</span>
              </label>
            ))}
            <div className="pt-1">
              <SaveButton />
            </div>
            {state.error ? <p className="text-sm font-semibold text-red-700">{state.error}</p> : null}
            {state.success ? <p className="text-sm font-semibold text-green-700">{state.success}</p> : null}
          </form>
        </section>
      </aside>

      <main className="space-y-4">
        <section className="rounded-[1.3rem] border-4 border-ink bg-blush p-5 shadow-[8px_8px_0_#2a1408]">
          <h3 className="font-display text-3xl uppercase">Upcoming Booked Events</h3>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {joinedEvents.length ? (
              joinedEvents.map((event) => (
                <article key={event.id} className="rounded-xl border-[3px] border-ink bg-cream p-3">
                  <p className="text-xs font-black uppercase tracking-wide text-jam">{event.theme}</p>
                  <h4 className="mt-1 font-display text-2xl uppercase leading-tight">{event.title}</h4>
                  <p className="text-sm font-semibold">{formatDateTime(event.dateTime)}</p>
                  <p className="text-sm">{event.location}</p>
                </article>
              ))
            ) : (
              <p className="rounded-xl border-2 border-ink bg-cream p-3 text-sm font-semibold">
                No booked events yet. Let&apos;s change that.
              </p>
            )}
          </div>
          <Link
            href="/events"
            className="mt-4 inline-flex rounded-full border-[3px] border-ink bg-lime px-4 py-2 text-xs font-black uppercase shadow-[4px_4px_0_#2a1408]"
          >
            Book another night
          </Link>
        </section>

        <section className="rounded-[1.3rem] border-4 border-ink bg-cream p-5 shadow-[8px_8px_0_#2a1408]">
          <h3 className="font-display text-3xl uppercase">Saved Memories</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {galleryMemories.map((memory) => (
              <article key={memory.id} className="rounded-xl border-[3px] border-ink bg-chai/50 p-3">
                <p className="text-xs font-black uppercase tracking-wide text-jam">{memory.event}</p>
                <h4 className="mt-1 text-lg font-bold">{memory.title}</h4>
                <p className="text-sm">{memory.quote}</p>
              </article>
            ))}
          </div>
        </section>
    
        <section className="rounded-[1.3rem] border-4 border-ink bg-aqua p-5 shadow-[8px_8px_0_#2a1408]">
  <div className="flex items-center justify-between">
    <h3 className="font-display text-3xl uppercase">
      My Memories
    </h3>

   <button
  type="button"
  onClick={() => setShowUpload(!showUpload)}
  className="rounded-full border-[3px] border-ink bg-lime px-4 py-2 text-xs font-black uppercase shadow-[4px_4px_0_#2a1408]"
>
  + Upload Memory
</button>
  </div>

  {showUpload && (
<form
  onSubmit={handleUpload}
  className="mt-4 rounded-xl border-[3px] border-ink bg-cream p-4 space-y-3"
>      <div>
        <label className="text-xs font-black uppercase">
          Upload Photo
        </label>

        <input
  type="file"
  accept="image/*"
  onChange={(e) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  }}
  className="mt-1 w-full rounded-lg border-2 border-ink p-2"
/>
      </div>

      <div>
        <label className="text-xs font-black uppercase">
          Caption
        </label>

        <textarea
  value={caption}
  onChange={(e) => setCaption(e.target.value)}
  placeholder="Met strangers. Left with friends."
  className="mt-1 w-full rounded-lg border-2 border-ink p-2"
/>
      </div>

      <div>
        <label className="text-xs font-black uppercase">
          Event
        </label>
        <select
  value={eventName}
  onChange={(e) => setEventName(e.target.value)}
  className="mt-1 w-full rounded-lg border-2 border-ink p-2"
>
  <option value="">Select Event</option>

  {joinedEvents.map((event) => (
    <option
      key={event.id}
      value={event.title}
    >
      {event.title}
    </option>
  ))}
</select>

       
      </div>

      <button
  type="submit"
  disabled={uploading}
  className="rounded-full border-[3px] border-ink bg-jam px-5 py-2 text-xs font-black uppercase text-cream shadow-[4px_4px_0_#2a1408]"
>
  {uploading
    ? "Submitting..."
    : "Submit For Approval"}
</button>
    </form>
  )}

<div className="mt-4 grid gap-4 lg:grid-cols-2">
  {myMemories?.map((memory) => (
    <article
      key={memory.id}
      className="rounded-xl border-[3px] border-ink bg-chai p-3"
    >
      <img
        src={memory.image_url}
        alt={memory.event_name}
        className="h-56 w-full rounded-lg object-cover"
      />

      <h4 className="mt-3 text-xl font-bold">
        {memory.event_name}
      </h4>

      <p className="mt-1 text-sm text-ink/70">
        {memory.caption}
      </p>

      <p
        className={`mt-2 font-semibold ${
          memory.status === "approved"
            ? "text-green-700"
            : memory.status === "rejected"
            ? "text-red-700"
            : "text-orange-600"
        }`}
      >
        {memory.status === "approved"
          ? "Published"
          : memory.status === "rejected"
          ? "Rejected"
          : "Submitted"}
      </p>

      <form
        action={deleteMemoryAction}
        className="mt-3"
      >
        <input
          type="hidden"
          name="memoryId"
          value={memory.id}
        />

        <button
          type="submit"
          className="rounded-full border-2 border-ink bg-blush px-4 py-2 text-xs font-black uppercase"
        >
          Delete
        </button>
      </form>
    </article>
  ))}
</div>
</section>
      </main>
    </div>
  );
}