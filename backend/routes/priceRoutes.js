const express = require('express');
const { getPrices, updatePrice } = require('../controllers/priceController');
const { authMiddleware, adminMiddleware } = require('../utils/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getPrices);
router.put('/', authMiddleware, adminMiddleware, updatePrice);

module.exports = router;