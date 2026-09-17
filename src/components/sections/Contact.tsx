"use client";

import { useState, type FormEvent } from "react";
import { contact } from "@/content/contact";
import { site, socials } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { ArrowUpRight, Download, Mail, SocialIcon } from "@/components/ui/icons";

type Status = "idle" | "sending" | "success" | "error";

/**
 * The form posts to whichever form service is configured at build time. With no
 * endpoint set it composes a mailto: instead, so the contact path works on a
 * fresh clone with zero configuration and no server secrets anywhere.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "";
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

const fieldClass =
  "w-full border border-paper/25 bg-surface px-4 py-3 text-sm text-paper placeholder:text-faint transition-colors focus:border-paper focus:outline-none";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("company")) return; // honeypot: bots fill hidden fields

    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    if (!ENDPOINT) {
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      const subject = encodeURIComponent(`Project enquiry from ${name}`);
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    setError("");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          ...(WEB3FORMS_KEY ? { access_key: WEB3FORMS_KEY } : {}),
        }),
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
      <div className="grid grid-cols-12 gap-x-8 gap-y-12">
        {/* Left: the pitch and the direct routes */}
        <div data-reveal className="col-span-12 space-y-8 md:col-span-5">
          <p className="max-w-md text-base leading-relaxed text-muted md:text-lg">
            {contact.blurb}
          </p>

          <p className="eyebrow text-accent-soft">{contact.availability}</p>

          <div>
            <p className="eyebrow text-faint">Useful first message</p>
            <ul className="mt-3 space-y-2">
              {contact.askFor.map((line) => (
                <li key={line} className="flex gap-3 text-sm text-paper">
                  <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 bg-accent" />
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex items-center gap-3 text-paper transition-colors hover:text-accent-soft"
            >
              <span className="grid h-10 w-10 place-items-center border border-paper/25">
                <Mail className="h-[18px] w-[18px]" />
              </span>
              <span className="text-sm font-medium break-all">{site.email}</span>
            </a>
            <div>
              <a
                href={site.resume}
                download
                className="inline-flex items-center gap-2 border border-paper/35 px-4 py-2.5 text-sm font-semibold text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink"
              >
                <Download className="h-4 w-4" />
                Download résumé
              </a>
            </div>
          </div>

          <ul className="flex flex-wrap gap-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-paper/20 px-3 py-2 text-sm font-medium text-muted transition-colors hover:border-paper hover:text-paper"
                >
                  <SocialIcon label={s.label} className="h-4 w-4" />
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: the form */}
        <form
          data-reveal
          style={{ "--reveal-delay": "90ms" } as React.CSSProperties}
          onSubmit={handleSubmit}
          className="col-span-12 space-y-4 md:col-span-6 md:col-start-7"
        >
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="eyebrow mb-1.5 block text-faint">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className={fieldClass}
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="eyebrow mb-1.5 block text-faint">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={fieldClass}
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="eyebrow mb-1.5 block text-faint">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className={`${fieldClass} resize-y`}
              placeholder="What are you building, and where is it stuck?"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={status === "sending"}
              className="group inline-flex items-center gap-2 border border-paper bg-paper px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send message"}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none" />
            </button>

            <p aria-live="polite" className="text-sm">
              {status === "success" ? (
                <span className="font-medium text-accent-soft">
                  Thanks — I read every message and reply within a day or two.
                </span>
              ) : null}
              {status === "error" ? (
                <span className="font-medium text-accent-soft">
                  Could not send ({error}). Email me directly instead.
                </span>
              ) : null}
            </p>
          </div>
        </form>
      </div>
    </Section>
  );
}
