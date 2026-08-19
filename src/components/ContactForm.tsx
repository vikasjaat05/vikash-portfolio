"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";

const BUDGETS = ["Under $5k", "$5k – $15k", "$15k – $50k", "$50k+"];
const SERVICES = [
  "Shopify Store / Theme",
  "Web Application (Next.js)",
  "AI Prompting & Automation",
  "Speed & CRO Optimization",
];

export default function ContactForm({ defaultEmail = "" }: { defaultEmail?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [budget, setBudget] = useState(BUDGETS[0]);
  const [service, setService] = useState(SERVICES[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState(defaultEmail);
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, budget, service, message, website }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data?.error ?? "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
    } catch {
      setErrorMessage("Network error — please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center text-center py-16 md:py-20 border border-black/10 rounded-2xl md:rounded-3xl"
      >
        <CheckCircle2 size={48} className="text-red mb-6" />
        <h3 className="font-display text-2xl md:text-3xl font-bold mb-3">
          Message sent.
        </h3>
        <p className="text-black/60 max-w-sm">
          Thanks for reaching out — we&apos;ll get back to you within one business day.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field label="Full name" required>
          <input
            type="text"
            required
            maxLength={120}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
            className="w-full bg-transparent border-b border-black/15 focus:border-red outline-none py-3 transition-colors placeholder:text-black/30"
          />
        </Field>
        <Field label="Email" required>
          <input
            type="email"
            required
            maxLength={254}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@company.com"
            className="w-full bg-transparent border-b border-black/15 focus:border-red outline-none py-3 transition-colors placeholder:text-black/30"
          />
        </Field>
      </div>

      {/* Honeypot — hidden from real users, bots that autofill every field will trip it */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          Website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field label="Company">
          <input
            type="text"
            maxLength={120}
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company name (optional)"
            className="w-full bg-transparent border-b border-black/15 focus:border-red outline-none py-3 transition-colors placeholder:text-black/30"
          />
        </Field>
        <Field label="Budget">
          <div className="flex flex-wrap gap-2 pt-2">
            {BUDGETS.map((b) => (
              <button
                key={b}
                type="button"
                data-cursor-hover
                onClick={() => setBudget(b)}
                className={`text-sm px-4 py-2 rounded-full border transition-colors ${
                  budget === b
                    ? "bg-[#0a0a0a] text-white border-[#0a0a0a]"
                    : "border-black/15 text-black/60 hover:border-black/30"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </Field>
      </div>

      <Field label="What do you need help with?">
        <div className="flex flex-wrap gap-2 pt-2">
          {SERVICES.map((s) => (
            <button
              key={s}
              type="button"
              data-cursor-hover
              onClick={() => setService(s)}
              className={`text-sm px-4 py-2 rounded-full border transition-colors ${
                service === s
                  ? "bg-red text-white border-red"
                  : "border-black/15 text-black/60 hover:border-black/30"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Project details" required>
        <textarea
          required
          rows={5}
          maxLength={5000}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us a bit about your project, timeline, and goals..."
          className="w-full bg-transparent border-b border-black/15 focus:border-red outline-none py-3 transition-colors placeholder:text-black/30 resize-none"
        />
      </Field>

      {errorMessage && (
        <p className="text-sm text-red" role="alert">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        data-cursor-hover
        className="group inline-flex items-center gap-2 bg-[#0a0a0a] text-white font-semibold px-8 py-4 rounded-full hover:bg-red transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <>
            Sending...
            <Loader2 size={18} className="animate-spin" />
          </>
        ) : (
          <>
            Send Message
            <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform duration-300" />
          </>
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-widest text-black/50 mb-2">
        {label} {required && <span className="text-red">*</span>}
      </span>
      {children}
    </label>
  );
}
