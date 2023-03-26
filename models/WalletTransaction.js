const mongoose = require('mongoose');

const walletTransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  type: { type: String, required: true, enum: ['CREDIT', 'DEBIT'] },
  status: { type: String, required: true, enum: ['FAILED', 'SUCCESS', 'PROCESSING'] },
  runningBalance: { type: Number, required: true },
  transaction: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});

const WalletTransaction = mongoose.model('WalletTransaction', walletTransactionSchema);

module.exports = WalletTransaction;
