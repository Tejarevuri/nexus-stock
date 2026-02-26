const express = require("express");
const router = express.Router();
const { addTransaction, getTransactionsByUser } = require("../controllers/transactionController");

router.post("/add", addTransaction);
router.get("/:userId", getTransactionsByUser);

module.exports = router;