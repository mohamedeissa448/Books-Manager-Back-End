const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  User_Name: String,
  User_Password: String,
  User_Mobile: String,
  User_Email: String
});


User = module.exports = mongoose.model("Users", userSchema);
