const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

// exports.refreshToken = function (req, res, next) {
//   const refreshToken = req.body.token;
//   if (!refreshToken) res.sendStatus(401);
//   if (!refreshTokens.includes(refreshToken)) res.sendStatus(403);

//   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
//     console.log(err, data);
//     if (err) res.sendStatus(403);
//     const accessToken = jwt.sign(
//       { username: data.username },
//       process.env.ACCESS_TOKEN_SECRET,
//       {
//         expiresIn: 60,
//       }
//     );
//     res.json({ accessToken });
//   });
// };

exports.login = function (req, res, next) {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user.isActive == "true") {
        const validPassword = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        if (validPassword) {
          let refreshToken = jwt.sign(
            user.toJSON(),
            process.env.REFRESH_TOKEN_SECRET
          );

          if (!user.refreshToken) {
            // Nếu user này chưa có refresh token thì lưu refresh token đó vào database
            const id = user._id;
            const updateRefreshToken = {
              refreshToken: refreshToken,
            };

            User.findByIdAndUpdate(id, updateRefreshToken).then(
              console.log(user.refreshToken)
            );
          } else {
            // Nếu user này đã có refresh token thì lấy refresh token đó từ database
            refreshToken = user.refreshToken;
            // console.log("ok");
          }

          res.json({
            type: true,
            user: user,
            message: "Login Successfully",
            token: jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, {
              expiresIn: 60 * 60 * 24, // (60 * 60 * 24 * 7) 1 week
            }),

            refreshToken: refreshToken,
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
        message: err,
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
              message: "Incorrect old password",
            });
          });
      } else {
        res.status(500).send({
          message: "Incorrect old password",
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
  const bearerHeader = req.headers["authorization"];
  // console.log("bearerHeader", bearerHeader);
  if (typeof bearerHeader !== "undefined") {
    const token = bearerHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
      if (err) {
        res.sendStatus(401);
      }
      next();
    });
  } else {
    res.sendStatus(403);
  }
};
