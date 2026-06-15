"use server";

type ContactPayload = {
  name: string;
  about: string;
  email: string;
  message: string;
};

export async function submitContact(payload: ContactPayload): Promise<void> {
  // V1: log submission. V2: send via Resend.
  console.log("[Contact Form]", payload);
}
