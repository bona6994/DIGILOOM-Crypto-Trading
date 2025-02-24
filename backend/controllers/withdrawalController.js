const Withdrawal = require('../models/Withdrawal');
const User = require('../models/User');

exports.requestWithdrawal = async (req, res) => {
  const { bankName, ifscCode, accountNumber, accountHolderName, amount } = req.body;
  const userId = req.user.userId;

  const withdrawal = new Withdrawal({ userId, bankName, ifscCode, accountNumber, accountHolderName, amount });
  await withdrawal.save();
  res.status(201).json({ message: 'Withdrawal request submitted' });
};

exports.getWithdrawals = async (req, res) => {
  const withdrawals = await Withdrawal.find().populate('userId', 'username');
  res.json(withdrawals);
};