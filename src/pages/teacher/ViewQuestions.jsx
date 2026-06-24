import { useState,useEffect } from "react";
import API from "../../services/api";
import "./viewquestion.css";

const ViewQuestion = () => {
  // search inputs
  const [examName, setExamName] = useState("");
  const [examCode, setExamCode] = useState("");

  // results
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);

  // ui state
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // edit state
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    questionText: "",
    options: [
      { name: "", value: "A" },
      { name: "", value: "B" },
      { name: "", value: "C" },
      { name: "", value: "D" },
    ],
    correctAnswer: "A",
    marks: 1,
  });

  useEffect(() => {
  if (!errorMessage) return;
  const timer = setTimeout(() => setErrorMessage(""), 3000);
  return () => clearTimeout(timer);
}, [errorMessage]);


  // 🔍 FIND EXAM BY NAME + CODE
  const handleFindExam = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setExam(null);
    setQuestions([]);

    if (!examName.trim() || !examCode.trim()) {
      setErrorMessage("Please enter both exam name and exam code.");
      return;
    }

    setLoading(true);

    try {
      // 1) validate exam exists (matches /api/exam/validate)
      const validateRes = await API.post("/exam/validate", {
        examName,
        examCode,
      });

      const foundExam = validateRes.data.exam;
      setExam(foundExam);
      console.log("FOUND EXAM:", foundExam);

      // 2) fetch its questions (matches /api/exam/:examCode)
      const questionsRes = await API.get(`/exam/${foundExam.examCode}`);
      setQuestions(questionsRes.data.questions || []);
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || "Could not find this exam."
      );
    } finally {
      setLoading(false);
    }
  };

  // ❌ DELETE QUESTION
  const handleDelete = async (questionId) => {
    const confirmDelete = window.confirm(
      "Delete this question? This cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`/questions/${questionId}`);
      setQuestions((prev) => prev.filter((q) => q._id !== questionId));
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || "Failed to delete question."
      );
    }
  };

  // ✏️ START EDIT
  const startEdit = (question) => {
    setEditingId(question._id);
    setEditForm({
      questionText: question.questionText,
      options:
        question.options?.length === 4
          ? question.options
          : [
              { name: "", value: "A" },
              { name: "", value: "B" },
              { name: "", value: "C" },
              { name: "", value: "D" },
            ],
      correctAnswer: question.correctAnswer,
      marks: question.marks || 1,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = editForm.options.map((opt, i) =>
      i === index ? { ...opt, name: value } : opt
    );
    setEditForm({ ...editForm, options: updatedOptions });
  };

  // ✅ SAVE UPDATE
  const handleUpdate = async (questionId) => {
    try {
      const res = await API.put(`/questions/${questionId}`, editForm);

      setQuestions((prev) =>
        prev.map((q) => (q._id === questionId ? res.data.question : q))
      );

      setEditingId(null);
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || "Failed to update question."
      );
    }
  };

  return (
    <div className="view-questions-page">
      {/* HERO */}
      <div className="vq-hero">
        <div>
          <span className="hero-tag">Teacher Dashboard</span>
          <h1>View & Manage Questions 📋</h1>
          <p>
            Search an exam by name and code, then update or remove questions
            inside it.
          </p>
        </div>

        <div className="hero-stats">
          <div className="stat-card">
            <h2>{questions.length}</h2>
            <span>Questions Loaded</span>
          </div>
        </div>
      </div>

      {/* SEARCH BAR */}
      <form className="vq-search-card" onSubmit={handleFindExam}>
        <div className="vq-search-grid">
          <div className="input-group">
            <label>Exam Name</label>
            <input
              type="text"
              placeholder="e.g. Mid Term Mathematics"
              value={examName}
              onChange={(e) => setExamName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Exam Code</label>
            <input
              type="text"
              placeholder="e.g. MTH101"
              value={examCode}
              onChange={(e) => setExamCode(e.target.value)}
            />
          </div>

          <button type="submit" className="search-btn" disabled={loading}>
            {loading ? "Searching..." : "Find Exam"}
          </button>
        </div>

        {errorMessage && <p className="vq-error">{errorMessage}</p>}
      </form>

      {/* RESULTS */}
      <div className="vq-results">
        {exam && (
          <div className="vq-exam-banner">
            <h3>{exam.name}</h3>
            <span>Code: {exam.examCode}</span>
            <span>Level: {exam.level}</span>
          </div>
        )}

        {!loading && exam && questions.length === 0 && (
          <div className="empty-preview">
            <i className="fa-regular fa-folder-open"></i>
            <p>No questions found for this exam yet.</p>
          </div>
        )}

        <div className="vq-grid">
          {questions.map((q, index) => (
            <div className="question-card" key={q._id}>
              {editingId === q._id ? (
                // ---------- EDIT MODE ----------
                <div className="edit-mode">
                  <textarea
                    className="edit-textarea"
                    value={editForm.questionText}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        questionText: e.target.value,
                      })
                    }
                  />

                  <div className="option-grid">
                    {editForm.options.map((opt, i) => (
                      <input
                        key={opt.value}
                        type="text"
                        className="edit-input"
                        placeholder={`Option ${opt.value}`}
                        value={opt.name}
                        onChange={(e) =>
                          handleOptionChange(i, e.target.value)
                        }
                      />
                    ))}
                  </div>

                  <div className="edit-row">
                    <select
                      value={editForm.correctAnswer}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          correctAnswer: e.target.value,
                        })
                      }
                    >
                      <option value="A">Correct: A</option>
                      <option value="B">Correct: B</option>
                      <option value="C">Correct: C</option>
                      <option value="D">Correct: D</option>
                    </select>

                    <input
                      type="number"
                      min="1"
                      className="marks-input"
                      value={editForm.marks}
                      onChange={(e) =>
                        setEditForm({ ...editForm, marks: e.target.value })
                      }
                    />
                  </div>

                  <div className="question-actions">
                    <button
                      className="save-btn"
                      onClick={() => handleUpdate(q._id)}
                    >
                      Save
                    </button>
                    <button className="cancel-btn" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // ---------- VIEW MODE ----------
                <>
                  <div className="question-top">
                    <h3>Question {index + 1}</h3>
                    <span>Correct: {q.correctAnswer}</span>
                  </div>

                  <p className="question-text">{q.questionText}</p>

                  <ul className="question-options">
                    {q.options?.map((opt) => (
                      <li key={opt.value}>
                        <strong>{opt.value}.</strong> {opt.name}
                      </li>
                    ))}
                  </ul>

                  <div className="question-actions">
                    <button className="edit-btn" onClick={() => startEdit(q)}>
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(q._id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewQuestion;
