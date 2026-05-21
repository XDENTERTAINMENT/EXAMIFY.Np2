import { useState } from "react";
import react from "react";


const ViewQuestion = () => {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState("");

  return (
    <div className="ViewQuestions">
      <h1>viewQuestion</h1>

      <select
        value={selectedExam}
        onChange={(e) => setSelectedExam(e.target.value)}
      >
        <option value="">Select Exam</option>

        {exams.map((exam) => (
          <option key={exam._id} value={exam._id}>
            {exam.name}
          </option>
        ))}
      </select>
    </div>
  );
};


export default ViewQuestion