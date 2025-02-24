const Order = require('../models/Order');
const User = require('../models/User');

exports.createOrder = async (req, res) => {
  const { type, amount } = req.body;
  const userId = req.user.userId;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (type === 'Buy' && user.balance < amount) {
    return res.status(400).json({ message: 'Insufficient balance' });
  }

  const order = new Order({ userId, type, amount });
  await order.save();

  res.status(201).json({ message: 'Order created successfully' });
};

exports.getOrders = async (req, res) => {
  const orders = await Order.find().populate('userId', 'username');
  res.json(orders);
};

exports.updateOrder = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const order = await Order.findById(orderId);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  order.status = status;

  if (status === 'Approved') {
    const user = await User.findById(order.userId);
    if (order.type === 'Buy') {
      user.balance -= order.amount;
    } else {
      user.balance += order.amount;
    }
    await user.save();
  }

  await order.save();

  res.json({ message: 'Order updated successfully' });
};