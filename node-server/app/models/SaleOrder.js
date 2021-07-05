const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SaleOrder = new Schema(
  {
    subject: {
      type: String,
      maxLength: 255,
      required: true,
    },
    contactName: {
      type: String,
      maxLength: 255,
      required: false,
    },
    status: {
      type: String,
      maxLength: 255,
      required: true,
    },
    total: {
      type: String,
      maxLength: 255,
      required: true,
    },
    description: {
      type: String,
      maxLength: 255,
      required: true,
    },
    creator: {
      type: String,
      maxLength: 255,
      required: true,
    },
    assignedTo: {
      type: String,
      maxLength: 255,
      required: true,
    },
  },
  { timestamps: true }
);

// Duplicate the ID field.
Test.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
module.exports = mongoose.model("SaleOrder", SaleOrder);
