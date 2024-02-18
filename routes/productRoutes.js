const express = require('express');
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", (req, res) => { 
  res.status(200).json(productController.getProducts());
});

router.post("/", (req, res) => {
  const { name, price, description, stock } = req.body;
  const newProduct = productController.addProduct(name, price, description, stock);
  res.status(201).json(newProduct);
});

module.exports = router