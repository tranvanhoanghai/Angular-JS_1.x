const Contact = require("../models/Contact");

exports.getListContacts = function (req, res, next) {
  Contact.find({})
    .sort({ createdAt: -1 })
    .then((data) => res.json(data))
    .catch(next);
};

exports.detailContact = function (req, res, next) {
  const id = req.params.id;
  Contact.findById(id)
    .then((data) => res.json(data))
    .catch(next);
};

exports.createdContact = function (req, res, next) {
  const contact = new Contact(req.body);
  contact
    .save()
    .then((data) => res.send(data))
    .catch(next);
};

exports.updateContact = function (req, res, next) {
  const id = req.params.id;
  Contact.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      } else res.send({ message: "Tutorial was updated successfully." });
    })
    .catch(next);
};

exports.deleteContact = function (req, res, next) {
  const id = req.params.id;
  console.log(req);
  Contact.findByIdAndRemove(id)
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
