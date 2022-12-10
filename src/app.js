const express = require("express");
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 
  }
  app.use(cors(corsOptions)); 
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    secure: true,
    cookie: { secure: true }
    }));

app.get('/', (req,res)=>{
    const token = req.session ? null : "null";
    res.send(token);
})

require("./routes/auth.routes")(app);
require("./routes/post.routes")(app);
require("./routes/user.routes")(app);
module.exports = app;
