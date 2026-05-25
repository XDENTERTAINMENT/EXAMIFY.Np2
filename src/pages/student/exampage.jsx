import React, { useEffect, useState } from "react";
import "./exampage.css";
import API from "../../services/api";
import { useParams } from "react-router-dom";

function Exampage() {
  const [stopTime, setStopTime] = useState(false);
  const [time, setTime] = useState(0);
  const [Gamestatus, setGameStatus] = useState("");
  const [examData, setExamData] = useState(null);

  // FIXED
  const [answers, setAnswers] = useState({});

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // FIXED
  const [examId, setExamId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const { examCode } = useParams();

  const current = questions[currentQuestion];

  // FETCH QUESTIONS
  useEffect(() => {
    fetchQuestions();
  }, []);

  // TIMER END
  useEffect(() => {
    if (time === 0 && !stopTime) {
      setStopTime(true);
      setGameStatus("end");

      submitExam(true);
    }
  }, [time, questions]);

  // TIMER COUNTDOWN
  useEffect(() => {
    if (time > 0 && !stopTime) {
      const timer = setTimeout(() => {
        setTime((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [time, stopTime]);

  // FETCH QUESTIONS FUNCTION
  const fetchQuestions = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/exam/${examCode}`);

      console.log(res.data);

      // RANDOMIZE QUESTIONS
      const { exam, questions } = res.data;

      setExamData(exam);
      setTime(exam.duration * 60);

      const shuffled = [...questions].sort(() => Math.random() - 0.5);

      setQuestions(shuffled);

      // GET EXAM ID
      if (shuffled.length > 0) {
        setExamId(shuffled[0].exam);
      }

      // timer
      const storageKey = `examStart_${exam._id}`;

      let savedStart = localStorage.getItem(storageKey);

      if (!savedStart) {
        savedStart = Date.now();

        localStorage.setItem(storageKey, savedStart);
      }

      const elapsed = Math.floor((Date.now() - Number(savedStart)) / 1000);

      const remaining = exam.duration * 60 - elapsed;

      setTime(remaining > 0 ? remaining : 0);

      // GET STUDENT ID
      const user = JSON.parse(localStorage.getItem("user"));
      const users = user?.id;
      setStudentId(users);
    } catch (err) {
      console.log("Error fetching questions:", err);
      setFetchError(err.response?.data?.message || "Failed to load exam");
      
    } finally {
      setLoading(false);
    }
  };

  // SAVE ANSWER API
  const saveAnswerAPI = async (data) => {
    return API.post("/answers/save-answer", data);
  };

  // SUBMIT EXAM API
  const submitExamAPI = async (data) => {
    return API.post("/answers/submit-exam", data);
  };

  // HANDLE ANSWER
  const handleAnswer = (questionId, option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  // HANDLE NEXT
  const handleNext = async () => {
    if (!current) return;

    if (!answers[current._id]) {
      alert("Please select an answer");
      return;
    }

    await saveAnswerAPI({
      student: studentId,
      exam: examId,
      questionId: current._id,
      selectedOption: answers[current._id],
    });

    setCurrentQuestion((prev) => prev + 1);
  };
  // HANDLE SUBMIT
  const submitExam = async (autoSubmit = false) => {
    try {
      if (!current) return;

      // CHECK IF LAST QUESTION ANSWER EXISTS
      if (!autoSubmit && !answers[current._id]) {
        alert("Please select an answer");
        return;
      }

      // 🔥 SAVE LAST ANSWER FIRST
      await saveAnswerAPI({
        student: studentId,
        exam: examId,
        questionId: current._id,
        selectedOption: answers[current._id],
      });

      // 🔥 THEN SUBMIT EXAM
      await submitExamAPI({
        studentId,
        examId,
      });

      setStopTime(true);
      setGameStatus("finished");
    } catch (err) {
      console.log("Submit error:", err);
    }
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  if (loading) {
    return <h2>Loading Exam...</h2>;
  }

  if (fetchError) {
    return <h2>{fetchError}</h2>;
  }

  return (
    <div className="exam-page">
      {/* LEFT SIDEBAR */}
      <aside className="exam-sidebar">
        <h2>Questions</h2>

        {/* STATUS */}
        <div className="question-status">
          <div className="status-item">
            <span className="dot current"></span>
            <p>Current</p>
          </div>

          <div className="status-item">
            <span className="dot answered"></span>
            <p>Answered</p>
          </div>

          <div className="status-item">
            <span className="dot not-answered"></span>
            <p>Not Answered</p>
          </div>

          <div className="status-item">
            <span className="dot review"></span>
            <p>Marked</p>
          </div>
        </div>

        {/* QUESTION GRID */}
        <div className="question-grid">
          {questions.map((q, index) => (
            <button
              key={q._id}
              className={`q-btn
              ${currentQuestion === index ? "active" : ""}
              ${answers[q._id] ? "answered-btn" : ""}
              `}
              onClick={() => setCurrentQuestion(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="exam-content">
        {/* TOP */}
        <div className="exam-top">
          <span className="subject-badge">Exam Question</span>

          <div className="question-count">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>

        {/* TIMER */}
        <div className="top-timer">⏰ {time}</div>

        {/* STATUS */}
        {stopTime ? (
          <div className="game-status">
            {Gamestatus === "finished" && (
              <h2 className="scores">✅ Quiz Submitted Successfully!</h2>
            )}

            {Gamestatus === "end" && <h2 className="scores">⏹️ Time's Up!</h2>}
          </div>
        ) : (
          <>
            {/* QUESTION */}
            {current && (
              <div className="question-box">
                <h1>
                  {currentQuestion + 1}. {current.questionText}
                </h1>

                {/* OPTIONS */}
                <form onSubmit={(e) => e.preventDefault()}>
                  {current.options.map((option, i) => (
                    <div
                      key={i}
                      className={`option
                      ${answers[current._id] === option ? "active-option" : ""}
                      `}
                    >
                      <input
                        type="radio"
                        name={current._id}
                        value={option.value}
                        checked={answers[current._id] === option.value}
                        onChange={() => handleAnswer(current._id, option.value)}
                      />

                      <label>{option.name}</label>
                    </div>
                  ))}
                </form>
              </div>
            )}

            {/* INSTRUCTIONS */}
            <div className="instruction-box">
              <h3>Instructions</h3>

              <ul>
                <li>Read every question carefully.</li>
                <li>You can move between questions.</li>
                <li>Submit before timer ends.</li>
              </ul>
            </div>

            {/* BUTTONS */}
            <div className="exam-actions">
              <button
                className="prev-btn"
                disabled={currentQuestion === 0}
                onClick={() => setCurrentQuestion((prev) => prev - 1)}
              >
                Previous
              </button>
              {currentQuestion === questions.length - 1 ? (
                <button className="submit-btn" onClick={submitExam}>
                  Finish Exam
                </button>
              ) : (
                <button className="next-btn" onClick={handleNext}>
                  Save & Next
                </button>
              )}
            </div>
          </>
        )}
      </main>

      {/* RIGHT SIDEBAR */}
      <aside className="exam-right">
        {/* TIMER */}
        <div className="timer-box">
          <h2>Time Left</h2>

          <div className="timer-circle">
            <span>
              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </span>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="summary-box">
          <h2>Exam Summary</h2>

          <div className="summary-item">
            <p>Total Questions</p>
            <span>{questions.length}</span>
          </div>

          <div className="summary-item">
            <p>Answered</p>

            <span className="green">{Object.keys(answers).length}</span>
          </div>

          <div className="summary-item">
            <p>Remaining</p>

            <span className="orange">
              {questions.length - Object.keys(answers).length}
            </span>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Exampage;
