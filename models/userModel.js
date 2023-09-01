const mongoose = require("mongoose");

const UserScheema = new mongoose.Schema(
  {
    msv: String,
    fullname: {
      firstname: String,
      lastname: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: String,
    avatar: {
      type: String,
      default: "",
    },
    address: {
      city: String,
      district: String,
      ward: String,
      street: String,
      more: String,
    },
    sex: {
      type: Boolean,
      default: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    role: {
      type: "string",
      enum: ["user", "staff", "admin"],
      default: "user",
    },
    follow: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Follow",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserScheema);
