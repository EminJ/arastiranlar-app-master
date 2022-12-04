const mongoose = require('mongoose');
const dbConfig = require("../config/db.config");
mongoose.Promise = global.Promise;

const db = {};

db.user = require("./user.model");
db.post = require("./post.model");

mongoose
.connect(`${dbConfig.HOST}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Successfully connect to MongoDB.");
})
.catch(err => {
  console.error("Connection error", err);
  process.exit();
});

module.exports = db;
