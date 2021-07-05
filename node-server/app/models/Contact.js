const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Contact = new Schema(
  {
    name: { type: String, maxLength: 255, required: true },
    salutation: { type: String, maxLength: 255, required: false },
    phone: { type: String, maxLength: 255, required: true },

    email: { type: String, maxLength: 255, required: true },
    organization: { type: String, maxLength: 255, required: true },
    dob: { type: String, maxLength: 255, required: true },
    leadSource: { type: String, maxLength: 255, required: true },
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
module.exports = mongoose.model("Contact", Contact);
