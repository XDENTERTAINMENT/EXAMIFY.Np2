const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController.js");



console.log("✅ Question route loaded");

// ➕ Create question
router.post("/", questionController.createQuestion);

// 📥 Get questions by exam
router.get("/exam/:examId", questionController.getQuestionsByExam);

// ❌ Delete question
router.delete("/:questionId", questionController.deleteQuestion);

module.exports = router;