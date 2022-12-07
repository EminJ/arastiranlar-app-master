const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;
const db = {};

db.user = require("./user.model");
db.post = require("./post.model");
mongoose.set('strictQuery', true);

mongoose
.connect(`${process.env.DB}`, {
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
