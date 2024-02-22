const express = require('express');
const router = express.Router();
const productController = require("../controllers/productController");

//-----------------------------------------------------
// GET routes
router.get("/", (req, res) => { 
  res.status(200).json(productController.getProducts());
});

router.get("/inventory", (req, res) =>{
  const totalInventory = productController.totalInventory();

  if(!totalInventory){
    res.status(400).json({ message: "Empty inventory"});
  }

  return res.status(200).json({ "Total inventory": totalInventory });
});

router.get("/search/:name", (req, res) => {
  const { name } = req.params;
  const product = productController.getProductByName(name);

  if (!product) {
    res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json(product);
});

router.get("/order/:orderParam", (req, res) => {
  const { orderParam } = req.params;
  const order = productController.sortProductsByPrice(orderParam);

  if(!order){
    res.status(400).json({ message: "Empty inventory"});
  }

  return res.status(200).json(order);
});

router.get("/filterPrice/:price", (req, res) => {
  const { price } = req.params;
  const filter = productController.filterProductsByPrice(price);

  if(!filter){
    res.status(400).json({ message: "Empty inventory"});
  }

  return res.status(200).json(filter);
});

router.get("/filterStock/:stock", (req, res) => {
  const { stock } = req.params;
  const filter = productController.filterProductsByStock(stock);

  if(!filter){
    res.status(400).json({ message: "Empty inventory"});
  }

  return res.status(200).json(filter);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const product = productController.getProductById(id);

  if (!product) {
    res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json({product});
});

// -----------------------------------------------------
// POST routes
router.post("/", (req, res) => {
  const { name, price, description, stock } = req.body;
  const newProduct = productController.addProduct(name, price, description, stock);
  res.status(201).json(newProduct);
});

// -----------------------------------------------------
// PUT routes
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, price, description, stock } = req.body;
  const updatedProduct = productController.updateProduct(id, name, price, description, stock);

  if (!updatedProduct) {
    res.status(404).json({ message: "Product not found" });
  }

  return res.status(200).json(updatedProduct);
});

// -----------------------------------------------------
// DELETE routes
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const deletedProduct = productController.deleteProduct(id);

  if (!deletedProduct) {
    res.status(404).json({ message: "Product not found" });
  }

  return res.status(200).json(deletedProduct);
});


module.exports = router