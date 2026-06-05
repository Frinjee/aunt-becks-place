import { isContactTopicValue, type ContactTopicValue } from "@/lib/contact/topics";

export type ContactSubmission = {
  name: string;
  email: string;
  topic: ContactTopicValue;
  message: string;
};

export type ContactField = keyof ContactSubmission;

export type ContactActionState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<ContactField, string>>;
};

export const initialContactActionState: ContactActionState = {
  status: "idle",
};

export type ParseContactResult =
  | { kind: "valid"; submission: ContactSubmission }
  | { kind: "honeypot" }
  | { kind: "invalid"; state: ContactActionState };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readRequiredString(value: FormDataEntryValue | null): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function parseContactSubmission(formData: FormData): ParseContactResult {
  const honeypot = readRequiredString(formData.get("company"));
  if (honeypot) {
    return { kind: "honeypot" };
  }

  const fieldErrors: Partial<Record<ContactField, string>> = {};

  const name = readRequiredString(formData.get("name"));
  if (!name) {
    fieldErrors.name = "Enter your name.";
  } else if (name.length > 120) {
    fieldErrors.name = "Name must be 120 characters or fewer.";
  }

  const email = readRequiredString(formData.get("email"));
  if (!email) {
    fieldErrors.email = "Enter your email address.";
  } else if (!emailPattern.test(email)) {
    fieldErrors.email = "Enter a valid email address.";
  } else if (email.length > 254) {
    fieldErrors.email = "Email must be 254 characters or fewer.";
  }

  const topicRaw = readRequiredString(formData.get("topic"));
  let topic: ContactTopicValue | null = null;
  if (!topicRaw) {
    fieldErrors.topic = "Choose a topic.";
  } else if (!isContactTopicValue(topicRaw)) {
    fieldErrors.topic = "Choose a valid topic.";
  } else {
    topic = topicRaw;
  }

  const message = readRequiredString(formData.get("message"));
  if (!message) {
    fieldErrors.message = "Enter a message.";
  } else if (message.length < 10) {
    fieldErrors.message = "Message must be at least 10 characters.";
  } else if (message.length > 5000) {
    fieldErrors.message = "Message must be 5000 characters or fewer.";
  }

  if (Object.keys(fieldErrors).length > 0 || !name || !email || !topic || !message) {
    return {
      kind: "invalid",
      state: {
        status: "error",
        message: "Check the highlighted fields and try again.",
        fieldErrors,
      },
    };
  }

  return {
    kind: "valid",
    submission: {
      name,
      email,
      topic,
      message,
    },
  };
}
