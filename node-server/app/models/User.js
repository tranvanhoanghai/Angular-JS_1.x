const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema(
  {
    name: { type: String, maxLength: 255, required: true },
    userName: { type: String, maxLength: 255, required: false },
    email: { type: String, maxLength: 255, required: false },
    phone: { type: String, maxLength: 11, required: false },
    isAdmin: { type: Boolean, required: false },
    isActive: { type: Boolean, required: false },
    creator: { type: String, maxLength: 255, required: false },
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
module.exports = mongoose.model("User", User);
