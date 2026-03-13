import React from 'react'
import "./Student.css"
import { useState } from 'react'

function Exampage() {

  const [stopTime , setStopTime] = useState(false);

 
  const handlesubmit=()=>{
    setStopTime(true)
  }


  return (
    <div className='examstudentpageContainer'>
      {stopTime? <h2 className='scores'> you scored 30%</h2>
       : (
        <div className='examstudentpage' >
       <div className='timer'> 30 </div>
       <form>
               <h2> what is a noun</h2>
      
      <label htmlFor=" Option A">
        <input type='radio' id=' Option A' name= 'question1' />
            Option A
      </label>
      <label htmlFor=" Option B">
        <input type='radio'id=' Option B' name= 'question1' />
            Option B
      </label>
      <label htmlFor=" Option C">
        <input type='radio' id=' Option C' name= 'question1' />
            Option C
      </label>
      <label htmlFor=" Option D">
        <input type='radio' id=' Option D' name= 'question1'/>
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
