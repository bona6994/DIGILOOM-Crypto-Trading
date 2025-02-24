const Price = require('../models/Price');

exports.getPrices = async (req, res) => {
  const prices = await Price.find();
  res.json(prices);
};

exports.updatePrice = async (req, res) => {
  const { pair, price } = req.body;

  const existingPrice = await Price.findOne({ pair });
  if (existingPrice) {
    existingPrice.price = price;
    await existingPrice.save();
  } else {
    const newPrice = new Price({ pair, price });
    await newPrice.save();
  }

  res.json({ message: 'Price updated successfully' });
};