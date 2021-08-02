const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.getListUsers = function (req, res, next) {
  User.find({})
    .then((data) => res.json(data))
    .catch(next);
};

exports.getListUsersActive = function (req, res, next) {
  User.find({ isActive: { $ne: "false" } })
    .then((data) => res.json(data))
    .catch(next);
};

exports.getListExceptUsers = function (req, res, next) {
  const id = req.params.id;
  User.find({ _id: { $ne: id } })
    .then((data) => res.json(data))
    .catch(next);
};

exports.detailUser = function (req, res, next) {
  const id = req.params.id;
  User.findById(id)
    .then((data) => res.json(data))
    .catch((err) => res.send(err));
};

exports.createUser = function (req, res, next) {
  User.findOne({ username: req.body.username }).then((data) => {
    if (data) {
      res.status(500).send({
        message: "username or email is exist",
      });
      return false;
    } else {
      const user = new User(req.body);
      const salt = bcrypt.genSaltSync(10);
      user.password = bcrypt.hashSync(user.password, salt);

      user
        .save()
        .then((data) => res.send(data))
        .catch((err) => {
          res.status(500).send({
            message: "Can't create user  ",
          });
        });
    }
  });
};

exports.updateUser = function (req, res, next) {
  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update with id=${id}. Maybe User was not found!`,
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch((err) => res.send(err));
};

exports.deleteUser = function (req, res, next) {
  const id = req.params.id;
  console.log(req);
  User.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      } else {
        res.send({
          message: "Tutorial was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id,
      });
    });
};
