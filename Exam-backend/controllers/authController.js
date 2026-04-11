const userdb = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client }= require ("google-auth-library");
const googledb = require("../models/usergoogle");





exports.loginuser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // check if user exist
        const user = await userdb.findOne({ username });
        console.log(user);
        if (!user) {
            return res.status(404).json({
                message: "User not found. please sign up.",
            });
        }

        // compare password

        const ismatch = await bcrypt.compare(password, user.password);

        if (!ismatch) {
            return res.status(400).json({
                message: "Invalid username or password",
            });
        }

        // Generate token (optional but recommended)
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }


        );

        console.log("JWT_SECRET:", process.env.JWT_SECRET);


        //    success response

        res.status(200).json({
            message: "login successful",
            token,
            user: {
                id: user._id,
                username: user.username
            },

        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "server error",
        });
    }


};

exports.Signup = async (req, res) => {

    try {
        const { firstname, lastname, username, password } = req.body;
        console.log(req.body);
        // 1. check password match
        if (!password) {
            return res.status(400).json({ message: "password is missing" });

        }



        // 2. check if username exists
        const existingUser = await userdb.findOne({ username });
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
        res.json({ message: "User signed up successfully ✅" });
        console.log("data stored")

    } catch (err) {
        console.log(err)
    }

};


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googlelogin = async (req, res) => {


    const { credential } = req.body;

    try {


        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { email, name, picture } = payload;

        let user = await googledb.findOne({ email });

        if (!user) {
            user = await googledb.create({
                email,
                username: name,
                avatar: picture,
            });
        }
        const token = jwt.sign(
            { id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.json({ token, user });
    }

    catch (err) {
        res.status(401).json({ message: "Google login failed" })
    }

};
