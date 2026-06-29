import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

// ✅ NEW PAGE — not in original documented architecture.
// Shown when submissionController.saveAnswer blocks a NEW student because
// the exam owner (teacher) has hit their plan's monthly student cap.
function ExamLimitReached() {
  const location = useLocation();
  const navigate = useNavigate();

  const message =
    location.state?.message ||
    "This exam has reached its maximum number of students for this month.";

  return (
    <div style={{ textAlign: "center", padding: "60px 20px", maxWidth: 480, margin: "0 auto" }}>
      <h2>🚫 Exam Unavailable</h2>
      <p style={{ marginTop: 16, color: "#374151" }}>{message}</p>
      <button
        style={{
          marginTop: 24,
          padding: "10px 20px",
          borderRadius: 8,
          border: "none",
          background: "#4f46e5",
          color: "#fff",
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        Go Home
      </button>
    </div>
  );
}

export default ExamLimitReached;
