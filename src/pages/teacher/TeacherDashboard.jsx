import React from "react";
import "./Teacher.css";
import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import API from "../../services/api";
import { useRef } from "react";
import { FaPen, FaTrash, FaUndo, FaUpload } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import HelpButton from "../../components/HelpButton";
import OnboardingTour from "../../components/OnboardingTour";
import ComingSoonModal from "../../components/ComingSoonModal"; // ✅ ADDED

function TeacherDashboard() {
  const navigate = useNavigate();


    const teacherTourSteps = [
    {
      target: ".teacher-hero",
      content: "Welcome Teacher! This is your dashboard.",
    },
    {
      target: ".sidebar-create-exam",
      content: "Click here to create exams.",
    },
    {
      target: ".teacher-stats",
      content: "View submissions here.",
    },
    {
      target: ".dashboard-card",
      content: "Check analytics here.",
    },
  ];


  const [dashboardData, SetDashboardData] = useState([]);
  const [uploadedImage, setUploadedImage] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [plan, setPlan] = useState(null); // ✅ ADDED — freshest known plan
  // ✅ ADDED — controls Coming Soon modal; feature label shown inside it
  const [comingSoon, setComingSoon] = useState({ open: false, feature: "" });
  const openComingSoon = (feature) => setComingSoon({ open: true, feature });
  const closeComingSoon = () => setComingSoon({ open: false, feature: "" });

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

  // for profile image

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 1. Instant preview (UI)
    const previewUrl = URL.createObjectURL(file);
    setUploadedImage(previewUrl);

    // 2. Upload to backend
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      try {
        const res = await API.post("/auth/update-avatar", {
          userId: user.id,

          role: user.role,

          image: reader.result,
        });

        setUploadedImage(res.data.avatar);

        const updatedUser = {
          ...user,

          avatar: res.data.avatar,
        };

        localStorage.setItem(
          "user",

          JSON.stringify(updatedUser),
        );
      } catch (err) {
        console.log(err);
      }
    };
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

  // ✅ ADDED — gets the freshest plan (auto-downgraded server-side if
  // expired, via checkSubscription), not just whatever was true at login.
  useEffect(() => {
    if (!user?.id) return;

    const loadPlan = async () => {
      try {
        const res = await API.get("/auth/me");
        setPlan(res.data.plan || "free");

        // Keep localStorage in sync so other pages reading user.plan
        // (ViewQuestions.jsx, anlytic.jsx) also see the latest value
        // without needing a fresh login.
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
        storedUser.plan = res.data.plan;
        localStorage.setItem("user", JSON.stringify(storedUser));
      } catch (err) {
        console.log("Failed to refresh plan:", err);
        setPlan(user?.plan || "free"); // fall back to whatever's stored
      }
    };

    loadPlan();
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
      <OnboardingTour steps={teacherTourSteps} />

      {/* SIDEBAR */}

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Toggle Button */}
      <button
        className="sidebar-toggle1"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
      </button>

      <div
        className={`teacher-sidebar1 ${
          sidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
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

          <button onClick={() => navigate("/examexampage")} className="sidebar-create-exam">Create Exam</button>

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

            <h3
              className="welcome"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              {user?.username ? `Welcome ${user.username} 👋` : "Welcome"}
              {/* ✅ ADDED — plan badge */}
              {plan && (
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    padding: "4px 10px",
                    borderRadius: 999,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                    background:
                      plan === "premium"
                        ? "#fef3c7"
                        : plan === "pro"
                        ? "#e0e7ff"
                        : "#f3f4f6",
                    color:
                      plan === "premium"
                        ? "#92400e"
                        : plan === "pro"
                        ? "#4338ca"
                        : "#6b7280",
                  }}
                >
                  {plan} plan
                </span>
              )}
              <HelpButton
                title="How to use the Teacher Dashboard"
                steps={[
                  "Click 'Create Exam'",
                  "Enter exam details",
                  "Add questions",
                  "Publish the exam",
                  "Monitor submissions",
                ]}
              />
            </h3>

            <p>
              Manage exams, monitor student performance, and organize
              assessments seamlessly.
            </p>

            {/* ✅ ADDED — upgrade nudge, free plan only */}
            {plan === "free" && (
              <p style={{ marginTop: 8 }}>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    color: "#4f46e5",
                    fontWeight: 600,
                    cursor: "pointer",
                    padding: 0,
                  }}
                  onClick={() => navigate("/pricing")}
                >
                  ⚡ Upgrade to Pro/Premium for analytics, more students & more →
                </button>
              </p>
            )}
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

            {/* ✅ UPDATED — AI feature not yet live; shows Coming Soon modal */}
            <button onClick={() => openComingSoon("AI Upload & Question Generator")}>
              AI powered
            </button>

            {/* ✅ UPDATED — AI feature not yet live; shows Coming Soon modal */}
            <button onClick={() => openComingSoon("AI Exam Code Generator")}>
              AI powered
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
      {/* ✅ ADDED — Coming Soon modal for AI features */}
      <ComingSoonModal
        open={comingSoon.open}
        onClose={closeComingSoon}
        feature={comingSoon.feature}
      />
    </div>
  );
}

export default TeacherDashboard;
