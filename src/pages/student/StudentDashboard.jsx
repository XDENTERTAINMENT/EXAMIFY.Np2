
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Student.css"

function StudentDashboard() {
  const [quizCode, setQuizCode] = useState("");
  const [isValid, setIsValid] = useState(false);
  

  const navigate = useNavigate();

  const validateCode = () => {

    // example validation
    if (quizCode === "MATH101") {
      setIsValid(true);
    } else {
      setIsValid(false);
      alert("Invalid quiz code");
    }

  };

  const handleJoin = () => {
    navigate(`/exampage`)
  };

  return (
    <div className="dashboard"> 
    <div  className="profile">
       <div className="img">
         <img></img>
       </div>
    </div>
    <div className="page"> 
       <h1>Welcome Student</h1>
       
    <div>
      <h2>Enter Quiz Code</h2>
      <input
        type="text"
        value={quizCode}
        onChange={(e) => setQuizCode(e.target.value)}
      />

      <button onClick={validateCode}>
        Validate Code
      </button>

      {isValid && (
        <button onClick={handleJoin}>
          Join Quiz
        </button>
      )}
       </div>

       <div>
        
      <section>
        <h2>Previous Exams</h2>
        <p>Math Quiz</p>
        <p>Physics Test</p>
      </section>
       </div>
     
    </div>
      

    </div>
  );
}

export default StudentDashboard;


