import { useState, useEffect } from "react";
import "./Exam.css"
import axios from "axios";
import API from "../../services/api";

function QuestionForm({ addQuestion, updateQuestion, editingIndex, questionToEdit, examTitle }) {

  const [questionText, setQuestionText] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");


  useEffect(() => {
    if (questionToEdit) {
      setQuestionText(questionToEdit.questionText);
    }
  }, [questionToEdit]);


  // handlesubmit function for adding and updating question

  const handleSubmit = async (e) => {
    e.preventDefault();


    const question = { questionText };
    {

      if (editingIndex !== null) {
        updateQuestion(question);
      }
      else {
        addQuestion(question);
      }

      setQuestionText("");
    };


    const newQuestion = {
      questionText,
      options: [optionA, optionB, optionC, optionD],
      correctAnswer
    };

    addQuestion(newQuestion);

    setQuestionText("");
    setOptionA("");
    setOptionB("");
    setOptionC("");
    setOptionD("");
    setCorrectAnswer("");

    try {
    const quest = await API.post("/questions", {
      exam: examTitle,
      questionText: questionText,
      options: [optionA, optionB, optionC, optionD],
      correctAnswer: correctAnswer,
      marks: 1
    })
    console.log(quest.data);
    console.log(res.data);
    alert("✅ Question added");


  }
  catch (err) {
    console.log(err);
    alert("❌ Failed to add question");
  }

  };


  


    


  return (
    <div className="formsection">
      <form onSubmit={handleSubmit}>

        <h2>Add Question</h2>

        <input
          type="text"
          placeholder="Question"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />

        <input
          type="text"
          placeholder="Option A"
          value={optionA}
          onChange={(e) => setOptionA(e.target.value)}
        />

        <input
          type="text"
          placeholder="Option B"
          value={optionB}
          onChange={(e) => setOptionB(e.target.value)}
        />

        <input
          type="text"
          placeholder="Option C"
          value={optionC}
          onChange={(e) => setOptionC(e.target.value)}
        />

        <input
          type="text"
          placeholder="Option D"
          value={optionD}
          onChange={(e) => setOptionD(e.target.value)}
        />

        <select
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
        >
          <option value="">Correct Answer</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>

        <button type="submit"> {editingIndex !== null ? "Update Question" : "Add Question"}</button>

      </form>
    </div>

  );
}

export default QuestionForm;