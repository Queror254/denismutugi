"use client";

import { useState, useTransition } from "react";
import { submitContactA } from "@/app/contact/actions";

export function ContactFormA() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [project, setProject] = useState("");
  const [email, setEmail] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      await submitContactA({ name, company, project, email, synopsis });
      setSubmitted(true);
    });
  };

  if (submitted) {
    return (
      <p className="font-sans text-2xl text-white">
        Thanks, {name || "there"}. Denis will be in touch soon.
      </p>
    );
  }

  const inputClass =
    "bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:bg-white/10 focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Row 1 */}
      <p className="flex flex-wrap items-center gap-3 font-sans text-xl text-white md:text-2xl">
        <span>My name is</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name *"
          required
          className={`${inputClass} w-44`}
        />
        <span>and I work at</span>
        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company / Studio"
          className={`${inputClass} w-52`}
        />
      </p>

      {/* Row 2 */}
      <p className="flex flex-wrap items-center gap-3 font-sans text-xl text-white md:text-2xl">
        <span>I&apos;m reaching out about</span>
        <input
          value={project}
          onChange={(e) => setProject(e.target.value)}
          placeholder="Project / Opportunity"
          className={`${inputClass} w-52`}
        />
        <span>Email me at</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email *"
          required
          className={`${inputClass} w-56`}
        />
      </p>

      {/* Textarea */}
      <textarea
        value={synopsis}
        onChange={(e) => setSynopsis(e.target.value)}
        placeholder="Synopsis — tell me more about your project..."
        rows={6}
        className={`${inputClass} w-full resize-none`}
      />

      <button
        type="submit"
        disabled={isPending}
        className="border border-white/30 px-8 py-3 text-sm uppercase tracking-widest text-white transition-colors hover:border-white hover:bg-white hover:text-black disabled:opacity-40"
      >
        {isPending ? "Sending..." : "Let's Arrange a Chat"}
      </button>
    </form>
  );
}
