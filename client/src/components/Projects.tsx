import { motion } from "framer-motion";
import { useProjects } from "@/hooks/useContent";
import type { Project } from "@/types/content";
import ScrollStack, { ScrollStackItem } from "./projects/ScrollStack";

/**
 * Project card content. 
 * We removed the motion wrapper here because ScrollStack handles the transforms.
 */
function ProjectCardContent({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const external = project.liveUrl.startsWith("http");
  const href = external ? project.liveUrl : project.liveUrl || "#contact";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        aria-label={`${project.title} — view project`}
        className="group relative block aspect-video w-full overflow-hidden rounded-[32px] border border-black/10 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.4)] outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
      >
        <img
          src={project.imageUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition duration-[1.1s] ease-out group-hover:scale-[1.05]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
          aria-hidden
        />
        <div className="relative flex h-full min-h-0 w-full flex-col items-center justify-end px-5 pb-8 pt-16 text-center sm:px-10 sm:pb-10 lg:px-16">
          <h3 className="max-w-[min(100%,52rem)] font-mega text-[clamp(1.5rem,4vw,3rem)] uppercase leading-[0.95] tracking-[-0.02em] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)]">
            {project.title}
          </h3>
        </div>
      </a>
    </motion.div>
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
          <h2 className="font-mega text-[clamp(2.5rem,8vw,4.5rem)] uppercase leading-[0.92] tracking-[-0.02em] text-[#111]">
            Selected Works
          </h2>
          <p className="mt-8 max-w-[40rem] font-sans text-[1.125rem] font-normal leading-[1.6] text-[#4b5563] sm:text-[1.25rem]">
            A collection of projects where I've focused on building robust backends 
            and polished user experiences.
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
        <div className="mt-12 sm:mt-20">
          <ScrollStack 
            useWindowScroll={true} 
            itemDistance={60} 
            itemStackDistance={35}
            baseScale={0.88}
            itemScale={0.025}
            stackPosition="12%"
          >
            {list.map((p, i) => (
              <ScrollStackItem key={p.slug} itemClassName="!bg-transparent !p-0 !shadow-none !border-none !rounded-none">
                <div className="mx-auto w-full max-w-[min(90vw,1200px)] px-4">
                  <ProjectCardContent project={p} index={i} />
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>


          <div className="mx-auto max-w-content px-4 pt-12 sm:px-6 sm:pt-14 md:px-10 lg:pt-16">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <a
                href="#contact"
                className="rounded-full border border-slate-300 bg-white px-10 py-3 font-sans text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Let's Build Something
              </a>
            </motion.div>
          </div>
        </div>
      )}
    </section>
  );
}

