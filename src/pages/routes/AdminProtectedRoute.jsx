import { Navigate } from "react-router-dom";

// ✅ NEW FILE — not in original documented architecture.
// Mirrors pages/routes/protectedRoute.jsx's shape exactly, but checks the
// "adminToken"/"adminUser" localStorage keys instead of "token"/"user" —
// kept separate so a teacher or student session in the same browser can
// never satisfy this guard.
export default function AdminProtectedRoute({ children }) {
  const token = localStorage.getItem("adminToken");

  let admin = null;

  try {
    const stored = localStorage.getItem("adminUser");
    if (stored) {
      admin = JSON.parse(stored);
    }
  } catch (err) {
    console.error("Invalid admin data in localStorage", err);
  }

  if (!token || !admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
