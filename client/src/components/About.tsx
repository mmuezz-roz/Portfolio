import { motion } from "framer-motion";
import { type RefObject } from "react";

const stats = [
  { label: "Year of Experience", value: "1" },
  { label: "Completed Projects", value: "5+" },
];

const socials = [
  {
    name: "X",
    href: "https://twitter.com",
    icon: (
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: (
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    ),
  },
  {
    name: "Behance",
    href: "https://behance.net",
    icon: (
      <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.5h11.506c2.21 0 3.957 1.115 3.957 3.27 0 1.584-.902 2.964-2.358 3.36v.09c1.793.316 2.7 1.514 2.7 3.27 0 2.52-1.93 3.498-4.27 3.498zM5.5 7.495v3.954h4.616c1.688 0 2.4-.792 2.4-1.98 0-1.188-.712-1.974-2.4-1.974H5.5zm0 9.488v4.517h5.19c1.97 0 2.81-.9 2.81-2.52 0-1.584-.84-2.52-2.81-2.52H5.5z" />
    ),
  },
  {
    name: "Dribbble",
    href: "https://dribbble.com",
    icon: (
      <path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12 12-5.373 12-12S18.628 0 12 0zm9.885 11.441c-2.575-.388-5.567-.21-8.011.49 1.844 5.073 2.605 9.416 2.742 10.244a9.886 9.886 0 005.339-5.59 9.94 9.94 0 00.93-5.144zM12 2.942c2.62 0 5.042.91 6.958 2.43-3.14 4.05-8.29 6.63-13.89 6.63-.47 0-.94-.02-1.4-.06A9.952 9.952 0 0112 2.942zM2.11 12.6c.45-.01.91-.02 1.38-.02 4.73 0 9.11 1.71 12.46 4.55a9.952 9.952 0 01-13.84-4.53z" />
    ),
  },
];

type AboutProps = {
  aboutProfileSlotRef: RefObject<HTMLDivElement>;
};

export function About({ aboutProfileSlotRef }: AboutProps) {
  return (
    <section id="about" className="scroll-mt-24 border-t border-surface-border bg-white py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-content px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16">
        <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* Left: copy — ~58% width track for Portavia-style card on the right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="order-1 w-full max-w-[min(100%,32rem)] text-left lg:col-span-7"
          >
            <h2 className="font-mega uppercase text-[clamp(2.5rem,9vw,4.5rem)] leading-[0.92] tracking-[-0.02em] text-[#000000]">
              About me
            </h2>
            <p className="mt-10 max-w-[32rem] font-sans text-[1.125rem] font-normal leading-[1.6] text-[#4B5563] sm:text-[1.25rem]">
              I&apos;m Abdul Muez, a Full Stack MERN Developer focused on crafting scalable, high-quality
              digital experiences. I specialize in building end-to-end applications, combining clean backend
              architecture with polished, user-friendly interfaces, always prioritizing clarity, security,
              and performance.
            </p>

            <div className="mt-16 flex flex-wrap gap-x-12 gap-y-10 sm:gap-x-16 lg:gap-x-20">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-sans text-[clamp(2.5rem,4vw,3rem)] font-bold tabular-nums leading-none text-indigo-500">
                    {s.value}
                  </p>
                  <p className="mt-3 font-sans text-base font-semibold leading-tight text-black">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-14 grid gap-10 sm:grid-cols-2 sm:gap-x-12">
              <div>
                <p className="font-sans text-[0.875rem] font-bold leading-snug text-black">Call Today :</p>
                <a
                  href="tel:+919061899853"
                  className="mt-2 block font-sans text-[0.875rem] font-normal leading-snug text-[#4B5563] transition hover:text-indigo-500"
                >
                  +91 9061899853
                </a>
              </div>
              <div>
                <p className="font-sans text-[0.875rem] font-bold leading-snug text-black">Email :</p>
                <a
                  href="mailto:mmuez58@gmail.com"
                  className="mt-2 block font-sans text-[0.875rem] font-normal leading-snug text-[#4B5563] underline decoration-[#d1d5db] underline-offset-[3px] transition hover:text-indigo-500 hover:decoration-indigo-400"
                >
                  mmuez58@gmail.com
                </a>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              {socials.map((soc) => (
                <a
                  key={soc.name}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#000000] transition hover:text-indigo-500"
                  aria-label={soc.name}
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    {soc.icon}
                  </svg>
                </a>
              ))}
            </div>

            <a
              href="#contact"
              className="mt-10 inline-flex items-center justify-center rounded-full border border-indigo-500 bg-transparent px-8 py-3 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-indigo-500 transition hover:bg-indigo-50"
            >
              My Story
            </a>

            <div className="mt-12 rounded-[1.25rem] border border-surface-border bg-surface-raised/40 p-6">
              <p className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[#6b7280]">
                Education
              </p>
              <p className="mt-3 font-sans text-sm font-normal leading-[1.6] text-[#4B5563]">
                Bachelor of Computer Applications (BCA), 2022–2025 — Nasra College of Arts and Science,
                Calicut University
              </p>
              <p className="mt-4 font-sans text-xs font-normal leading-relaxed text-[#6b7280]">
                MERN Stack Development Certification (2025–2026) — HACA
              </p>
            </div>
          </motion.div>

          {/* Right: profile slot + mobile image */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="relative order-2 mx-auto w-full max-w-md lg:col-span-5 lg:mx-0 lg:max-w-none lg:justify-self-end"
          >
            <div
              ref={aboutProfileSlotRef}
              className="mx-auto hidden h-[500px] w-full max-w-[400px] shrink-0 rounded-[2rem] lg:mx-0 lg:ml-auto lg:block"
              aria-hidden
            />
            <div className="overflow-hidden rounded-[2rem] border border-surface-border bg-surface-muted shadow-2xl lg:hidden">
              <img
                src="/profile.jpg"
                alt="Abdul Muez"
                className="aspect-[3/4] w-full object-cover object-top"
                width={440}
                height={586}
              />
            </div>
            <div className="pointer-events-none absolute -right-4 -top-4 hidden h-36 w-36 rounded-full bg-blue-500/10 blur-3xl lg:block" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
