import React from 'react'
import "./Exam.css"

function QuestionPreview({ question, index, questiondelete, questionupdate }) {
  return (
    <div className="question-card">

      <div className="question-top">
        <h3>Question {index + 1}</h3>
        <span>Correct: Option {question.correctAnswer}</span>
      </div>

      <p className="question-text">
        {question.questionText}
      </p>

      <ul className="question-options">
        {question.options.map((opt) => (
          <li key={opt.value}>
            <strong>{opt.value}.</strong> {opt.name}
          </li>
        ))}
      </ul>

      <div className="question-actions">

        <button
          className="edit-btn"
          onClick={questionupdate}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={questiondelete}
        >
          Delete
        </button>

      </div>

    </div>
  )
}

export default QuestionPreview
