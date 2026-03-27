import { Schema, model } from "mongoose";

export interface IContactSubmission {
  name: string;
  email: string;
  service?: string;
  message: string;
}

const contactSchema = new Schema<IContactSubmission>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    service: { type: String },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export const ContactSubmission = model<IContactSubmission>(
  "ContactSubmission",
  contactSchema
);
