const express = require('express');
const { requestWithdrawal, getWithdrawals } = require('../controllers/withdrawalController');
const { authMiddleware } = require('../utils/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, requestWithdrawal);
router.get('/', authMiddleware, getWithdrawals);

module.exports = router;