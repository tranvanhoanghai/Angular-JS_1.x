const User = require("../models/User");

exports.getAllUser = function (req, res, next) {
  User.find({})
    .then((data) => res.json(data))
    .catch(next);
};

exports.getById = function (req, res, next) {
  const id = req.params.id;
  User.findById(id)
    .then((data) => res.json(data))
    .catch(next);
};

exports.add = function (req, res, next) {
  console.log(req);
  const user = new User(req.body);
  user
    .save()
    .then((data) => res.send(data))
    .catch(next);
};

exports.update = function (req, res, next) {
  const id = req.params.id;
  Test.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      } else res.send({ message: "Tutorial was updated successfully." });
    })
    .catch(next);
};

exports.delete = function (req, res, next) {
  const id = req.params.id;
  console.log(req);
  Test.findByIdAndRemove(id)
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
