const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();

const app = express();
app.use(
     cors({
          origin: "*",
     })
);
app.use(bodyParser.json());
app.use(bodyParser.json({
     limit: '10mb'
}));
app.use(bodyParser.urlencoded({
     limit: '10mb',
     extended: true
}));
app.use(session({
     secret: process.env.SECRET,
     resave: false,
     saveUninitialized: true,
     secure: true,
     cookie: {
          secure: true
     }
}));
app.get('/', (req, res) => {
     res.send('s..s');
})

require("./routes/auth.routes")(app);
require("./routes/post.routes")(app);
require("./routes/user.routes")(app);
module.exports = app;