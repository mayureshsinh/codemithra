const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");

router.get("/", transactionController.getAllTransactions);
router.get("/statistics", transactionController.getStatistics);

module.exports = router;
