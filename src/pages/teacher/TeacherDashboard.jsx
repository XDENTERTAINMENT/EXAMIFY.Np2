import React from 'react'
import { useNavigate } from 'react-router-dom'

function TeacherDashboard() {

  const navigate = useNavigate();
  return (
    <div>
       <h1>Teacher Dashboard</h1>


     <div className='btn-teacher'> 
      <button onClick={()=> navigate("/examexampage") }>Create Exam</button>
      <button>View Questions</button>
      <button>View Results</button>
     </div>
      
    </div>
  )
}

export default TeacherDashboard
