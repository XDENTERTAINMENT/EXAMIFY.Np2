import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import "./Student.css";
import API from "../../services/api";
import { useRef } from "react";
import { FaPen, FaTrash, FaUndo, FaUpload } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function StudentDashboard() {
  const navigate = useNavigate();

  const [selectedExam, setSelectedExam] = useState("");
  const [examId, setExamId] = useState("");
  const [isValid, setIsValid] = useState(false);
  // const [examtitle, setexamtitle] = useState([]);
  const [validatedExam, setValidatedExam] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [status, setStatus] = useState(""); // "success" or "error"
  const [dashboardData, SetDashboardData] = useState([]);
  const [uploadedImage, setUploadedImage] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // console.log(localStorage.getItem("user"));

  // const ProfileAvatar=()=>({
  //   user,
  //   uploadedImage,
  //   handleImageUpload,
  //   handleRemovePhoto,
  //   handleResetPhoto,
  // });

  const handleRemovePhoto = () => {};
  const handleResetPhoto = () => {};

  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
    setShowMenu(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  };

  useEffect(() => {
    if (!user?.id) return;

    const loadActivities = async () => {
      const res = await API.get(
        `/answers/student/recent-activities/${user.id}`,
      );

      SetDashboardData(res.data);
    };
    loadActivities();
  }, [user?.id]);

  // ✅ AUTH GUARD (correct place)

  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  // VALIDATE BY NAME + CODE
  const validateCode = async () => {
    try {
      const res = await API.post("/exam/validate", {
        examName: selectedExam,
        examCode: examId,
      });

      setValidatedExam(res.data.exam);
      setIsValid(true);
      setStatus("success");
      setErrorMessage("Validated ✅");
    } catch (err) {
      setIsValid(false);
      setValidatedExam(null);
      setStatus("error");

      setErrorMessage(err.response?.data?.message || "Validation failed");
    }

    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  };

  const handleJoin = () => {
    if (isValid && validatedExam) {
      navigate(`/exampage/${validatedExam.examCode}`);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="student-dashboard">
      {/* LEFT SIDEBAR */}
      <div className={`student-sidebar ${
    sidebarOpen ? "sidebar-open" : "sidebar-closed"
  }`}>

   <button
    className="sidebar-toggle"
    onClick={() => setSidebarOpen(!sidebarOpen)}
  >
    {sidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
  </button>
        <div className="student-profile">
          <div className="avatar-wrapper">
            <img
              src={uploadedImage || user?.avatar}
              alt={user?.fullname || ""}
              className="avatar-img"
            />

            <div className="avatar-actions">
              <button
                type="button"
                className="edit-btn"
                onClick={() => setShowMenu(!showMenu)}
              >
                <FaPen /> Edit
              </button>

              {showMenu && (
                <div className="avatar-menu">
                  <button onClick={handleUploadClick}>
                    <FaUpload /> Upload new photo
                  </button>

                  <button onClick={handleResetPhoto}>
                    <FaUndo /> Reset to default
                  </button>

                  <button onClick={handleRemovePhoto}>
                    <FaTrash className="redbin" /> Remove photo
                  </button>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                hidden
              />
            </div>
          </div>

          <h3>{user?.username ? `Welcome ${user.username} 👋` : "Welcome"}</h3>

          <p>Smart Assessment Platform</p>
        </div>
        <div className="sidebar-bottom">
          <button onClick={() => navigate("/support")}>Help & Support</button>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="student-main">
        {/* HERO */}
        <div className="dashboard-hero">
          <div className="hero-text">
            <h1>Continue Your Exams</h1>
            <p>
              Enter your exam name and validate with your exam code to begin.
            </p>
          </div>
        </div>

        {/* EXAM ENTRY CARD */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2>Select Exam</h2>
            <p>Enter exam details to continue</p>
          </div>

          <div className="exam-select-area">
            {/* MANUAL EXAM NAME INPUT */}
            <input
              type="text"
              placeholder="Enter Exam Name (e.g Biology)"
              value={selectedExam}
              onChange={(e) => {
                setSelectedExam(e.target.value);
                setIsValid(false);
              }}
            />

            {/* ERROR MESSAGE (FIXED) */}
            {errorMessage && (
              <p className={status === "success" ? "success" : "error"}>
                {errorMessage}
              </p>
            )}

            {/* VALIDATION SECTION */}
            {selectedExam && (
              <div className="exam-validation">
                <h3>Verify Access 🔐</h3>
                <p>Enter your Exam Code</p>

                <input
                  type="text"
                  placeholder="Enter Exam Code"
                  value={examId}
                  onChange={(e) => {
                    setExamId(e.target.value);
                    setIsValid(false);
                  }}
                />

                <button onClick={validateCode}>Validate ID</button>
              </div>
            )}
            {isValid && (
              <button className="start-exam-btn" onClick={handleJoin}>
                Start Exam 🚀
              </button>
            )}
          </div>
        </div>

        {/* RECENT ACTIVITY */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2>Recent Activity</h2>
            <p>Your latest exam performance history</p>
          </div>

          <div className="activity-list">
            {dashboardData.length > 0 ? (
              dashboardData.map((activity, index) => (
                <div className="activity-card" key={index}>
                  <div className="activity-left">
                    <h4>{activity.examName}</h4>
                    <p>{activity.timeAgo}</p>
                  </div>

                  <span className="completed-badge">{activity.status}</span>
                </div>
              ))
            ) : (
              <p className="empty-state">No exam history available yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="student-right">
        <div className="dashboard-card">
          <div className="card-header">
            <h2>Performance</h2>
          </div>

          <div className="performance-box">
            <h1>87%</h1>
            <span>Average Score</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
