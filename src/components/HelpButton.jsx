import React, { useState } from "react";
import { FaQuestion, FaTimes } from "react-icons/fa";
import "./HelpButton.css";

/**
 * Reusable contextual Help (?) button.
 *
 * Usage:
 * <HelpButton
 *   title="How to use the Teacher Dashboard"
 *   steps={[
 *     "Click 'Create Exam'",
 *     "Enter exam details",
 *     "Add questions",
 *     "Publish the exam",
 *     "Monitor submissions",
 *   ]}
 * />
 */
function HelpButton({ title, steps = [] }) {
  const [isOpen, setIsOpen] = useState(false);

  const openHelp = () => setIsOpen(true);
  const closeHelp = () => setIsOpen(false);

  return (
    <>
      <button
        type="button"
        className="help-trigger-btn"
        onClick={openHelp}
        aria-label="Open help"
      >
        <FaQuestion />
      </button>

      {isOpen && (
        <div className="help-modal-overlay" onClick={closeHelp}>
          <div
            className="help-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="help-modal-header">
              <h3>{title}</h3>

              <button
                type="button"
                className="help-close-btn"
                onClick={closeHelp}
                aria-label="Close help"
              >
                <FaTimes />
              </button>
            </div>

            <ol className="help-steps-list">
              {steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </>
  );
}

export default HelpButton;
