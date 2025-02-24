const express = require('express');
const { getUsers, createReferralCode, updateUser } = require('../controllers/userController');
const { authMiddleware, adminMiddleware } = require('../utils/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, adminMiddleware, getUsers);
router.post('/referral-code', authMiddleware, adminMiddleware, createReferralCode);
router.put('/:userId', authMiddleware, adminMiddleware, updateUser);

module.exports = router;