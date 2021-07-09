const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema(
  {
    name: { type: String, maxLength: 255, required: false },
    username: { type: String, maxLength: 255, required: false, unique: true },
    password: { type: String, maxLength: 255, required: false },
    email: { type: String, maxLength: 255, required: false, unique: true },
    phone: { type: Number, maxLength: 11, required: false },
    roles: {
      type: [
        {
          type: String,
          enum: ["user", "admin"],
        },
      ],
      default: ["user"],
      required: "Please provide at least one role",
    },
    isAdmin: { type: Boolean, required: false, default: false },
    isActive: { type: Boolean, required: false, default: true },
    creator: { type: String, maxLength: 255, required: false, default: "" },
  },
  { timestamps: true }
);

// Duplicate the ID field.
User.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
module.exports = mongoose.model("User", User);
