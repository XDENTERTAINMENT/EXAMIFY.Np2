import React, { useState } from "react";
import API from "../../services/api";
import "./ForgotPasswordModal.css";

// Shared 3-step forgot-password modal used by both TeacherLogin.jsx and
// StudentLogin.jsx. `role` tells the backend which collection to look the
// account up in ("teacher" -> teacherdb, "student" -> userdb).
//
// Steps: email -> otp -> reset. Each step's API failure surfaces inline
// inside the modal rather than closing it, so the person doesn't lose their
// place after a typo.
function ForgotPasswordModal({ role, onClose }) {
  const [step, setStep] = useState("email"); // "email" | "otp" | "reset" | "done"
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const closeOnOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Enter your email address");
      return;
    }

    setLoading(true);
    try {
      const res = await API.post("/auth/forgot-password", {
        email: email.trim(),
        role,
      });
      setInfo(res.data.message);
      setStep("otp");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send code");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError("");

    if (!code.trim()) {
      setError("Enter the 6-digit code");
      return;
    }

    setLoading(true);
    try {
      const res = await API.post("/auth/verify-otp", {
        email: email.trim(),
        role,
        code: code.trim(),
      });
      setResetToken(res.data.resetToken);
      setStep("reset");
      setInfo("");
    } catch (err) {
      setError(err.response?.data?.message || "Incorrect code");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await API.post("/auth/forgot-password", {
        email: email.trim(),
        role,
      });
      setInfo(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend code");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (!newPassword || !confirmPassword) {
      setError("Fill in both password fields");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await API.post("/auth/reset-password", {
        resetToken,
        newPassword,
      });
      setStep("done");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fp-overlay" onClick={closeOnOverlayClick}>
      <div className="fp-modal">
        <button className="fp-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        {step === "email" && (
          <>
            <h2>Reset your password</h2>
            <p className="fp-sub">
              Enter the email linked to your account and we'll send you a
              6-digit code.
            </p>

            {error && <p className="fp-error">{error}</p>}

            <form onSubmit={handleSendCode}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />

              <button disabled={loading} type="submit" className="fp-btn">
                {loading ? "Sending..." : "Send Code"}
              </button>
            </form>
          </>
        )}

        {step === "otp" && (
          <>
            <h2>Enter the code</h2>
            <p className="fp-sub">
              We sent a 6-digit code to <strong>{email}</strong>. It expires
              in 10 minutes.
            </p>

            {info && <p className="fp-info">{info}</p>}
            {error && <p className="fp-error">{error}</p>}

            <form onSubmit={handleVerifyCode}>
              <input
                type="text"
                inputMode="numeric"
                placeholder="6-digit code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                maxLength={6}
                autoFocus
              />

              <button disabled={loading} type="submit" className="fp-btn">
                {loading ? "Verifying..." : "Verify Code"}
              </button>
            </form>

            <button
              className="fp-link-btn"
              onClick={handleResendCode}
              disabled={loading}
            >
              Didn't get it? Resend code
            </button>
          </>
        )}

        {step === "reset" && (
          <>
            <h2>Set a new password</h2>
            <p className="fp-sub">Choose a new password for your account.</p>

            {error && <p className="fp-error">{error}</p>}

            <form onSubmit={handleResetPassword}>
              <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoFocus
              />

              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <button disabled={loading} type="submit" className="fp-btn">
                {loading ? "Saving..." : "Reset Password"}
              </button>
            </form>
          </>
        )}

        {step === "done" && (
          <>
            <h2>Password reset ✅</h2>
            <p className="fp-sub">
              Your password has been updated. You can now log in with your
              new password.
            </p>

            <button className="fp-btn" onClick={onClose}>
              Back to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ForgotPasswordModal;
