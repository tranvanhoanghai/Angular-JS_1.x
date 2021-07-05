const Test = require("../models/Test");

exports.get = function (req, res, next) {
  // res.render('index', { title: 'Express' })
  // res.json({ name: "test" });

  // Callback
  // Text.find({}, function (err, data) {
  //   if (!err) {
  //     res.json(data);
  //   } else {
  //     next(err);
  //     // res.status(400).json({ err: "err" });
  //   }
  // });

  // Promise
  Test.find({})
    .then((data) => res.json(data))
    .catch(next);
};

exports.getById = function (req, res, next) {
  const id = req.params.id;
  Test.findById(id)
    .then((data) => res.json(data))
    .catch(next);
};

exports.add = function (req, res, next) {
  console.log("aaaaaaaaaaaaaaaa", req.body);
  const test = new Test(req.body);
  test
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
