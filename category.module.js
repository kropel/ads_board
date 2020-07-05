const mongoose = require("mongoose");

module.exports = mongoose.model("categories", {
  name: String,
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
  },
  subCategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
    },
  ],
});
