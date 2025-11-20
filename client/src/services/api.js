import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ---------- Authentication ----------
// Note: server mounts auth routes under /api/auth
export const loginUser = (data) => api.post("/auth/login", data);
export const registerUser = (data) => api.post("/auth/register", data);

// ---------- Users ----------
export const getAllUsers = () => api.get("/users");
export const getUserById = (id) => api.get(`/users/${id}`);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/users/${id}`);

// ---------- Symptoms ----------
export const reportSymptoms = (data) => api.post("/symptoms", data);
export const getSymptoms = () => api.get("/symptoms");

// ---------- Articles ----------
export const getArticles = () => api.get("/articles");
export const getArticleById = (id) => api.get(`/articles/${id}`);

// ---------- Facilities ----------
export const getFacilities = () => api.get("/facilities");

// ---------- Analytics ----------
export const getSymptomTrend = () => api.get("/analytics/symptom-trend");
export const getTopSymptoms = () => api.get("/analytics/top-symptoms");
export const getDailyReports = () => api.get("/analytics/daily-reports");

// Admin: Add article
export const addArticle = (data) => api.post("/articles", data);

export default api;
