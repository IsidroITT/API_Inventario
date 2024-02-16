const product = require("../models/producto");
const express = require('express');
const router = express.Router();

let products = [];

router.post("/", (req, res) => {
  const { nombre, precio, descripcion, cantidad } = req.body;
  const newProduct = new product(products.length + 1, nombre, precio, descripcion, cantidad);

  products.push(newProduct);
  res.status(201).json(newProduct);
});

router.get("/", (req, res) => {
  res.status(200).json(products);
});

module.exports = router