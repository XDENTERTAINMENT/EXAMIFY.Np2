const Question = require("../models/Question.js");

// ➕ CREATE QUESTION
exports.createQuestion = async (req, res) => {
    try {
        const { exam, questionText, options, correctAnswer, marks } = req.body;

        console.log(req.body);

        const question = new Question({
            exam,
            questionText,
            options,
            correctAnswer,
            marks
        });

        if (!options || options.length < 4) {
            return res.status(400).json({
                message: " 4 options required"
            });
        }
        await question.save();

        res.status(201).json({
            success: true,
            message: "Question created successfully",
            question
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message || "Server error"
        });
    }
};


// 📥 GET QUESTIONS BY EXAM
exports.getQuestionsByExam = async (req, res) => {
    try {
        const { examId } = req.params;

        const questions = await Question.find({ exam: examId });

        res.status(200).json({
            success: true,
            data: questions   // ✅ FIXED (was "message")
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message || "Server error"
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
            message: err.message || "Server error"
        });
    }
};