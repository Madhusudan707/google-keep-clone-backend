const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  uid:String,
  email:String,
},{timestamps: true});

const User = mongoose.model("User",UserSchema)
module.exports = {User}


