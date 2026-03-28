  const express = require("express");
  const mongoose = require("mongoose");
  const cors  = require("cors");
  const submissionRoute = require("./routes/submissionRoutes");
   require('dotenv').config();
   const userRoute = require("./routes/authRoutes");
   



  const app = express();

//  middleware

app.use(cors());
app.use(express.json());


// test route
app.get("/",(req,res) => {
    res.send("Backend is working 🚀");
});
//  my model route
app.use("/api", submissionRoute);
app.use("/api", userRoute);


// connect DB 


mongoose.connect(process.env.MONGO_URI)
.then(() =>{
    console.log("DB connected ✅")
    app.listen(3000, ()=>{
        console.log("server running on port 3000");
    });
})
.catch(err => console.log(err));
