const express = require("express");
const router = express.Router();
const Ad = require("./ad.model");

router.get("/", async (req, res) => {
  const ads = await Ad.find()
    .populate("author", "-_id -__v")
    .populate("categories", "-subCategories -parentCategory -_id -__v")
    .select("-__v");
  res.send(ads);
});

module.exports = router;
