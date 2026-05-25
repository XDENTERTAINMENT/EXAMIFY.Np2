const express = require("express");
const router = express.Router();
const answerController = require("../controllers/answerController");
const protect = require("../middleware/authmiddleware");

router.post("/save-answer", answerController.saveAnswer);

router.post("/submit-exam", answerController.submitExam);

router.get(
  "/student/recent-activities/:studentId",
  answerController.getRecentActivities,
);

router.get(
  "/teacher/dashboard/:teacherId",
  protect,
  answerController.getTeacherDashboard,
);

router.get(
  "/teacher/analytics/:teacherId",
  answerController.getTeacherAnalytics,
);

module.exports = router;
