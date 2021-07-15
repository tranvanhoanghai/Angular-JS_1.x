const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

exports.login = function (req, res, next) {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user.isActive == "true") {
        const validPassword = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        if (validPassword) {
          res.json({
            type: true,
            user: user,
            message: "Login Successfully",
            token: jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, {
              expiresIn: 60 * 60 * 24, // 1 week
            }),
          });
        } else {
          res.status(400).send({
            message: "Incorrect username or password",
          });
        }
      } else {
        res.status(500).send({
          message: "You are not active",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error",
      });
    });
};

exports.changePassword = function (req, res, next) {
  const id = req.body.id;
  // , password: req.body.oldPass
  User.findOne({ _id: id }).then((user) => {
    if (user) {
      const validPassword = bcrypt.compareSync(req.body.oldPass, user.password);
      if (validPassword) {
        const salt = bcrypt.genSaltSync(10);

        const updatePass = {
          password: bcrypt.hashSync(req.body.newPass, salt),
        };

        User.findByIdAndUpdate(id, updatePass)
          .then((data) => {
            if (!data) {
              res.status(500).send({
                message: `Cannot change password`,
              });
            } else {
              res.json({
                message: "Change password successfully.",
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: err,
            });
          });
      }
    } else {
      res.status(500).send({
        message: "Incorrect old password",
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
