import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const faqs = [
  {
    q: "What services do you offer?",
    a: "Full-stack web development with the MERN stack: REST APIs, MongoDB modeling, React frontends, authentication (JWT, OAuth, OTP), and Socket.io when you need real-time features.",
  },
  {
    q: "How does your typical process work?",
    a: "Clarify requirements and constraints, design API and UI structure, implement in iterative slices, then deploy with environment-based configuration and clear handoff notes.",
  },
  {
    q: "How long does a project usually take?",
    a: "Depends on scope — a focused MVP might be a few weeks; larger products scale with features, integrations, and review cycles. I’m happy to estimate after a short discovery call.",
  },
  {
    q: "What do I need to provide before starting?",
    a: "Goals, target users, any brand or design references, auth/hosting preferences, and timeline. Existing repos or API docs help a lot.",
  },
  {
    q: "Do you offer revisions?",
    a: "Yes — we align on milestones and include reasonable iteration within each phase so the product matches what we agreed.",
  },
  {
    q: "How do I get started?",
    a: "Use the contact form below or email mmuez58@gmail.com with a short brief; I’ll reply with next steps.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 border-t border-surface-border py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">FAQ</p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-6 text-base leading-relaxed text-slate-600">
            Here are answers to common questions. If yours isn&apos;t listed, reach out — I&apos;m happy to
            help.
          </p>
        </motion.div>

        <ul className="mt-14 space-y-3">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full min-w-0 items-start justify-between gap-3 rounded-[1.25rem] border border-surface-border bg-surface-raised/40 px-4 py-4 text-left text-sm font-medium text-slate-900 transition hover:border-slate-300 sm:gap-4 sm:px-5"
                >
                  <span className="flex min-w-0 flex-1 gap-2 sm:gap-3">
                    <span className="shrink-0 text-slate-500">{String(i + 1).padStart(2, "0")}.</span>
                    <span className="min-w-0">{item.q}</span>
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    className="text-slate-500"
                    aria-hidden
                  >
                    ▼
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-4 pt-2 text-sm leading-relaxed text-slate-600">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
