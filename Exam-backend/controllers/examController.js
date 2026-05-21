const Exam = require("../models/Exam");
const Question = require("../models/Question");

// CREATE EXAM
exports.createExam = async (req, res) => {
  try {
    const { name, examCode, level } = req.body;

    if (!req.body.name) {
      return res.status(400).json({ message: "Questions are required" });
    }

    const exam = await Exam.create({
      name,
      examCode,
      level,
      teacher: req.user.id,
    });

    res.status(201).json(exam);
  } catch (error) {
    console.log("🔥 BACKEND ERROR:", error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

// FETCH ALL EXAMS
exports.getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find();

    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET QUESTIONS BY EXAM CODE
exports.getQuestionsByExam = async (req, res) => {
  try {
    const { examCode } = req.params;

    const exam = await Exam.findOne({
      examCode,
    });

    if (!exam) {
      return res.status(404).json({
        message: "Exam not found",
      });
    }

    const questions = await Question.find({
      exam: exam._id,
    });

    res.json(questions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
