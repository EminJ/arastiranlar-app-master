const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    avatar: {
      data: Buffer,
      contentType: String,
    },
    username: String,
    name: String,
    surname: String,
    email: String,
    password: String,
    postlike:Array,
    postdislike:Array,
    postcomments:Array,
    postsave:Array,
    roles: String
  })
);

module.exports = User;
