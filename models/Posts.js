const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  message: { type: String, required: true },
  author: String,
  isPrivate: { type: Boolean, default: false },
});

module.exports = mongoose.model("Post", postSchema);
