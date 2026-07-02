import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import adminAPI from "../../services/adminApi";
import "./AdminLogin.css";

// ✅ NEW FILE — not in original documented architecture.
// Hits POST /api/admin/login (controllers/adminController.js). There is
// no signup form anywhere for this — first admin is created via
// backend/scripts/createAdmin.js from the server shell.
function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await adminAPI.post("/admin/login", {
        email: email.trim(),
        password: password.trim(),
      });

      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("adminUser", JSON.stringify(res.data.admin));

      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="al-page">
      <div className="al-card">
        <div className="al-brand">
          <span className="al-logo">🎓</span>
          <h1>
            Examify<span>Admin</span>
          </h1>
        </div>

        <p className="al-sub">Sign in to the platform admin dashboard.</p>

        <form className="al-form" onSubmit={handleSubmit}>
          <div className="al-field">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@examifyedu.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="al-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {error && <div className="al-error">{error}</div>}

          <button type="submit" className="al-submit" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="al-footnote">
          Admin accounts are provisioned by the platform owner — there is no
          self-signup.
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
