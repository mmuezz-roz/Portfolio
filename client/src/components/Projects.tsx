import { motion, useInView, useReducedMotion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { useProjects } from "@/hooks/useContent";
import type { Project } from "@/types/content";

/**
 * Rise up from below. Uses `useInView` + `animate` (not `whileInView`) so it works when
 * cards mount after data loads while already in the viewport — a common `whileInView` failure.
 */
function FeaturedProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, {
    once: true,
    amount: "some",
    margin: "0px 0px 120px 0px",
  });
  const [visibleOnMount, setVisibleOnMount] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    if (r.top < vh * 0.92 && r.bottom > 48) {
      setVisibleOnMount(true);
    }
  }, []);

  const show = reduced || isInView || visibleOnMount;

  const external = project.liveUrl.startsWith("http");
  const href = external ? project.liveUrl : project.liveUrl || "#contact";

  return (
    <motion.article
      ref={ref}
      initial={false}
      animate={
        reduced
          ? { opacity: 1, y: 0 }
          : show
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 48 }
      }
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.42, 0, 0.58, 1] }}
      className="w-full"
    >
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        className="group relative block aspect-video w-full overflow-hidden rounded-[28px] border border-black/10 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)] outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
      >
        <img
          src={project.imageUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition duration-[1.1s] ease-out group-hover:scale-[1.05]"
          loading={index === 0 ? "eager" : "lazy"}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/[0.88] via-black/45 to-black/25"
          aria-hidden
        />
        <div className="relative flex h-full min-h-0 w-full flex-col items-center justify-center px-5 py-8 text-center sm:px-10 sm:py-12 lg:px-16">
          <span className="inline-flex rounded-full bg-blue-600 px-4 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-white shadow-sm sm:text-xs">
            {project.category}
          </span>
          <h3 className="mt-4 max-w-[min(100%,52rem)] font-mega text-[clamp(1.5rem,4vw,3rem)] uppercase leading-[0.95] tracking-[-0.02em] text-white sm:mt-5">
            {project.title}
          </h3>
          <p className="mt-3 max-w-[min(100%,40rem)] font-sans text-sm font-normal leading-relaxed text-white/90 sm:mt-4 sm:text-base">
            {project.description}
          </p>
        </div>
      </a>
    </motion.article>
  );
}

export function Projects() {
  const { projects, loading } = useProjects();
  const list = projects.filter((p) => p.featured !== false);

  return (
    <section id="projects" className="scroll-mt-24 border-t border-surface-border bg-white py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-content px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-[min(100%,42rem)] text-left"
        >
          <h2 className="font-mega text-[clamp(2rem,6vw,3.5rem)] uppercase leading-[0.92] tracking-[-0.02em] text-[#111]">
            Featured Projects
          </h2>
          <p className="mt-8 max-w-[40rem] font-sans text-[1.0625rem] font-normal leading-[1.6] text-[#4b5563] sm:text-[1.125rem]">
            These selected projects reflect my focus on blending product sense with engineering — solving
            real problems through APIs, auth, and thoughtful UI.
          </p>
        </motion.div>

        {loading && (
          <p className="mt-16 text-center font-sans text-slate-500">Loading projects…</p>
        )}

        {!loading && list.length === 0 && (
          <p className="mt-16 text-center text-slate-500">No projects to show yet.</p>
        )}
      </div>

      {!loading && list.length > 0 && (
        <>
          {/* Wide cards with extra side breathing room */}
          <div className="mt-10 flex justify-center px-4 sm:mt-16 sm:px-6 md:px-10 lg:px-14 xl:px-16">
            <div
              id="projects-stack"
              className="flex w-full max-w-[min(88vw,1600px)] flex-col gap-8 lg:gap-10"
            >
              {list.map((p, i) => (
                <FeaturedProjectCard key={p.slug} project={p} index={i} />
              ))}
            </div>
          </div>

          <div className="mx-auto max-w-content px-4 pt-12 sm:px-6 sm:pt-14 md:px-10 lg:pt-16">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <a
                href="#projects"
                className="rounded-full border border-slate-300 bg-white px-10 py-3 font-sans text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Browse All Projects
              </a>
            </motion.div>
          </div>
        </>
      )}
    </section>
  );
}
