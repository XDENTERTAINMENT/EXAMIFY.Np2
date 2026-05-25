import React from "react";

import "./Exam.css";

import { useState } from "react";

import API from "../../services/api";

function QuestionTitle({
  examCode,
  setExamCode,
  examtitle,
  setExamtitle,
  setSelectedExam,
}) {
  const [level, setLevel] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [status, setStatus] = useState(""); // "success" or "error"
  const [duration, setDuration] = useState(60);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const pushexam = async () => {
    try {
      const res = await API.post("/exam", {
        name: examtitle,

        examCode: examCode,

        level: level,
        duration: duration,
        startTime: startTime,
        endTime: endTime,
      });

      setSelectedExam(res.data._id);
      setStatus("success");
      setErrorMessage("✅ Exam Created Successfully");
      console.log("EXAM CREATED:", res.data);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error.response?.data?.message ||
          error.message ||
          "❌ Failed to add Exam",
      );
      console.log("ERROR MESSAGE:", error.response?.data?.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <div className="exam-container">
      {errorMessage && (
        <p className={status === "success" ? "success" : "error"}>
          {errorMessage}
        </p>
      )}
      <div className="section-header">
        <h2>Create Exam</h2>

        <p>Enter exam information before adding questions.</p>
      </div>

      <div className="form-grid">
        {/* EXAM TITLE */}
        <div className="input-group">
          <label>Exam Title</label>

          <input
            type="text"
            placeholder="e.g. CSC 472 Mid-Semester Test"
            value={examtitle}
            onChange={(e) => setExamtitle(e.target.value)}
          />
        </div>

        {/* EXAM CODE */}
        <div className="input-group">
          <label>Exam Code</label>

          <input
            type="text"
            placeholder="e.g. CSC472-2026"
            value={examCode}
            onChange={(e) => setExamCode(e.target.value)}
          />
        </div>

        {/* LEVEL */}
        <div className="input-group">
          <label>Level</label>

          <input
            type="text"
            placeholder="e.g. 400 Level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          />
        </div>
      </div>

      <div className="input-group">
        <label>Duration (minutes)</label>

        <input
          type="number"
          placeholder="e.g. 60"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>Start Time</label>

        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>End Time</label>

        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>
      <button className="primary-btn" onClick={pushexam}>
        Create Exam
      </button>
    </div>
  );
}

export default QuestionTitle;
