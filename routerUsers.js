const User = require("./user.model");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find().select("-__v");
  res.send(users);
});

module.exports = router;
