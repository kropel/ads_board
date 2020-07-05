const mongoose = require("mongoose");

module.exports = mongoose.model("ads", {
  name: String,
  price: Number,
  amount: Number,
});
