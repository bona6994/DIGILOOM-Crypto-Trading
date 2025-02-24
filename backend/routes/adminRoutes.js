const express = require('express');
const { approveOrder, rejectOrder, createReferralCode, approveWithdrawal, rejectWithdrawal } = require('../controllers/adminController');
const { authMiddleware, adminMiddleware } = require('../utils/authMiddleware');

const router = express.Router();

router.put('/orders/approve/:orderId', authMiddleware, adminMiddleware, approveOrder);
router.put('/orders/reject/:orderId', authMiddleware, adminMiddleware, rejectOrder);
router.post('/referral-codes', authMiddleware, adminMiddleware, createReferralCode);
router.put('/withdrawals/approve/:withdrawalId', authMiddleware, adminMiddleware, approveWithdrawal);
router.put('/withdrawals/reject/:withdrawalId', authMiddleware, adminMiddleware, rejectWithdrawal);

module.exports = router;