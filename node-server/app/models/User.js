const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema(
  {
    name: { type: String, maxLength: 255, required: true },
    username: { type: String, maxLength: 255, required: true, unique: true },
    password: { type: String, maxLength: 255, required: true },
    email: { type: String, maxLength: 255, required: true, unique: true },
    phone: { type: Number, maxLength: 11, required: true },
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
    isAdmin: { type: String, required: true, default: "false" },
    isActive: { type: String, required: true, default: "true" },
    creator: { type: String, maxLength: 255, required: true, default: "" },
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
