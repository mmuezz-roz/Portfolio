import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { useCallback, useRef, useState } from "react";

type Props = {
  yScroll: MotionValue<number>;
  /** lg scroll journey: full 360° Y rotation driven by scroll progress */
  journeyFlipRotateY?: MotionValue<number>;
  journeyMode?: boolean;
  imageSrc?: string;
  imageAlt?: string;
};

const MAX_TILT_X = 10;
const MAX_TILT_Y = 14;

/**
 * Portavia-style hero portrait: scroll parallax, 3D tilt on pointer, hover scale,
 * click/tap to flip (front = photo, back = quick intro — mirrors template “two-sided” card feel).
 */
export function HeroProfileCard({
  yScroll,
  journeyFlipRotateY,
  journeyMode = false,
  imageSrc = "/profile.jpg",
  imageAlt = "Abdul Muez",
}: Props) {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springX = useSpring(tiltX, { stiffness: 280, damping: 28, mass: 0.4 });
  const springY = useSpring(tiltY, { stiffness: 280, damping: 28, mass: 0.4 });

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (reduced || flipped || journeyMode) return;
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      tiltY.set(px * -MAX_TILT_Y);
      tiltX.set(py * MAX_TILT_X);
    },
    [flipped, journeyMode, reduced, tiltX, tiltY]
  );

  const onPointerLeave = useCallback(() => {
    tiltX.set(0);
    tiltY.set(0);
  }, [tiltX, tiltY]);

  const toggleFlip = useCallback(() => {
    if (reduced || journeyMode) return;
    setFlipped((f) => !f);
    tiltX.set(0);
    tiltY.set(0);
  }, [journeyMode, reduced, tiltX, tiltY]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleFlip();
      }
    },
    [toggleFlip]
  );

  const hoverScale = reduced ? undefined : { scale: 1.03 };
  const parallaxStyle = reduced ? undefined : { y: yScroll };

  return (
    <motion.div
      style={parallaxStyle}
      className="relative z-10 w-full max-w-[400px] shrink-0 [perspective:1200px]"
    >
      <span className="sr-only">
        {journeyMode
          ? "Profile card — scroll moves the card and rotates it one full turn before it rests in About."
          : `Profile photo. ${flipped ? "Showing back." : "Showing front."} Press Enter or click to flip.`}
      </span>
      <motion.div
        animate={
          journeyFlipRotateY
            ? undefined
            : { rotateY: flipped ? 180 : 0 }
        }
        transition={
          journeyFlipRotateY
            ? undefined
            : { type: "spring", stiffness: 220, damping: 26 }
        }
        style={
          journeyFlipRotateY
            ? { rotateY: journeyFlipRotateY, transformStyle: "preserve-3d" }
            : { transformStyle: "preserve-3d" }
        }
        className={`relative mx-auto aspect-[4/5] w-full max-w-[400px] [transform-style:preserve-3d] lg:aspect-auto lg:h-[500px] lg:w-[400px] ${
          journeyMode ? "cursor-default" : "cursor-pointer"
        }`}
        onClick={toggleFlip}
        onKeyDown={onKeyDown}
        role={journeyMode ? "group" : "button"}
        tabIndex={journeyMode ? -1 : 0}
        aria-pressed={journeyMode ? undefined : flipped}
        aria-label={
          journeyMode
            ? "Portrait card in scroll animation"
            : flipped
              ? "Show portrait front"
              : "Show profile details"
        }
      >
        {/* Front — photo + tilt */}
        <div
          className="absolute inset-0 overflow-hidden rounded-[24px] border border-slate-200/80 bg-slate-100 shadow-[0_24px_64px_-16px_rgba(15,23,42,0.22),0_8px_24px_-8px_rgba(15,23,42,0.1)]"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "translateZ(1px)",
          }}
        >
          <motion.div
            ref={wrapRef}
            className="h-full w-full"
            style={{
              rotateX: springX,
              rotateY: springY,
              transformStyle: "preserve-3d",
            }}
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
            whileHover={journeyMode ? undefined : hoverScale}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div className="h-full w-full overflow-hidden rounded-[24px] shadow-inner">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="h-full w-full object-cover object-top"
                width={400}
                height={500}
                draggable={false}
              />
            </div>
          </motion.div>
        </div>

        {/* Back — template-style info panel (Portavia-style “second side” card) */}
        <div
          className="absolute inset-0 flex flex-col justify-end rounded-[24px] border border-slate-700/50 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-5 text-left text-white shadow-[0_24px_64px_-16px_rgba(15,23,42,0.45)] sm:p-8"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg) translateZ(1px)",
          }}
        >
          <p className="font-hero text-[11px] font-semibold uppercase tracking-[0.35em] text-white/60">
            Abdul Muez
          </p>
          <p className="mt-3 font-hero text-xl font-bold tracking-tight">MERN Stack Developer</p>
          <p className="mt-2 max-w-[280px] text-sm leading-relaxed text-white/75">
            Open to building scalable, secure web products. Let&apos;s talk about your next launch.
          </p>
          <a
            href="#contact"
            className="mt-6 inline-flex w-fit rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            Contact
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
