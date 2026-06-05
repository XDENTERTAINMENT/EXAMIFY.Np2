import { useState } from "react";



const ViewQuestion = () => {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState("");


 const data  =()=>{

  setExams("")
 }

 console.log(data)
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




// //  const [examName, setExamName] = useState("");
// //   const [examCode, setExamCode] = useState("");
// //   const [results, setResults] = useState([]);
// //   const [filteredResults, setFilteredResults] = useState([]);
// //   const [selectedExam, setSelectedExam] = useState(null);
// //   const [searchStudent, setSearchStudent] = useState("");

// //   // SEARCH EXAM
// //   const handleExamSearch = async () => {
// //     try {
// //       const res = await API.get(`/exam/search?name=${examName}`);

// //       setSelectedExam(res.data);
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   // VERIFY EXAM CODE
// //   const verifyExamCode = async () => {
// //     try {
// //       const res = await API.post("/exam/verify-code", {
// //         examId: selectedExam._id,
// //         code: examCode,
// //       });

// //       if (res.data.success) {
// //         fetchResults();
// //       } else {
// //         alert("Invalid Exam Code");
// //       }
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   // FETCH RESULTS
// //   const fetchResults = async () => {
// //     try {
// //       const res = await API.get(`/results/${selectedExam._id}`);

// //       setResults(res.data);
// //       setFilteredResults(res.data);
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   // SEARCH STUDENT
// //   useEffect(() => {
// //     const filtered = results.filter((item) =>
// //       item.student?.surname
// //         ?.toLowerCase()
// //         .includes(searchStudent.toLowerCase()),
// //     );

// //     setFilteredResults(filtered);
// //   }, [searchStudent, results]);



  