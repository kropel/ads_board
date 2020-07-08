const mongoose = require("mongoose");

module.exports = mongoose.model("ads", {
  name: String,
  descripton: String,
  price: Number,
  amount: Number,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  dateAdded: Date,
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
    },
  ],
});
