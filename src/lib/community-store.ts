import "server-only";

import { randomUUID } from "node:crypto";
import { CommunityNote } from "@/lib/types";

const notes: CommunityNote[] = [
  {
    id: "note_001",
    author: "Anonymous",
    message: "Came alone for trivia night, left with three new cafe plans.",
    anonymous: true,
    createdAt: new Date("2026-05-20T20:30:00+05:30").toISOString(),
  },
  {
    id: "note_002",
    author: "Aditi",
    message: "Please do another old cartoon theme night. I am ready with snacks.",
    anonymous: false,
    createdAt: new Date("2026-05-21T18:20:00+05:30").toISOString(),
  },
];

export function getCommunityNotes() {
  return [...notes].sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function createCommunityNote(input: {
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

  notes.unshift(note);
  return note;
}

export function deleteCommunityNote(id: string) {
  const index = notes.findIndex((note) => note.id === id);
  if (index >= 0) notes.splice(index, 1);
}
