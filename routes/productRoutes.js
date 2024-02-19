const express = require('express');
const router = express.Router();
const productController = require("../controllers/productController");

//-----------------------------------------------------
// GET routes
router.get("/", (req, res) => { 
  res.status(200).json(productController.getProducts());
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const product = productController.getProductById(id);

  if (product) {
    res.status(404).json({ message: "Product not found" });
  }

  return res.status(200).json(product);
});

router.get("/search", (req, res) => {
  const { name } = req.query;
  const product = productController.getProductByName(name);

  if (product) {
    res.status(404).json({ message: "Product not found" });
  }

  return res.status(200).json(product);
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

// -----------------------------------------------------
// Additional routes
router.get("/inventory", (req, res) =>{
  const totalInventory = productController.totalInventory();

  if(!totalInventory){
    res.status(400).json({ message: "Empty inventory"});
  }

  return res.status(200).json({ "Total inventory": totalInventory });
});

router.get("/search/:order", (req, res) => {
  const { orderParam } = req.params;
  const order = productController.orderByPrice(orderParam);

  if(!order){
    res.status(400).json({ message: "Empty inventory"});
  }

  return res.status(200).json(order);
});

router.get("/filter/:price", (req, res) => {
  const { priceParam } = req.params;
  const filter = productController.filterByPrice(priceParam);

  if(!filter){
    res.status(400).json({ message: "Empty inventory"});
  }

  return res.status(200).json(filter);
});

router.get("/filter/:stock", (req, res) => {
  const { stockParam } = req.params;
  const filter = productController.filterByStock(stockParam);

  if(!filter){
    res.status(400).json({ message: "Empty inventory"});
  }

  return res.status(200).json(filter);
});

module.exports = router