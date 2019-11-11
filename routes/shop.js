const express = require('express');
const shopControllers = require('../controllers/shop.js');

const router = express.Router();

router.get('/', shopControllers.getHome);

router.get('/shop', shopControllers.getShop);

router.get('/product/:productId', shopControllers.getProductDetails)

router.post('/add-to-cart', shopControllers.postAddToCart);

router.get('/cart', shopControllers.getCart);

router.get('/checkout', shopControllers.getCheckout);



module.exports = router;