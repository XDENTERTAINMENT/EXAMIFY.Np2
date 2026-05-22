import { useNavigate } from "react-router-dom";
import React from "react";
import bg from "./education.png";
import illustrator from "../../assets/images/illustrator.png";
import graduation from "../../assets/images/graduation-cap.svg";
import teacher from "../../assets/images/teacher.svg";
import clipboard from "../../assets/images/clipboard.svg";
import analytic from "../../assets/images/analytics.svg";
import chart from "../../assets/images/chart.svg";
import display from "../../assets/images/display.svg";
import file from "../../assets/images/file.svg";
import locks from "../../assets/images/lock.svg";
import pen from "../../assets/images/pen.svg";
import smile from "../../assets/images/smile.svg";
import user from "../../assets/images/users.svg";

import "./style.css";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div>
      {/* <!-- =========================
       HERO SECTION
  ========================== --> */}
      <section class="hero">
        {/* <!-- LEFT SIDE --> */}
        <div class="hero-left">
          {/* <!-- SMALL BADGE --> */}
          <div class="badge2">⭐ The Smarter Way to Assess & Learn</div>

          {/* <!-- MAIN HEADING --> */}
          <h1>
            Welcome to <br />
            Examify<span class="orange2">Edu</span>
          </h1>

          {/* <!-- DESCRIPTION --> */}
          <p>
            Create quizzes, test students, and track performance easily. Built
            for teachers. Designed for results.
          </p>

          {/* <!-- CARDS --> */}
          <div class="role-cards">
            {/* <!-- STUDENT CARD --> */}
            <div class="role-card student">
              <div class="icon-box pink">
                <i class="fa-solid fa-user-graduate"></i>
              </div>

              <div>
                <h3>I’m a Student</h3>
                <p>Take quizzes & track progress</p>
              </div>
              <button
                onClick={() =>
                  navigate("/studentloginpage", { state: { role: "student" } })
                }
              >
                {" "}
                <i class="fa-solid fa-chevron-right"></i>
              </button>
            </div>

            {/* <!-- TEACHER CARD --> */}
            <div class="role-card teacher">
              <div class="icon-box green">
                <i class="fa-solid fa-chalkboard-user"></i>
              </div>

              <div>
                <h3>I’m a Teacher</h3>
                <p>Create tests & manage students</p>
              </div>
              <button
                onClick={() =>
                  navigate("/teacherloginpage", {
                    state: {
                      role: "teacher",
                    },
                  })
                }
              >
                <i class="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>

          {/* <!-- STATS --> */}
          <div class="stats">
            <div class="stat-box">
              <div>
                <div>
                  <img src={user} />
                  <h2>10K+</h2>
                </div>

                <p>Students</p>
              </div>
            </div>

            <div class="stat-box">
              <div>
                <div>
                  <img src={clipboard} />
                  <h2>5K+</h2>
                </div>

                <p>Tests Created</p>
              </div>
            </div>

            <div class="stat-box">
              <div>
                <div>
                  <img src={chart} />
                  <h2>98%</h2>
                </div>

                <p>Success Rate</p>
              </div>
            </div>

            <div class="stat-box">
              <div>
                <div>
                  <img src={smile} />
                  <h2>24/7</h2>
                </div>

                <p>Support</p>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- RIGHT SIDE --> */}
        <div class="hero-right">
          <img src={illustrator} />
        </div>
      </section>

      {/* edcation illustrator */}

      <div className="education">
        <img src={bg} />
      </div>
      {/* <!-- =========================
       FEATURES SECTION
  ========================== --> */}
      <section class="features">
        <div class="feature-card">
          <i class="fa-solid fa-file-circle-plus"></i>
          <div>
            <h3>Easy Quiz Creation</h3>
            <p>Create engaging quizzes easily.</p>
          </div>
        </div>

        <div class="feature-card">
          <i class="fa-solid fa-chart-line"></i>
          <div>
            <h3>Real-time Results</h3>
            <p>Track performance instantly.</p>
          </div>
        </div>

        <div class="feature-card">
          <i class="fa-solid fa-lock"></i>
          <div>
            <h3>Secure & Reliable</h3>
            <p>Your data is always protected.</p>
          </div>
        </div>

        <div class="feature-card">
          <i class="fa-solid fa-display"></i>
          <div>
            <h3>Accessible Anywhere</h3>
            <p>Use it on any device anytime.</p>
          </div>
        </div>
      </section>

      {/* <!-- =========================
       HOW IT WORKS
  ========================== --> */}
      <section class="how-it-works">
        <h2>How ExamifyEdu Works</h2>
        <p class="subtitle">Simple steps to get started</p>

        <div class="steps">
          <div class="step">
            <div class="step-icon">
              <i class="fa-solid fa-user-plus"></i>
            </div>

            <h3>1. Sign Up</h3>
            <p>Create your account as a teacher or student.</p>
          </div>

          <div class="step">
            <div class="step-icon">
              <i class="fa-solid fa-clipboard"></i>
            </div>

            <h3>2. Create or Join</h3>
            <p>Teachers create tests, students join with code.</p>
          </div>

          <div class="step">
            <div class="step-icon">
              <i class="fa-solid fa-pen"></i>
            </div>

            <h3>3. Take or Assign</h3>
            <p>Students take quizzes while teachers monitor.</p>
          </div>

          <div class="step">
            <div class="step-icon">
              <i class="fa-solid fa-chart-column"></i>
            </div>

            <h3>4. Results & Analytics</h3>
            <p>View results and improve performance.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;

//     