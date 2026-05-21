import React, { useEffect, useState } from "react";
import API from "../../services/api";
import "./analytics.css";

function TeacherAnalytics() {
  const [data, setData] = useState([]);

  const teacher = JSON.parse(localStorage.getItem("user"));
  const teacherId = teacher?.id;

  const fetchAnalytics = async () => {
    try {
      const res = await API.get(`/answers/teacher/analytics/${teacherId}`);
      setData(res.data);
    } catch (err) {
      console.log("Analytics error:", err);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

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