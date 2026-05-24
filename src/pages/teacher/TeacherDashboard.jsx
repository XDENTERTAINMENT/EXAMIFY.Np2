import React from "react";
import "./Teacher.css";
import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import API from "../../services/api";

function TeacherDashboard() {
  const navigate = useNavigate();

  const [dashboardData, SetDashboardData] = useState([]);
 
 const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ AUTH GUARD (correct place)
  if (!token || !user) {
    return <Navigate to="/" replace />;
  }



  const Fetchactivities = async () => {
    try {
      // replace with actual teacher id
      const teacherId = user?.id;
      
    

      const res = await API.get(`/answers/teacher/dashboard/${teacherId}`);
      SetDashboardData(res.data);
    
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    Fetchactivities();
  }, [user]);

   const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="teacher-dashboard">
      {/* SIDEBAR */}
      <aside className="teacher-sidebar">
        <div className="teacher-logo">
          <div className="student-avatar">
            <img alt="" />
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

          <button className="logout-btn"  onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="teacher-main">
        {/* HERO */}
        <section className="teacher-hero">
          <div className="hero-content">
            <span className="hero-tag">Teacher Control Panel</span>

          <h3 className="welcome">{user?.username ? `Welcome ${user.username} 👋` : "Welcome"}</h3> 

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
            {dashboardData.map((item, index) => (
              <div className="teacher-card" key={index}>
                <div>
                  <h4>{item.examName}</h4>
                  <p>{item.studentsSubmitted} Students Submitted</p>
                </div>

                <span className="status-badge">{item.status}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default TeacherDashboard;
