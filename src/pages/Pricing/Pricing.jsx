
import React from 'react'
import "./pricing.css"

function Pricing() {
  return (
    <div>
     {/* <!-- PRICING SECTION --> */}
  <section class="pricing-section">

    <div class="title-area">

      <h1>Simple, Transparent Pricing</h1>

      <p>
        Choose the perfect plan for your needs.
        Upgrade or downgrade anytime.
      </p>

    </div>

    {/* <!-- PRICING CARDS --> */}

    <div class="pricing-cards">

      {/* <!-- FREE --> */}

      <div class="pricing-card free">

        <h2>Free</h2>
        <p class="plan-text">For getting started</p>

        <div class="price">
          <span>£</span>
          <h1>0</h1>
          <small>/month</small>
        </div>

        <ul>
          <li><i class="fa-solid fa-check"></i> Up to 30 Students</li>
          <li><i class="fa-solid fa-check"></i> Up to 5 Tests</li>
          <li><i class="fa-solid fa-check"></i> Basic Analytics</li>
          <li><i class="fa-solid fa-check"></i> Multiple Question Types</li>
          <li><i class="fa-solid fa-check"></i> Email Support</li>
        </ul>

        <button class="free-btn">Get Started</button>

      </div>

      {/* <!-- PRO --> */}

      <div class="pricing-card pro">

        <div class="badge">Most Popular</div>

        <h2>Pro</h2>
        <p class="plan-text">For growing institutions</p>

        <div class="price">
          <span>£</span>
          <h1>3</h1>
          <small>/month</small>
        </div>

        <ul>
          <li><i class="fa-solid fa-check"></i> Up to 100 Students</li>
          <li><i class="fa-solid fa-check"></i> Unlimited Tests</li>
          <li><i class="fa-solid fa-check"></i> Advanced Analytics</li>
          <li><i class="fa-solid fa-check"></i> All Question Types</li>
          <li><i class="fa-solid fa-check"></i> Export Results</li>
          <li><i class="fa-solid fa-check"></i> Priority Support</li>
        </ul>

        <button class="pro-btn">Go Pro </button>

      </div>

      {/* <!-- PREMIUM --> */}

      <div class="pricing-card premium">

        <h2>Premium</h2>
        <p class="plan-text">For large organizations</p>

        <div class="price">
          <span>£</span>
          <h1>7</h1>
          <small>/month</small>
        </div>

        <ul>
          <li><i class="fa-solid fa-check"></i> Unlimited Students</li>
          <li><i class="fa-solid fa-check"></i> Unlimited Tests</li>
          <li><i class="fa-solid fa-check"></i> Advanced Analytics</li>
          <li><i class="fa-solid fa-check"></i> All Question Types</li>
          <li><i class="fa-solid fa-check"></i> Export Results</li>
          <li><i class="fa-solid fa-check"></i> Priority Support</li>
          <li><i class="fa-solid fa-check"></i> Custom Branding</li>
        </ul>

        <button class="premium-btn">Go Premium</button>

      </div>

    </div>

    {/* <!-- FAQ --> */}

    <div class="faq-section">

      <h2>Frequently Asked Questions</h2>

      <div class="faq-container">

        <div class="faq-box">
          <span>Can I change my plan later?</span>
          <i class="fa-solid fa-chevron-down"></i>
        </div>

        <div class="faq-box">
          <span>Is there a free trial for paid plans?</span>
          <i class="fa-solid fa-chevron-down"></i>
        </div>

        <div class="faq-box">
          <span>What payment methods do you accept?</span>
          <i class="fa-solid fa-chevron-down"></i>
        </div>

      </div>

    </div>

  </section>
    </div>
  )
}

export default Pricing
