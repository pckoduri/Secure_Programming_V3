const mongoose = require("mongoose");
const user = new mongoose.Schema({
  username: String,
  password: String,
  email: String, 
  role: String,
  date: Date,
});

module.exports = mongoose.model("User", user);
