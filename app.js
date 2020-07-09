require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_CONNETION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const MODELS = {
  categories: require("./category.model"),
  users: require("./user.model"),
  ads: require("./ad.model"),
};

const routerUsers = require("./routerUsers");
const routerCategories = require("./routerCategories");
const routerAds = require("./routerAds");

const app = express();

app.use(express.json());

// app.use("/users", routerUsers);
// app.use("/categories", routerCategories);
// app.use("/ads", routerAds);
app.get("/:path?/:selector?", async (req, res) => {
  const { path, selector } = req.params;
  if (selector) {
    const model = MODELS[path];
    const response = await model.find;
  } else if (path) {
    try {
      const model = MODELS[path];
      const response = await model
        .find()
        .populate("categories", "-__v -_id -subCategories -parentCategory")
        .populate("author", "-__v")
        .populate("subCategories", "-__v -_id -subCategories -parentCategory")
        .populate("parentCategory", "-__v -_id -subCategories -parentCategory")
        .select("-__v");
      res.send(await JSON.stringify(response));
    } catch (error) {
      console.log(error);
      res.send(`Wystąpił błąd ${error}`);
    }
  }
});

app.listen(4000, () => {
  console.log(
    "Server start on port 4000\nhttp://localhost:4000\nhttp://localhost:4000/users\nhttp://localhost:4000/categories\nhttp://localhost:4000/ads"
  );
});
