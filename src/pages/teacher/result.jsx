import { useEffect, useState } from "react";
import { useMemo } from "react";
import API from "../../services/api";
import "./result.css";

function ResultsPage() {
  const [selectedExam, setSelectedExam] = useState("");

  const [examtitle, setexamtitle] = useState([]);

  const [examCode, setExamCode] = useState("");

  const [results, setResults] = useState([]);

  const [searchStudent, setSearchStudent] = useState("");

  // const [filteredResults, setFilteredResults] = useState([]);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [status, setStatus] = useState(""); // "success" or "error"

  // ✅ ADDED — drives which result-sheet columns render. Comes straight
  // from the backend response (examController.verifyResults), not
  // localStorage, since the backend is the authoritative source after
  // checkSubscription refreshes it.
  const [plan, setPlan] = useState("free");

  // const teacher = JSON.parse(localStorage.getItem("user"));

  //  fetch exam
useEffect(() => {
  const fetchexamtitle = async () => {
    try {
      const res = await API.get("/exam");
      console.log("EXAM API RESPONSE:", res.data);

      setexamtitle(res.data.exams || res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  fetchexamtitle();
}, []);

  // VERIFY EXAM + GET RESULTS

  const VerifyExamResults = async () => {
    if (!selectedExam || !examCode) {
      setStatus("error");
      setMessage("Please select exam and code");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      return;

      
    }

    try {
      setLoading(true);

      const res = await API.post("/exam/verify-results", {
        examName: selectedExam,
        examCode: examCode,
      });

      setResults(res.data.results);
      setPlan(res.data.plan || "free"); // ✅ ADDED
      console.log(res.data.results);

      // setFilteredResults(res.data.results);
      setStatus("success");
      setMessage("Results Loaded Successfully ✅");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      setLoading(false);
    } catch (err) {
      console.log(err);

      setLoading(false);
      setStatus("error");
      setMessage(err.response?.data?.message || "Something went wrong");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  // find students by surname


const filteredResults = useMemo(() => {
  return results.filter((item) =>
    (item.student?.lastname || item.student?.username || "")
      .toLowerCase()
      .includes(searchStudent.toLowerCase())
  );
}, [results, searchStudent]);

  return (
    <div className="resultsPage">
      {message && (
        <p className={status === "success" ? "success" : "error"}>{message}</p>
      )}
      {/* HEADER */}
      <div className="resultsHeader">
        <div>
          <h1>
            <i class="fa-solid fa-square-poll-vertical"></i> Exam Results
            Dashboard
          </h1>
          <p>Manage and monitor student performance</p>
        </div>
      </div>

      {/* TOP SEARCH AREA */}

      <div className="topSearchSection">
        {/* SELECT EXAM */}
        <div className="searchCard">
          <label>Select Exam</label>

          <select
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
          >
            <option value="">Select Exam</option>

            {Array.isArray(examtitle) &&
              examtitle.map((exam) => (
                <option key={exam._id} value={exam.name}>
                  {exam.name}
                </option>
              ))}
          </select>
        </div>

        {/* EXAM CODE */}
        <div className="searchCard">
          <label>Exam Code</label>

          <input
            type="text"
            placeholder="Enter Exam Code"
            value={examCode}
            onChange={(e) => setExamCode(e.target.value)}
          />
        </div>

        {/* VERIFY BUTTON */}
        <div className="searchCard buttonCard">
          <button onClick={VerifyExamResults}>
            {loading ? "Verifying..." : "Verify Exam"}
          </button>
        </div>
      </div>

      {/* ANALYTICS */}

      <div className="analyticsGrid">
        <div className="analyticsCard">
          <h2>120</h2>
          <p>Total Students</p>
        </div>

        <div className="analyticsCard">
          <h2>78%</h2>
          <p>Average Score</p>
        </div>

        <div className="analyticsCard">
          <h2>95%</h2>
          <p>Highest Score</p>
        </div>

        <div className="analyticsCard">
          <h2>12%</h2>
          <p>Failure Rate</p>
        </div>
      </div>

      {/* STUDENT SEARCH */}

      <div className="studentSearchContainer">
        <input
          type="text"
          placeholder="Search Student by Lastname"
          value={searchStudent}
          onChange={(e) => setSearchStudent(e.target.value)}
        />
      </div>

      {/* RESULTS TABLE */}

      {/* ✅ ADDED — quick upgrade nudge so it's clear columns are missing
          because of plan, not because data doesn't exist */}
      {plan !== "premium" && results.length > 0 && (
        <p style={{ color: "#6b7280", fontSize: 14, margin: "8px 0" }}>
          🔒 {plan === "free"
            ? "Percentage, status, date, device and tab-switch tracking are available on Pro and Premium."
            : "Device and tab-switch tracking are available on Premium."}{" "}
          <a href="/pricing">Upgrade</a>
        </p>
      )}

      <div className="tableContainer">
        <table className="resultsTable">
          <thead>
            <tr>
              <th>Student</th>
              <th>Score</th>
              {plan !== "free" && <th>Percentage</th>}
              <th>Time Used</th>
              <th>Resultstatus</th>
              {plan !== "free" && <th>Status</th>}
              {plan !== "free" && <th>Date</th>}
              {plan === "premium" && <th>Device</th>}
              {plan === "premium" && <th>Tab Switches</th>}
            </tr>
          </thead>

          <tbody>
            {filteredResults.map((item) => (
              <tr key={item._id}>
                <td>
                  {item.student?.lastname || item.student?.username } {item.student?.firstname}
                </td>

                <td>{item.score}/{item.totalQuestions}</td>

                {plan !== "free" && <td>{item.percentage}%</td>}

                <td>{item.durationUsed || 0} mins</td>

                <td>
                  <span
                    className={
                      item.resultStatus === "Passed" ? "passed" : "failed"
                    }
                  >
                    {item.resultStatus}
                  </span>
                </td>

                {plan !== "free" && <td>{item.status} </td>}

                {plan !== "free" && (
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                )}

                {plan === "premium" && <td>{item.device || "Unknown"}</td>}
                {plan === "premium" && <td>{item.tabSwitchCount ?? 0}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ResultsPage;
