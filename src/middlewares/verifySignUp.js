const db = require("../models");
const User = db.user;
checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Hata! Bu Kullanıcı Adı Zaten Kullanımda." });
      return;
    }

    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Hata! Bu E-Posta Zaten Kullanımda." });
        return;
      }
      next();
    });
  });
};


const verifySignUp = {
  checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;
