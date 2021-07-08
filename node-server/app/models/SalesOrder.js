const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SalesOrder = new Schema(
  {
    subject: {
      type: String,
      maxLength: 255,
      required: true,
    },
    contactName: {
      type: String,
      maxLength: 255,
      required: true,
    },
    status: {
      type: String,
      maxLength: 255,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      maxLength: 255,
      required: false,
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
SalesOrder.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
module.exports = mongoose.model("SalesOrder", SalesOrder);
