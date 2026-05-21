const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController.js");



console.log("✅ Question route loaded");

// ➕ Create question
router.post("/", questionController.createQuestion);


// ❌ Delete question
router.delete("/:questionId", questionController.deleteQuestion);

module.exports = router;