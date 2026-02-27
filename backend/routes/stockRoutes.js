const express = require("express");
const router = express.Router();
const { getQuote } = require("../controllers/stockController");

router.get("/:symbol", getQuote);

module.exports = router;
