import type { Request, Response } from "express";
import mongoose from "mongoose";
import { readSeed } from "../lib/readSeed.js";
import { BlogPost } from "../models/BlogPost.js";

export async function getBlogPosts(_req: Request, res: Response): Promise<void> {
  try {
    if (mongoose.connection.readyState === 1) {
      const posts = await BlogPost.find()
        .sort({ publishedAt: -1 })
        .limit(12)
        .lean();
      res.json(posts);
      return;
    }
    const raw = readSeed().blogPosts as Record<string, unknown>[];
    const posts = raw.map((p) => ({
      ...p,
      publishedAt: new Date(String(p.publishedAt)),
    }));
    res.json(posts);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to load posts" });
  }
}
