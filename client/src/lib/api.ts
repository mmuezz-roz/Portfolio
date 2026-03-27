import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "";

export const api = axios.create({
  baseURL: baseURL ? `${baseURL}/api` : "/api",
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});
