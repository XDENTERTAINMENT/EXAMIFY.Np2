import React from 'react'
import "./Exam.css"

function QuestionPreview({question, index ,questiondelete,questionupdate} ) {
  return (

    <div className="question-card">

  <div className="question-top">

    <h3>
      Question {index + 1}
    </h3>

    <span>
      Correct: Option {question.correctAnswer}
    </span>

  </div>

  <p className="question-text">
    {question.questionText}
  </p>

  <ul className="question-options">

    <li>
      <strong>A.</strong> {question.options[0]}
    </li>

    <li>
      <strong>B.</strong> {question.options[1]}
    </li>

    <li>
      <strong>C.</strong> {question.options[2]}
    </li>

    <li>
      <strong>D.</strong> {question.options[3]}
    </li>

  </ul>

  <div className="question-actions">

    <button
      className="edit-btn"
      onClick={() => questionupdate(index)}
    >
      Edit
    </button>

    <button
      className="delete-btn"
      onClick={() => questiondelete(index)}
    >
      Delete
    </button>

  </div>

</div>
  )
}

export default QuestionPreview
