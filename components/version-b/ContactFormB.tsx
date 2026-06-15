"use client";

import { useState, useTransition } from "react";
import { submitContact } from "@/app/b/contact/actions";

export function ContactFormB() {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      await submitContact({ name, about, email, message });
      setSubmitted(true);
    });
  };

  if (submitted) {
    return (
      <p className="font-sans text-2xl text-white">
        Thanks, {name || "there"}. Denva will be in touch soon.
      </p>
    );
  }

  const inputClass =
    "border-b border-white/30 bg-transparent pb-1 text-white placeholder-white/30 focus:border-white focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-10">
      <p className="font-sans text-xl leading-relaxed text-white">
        My name is{" "}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="your name"
          required
          className={`${inputClass} w-36`}
        />{" "}
        and I&apos;m reaching out about{" "}
        <input
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          placeholder="project / opportunity"
          required
          className={`${inputClass} w-52`}
        />.
      </p>

      <p className="font-sans text-xl text-white">
        You can email me at{" "}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className={`${inputClass} w-56`}
        />.
      </p>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Tell me more..."
        rows={4}
        className="w-full resize-none border border-white/20 bg-transparent p-4 text-sm text-white placeholder-white/30 focus:border-white/60 focus:outline-none"
      />

      <button
        type="submit"
        disabled={isPending}
        className="border border-white/20 px-8 py-3 text-xs uppercase tracking-widest text-white transition-colors hover:border-white/70 disabled:opacity-40"
      >
        {isPending ? "Sending..." : "Send Message →"}
      </button>
    </form>
  );
}
