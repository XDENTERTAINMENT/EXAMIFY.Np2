const express = require("express");
const router = express.Router();
const userdb  = require("../models/User");
const bcrypt = require("bcryptjs");


router.post("/signup", async (req,res) => 
   {
        
        try {
        const { FirstName, LastName, UserName,  Password} = req.body;
      console.log(req.body);
    // 1. check password match
    if (!Password) {
      return res.status(400).json({ message: "Password is missing" });
      
    }

  

    // 2. check if username exists
    const existingUser = await userdb.findOne({ UserName});
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }
  
    // 3. hash password
    const hashedPassword = await bcrypt.hash(Password, 10);

     const userdb1 = new userdb({
       FirstName,
      LastName,
      UserName,
      Password: hashedPassword,
    });
      await userdb1.save();
       res.json({message:"User signed up successfully ✅"});
        console.log("data stored")

   } catch(err){
    console.log(err)
   }

});

module.exports =router;