const mongoose = require("mongoose");

const Document = new mongoose.Schema({
    filename: String,
    download: String,
    description: String,
    type: String,
    title: String,
    owner: String,
})

const group = new mongoose.Schema({
    title: String,
    description: String,
    admin: String,
    documents: [Document],
    members: [{type:String}],
});

module.exports = mongoose.model("Group", group);
