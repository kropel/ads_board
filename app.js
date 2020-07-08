require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_CONNETION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Category = require("./category.model");
const User = require("./user.model");
const Ad = require("./ad.model");

const routerUsers = require("./routerUsers");
const routerCategories = require("./routerCategories");
const routerAds = require("./routerAds");

const app = express();

app.use(express.json());

app.use("/users", routerUsers);
app.use("/categories", routerCategories);
app.use("/ads", routerAds);

app.listen(4000, () => {
  console.log(
    "Server start on port 4000\nhttp://localhost:4000\nhttp://localhost:4000/users\nhttp://localhost:4000/categories\nhttp://localhost:4000/ads"
  );
});
