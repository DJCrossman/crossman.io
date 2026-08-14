"use server";

import { Resend } from "resend";

import {
  contactSchema,
  type ContactField,
  type ContactFormState,
} from "@/lib/contact-schema";

const TO_ADDRESS = "david@crossman.io";
// Switch to contact@crossman.io once the domain is verified in Resend.
const FROM_ADDRESS = "Portfolio <onboarding@resend.dev>";

const CONTACT_FIELDS = [
  "firstName",
  "lastName",
  "email",
  "subject",
  "message",
] as const satisfies readonly ContactField[];

/** Echo submitted values back so the client can repopulate the form. */
function submittedValues(
  formData: FormData,
): Partial<Record<ContactField, string>> {
  const values: Partial<Record<ContactField, string>> = {};
  for (const field of CONTACT_FIELDS) {
    const value = formData.get(field);
    if (typeof value === "string") values[field] = value;
  }
  return values;
}

export async function submitContact(
  _previous: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    const errors: Partial<Record<ContactField, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as ContactField | undefined;
      if (field && field !== ("company" as never) && !errors[field]) {
        errors[field] = issue.message;
      }
    }
    return { status: "error", errors, values: submittedValues(formData) };
  }

  const { firstName, lastName, email, subject, message, company } = parsed.data;

  // Honeypot tripped: report success so bots learn nothing.
  if (company) {
    return { status: "success" };
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[contact] RESEND_API_KEY not set — logging instead:", {
        firstName,
        lastName,
        email,
        subject,
        message,
      });
      return { status: "success" };
    }
    console.error("[contact] RESEND_API_KEY is not configured");
    return {
      status: "error",
      message: "Something went wrong sending your message. Please try again later.",
      values: submittedValues(formData),
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: TO_ADDRESS,
      replyTo: email,
      subject: `[crossman.io] ${subject}`,
      text: `From: ${firstName} ${lastName} <${email}>\n\n${message}`,
    });
    if (error) {
      console.error("[contact] Resend error:", error);
      return {
        status: "error",
        message:
          "Something went wrong sending your message. Please try again later.",
        values: submittedValues(formData),
      };
    }
    return { status: "success" };
  } catch (cause) {
    console.error("[contact] Failed to send:", cause);
    return {
      status: "error",
      message: "Something went wrong sending your message. Please try again later.",
      values: submittedValues(formData),
    };
  }
}
