const User = require('../models/User');
const ReferralCode = require('../models/ReferralCode');

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
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

exports.updateUser = async (req, res) => {
  const { userId } = req.params;
  const { balance, isAdmin, isFrozen } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.balance = balance !== undefined ? balance : user.balance;
  user.isAdmin = isAdmin !== undefined ? isAdmin : user.isAdmin;
  user.isFrozen = isFrozen !== undefined ? isFrozen : user.isFrozen;

  await user.save();

  res.json({ message: 'User updated successfully' });
};