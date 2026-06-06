"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { submitContactForm } from "@/app/contact/actions";
import {
  initialContactActionState,
  type ContactActionState,
  type ContactField,
} from "@/lib/contact/schema";
import { contactTopics } from "@/lib/contact/topics";
import { site } from "@/lib/content";
import styles from "@/components/ContactForm.module.css";

type ContactFormProps = {
  action: typeof submitContactForm;
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className={`donations__link ${styles.submitButton}`}
      type="submit"
      disabled={pending}
      aria-busy={pending}
    >
      {pending ? "Sending..." : "Send message"}
    </button>
  );
}

function fieldErrorId(field: ContactField): string {
  return `contact-${field}-error`;
}

export function ContactForm({ action }: ContactFormProps) {
  const [state, formAction] = useActionState<ContactActionState, FormData>(
    action,
    initialContactActionState,
  );

  return (
    <form className={styles.contactForm} action={formAction} noValidate>
      <div className={styles.formField}>
        <label htmlFor="contact-name">Name</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-invalid={Boolean(state.fieldErrors?.name)}
          aria-describedby={state.fieldErrors?.name ? fieldErrorId("name") : undefined}
        />
        {state.fieldErrors?.name ? (
          <p className={styles.fieldError} id={fieldErrorId("name")} role="alert">
            {state.fieldErrors.name}
          </p>
        ) : null}
      </div>

      <div className={styles.formField}>
        <label htmlFor="contact-email">Email</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={Boolean(state.fieldErrors?.email)}
          aria-describedby={state.fieldErrors?.email ? fieldErrorId("email") : undefined}
        />
        {state.fieldErrors?.email ? (
          <p className={styles.fieldError} id={fieldErrorId("email")} role="alert">
            {state.fieldErrors.email}
          </p>
        ) : null}
      </div>

      <div className={styles.formField}>
        <label htmlFor="contact-topic">What are you reaching out about?</label>
        <select
          id="contact-topic"
          name="topic"
          defaultValue="volunteer"
          required
          aria-invalid={Boolean(state.fieldErrors?.topic)}
          aria-describedby={state.fieldErrors?.topic ? fieldErrorId("topic") : undefined}
        >
          {contactTopics.map((topic) => (
            <option key={topic.value} value={topic.value}>
              {topic.label}
            </option>
          ))}
        </select>
        {state.fieldErrors?.topic ? (
          <p className={styles.fieldError} id={fieldErrorId("topic")} role="alert">
            {state.fieldErrors.topic}
          </p>
        ) : null}
      </div>

      <div className={styles.formField}>
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          minLength={10}
          required
          aria-invalid={Boolean(state.fieldErrors?.message)}
          aria-describedby={state.fieldErrors?.message ? fieldErrorId("message") : undefined}
        />
        {state.fieldErrors?.message ? (
          <p className={styles.fieldError} id={fieldErrorId("message")} role="alert">
            {state.fieldErrors.message}
          </p>
        ) : null}
      </div>

      <div className={`${styles.formField} ${styles.formFieldHoneypot}`} aria-hidden="true">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p className={styles.formNote}>
        Messages are sent to <a href={`mailto:${site.email}`}>{site.email}</a>. If the form is
        unavailable, you can email us directly.
      </p>

      {state.message ? (
        <p
          className={
            state.status === "success"
              ? `${styles.formFeedback} ${styles.formFeedbackSuccess}`
              : styles.formFeedback
          }
          role={state.status === "error" ? "alert" : "status"}
          aria-live="polite"
        >
          {state.message}
        </p>
      ) : null}

      <SubmitButton />
    </form>
  );
}
