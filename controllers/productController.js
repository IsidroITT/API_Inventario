const productModel = require('../models/productsModel');

let productsArray = [];

function addProduct(nombre, precio, descripcion, cantidad){
    const newProduct = new productModel(productsArray.length + 1, nombre, precio, descripcion, cantidad);
    productsArray.push(newProduct);
    return newProduct;
}


module.exports = {
    addProduct
};