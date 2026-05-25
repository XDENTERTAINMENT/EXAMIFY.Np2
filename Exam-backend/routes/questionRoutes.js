const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController.js");
const protect = require("../middleware/authmiddleware");



console.log("✅ Question route loaded");

// ➕ Create question
router.post("/", protect, questionController.createQuestion);


// ❌ Delete question
router.delete("/:questionId", questionController.deleteQuestion);

module.exports = router;