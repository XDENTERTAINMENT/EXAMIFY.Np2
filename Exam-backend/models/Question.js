const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    exam: {
      type:String,
      ref: "Exam",
      required: true,
    },

    questionText: {
      type: String,
      required: true,
    },

    options: [
      {
        type: String,
        required: true,
      },
    ],

    correctAnswer: {
      type: String,
      required: true,
    },

    marks: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);

module.exports=Question;