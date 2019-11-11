const express = require('express');
const Product = require('../models/product-data.js');
const Cart = require('../models/cart-data');

exports.getHome = (req, res, next) => {
    const products = Product.fetchAll(products => {
        res.render('shop/home.ejs', {pageTitle: 'My Site', prods: products});
    })
}

exports.getShop = (req, res, next) => {
    const products = Product.fetchAll(products => {
        res.render('shop/shop.ejs', { pageTitle: 'Shop', prods: products} );
    });
}

exports.getProductDetails = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        res.render('shop/product-details.ejs', {pageTitle: product.name, prod: product});
    })
}

exports.postAddToCart = (req, res, next) => {
    const prodId = req.body.prodId;
    Product.findById(prodId, (product) => {
        Cart.addToCart(prodId, product.price);
    })
    res.redirect('/cart');
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart.ejs', { pageTitle: 'Your Cart'});
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout.ejs', { pageTitle: 'Checkout'});
}
