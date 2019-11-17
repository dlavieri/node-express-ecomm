const fs = require('fs');
const path = require('path');
const Product = require('./product-data');

const p = path.join(__dirname, '..', 'data', 'cart.json')

module.exports = class Cart {

    static addToCart(id, prodPrice) {
        fs.readFile(p, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0};
            if (!err) {
                cart = JSON.parse(fileContent);
            }

            const i = cart.products.findIndex(prod => prod.prodId === id);
            const existingProduct = cart.products[i];
            let updatedProd;
            if (existingProduct) {
                updatedProd = {...existingProduct };
                updatedProd.qty = updatedProd.qty+1;
                cart.products[i] = updatedProd;
            } else {
                updatedProd = {prodId: id, qty: 1};
                cart.products = [...cart.products, updatedProd];
            }
            cart.totalPrice = cart.totalPrice + prodPrice;
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
        })
        
    }

    static removeFromCart(prodId, prodPrice) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return;
            }
            let cart = JSON.parse(fileContent);
            const i = cart.products.findIndex(prod => prod.prodId === id);
            const existingProduct = cart.products[i];
            if (!existingProduct) {
                return;
            }
            let updatedCart = cart.products.filter(prod => prod.prodId !== prodId);
            let updatedPrice = cart.totalPrice - prodPrice;
            cart = {products: updatedCart, totalPrice: updatedPrice};
            fs.writeFile(p, (err, JSON.stringify(cart)));
    })
    }
    
}