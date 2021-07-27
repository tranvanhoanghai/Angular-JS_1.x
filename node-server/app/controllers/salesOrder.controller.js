const SalesOrder = require("../models/SalesOrder");

exports.getListSalesOrders = function (req, res, next) {
  SalesOrder.find({})
    .sort({ createdAt: -1 })
    .then((data) => res.json(data))
    .catch(next);
};

exports.getListSalesOrdersAssign = function (req, res, next) {
  const name = req.params.name;
  SalesOrder.find({ assignedTo: name })
    .sort({ createdAt: -1 })
    .then((data) => res.json(data))
    .catch(next);
};

exports.detailSalesOrder = function (req, res, next) {
  const id = req.params.id;
  SalesOrder.findById(id)
    .then((data) => res.json(data))
    .catch(next);
};

exports.createdSalesOrder = function (req, res, next) {
  const salesOrder = new SalesOrder(req.body);
  salesOrder
    .save()
    .then((data) => res.send(data))
    .catch(next);
};

exports.updateSalesOrder = function (req, res, next) {
  const id = req.params.id;
  SalesOrder.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      } else res.send({ message: "Tutorial was updated successfully." });
    })
    .catch(next);
};

exports.deleteSalesOrder = function (req, res, next) {
  const id = req.params.id;
  SalesOrder.findByIdAndRemove(id)
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
