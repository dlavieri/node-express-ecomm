const express = require('express');
const Product = require('../models/product-data.js')

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        res.render('admin/add-product.ejs', {
            pageTitle: 'Edit Product',
            editMode: editMode,
            product: product
        });
    })
}

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.prodId;
    const newName = req.body.name;
    const newImageUrl = req.body.imageUrl;
    const newPrice = req.body.price;
    const newDesc = req.body.desc;
    const product = new Product(prodId, newName, newImageUrl, newPrice, newDesc);
    product.save();
    res.redirect('/admin/products')
}

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product.ejs', { pageTitle: "Add Products", editMode: false});
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products.ejs', { pageTitle : 'Products', prods: products});
    })
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.prodId;
    console.log("delete product route")
    Product.deleteProduct(prodId);
    res.redirect('/');
}

exports.getOrders = (req, res, next)  => {
    res.render('admin/orders.ejs', { pageTitle: 'Orders'});
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(null, req.body.name, req.body.imageUrl, req.body.price, req.body.desc);
    product.save();
    res.redirect('/');
}