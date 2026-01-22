const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect, restrictTo } = require('../middlewares/auth');

router.use(protect); // semua route products wajib login

router.get('/', productController.getAllProducts);
router.post('/', restrictTo('Admin'), productController.createProduct);
router.post('/:id/sell', restrictTo('Admin', 'Seller'), productController.sellProduct);

module.exports = router;