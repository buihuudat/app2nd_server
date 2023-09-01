const mongoose = require("mongoose");

const listChatSchema = new mongoose.Schema({
  userId: String,
  listChat: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("ListChat", listChatSchema);
