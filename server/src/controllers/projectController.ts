import type { Request, Response } from "express";
import mongoose from "mongoose";
import { readSeed } from "../lib/readSeed.js";
import { Project } from "../models/Project.js";

export async function getProjects(_req: Request, res: Response): Promise<void> {
  try {
    if (mongoose.connection.readyState === 1) {
      const projects = await Project.find().sort({ order: 1, createdAt: -1 }).lean();
      res.json(projects);
      return;
    }
    res.json(readSeed().projects);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to load projects" });
  }
}
