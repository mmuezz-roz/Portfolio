import { motion } from "framer-motion";
import { useState } from "react";
import { api } from "@/lib/api";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");
  const [mailtoFallback, setMailtoFallback] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") || "");
    const email = String(fd.get("email") || "");
    const service = String(fd.get("service") || "");
    const message = String(fd.get("message") || "");
    setStatus("loading");
    setMsg("");
    setMailtoFallback(null);
    const mailto = `mailto:mmuez58@gmail.com?subject=${encodeURIComponent(
      `Portfolio inquiry from ${name || "visitor"}`
    )}&body=${encodeURIComponent(
      `${message}\n\n—\nName: ${name}\nEmail: ${email}\nService: ${service || "(not specified)"}`
    )}`;
    try {
      await api.post("/contact", { name, email, service, message });
      setStatus("ok");
      setMsg("Thanks — I’ll get back to you shortly.");
      form.reset();
    } catch {
      setStatus("err");
      setMailtoFallback(mailto);
      setMsg(
        "Could not reach the server or save to the database. Use your email client or copy the address below."
      );
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 border-t border-surface-border py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-content px-4 sm:px-6 md:px-10 lg:px-12">
        <div className="grid items-start gap-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative mx-auto max-w-sm lg:mx-0"
          >
            <div className="overflow-hidden rounded-[2rem] border border-surface-border bg-surface-muted shadow-2xl">
              <img
                src="/profile.jpg"
                alt=""
                className="aspect-[4/5] w-full object-cover object-top"
              />
            </div>
            <p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">
              Contact
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Let&apos;s work together
            </h2>
            <p className="mt-6 text-base leading-relaxed text-slate-600">
              Let&apos;s build something impactful together — whether it&apos;s your product, your APIs, or
              your next MERN stack idea.
            </p>
            <dl className="mt-10 space-y-5 text-sm">
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">Email :</dt>
                <dd className="mt-1">
                  <a
                    href="mailto:mmuez58@gmail.com"
                    className="break-words font-display text-base text-slate-900 sm:text-lg"
                  >
                    mmuez58@gmail.com
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  Call Today :
                </dt>
                <dd className="mt-1 font-display text-lg text-slate-900">+91 9061899853</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">Social :</dt>
                <dd className="mt-2 flex gap-5">
                  <a href="https://github.com/mmuezz-roz" className="text-slate-600 hover:text-blue-600">
                    GitHub
                  </a>
                  <a href="https://linkedin.com/in/abdul-muez" className="text-slate-600 hover:text-blue-600">
                    LinkedIn
                  </a>
                </dd>
              </div>
            </dl>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={onSubmit}
            className="rounded-[1.5rem] border border-surface-border bg-surface-raised/50 p-6 sm:p-10"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm">
                <span className="text-slate-500">Name</span>
                <input
                  name="name"
                  required
                  className="rounded-xl border border-surface-border bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-blue-500/40 focus:ring-2 focus:ring-blue-500/15"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                <span className="text-slate-500">Email</span>
                <input
                  name="email"
                  type="email"
                  required
                  className="rounded-xl border border-surface-border bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-blue-500/40 focus:ring-2 focus:ring-blue-500/15"
                />
              </label>
            </div>
            <label className="mt-5 flex flex-col gap-2 text-sm">
              <span className="text-slate-500">Service Needed ?</span>
              <select
                name="service"
                className="rounded-xl border border-surface-border bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-blue-500/40 focus:ring-2 focus:ring-blue-500/15"
                defaultValue=""
              >
                <option value="" disabled>
                  Select…
                </option>
                <option value="fullstack">Full-stack MERN</option>
                <option value="frontend">Frontend / React</option>
                <option value="backend">Backend / APIs</option>
                <option value="realtime">Real-time / Socket.io</option>
              </select>
            </label>
            <label className="mt-5 flex flex-col gap-2 text-sm">
              <span className="text-slate-500">What Can I Help You...</span>
              <textarea
                name="message"
                required
                rows={5}
                className="resize-none rounded-xl border border-surface-border bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-blue-500/40 focus:ring-2 focus:ring-blue-500/15"
              />
            </label>
            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-8 w-full rounded-full bg-blue-600 py-4 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
            >
              {status === "loading" ? "Sending…" : "Submit"}
            </button>
            {msg && (
              <div className="mt-4 space-y-3">
                <p
                  className={`text-sm ${status === "ok" ? "text-emerald-400" : "text-amber-400/95"}`}
                >
                  {msg}
                </p>
                {status === "err" && mailtoFallback && (
                  <a
                    href={mailtoFallback}
                    className="inline-flex text-sm font-semibold text-blue-600 underline-offset-4 hover:underline"
                  >
                    Open in email app
                  </a>
                )}
              </div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
