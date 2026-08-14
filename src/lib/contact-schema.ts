import { z } from "zod";

export const contactSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  email: z.email("Enter a valid email address").max(200),
  subject: z.string().trim().min(1, "Subject is required").max(200),
  message: z
    .string()
    .trim()
    .min(10, "Tell me a little more — at least 10 characters")
    .max(5000),
  /** Honeypot: humans never see this field, so it must stay empty. */
  company: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactField = Exclude<keyof ContactInput, "company">;

export type ContactFormState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      message?: string;
      errors?: Partial<Record<ContactField, string>>;
      /**
       * Submitted values echoed back so the form can repopulate after an
       * error — React 19 resets uncontrolled fields when a form action
       * completes, even when it returns an error state.
       */
      values?: Partial<Record<ContactField, string>>;
    };
