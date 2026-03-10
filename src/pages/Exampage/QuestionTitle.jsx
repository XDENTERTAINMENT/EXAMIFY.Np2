import React from 'react'
import "./Exam.css"

function QuestionTitle({examTitle , setExamTitle}) {
  return (
    <div className='title'>
      <h1>Create Exam</h1>

      <input
        type="text"
        placeholder="Exam Title"
        value={examTitle}
        onChange={(e) => setExamTitle(e.target.value)}
      />
       <p>Quiz Code</p>

    </div>
  )
}

export default QuestionTitle
