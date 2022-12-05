const mongoose = require("mongoose");

const file = new mongoose.Schema({
    filename: String,
    path: String,
    groupId: String,
    owner: String,
});

module.exports = mongoose.model("Files", file);
