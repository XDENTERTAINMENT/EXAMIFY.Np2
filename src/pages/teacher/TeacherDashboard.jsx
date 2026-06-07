import React from "react";
import "./Teacher.css";
import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import API from "../../services/api";
import { useRef } from "react";
import { FaPen, FaTrash, FaUndo, FaUpload } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function TeacherDashboard() {
  const navigate = useNavigate();

  const [dashboardData, SetDashboardData] = useState([]);
  const [uploadedImage, setUploadedImage] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // console.log(localStorage.getItem("user"));

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
      try {
        const res = await API.get(`/answers/teacher/dashboard/${user.id}`);

        SetDashboardData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    loadActivities();
  }, [user?.id]);

  // ✅ AUTH GUARD (correct place)

  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="teacher-dashboard">
      {/* SIDEBAR */}
      <div
        className={`teacher-sidebar1 ${
          sidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        <button
          className="sidebar-toggle1"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </button>

        <div className="teacher-logo">
          <div className="avatar-wrapper">
            <img
              src={uploadedImage || user?.avatar}
              alt={user?.fullname || ""}
              className="avatar-img"
            />

            <div className="avatar-actions">
              <button
                type="button"
                className="edit-btn1"
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
        </div>

        <nav className="teacher-menu">
          <button className="active">Dashboard</button>

          <button onClick={() => navigate("/examexampage")}>Create Exam</button>

          <button onClick={() => navigate("/ViewQuestions")}>
            Manage Questions
          </button>

          <button onClick={() => navigate("/resultsPage")}>
            Student Results
          </button>

          <button onClick={() => navigate("/teacherAnalytics")}>
            Analytics
          </button>

          <button onClick={() => navigate("/settings")}>Settings</button>
        </nav>

        {/* SIDEBAR BOTTOM */}
        <div className="sidebar-bottom">
          <button onClick={() => navigate("/support")}>Help & Support</button>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="teacher-main">
        {/* HERO */}
        <section className="teacher-hero">
          <div className="hero-content">
            <span className="hero-tag">Teacher Control Panel</span>

            <h3 className="welcome">
              {user?.username ? `Welcome ${user.username} 👋` : "Welcome"}
            </h3>

            <p>
              Manage exams, monitor student performance, and organize
              assessments seamlessly.
            </p>
          </div>

          <div className="hero-action">
            <button onClick={() => navigate("/examexampage")}>
              + Create New Exam
            </button>
          </div>
        </section>

        {/* STATS */}
        <section className="teacher-stats">
          <div className="stats-card2">
            <h2>24</h2>
            <span>Total Exams</span>
          </div>

          <div className="stats-card2">
            <h2>1,240</h2>
            <span>Total Students</span>
          </div>

          <div className="stats-card2">
            <h2>530</h2>
            <span>Questions Uploaded</span>
          </div>

          <div className="stats-card2">
            <h2>89%</h2>
            <span>Average Score</span>
          </div>
        </section>

        {/* QUICK ACTIONS */}
        <section className="dashboard-card">
          <div className="card-header">
            <div>
              <h2>Quick Actions</h2>

              <p>Easily manage your examination system.</p>
            </div>
          </div>

          <div className="quick-actions">
            <button onClick={() => navigate("/examexampage")}>
              Create Exam
            </button>

            <button onClick={() => navigate("/uploadquestions")}>
              Upload Questions
            </button>

            <button onClick={() => navigate("/generate-exam-id")}>
              Generate Exam ID
            </button>

            <button onClick={() => navigate("/resultsPage")}>
              View Results
            </button>
          </div>
        </section>

        {/* RECENT EXAMS */}
        <section className="dashboard-card2">
          <div className="card-header">
            <div>
              <h2>Recent Exams</h2>

              <p>Recently created assessments.</p>
            </div>

            <button
              className="view-btn"
              onClick={() => navigate("/teacherAnalytics")}
            >
              View All
            </button>
          </div>

          <div className="recent-exams">
            {dashboardData && dashboardData.length > 0 ? (
              dashboardData.map((item, index) => (
                <div className="teacher-card" key={index}>
                  <h3>{item.examName}</h3>
                  <p>Submitted: {item.studentsSubmitted}</p>
                  <span className="status-badge">Status: {item.status}</span>
                </div>
              ))
            ) : (
              <p>No activities found</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default TeacherDashboard;
