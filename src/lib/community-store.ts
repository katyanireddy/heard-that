import "server-only";

import { randomUUID } from "node:crypto";
import { CommunityNote } from "@/lib/types";

import { supabaseAdmin } from "@/lib/supabase-admin";

export async function getCommunityNotes() {
  const { data, error } = await supabaseAdmin
    .from("community_notes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

/*export function getCommunityNotes() {
  return [...notes].sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}*/
export async function createCommunityNote(input: {
  author: string;
  message: string;
  anonymous?: boolean;
  image?: string;
}) {
  const note: CommunityNote = {
    id: `note_${randomUUID().slice(0, 8)}`,
    author: input.anonymous ? "Anonymous" : input.author,
    message: input.message,
    anonymous: Boolean(input.anonymous),
    image: input.image,
    createdAt: new Date().toISOString(),
  };

const { data, error } = await supabaseAdmin
  .from("community_notes")
  .insert({
    author: note.author,
    message: note.message,
    anonymous: note.anonymous,
    image: note.image,
  })
  .select();

  console.log("COMMUNITY DATA =", data);
console.log("COMMUNITY ERROR =", error);

return note;
}

export async function deleteCommunityNote(id: string) {
  await supabaseAdmin
    .from("community_notes")
    .delete()
    .eq("id", id);
}