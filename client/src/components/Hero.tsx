import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, type RefObject } from "react";
import { HeroProfileCard } from "@/components/HeroProfileCard";

type HeroProps = {
  heroProfileSlotRef: RefObject<HTMLDivElement>;
};

const TAGLINE =
  "MERN Stack Developer crafting scalable, secure, and real-time web applications.";

/** MERN + STACK — scales down on narrow phones; no horizontal overflow */
const heroHeading =
  "font-hero font-extrabold uppercase tracking-[-0.03em] text-black leading-[0.88] " +
  "text-[clamp(2rem,min(11vw,12rem),7.5rem)] sm:text-[clamp(2.75rem,9vw,7.5rem)] lg:text-[clamp(3.25rem,8vw,7.5rem)]";

/** DEVELOPER — same line as STACK, much smaller */
const heroDeveloperSmall =
  "font-hero font-semibold uppercase tracking-[-0.02em] text-slate-800 leading-none " +
  "text-[clamp(12px,1.75vw,22px)] sm:text-[clamp(14px,2vw,26px)]";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function Hero({ heroProfileSlotRef }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 32,
    mass: 0.35,
  });

  const progress = reducedMotion ? scrollYProgress : smoothProgress;
  const yImg = useTransform(progress, [0, 1], [0, reducedMotion ? 0 : -28]);

  const skipEnter = reducedMotion === true;

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-[100svh] overflow-x-hidden bg-white pt-28 pb-12 sm:pt-36 sm:pb-24"
    >
      {/* max-width 1200px, centered, horizontal padding */}
      <div className="relative mx-auto w-full min-w-0 max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-10">
        <h1 className="sr-only">
          Abdul Muez — MERN Stack Developer. {TAGLINE}
        </h1>

        {/* 3-column: flex, vertical center; gap 40–60px; stack on small screens */}
        <div className="hero-layout flex w-full flex-col items-center justify-center gap-10 text-center lg:flex-row lg:items-center lg:justify-center lg:gap-[clamp(2.5rem,5vw,3.75rem)] lg:text-left">
          {/* Left — right-aligned on lg */}
          <motion.div
            initial={skipEnter ? false : { opacity: 0, x: -36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: easeOut }}
            className="flex w-full min-w-0 flex-1 flex-col items-center gap-3 lg:min-w-0 lg:items-end lg:justify-center lg:text-right"
          >
            <p className="font-hero text-[clamp(0.7rem,3.2vw,1.125rem)] font-medium uppercase tracking-[0.28em] text-slate-500 sm:tracking-[0.4em]">
              ABDUL MUEZ
            </p>
            <p
              className={`${heroHeading} text-center lg:text-right sm:whitespace-nowrap`}
              aria-hidden
            >
              MERN
            </p>
          </motion.div>

          {/* Center — Portavia-style profile card: parallax, tilt, hover scale, flip */}
          <motion.div
            initial={skipEnter ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.08, ease: easeOut }}
            className="flex shrink-0 items-center justify-center"
          >
            <div
              ref={heroProfileSlotRef}
              className="hidden h-[500px] w-[400px] max-w-full shrink-0 lg:block"
              aria-hidden
            />
            <div className="w-full max-w-[400px] lg:hidden">
              <HeroProfileCard yScroll={yImg} />
            </div>
          </motion.div>

          {/* Right — left-aligned on lg; max-width + wrap; safe padding from edge */}
          <div className="flex w-full min-w-0 flex-1 flex-col items-center gap-5 px-1 text-center sm:px-2 lg:max-w-none lg:items-start lg:justify-center lg:gap-6 lg:pl-2 lg:pr-0 lg:text-left">
            <motion.div
              initial={skipEnter ? false : { opacity: 0, x: 36 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.06, ease: easeOut }}
              className="flex w-full max-w-[500px] flex-row flex-wrap items-baseline justify-center gap-x-2 gap-y-1 break-words [overflow-wrap:anywhere] lg:justify-start"
              aria-hidden
            >
              <span className={`${heroHeading} inline-block shrink-0`}>STACK</span>
              <span className={`${heroDeveloperSmall} inline-block shrink`}>DEVELOPER</span>
            </motion.div>
            <motion.p
              initial={skipEnter ? false : { opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.12, ease: easeOut }}
              className="mx-auto w-full max-w-[420px] text-pretty font-hero text-[16px] leading-[1.6] text-slate-600 sm:text-[17px] lg:mx-0 lg:text-[18px] lg:text-left"
            >
              {TAGLINE}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
