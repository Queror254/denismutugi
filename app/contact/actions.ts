"use server";

type ContactPayload = {
  name: string;
  company: string;
  project: string;
  email: string;
  synopsis: string;
};

export async function submitContactA(payload: ContactPayload): Promise<void> {
  // V1: log submission. V2: send via Resend or similar.
  console.log("[Contact Form A]", payload);
}
