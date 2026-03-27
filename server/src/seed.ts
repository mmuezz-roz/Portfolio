import dotenv from "dotenv";
import mongoose from "mongoose";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { BlogPost } from "./models/BlogPost.js";
import { Project } from "./models/Project.js";

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("Set MONGODB_URI in server/.env before running seed.");
    process.exit(1);
  }
  await mongoose.connect(uri);

  const path = join(__dirname, "../data/seed.json");
  const raw = JSON.parse(readFileSync(path, "utf-8")) as {
    projects: Record<string, unknown>[];
    blogPosts: Record<string, unknown>[];
  };

  await Project.deleteMany({});
  await BlogPost.deleteMany({});

  await Project.insertMany(raw.projects);
  await BlogPost.insertMany(
    raw.blogPosts.map((b) => ({
      ...b,
      publishedAt: new Date(String(b.publishedAt)),
    }))
  );

  console.log(`Seeded ${raw.projects.length} projects, ${raw.blogPosts.length} posts.`);
  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
