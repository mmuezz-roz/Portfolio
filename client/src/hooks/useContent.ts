import { useEffect, useState } from "react";
import { FALLBACK_BLOG_POSTS, FALLBACK_PROJECTS } from "@/data/fallbackContent";
import { api } from "@/lib/api";
import type { BlogPost, Project } from "@/types/content";

function sortProjects(list: Project[]) {
  return [...list].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await api.get<Project[]>("/projects");
        const sorted = sortProjects(data);
        if (!cancelled) {
          setProjects(sorted);
          setError(null);
        }
      } catch {
        if (!cancelled) {
          setProjects(sortProjects(FALLBACK_PROJECTS));
          setError(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { projects, loading, error };
}

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await api.get<BlogPost[]>("/blog");
        if (!cancelled) {
          setPosts(data);
          setError(null);
        }
      } catch {
        if (!cancelled) {
          setPosts(FALLBACK_BLOG_POSTS);
          setError(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { posts, loading, error };
}
