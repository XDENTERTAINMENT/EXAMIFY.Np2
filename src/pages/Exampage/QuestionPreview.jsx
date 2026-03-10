import React from 'react'
import "./Exam.css"

function QuestionPreview({question, index ,questiondelete,questionupdate} ) {
  return (
    <div className='question-preview'>

      <h3>Question {index + 1}</h3>

      <p>{question.questionText}</p>

      <ul>
        <li>A. {question.options[0]}</li>
        <li>B. {question.options[1]}</li>
        <li>C. {question.options[2]}</li>
        <li>D. {question.options[3]}</li>
      </ul>

      <p>Correct Answer: {question.correctAnswer}</p>
      <button onClick={() => questionupdate(index)}>Edit</button>

      <button onClick={() => questiondelete(index)}>Delete</button>


    </div>
  )
}

export default QuestionPreview
