const Question = require("../models/Question.js");
const Exam = require("../models/Exam");
// ➕ CREATE QUESTION
exports.createQuestion = async (req, res) => {
  console.log("🔥 HIT createQuestion route"); // 👈 ADD THIS
  try {
    console.log("📦 BODY:", req.body); // 👈 ADD THIS
    const { examtitle, examCode, questionText, options, correctAnswer, marks,exam} =
      req.body;

    // // 🔥 find exam first
    // const exam = await Exam.findOne({
    //   exam_id,
    // });

    if (!exam) {
      return res.status(404).json({
        message: "Exam not found",
      });
    }

    console.log(req.body);

    // 🔥 create question
    const question = new Question({
      examtitle,
      examCode,
      questionText,
      options,
      correctAnswer,
      marks,
      exam,
    });

    if (!options || options.length < 3) {
      return res.status(400).json({
        message: " 4 options required",
      });
    }
    const savedQuestion = await question.save();

    console.log("✅ SAVED:", savedQuestion); // 👈 ADD THIS

    res.status(201).json({
      success: true,
      message: "Question created successfully",
      question: savedQuestion,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message || "Server error",
    });
  }
};

// ❌ DELETE QUESTION
exports.deleteQuestion = async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.questionId);

    res.status(200).json({
      success: true,
      message: "Question deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message || "Server error",
    });
  }
};
