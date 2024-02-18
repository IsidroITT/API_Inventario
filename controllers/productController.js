const product = require('../models/productsModel');
const productModel = require('../models/productsModel');

let productsArray = [];

// Get fucntions
function getProducts(){
    return productsArray;
}

function getProductById(id){
    return productsArray.find(product => product.id == parseInt(id));
}
// Post fucntions
function addProduct(name, price, description, stock){
    const newProduct = new productModel(productsArray.length + 1, name, price, description, stock);
    productsArray.push(newProduct);
    return newProduct;
}

// Put functions
function updateProduct(id, name, price, description, stock){
    const productUpdated = productsArray.find(product => product.id === parseInt(id));
    if(!productUpdated){
        return false;
    }

    productUpdated.name = name;
    productUpdated.price = price;
    productUpdated.description = description;
    productUpdated.stock = stock;

    return productUpdated;
}

// Delete fucntions
function deleteProduct(id){
    const productDeleted = productsArray.find(product => product.id === parseInt(id));
    if(!productUpdate){
        return false;
    }

    const index = productsArray.indexOf(productDeleted);
    productsArray.splice(index, 1);
    return productsArray;
}
  
module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
};