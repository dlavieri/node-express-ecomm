const Product = require('../models/product-data.js')

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    const prodId = req.params.productId;
    Product.findByPk(prodId)
    .then(product => {
        if (!product) {
            return res.redirect('/admin/products');
        }
        res.render('admin/add-product.ejs', {
            pageTitle: 'Edit Product',
            editMode: editMode,
            product: product
        });
    })
    .catch(err => console.log(err));
}

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.prodId;
    const newName = req.body.name;
    const newImageUrl = req.body.imageUrl;
    const newPrice = req.body.price;
    const newDesc = req.body.desc;
    Product.findByPk(prodId)
    .then(product => {
        product.name = newName;
        product.price = newPrice;
        product.imageUrl = newImageUrl;
        product.desc = newDesc;
        return product.save();
    })
    .then(result => {
        res.redirect('/admin/products')
    })
    .catch(err => console.log(err));
}

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product.ejs', { pageTitle: "Add Products", editMode: false});
}

exports.getProducts = (req, res, next) => {
    req.user.getProducts()
    .then(products => {
        res.render('admin/products.ejs', {
            prods: products,
            pageTitle: 'Products',
        });
    })
    .catch(err => console.log(err));
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.prodId;
    Product.findByPk(prodId)
    .then(product => {
        return product.destroy();
    })
    .then(result => {
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
}

exports.postAddProduct = (req, res, next) => {
    req.user.createProduct({
        name: req.body.name, 
        imageUrl: req.body.imageUrl, 
        price: req.body.price, 
        desc: req.body.desc,
    })
    .then(() => {
        res.redirect('/')
    })
    .catch(err => console.log(err));
}