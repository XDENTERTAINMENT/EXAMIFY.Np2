
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const submissionRoute = require("./routes/submissionRoutes");
const userRoute = require("./routes/authRoutes");
const question = require("./routes/questionRoutes");
const authRoutes = require("./routes/authRoutes");



console.log("🔥 HIT server");   // 👈 ADD THIS

const app = express();

//  middleware



app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://examify-np2-7u27.vercel.app", ],

  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());




// test route
app.get("/", (req, res) => {
  res.send("Backend is working 🚀");
});
//  my model route
app.use("/api", submissionRoute);
app.use("/api", userRoute);
app.use("/api/questions", question);
app.use("/api/auth", authRoutes);




// my controller route



// connect DB 

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB connected ✅")
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`)
    });
  })
  .catch(err => console.log(err));
