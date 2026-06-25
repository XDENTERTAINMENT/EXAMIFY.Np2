import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionForm from "../Exampage/QuestionForm";
import QuestionTitle from "../Exampage/QuestionTitle";
import QuestionPreview from "../Exampage/QuestionPreview";
import "./createexam.css";
import API from "../../services/api";
import HelpButton from "../../components/HelpButton";

function CreateExamPage() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [editingQuestion, setEditingQuestion] = useState(null); // 🔁 whole question object now, not index
  const [examCode, setExamCode] = useState("");
  const [examtitle, setExamtitle] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [level, setLevel] = useState("");
  const [erroMessage, setErrorMessage] = useState("");
  const [status, setStatus] = useState(""); // "success" or "error"

  // ➕ called by QuestionForm after a successful POST /questions
  const addQuestion = (savedQuestion) => {
    setQuestions((prev) => [...prev, savedQuestion]);
  };

  // ✏️ called by QuestionForm after a successful PUT /questions/:id
  const updateQuestion = (updatedQuestion) => {
    setQuestions((prev) =>
      prev.map((q) => (q._id === updatedQuestion._id ? updatedQuestion : q)),
    );
  };

  // ❌ DELETE QUESTION — now hits the server, since questions save to Mongo immediately
  const deleteQuestion = async (questionId) => {
    const confirmDelete = window.confirm(
      "Delete this question? This cannot be undone.",
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`/questions/${questionId}`);
      setQuestions((prev) => prev.filter((q) => q._id !== questionId));
    } catch (err) {
      console.log("❌ ERROR:", err.response?.data || err.message);
      setStatus("error");
      setErrorMessage(
        err.response?.data?.message || "Failed to delete question",
      );
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  // 📝 puts a question into edit-mode (QuestionForm reads editingQuestion)
  const editQuestion = (question) => {
    setEditingQuestion(question);
  };

  const clearEditing = () => {
    setEditingQuestion(null);
  };

  // 🚀 PUBLISH — questions already saved to MongoDB as they were added,
  // so this just confirms completion to the teacher and sends them back
  // to the dashboard. No extra API call needed.
  const handlePublish = () => {
    if (questions.length === 0) {
      window.alert("Add at least one question before publishing.");
      return;
    }

    const confirmPublish = window.confirm(
      `Publish this exam with ${questions.length} question(s)?`,
    );
    if (!confirmPublish) return;

    navigate("/teacherdashboard");
  };

  return (
    <div className="create-exam-page">
      {/* HERO SECTION */}
      <div className="exam-hero">
        <div>
          <span className="hero-tag">Teacher Dashboard</span>
          <h1
            style={{ display: "flex", alignItems: "center", gap: "12px" }}
          >
            Create & Manage Exams 📝
            <HelpButton
              title="How to Create an Exam"
              steps={[
                "Enter title",
                "Set duration",
                "Add instructions",
                "Add questions",
                "Click Publish",
              ]}
            />
          </h1>
          <p>
            Build professional exams, organize questions, and publish
            assessments seamlessly for students.
          </p>
        </div>

        <div className="hero-stats">
          <div className="stat-card">
            <h2>{questions.length}</h2>
            <span>Total Questions</span>
          </div>

          <div className="stat-card">
            <h2>Live</h2>
            <span>Exam Builder</span>
          </div>
        </div>
      </div>

      {/* CREATE EXAM */}
      <div className="question-title">
        <QuestionTitle
          examCode={examCode}
          setExamCode={setExamCode}
          examtitle={examtitle}
          setExamtitle={setExamtitle}
          setSelectedExam={setSelectedExam}
          status={status}
          setStatus={setStatus}
          erroMessage={erroMessage}
          setErrorMessage={setErrorMessage}
          level={level}
          setLevel={setLevel}
        />
      </div>

      {/* ADD / EDIT QUESTION */}
      <div className="question-form">
        <QuestionForm
          key={editingQuestion?._id || "new"}
          examCode={examCode}
          examtitle={examtitle}
          selectedExam={selectedExam}
          addQuestion={addQuestion}
          updateQuestion={updateQuestion}
          editingQuestion={editingQuestion}
          clearEditing={clearEditing}
        />
      </div>

      {/* QUESTIONS PREVIEW */}
      <div className="exam-container">
        <div className="section-header">
          <h2>Questions Preview</h2>
          <p>Preview added questions before publishing.</p>
        </div>

        <div className="preview">
          {questions.length > 0 ? (
            questions.map((q) => (
              <QuestionPreview
                key={q._id}
                question={q}
                index={questions.findIndex((item) => item._id === q._id)}
                questiondelete={() => deleteQuestion(q._id)}
                questionupdate={() => editQuestion(q)}
              />
            ))
          ) : (
            <div className="empty-preview">
              <i className="fa-regular fa-folder-open"></i>
              <p>No questions added yet.</p>
            </div>
          )}
        </div>

        {questions.length > 0 && (
          <div className="publish-row">
            <button className="publish-btn" onClick={handlePublish}>
              Publish Exam
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateExamPage;
