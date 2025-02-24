const mongoose = require('mongoose');

const referralCodeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  isUsed: { type: Boolean, default: false },
}, { timestamps: true });

const ReferralCode = mongoose.model('ReferralCode', referralCodeSchema);
module.exports = ReferralCode;