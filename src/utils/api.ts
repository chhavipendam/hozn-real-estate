import axios from "axios";

// Base URL of the backend API. Set NEXT_PUBLIC_API_URL in your environment
// (e.g. .env.local for dev, or your host's env settings in production).
// Falls back to localhost for local development if unset.
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
