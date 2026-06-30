import React from "react";
// import "./auth.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../../services/api";
import GoogleLoginBtn from "../../components/GoogleLoginBtn";
import "./studentsignup.css";

function StudentSignup() {
  const [errorusername, setErrorUsername] = useState("");
  const [username, setUsername] = useState("");
  const [FullName, setFullName] = useState("");
  const [errorFullName, setErrorFullName] = useState("");
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorpassword, setErrorPassword] = useState("");
  const [password, setPassword] = useState("");
  const [errorConfirmpassword, setErrorConfirmpassword] = useState("");
  const [Confirmpassword, setConfirmpassword] = useState("");
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState(""); // "success" or "error"
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  // const location = useLocation();
  // const role = location.state?.role;

  const submithandle = async (e) => {
    e.preventDefault();

    // RESET ERRORS
    setErrorFullName("");
    setErrorUsername("");
    setErrorEmail("");
    setErrorPassword("");
    setErrorConfirmpassword("");

    let hasError = true;

    // ✅ FULL NAME
    if (!FullName) {
      setErrorFullName("Full name is required");
      hasError = false;
      setTimeout(() => {
        setErrorFullName("");
      }, 3000);
    } else if (FullName.trim().length < 4) {
      setErrorFullName("Full name must be at least 4 characters");
      hasError = false;
      setTimeout(() => {
        setErrorFullName("");
      }, 3000);
    }

    // ✅ USERNAME
    if (!username) {
      setErrorUsername("Username is required");
      hasError = false;
      setTimeout(() => {
        setErrorUsername("");
      }, 3000);
    } else if (username.length < 4 || username.length > 10) {
      setErrorUsername("Username must be 4–10 characters");
      hasError = false;
      setTimeout(() => {
        setErrorUsername("");
      }, 3000);
    }

    // ✅ EMAIL — REQUIRED (was optional). No students have signed up yet,
    // so this is enforced from the start. Needed for the forgot-password
    // OTP flow.
    if (!email) {
      setErrorEmail("Email is required");
      hasError = false;
      setTimeout(() => {
        setErrorEmail("");
      }, 3000);
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorEmail("Enter a valid email address");
      hasError = false;
      setTimeout(() => {
        setErrorEmail("");
      }, 3000);
    }

    // ✅ PASSWORD
    if (!password) {
      setErrorPassword("Password is required");
      hasError = false;
      setTimeout(() => {
        setErrorPassword("");
      }, 3000);
    } else if (password.length < 8 || password.length > 10) {
      setErrorPassword("Password must be 8–10 characters");
      hasError = false;
      setTimeout(() => {
        setErrorPassword("");
      }, 3000);
    }

    // ✅ CONFIRM PASSWORD
    if (!Confirmpassword) {
      setErrorConfirmpassword("Confirm your password");
      hasError = false;
      setTimeout(() => {
        setErrorConfirmpassword("");
      }, 3000);
    } else if (password !== Confirmpassword) {
      setErrorConfirmpassword("Passwords do not match");
      setTimeout(() => {
        setErrorConfirmpassword("");
      }, 3000);
      hasError = false;
    }

    // ❌ STOP if error
    if (!hasError) return;

    if (loading) return;

    setLoading(true);

    // ✅ SEND TO BACKEND
    try {
      const res = await API.post("/auth/StudentSignup", {
        fullname: FullName,
        username: username,
        email: email,
        password: password,
      });

      console.log(res);

      setStatus("success"); // ✅ success = green
      setResponse(res.data.message);
      setTimeout(() => {
        navigate("/studentlogin");
      }, 2000);
      setTimeout(() => {
        setResponse("");
      }, 3000);
    } catch (err) {
      console.log(err);
      setStatus("error"); // ❌ error = red
      setResponse(err.response?.data?.message || "Signup failed. Try again.");
      setTimeout(() => {
        setResponse("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-section">
      {/* LEFT SIDE */}
      <div className="signup-left">
        <div className="overlay"></div>

        <div className="left-content">
          <span className="tag">Student Learning Platform</span>

          <h1>
            Learn, Practice <br />& Excel 🎓
          </h1>

          <p>
            Join thousands of students using ExamifyEdu to take exams, practice
            quizzes, and improve their academic performance with ease.
          </p>

          <div className="features">
            <div className="feature-box">
              <i className="fa-solid fa-book-open"></i>
              <span>Interactive Online Exams</span>
            </div>

            <div className="feature-box">
              <i className="fa-solid fa-chart-line"></i>
              <span>Track Your Performance</span>
            </div>

            <div className="feature-box">
              <i className="fa-solid fa-laptop"></i>
              <span>Access Anywhere Anytime</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="signup-right">
        <div className="form-container">
          {response && (
            <p className={status === "success" ? "success" : "error"}>
              {response}
            </p>
          )}

          <h2>Create Student Account</h2>

          <p className="sub-text">
            Start your learning journey with smarter online assessments.
          </p>

          <form onSubmit={submithandle}>
            {/* FULL NAME */}
            <div className="input-group">
              <label htmlFor="FullName">Full Name</label>

              <input
                type="text"
                placeholder="Enter full name"
                name="FullName"
                value={FullName}
                onChange={(e) => setFullName(e.target.value)}
              />

              {errorFullName && <p className="error">{errorFullName}</p>}
            </div>

            {/* EMAIL — required, used for password recovery */}
            <div className="input-group">
              <label htmlFor="Email">Email Address</label>

              <input
                type="email"
                placeholder="Enter your email"
                name="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <small className="field-hint">
                Used to recover your account if you forget your password.
              </small>

              {errorEmail && <p className="error">{errorEmail}</p>}
            </div>

            {/* USERNAME */}
            <div className="input-group">
              <label htmlFor="UserName">Username</label>

              <input
                type="text"
                placeholder="Enter username"
                name="UserName"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              {errorusername && <p className="error">{errorusername}</p>}
            </div>

            {/* PASSWORD */}
            <div className="input-group">
              <label htmlFor="Password">Password</label>

              <input
                type="password"
                placeholder="Enter password"
                name="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {errorpassword && <p className="error">{errorpassword}</p>}
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="input-group">
              <label htmlFor="ConfirmPassword">Confirm Password</label>

              <input
                type="password"
                placeholder="Confirm password"
                name="ConfirmPassword"
                value={Confirmpassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
              />

              {errorConfirmpassword && (
                <p className="error">{errorConfirmpassword}</p>
              )}
            </div>

            {/* BUTTON */}

            <button disabled={loading} type="submit" className="signup-btn">
              {loading ? "Loading..." : "Signup"}
            </button>

            {/* DIVIDER */}
            <div className="divider">
              <span>OR</span>
            </div>

            {/* GOOGLE LOGIN */}
            <div className="google-login">
              <GoogleLoginBtn
                role="student"
                redirectTo="/studentlogin"
                onSuccessMessage={(msg) => {
                  setStatus("success");
                  setResponse(msg);
                }}
                onErrorMessage={(msg) => {
                  setStatus("error");
                  setResponse(msg);
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default StudentSignup;
