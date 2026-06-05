import React from 'react'
import "./About.css"
import aboutpage from "../../assets/images"

function About() {
  return (
    <div>
        {/* <!-- ABOUT SECTION --> */}

  <section class="about-section">

    {/* <!-- LEFT CONTENT --> */}

    <div class="about-content">

      <span class="about-tag">About Us</span>

      <h1>
        Empowering Education <br />
        Through Technology
      </h1>

      <p class="desc">
        ExamifyEdu is an exam platform built to simplify the way
        teachers create quizzes, manage students, and track
        performance.
      </p>

      <p class="desc">
        Our mission is to make assessment smarter, faster,
        and more effective for every educator and learner.
      </p>

      {/* <!-- FEATURES --> */}
      <div class="feature-box2">

        <div class="feature">
          <div class="icon purple">
            <i class="fa-regular fa-file-lines"></i>
          </div>

          <div>
            <h3>Our Mission</h3>
            <p>
              To empower educators with tools that make
              assessment simple and effective.
            </p>
          </div>
        </div>

        <div class="feature">
          <div class="icon green">
            <i class="fa-solid fa-trophy"></i>
          </div>

          <div>
            <h3>Our Vision</h3>
            <p>
              To be the leading exam platform in UK and beyond.
            </p>
          </div>
        </div>

        <div class="feature">
          <div class="icon orange">
            <i class="fa-regular fa-heart"></i>
          </div>

          <div>
            <h3>Our Values</h3>
            <p>
              Simplicity, Reliability, Security, and Continuous Improvement.
            </p>
          </div>
        </div>

      </div>
    </div>

    {/* <!-- RIGHT IMAGE --> */}
    <div class="about-image">

      <img src={aboutpage} alt="Teacher Presentation" />

    

    </div>

  </section>

  {/* <!-- TRUSTED SECTION --> */}

  <section class="trusted-section">

    <div class="trusted-text">
      <h2>Trusted by Educators Across Uk</h2>

      <p>
        Join a growing community of teachers who are making a
        difference with ExamifyEdu.
      </p>
    </div>

    <div class="trusted-icons">
      <i class="fa-solid fa-graduation-cap"></i>
      <i class="fa-solid fa-school"></i>
      <i class="fa-solid fa-users"></i>
    </div>

    <button>Join Us Today</button>

  </section>
    </div>
  )
}

export default About
