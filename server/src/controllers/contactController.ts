import type { Request, Response } from "express";
import mongoose from "mongoose";
import { ContactSubmission } from "../models/ContactSubmission.js";

export async function submitContact(req: Request, res: Response): Promise<void> {
  try {
    const { name, email, service, message } = req.body as Record<string, string>;
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      res.status(400).json({ message: "Name, email, and message are required." });
      return;
    }
    if (mongoose.connection.readyState !== 1) {
      res.status(503).json({
        message:
          "Database is not connected. Add MONGODB_URI to server/.env to store messages.",
      });
      return;
    }
    await ContactSubmission.create({
      name: name.trim(),
      email: email.trim(),
      service: service?.trim(),
      message: message.trim(),
    });
    res.status(201).json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Could not save message." });
  }
}
