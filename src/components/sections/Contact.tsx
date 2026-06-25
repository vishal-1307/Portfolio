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
  "w-full border border-ink/25 bg-surface px-4 py-3 text-sm text-ink placeholder:text-faint transition-colors focus:border-ink focus:outline-none";

export function Contact() {
  const reduce = useReducedMotion();
  const item = reduce ? instant : fadeUp;
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("botcheck")) return; // honeypot

    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      message: String(data.get("message") || ""),
      ...(WEB3FORMS_KEY ? { access_key: WEB3FORMS_KEY } : {}),
    };

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
        className="grid grid-cols-12 gap-x-6 gap-y-12"
      >
        {/* Left: blurb + direct links */}
        <motion.div variants={item} className="col-span-12 space-y-8 md:col-span-5">
          <p className="max-w-md text-lg leading-relaxed text-muted">{contact.blurb}</p>

          <div className="space-y-3">
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex items-center gap-3 text-ink transition-colors hover:text-accent-ink"
            >
              <span className="grid h-10 w-10 place-items-center border border-ink/25">
                <Mail className="h-[18px] w-[18px]" />
              </span>
              <span className="text-base font-medium">{site.email}</span>
            </a>
            <div>
              <a
                href={site.resume}
                download
                className="inline-flex items-center gap-2 border border-ink px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                <Download className="h-4 w-4" />
                Download Résumé
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
                  className="inline-flex items-center gap-2 border border-ink/25 px-3 py-2 text-sm font-medium text-muted transition-colors hover:border-ink hover:text-ink"
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
        <motion.form variants={item} onSubmit={handleSubmit} className="col-span-12 space-y-4 md:col-span-6 md:col-start-7" noValidate>
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
              <label htmlFor="name" className="eyebrow mb-1.5 block text-muted">
                Name
              </label>
              <input id="name" name="name" type="text" required autoComplete="name" className={fieldClass} placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="email" className="eyebrow mb-1.5 block text-muted">
                Email
              </label>
              <input id="email" name="email" type="email" required autoComplete="email" className={fieldClass} placeholder="you@email.com" />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="eyebrow mb-1.5 block text-muted">
              Message
            </label>
            <textarea id="message" name="message" required rows={5} className={`${fieldClass} resize-y`} placeholder="What are you building?" />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center gap-2 bg-ink px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send message"}
              <ArrowUpRight className="h-4 w-4" />
            </button>

            <p aria-live="polite" className="text-sm">
              {status === "success" && <span className="font-medium text-accent-ink">Thanks — I’ll get back to you soon.</span>}
              {status === "error" && <span className="font-medium text-accent-ink">Couldn’t send: {error}</span>}
            </p>
          </div>
        </motion.form>
      </motion.div>
    </Section>
  );
}
