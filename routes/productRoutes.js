const express = require('express');
const router = express.Router();
const productController = require("../controllers/productController");
const authUtilites = require("../middleware/authUtilites");

function authentification(req, res, next){
  const token = req.headers.authorization;

  if(!token){
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decodedToken = authUtilites.verifyToken(token);
  if(!decodedToken){
    return res.status(401).json({ message: "Unauthorized" });
  }

  res.user = decodedToken;
  next();
}

//-----------------------------------------------------
// GET routes
router.get("/", authentification, (req, res) => { 
  res.status(200).json(productController.getProducts());
});

router.get("/inventory", authentification, (req, res) =>{
  const totalInventory = productController.totalInventory();

  if(!totalInventory){
    res.status(400).json({ message: "Empty inventory"});
  }

  return res.status(200).json({ "Total inventory": totalInventory });
});

router.get("/search/:name", authentification, (req, res) => {
  const { name } = req.params;
  const product = productController.getProductByName(name);

  if (!product) {
    res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json(product);
});

router.get("/order/:orderParam", authentification, (req, res) => {
  const { orderParam } = req.params;
  const order = productController.sortProductsByPrice(orderParam);

  if(!order){
    res.status(400).json({ message: "Empty inventory"});
  }

  return res.status(200).json(order);
});

router.get("/filterPrice/:price", authentification, (req, res) => {
  const { price } = req.params;
  const filter = productController.filterProductsByPrice(price);

  if(!filter){
    res.status(400).json({ message: "Empty inventory"});
  }

  return res.status(200).json(filter);
});

router.get("/filterStock/:stock", authentification, (req, res) => {
  const { stock } = req.params;
  const filter = productController.filterProductsByStock(stock);

  if(!filter){
    res.status(400).json({ message: "Empty inventory"});
  }

  return res.status(200).json(filter);
});

router.get("/:id", authentification, (req, res) => {
  const { id } = req.params;
  const product = productController.getProductById(id);

  if (!product) {
    res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json({product});
});

// -----------------------------------------------------
// POST routes
router.post("/", authentification, (req, res) => {
  const { name, price, description, stock } = req.body;
  const newProduct = productController.addProduct(name, price, description, stock);
  res.status(201).json(newProduct);
});

// -----------------------------------------------------
// PUT routes
router.put("/:id", authentification, (req, res) => {
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
router.delete("/:id", authentification, (req, res) => {
  const { id } = req.params;
  const deletedProduct = productController.deleteProduct(id);

  if (!deletedProduct) {
    res.status(404).json({ message: "Product not found" });
  }

  return res.status(200).json(deletedProduct);
});


module.exports = router