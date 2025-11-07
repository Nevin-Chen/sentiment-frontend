const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

if (!API_URL) {
  throw new Error("VITE_API_URL environment variable is not defined");
}

export { API_URL };
