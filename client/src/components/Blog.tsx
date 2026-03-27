import { motion } from "framer-motion";
import { useBlogPosts } from "@/hooks/useContent";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

export function Blog() {
  const { posts, loading } = useBlogPosts();
  const slice = posts.slice(0, 3);

  return (
    <section id="insights" className="scroll-mt-24 border-t border-surface-border py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-content px-4 sm:px-6 md:px-10 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">Blog</p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
            Design Insights &amp; Ideas
          </h2>
          <p className="mt-6 text-base leading-relaxed text-slate-600">
            From engineering notes to workflow tips — content is driven by your API or{" "}
            <code className="break-all rounded bg-surface-muted px-1.5 py-0.5 text-[0.85em] text-slate-600 sm:break-normal">
              server/data/seed.json
            </code>
            .
          </p>
        </motion.div>

        {loading && <p className="mt-16 text-center text-slate-500">Loading…</p>}

        {!loading && (
          <>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {slice.map((post, i) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex flex-col overflow-hidden rounded-[1.35rem] border border-surface-border bg-surface-raised/40"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-surface-card">
                    <img src={post.coverImage} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      {post.category} · {formatDate(post.publishedAt)}
                    </p>
                    <h3 className="mt-3 font-display text-lg font-semibold text-slate-900">{post.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{post.excerpt}</p>
                  </div>
                </motion.article>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-14 flex justify-center"
            >
              <a
                href="#insights"
                className="rounded-full border border-surface-border px-8 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-500/40 hover:text-slate-900"
              >
                Browse All Insights
              </a>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
