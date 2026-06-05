"use server";

import { render, renderPlainText } from "jsx-email";

import { ContactFormEmail } from "@/emails/ContactFormEmail";
import {
  parseContactSubmission,
  type ContactActionState,
} from "@/lib/contact/schema";
import { getContactTopicLabel } from "@/lib/contact/topics";
import { site } from "@/lib/content";
import { sendEmail } from "@/lib/email/send";

function formatSubmittedAt(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export async function submitContactForm(
  _prevState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const parsed = parseContactSubmission(formData);

  if (parsed.kind === "honeypot") {
    return {
      status: "success",
      message: "Thanks. Your message has been sent.",
    };
  }

  if (parsed.kind === "invalid") {
    return parsed.state;
  }

  const { submission } = parsed;
  const topicLabel = getContactTopicLabel(submission.topic);
  const submittedAt = formatSubmittedAt(new Date());

  const template = (
    <ContactFormEmail
      name={submission.name}
      email={submission.email}
      topicLabel={topicLabel}
      message={submission.message}
      submittedAt={submittedAt}
      recipientEmail={site.email}
    />
  );

  try {
    const [html, text] = await Promise.all([
      render(template, { inlineCss: true }),
      renderPlainText(template),
    ]);

    await sendEmail({
      to: site.email,
      subject: `New contact form message: ${topicLabel}`,
      html,
      text,
      replyTo: submission.email,
    });

    return {
      status: "success",
      message: "Thanks. Your message has been sent.",
    };
  } catch (error) {
    const message =
      error instanceof Error && error.message.includes("EMAIL_PROVIDER")
        ? "Email delivery is not configured yet. You can still reach us directly."
        : "Something went wrong while sending your message. Please try again or email us directly.";

    return {
      status: "error",
      message,
    };
  }
}
