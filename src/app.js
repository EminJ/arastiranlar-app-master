const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
var whitelist = ['https://loose-luminosity.vercel.app','76.76.21.164']
var corsOptions = {
     origin: (origin, callback) => {
          if (whitelist.indexOf(origin) !== -1)
               callback(null, true);
          else
               callback(new Error("! ! !"));
     }
}
app.use(bodyParser.json());
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    secure: true,
    cookie: { secure: true }
    }));

app.get('/',cors(corsOptions), (req,res)=>{
    res.send('s..s');
})

require("./routes/auth.routes")(app);
require("./routes/post.routes")(app);
require("./routes/user.routes")(app);
module.exports = app;
