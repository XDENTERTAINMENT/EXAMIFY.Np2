import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import adminAPI from "../../services/adminApi";
import "./AdminDashboard.css";

// ✅ NEW FILE — not in original documented architecture.
// Wired to Phase 1's controllers/adminController.js + routes/adminRoutes.js
// (mounted at /api/admin) and the now-guarded /api/support/admin/* stubs
// in routes/supportRoutes.js. No route/endpoint referenced here exists
// outside those two files.

const NAV = [
  { id: "overview", label: "📊 Overview" },
  { id: "payments", label: "💳 Payments" },
  { id: "accounts", label: "👤 Accounts" },
  { id: "security", label: "🛡️ Security" },
  { id: "support", label: "📩 Support" },
  { id: "errors", label: "⚠️ Errors" },
];

const money = (kobo) =>
  `₦${(kobo / 100).toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;

const fmtDate = (d) =>
  d
    ? new Date(d).toLocaleString("en-NG", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

const STATUS_COLOR = {
  success: { bg: "#dcfce7", text: "#15803d" },
  resolved: { bg: "#dcfce7", text: "#15803d" },
  failed: { bg: "#fee2e2", text: "#dc2626" },
  pending: { bg: "#fef3c7", text: "#b45309" },
  open: { bg: "#fef3c7", text: "#b45309" },
  "in-progress": { bg: "#ede9fe", text: "#5b21b6" },
};

function Badge({ status }) {
  const c = STATUS_COLOR[status] || { bg: "#f1f5f9", text: "#475569" };
  return (
    <span className="ad-badge" style={{ background: c.bg, color: c.text }}>
      {status}
    </span>
  );
}

function AdminDashboard() {
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("adminUser") || "null");

  const [tab, setTab] = useState("overview");

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span>🎓</span>
          <h2>
            Examify<span>Admin</span>
          </h2>
        </div>

        <nav className="admin-menu">
          {NAV.map((n) => (
            <button
              key={n.id}
              className={tab === n.id ? "active" : ""}
              onClick={() => setTab(n.id)}
            >
              {n.label}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-bottom">
          <p className="admin-whoami">{admin?.fullname || admin?.email}</p>
          <button className="admin-logout" onClick={handleLogout}>
            🚪 Log out
          </button>
        </div>
      </aside>

      <main className="admin-main">
        {tab === "overview" && <OverviewTab />}
        {tab === "payments" && <PaymentsTab />}
        {tab === "accounts" && <AccountsTab />}
        {tab === "security" && <SecurityTab />}
        {tab === "support" && <SupportTab />}
        {tab === "errors" && <ErrorsTab />}
      </main>
    </div>
  );
}

/* =========================================================
   OVERVIEW
========================================================= */
function OverviewTab() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    adminAPI
      .get("/admin/overview")
      .then((res) => !cancelled && setData(res.data))
      .catch(() => !cancelled && setData(null))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="ad-section">
      <h1 className="ad-title">Overview</h1>
      <p className="ad-sub">Platform health at a glance.</p>

      {loading && <p className="ad-loading">Loading…</p>}

      {!loading && data && (
        <div className="ad-kpi-grid">
          <div className="ad-kpi-card">
            <p className="ad-kpi-label">Revenue (30d)</p>
            <p className="ad-kpi-value">{money(data.revenueLast30dKobo)}</p>
          </div>
          <div className="ad-kpi-card">
            <p className="ad-kpi-label">Active subscriptions</p>
            <p className="ad-kpi-value">{data.activeSubscriptions}</p>
          </div>
          <div className="ad-kpi-card">
            <p className="ad-kpi-label">Open support tickets</p>
            <p className="ad-kpi-value">{data.openSupportTickets}</p>
          </div>
          <div className="ad-kpi-card warn">
            <p className="ad-kpi-label">Failed logins (24h)</p>
            <p className="ad-kpi-value">{data.failedLoginsLast24h}</p>
          </div>
          <div className="ad-kpi-card danger">
            <p className="ad-kpi-label">Flagged IPs (24h)</p>
            <p className="ad-kpi-value">{data.flaggedIpCount}</p>
          </div>
        </div>
      )}

      {!loading && !data && <p className="ad-empty">Couldn't load overview data.</p>}
    </div>
  );
}

/* =========================================================
   PAYMENTS
========================================================= */
function PaymentsTab() {
  const [status, setStatus] = useState("");
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    adminAPI
      .get("/admin/payments", { params: status ? { status } : {} })
      .then((res) => setPayments(res.data.payments || []))
      .catch(() => setPayments([]))
      .finally(() => setLoading(false));
  }, [status]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="ad-section">
      <h1 className="ad-title">Payments</h1>
      <p className="ad-sub">
        Every payment outcome logged by controllers/paymentController.js — success, failed, and pending.
      </p>

      <div className="ad-filters">
        {["", "success", "failed", "pending"].map((s) => (
          <button
            key={s || "all"}
            className={status === s ? "active" : ""}
            onClick={() => setStatus(s)}
          >
            {s || "All"}
          </button>
        ))}
      </div>

      {loading && <p className="ad-loading">Loading…</p>}

      {!loading && payments.length === 0 && (
        <p className="ad-empty">No payments found for this filter.</p>
      )}

      {!loading && payments.length > 0 && (
        <div className="ad-table-wrap">
          <table className="ad-table">
            <thead>
              <tr>
                <th>Teacher</th>
                <th>Plan</th>
                <th>Amount</th>
                <th>Reference</th>
                <th>Source</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p._id}>
                  <td>
                    <p className="ad-cell-primary">{p.teacherName || "—"}</p>
                    <p className="ad-cell-secondary">{p.teacherEmail}</p>
                  </td>
                  <td className="ad-capitalize">{p.plan}</td>
                  <td>{money(p.amountKobo)}</td>
                  <td className="ad-mono">{p.reference}</td>
                  <td>{p.source}</td>
                  <td>
                    <Badge status={p.status} />
                  </td>
                  <td>{fmtDate(p.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   ACCOUNTS
========================================================= */
function AccountsTab() {
  const [role, setRole] = useState("");
  const [search, setSearch] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actioningId, setActioningId] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    adminAPI
      .get("/admin/accounts", { params: { role: role || undefined, search: search || undefined } })
      .then((res) => setAccounts(res.data.accounts || []))
      .catch(() => setAccounts([]))
      .finally(() => setLoading(false));
  }, [role, search]);

  useEffect(() => {
    const t = setTimeout(load, 300); // debounce search typing
    return () => clearTimeout(t);
  }, [load]);

  const handleBlock = async (acct) => {
    const reason = window.prompt(`Reason for suspending ${acct.fullname || acct.email}:`, "Suspicious activity");
    if (reason === null) return; // cancelled
    setActioningId(acct._id);
    try {
      await adminAPI.patch(`/admin/accounts/${acct._id}/block`, {
        authModel: acct.authModel,
        reason,
      });
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to suspend account");
    } finally {
      setActioningId(null);
    }
  };

  const handleUnblock = async (acct) => {
    setActioningId(acct._id);
    try {
      await adminAPI.patch(`/admin/accounts/${acct._id}/unblock`, {
        authModel: acct.authModel,
      });
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to restore account");
    } finally {
      setActioningId(null);
    }
  };

  return (
    <div className="ad-section">
      <h1 className="ad-title">Accounts</h1>
      <p className="ad-sub">Teachers and students across all three auth collections (teacherdb, usergoogle, User).</p>

      <div className="ad-filters-row">
        <div className="ad-filters">
          {["", "teacher", "student"].map((r) => (
            <button key={r || "all"} className={role === r ? "active" : ""} onClick={() => setRole(r)}>
              {r ? r.charAt(0).toUpperCase() + r.slice(1) + "s" : "All"}
            </button>
          ))}
        </div>
        <input
          className="ad-search"
          placeholder="🔍 Search name, username, or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading && <p className="ad-loading">Loading…</p>}

      {!loading && accounts.length === 0 && <p className="ad-empty">No accounts found.</p>}

      {!loading && accounts.length > 0 && (
        <div className="ad-table-wrap">
          <table className="ad-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Plan</th>
                <th>Status</th>
                <th>Joined</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((a) => (
                <tr key={a._id}>
                  <td>
                    <p className="ad-cell-primary">{a.fullname || a.username || "—"}</p>
                    <p className="ad-cell-secondary">{a.email}</p>
                  </td>
                  <td className="ad-capitalize">{a.role}</td>
                  <td className="ad-capitalize">{a.plan || "—"}</td>
                  <td>
                    {a.isBlocked ? (
                      <span className="ad-badge" style={{ background: "#fee2e2", color: "#dc2626" }}>
                        Blocked{a.blockedReason ? ` — ${a.blockedReason}` : ""}
                      </span>
                    ) : (
                      <span className="ad-badge" style={{ background: "#dcfce7", color: "#15803d" }}>
                        Active
                      </span>
                    )}
                  </td>
                  <td>{fmtDate(a.createdAt)}</td>
                  <td>
                    {a.isBlocked ? (
                      <button
                        className="ad-action-btn restore"
                        disabled={actioningId === a._id}
                        onClick={() => handleUnblock(a)}
                      >
                        Restore
                      </button>
                    ) : (
                      <button
                        className="ad-action-btn suspend"
                        disabled={actioningId === a._id}
                        onClick={() => handleBlock(a)}
                      >
                        Suspend
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   SECURITY
========================================================= */
function SecurityTab() {
  const [flagged, setFlagged] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [ipFilter, setIpFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      adminAPI.get("/admin/security/flagged-ips").then((res) => res.data.flagged || []),
      adminAPI.get("/admin/security/attempts", { params: ipFilter ? { ip: ipFilter } : {} }).then((res) => res.data.attempts || []),
    ])
      .then(([f, a]) => {
        setFlagged(f);
        setAttempts(a);
      })
      .catch(() => {
        setFlagged([]);
        setAttempts([]);
      })
      .finally(() => setLoading(false));
  }, [ipFilter]);

  return (
    <div className="ad-section">
      <h1 className="ad-title">Security</h1>
      <p className="ad-sub">Login attempts logged by every path in controllers/authController.js, with IP address.</p>

      <h3 className="ad-subheading">🚨 Flagged IPs (5+ failed attempts, last 24h)</h3>
      {loading && <p className="ad-loading">Loading…</p>}
      {!loading && flagged.length === 0 && <p className="ad-empty">No flagged IPs right now.</p>}
      {!loading && flagged.length > 0 && (
        <div className="ad-flagged-grid">
          {flagged.map((f) => (
            <div key={f._id} className="ad-flagged-card">
              <p className="ad-mono ad-cell-primary">{f._id}</p>
              <p className="ad-cell-secondary">{f.attempts} failed attempts</p>
              <p className="ad-cell-secondary">
                Targeted: {f.identifiers.filter(Boolean).slice(0, 3).join(", ") || "—"}
              </p>
              <p className="ad-cell-secondary">Last: {fmtDate(f.lastAttemptAt)}</p>
              <button className="ad-action-btn" onClick={() => setIpFilter(f._id)}>
                View attempts
              </button>
            </div>
          ))}
        </div>
      )}

      <h3 className="ad-subheading">
        Recent login attempts {ipFilter && `— filtered to ${ipFilter}`}
      </h3>
      <div className="ad-filters-row">
        <input
          className="ad-search"
          placeholder="Filter by IP address…"
          value={ipFilter}
          onChange={(e) => setIpFilter(e.target.value)}
        />
        {ipFilter && (
          <button className="ad-action-btn" onClick={() => setIpFilter("")}>
            Clear
          </button>
        )}
      </div>

      {!loading && attempts.length === 0 && <p className="ad-empty">No login attempts found.</p>}

      {!loading && attempts.length > 0 && (
        <div className="ad-table-wrap">
          <table className="ad-table">
            <thead>
              <tr>
                <th>IP</th>
                <th>Identifier</th>
                <th>Role</th>
                <th>Result</th>
                <th>Reason</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {attempts.map((a) => (
                <tr key={a._id}>
                  <td className="ad-mono">{a.ip}</td>
                  <td>{a.identifier || "—"}</td>
                  <td className="ad-capitalize">{a.role}</td>
                  <td>
                    <Badge status={a.success ? "success" : "failed"} />
                  </td>
                  <td>{a.reason || "—"}</td>
                  <td>{fmtDate(a.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   SUPPORT — reuses the existing SupportTicket model/endpoints
========================================================= */
function SupportTab() {
  const [statusFilter, setStatusFilter] = useState("");
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openReplyId, setOpenReplyId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    adminAPI
      .get("/support/admin/all", { params: statusFilter ? { status: statusFilter } : {} })
      .then((res) => setTickets(res.data.tickets || []))
      .catch(() => setTickets([]))
      .finally(() => setLoading(false));
  }, [statusFilter]);

  useEffect(() => {
    load();
  }, [load]);

  const handleReply = async (id) => {
    setSending(true);
    try {
      await adminAPI.patch(`/support/admin/${id}/reply`, {
        reply: replyText.trim(),
        status: "resolved",
      });
      setOpenReplyId(null);
      setReplyText("");
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send reply");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="ad-section">
      <h1 className="ad-title">Support tickets</h1>
      <p className="ad-sub">From models/SupportTicket.js — submitted by teachers and students via /support.</p>

      <div className="ad-filters">
        {["", "open", "in-progress", "resolved"].map((s) => (
          <button key={s || "all"} className={statusFilter === s ? "active" : ""} onClick={() => setStatusFilter(s)}>
            {s || "All"}
          </button>
        ))}
      </div>

      {loading && <p className="ad-loading">Loading…</p>}
      {!loading && tickets.length === 0 && <p className="ad-empty">No tickets for this filter.</p>}

      {!loading && tickets.length > 0 && (
        <div className="ad-ticket-list">
          {tickets.map((t) => (
            <div key={t._id} className="ad-ticket">
              <div className="ad-ticket-top">
                <div>
                  <p className="ad-cell-primary">{t.subject}</p>
                  <p className="ad-cell-secondary">
                    {t.senderName || t.senderEmail} · {t.role} · {t.category}
                  </p>
                </div>
                <Badge status={t.status} />
              </div>
              <p className="ad-ticket-message">{t.message}</p>
              <p className="ad-cell-secondary">{fmtDate(t.createdAt)}</p>

              {t.adminReply && (
                <div className="ad-ticket-reply">
                  <p className="ad-reply-label">✅ Replied</p>
                  <p>{t.adminReply}</p>
                </div>
              )}

              {openReplyId === t._id ? (
                <div className="ad-reply-form">
                  <textarea
                    rows={3}
                    placeholder="Write a reply…"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <div className="ad-reply-actions">
                    <button disabled={sending || !replyText.trim()} onClick={() => handleReply(t._id)}>
                      {sending ? "Sending…" : "Send & mark resolved"}
                    </button>
                    <button className="secondary" onClick={() => setOpenReplyId(null)}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button className="ad-action-btn" onClick={() => { setOpenReplyId(t._id); setReplyText(""); }}>
                  {t.adminReply ? "Edit reply" : "Reply"}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   ERRORS
========================================================= */
function ErrorsTab() {
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    adminAPI
      .get("/admin/errors", { params: { category: category || undefined, resolved: "false" } })
      .then((res) => setErrors(res.data.errors || []))
      .catch(() => setErrors([]))
      .finally(() => setLoading(false));
  }, [category]);

  useEffect(() => {
    load();
  }, [load]);

  const handleResolve = async (id) => {
    try {
      await adminAPI.patch(`/admin/errors/${id}/resolve`);
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update error");
    }
  };

  return (
    <div className="ad-section">
      <h1 className="ad-title">Server &amp; database errors</h1>
      <p className="ad-sub">
        Captured centrally by middleware/errorLogger.js — every 5xx response, without touching individual controllers.
      </p>

      <div className="ad-filters">
        {["", "database", "payment", "server", "unknown"].map((c) => (
          <button key={c || "all"} className={category === c ? "active" : ""} onClick={() => setCategory(c)}>
            {c || "All"}
          </button>
        ))}
      </div>

      {loading && <p className="ad-loading">Loading…</p>}
      {!loading && errors.length === 0 && <p className="ad-empty">No unresolved errors 🎉</p>}

      {!loading && errors.length > 0 && (
        <div className="ad-table-wrap">
          <table className="ad-table">
            <thead>
              <tr>
                <th>Message</th>
                <th>Route</th>
                <th>Category</th>
                <th>IP</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {errors.map((e) => (
                <tr key={e._id}>
                  <td>{e.message}</td>
                  <td className="ad-mono">
                    {e.method} {e.route}
                  </td>
                  <td className="ad-capitalize">{e.category}</td>
                  <td className="ad-mono">{e.ip}</td>
                  <td>{fmtDate(e.createdAt)}</td>
                  <td>
                    <button className="ad-action-btn" onClick={() => handleResolve(e._id)}>
                      Mark resolved
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
