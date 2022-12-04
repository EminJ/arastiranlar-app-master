const jwt = require("jsonwebtoken");
require('dotenv').config();
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  if (!token) {
    return res.status(403).send({ message: "Token Bulunmamaktadır!" });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Geçersiz Token!" });
    }
    req.userId = decoded.id;
    next();
  });
};


const authJwt = {
  verifyToken
};
module.exports = authJwt;
