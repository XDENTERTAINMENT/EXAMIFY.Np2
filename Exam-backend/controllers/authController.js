const userdb = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const googledb = require("../models/usergoogle");

exports.loginuser = async (req, res) => {
  try {
    const username = req.body.username?.trim().toLowerCase();
    const password = req.body.password?.trim();
    const role = req.body.role?.trim().toLowerCase();

    // validate input
    if (!username || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // check if user exists
    const user = await userdb.findOne({ username });

    if (!user) {
      return res.status(404).json({
        message: "User not found. Please sign up.",
      });
    }

    // compare password
    const ismatch = await bcrypt.compare(password, user.password);

    if (!ismatch) {
      return res.status(400).json({
        message: "Invalid username or password",
      });
    }

    // validate role
    if (user.role !== role) {
      return res.status(403).json({
        message: `You are not a ${role}`,
      });
    }

    // generate token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// signup

exports.Signup = async (req, res) => {
  try {
    const firstname = req.body.firstname?.trim();
    const lastname = req.body.lastname?.trim();
    const username = req.body.username?.trim().toLowerCase();
    const password = req.body.password?.trim();
    const role = req.body.role?.trim().toLowerCase();

    if (!firstname || !lastname || !username || !password || !role) {
   return res.status(400).json({
      message: "All fields are required"
   });
}


    // check existing username
    const existingUser = await userdb.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        message: "username already taken",
      });
    }

    // hash password
    const hashedpassword = await bcrypt.hash(password, 10);

    const userdb1 = new userdb({
      firstname,
      lastname,
      username,
      password: hashedpassword,
      role,
    });

    await userdb1.save();

    res.status(201).json({
      message: "User signed up successfully ✅",
    });
  } catch (err) {
    console.log(err);

    if (err.code === 11000) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }

    res.status(500).json({
      message: "server error",
    });
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
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token, user });
  } catch (err) {
    res.status(401).json({ message: "Google login failed" });
  }
};
