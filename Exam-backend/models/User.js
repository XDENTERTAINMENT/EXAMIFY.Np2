const mongoose = require("mongoose");

const UserSchema =  new mongoose.Schema( {
    FirstName: String,
    LastName: String,
    UserName: String,
    Password: String,
   
},{timestamps:true});

const submission = mongoose.model("User", UserSchema);

module.exports= submission;