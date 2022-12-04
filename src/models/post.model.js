const mongoose = require("mongoose");

const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    post_image: {
      data:Buffer,
      contentType:String
    },
    post_author: String,
    post_title: String,
    post_explanation: String,
    post_text: String,
    post_up: Number,
    post_down: Number,
    post_comment: Array,
    post_category: Array,
    post_date: Date,
  })
);

module.exports = Post;
