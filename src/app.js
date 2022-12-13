const express = require("express");
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();

const app = express();
app.use(function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();
   });
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