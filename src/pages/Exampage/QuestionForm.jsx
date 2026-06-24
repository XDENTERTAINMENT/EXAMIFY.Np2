import { useState } from "react";
import "./Exam.css";
import API from "../../services/api";

function QuestionForm({
  addQuestion,
  updateQuestion,
  editingQuestion,
  clearEditing,
  examCode,
  examtitle,
  selectedExam,
}) {
  // 🔁 initialize directly from editingQuestion (no effect needed) —
  // the parent remounts this component via `key` whenever editingQuestion changes,
  // so these initial values are always correct on mount.
  const [questionText, setQuestionText] = useState(
    editingQuestion?.questionText || "",
  );
  const [optionA, setOptionA] = useState(
    editingQuestion?.options?.[0]?.name || "",
  );
  const [optionB, setOptionB] = useState(
    editingQuestion?.options?.[1]?.name || "",
  );
  const [optionC, setOptionC] = useState(
    editingQuestion?.options?.[2]?.name || "",
  );
  const [optionD, setOptionD] = useState(
    editingQuestion?.options?.[3]?.name || "",
  );
  const [correctAnswer, setCorrectAnswer] = useState(
    editingQuestion?.correctAnswer || "",
  );
  const [erroMessage, setErrorMessage] = useState("");
  const [status, setStatus] = useState(""); // "success" or "error"

  const resetForm = () => {
    setQuestionText("");
    setOptionA("");
    setOptionB("");
    setOptionC("");
    setOptionD("");
    setCorrectAnswer("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      examtitle: examtitle,
      examCode: examCode,
      questionText: questionText,
      options: [
        { name: optionA, value: "A" },
        { name: optionB, value: "B" },
        { name: optionC, value: "C" },
        { name: optionD, value: "D" },
      ],
      correctAnswer: correctAnswer, // "A" / "B" / "C" / "D"
      marks: 1,
      exam: selectedExam,
    };

    try {
      let res;

      if (editingQuestion) {
        // ✏️ UPDATE existing question
        res = await API.put(`/questions/${editingQuestion._id}`, payload);
        updateQuestion(res.data.question);
        clearEditing();
      } else {
        // ➕ CREATE new question
        res = await API.post("/questions", payload);
        addQuestion(res.data.question); // ✅ use the saved doc (has _id)
      }

      setStatus("success");
      setErrorMessage(res.data.message);
      setTimeout(() => setErrorMessage(""), 3000);

      resetForm();
    } catch (err) {
      console.log("❌ ERROR:", err.response?.data || err.message);
      setStatus("error");
      setErrorMessage(
        err.response?.data?.message ||
          `❌ Failed to ${editingQuestion ? "update" : "add"} question`,
      );
      setTimeout(() => setErrorMessage(""), 3000);
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
        <h2>{editingQuestion ? "Update Question" : "Add Questions"}</h2>
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
          <div className="input-group">
            <label>Option A</label>
            <input
              type="text"
              placeholder="Enter option A"
              value={optionA}
              onChange={(e) => setOptionA(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Option B</label>
            <input
              type="text"
              placeholder="Enter option B"
              value={optionB}
              onChange={(e) => setOptionB(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Option C</label>
            <input
              type="text"
              placeholder="Enter option C"
              value={optionC}
              onChange={(e) => setOptionC(e.target.value)}
            />
          </div>

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

        {/* BUTTONS */}
        <div className="form-btn-row">
          <button type="submit" className="secondary-btn">
            {editingQuestion ? "Update Question" : "Add Question"}
          </button>

          {editingQuestion && (
            <button
              type="button"
              className="cancel-btn"
              onClick={() => {
                clearEditing();
                resetForm();
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default QuestionForm;
