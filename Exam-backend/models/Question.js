const mongoose = require("mongoose");




const QuestionSchema  = new mongoose.Schema({
    question : String,
     options:{
        A:String,
        B:String,
        C:String,
        D:String,
        
    }
    
},{timestamps:true});

const question = mongoose.model("Question", QuestionSchema);
module.exports= question;


