const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Contact = new Schema(
  {
    name: { type: String, maxLength: 255, required: true },
    salutation: { type: String, maxLength: 255, required: false, default: "" },
    phone: { type: String, maxLength: 255, required: true },

    email: { type: String, maxLength: 255, required: true },
    organization: { type: String, required: false },
    dateOfBirth: { type: Date, maxLength: 255, required: false, default: "" },

    address: { type: String, maxLength: 255, required: false, default: "" },
    leadSource: { type: String, maxLength: 255, required: true },
    creator: { type: String, maxLength: 255, required: true },

    assignedTo: { type: String, maxLength: 255, required: true },
    description: { type: String, maxLength: 255, required: false, default: "" },
  },
  { timestamps: true }
);

// Duplicate the ID field.
Contact.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
module.exports = mongoose.model("Contact", Contact);
