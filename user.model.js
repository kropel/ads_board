const mongoose = require("mongoose");

module.exports = mongoose.model("users", {
  firstName: String,
  lastName: String,
  username: { type: String, select: false },
  password: { type: String, select: false },
  ads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ads",
    },
  ],
});
