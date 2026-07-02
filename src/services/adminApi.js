import axios from "axios";

// ✅ NEW FILE — not in original documented architecture.
// Deliberately a SEPARATE axios instance from services/api.js, not a
// shared one. services/api.js's response interceptor clears
// localStorage "token"/"user" and redirects to "/" on any 401 — reusing
// it here would mean an expired admin session could wipe an unrelated
// teacher/student login in the same browser, and vice versa. Same
// baseURL source, own token key ("adminToken"), own redirect target.
//
// ✅ UPDATED — baseURL now reads from the same VITE_API_URL as
// services/api.js instead of a separately hardcoded string, so there's
// only one place to update per environment.
const adminAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

adminAPI.interceptors.request.use((req) => {
  const token = localStorage.getItem("adminToken");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

adminAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
      window.location.href = "/admin/login";
    }

    return Promise.reject(error);
  },
);

export default adminAPI;
