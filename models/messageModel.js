const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    message: {
      text: String,
      images: Array,
      file: String,
    },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
