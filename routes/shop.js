const express = require('express');
const shopControllers = require('../controllers/shop.js');

const router = express.Router();

router.get('/', shopControllers.getHome);

router.get('/shop', shopControllers.getShop);

router.get('/product/:productId', shopControllers.getProductDetails)

router.post('/add-to-cart', shopControllers.postAddToCart);

router.post('/remove-from-cart', shopControllers.removeFromCart);

router.get('/cart', shopControllers.getCart);

router.post('/create-order', shopControllers.postOrder);

router.get('/orders', shopControllers.getOrders);



module.exports = router;