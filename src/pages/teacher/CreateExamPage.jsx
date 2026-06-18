import { useState } from "react";
import QuestionForm from "../Exampage/QuestionForm";
import QuestionTitle from "../Exampage/QuestionTitle";
import QuestionPreview from "../Exampage/QuestionPreview";
import "./createexam.css";
import API from "../../services/api";

function CreateExamPage() {
  // const [examTitle, setExamTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [examCode, setExamCode] = useState("");
  const [examtitle, setExamtitle] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [level, setLevel] = useState("");
  const [erroMessage, setErrorMessage] = useState("");
  const [status, setStatus] = useState(""); // "success" or "error"
  // const [questionText, setQuestionText] = useState("");
  // const [optionA, setOptionA] = useState("");
  // const [optionB, setOptionB] = useState("");
  // const [optionC, setOptionC] = useState("");
  // const [optionD, setOptionD] = useState("");

  // 🔥 create exam

  const addQuestion = (question) => {
    setQuestions([...questions, question]);
  };

  const deleteQuestion = (index) => {
    const deletedQuestions = questions.filter((q, i) => i !== index);
    setQuestions(deletedQuestions);
  };

  const editQuestion = (index) => {
    setEditingIndex(index);
  };

  const updateQuestion = (updatedQuestion) => {
    const newQuestions = questions.map((q, i) =>
      i === editingIndex ? updatedQuestion : q,
    );

    setQuestions(newQuestions);
    setEditingIndex(null);
  };



  const GenerateID = () => {
    return Math.random().toString(36).substring(2, 8);
  };




  return (
 
    <div className="create-exam-page">
      {/* HERO SECTION */}
      <div className="exam-hero">
        <div>
          <span className="hero-tag">Teacher Dashboard</span>

          <h1>Create & Manage Exams 📝</h1>

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
    

      {/* ADD QUESTION */}
    

        <div className="question-form">
          <QuestionForm
            examCode={examCode}
            addQuestion={addQuestion}
            updateQuestion={updateQuestion}
            editingIndex={editingIndex}
            questionToEdit={questions[editingIndex]}
            examtitle={examtitle}
            selectedExam={selectedExam}
             status={status}
            setStatus={setStatus}
            erroMessage={erroMessage}
            setErrorMessage={setErrorMessage}
            level={level}
            setLevel={setLevel}
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
            questions.map((q, index) => (
              <QuestionPreview
                key={index}
                question={q}
                index={index}
                questiondelete={deleteQuestion}
                questionupdate={editQuestion}
              />
            ))
          ) : (
            <div className="empty-preview">
              <i className="fa-regular fa-folder-open"></i>

              <p>No questions added yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="bottom-actions">
        {/* <button
      className="save-btn"
      onClick={saveExam}
    >
      Draft
    </button> */}

      {/* <button type="submit">
          
          {editingIndex !== null ? "Update Question" : "Add Question"}
        </button> */}

        {/* <button className="publish-btn" onClick={}>
          Save Quiz 🚀
        </button> */}
      </div>
    </div>
  );
}

export default CreateExamPage;
