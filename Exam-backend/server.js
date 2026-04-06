
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const submissionRoute = require("./routes/submissionRoutes");
const userRoute = require("./routes/authRoutes");
const loginuser = require("./routes/loginRoute");
const question = require("./routes/questionRoutes")


console.log("🔥 HIT server");   // 👈 ADD THIS

const app = express();

//  middleware



app.use(cors({
  origin: "*",
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
app.use("/api/questions", question)



// my controller route

app.use("/api", loginuser);

// connect DB 

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB connected ✅")
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`)
    });
  })
  .catch(err => console.log(err));
