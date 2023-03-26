const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  password: { type: String, required: false },
  mobileNumber: { type: String, required: true },
  country: { type: String, required: true },
  email: { type: String, required: true },
  runningBalance: {
    wallet: { type: Number, required: true },
    gold: { type: Number, required: true },
    goldPrice: { type: Number, required: true },
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
