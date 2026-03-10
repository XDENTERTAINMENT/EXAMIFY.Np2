import { useState } from "react";
import QuestionForm from "../Exampage/QuestionForm";
import QuestionTitle from "../Exampage/QuestionTitle";
import QuestionPreview from "../Exampage/QuestionPreview";

function CreateExamPage() {

  const [examTitle, setExamTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);



  
 


   const addQuestion = (question) => {
    setQuestions([...questions, question]);
  };

  const deleteQuestion = (index) => {
    const deletedQuestions = questions.filter((q, i) => i !== index);
    setQuestions(deletedQuestions);
  };

  const editQuestion = (index) => {
    setEditingIndex(index)


  };

    const updateQuestion = (updatedQuestion) => {
     
    const newQuestions = questions.map((q,i) =>
      i === editingIndex ? updatedQuestion : q
    );
     
    setQuestions( newQuestions);
    setEditingIndex(null);
  };

  
  return (
    <div  className="exampage">

      
        <div className="question-title">
             <QuestionTitle
         examTitle={examTitle}
         setExamTitle={setExamTitle}
        /> 
        </div>

          <div className="question-form">
             <QuestionForm
         addQuestion={addQuestion}
         updateQuestion={updateQuestion}
        editingIndex={editingIndex}
        questionToEdit={questions[editingIndex]}
         />
        
          </div>
        <div  className="preview">
            <h2>Questions Preview</h2>

          {questions.map((q, index) => (
          <QuestionPreview
            key={index}
            question={q}
           index={index}
           questiondelete={deleteQuestion}
           questionupdate= {editQuestion}
        />
      ))}
        
        </div>
        
      <div  className="saveExam"> 
        <button>Save Exam</button>
      <button>Publish Quiz</button>
     
      </div>
      

      

    </div>
  );
}

export default CreateExamPage;