import "server-only";

import { createHmac } from "node:crypto";
import { cookies } from "next/headers";
import { AppSession } from "@/lib/types";

const SESSION_COOKIE = "heardthat_session";
const SESSION_SECRET = process.env.AUTH_SECRET ?? "heard-that-local-secret-change-me";

function sign(data: string) {
  return createHmac("sha256", SESSION_SECRET).update(data).digest("base64url");
}

function encodeSession(payload: AppSession) {
  const json = JSON.stringify(payload);
  const data = Buffer.from(json).toString("base64url");
  const signature = sign(data);
  return `${data}.${signature}`;
}

function decodeSession(token: string): AppSession | null {
  const [data, signature] = token.split(".");
  if (!data || !signature) return null;
  const expected = sign(data);
  if (expected !== signature) return null;

  try {
    const json = Buffer.from(data, "base64url").toString("utf8");
    return JSON.parse(json) as AppSession;
  } catch {
    return null;
  }
}

export async function getSession() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return decodeSession(token);
}

export async function setSession(session: AppSession) {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, encodeSession(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 14,
    path: "/",
  });
}

export async function clearSession() {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });
}
