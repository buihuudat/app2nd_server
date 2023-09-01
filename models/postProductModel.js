const { default: mongoose } = require("mongoose");

const postProductSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    location: {
      city: String,
      district: String,
    },
    images: [String],
    title: String,
    price: Number,
    category: String,
    description: String,
    status: {
      type: String,
      enum: ["pending", "success", "access", "done", "refuse"],
      default: "pending",
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PostProduct", postProductSchema);
