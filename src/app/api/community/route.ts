import { NextResponse } from "next/server";
import { getCommunityNotes } from "@/lib/community-store";

export async function GET() {
  return NextResponse.json({ notes: getCommunityNotes() });
}
