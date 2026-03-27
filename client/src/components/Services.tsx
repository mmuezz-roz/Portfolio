import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const services = [
  {
    n: "1",
    title: "APIs & backend",
    bullets: [
      "REST APIs with Express and MVC structure",
      "MongoDB modeling with Mongoose",
      "JWT, refresh tokens, Google OAuth, OTP flows",
    ],
  },
  {
    n: "2",
    title: "Frontend & UX",
    bullets: [
      "React (Vite) and Next.js interfaces",
      "Tailwind CSS, responsive layouts, component-driven UI",
      "Context-based state and pragmatic performance",
    ],
  },
  {
    n: "3",
    title: "Real-time",
    bullets: [
      "Socket.io for chat, presence, and live updates",
      "Private channels and online indicators",
      "Pairing WebSockets with your REST surface",
    ],
  },
  {
    n: "4",
    title: "Shipping",
    bullets: [
      "Vercel + Render deployments",
      "Environment-based configuration",
      "Clear handoff so teams can iterate",
    ],
  },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-[0.65rem] w-[0.65rem] shrink-0 text-[#222222] transition-transform duration-300 ease-out ${
        open ? "rotate-180" : "rotate-0"
      }`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function Services() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="services"
      className="scroll-mt-24 border-t border-[#e5e5e5] bg-[#F2F2F2] py-16 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-content px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16">
        <div className="mx-auto w-full max-w-[min(100%,42rem)] text-left lg:mx-0 lg:max-w-[58%]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-mega uppercase text-[clamp(2.75rem,7vw,4rem)] leading-[0.92] tracking-[-0.02em] text-[#222222]">
              what I can do for you
            </h2>
            <p className="mt-10 max-w-[26rem] font-sans text-[1.125rem] font-normal leading-[1.55] text-[#222222]">
              As a full-stack developer, I&apos;m a product-minded engineer — crafting end-to-end
              experiences that stay maintainable as scope grows and users show up.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-16 border-t border-[#d4d4d4]"
          >
            <ul className="divide-y divide-[#d4d4d4]">
              {services.map((s, i) => {
                const open = openIndex === i;
                return (
                  <li key={s.n} className="text-left">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(open ? null : i)}
                      className="flex w-full min-w-0 items-center justify-between gap-3 py-[1.25rem] text-left transition-colors hover:bg-black/[0.02] sm:gap-6 sm:py-[1.75rem]"
                      aria-expanded={open}
                    >
                      <span className="flex min-w-0 flex-1 items-baseline gap-x-3">
                        <span className="shrink-0 font-mega text-[clamp(1.5rem,4.5vw,2.5rem)] font-normal leading-[0.95] tracking-[-0.02em] text-[#222222]">
                          {s.n}.
                        </span>
                        <span className="min-w-0 font-mega text-[clamp(1.5rem,4.5vw,2.5rem)] font-normal uppercase leading-[0.95] tracking-[-0.02em] text-[#222222]">
                          {s.title}
                        </span>
                      </span>
                      <Chevron open={open} />
                    </button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <ul className="space-y-2.5 border-t border-[#e0e0e0] bg-[#F2F2F2] pb-8 pl-2 pt-5 font-sans text-[0.9375rem] leading-[1.55] text-[#333333] sm:pl-4 sm:text-[15px]">
                            {s.bullets.map((b) => (
                              <li
                                key={b}
                                className="relative pl-4 before:absolute before:left-0 before:top-[0.55em] before:h-1 before:w-1 before:rounded-full before:bg-[#888888]"
                              >
                                {b}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
