import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  const body = await req.json();

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = body;

  const expectedSignature = crypto
    .createHmac(
      "sha256",
      process.env.RAZORPAY_KEY_SECRET!
    )
    .update(
      razorpay_order_id + "|" + razorpay_payment_id
    )
    .digest("hex");

  const isValid =
    expectedSignature === razorpay_signature;

  if (!isValid) {
    return NextResponse.json(
      { success: false },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
  });
}