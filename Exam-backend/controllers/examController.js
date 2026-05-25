const Exam = require("../models/Exam");
const Question = require("../models/Question");
const Submission = require("../models/Submission");

// CREATE EXAM
exports.createExam = async (req, res) => {
  try {
    let { name, examCode, level } = req.body;

    // validation
    if (!name || !examCode || !level) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // normalize input
    name = name.trim();
    examCode = examCode.trim().toLowerCase();
    level = level.trim();

    // check if exam already exists
    const existingExam = await Exam.findOne({
      examCode,
      teacher: req.user.id,
    });

    if (existingExam) {
      return res.status(400).json({
        message: "Exam code already exists",
      });
    }

    // create exam
    const exam = await Exam.create({
      name,
      examCode,
      level,
      teacher: req.user.id,
    });

    res.status(201).json({
      message: "Exam created successfully",
      exam,
    });
  } catch (error) {
    console.log("🔥 BACKEND ERROR:", error.message);

    res.status(500).json({
      message: "Server error",
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

// verify result

exports.verifyResults = async (req, res) => {
  try {
    let { examName, examCode, teacherId } = req.body;

    examName = examName?.trim().toLowerCase();
    examCode = examCode?.trim().toLowerCase(); // ✅ FIXED

    // FIND EXAM
    const exam = await Exam.findOne({
      name: examName,
      examCode,
    });

    if (!exam) {
      return res.status(404).json({
        message: "Invalid Exam Name or Code",
      });
    }

    // CHECK TEACHER
    if (exam.teacher.toString() !== teacherId) {
      return res.status(403).json({
        message: "Unauthorized Access",
      });
    }

    // GET RESULTS
    const results = await Submission.find({
      exam: exam._id,
    })
      .populate("student")

      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      results,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
