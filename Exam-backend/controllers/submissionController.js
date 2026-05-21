// const Submission =require("../models/Submission");




// const submission =  (req,res) =>{ 
//     try{
//         const submission = new submissiondb(req.body);
//         await submission.save();
//         res.json({message:"Exam submitted successfully ✅"});
//         console.log("data stored")
//     }

//     catch(err){
//         console.log(err);
//         res.status(500).json({error:"submission failed"});
//     }
// };