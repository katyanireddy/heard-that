import { NextResponse } from "next/server";
import { getEvents } from "@/lib/events-store";

export async function GET() {
  return NextResponse.json({ events: getEvents() });
}
