const mongoose =  require("mongoose");

const submissionSchema = new mongoose.Schema({
    userId: String,
    quizId: String,
    answers:[]
},{timestamps:true});


const submission = mongoose.model("submission", submissionSchema);

module.exports=submission;