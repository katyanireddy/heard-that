import "server-only";

import { createHash, randomUUID } from "node:crypto";
import { AppUser, UserRole, VibeTag } from "@/lib/types";

const PASSWORD_SALT = process.env.AUTH_SALT ?? "heard-that-local-salt";

function hashPassword(password: string) {
  return createHash("sha256").update(`${password}:${PASSWORD_SALT}`).digest("hex");
}

const users: AppUser[] = [
  {
    id: "usr_admin_1",
    name: "Heard That Admin",
    email: "admin@heardthat.in",
    passwordHash: hashPassword("chaiandchaos"),
    role: "admin",
    vibes: ["Psychology Overthinker", "Movie Yapper"],
    interests: ["community", "events", "nostalgia"],
    joinedEventIds: ["evt_001", "evt_002"],
    savedMemories: ["mem_002"],
    createdAt: new Date("2026-01-02T12:30:00+05:30").toISOString(),
  },
  {
    id: "usr_demo_1",
    name: "Demo Member",
    email: "member@heardthat.in",
    passwordHash: hashPassword("friendsoffline"),
    role: "member",
    vibes: ["Board Game Goblin", "2AM Philosopher"],
    interests: ["board games", "cafes", "sitcoms"],
    joinedEventIds: ["evt_003"],
    savedMemories: ["mem_001", "mem_003"],
    createdAt: new Date("2026-01-08T12:30:00+05:30").toISOString(),
  },
];

export function getAllUsers() {
  return [...users];
}

export function findUserByEmail(email: string) {
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

export function findUserById(id: string) {
  return users.find((user) => user.id === id);
}

export function verifyUserCredentials(email: string, password: string) {
  const user = findUserByEmail(email);
  if (!user) return null;
  if (user.passwordHash !== hashPassword(password)) return null;
  return user;
}

export function createUser(input: {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
  vibes?: VibeTag[];
  interests?: string[];
}) {
  const existing = findUserByEmail(input.email);
  if (existing) {
    return { error: "A user with this email already exists." as const };
  }

  const created: AppUser = {
    id: `usr_${randomUUID().slice(0, 8)}`,
    name: input.name,
    email: input.email.toLowerCase(),
    passwordHash: hashPassword(input.password),
    role: input.role ?? "member",
    vibes: input.vibes ?? [],
    interests: input.interests ?? [],
    joinedEventIds: [],
    savedMemories: [],
    createdAt: new Date().toISOString(),
  };

  users.unshift(created);
  return { user: created };
}

export function attachJoinedEvent(userId: string, eventId: string) {
  const user = findUserById(userId);
  if (!user) return;
  if (!user.joinedEventIds.includes(eventId)) {
    user.joinedEventIds.push(eventId);
  }
}

export function updateUserVibes(userId: string, selected: VibeTag[]) {
  const user = findUserById(userId);
  if (!user) return;
  user.vibes = selected;
}

export { hashPassword };
