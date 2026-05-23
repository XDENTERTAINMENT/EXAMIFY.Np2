const express = require("express");
const router = express.Router();
const examController = require("../controllers/examController");
const protect = require("../middleware/authmiddleware");

// CREATE EXAM
router.post("/", protect, examController.createExam);

// FETCH ALL EXAMS
router.get("/", examController.getAllExams);

// GET QUESTIONS BY EXAM CODE
router.get("/:examCode", examController.getQuestionsByExam);

router.post("/verify-results", examController.verifyResults);

module.exports = router;
