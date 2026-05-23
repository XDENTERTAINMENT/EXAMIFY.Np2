const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },

    answers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
          required: true,
        },

        selectedOption: {
          type: String,
          required: true,
        },

        isCorrect: {
          type: Boolean,
          default: false,
        },
      },
    ],

    score: {
      type: Number,
      default: 0,
    },

    totalQuestions: {
      type: Number,
      required: true,
    },

    percentage: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,

      enum: ["pending", "Completed"],

      default: "pending",
    },
    startTime: {
      type: Date,
    },

    submittedAt: {
      type: Date,
      default: Date.now,
    },

    durationUsed: {
      type: Number, // in minutes or seconds
    },

    resultStatus: {
      type: String,
      enum: ["Passed", "Failed"],
    },
  },
  { timestamps: true },
);

const submission = mongoose.model("Submission", submissionSchema);

module.exports = submission;
