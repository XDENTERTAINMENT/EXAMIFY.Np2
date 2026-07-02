import axios from "axios";

// ✅ UPDATED — baseURL now comes from .env (VITE_API_URL) instead of being
// hardcoded/commented in and out by hand for local vs production.
//
// Vite only exposes env vars prefixed with VITE_ to the browser bundle
// (via import.meta.env, NOT process.env — process.env is a Node.js global
// and isn't defined in client-side Vite code by default). This matches
// the pattern already used in main.jsx for VITE_GOOGLE_CLIENT_ID.
//
// Falls back to localhost if VITE_API_URL isn't set, so local dev still
// works even without a .env file present.
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});


 // ✅ ONE clean interceptor only
 API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  // console.log("TOKEN:", token);

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
 });

 // ✅ Handle expired token globally
 API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("AUTH ERROR:", {
        status: error.response.status,
        message: error.response.data?.message,
        url: error.config?.url,
        time: new Date().toISOString(),
      });

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "/";
    }

    // ✅ ADDED — a teacher/student blocked from the admin dashboard
    // mid-session (see middleware/authmiddleware.js's checkNotBlocked)
    // was previously just failing silently — individual pages like
    // TeacherDashboard.jsx only console.log their fetch errors, nothing
    // user-facing. This catches it globally instead of patching every
    // page's catch block one at a time.
    //
    // Checked via error.response.data.code, NOT status 403 alone — other
    // 403s exist for plan-gating (requirePlan) and role mismatches, and
    // those should NOT force a logout/redirect.
    if (error.response?.status === 403 && error.response.data?.code === "ACCOUNT_BLOCKED") {
      const storedUser = JSON.parse(localStorage.getItem("user") || "null");
      const loginPath = storedUser?.role === "student" ? "/studentlogin" : "/teacherlogin";

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Stashed here (not passed via URL) so TeacherLogin.jsx / StudentLogin.jsx
      // can pick it up on mount and show it in their existing red banner —
      // same pattern already used for login-failure messages.
      localStorage.setItem("authNotice", error.response.data.message);

      window.location.href = loginPath;
    }

    return Promise.reject(error);
  }
); 

export default API;
