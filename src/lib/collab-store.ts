import "server-only";

import { randomUUID } from "node:crypto";
import { CollaborationInquiry } from "@/lib/types";

const inquiries: CollaborationInquiry[] = [];

export function getInquiries() {
  return [...inquiries].sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function createInquiry(input: Omit<CollaborationInquiry, "id" | "createdAt">) {
  const inquiry: CollaborationInquiry = {
    ...input,
    id: `collab_${randomUUID().slice(0, 8)}`,
    createdAt: new Date().toISOString(),
  };
  inquiries.unshift(inquiry);
  return inquiry;
}
