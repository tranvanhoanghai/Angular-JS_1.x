const Contact = require("../models/Contact");

exports.getListContacts = function (req, res, next) {
  Contact.find({})
    .sort({ createdAt: -1 })
    .then((data) => res.json(data))
    .catch(next);
};

exports.getListContactsAssign = function (req, res, next) {
  const name = req.params.name;

  Contact.find({ assignedTo: name })
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

  Contact.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete with id=${id}. Maybe Tutorial was not found!`,
        });
      } else {
        res.send({
          message: "Deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete with id=" + id,
      });
    });
};

exports.deleteMultipleContact = function (req, res, next) {
  const _ids = req.body.id;
  console.log(_ids);

  Contact.deleteMany({ _id: { $in: _ids } })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete. Maybe Contact was not found!`,
        });
      } else {
        res.send({
          message: "Deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete ",
      });
    });
};
