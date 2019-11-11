const express = require('express');
const adminControllers = require('../controllers/admin.js');

const router = express.Router();

router.get('/edit-product/:productId', adminControllers.getEditProduct);

router.post('/edit-product/', adminControllers.postEditProduct);

router.post('/add-product', adminControllers.postAddProduct);

router.get('/add-product', adminControllers.getAddProduct);

router.post('/delete-product', adminControllers.postDeleteProduct);

router.get('/products', adminControllers.getProducts);

router.get('/orders', adminControllers.getOrders);


module.exports = router;