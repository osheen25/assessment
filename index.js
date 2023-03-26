const express = require('express');
const router = express.Router();
const { User, WalletTransaction, GoldTransaction } = require('../models');

router.get('/portfolio', async (req, res) => {
  try {
    const userId = req.user._id; // Assuming that the user ID is available in the request object
    const walletTransactions = await WalletTransaction.find({ userId });
    const goldTransactions = await GoldTransaction.find({ userId });
    const user = await User.findById(userId);
    
    // Calculate net funds added to wallet
    const netFundAdded = walletTransactions.reduce((total, tx) => {
      if (tx.type === 'CREDIT') {
        total += tx.amount;
      } else {
        total -= tx.amount;
      }
      return total;
    }, 0);

    // Calculate current fund balance
    const currentFund = user.runningBalance.wallet;

    // Calculate net growth or loss in gold investment
    const goldQuantity = user.runningBalance.gold;
    const totalAmountSpent = goldTransactions
      .filter(tx => tx.type === 'DEBIT')
      .reduce((total, tx) => total + tx.amount, 0);
    const totalAmountEarned = goldTransactions
      .filter(tx => tx.type === 'CREDIT')
      .reduce((total, tx) => total + tx.amount, 0);
    const netGrowthOrLoss = (totalAmountEarned - totalAmountSpent) * user.runningBalance.goldPrice;

    // Calculate percentage gain or loss in gold investment
    const initialInvestment = goldQuantity * user.runningBalance.goldPrice;
    const currentInvestment = initialInvestment + netGrowthOrLoss;
    const gainOrLossPercentage = ((currentInvestment - initialInvestment) / initialInvestment) * 100;

    res.json({
      netFundAdded,
      currentFund,
      netGrowthOrLoss,
      gainOrLossPercentage
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
