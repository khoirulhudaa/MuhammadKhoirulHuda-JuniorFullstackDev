const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, restrictTo } = require('../middlewares/auth');

router.use(protect, restrictTo('Admin')); 

router.get('/', userController.getAllUsers);
router.put('/:id/change-role', userController.changeUserRole);

module.exports = router;