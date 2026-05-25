const Exam = require("../models/Exam");
const Question = require("../models/Question");
const Submission = require("../models/Submission");

// CREATE EXAM
exports.createExam = async (req, res) => {
  try {
    let { name, examCode, level, duration, startTime, endTime } = req.body;

    // validation
    if (!name || !examCode || !level || !duration) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (duration <= 0) {
      setErrorMessage("Duration must be greater than 0");
      return;
    }
    // normalize input
    name = name.trim().toLowerCase();
    examCode = examCode.trim().toLowerCase();
    level = level.trim().toLowerCase();

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
      duration,
      startTime,
      endTime,
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

      // ⏰ TIME VALIDATION
    const now = new Date();

    if (exam.startTime && now < new Date(exam.startTime)) {
      return res.status(403).json({
        message: "Exam has not started yet",
      });
    }

    if (exam.endTime && now > new Date(exam.endTime)) {
      return res.status(403).json({
        message: "Exam has ended",
      });
    }

    const questions = await Question.find({
      exam: exam._id,
    });

    res.json({
      exam,
      questions,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//  validation

exports.validateExam = async (req, res) => {
  try {
    const { examName, examCode } = req.body;

    const exam = await Exam.findOne({
      name: examName,
      examCode,
    });

    if (!exam) {
      return res.status(404).json({
        message: "Invalid Exam Name or Code",
      });
    }


    // ⏰ TIME VALIDATION
    const now = new Date();

    if (exam.startTime && now < new Date(exam.startTime)) {
      return res.status(403).json({
        message: "Exam has not started yet",
      });
    }

    if (exam.endTime && now > new Date(exam.endTime)) {
      return res.status(403).json({
        message: "Exam has ended",
      });
    }

    res.json({
      message: "Exam validated",
      exam,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
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
