const mongoose = require("mongoose");
const Transaction = require("../models/Transaction");

// Add a transaction
exports.addTransaction = async (req, res) => {
  try {
    const { user, stockSymbol, price, quantity, transactionType, type } = req.body;

    // Accept legacy `type` from client and normalize to schema enum values.
    const normalizedType = (transactionType || type || "").toString().toLowerCase();

    const newTransaction = new Transaction({
      user: new mongoose.Types.ObjectId(user),
      stockSymbol,
      price,
      quantity,
      transactionType: normalizedType,
    });

    const savedTransaction = await newTransaction.save();

    res.status(201).json({
      message: "Transaction added successfully",
      transaction: savedTransaction,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get transactions by user
exports.getTransactionsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const transactions = await Transaction.find({
      user: new mongoose.Types.ObjectId(userId),
    }).sort({ date: -1 });

    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
