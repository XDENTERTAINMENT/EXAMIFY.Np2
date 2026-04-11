const express = require("express");
const router = express.Router();
const  authcontroller = require ("../controllers/authController.js");


router.post("/signup", authcontroller.Signup  );

router.post("/google", authcontroller.googlelogin);

router.post("/login", authcontroller.loginuser);

module.exports =router;