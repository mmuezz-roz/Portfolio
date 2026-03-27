import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useState } from "react";
import { HeroProfileCard } from "@/components/HeroProfileCard";

type Props = {
  heroSlotRef: React.RefObject<HTMLDivElement>;
  aboutSlotRef: React.RefObject<HTMLDivElement>;
};

/**
 * lg+: fixed profile card travels from the hero slot to the About slot while scrolling.
 */
export function ProfileCardJourney({ heroSlotRef, aboutSlotRef }: Props) {
  const reduced = useReducedMotion();
  const [lg, setLg] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();

  const topMv = useMotionValue(0);
  const leftMv = useMotionValue(0);
  const widthMv = useMotionValue(400);
  /** One full Y rotation (360°) over the hero → About scroll range */
  const flipAngleMv = useMotionValue(0);

  const stiffness = reduced ? 400 : 220;
  const damping = reduced ? 45 : 32;
  const top = useSpring(topMv, { stiffness, damping, mass: 0.35 });
  const left = useSpring(leftMv, { stiffness, damping, mass: 0.35 });
  const width = useSpring(widthMv, { stiffness: 180, damping: 30, mass: 0.35 });
  const journeyFlipRotateY = useSpring(flipAngleMv, {
    stiffness: reduced ? 320 : 95,
    damping: reduced ? 42 : 22,
    mass: 0.55,
  });

  const yDrift = useTransform(scrollY, (y) => (reduced ? 0 : -Math.min(y, 800) * 0.012));

  const computeProgress = useCallback((y: number) => {
    const aboutSection = document.getElementById("about");
    if (!aboutSection) return 0;
    const aboutTop =
      aboutSection.getBoundingClientRect().top + window.scrollY;
    const start = 20;
    /** Finish journey a bit earlier so the card sits firmly beside About as that section arrives */
    const end = Math.max(aboutTop - window.innerHeight * 0.26, start + 220);
    const t = (y - start) / (end - start);
    return Math.min(1, Math.max(0, t));
  }, []);

  /** Extra px to push the card right while it sits beside #services (does not touch Services UI). */
  const getServicesSideNudge = useCallback(() => {
    if (reduced) return 0;
    const servicesEl = document.getElementById("services");
    if (!servicesEl) return 0;
    const sr = servicesEl.getBoundingClientRect();
    const vh = window.innerHeight;
    const visibleTop = Math.max(sr.top, 0);
    const visibleBottom = Math.min(sr.bottom, vh);
    const overlap = Math.max(0, visibleBottom - visibleTop);
    if (overlap < vh * 0.1) return 0;
    const sectionMidY = (sr.top + sr.bottom) / 2;
    const blend = Math.max(0, 1 - Math.abs(sectionMidY - vh / 2) / (vh * 0.55));
    return 72 + blend * 120;
  }, [reduced]);

  const updateTargets = useCallback(() => {
    const heroEl = heroSlotRef.current;
    const aboutEl = aboutSlotRef.current;
    if (!heroEl || !aboutEl) return;

    const h = heroEl.getBoundingClientRect();
    const a = aboutEl.getBoundingClientRect();
    const rawP = computeProgress(scrollY.get());
    const p = reduced ? (rawP >= 0.5 ? 1 : 0) : rawP;
    /** Bias horizontal travel earlier so the card moves right as soon as scrolling starts */
    const leftP = reduced ? p : 1 - (1 - p) ** 1.55;

    /** Services nudge must go to 0 near p→1 so the card meets the About slot exactly */
    const nudgeFade = Math.pow(1 - p, 0.42);
    const nudgeRight = getServicesSideNudge() * nudgeFade;

    /** Last part of scroll: pull a few px toward the About column (closer to “About me” copy) */
    const pullTowardAbout = reduced ? 0 : Math.pow(Math.max(0, p - 0.78) / 0.22, 1.15) * 44;

    topMv.set(h.top + (a.top - h.top) * p);
    leftMv.set(h.left + (a.left - h.left) * leftP + nudgeRight - pullTowardAbout);
    widthMv.set(h.width + (a.width - h.width) * p);

    flipAngleMv.set(reduced ? 0 : p * 360);
  }, [
    aboutSlotRef,
    computeProgress,
    flipAngleMv,
    getServicesSideNudge,
    heroSlotRef,
    leftMv,
    reduced,
    scrollY,
    topMv,
    widthMv,
  ]);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setLg(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!lg || !mounted) return;
    let id: number;
    const tick = () => {
      updateTargets();
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [lg, mounted, updateTargets]);

  useEffect(() => {
    if (!lg) return;
    const onResize = () => updateTargets();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [lg, updateTargets]);

  if (!mounted || !lg) return null;

  return createPortal(
    <motion.div
      className="pointer-events-none fixed z-[25] [perspective:1200px]"
      style={{
        top,
        left,
        width,
      }}
    >
      <div className="pointer-events-auto w-full">
        <HeroProfileCard
          yScroll={yDrift}
          journeyFlipRotateY={journeyFlipRotateY}
          journeyMode
        />
      </div>
    </motion.div>,
    document.body
  );
}
