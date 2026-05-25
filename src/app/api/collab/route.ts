import { NextResponse } from "next/server";
import { createInquiry, getInquiries } from "@/lib/collab-store";
import { collaborationTypes } from "@/lib/data";

export async function GET() {
  return NextResponse.json({ inquiries: getInquiries() });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, org, collaborationType, message } = body;

  if (!name || !email || !collaborationType || !message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  if (!collaborationTypes.includes(collaborationType)) {
    return NextResponse.json({ error: "Invalid collaboration type." }, { status: 400 });
  }

  const inquiry = createInquiry({ name, email, org, collaborationType, message });
  return NextResponse.json({ inquiry }, { status: 201 });
}
