const mongoose = require("mongoose");

const examSchema = new mongoose.Schema(
  {
    // exam title
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // unique code students use
    examCode: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // class level
    level: {
      type: String,
      trim: true,
    },

    // teacher ownership
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    duration: {
      type: Number, // in minutes
      required: true,
    },

    startTime: {
      type: Date,
    },

    endTime: {
      type: Date,
    },
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Exam", examSchema);
