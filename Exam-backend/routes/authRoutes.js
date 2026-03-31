const express = require("express");
const router = express.Router();
const userdb  = require("../models/User");
const bcrypt = require("bcryptjs");


router.post("/signup", async (req,res) => 
   {
        
        try {
        const { firstname, lastname, username,  password} = req.body;
      console.log(req.body);
    // 1. check password match
    if (!password) {
      return res.status(400).json({ message: "password is missing" });
      
    }

  

    // 2. check if username exists
    const existingUser = await userdb.findOne({ username});
    if (existingUser) {
      return res.status(400).json({ message: "username already taken" });
    }
  
    // 3. hash password
    const hashedpassword = await bcrypt.hash(password, 10);
     console.log("Incoming signup:", req.body);
     
     const userdb1 = new userdb({
       firstname,
      lastname,
      username,
      password: hashedpassword,
    });
      await userdb1.save();
       res.json({message:"User signed up successfully ✅"});
        console.log("data stored")

   } catch(err){
    console.log(err)
   }

});

module.exports =router;