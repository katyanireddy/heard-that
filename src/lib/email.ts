import "server-only";


import nodemailer from "nodemailer";
 export type EmailPayload = {
  to: string;
  subject: string;
  html: string;
  attachments?: any[];
};

const sentEmails: Array<{
  to: string;
  subject: string;
  sentAt: string;
}> = [];

function createTransporter() {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  return nodemailer.createTransport({ jsonTransport: true });
}

export async function sendConfirmationEmail(payload: EmailPayload) {
  const transporter = createTransporter();
await transporter.sendMail({
  from: process.env.MAIL_FROM ?? "Heard That? <hello@heardthat.in>",
  to: payload.to,
  subject: payload.subject,
  html: payload.html,
  attachments: payload.attachments ?? [],
});

  sentEmails.unshift({ to: payload.to, subject: payload.subject, sentAt: new Date().toISOString() });
}

export function getSentEmailLog() {
  return sentEmails;
}
