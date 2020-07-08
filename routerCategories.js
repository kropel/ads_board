const express = require("express");
const router = express.Router();
const Category = require("./category.model");

router.get("/:selector", async (req, res, next) => {
  const categoryById = await Category.findById(req.params.selector)
    .populate("parentCategory", "name -_id")
    .populate("subCategories", "name -_id")
    .select("-__v");

  const nameRegx = new RegExp(req.params.selector, "i");
  const categoryByName = await Category.find({ name: nameRegx })
    .populate("parentCategory", "name -_id")
    .populate("subCategories", "name -_id")
    .select("-__v");
  if (categoryByName.length > 0) {
    res.send(categoryByName);
  } else if (categoryById.name) {
    res.send(categoryById);
  } else {
    next();
  }
});

router.get("/", async (req, res) => {
  const categories = await Category.find()
    .populate("parentCategory", "name -_id")
    .populate("subCategories", "name -_id")
    .select("-__v");
  res.send(categories);
});

module.exports = router;
