const productModel = require('../models/productsModel');

let productsArray = [];

//-----------------------------------------------------
// Get functions
function getProducts(){
    return productsArray;
}

function getProductById(id){
    return productsArray.find(product => 
        product.id == parseInt(id));
}

function getProductByName(name){
    const product = productsArray.filter(product => 
        product.name.toLowerCase().includes(name.toLowerCase()));

    return product;
}

//-----------------------------------------------------
// Post functions
function addProduct(name, price, description, stock){
    const newProduct = new productModel(productsArray.length + 1, name, price, description, stock);
    productsArray.push(newProduct);
    return newProduct;
}

//-----------------------------------------------------
// Put functions
function updateProduct(id, name, price, description, stock){
    const productUpdated = productsArray.find(product => 
        product.id === parseInt(id));

    if(!productUpdated){
        return false;
    }

    productUpdated.name = name;
    productUpdated.price = price;
    productUpdated.description = description;
    productUpdated.stock = stock;

    return productUpdated;
}

//-----------------------------------------------------
// Delete functions
function deleteProduct(id){
    const productDeleted = productsArray.find(product => product.id === parseInt(id));
    if(!productUpdate){
        return false;
    }

    const index = productsArray.indexOf(productDeleted);
    productsArray.splice(index, 1);
    return productsArray;
}
  
//-----------------------------------------------------
// Aditional functions
// Cálculo del valor total del inventario: La API debe proporcionar una ruta para calcular el valor total del inventario, es decir, la suma del precio de cada producto multiplicado por su cantidad en stock.
function totalInventory(){
    let total = 0;
    productsArray.forEach(product => {
        total += product.price * product.stock;
    });
    return total;
}

// Ordenar productos por precio: Los usuarios deben poder obtener una lista de productos ordenados por precio, ya sea ascendente o descendente.
function sortProductsByPrice(order){
    if(order === 'asc'){
        return productsArray.sort((a, b) => a.price - b.price);
    } else if(order === 'desc'){
        return productsArray.sort((a, b) => b.price - a.price);
    }
}

// Filtrar productos por cantidad en stock: Los usuarios deben poder obtener una lista de productos que cumplan con ciertos criterios de cantidad en stock, por ejemplo, productos con una cantidad en stock mayor que un valor específico.
function filterProductsByStock(stock){
    return productsArray.filter(product => product.stock > stock);
}

function filterProductsByPrice(price){
    return productsArray.filter(product => product.price > price);
}

module.exports = {
    getProducts,
    getProductById,
    getProductByName,
    addProduct,
    updateProduct,
    deleteProduct,
    totalInventory,
    sortProductsByPrice,
    filterProductsByStock,
    filterProductsByPrice
};