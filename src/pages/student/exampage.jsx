import React from 'react';
import "./Student.css";
import { useState, useEffect } from 'react';
import API from '../../services/api';

function Exampage() {

  const [stopTime, setStopTime] = useState(false);
  const [time, setTime] = useState(30);
  const [Gamestatus, setGameStatus] = useState("")
  const [answer, setAnswer] = useState("");
  const [questionloop, setQuestionLoop] = useState([]);

  // event repeatition
  useEffect(() => {
    handlesubmit();
  }, []);

  const handlesubmit = async () => {
    //  backend calls
    try {
      const questioncall = await API.get("/questions/:exam");
      // Randomize questions
      const shuffled = res.data.sort(() => Math.random() - 0.5);
      setQuestionLoop(shuffled);

      console.log(questioncall)
    }

    catch (err) {
      console.log("Error fetching questions:", err);
    }

  }
  useEffect(() => {
    if (time === 0) {
      setStopTime(true);
      setGameStatus("end");
      return;
    }
  })



  useEffect(() => {
    if (time > 0 && !stopTime) {
      const timer = setTimeout(() => {
        setTime(time - 1)
      }, 1000);

      return () => clearTimeout(timer)
    }

  }, [time, stopTime])










  return (
    <div className='examstudentpageContainer'>
      {stopTime ?
        (
          <>
            {Gamestatus === "finished" && (<h2 className='scores'> ✅ Quiz Submitted Successfully!</h2>)}
            {Gamestatus === "end" && (<h2 className='scores'> ⏹️ Time's Up!</h2>)}
          </>
        )


        : (
          <div className='examstudentpage' >
            <div className='timer'> {time} </div>
            <form onSubmit={(e) => e.preventDefault()} >
              {questionloop.map((question, index) => (
                <div key={question._id}>
                  <h3>
                    {index + 1}. {question.questionText}
                  </h3>

                  {question.options.map((option, i) => (
                    <div key={i}>
                      <input
                        type="radio"
                        name={`question-${question._id}`}
                        value={option}
                      />
                      <label>{option}</label>
                    </div>
                  ))}
                </div>
              ))}
              <button>Next</button>

            </form>


            <div className='examstudentpagesubmit'>
              <button onClick={handlesubmit} >Submit</button>
            </div >

          </div>)


      }


    </div>

  )
}

export default Exampage
