import { Resend } from "resend";

import type { EmailMessage } from "@/lib/email/types";

let resendClient: Resend | null = null;

function logEmail(message: EmailMessage): void {
  console.info("[email:log]", {
    to: message.to,
    subject: message.subject,
    replyTo: message.replyTo,
    textPreview: message.text.slice(0, 240),
  });
}

function getRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} is not configured.`);
  }

  return value;
}

function getResendClient(): Resend {
  resendClient ??= new Resend(getRequiredEnv("RESEND_API_KEY"));
  return resendClient;
}

async function sendWithResend(message: EmailMessage): Promise<void> {
  const { error } = await getResendClient().emails.send({
    from: getRequiredEnv("RESEND_FROM_EMAIL"),
    to: message.to,
    subject: message.subject,
    html: message.html,
    text: message.text,
    replyTo: message.replyTo,
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function sendEmail(message: EmailMessage): Promise<void> {
  const provider = process.env.EMAIL_PROVIDER?.trim().toLowerCase();

  if (provider === "log") {
    logEmail(message);
    return;
  }

  if (provider === "resend") {
    await sendWithResend(message);
    return;
  }

  throw new Error(
    "EMAIL_PROVIDER is not configured. Set EMAIL_PROVIDER=log for local development or EMAIL_PROVIDER=resend for Resend delivery."
  );
}
