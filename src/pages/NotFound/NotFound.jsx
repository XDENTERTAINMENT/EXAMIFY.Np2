import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="notfound-page">
      <div className="notfound-card">
        <span className="notfound-code">404</span>

        <h1>
          Looks like this page took the exam<br />and didn't pass 📝
        </h1>

        <p>
          The page you're looking for doesn't exist, may have been moved, or
          the link might be outdated. Don't worry, it happens to the best of
          us — let's get you back to safety.
        </p>

        <Link to="/" className="notfound-home-btn">
          ← Back to Homepage
        </Link>

        <p className="notfound-subtext">
          Need help instead?{" "}
          <Link to="/support">Contact Support</Link>
        </p>
      </div>
    </div>
  );
}

export default NotFound;
