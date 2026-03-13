import React from 'react'
import "./Student.css"
import { useState,useEffect } from 'react'

function Exampage() {

  const [stopTime , setStopTime] = useState(false);
  const [time , setTime]  = useState(30);
  const [ Gamestatus, setGameStatus] = useState("")


 
  const handlesubmit=()=>{
    setStopTime(true)
    setGameStatus("finished")
  }
  useEffect(()=>{
    if(time===0){
      setStopTime(true);
      setGameStatus("end");
      return;
    }
  })


    
  useEffect(()=>{
    if(time > 0 &&  !stopTime) {
      const timer = setTimeout(() => {
         setTime(time-1)
      }, 1000);

      return ()=> clearTimeout(timer)
    }
    
  } ,[time,stopTime])




   



  return (
    <div className='examstudentpageContainer'>
      {stopTime? 
         (
          <>
          { Gamestatus === "finished" &&(<h2 className='scores'> ✅ Quiz Submitted Successfully!</h2>)}
          {Gamestatus ==="end" &&(<h2 className='scores'> ⏹️ Time's Up!</h2>)}
          </>
         )
      
      
       : (
        <div className='examstudentpage' >
       <div className='timer'> {time} </div>
       <form onSubmit={(e)=> e.preventDefault()} >
               <h2> what is a noun</h2>
      
      <label htmlFor=" Option A">
        <input type='radio' id='OptionA' name= 'question1' />
            Option A
      </label>
      <label htmlFor=" Option B">
        <input type='radio'id='OptionB' name= 'question1' />
            Option B
      </label>
      <label htmlFor=" Option C">
        <input type='radio' id='OptionC' name= 'question1' />
            Option C
      </label>
      <label htmlFor=" Option D">
        <input type='radio' id='OptionD' name= 'question1'/>
            Option D
      </label>
     
      <button>Next</button>

       </form>
       

        <div className='examstudentpagesubmit'>
       <button onClick={  handlesubmit} >Submit</button>
       </div >

    </div>)

    
    }
  
   
    </div>
    
  )
}

export default Exampage
