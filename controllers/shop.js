const express = require('express');
const Product = require('../models/product-data.js');

exports.getHome = (req, res, next) => {
    Product.findAll()
    .then(products => {
        res.render('shop/home.ejs', {
            prods: products,
            pageTitle: 'Home',
        });
    })
    .catch(err => console.log(err));
}

exports.getShop = (req, res, next) => {
    Product.findAll()
    .then(products => {
        res.render('shop/shop.ejs', {
            prods: products,
            pageTitle: 'Shop',
        });
    })
    .catch(err => console.log(err));
}

exports.getProductDetails = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findByPk(prodId)
    .then(product => {
        res.render('shop/product-details.ejs', {
            pageTitle: product.name, 
            prod: product})
    })
    .catch(err => console.log(err));
}

exports.postAddToCart = (req, res, next) => {
    const prodId = req.body.prodId;
    let fetchedCart;
    let newQty = 1;
    req.user.getCart()
    .then(cart => {
        fetchedCart = cart;
        return cart.getProducts({where: { id: prodId }});
    })
    .then(products => {
        let prod;
        if (products.length > 0) {
            prod = products[0];
        }
        if (prod) {
            let oldQty = prod.cartItem.quantity;
            newQty = oldQty + 1;
            return prod;
         }
        return Product.findByPk(prodId)
    })
    .then(prod => {
        fetchedCart.addProduct(prod, { through: { quantity: newQty }});
    })
    .then(() => {
        res.redirect('/cart')
    }) 
    .catch(err => console.log(err));
}

exports.removeFromCart = (req, res, next) => {
    const prodId = req.body.prodId;
    req.user.getCart()
    .then(cart => {
        return cart.getProducts({where: {id: prodId}})
    })
    .then(prod => {
        return prod[0].cartItem.destroy();
    })
    .then(result => {
        res.redirect('/cart')
    })
    .catch(err => console.log(err))
}

exports.getCart = (req, res, next) => {
    req.user.getCart()
    .then(cart => {
        return cart.getProducts()
    })
    .then(cartItems => {
        res.render('shop/cart.ejs', { 
            pageTitle: 'Your Cart', 
            cart: cartItems
        });
    })
    .catch(err => console.log(err));
    
}

exports.postOrder = (req, res, next) => {
    let fetchedCart;
    req.user.getCart()
    .then(cart => {
        fetchedCart = cart;
        return cart.getProducts();
    })
    .then(products => {
        return req.user.createOrder()
            .then(order => {
                order.addProducts(products.map(prod => {
                    prod.orderItem = { quantity: prod.cartItem.quantity };
                    return prod;
                }));
            })
            .catch(err => console.log(err))
    })
    .then(result => {
        fetchedCart.setProducts(null);
    })
    .then(result => {
        res.redirect('/orders')
    })
    .catch(err => console.log(err));
}

exports.getOrders = (req, res, next)  => {
    req.user.getOrders({include: ['products']})
    .then(orders => {
        res.render('shop/orders.ejs', { pageTitle: 'Orders', orders: orders});
    })
    .catch(err => console.log(err));
}

