const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Test = new Schema(
  {
    name: { type: String, maxLength: 255, required: true },
    price: { type: String, maxLength: 255, required: false },
    image: { type: String, maxLength: 255, required: false },
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
module.exports = mongoose.model("Test", Test);
