const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
  pair: { type: String, required: true },
  price: { type: Number, required: true },
}, { timestamps: true });

const Price = mongoose.model('Price', priceSchema);
module.exports = Price;