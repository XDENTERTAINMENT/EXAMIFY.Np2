const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    examtitle: {
      type: String,
      required: true,
    },

    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },

    questionText: {
      type: String,
      required: true,
    },

    options: [
      {
        name: {
          type: String,
          required: true, // what student sees
        },
        value: {
          type: String,
          required: true, // A, B, C, D
        },
      },
    ],

    correctAnswer: {
      type: String,
      required: true, // MUST be "A", "B", "C", "D"
    },

    marks: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);