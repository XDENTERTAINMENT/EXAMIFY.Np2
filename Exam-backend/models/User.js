const mongoose = require("mongoose");

const UserSchema =  new mongoose.Schema(  {
    firstname: String,

    lastname: String,

    username: {
      type: String,
      unique: true,
    },

    password: String,

   
    role: {
      type: String,
      enum: ["teacher", "student"],
      required: true,
    },
  },
  { timestamps: true }
);

const submission = mongoose.model("User", UserSchema);

module.exports= submission;