import { useState, useEffect } from "react";
import "./Exam.css";
import API from "../../services/api";

function QuestionForm({
  addQuestion,
  updateQuestion,
  editingIndex,
  questionToEdit,
  examCode,
  examtitle,
  selectedExam,
}) {
  const [questionText, setQuestionText] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [erroMessage, setErrorMessage] = useState("");
  const [status, setStatus] = useState(""); // "success" or "error"

  useEffect(() => {
    if (questionToEdit) {
      setQuestionText(questionToEdit.questionText);
    }
  }, [questionToEdit]);

  // handlesubmit function for adding and updating question

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const question = { questionText };
    // {

    //   if (editingIndex !== null) {
    //     updateQuestion(question);
    //   }
    //   else {
    //     addQuestion(question);
    //   }

    //   setQuestionText("");
    // };

    const newQuestion = {
      questionText,
      options: [optionA, optionB, optionC, optionD],
      correctAnswer,
    };

    try {
      const res = await API.post("/questions", {
        examtitle: examtitle,
        examCode: examCode,
        questionText: questionText,

        options: [
          { name: optionA, value: "A" },
          { name: optionB, value: "B" },
          { name: optionC, value: "C" },
          { name: optionD, value: "D" },
        ],

        correctAnswer: correctAnswer, // must be "A" / "B" / "C" / "D"
        marks: 1,
        exam: selectedExam,
      });

      console.log("✅ RESPONSE:", res.data);
      setStatus("success");
      setErrorMessage(res.data.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      console.log(res.data);

      addQuestion(newQuestion);

      setQuestionText("");
      setOptionA("");
      setOptionB("");
      setOptionC("");
      setOptionD("");
      setCorrectAnswer("");
    } catch (err) {
      console.log("❌ ERROR:", err.response?.data || err.message);
      setStatus("error");
      setErrorMessage(
        err.response?.data?.message || "❌ Failed to add question",
      );
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <div className="exam-container">
      {erroMessage && (
        <p className={status === "success" ? "success" : "error"}>
          {erroMessage}
        </p>
      )}

      <div className="section-header">
        <h2>{editingIndex !== null ? "Update Question" : "Add Questions"}</h2>

        <p>Create multiple-choice questions for your exam.</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* QUESTION */}
        <div className="input-group">
          <label>Question</label>

          <textarea
            placeholder="Enter your question here..."
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          ></textarea>
        </div>

        {/* OPTIONS */}
        <div className="option-grid">
          {/* OPTION A */}
          <div className="input-group">
            <label>Option A</label>

            <input
              type="text"
              placeholder="Enter option A"
              value={optionA}
              onChange={(e) => setOptionA(e.target.value)}
            />
          </div>

          {/* OPTION B */}
          <div className="input-group">
            <label>Option B</label>

            <input
              type="text"
              placeholder="Enter option B"
              value={optionB}
              onChange={(e) => setOptionB(e.target.value)}
            />
          </div>

          {/* OPTION C */}
          <div className="input-group">
            <label>Option C</label>

            <input
              type="text"
              placeholder="Enter option C"
              value={optionC}
              onChange={(e) => setOptionC(e.target.value)}
            />
          </div>

          {/* OPTION D */}
          <div className="input-group">
            <label>Option D</label>

            <input
              type="text"
              placeholder="Enter option D"
              value={optionD}
              onChange={(e) => setOptionD(e.target.value)}
            />
          </div>
        </div>

        {/* CORRECT ANSWER */}
        <div className="input-group">
          <label>Correct Answer</label>

          <select
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
          >
            <option value="">Select Correct Answer</option>

            <option value="A">{optionA || "Option A"}</option>
            <option value="B">{optionB || "Option B"}</option>
            <option value="C">{optionC || "Option C"}</option>
            <option value="D">{optionD || "Option D"}</option>
          </select>
        </div>

        {/* BUTTON */}
        <button type="submit" className="secondary-btn">
          {editingIndex !== null ? "Update Question" : "Add Question"}
        </button>
      </form>
    </div>
  );
}

export default QuestionForm;
