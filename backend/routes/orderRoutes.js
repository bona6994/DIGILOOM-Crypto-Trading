const express = require('express');
const { createOrder, getOrders, updateOrder } = require('../controllers/orderController');
const { authMiddleware, adminMiddleware } = require('../utils/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createOrder);
router.get('/', authMiddleware, adminMiddleware, getOrders);
router.put('/:orderId', authMiddleware, adminMiddleware, updateOrder);

module.exports = router;