// ComingSoonModal.jsx
// Reusable "Coming Soon" overlay matching the dark blurred design reference.
// Used currently for: Upload Questions + Generate Exam ID (AI features).
//
// Props:
//   open     — boolean, controls visibility
//   onClose  — fn, called when user dismisses
//   feature  — string, name of the feature (shown in subtext)

import React, { useEffect } from "react";
import "./ComingSoonModal.css";

// Eye / AI icon — pure SVG, no external library needed
function EyeAIIcon() {
  return (
    <svg
      className="csm-icon"
      viewBox="0 0 80 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Strikethrough line — left */}
      <line x1="0" y1="4" x2="22" y2="24" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
      {/* Eye outline */}
      <path
        d="M14 24 C20 10 60 10 66 24 C60 38 20 38 14 24Z"
        stroke="white"
        strokeWidth="2.2"
        fill="none"
      />
      {/* Iris circle */}
      <circle cx="40" cy="24" r="7" stroke="white" strokeWidth="2.2" fill="none" />
      {/* Pupil dot */}
      <circle cx="40" cy="24" r="2.5" fill="white" />
      {/* Strikethrough line — right */}
      <line x1="58" y1="4" x2="80" y2="24" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function ComingSoonModal({ open, onClose, feature = "AI Exam Generator" }) {
  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    // Backdrop — click outside to dismiss
    <div className="csm-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="csm-card"
        onClick={(e) => e.stopPropagation()} // prevent backdrop click when clicking card
      >
        {/* Eye / AI icon */}
        <EyeAIIcon />

        {/* Headline */}
        <h1 className="csm-headline">COMING SOON</h1>

        {/* Feature name pill */}
        <span className="csm-pill">✦ {feature}</span>

        {/* Description */}
        <p className="csm-body">
          Every great exam starts with a single idea.
          <br />
          We&apos;re building an <strong>AI-powered engine</strong> that lets you upload
          any document — syllabus, textbook chapter, PDF, or notes — and automatically
          breaks it into structured questions and answers, generates a unique exam code,
          and registers everything in your dashboard.
        </p>

        <p className="csm-tagline">
          <strong>Upload. Generate. Publish.</strong>
          <br />
          Zero manual question entry. Launching soon.
        </p>

        {/* CTA */}
        <button className="csm-btn" onClick={onClose}>
          Got it, I&apos;ll wait
        </button>
      </div>
    </div>
  );
}

export default ComingSoonModal;
