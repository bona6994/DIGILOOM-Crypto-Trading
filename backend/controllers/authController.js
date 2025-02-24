const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ReferralCode = require('../models/ReferralCode');

exports.register = async (req, res) => {
  const { username, password, referralCode } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  const code = await ReferralCode.findOne({ code: referralCode, isUsed: false });
  if (!code) {
    return res.status(400).json({ message: 'Invalid or used referral code' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    username,
    password: hashedPassword,
    referralCode,
    balance: 10000, // Initial balance in INR
  });

  await user.save();
  code.isUsed = true;
  await code.save();

  res.status(201).json({ message: 'User registered successfully' });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
};