require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./routes/authRoutes");
const questionRoutes = require("./routes/questionRoutes");
const authRoutes = require("./routes/authRoutes");
const examRoutes = require("./routes/examRoutes");
const morgan = require("morgan");
const answerRoutes = require("./routes/answerRoutes.js");

console.log("🔥 HIT server"); // 👈 ADD THIS

const app = express();

//  middleware

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://examify-np2.vercel.app",
      "https://examifyedu.com",
      "https://www.examifyedu.com",
    ],

    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

app.use(express.json());
app.use(morgan("dev"));

// test route
app.get("/", (req, res) => {
  res.send("Backend is working 🚀");
});
//  my model route
app.use("/api", userRoute);
app.use("/api/questions", questionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/exam", examRoutes);
app.use("/api/answers", answerRoutes);

// my controller route

// connect DB

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB connected ✅");
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
