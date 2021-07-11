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
  Promise.all([contact, salesOrder]).then((data) => res.send(data));
};
