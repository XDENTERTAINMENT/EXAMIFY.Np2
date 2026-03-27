import { useNavigate } from "react-router-dom";
import React from 'react'
import bg from "./education.png"
import "./style.css"






function LandingPage() {

  const navigate = useNavigate();

  return (
    <div className="homepage">

      <h1>Welcome to the Exam Platform</h1>
      <p>Create quizzes, test students, and track performance easily.</p>
      <p> Select User Type </p>
      <div className="hero">
        <div className='user-options'>
          <div className="user-card">
            <button onClick={() => navigate("/studentloginpage")}> 🎓 Student</button>
          </div>
          <div className="user-card">
            <button onClick={() => navigate("/teacherloginpage")}> 👨‍🏫 Teacher</button>
          </div>


        </div>



      </div>

      <div className="sectiontable">
        <section className="features">
          <h2>Features</h2>
          <p>Easy Quiz Creation</p>
          <p>Create quizzes in minutes using a simple interface.</p>
          <p>Instant Quiz Sharing</p>
          <p>Share quizzes with students using a secure link.</p>
          <p>Real-Time Results</p>
          <p>Students receive immediate feedback after submission.</p>
          <p>Performance Tracking</p>
          <p>Monitor and analyze student progress easily.</p>
        </section>

        <section className="howitworks">
       
              <h2>How It Works</h2>

          <p>1. Create a Quiz</p>
          <p>Teachers create quizzes with questions and answers.</p>

          <p>2. Share the Quiz</p>
          <p>Send the quiz link or code to students.</p>

          <p>3. Students Take the Quiz</p>

          <p>Students log in and complete the quiz.</p>

          <p>4. View Results</p>
          <p>Scores and feedback are generated automatically.</p>

         
         

        </section>


      </div>



      <div className="education">

        <img src={bg} />

      </div>

      <div class="reviewcontainer">
        <form action="/reviews" method="POST">

          <label>Your Name:</label>
          <input type="text" name="name" required/>

            <label>Course / Exam:</label>
            <input type="text" name="exam" required/>

              <label>Rating (1–5):</label>
              <input type="number" name="rating" min="1" max="5" required/>

                <label>Your Review:</label>
                <textarea name="review" required></textarea>

                <button type="submit">Submit Review</button>

              </form>
            </div>


            <footer class="footer">
              <p>
                © 2026 Examify.Np |
                <a href="https://my-portfolio-site-d.vercel.app/" target="_blank">View Developer Portfolio</a>
              </p>
            </footer>
          </div>

          )
}

          export default LandingPage;
