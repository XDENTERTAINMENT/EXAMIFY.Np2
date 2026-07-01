import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import "./TeacherSupport.css";

// ── FAQ data grounded in actual Examify features ──────────────────────────
const FAQS = [
  {
    q: "How do I create an exam?",
    a: "From your dashboard click 'Create Exam' in the sidebar or the quick-action button. Fill in the exam name, subject, duration, and publish it. You'll receive a unique exam code you can share with students.",
  },
  {
    q: "How do students join my exam?",
    a: "Students log in to their Examify account, enter your exam code on their dashboard and click 'Join Exam'. Make sure they have the exact code — it's case-sensitive.",
  },
  {
    q: "How do I view student results?",
    a: "Click 'Student Results' in the sidebar. You'll see a list of every submission for each exam, including scores, time taken, and device used. Pro and Premium plans unlock full answer breakdowns.",
  },
  {
    q: "Why can't I see the Analytics page?",
    a: "Detailed analytics are locked to Pro and Premium plans. On a Free plan you'll see a lock icon. Upgrade from the Pricing page or from Settings → Membership Plan.",
  },
  {
    q: "What is the monthly student cap?",
    a: "Free plan: up to 30 student submissions per month. Pro plan: up to 200. Premium plan: unlimited. The cap resets on the 1st of each month. Students who hit the cap see a 'limit reached' page.",
  },
  {
    q: "What happens when my plan expires?",
    a: "Your account automatically moves to the Free plan. You'll receive a notification and an email 3 days before expiry and another on the day it expires. All your exam data is preserved — only the gated features are locked.",
  },
  {
    q: "How do I upgrade or renew my plan?",
    a: "Go to the Pricing page (link in the sidebar or the upgrade nudge on your dashboard). Choose a plan and complete payment via Paystack. Your plan upgrades instantly after payment is confirmed.",
  },
  {
    q: "I paid but my plan hasn't upgraded. What do I do?",
    a: "Payment confirmation is processed via webhook, which usually takes under 10 seconds. If your plan still shows Free after 2 minutes, please open a support ticket below with your payment reference number so we can investigate.",
  },
  {
    q: "How do I reset my password?",
    a: "On the login page click 'Forgot Password'. Enter your email address and an OTP will be sent to you. Enter the OTP, then set your new password. OTPs expire after 10 minutes.",
  },
  {
    q: "Can I edit or delete an exam after publishing?",
    a: "Edit and delete are available on Pro and Premium plans. On the Free plan these actions are locked. You can still view and share any exam regardless of plan.",
  },
  {
    q: "How do I change my profile photo?",
    a: "On your dashboard click the Edit button below your avatar photo in the sidebar. Choose 'Upload new photo' and select an image. It's uploaded to our servers and reflected instantly.",
  },
  {
    q: "How do I contact support for an urgent issue?",
    a: "Submit a ticket using the form below. We respond to all tickets within 24 hours. For billing emergencies, mark the category as 'Subscription & Billing' so it's prioritised.",
  },
];

const CATEGORIES = [
  { value: "subscription_billing", label: "Subscription & Billing" },
  { value: "exam_issue",           label: "Exam Issue" },
  { value: "account",              label: "Account" },
  { value: "technical",            label: "Technical / Bug" },
  { value: "results",              label: "Results & Grading" },
  { value: "other",                label: "Other" },
];

const STATUS_META = {
  open:        { label: "Open",        color: "#f59e0b" },
  "in-progress": { label: "In Progress", color: "#6366f1" },
  resolved:    { label: "Resolved",    color: "#10b981" },
};

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`ts-faq-item ${open ? "open" : ""}`}>
      <button className="ts-faq-q" onClick={() => setOpen((p) => !p)}>
        <span>{q}</span>
        <span className="ts-faq-chevron">{open ? "▲" : "▼"}</span>
      </button>
      {open && <p className="ts-faq-a">{a}</p>}
    </div>
  );
}

function TeacherSupport() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [tab, setTab]             = useState("submit");
  const [category, setCategory]   = useState("");
  const [subject, setSubject]     = useState("");
  const [message, setMessage]     = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState({ type: "", text: "" });

  const [tickets, setTickets]       = useState([]);
  const [ticketsLoading, setTicketsLoading] = useState(false);

  const [search, setSearch] = useState("");

  // Load my tickets when that tab is active
  useEffect(() => {
    if (tab !== "tickets") return;
    const load = async () => {
      setTicketsLoading(true);
      try {
        const res = await API.get("/support/my-tickets");
        setTickets(res.data.tickets || []);
      } catch {
        setTickets([]);
      } finally {
        setTicketsLoading(false);
      }
    };
    load();
  }, [tab]);

  const handleSubmit = async () => {
    if (!category || !subject.trim() || !message.trim()) {
      setSubmitMsg({ type: "error", text: "Please fill in all fields." });
      return;
    }
    setSubmitting(true);
    setSubmitMsg({ type: "", text: "" });
    try {
      const res = await API.post("/support/submit", { category, subject, message });
      setSubmitMsg({ type: "success", text: res.data.message });
      setCategory("");
      setSubject("");
      setMessage("");
    } catch (err) {
      setSubmitMsg({
        type: "error",
        text: err.response?.data?.message || "Failed to submit. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const filteredFaqs = search.trim()
    ? FAQS.filter(
        (f) =>
          f.q.toLowerCase().includes(search.toLowerCase()) ||
          f.a.toLowerCase().includes(search.toLowerCase()),
      )
    : FAQS;

  return (
    <div className="ts-page">
      {/* ── HEADER ── */}
      <div className="ts-header">
        <button className="ts-back" onClick={() => navigate("/teacherdashboard")}>
          ← Back to Dashboard
        </button>
        <div className="ts-header-title">
          <h1>Help &amp; Support</h1>
          <p>
            Hi <strong>{user?.username || user?.fullname || "Teacher"}</strong> — how can we
            help you today?
          </p>
        </div>
      </div>

      {/* ── QUICK LINKS ── */}
      <div className="ts-quick-links">
        <button onClick={() => navigate("/pricing")}>🚀 Upgrade Plan</button>
        <button onClick={() => navigate("/settings")}>⚙️ Account Settings</button>
        <button onClick={() => navigate("/teacherAnalytics")}>📊 Analytics</button>
        <button onClick={() => navigate("/resultsPage")}>📋 Student Results</button>
      </div>

      {/* ── TABS ── */}
      <div className="ts-tabs">
        {[
          { id: "submit",  label: "📩 Submit a Ticket" },
          { id: "tickets", label: "📂 My Tickets" },
          { id: "faq",     label: "❓ FAQ" },
        ].map((t) => (
          <button
            key={t.id}
            className={`ts-tab ${tab === t.id ? "active" : ""}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ─────────────────────── SUBMIT TAB ─────────────────────────── */}
      {tab === "submit" && (
        <div className="ts-card">
          <h2 className="ts-card-title">Submit a Support Ticket</h2>
          <p className="ts-card-sub">
            We respond to all tickets within <strong>24 hours</strong>. For billing issues,
            select "Subscription &amp; Billing" so it gets prioritised.
          </p>

          <div className="ts-form">
            <div className="ts-field">
              <label>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">— Select a category —</option>
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="ts-field">
              <label>Subject</label>
              <input
                type="text"
                placeholder="Brief summary of your issue"
                value={subject}
                maxLength={120}
                onChange={(e) => setSubject(e.target.value)}
              />
              <span className="ts-char">{subject.length}/120</span>
            </div>

            <div className="ts-field">
              <label>Message</label>
              <textarea
                placeholder="Describe your issue in detail. Include any exam codes, error messages, or steps to reproduce."
                value={message}
                maxLength={2000}
                rows={6}
                onChange={(e) => setMessage(e.target.value)}
              />
              <span className="ts-char">{message.length}/2000</span>
            </div>

            {submitMsg.text && (
              <div className={`ts-alert ts-alert-${submitMsg.type}`}>
                {submitMsg.text}
              </div>
            )}

            <button
              className="ts-submit-btn"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "Submitting…" : "Submit Ticket"}
            </button>
          </div>
        </div>
      )}

      {/* ─────────────────────── MY TICKETS TAB ─────────────────────── */}
      {tab === "tickets" && (
        <div className="ts-card">
          <h2 className="ts-card-title">My Support Tickets</h2>
          <p className="ts-card-sub">
            Your last 30 tickets. Green = resolved, indigo = in progress, amber = open.
          </p>

          {ticketsLoading && <p className="ts-loading">Loading tickets…</p>}

          {!ticketsLoading && tickets.length === 0 && (
            <div className="ts-empty">
              <span>📭</span>
              <p>You haven't submitted any tickets yet.</p>
              <button onClick={() => setTab("submit")}>Submit your first ticket</button>
            </div>
          )}

          {!ticketsLoading && tickets.length > 0 && (
            <div className="ts-ticket-list">
              {tickets.map((tk) => {
                const meta = STATUS_META[tk.status] || STATUS_META.open;
                const cat  = CATEGORIES.find((c) => c.value === tk.category);
                return (
                  <div key={tk._id} className="ts-ticket">
                    <div className="ts-ticket-top">
                      <div>
                        <p className="ts-ticket-subject">{tk.subject}</p>
                        <span className="ts-ticket-cat">
                          {cat?.label || tk.category}
                        </span>
                      </div>
                      <span
                        className="ts-ticket-status"
                        style={{ background: meta.color }}
                      >
                        {meta.label}
                      </span>
                    </div>

                    <p className="ts-ticket-date">
                      Submitted: {new Date(tk.createdAt).toLocaleDateString("en-NG", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                    </p>

                    {tk.adminReply && (
                      <div className="ts-ticket-reply">
                        <p className="ts-reply-label">✅ Admin Response</p>
                        <p>{tk.adminReply}</p>
                        {tk.repliedAt && (
                          <p className="ts-reply-date">
                            {new Date(tk.repliedAt).toLocaleDateString("en-NG", {
                              day: "numeric", month: "short", year: "numeric",
                            })}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ─────────────────────── FAQ TAB ─────────────────────────────── */}
      {tab === "faq" && (
        <div className="ts-card">
          <h2 className="ts-card-title">Frequently Asked Questions</h2>

          <div className="ts-faq-search-wrap">
            <input
              className="ts-faq-search"
              type="text"
              placeholder="🔍 Search FAQ…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {filteredFaqs.length === 0 && (
            <p className="ts-faq-none">
              No results for "{search}".{" "}
              <button onClick={() => { setSearch(""); setTab("submit"); }}>
                Submit a ticket instead
              </button>
            </p>
          )}

          <div className="ts-faq-list">
            {filteredFaqs.map((f, i) => (
              <FAQItem key={i} q={f.q} a={f.a} />
            ))}
          </div>

          <div className="ts-faq-footer">
            <p>Didn't find your answer?</p>
            <button onClick={() => setTab("submit")}>Submit a support ticket →</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherSupport;
