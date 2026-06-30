import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import API from "../../services/api";
import "./Settings.css";

function Settings() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");

  const [activeTab, setActiveTab] = useState("account");
  const [plan, setPlan] = useState(storedUser?.plan || "free");
  const [subscriptionExpiresAt, setSubscriptionExpiresAt] = useState(
    storedUser?.subscriptionExpiresAt || null,
  );

  // ✅ refresh plan/expiry the same way TeacherDashboard.jsx already does,
  // so the Membership tab never shows stale data from last login.
  useEffect(() => {
    if (!storedUser?.id) return;

    const loadMe = async () => {
      try {
        const res = await API.get("/auth/me");
        setPlan(res.data.plan || "free");
        setSubscriptionExpiresAt(res.data.subscriptionExpiresAt || null);

        const updated = { ...storedUser, plan: res.data.plan, email: res.data.email };
        localStorage.setItem("user", JSON.stringify(updated));
      } catch (err) {
        console.log("Failed to refresh account info:", err);
      }
    };

    loadMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!token || !storedUser) {
    return <Navigate to="/" replace />;
  }

  // ✅ Settings is teacher-only (this was incorrectly also linked from the
  // student sidebar in a previous pass — that button has been removed, and
  // this guard stops a student from reaching it directly via URL too).
  if (storedUser.role !== "teacher") {
    return <Navigate to="/studentdashboard" replace />;
  }

  const isTeacher = true;

  const TABS = [
    { id: "account", label: "Account Setting", sub: "Details about your personal information" },
    { id: "notification", label: "Notification", sub: "Manage alerts and updates" },
    { id: "membership", label: "Membership Plan", sub: "Details about your current plan" },
    { id: "security", label: "Password & Security", sub: "Keep your account safe" },
  ];

  return (
    <div className="settings-page">
      <button className="settings-back" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="settings-layout">
        {/* LEFT NAV */}
        <div className="settings-nav">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`settings-nav-item ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="settings-nav-title">{tab.label}</span>
              <span className="settings-nav-sub">{tab.sub}</span>
            </button>
          ))}
        </div>

        {/* RIGHT PANEL */}
        <div className="settings-panel">
          {activeTab === "account" && (
            <AccountTab storedUser={storedUser} isTeacher={isTeacher} plan={plan} />
          )}
          {activeTab === "notification" && <NotificationTab />}
          {activeTab === "membership" && isTeacher && (
            <MembershipTab plan={plan} subscriptionExpiresAt={subscriptionExpiresAt} />
          )}
          {activeTab === "security" && <SecurityTab />}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   ACCOUNT SETTING TAB
========================================================= */
function AccountTab({ storedUser, isTeacher, plan }) {
  const [fullname, setFullname] = useState(storedUser.fullname || "");
  const [email, setEmail] = useState(storedUser.email || "");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Dark mode is a paid-plan perk for teachers (per product notes); students
  // get it for free since they don't have a plan concept.
  const darkModeLocked = isTeacher && plan === "free";
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("examify-dark-mode") === "true",
  );

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode && !darkModeLocked ? "dark" : "light",
    );
  }, [darkMode, darkModeLocked]);

  const toggleDarkMode = () => {
    if (darkModeLocked) return;
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem("examify-dark-mode", String(next));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setMessage("");

    try {
      const res = await API.put("/auth/update-profile", { fullname, email });
      setStatus("success");
      setMessage(res.data.message);

      const updated = { ...storedUser, fullname, email };
      localStorage.setItem("user", JSON.stringify(updated));
    } catch (err) {
      setStatus("error");
      setMessage(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="settings-card">
      <h3>Change User Information</h3>
      <p className="settings-card-sub">Update your profile details below.</p>

      {message && (
        <p className={status === "success" ? "settings-success" : "settings-error"}>
          {message}
        </p>
      )}

      <form onSubmit={handleSave} className="settings-form">
        <div className="settings-grid">
          <div className="settings-input-group">
            <label>Full Name</label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>

          <div className="settings-input-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
        </div>

        <button disabled={loading} type="submit" className="settings-primary-btn">
          {loading ? "Saving..." : "Update Information"}
        </button>
      </form>

      <div className="settings-divider" />

      <div className="settings-toggle-row">
        <div>
          <h4>Dark Mode</h4>
          <p className="settings-card-sub">
            {darkModeLocked
              ? "Available on the Pro and Premium plans."
              : "Switch the interface to a darker theme."}
          </p>
        </div>

        <button
          className={`settings-switch ${darkMode && !darkModeLocked ? "on" : ""} ${
            darkModeLocked ? "locked" : ""
          }`}
          onClick={toggleDarkMode}
          title={darkModeLocked ? "Upgrade to unlock dark mode" : ""}
        >
          <span className="settings-switch-knob" />
        </button>
      </div>

      {darkModeLocked && (
        <p className="settings-upgrade-hint">
          ⚡ <a href="/pricing">Upgrade to Pro/Premium</a> to unlock dark mode.
        </p>
      )}
    </div>
  );
}

/* =========================================================
   NOTIFICATION TAB
========================================================= */
function NotificationTab() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadNotifications = async () => {
    try {
      const res = await API.get("/notifications");
      setNotifications(res.data.notifications || []);
    } catch (err) {
      console.log(err);
      setError("Couldn't load notifications right now.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const markAsRead = async (id) => {
    try {
      await API.patch(`/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n)),
      );
    } catch (err) {
      console.log(err);
    }
  };

  const markAllRead = async () => {
    try {
      await API.patch("/notifications/read-all");
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="settings-card">
      <div className="settings-card-header-row">
        <div>
          <h3>Notifications</h3>
          <p className="settings-card-sub">
            Plan-expiration alerts and updates from the Examify team.
          </p>
        </div>

        {notifications.some((n) => !n.read) && (
          <button className="settings-link-btn" onClick={markAllRead}>
            Mark all as read
          </button>
        )}
      </div>

      {loading && <p className="settings-card-sub">Loading...</p>}
      {error && <p className="settings-error">{error}</p>}

      {!loading && notifications.length === 0 && (
        <p className="settings-card-sub">You're all caught up — no notifications yet.</p>
      )}

      <div className="settings-notification-list">
        {notifications.map((n) => (
          <div
            key={n._id}
            className={`settings-notification-item ${n.read ? "" : "unread"}`}
            onClick={() => !n.read && markAsRead(n._id)}
          >
            <div className="settings-notification-dot" />
            <div>
              <h4>{n.title}</h4>
              <p>{n.message}</p>
              <span className="settings-notification-date">
                {new Date(n.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   MEMBERSHIP PLAN TAB
========================================================= */
function MembershipTab({ plan, subscriptionExpiresAt }) {
  const navigate = useNavigate();

  let daysLeft = null;
  if (subscriptionExpiresAt) {
    const diff = new Date(subscriptionExpiresAt) - new Date();
    daysLeft = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }

  const planLabel = { free: "Free", pro: "Pro", premium: "Premium" }[plan] || "Free";

  return (
    <div className="settings-card">
      <h3>Membership Plan</h3>
      <p className="settings-card-sub">Your current subscription details.</p>

      <div className={`settings-plan-banner settings-plan-${plan}`}>
        <div>
          <span className="settings-plan-label">Current Plan</span>
          <h2>{planLabel}</h2>
        </div>

        {plan !== "free" && daysLeft !== null && (
          <div className="settings-plan-countdown">
            <span className="settings-plan-countdown-number">{daysLeft}</span>
            <span className="settings-plan-countdown-text">
              day{daysLeft === 1 ? "" : "s"} left
            </span>
          </div>
        )}
      </div>

      {plan === "free" && (
        <p className="settings-upgrade-hint">
          Upgrade to Pro or Premium to unlock analytics, more students, dark mode, and more.
        </p>
      )}

      <button className="settings-primary-btn" onClick={() => navigate("/pricing")}>
        {plan === "free" ? "View Plans" : "Manage / Renew Plan"}
      </button>
    </div>
  );
}

/* =========================================================
   PASSWORD & SECURITY TAB
========================================================= */
function SecurityTab() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      setStatus("error");
      setMessage("All fields are required");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatus("error");
      setMessage("New passwords do not match");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    if (newPassword.length < 8) {
      setStatus("error");
      setMessage("New password must be at least 8 characters");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    if (loading) return;
    setLoading(true);

    try {
      const res = await API.post("/auth/change-password", {
        currentPassword,
        newPassword,
      });
      setStatus("success");
      setMessage(res.data.message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setStatus("error");
      setMessage(err.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 4000);
    }
  };

  return (
    <div className="settings-card">
      <h3>Password & Security</h3>
      <p className="settings-card-sub">Change your password to keep your account secure.</p>

      {message && (
        <p className={status === "success" ? "settings-success" : "settings-error"}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="settings-form">
        <div className="settings-input-group">
          <label>Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
          />
        </div>

        <div className="settings-grid">
          <div className="settings-input-group">
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>

          <div className="settings-input-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
            />
          </div>
        </div>

        <button disabled={loading} type="submit" className="settings-primary-btn">
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}

export default Settings;
