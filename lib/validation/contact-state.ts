/** État du formulaire de contact (sans dépendance à zod, importable côté client). */

export type ContactField = "name" | "email" | "phone" | "topic" | "message" | "consent";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors: Partial<Record<ContactField, string>>;
  /** Valeurs renvoyées pour remplir à nouveau le formulaire après une erreur. */
  values: Partial<Record<Exclude<ContactField, "consent">, string>>;
}

export const initialContactState: ContactFormState = {
  status: "idle",
  message: "",
  fieldErrors: {},
  values: {},
};
