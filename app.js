require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_CONNETION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const routerUsers = require("./routerUsers");
const routerCategories = require("./routerCategories");
const routerAds = require("./routerAds");
const userModel = require("./user.model");

const app = express();

app.use(express.json());

app.use(async (req, res, next) => {
  const authorization = req.headers.authorization || "";
  const [username, password] = authorization.split(":");
  const user = await userModel.findOne({ username, password });
  req.userAuthorisation = user ? true : false;

  next();
});

app.use("/users", routerUsers);
app.use("/categories", routerCategories);
app.use("/ads", routerAds);

app.use((error, req, res, next) => {
  console.log("Error:", error.message);
  if (error.code) {
    res.status(error.code);
  }
  res.send(`There was na error: ${error.message}`);
});

app.listen(4000, () => {
  console.log(
    `Server start on port 4000
    
    http://localhost:4000/users
    http://localhost:4000/categories
    http://localhost:4000/ads`
  );
});
