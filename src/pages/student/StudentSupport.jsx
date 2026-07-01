import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import "./StudentSupport.css";

const FAQS = [
  {
    q: "How do I join an exam?",
    a: "Log in to your Examify account, enter the exam name and the exam code your teacher gave you on your dashboard, then click 'Join Exam'. Make sure the code is typed exactly as given — it is case-sensitive.",
  },
  {
    q: "What happens if my browser crashes or power goes out during an exam?",
    a: "Don't panic. Examify automatically saves every answer you submit with 'Save & Next'. When you rejoin the exam your answered questions will be restored and ticked on the screen, exactly where you left off. Only the answer you were currently selecting (but hadn't saved yet) may need to be re-selected.",
  },
  {
    q: "How do I know my exam was submitted successfully?",
    a: "After you click 'Finish Exam' you will see a green ✅ confirmation message on screen that says 'Quiz Submitted Successfully'. If the timer runs out, your answers are submitted automatically.",
  },
  {
    q: "Can I go back to a previous question?",
    a: "Yes. Use the 'Previous' button to go back to any earlier question. You can also click any numbered button in the question sidebar on the left to jump directly to that question.",
  },
  {
    q: "Why did my exam end before the timer reached zero?",
    a: "Your teacher sets the exam duration when creating it. When that time runs out, Examify automatically submits whatever you have answered so far. Make sure to pace yourself and keep an eye on the countdown timer in the top-right corner.",
  },
  {
    q: "I can't see my results. Where are they?",
    a: "Results are released by your teacher. Once they are available, your scores will appear in your recent activity on the dashboard. If you cannot see them yet, ask your teacher to publish the results.",
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`ss-faq-item ${open ? "open" : ""}`}>
      <button className="ss-faq-q" onClick={() => setOpen((p) => !p)}>
        <span>{q}</span>
        <span className="ss-chevron">{open ? "▲" : "▼"}</span>
      </button>
      {open && <p className="ss-faq-a">{a}</p>}
    </div>
  );
}

function StudentSupport() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [subject, setSubject]   = useState("");
  const [message, setMessage]   = useState("");
  const [sending, setSending]   = useState(false);
  const [result, setResult]     = useState({ type: "", text: "" });

  const handleSend = async () => {
    if (!subject.trim() || !message.trim()) {
      setResult({ type: "error", text: "Please fill in both fields." });
      return;
    }
    setSending(true);
    setResult({ type: "", text: "" });
    try {
      const res = await API.post("/support/submit", {
        category: "other",
        subject:  subject.trim(),
        message:  message.trim(),
      });
      setResult({ type: "success", text: res.data.message });
      setSubject("");
      setMessage("");
    } catch (err) {
      setResult({
        type: "error",
        text: err.response?.data?.message || "Failed to send. Please try again.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="ss-page">
      {/* ── HEADER ── */}
      <button className="ss-back" onClick={() => navigate("/studentdashboard")}>
        ← Back to Dashboard
      </button>

      <div className="ss-hero">
        <h1>Help &amp; Support</h1>
        <p>
          Hi <strong>{user?.fullname || user?.username || "there"}</strong> — find quick
          answers below, or send us a message.
        </p>
      </div>

      {/* ── FAQ ── */}
      <section className="ss-section">
        <h2 className="ss-section-title">Common Questions</h2>
        <div className="ss-faq-list">
          {FAQS.map((f, i) => (
            <FAQItem key={i} q={f.q} a={f.a} />
          ))}
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section className="ss-section ss-contact-card">
        <h2 className="ss-section-title">Still need help?</h2>
        <p className="ss-contact-sub">
          Send us a message and we'll get back to you within 24 hours.
        </p>

        <div className="ss-form">
          <div className="ss-field">
            <label>Subject</label>
            <input
              type="text"
              placeholder="What's your question about?"
              value={subject}
              maxLength={120}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="ss-field">
            <label>Message</label>
            <textarea
              placeholder="Describe your issue clearly. Include your exam code if it's about a specific exam."
              value={message}
              maxLength={1000}
              rows={5}
              onChange={(e) => setMessage(e.target.value)}
            />
            <span className="ss-char">{message.length}/1000</span>
          </div>

          {result.text && (
            <div className={`ss-alert ss-alert-${result.type}`}>{result.text}</div>
          )}

          <button
            className="ss-send-btn"
            onClick={handleSend}
            disabled={sending}
          >
            {sending ? "Sending…" : "Send Message"}
          </button>
        </div>
      </section>
    </div>
  );
}

export default StudentSupport;
