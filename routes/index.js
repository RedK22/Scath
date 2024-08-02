const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const router = express.Router();
const productModel = require("../models/product-model");

router.get("/", function (req, res) {
  const error = req.flash("error") || []; // Initialize as an empty array if not set
  res.render("index", {error});
});
router.get("/shop", isLoggedIn, async function (req, res) {
  let products = await productModel.find();

  res.render("shop", {products});
});

module.exports = router;
