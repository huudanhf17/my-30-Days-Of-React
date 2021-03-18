const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transactions");
const User = require("../models/User");
const cookieParser = require("cookie-parser");
const verify = require("./verifyToken");

//Middlewares
router.use(cookieParser());

//Get TRANSACTIONS by UserID
router.post("/", verify, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user_id: req.body.user_id });
    res.json(transactions);
  } catch (err) {
    res.json({ message: err });
  }
});

//SUBMITS A TRANSACTION
router.post("/", async (req, res) => {
  const transaction = new Transaction({
    user_id: req.body.user_id,
    amount: req.body.plus,
    created_at: Date.now(),
  });
  try {
    const user = await User.findById(transaction.user_id);
    if (!user) {
      res.json({
        message: `User with id ${transaction.user_id} does not exist`,
      });
      return;
    }
    await user.updateOne(
      { _id: transaction.user_id },
      { coins: user.coins + transaction.amount }
    );
    const newTransaction = await transaction.save();
    res.json(newTransaction);
  } catch (err) {
    res.json({ message: err });
  }
});

//Specific TRANSACTION
router.get("/:transactionId", async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.transactionId);
    res.json(transaction);
  } catch (err) {
    res.json({ message: err });
  }
});

//Delete TRANSACTION
router.delete("/:transactionId", async (req, res) => {
  try {
    const removedTransaction = await Transaction.deleteOne({
      _id: req.params.transactionId,
    });
    res.json(removedTransaction);
  } catch (err) {
    res.json({ message: err });
  }
});

//Update a TRANSACTION
router.patch("/:transactionId", async (req, res) => {
  try {
    const updateTransaction = await Transaction.updateOne(
      { _id: req.params.userId },
      {
        $set: {
          amount: req.body.plus,
          subtraction: req.body.subtraction,
        },
      }
    );
    res.json(updateTransaction);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
