const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

exports.authenticate = function (req, res, next) {
  User.findOne({ username: req.body.username, password: req.body.password })
    .then((user) => {
      if (user) {
        res.json({
          type: true,
          data: user,
          token: key.JWT_SECRET,
        });
      } else {
        res.json({
          type: false,
          data: "Incorrect email/password",
        });
      }
    })
    .catch((err) => {
      if (err) {
        res.json({
          type: false,
          data: "Error occured: " + err,
        });
      }
    });
};

exports.login = function (req, res, next) {
  User.findOne({ username: req.body.username, password: req.body.password })
    .then((user) => {
      if (user) {
        res.json({
          type: true,
          data: user,
          token: jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: 604800, // 1 week
          }),
        });
      } else {
        res.json({
          type: false,
          data: "Incorrect email/password",
        });
      }
    })
    .catch((err) => {
      if (err) {
        res.json({
          type: false,
          data: "Error occured: " + err,
        });
      }
    });
};

exports.verifyToken = function (req, res, next) {
  var bearerToken;
  var bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    var bearer = bearerHeader.split(" ");
    bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
};

exports.logout = function (req, res, next) {
  const refreshToken = req.body.token;
  refreshTokens = refreshTokens.filter((refToken) => refToken !== refreshToken);
  res.sendStatus(200);
};
