const quizzes = [
 { code: "MATH101", title: "Math Quiz" },
 { code: "PHY101", title: "Physics Quiz" }
];

const validateCode = () => {

 const foundQuiz = quizzes.find(q => q.code === quizCode);

 if(foundQuiz){
   setIsValid(true);
 }else{
   setIsValid(false);
   alert("Invalid quiz code");
 }

};

const handleJoin = () => {
 navigate(`/exampage/${quizCode}`)
};