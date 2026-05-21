import React from "react";
import { useNavigate } from "react-router-dom";
import "./teacherhead.css";

function Loginpaget() {
  const navigate = useNavigate();

  return (
    <div className="portal-container">
      {/* RIGHT SIDE */}
      <div className="portal-card">
        <div className="card-top">
          <h2>Get Started</h2>
          <p>Select how you want to continue</p>
        </div>

        <div className="portal-buttons">
          <button
            className="portal-login"
            onClick={() => navigate("/teacherlogin")}
          >
            Login
          </button>

          <button
            className="portal-signup"
            onClick={() => navigate("/teachersignup")}
          >
            Signup
          </button>
        </div>

        <small>Trusted by schools and institutions nationwide.</small>
      </div>
    </div>
  );
}

export default Loginpaget;
