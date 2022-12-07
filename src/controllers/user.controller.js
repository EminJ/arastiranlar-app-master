const jwt = require("jsonwebtoken");
require('dotenv').config();
const db = require("../models");
var bcrypt = require("bcryptjs");
const User = db.user;
const Post = db.post;

exports.userBoard = (req, res) => {
  const token = req.body.token;
  if (!token) {
    return res.status(200).send({
      message: "Token Bulunmamaktadır!"
    });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(200).send({
        message: "Geçersiz Token!"
      });
    }

    User.findOne({
      _id: decoded.id
    }, function (err, info) {
      if(!info._id){
       return  res.status(200).send({message:0});
      }
      return res.status(200).send({
        info: {
          id: info._id,
          username: info.username,
          name: info.name,
          surname: info.surname,
          email: info.email,
          roles: getroles(info)
        }
      });
    });
  });
};

exports.userBoardAdmin = (req, res) => {
  const token = req.body.token;
  if (!token) {
    return res.status(403).send({
      message: "Token Bulunmamaktadır!"
    });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Geçersiz Token!"
      });
    }

    User.findOne({
      _id: decoded.id
    }, function (err, info) {
      if (info.roles == '635eb25438b20b702d8adfc9' || info.roles == '635eb25438b20b702d8adfc8') {
        User.find().exec(function (err, user) {
          return res.status(200).send({
            users: user
          });
        });
      } else return res.status(403).send({
        message: "Token Yetkisi Bulunmamaktadır!"
      });
    });
  });
};

exports.deleteuser = (req, res) => {
  const tokenadmin = req.body.tokenadmin;
  const token = req.body.token;
  if (!tokenadmin) {
    return res.status(403).send({
      message: "Token Bulunmamaktadır!"
    });
  }

  jwt.verify(tokenadmin, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Geçersiz Token!"
      });
    }

    User.findOne({
      _id: decoded.id
    }, function (err, info) {
      if (info.roles == '635eb25438b20b702d8adfc9' || info.roles == '635eb25438b20b702d8adfc8') {
        User.find({ _id:token }).remove().exec();
        return res.status(200).send({ message: "ok" })
      }
      else{
        return res.status(403).send({ message: "no" })
      }
    });
  });
}

exports.updateuser = (req, res) => {
  const tokenadmin = req.body.tokenadmin;
  const token = req.body.token;
  const select = req.body.select;
  if (!tokenadmin) {
    return res.status(403).send({
      message: "Token Bulunmamaktadır!"
    });
  }

  jwt.verify(tokenadmin, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Geçersiz Token!"
      });
    }

    User.findOne({
      _id: decoded.id
    }, function (err, info) {
      if (info.roles == '635eb25438b20b702d8adfc9' || info.roles == '635eb25438b20b702d8adfc8') {
        if (select == 1) {
          User.findByIdAndUpdate(token, {
              roles: '635eb25438b20b702d8adfc9',
            },
            function (err, docs) {
              if (err) {
                return res.status(500).send(err);
              } else {
                return res.status(200).send({
                  message: "Kayıt Başarılı. 👍"
                });
              }
            });
        }
        if (select == 2) {
          User.findByIdAndUpdate(token, {
              roles: '635eb25438b20b702d8adfc8',
            },
            function (err, docs) {
              if (err) {
                return res.status(500).send(err);
              } else {
                return res.status(200).send({
                  message: "Kayıt Başarılı. 👍"
                });
              }
            });
        }
        if (select == 3) {
          User.findByIdAndUpdate(token, {
              roles: '635eb25438b20b702d8adfc7',
            },
            function (err, docs) {
              if (err) {
                return res.status(500).send(err);
              } else {
                return res.status(200).send({
                  message: "Kayıt Başarılı. 👍"
                });
              }
            });
        }
        if (select == 4) {
          User.findByIdAndUpdate(token, {
              roles: '635eb25438b20b702d8adfc6',
            },
            function (err, docs) {
              if (err) {
                return res.status(500).send(err);
              } else {
                return res.status(200).send({
                  message: "Kayıt Başarılı. 👍"
                });
              }
            });
        }
      } else {
        return res.status(403).send({
          message: "Token Yetkisi Bulunmamaktadır!"
        });
      }
    });
  });
};

exports.userlike = (req, res) => {
  const token = req.body.token;
  if (!token) {
    return res.status(403).send({
      message: "Token Bulunmamaktadır!"
    });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Geçersiz Token!"
      });
    }

    User.findOne({
      _id: decoded.id
    }, function (err, info) {

      res.status(200).send({
        'like': info.postlike,
        'dislike': info.postdislike,
        'save': info.postsave,
        'comments': info.postcomments
      })
    });
  });
};

function getroles(user) {
  if (user.roles == '635eb25438b20b702d8adfc9') {
    return 'Admin';
  }
  if (user.roles == '635eb25438b20b702d8adfc8') {
    return 'Moderator';
  }
  if (user.roles == '635eb25438b20b702d8adfc7') {
    return 'Yazar';
  }
  if (user.roles == '635eb25438b20b702d8adfc6') {
    return 'Okur';
  }
  return;
}

exports.veriablecount = (req, res) => {
  Post.find().exec(function (err, post) {
    User.find().exec(function (err, user) {
      return res.status(200).send({
        user: user.length,
        post: post.length
      });
    });
  });
}

exports.changeuser = (req, res) => {
  //kontrolleri iki dosya içinde func ile çekebilirsin..
  let new_username, new_name, new_surname, new_email, new_password;
  const token = req.body.token;
  if (!token) {
    return res.status(403).send({
      message: "Token Bulunmamaktadır!"
    });
  }
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Geçersiz Token!"
      });
    }

    User.findOne({
      _id: decoded.id
    }, function (err, info) {
      try {
        if (req.body.c_email == '' && req.body.c_name == '' && req.body.c_surname == '' && req.body.c_username == '' && req.body.c_password == '') {
          return res.status(404).send({
            message: "Eksik Veri Girişi"
          });
        }
        if (req.body.sec_password == '') {
          return res.status(404).send({
            message: "Şifre Girişi Yapılmadı!"
          });
        }
        var passwordIsValid = bcrypt.compareSync(
          req.body.sec_password,
          info.password
        );
        if (!passwordIsValid) {
          return res.status(404).send({
            message: "Yanlış Şifre Girişi Yapıldı!"
          });
        }
      } catch (error) {
        return res.status(404).send({
          message: "Şifre Girişi Yapılmadı!"
        });
      }
      if (req.body.c_username) {
        if (req.body.c_username.length < 4) {
          res.status(404).send({
            message: "Kullancı Adı En Az 4 Harf Olmalıdır!"
          });
          return
        }
        new_username = req.body.c_username;
      }
      if (req.body.c_name) {
        if (req.body.c_name.length <= 3) {
          res.status(404).send({
            message: "Ad Girişi En Az 3 Harf Olmalıdır."
          });
          return
        }
        new_name = req.body.c_name;
      }
      if (req.body.c_surname) {
        if (req.body.c_surname.length <= 2) {
          res.status(404).send({
            message: "Soy Ad Girişi En Az 2 Harf Olmalıdır."
          });
          return
        }
        new_surname = req.body.c_surname;
      }
      if (req.body.c_email) {
        if (!validateEmail(req.body.c_email)) {
          res.status(404).send({
            message: "Hatalı E-Posta Girişi, Lütfen Kontrol Ediniz!"
          });
          return
        }
        new_email = req.body.c_email;
      }
      if (req.body.c_password) {
        const input = req.body.c_password;
        var errorlist = [];
        if (req.body.c_password != req.body.c_password2) {
          return res.status(404).send({
            message: "Tekrar Eden Şifreler Uyuşmuyor!"
          });
        }
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
            res.status(404).send({
              message: errorlist
            });
            return;
          }
        }
        new_password = bcrypt.hashSync(req.body.c_password, 8);
      }
      User.findByIdAndUpdate(decoded.id, {
          username: new_username,
          name: new_name,
          surname: new_surname,
          email: new_email,
          password: new_password
        },
        function (err, docs) {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(200).send({
              message: "Kayıt Başarılı. 👍"
            });
          }
        });
    });
  });
};

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};