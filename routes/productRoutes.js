const express = require('express');
const router = express.Router();
const productController = require("../controllers/productController");

let products = [];

router.get("/", (req, res) => {
  res.status(200).json(products);
});

router.post("/", (req, res) => {
  const { nombre, precio, descripcion, cantidad } = req.body;
  const newProduct = productController.addProduct(nombre, precio, descripcion, cantidad);
  res.status(201).json(newProduct);
});

module.exports = router