const Submission = require("../models/Submission");
const Exam = require("../models/Exam");
const Question = require("../models/Question");


exports.saveAnswer = async (req, res) => {
  try {
    const { student, exam, questionId, selectedOption } = req.body;

    let submission = await Submission.findOne({
      student,
      exam,
    });

    console.log("BODY:", req.body);

    if (!student || !exam || !questionId) {
      return res.status(400).json({
        success: false,
        message: "Missing fields",
      });
    }

    // Create submission if not existing
    if (!submission) {
      submission = await Submission.create({
        student,
        exam,
        answers: [],
        totalQuestions: 0,
        status: "pending",
      });
    }

    // Check if answer already exists
    const existingAnswer = submission.answers.find(
      (ans) =>
        ans.questionId && ans.questionId.toString() === questionId.toString(),
    );

    if (existingAnswer) {
      // Update existing answer
      existingAnswer.selectedOption = selectedOption;
    } else {
      // Add new answer
      submission.answers.push({
        questionId,
        selectedOption,
      });
    }

    await submission.save();

    res.status(200).json({
      success: true,
      message: "Answer saved successfully",
      submission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// submit controller
exports.submitExam = async (req, res) => {
  try {
    const { studentId, examId } = req.body;

    const submission = await Submission.findOne({
      student: studentId,
      exam: examId,
    });

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Submission not found",
      });
    }

    let score = 0;

    for (const answer of submission.answers) {
      const question = await Question.findById(answer.questionId);

      if (question && answer.selectedOption === question.correctAnswer) {
        score++;
      }
    }

    const totalQuestions = submission.answers.length;

    const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;

    const resultStatus = percentage >= 50 ? "Passed" : "Failed";

    submission.score = score;
    submission.totalQuestions = totalQuestions;
    submission.percentage = percentage;
    submission.resultStatus = resultStatus;
    submission.status = "Completed";

    await submission.save();

    res.status(200).json({
      success: true,
      score,
      percentage,
      resultStatus,
      totalQuestions,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// recent activities
exports.getRecentActivities = async (req, res) => {
  try {
    const activities = await Submission.find({
      student: req.params.studentId,
    })
      .populate("exam", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    const formattedActivities = activities.map((activity) => {
      const now = new Date();
      const created = new Date(activity.createdAt);

      const diffMs = now - created;

      const minutes = Math.floor(diffMs / 60000);
      const hours = Math.floor(minutes / 60);

      let timeAgo = "";

      if (hours > 0) {
        timeAgo = `${hours} hour(s) ago`;
      } else {
        timeAgo = `${minutes} minute(s) ago`;
      }

      return {
        examName: activity.exam.name,
        status: activity.status,
        timeAgo,
      };
    });

    res.json(formattedActivities);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// teacher fetch

exports.getTeacherDashboard = async (req, res) => {
  try {
    const exams = await Exam.find({
      teacher: req.user.id,
    });

    const dashboardData = await Promise.all(
      exams.map(async (exam) => {
        const totalSubmitted = await Submission.countDocuments({
          exam: exam._id,
        });

        return {
          examName: exam.name,
          studentsSubmitted: totalSubmitted,
          status: exam.status || "Completed",
        };
      })
    );

    res.json(dashboardData);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// teacher analytic

exports.getTeacherAnalytics = async (req, res) => {
  try {
    const exams = await Exam.find({
      teacher: req.params.teacherId,
    });

    const result = await Promise.all(
      exams.map(async (exam) => {
        const studentsSubmitted = await Submission.countDocuments({
          exam: exam._id,
        });

        return {
          examName: exam.name,
          studentsSubmitted,
          status: "Completed",
          duration: "60 mins",
          createdAt: exam.createdAt,
        };
      }),
    );

    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
