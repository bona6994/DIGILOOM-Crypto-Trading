const User = require('../models/User');
const Order = require('../models/Order');
const ReferralCode = require('../models/ReferralCode');
const Withdrawal = require('../models/Withdrawal');

exports.approveOrder = async (req, res) => {
  const { orderId } = req.params;
  const order = await Order.findById(orderId);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  order.status = 'Approved';
  const user = await User.findById(order.userId);
  if (order.type === 'Buy') {
    user.balance -= order.amount;
  } else {
    user.balance += order.amount;
  }
  await order.save();
  await user.save();
  res.json({ message: 'Order approved' });
};

exports.rejectOrder = async (req, res) => {
  const { orderId } = req.params;
  const { reason } = req.body;
  const order = await Order.findById(orderId);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  order.status = 'Rejected';
  order.rejectReason = reason;
  await order.save();
  res.json({ message: 'Order rejected' });
};

exports.createReferralCode = async (req, res) => {
  const { code } = req.body;
  const existingCode = await ReferralCode.findOne({ code });
  if (existingCode) {
    return res.status(400).json({ message: 'Referral code already exists' });
  }

  const referralCode = new ReferralCode({ code });
  await referralCode.save();
  res.status(201).json({ message: 'Referral code created successfully' });
};

exports.approveWithdrawal = async (req, res) => {
  const { withdrawalId } = req.params;
  const withdrawal = await Withdrawal.findById(withdrawalId);
  if (!withdrawal) {
    return res.status(404).json({ message: 'Withdrawal not found' });
  }

  withdrawal.status = 'Approved';
  await withdrawal.save();
  res.json({ message: 'Withdrawal approved' });
};

exports.rejectWithdrawal = async (req, res) => {
  const { withdrawalId } = req.params;
  const { reason } = req.body;
  const withdrawal = await Withdrawal.findById(withdrawalId);
  if (!withdrawal) {
    return res.status(404).json({ message: 'Withdrawal not found' });
  }

  withdrawal.status = 'Rejected';
  withdrawal.rejectReason = reason;
  await withdrawal.save();
  res.json({ message: 'Withdrawal rejected' });
};