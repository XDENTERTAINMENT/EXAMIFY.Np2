import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
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

function Pricing() {
  // 🔢 tracks which FAQ box is currently open (null = none open)
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
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
              <span>£</span>
              <h1>0</h1>
              <small>/month</small>
            </div>

            <ul>
              <li>
                <i className="fa-solid fa-check"></i> Up to 30 Students
              </li>
              <li>
                <i className="fa-solid fa-check"></i> Up to 5 Tests
              </li>
              <li>
                <i className="fa-solid fa-check"></i> Basic Analytics
              </li>
              <li>
                <i className="fa-solid fa-check"></i> Multiple Question Types
              </li>
              <li>
                <i className="fa-solid fa-check"></i> Email Support
              </li>
            </ul>

            <button className="free-btn">Get Started</button>
          </div>

          {/* PRO */}

          <div className="pricing-card pro">
            <div className="badge">Most Popular</div>

            <h2>Pro</h2>
            <p className="plan-text">For growing institutions</p>

            <div className="price">
              <span>£</span>
              <h1>3</h1>
              <small>/month</small>
            </div>

            <ul>
              <li>
                <i className="fa-solid fa-check"></i> Up to 100 Students
              </li>
              <li>
                <i className="fa-solid fa-check"></i> Unlimited Tests
              </li>
              <li>
                <i className="fa-solid fa-check"></i> Advanced Analytics
              </li>
              <li>
                <i className="fa-solid fa-check"></i> All Question Types
              </li>
              <li>
                <i className="fa-solid fa-check"></i> Export Results
              </li>
              <li>
                <i className="fa-solid fa-check"></i> Priority Support
              </li>
            </ul>

            <button className="pro-btn">Go Pro </button>
          </div>

          {/* PREMIUM */}

          <div className="pricing-card premium">
            <h2>Premium</h2>
            <p className="plan-text">For large organizations</p>

            <div className="price">
              <span>£</span>
              <h1>7</h1>
              <small>/month</small>
            </div>

            <ul>
              <li>
                <i className="fa-solid fa-check"></i> Unlimited Students
              </li>
              <li>
                <i className="fa-solid fa-check"></i> Unlimited Tests
              </li>
              <li>
                <i className="fa-solid fa-check"></i> Advanced Analytics
              </li>
              <li>
                <i className="fa-solid fa-check"></i> All Question Types
              </li>
              <li>
                <i className="fa-solid fa-check"></i> Export Results
              </li>
              <li>
                <i className="fa-solid fa-check"></i> Priority Support
              </li>
              <li>
                <i className="fa-solid fa-check"></i> Custom Branding
              </li>
            </ul>

            <button className="premium-btn">Go Premium</button>
          </div>
        </div>

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
