import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import "./analytics.css";

function TeacherAnalytics() {
  const [data, setData] = useState([]);
  const [locked, setLocked] = useState(false); // ✅ ADDED
  const navigate = useNavigate();

  const teacher = JSON.parse(localStorage.getItem("user"));
  const teacherId = teacher?.id;

 useEffect(() => {
  const fetchAnalytics = async () => {
    try {
      const res = await API.get(`/answers/teacher/analytics/${teacherId}`);
      setData(res.data);
    } catch (err) {
      // ✅ ADDED — distinguish "locked feature" from an actual error
      if (err.response?.status === 403 && err.response?.data?.locked) {
        setLocked(true);
      } else {
        console.log("Analytics error:", err);
      }
    }
  };

  fetchAnalytics();
}, [teacherId]);

  // ✅ ADDED — upgrade prompt instead of a misleading "no data" message
  if (locked) {
    return (
      <div className="analytics-page">
        <div className="analytics-header">
          <h1>📊 Exam Analytics</h1>
        </div>
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <p style={{ fontSize: 18, marginBottom: 16 }}>
            🔒 Analytics is available on the Pro and Premium plans.
          </p>
          <button
            style={{
              padding: "10px 20px",
              borderRadius: 8,
              border: "none",
              background: "#4f46e5",
              color: "#fff",
              cursor: "pointer",
            }}
            onClick={() => navigate("/pricing")}
          >
            View Plans
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="analytics-page">
      {/* HEADER */}
      <div className="analytics-header">
        <h1>📊 Exam Analytics</h1>
        <p>Track performance, submissions and exam activity</p>
      </div>

      {/* GRID */}
      <div className="analytics-grid">
        {data.length === 0 ? (
          <p className="empty">No analytics available yet</p>
        ) : (
          data.map((exam, index) => (
            <div className="analytics-card" key={index}>
              <h3>{exam.examName}</h3>

              <div className="analytics-row">
                <span>👨‍🎓 Students</span>
                <strong>{exam.studentsSubmitted}</strong>
              </div>

              <div className="analytics-row">
                <span>📌 Status</span>
                <strong className={`status ${exam.status}`}>
                  {exam.status}
                </strong>
              </div>

              <div className="analytics-row">
                <span>⏱ Duration</span>
                <strong>{exam.duration}</strong>
              </div>

              <div className="analytics-row">
                <span>📅 Created</span>
                <strong>
                  {new Date(exam.createdAt).toLocaleDateString()}
                </strong>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TeacherAnalytics;