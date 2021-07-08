const User = require("../models/User");
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

const key = require("../../config/auth.config");

exports.login = function (req, res, next) {
  // User.find({})
  //   .then((data) => res.json(data))
  //   .catch(next);
  // res.send("respond with a login");
  console.log(key.JWT_SECRET);
  User.findOne({ username: req.body.username, password: req.body.password })
    .then((user) => {
      if (user) {
        res.json({
          type: false,
          data: "User already exists!",
        });
      } else {
        res.json({
          type: false,
          data: "Not find",
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

exports.logout = function (req, res, next) {};
