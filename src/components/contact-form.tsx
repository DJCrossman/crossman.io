"use client";

import * as React from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitContact } from "@/lib/actions";
import type { ContactField, ContactFormState } from "@/lib/contact-schema";

const initialState: ContactFormState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, pending] = React.useActionState(
    submitContact,
    initialState,
  );

  React.useEffect(() => {
    if (state.status === "success") {
      toast.success("Thanks for reaching out — I'll get back to you soon!");
    } else if (state.status === "error" && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  const errorFor = (field: ContactField) =>
    state.status === "error" ? state.errors?.[field] : undefined;

  // React 19 resets uncontrolled fields whenever the form action completes,
  // so after an error we repopulate via defaultValue from the echoed values.
  const valueFor = (field: ContactField) =>
    state.status === "error" ? state.values?.[field] : undefined;

  const messageError = errorFor("message");

  return (
    <form action={formAction} className="mt-10 text-left">
      <FieldGroup>
        <div className="grid gap-5 sm:grid-cols-2">
          <ContactInput
            name="firstName"
            label="First Name"
            autoComplete="given-name"
            error={errorFor("firstName")}
            defaultValue={valueFor("firstName")}
          />
          <ContactInput
            name="lastName"
            label="Last Name"
            autoComplete="family-name"
            error={errorFor("lastName")}
            defaultValue={valueFor("lastName")}
          />
        </div>
        <ContactInput
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          error={errorFor("email")}
          defaultValue={valueFor("email")}
        />
        <ContactInput
          name="subject"
          label="Subject"
          error={errorFor("subject")}
          defaultValue={valueFor("subject")}
        />
        <Field data-invalid={Boolean(messageError) || undefined}>
          <FieldLabel htmlFor="contact-message">Message</FieldLabel>
          <Textarea
            id="contact-message"
            name="message"
            required
            rows={6}
            defaultValue={valueFor("message")}
            aria-invalid={Boolean(messageError) || undefined}
            aria-describedby={messageError ? "contact-message-error" : undefined}
          />
          {messageError ? (
            <FieldError id="contact-message-error">{messageError}</FieldError>
          ) : null}
        </Field>

        {/* Honeypot — hidden from humans, tempting for bots */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="contact-company">Company</label>
          <input
            id="contact-company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={pending}
          className="justify-self-start font-heading font-bold uppercase tracking-wide"
        >
          {pending ? "Sending…" : "Submit"}
        </Button>
      </FieldGroup>
    </form>
  );
}

function ContactInput({
  name,
  label,
  error,
  defaultValue,
  type = "text",
  autoComplete,
}: {
  name: ContactField;
  label: string;
  error?: string;
  defaultValue?: string;
  type?: string;
  autoComplete?: string;
}) {
  const id = `contact-${name}`;
  return (
    <Field data-invalid={Boolean(error) || undefined}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input
        id={id}
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error ? <FieldError id={`${id}-error`}>{error}</FieldError> : null}
    </Field>
  );
}
