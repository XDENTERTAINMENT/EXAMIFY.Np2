const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



const loginuser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // check if user exist
        const user = await User.findOne({ username });
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


}

module.exports = loginuser;