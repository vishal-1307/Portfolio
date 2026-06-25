import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { contact, site, socials } from "@/data/content";
import { Section } from "@/components/primitives/Section";
import { fadeUp, instant, stagger, viewportOnce } from "@/lib/motion";
import { ArrowUpRight, Download, Mail } from "@/components/primitives/icons";
import { SocialIcon } from "./SocialIcon";

type Status = "idle" | "sending" | "success" | "error";

const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT ?? "";
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY ?? "";

const fieldClass =
  "w-full rounded-md border border-line/15 bg-bg px-4 py-3 text-sm text-text placeholder:text-faint transition-colors focus:border-accent/60 focus:outline-none";

export function Contact() {
  const reduce = useReducedMotion();
  const item = reduce ? instant : fadeUp;
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: real users never fill this hidden field.
    if (data.get("botcheck")) return;

    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      message: String(data.get("message") || ""),
      ...(WEB3FORMS_KEY ? { access_key: WEB3FORMS_KEY } : {}),
    };

    // No endpoint configured → fall back to the user's mail client so the
    // contact path always works, even before the form is wired up.
    if (!ENDPOINT) {
      const body = encodeURIComponent(`${payload.message}\n\n— ${payload.name} (${payload.email})`);
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
        `Portfolio enquiry from ${payload.name}`,
      )}&body=${body}`;
      return;
    }

    setStatus("sending");
    setError("");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <Section id="contact" index="05" kicker="Contact" title={contact.heading}>
      <motion.div
        variants={reduce ? undefined : stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid gap-12 md:grid-cols-[1fr_1.1fr] md:gap-16"
      >
        {/* Left: blurb + direct links */}
        <motion.div variants={item} className="space-y-8">
          <p className="max-w-md text-lg leading-relaxed text-muted">{contact.blurb}</p>

          <div className="space-y-3">
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex items-center gap-3 text-text transition-colors hover:text-accent"
            >
              <span className="grid h-10 w-10 place-items-center rounded-md border border-line/15">
                <Mail className="h-[18px] w-[18px]" />
              </span>
              <span className="font-mono text-sm">{site.email}</span>
            </a>
            <div>
              <a
                href={site.resume}
                download
                className="inline-flex items-center gap-2 rounded-md border border-line/15 px-4 py-2.5 text-sm text-text transition-colors hover:border-accent/50 hover:text-accent"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            </div>
          </div>

          <ul className="flex flex-wrap gap-2 pt-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-line/15 px-3 py-2 text-sm text-muted transition-colors hover:border-accent/50 hover:text-accent"
                >
                  <SocialIcon label={s.label} className="h-4 w-4" />
                  {s.label}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right: form */}
        <motion.form variants={item} onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* honeypot (visually hidden, off accessibility tree) */}
          <input
            type="text"
            name="botcheck"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                Name
              </label>
              <input id="name" name="name" type="text" required autoComplete="name" className={fieldClass} placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                Email
              </label>
              <input id="email" name="email" type="email" required autoComplete="email" className={fieldClass} placeholder="you@email.com" />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              Message
            </label>
            <textarea id="message" name="message" required rows={5} className={`${fieldClass} resize-y`} placeholder="What are you building?" />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transform-none"
            >
              {status === "sending" ? "Sending…" : "Send message"}
              <ArrowUpRight className="h-4 w-4" />
            </button>

            {/* Live region for status feedback */}
            <p aria-live="polite" className="text-sm">
              {status === "success" && <span className="text-accent">Thanks — I’ll get back to you soon.</span>}
              {status === "error" && <span className="text-red-400">Couldn’t send: {error}</span>}
            </p>
          </div>
        </motion.form>
      </motion.div>
    </Section>
  );
}
