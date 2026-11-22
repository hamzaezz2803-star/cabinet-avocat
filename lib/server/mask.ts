import "server-only";

/** Masquage des identifiants pour les journaux : jamais de donnée personnelle en clair. */

export function maskEmail(email: string): string {
  const [user = "", domain = ""] = email.split("@");
  return `${user.slice(0, 1)}***@${domain}`;
}

export function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits.length < 6 ? "***" : `${digits.slice(0, 4)}****${digits.slice(-4)}`;
}
