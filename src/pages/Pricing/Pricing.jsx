import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import "./pricing.css";

const faqData = [
  {
    question: "Can I change my plan later?",
    answer:
      "Yes. You can upgrade or downgrade your plan at any time from your account settings. Changes take effect immediately, and billing is adjusted automatically.",
  },
  {
    question: "Is there a free trial for paid plans?",
    answer:
      "Yes, both the Pro and Premium plans include a free trial period so you can explore all the features before committing to a subscription.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major debit and credit cards, as well as bank transfers for institutional and Premium plan customers.",
  },
];

// ✅ ADDED — not in original documented architecture.
// Localized DISPLAY prices per region. These are fixed price points (the
// standard SaaS approach), not a live currency conversion — so they won't
// drift if exchange rates move, and you control exactly what each region sees.
// NOTE: actual checkout still charges NGN under the hood for every region
// right now (see paymentController.js) — these are presentation-only until
// you confirm which currencies your Paystack account can actually settle.
const PRICING_TABLE = {
  NG: { symbol: "₦", free: 0, pro: 5424, premium: 12656 },
  US: { symbol: "$", free: 0, pro: 4, premium: 9 },
  DEFAULT: { symbol: "£", free: 0, pro: 3, premium: 7 }, // original coded price
};

// Maps a 2-letter country code from the geo lookup to a pricing table key.
const getCurrencyKey = (countryCode) => {
  if (countryCode === "NG") return "NG";
  if (countryCode === "US") return "US";
  return "DEFAULT";
};

// ✅ ADDED — drives BOTH the pricing cards' bullet lists AND the full
// feature comparison table below them — one source of truth, so they can
// never drift out of sync with each other again.
// true = check, false = locked (✗). Where a feature isn't a simple yes/no
// (e.g. student cap), `value` is shown instead for all three plans.
// `cardLabel` is the shorter phrasing used in the pricing-card bullets;
// falls back to `label` (used in the table) if not set.
const FEATURE_COMPARISON = [
  {
    label: "Students per month",
    cardLabel: "Students/month",
    value: ["20", "100", "Unlimited"],
  },
  {
    label: "Exam & question creation",
    free: true,
    pro: true,
    premium: true,
  },
  {
    label: "Edit/delete existing questions",
    cardLabel: "Edit & delete questions",
    free: false,
    pro: true,
    premium: true,
  },
  {
    label: "Analytics dashboard",
    free: false,
    pro: true,
    premium: true,
  },
  {
    label: "Result sheet: percentage, status & date",
    cardLabel: "Detailed result sheet",
    free: false,
    pro: true,
    premium: true,
  },
  {
    label: "Result sheet: device & tab-switch tracking",
    cardLabel: "Device & tab-switch tracking",
    free: false,
    pro: false,
    premium: true,
  },
  {
    label: "Export results",
    free: false,
    pro: true,
    premium: true,
  },
  {
    label: "Priority support",
    free: false,
    pro: true,
    premium: true,
  },
  {
    label: "Custom branding",
    free: false,
    pro: false,
    premium: true,
  },
];

// ✅ ADDED — derives a plan's pricing-card bullet list from
// FEATURE_COMPARISON. Only features actually included in that plan are
// returned (cards show what you GET, not what's locked — the comparison
// table further down is where locked features are shown explicitly).
const getPlanFeatures = (plan) => {
  const index = plan === "free" ? 0 : plan === "pro" ? 1 : 2;

  return FEATURE_COMPARISON.filter((feature) => {
    if (feature.value) return true; // value-type rows always show (e.g. student cap)
    return feature[plan];
  }).map((feature) => {
    if (feature.value) {
      return `${feature.value[index]} ${feature.cardLabel || feature.label}`;
    }
    return feature.cardLabel || feature.label;
  });
};

// Renders a single comparison cell — a value string, or a check/✗ icon.
const ComparisonCell = ({ plan, feature }) => {
  if (feature.value) {
    const index = plan === "free" ? 0 : plan === "pro" ? 1 : 2;
    return <td className="compare-cell">{feature.value[index]}</td>;
  }

  const included = feature[plan];
  return (
    <td className="compare-cell">
      {included ? (
        <i className="fa-solid fa-check compare-check"></i>
      ) : (
        <i className="fa-solid fa-xmark compare-cross"></i>
      )}
    </td>
  );
};

function Pricing() {
  // 🔢 tracks which FAQ box is currently open (null = none open)
  const [openIndex, setOpenIndex] = useState(null);
  const [checkoutLoading, setCheckoutLoading] = useState(null); // "pro" | "premium" | null
  const navigate = useNavigate();

  // ✅ ADDED — geo-detected pricing. Defaults to the original coded £ price
  // until the lookup resolves (or if it fails — never block the page on it).
  const [pricing, setPricing] = useState(PRICING_TABLE.DEFAULT);

  useEffect(() => {
    let cancelled = false;

    // Free, no-API-key IP geolocation lookup. If this fails for any reason
    // (network, rate limit, ad-blocker), we just silently keep the default
    // £ pricing — currency display is a nice-to-have, never a blocker.
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        const key = getCurrencyKey(data.country_code);
        setPricing(PRICING_TABLE[key]);
      })
      .catch(() => {
        // keep DEFAULT pricing, no error shown to the user
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const toggleFaq = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  // ✅ ADDED — wires Pro/Premium buttons to the new payment flow.
  // Free plan is the default on signup, so "Get Started" just sends
  // a logged-out visitor to sign up; no payment needed for that one.
  const handlePlanSelect = async (plan) => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Must be a logged-in teacher to pay — send them to login first.
      navigate("/teacherlogin", { state: { redirectTo: "/pricing" } });
      return;
    }

    setCheckoutLoading(plan);

    try {
      const res = await API.post("/payments/initialize", { plan });
      // Redirect the teacher to Paystack's hosted checkout page
      window.location.href = res.data.authorization_url;
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Could not start checkout. Please try again.");
      setCheckoutLoading(null);
    }
  };

  return (
    <div>
      {/* PRICING SECTION */}
      <section className="pricing-section">
        <div className="title-area">
          <h1>Simple, Transparent Pricing</h1>

          <p>
            Choose the perfect plan for your needs. Upgrade or downgrade
            anytime.
          </p>
        </div>

        {/* PRICING CARDS */}

        <div className="pricing-cards">
          {/* FREE */}

          <div className="pricing-card free">
            <h2>Free</h2>
            <p className="plan-text">For getting started</p>

            <div className="price">
              <span>{pricing.symbol}</span>
              <h1>{pricing.free}</h1>
              <small>/month</small>
            </div>

            <ul>
              {getPlanFeatures("free").map((text) => (
                <li key={text}>
                  <i className="fa-solid fa-check"></i> {text}
                </li>
              ))}
            </ul>

            <button className="free-btn" onClick={() => navigate("/teachersignup")}>
              Get Started
            </button>
          </div>

          {/* PRO */}

          <div className="pricing-card pro">
            <div className="badge">Most Popular</div>

            <h2>Pro</h2>
            <p className="plan-text">For growing institutions</p>

            <div className="price">
              <span>{pricing.symbol}</span>
              <h1>{pricing.pro}</h1>
              <small>/month</small>
            </div>

            <ul>
              {getPlanFeatures("pro").map((text) => (
                <li key={text}>
                  <i className="fa-solid fa-check"></i> {text}
                </li>
              ))}
            </ul>

            <button
              className="pro-btn"
              disabled={checkoutLoading === "pro"}
              onClick={() => handlePlanSelect("pro")}
            >
              {checkoutLoading === "pro" ? "Redirecting..." : "Go Pro"}
            </button>
          </div>

          {/* PREMIUM */}

          <div className="pricing-card premium">
            <h2>Premium</h2>
            <p className="plan-text">For large organizations</p>

            <div className="price">
              <span>{pricing.symbol}</span>
              <h1>{pricing.premium}</h1>
              <small>/month</small>
            </div>

            <ul>
              {getPlanFeatures("premium").map((text) => (
                <li key={text}>
                  <i className="fa-solid fa-check"></i> {text}
                </li>
              ))}
            </ul>

            <button
              className="premium-btn"
              disabled={checkoutLoading === "premium"}
              onClick={() => handlePlanSelect("premium")}
            >
              {checkoutLoading === "premium" ? "Redirecting..." : "Go Premium"}
            </button>
          </div>
        </div>

        {/* ✅ ADDED — full feature comparison table */}
        {/* <div className="compare-section">
          <h2>Compare Plans</h2>
          <div className="compare-table-wrapper">
            <table className="compare-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Free</th>
                  <th>Pro</th>
                  <th>Premium</th>
                </tr>
              </thead>
              <tbody>
                {FEATURE_COMPARISON.map((feature) => (
                  <tr key={feature.label}>
                    <td className="compare-label">{feature.label}</td>
                    <ComparisonCell plan="free" feature={feature} />
                    <ComparisonCell plan="pro" feature={feature} />
                    <ComparisonCell plan="premium" feature={feature} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div> */}

        {/* FAQ */}

        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>

          <div className="faq-container">
            {faqData.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  className={`faq-box ${isOpen ? "faq-open" : ""}`}
                  key={index}
                >
                  <div
                    className="faq-question-row"
                    onClick={() => toggleFaq(index)}
                  >
                    <span>{faq.question}</span>

                    {/* 🔁 ternary swaps plus <-> minus icon based on open state */}
                    {isOpen ? (
                      <FaMinus className="faq-icon" />
                    ) : (
                      <FaPlus className="faq-icon" />
                    )}
                  </div>

                  {/* dropdown answer, only rendered when open */}
                  {isOpen && (
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Pricing;
