import { Schema, model } from "mongoose";

export interface IProject {
  title: string;
  slug: string;
  description: string;
  category: string;
  imageUrl: string;
  liveUrl: string;
  tags: string[];
  featured: boolean;
  order: number;
}

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    liveUrl: { type: String, required: true },
    tags: [{ type: String }],
    featured: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Project = model<IProject>("Project", projectSchema);
