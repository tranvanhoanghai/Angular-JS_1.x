const Contact = require("../models/Contact");
const SalesOrder = require("../models/SalesOrder");

exports.getDataDashBoard = function (req, res, next) {
  const contact = Contact.aggregate([
    {
      $group: {
        _id: "$leadSource",
        count: { $sum: 1 },
      },
    },
  ]);

  const salesOrder = SalesOrder.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);
  const newContact = Contact.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    },
    { $sort: { createdAt: -1 } },
  ]);

  const newSalesOrder = SalesOrder.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    },
    { $sort: { createdAt: -1 } },
  ]);
  Promise.all([contact, salesOrder, newContact, newSalesOrder]).then((data) =>
    res.send(data)
  );
};
