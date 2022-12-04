require('dotenv').config();
const db = require("../models");
const User = db.user;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


exports.signup = (req, res) => {
  if(req.body.username=="" || req.body.name=="" || req.body.surname=="" || req.body.email=="" || req.body.password==""){
    res.status(404).send({ message: "Eksik Veri Girişi Sağlandı!" });
    return
  }

  if(req.body.username.length<4){
    res.status(404).send({ message: "Kullancı Adı En Az 4 Harf Olmalıdır!"});
    return
  }

  if(req.body.name.length<3){
    res.status(404).send({ message: "Ad Girişi En Az 3 Harf Olmalıdır."});
    return
  }

  if(req.body.surname.length<2){
    res.status(404).send({ message: "Soy Ad Girişi En Az 2 Harf Olmalıdır."});
    return
  }

  if (!validateEmail(req.body.email)) {
    res.status(404).send({ message: "Hatalı E-Posta Girişi, Lütfen Kontrol Ediniz!"});
    return
  }
  const input = req.body.password;
  var errorlist = [];
  if (input) {
    if (input.length < 6) {
      errorlist.push("*Şifreniz en az 6 karakter olmalıdır.");
    }
    if (input.search(/[a-z]/) < 0) {
      errorlist.push("*Şifreniz en az bir küçük harf içermelidir.");
    }
    if (input.search(/[A-Z]/) < 0) {
      errorlist.push("*Şifreniz en az bir büyük harf içermelidir.");
    }
    if (input.search(/[0-9]/) < 0) {
      errorlist.push("*Şifreniz en az bir rakam içermelidir.");
    }
    if (input.search(" ") > 0) {
      errorlist.push("*Şifreniz de boşluk karakteri bulunmakta.");
    }
    if (errorlist.length > 0) {
      res.status(404).send({ message: errorlist});
      return;
    }
  }
  const user = new User({
    username: req.body.username,
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    roles: '635eb25438b20b702d8adfc6' //geliştirilebilir...
  });
  
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    gettoken(res,user._id);
  });
};

exports.signin = (req, res) => {
  if(req.body.email==''||req.body.password==''){
    res.status(500).send({ message: "Eksik Veri Girişi Sağlandı!"});
    return;
  }
  User.findOne({
    email: req.body.email,
  })
    .exec((err, email) => {
      if (err) {
        res.status(404).send({ message: "Giriş Sağlanamadı, Bir Hata Oldu!"});
        return;
      }

      try {
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          email.password
        );
        if(!passwordIsValid){
          return res.status(404).send({ message: "Yanlış E-Posta veya Şifre Girişi Yapıldı!" });
        }
      } catch (error) {
        return res.status(404).send({ message: "Yanlış E-Posta veya Şifre Girişi Yapıldı!" });
      }
      gettoken(res,email.id);
    });
};

exports.signout = async (req, res) => {
  try {
    req.cookie = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};


const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

function gettoken(res,id_) {
  var token = jwt.sign({ id: id_ }, process.env.SECRET, {
    expiresIn: '360d',
  });
  return res.cookie("session_security", token,{
  maxAge: 86400 * 1000, // 24 Gün
  httpOnly: true,
  secure: true
}).status(200).send(token)//req.cookies
}