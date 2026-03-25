import React from 'react';
import "./Student.css";
import { useState, useEffect } from 'react';
import axios from "axios";

function Exampage() {

  const [stopTime, setStopTime] = useState(false);
  const [time, setTime] = useState(30);
  const [Gamestatus, setGameStatus] = useState("")
  const [answer, setAnswer] = useState("");


  const handlesubmit = async () => {
    //  backend calls
    try {
      await axios.post("http://localhost:3000/api/submit", {
        userId: "student1",
        quizId: "quiz123",
        answers: [answer]

      })
      setStopTime(true)
      setGameStatus("finished")
    }
    catch (err) {
      console.log(err)
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
              <h2> what is a noun</h2>

              <label htmlFor=" OptionA">
                <input type='radio'
                  id='OptionA'
                  value="A"
                  name='question1'
                  onChange={(e) => setAnswer(e.target.value)}
                />
                Option A
              </label>
              <label htmlFor=" OptionB">
                <input type='radio'
                  id='OptionB'
                  value="B"
                  name='question1'
                  onChange={(e) => setAnswer(e.target.value)}
                />
                Option B
              </label>
              <label htmlFor=" OptionC">
                <input type='radio'
                  id='OptionC'
                  value="C"
                  name='question1'
                  onChange={(e) => setAnswer(e.target.value)}
                />
                Option C
              </label>
              <label htmlFor=" OptionD">
                <input type='radio'
                  id='OptionD'
                  value="D"
                  name='question1'
                  onChange={(e) => setAnswer(e.target.value)}
                />
                Option D
              </label>

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
