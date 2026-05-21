import React from 'react'
import feature from "../../assets/images/feature page.png"
import "./feature.css"


function Features() {
  return (
    <div>
       {/* <!-- HERO SECTION --> */}

  <section class="hero-section">

    {/* <!-- LEFT --> */}

    <div class="hero-content">

      <h1>
        Powerful Features for <br />
        Smarter Assessment
      </h1>

      <p>
        Everything you need to create, manage, and analyze
        assessments effectively.
      </p>

    </div>

    {/* <!-- RIGHT --> */}

    <div class="hero-image">

 

      <img
        src={feature}
        alt="Dashboard UI"
      />

    </div>

  </section>

  {/* <!-- FEATURE CARDS --> */}

  <section class="feature-cards2">

    <div class="card1">
      <div class="icon purple">
        <i class="fa-solid fa-file-pen"></i>
      </div>

      <div>
        <h3>Smart Quiz Builder</h3>
        <p>
          Create engaging quizzes with multiple question
          types in minutes.
        </p>
      </div>
    </div>

     <div class="card1">
      <div class="icon green">
        <i class="fa-solid fa-users"></i>
      </div>

      <div>
        <h3>Student Management</h3>
        <p>
          Add, manage, and organize students effortlessly.
        </p>
      </div>
    </div>

    

    <div class="card1">
      <div class="icon orange">
        <i class="fa-solid fa-chart-simple"></i>
      </div>

      <div>
        <h3>Real-time Analytics</h3>
        <p>
          Get instant insights and detailed performance reports.
        </p>
      </div>
    </div>

    <div class="card1">
      <div class="icon light-green">
        <i class="fa-solid fa-circle-check"></i>
      </div>

      <div>
        <h3>Automated Grading</h3>
        <p>
          Save time with automatic grading and result evaluation.
        </p>
      </div>
    </div>

    <div class="card1">
      <div class="icon blue">
        <i class="fa-solid fa-shield-halved"></i>
      </div>

      <div>
        <h3>Secure & Reliable</h3>
        <p>
          Your data is safe with enterprise-grade security.
        </p>
      </div>
    </div>

    <div class="card1">
      <div class="icon violet">
        <i class="fa-solid fa-desktop"></i>
      </div>

      <div>
        <h3>Accessible Anywhere</h3>
        <p>
          Access the platform from any device, anytime.
        </p>
      </div>
    </div>

  </section>

  {/* <!-- CTA SECTION --> */}

  <section class="cta-section">

    <div class="cta-left">

      <div class="star-icon">
        <i class="fa-solid fa-star"></i>
      </div>

      <div>
        <h2>Built for teachers. Designed for results.</h2>

        <p>
          Join thousands of educators who trust Examify.Np
        </p>
      </div>

    </div>

    <button>Get Started Free</button>

  </section>



    
    </div>

   
  )
}

export default Features
