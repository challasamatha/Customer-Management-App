import axios from "axios";

export const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";

const api = axios.create({
  baseURL: `${API_BASE}/api`,
  headers: { "Content-Type": "application/json" }
});

export default api;
