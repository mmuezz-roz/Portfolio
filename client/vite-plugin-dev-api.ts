import fs from "node:fs";
import path from "node:path";
import type { IncomingMessage, ServerResponse } from "node:http";
import type { Plugin } from "vite";

const API_ORIGIN = "http://127.0.0.1:5000";
const FETCH_MS = 1500;

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
    req.on("error", reject);
  });
}

async function tryBackend(
  pathname: string,
  init?: RequestInit
): Promise<Response | null> {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), FETCH_MS);
  try {
    const res = await fetch(API_ORIGIN + pathname, { ...init, signal: ac.signal });
    clearTimeout(t);
    return res;
  } catch {
    clearTimeout(t);
    return null;
  }
}

function sendJson(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

/**
 * In dev: prefer the real Express API on :5000; if it is down or returns an error,
 * serve GET data from ../server/data/seed.json and accept POST /api/contact locally.
 * Removes ECONNREFUSED spam when only Vite is running.
 */
export function devApiPlugin(rootDir: string): Plugin {
  return {
    name: "dev-api-fallback",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = (req.url ?? "").split("?")[0] ?? "";
        if (!url.startsWith("/api/")) {
          next();
          return;
        }

        if (req.method === "GET" && (url === "/api/projects" || url === "/api/blog")) {
          const upstream = await tryBackend(url);
          if (upstream?.ok) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(await upstream.text());
            return;
          }
          const seedPath = path.resolve(rootDir, "../server/data/seed.json");
          try {
            const raw = fs.readFileSync(seedPath, "utf-8");
            const data = JSON.parse(raw) as { projects: unknown[]; blogPosts: unknown[] };
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(url === "/api/projects" ? data.projects : data.blogPosts));
            return;
          } catch (e) {
            console.error("[vite dev-api] Could not read seed.json:", e);
            sendJson(res, 500, { message: "Dev fallback failed (seed.json missing)" });
            return;
          }
        }

        if (req.method === "POST" && url === "/api/contact") {
          const body = await readBody(req);
          const upstream = await tryBackend("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body,
          });
          if (upstream?.ok) {
            res.statusCode = upstream.status;
            res.setHeader("Content-Type", upstream.headers.get("content-type") ?? "application/json");
            res.end(await upstream.text());
            return;
          }
          if (upstream && !upstream.ok && upstream.status !== 0) {
            const text = await upstream.text();
            if (upstream.status >= 500 || upstream.status === 503) {
              try {
                const parsed = JSON.parse(body || "{}") as Record<string, string>;
                console.warn(
                  "[vite dev-api] API contact error; using dev fallback. Payload:",
                  parsed.name,
                  parsed.email
                );
              } catch {
                /* ignore */
              }
              sendJson(res, 201, { ok: true, devFallback: true });
              return;
            }
            res.statusCode = upstream.status;
            res.setHeader("Content-Type", "application/json");
            res.end(text);
            return;
          }
          try {
            const parsed = JSON.parse(body || "{}") as Record<string, string>;
            console.log("[vite dev-api] contact (backend offline):", parsed.name ?? "?", parsed.email ?? "?");
          } catch {
            /* ignore */
          }
          sendJson(res, 201, { ok: true, devFallback: true });
          return;
        }

        if (req.method === "GET" && url === "/api/health") {
          const upstream = await tryBackend("/health");
          if (upstream?.ok) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(await upstream.text());
            return;
          }
          sendJson(res, 200, { ok: true, dev: true, backend: "unreachable" });
          return;
        }

        next();
      });
    },
  };
}
