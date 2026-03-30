const mongoose = require("mongoose");

const UserSchema =  new mongoose.Schema( {
    firstname: String,
    lastname: String,
    username: String,
    password: String,
   
},{timestamps:true});

const submission = mongoose.model("User", UserSchema);

module.exports= submission;