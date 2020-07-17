const express = require("express");
const router = express.Router();
const adModel = require("./ad.model");
const userModel = require("./user.model");
const categoryModel = require("./category.model");
const { response } = require("express");

/**
 * Pobieranie wszystkich ogłoszeń
 *
 * http://localhost:4000/ads
 *
 * @method get
 */
router.get("/", async (req, res) => {
  console.log(req.query);
  const ads = await adModel
    .find(req.query)
    .populate("author", "-_id -__v")
    .populate("categories", "-subCategories -parentCategory -_id -__v")
    .select("-__v");
  res.send(ads);
});

/**
 * Pobieranie jednego ogłoszenia po id
 *
 *http://localhost:4000/ads/5f0607bb2314f50c6087790b
 *
 * @method get
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const ad = await adModel
    .findById(id)
    .populate("author", "-_id -__v")
    .populate("categories", "-subCategories -parentCategory -_id -__v")
    .select("-__v");
  res.send(ad);
});

/**
 * Dodawanie nowego ogłoszenia
 *
 * http://localhost:4000/ads
 *
 * @method post
 * @body
 {
    "name": "Pamięć RAM DDR3 16GB Samsung 1600MHz ECC 16GB 32GB",
   "descripton": "Witam, mam do sprzedania pamięci DDR3 R 16GB SAMSUNG 1600MHz",
    "price": 119.00,
    "author": "TH",
    "categories": ["DDR3", "pamięci RAM"],
    "amount": 4
  }
 */
router.post("/", async (req, res, next) => {
  const { name, descripton, price, author, categories, amount } = req.body;
  const userDB = await userModel.findOne({ username: author });
  const categoriesDB = await categoryModel.find().where("name").in(categories);
  const ad = new adModel({
    name,
    descripton,
    price,
    author: userDB,
    categories: categoriesDB,
    dateAdded: Date.now(),
    amount,
  });

  try {
    await ad.save((error, response) => {
      if (error) {
        throw error;
      } else {
        res.status(201).send(response);
      }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * Aktualizacja odłoszemia po Id
 *
 * http://localhost:4000/ads/5f0607bb2314f50c6087790b
 *
 * @method put
 *
 * @body
 *{"amount": 100}
 */
router.put("/:id", async (req, res, next) => {
  if (!req.userAuthorisation) {
    const error = new Error("No user authorisation");
    error.code = 401;
    next(error);
  } else {
    const { id } = req.params;
    const ad = await adModel.findByIdAndUpdate(
      id,
      req.body,
      (error, response) => {
        try {
          if (error) {
            throw error;
          } else {
            if (response) {
              res.status(200).send(response);
            } else {
              res.status(204).send();
            }
          }
        } catch (error) {
          next(error);
        }
      }
    );
  }
});

/**
 * kasowanie ogłoszenia po id
 *
 * @method delete
 *
 * http://localhost:4000/ads/5f1185e31edd5a4b31a2fad0
 */
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await adModel.findByIdAndDelete(id, (error, response) => {
      if (error) {
        throw error;
      } else {
        if (response) {
          res.status(200).send(response);
        } else {
          res.status(204).send();
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
