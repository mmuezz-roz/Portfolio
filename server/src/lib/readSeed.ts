import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

type SeedFile = {
  projects: unknown[];
  blogPosts: unknown[];
};

let cache: SeedFile | null = null;

export function readSeed(): SeedFile {
  if (cache) return cache;
  const path = join(__dirname, "../../data/seed.json");
  const raw = readFileSync(path, "utf-8");
  cache = JSON.parse(raw) as SeedFile;
  return cache;
}
