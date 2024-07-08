const Transaction = require("../models/Transaction");

exports.getAllTransactions = async (req, res) => {
  const { search = "", page = 1, perPage = 10 } = req.query;
  const regex = new RegExp(search, "i"); // case-insensitive regex for search
  try {
    const transactions = await Transaction.find({
      $or: [
        { title: regex },
        { description: regex },
        { price: { $regex: regex } },
      ],
    })
      .skip((page - 1) * perPage)
      .limit(Number(perPage));

    const total = await Transaction.countDocuments({
      $or: [
        { title: regex },
        { description: regex },
        { price: { $regex: regex } },
      ],
    });

    res.json({ transactions, total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getStatistics = async (req, res) => {
  const { month } = req.query;
  if (!month) return res.status(400).json({ message: "Month is required" });

  try {
    const transactions = await Transaction.find({
      dateOfSale: { $regex: new RegExp(`-${month}-`, "i") },
    });

    const totalSaleAmount = transactions.reduce((sum, t) => sum + t.price, 0);
    const soldItems = transactions.filter((t) => t.sold).length;
    const notSoldItems = transactions.length - soldItems;

    res.json({ totalSaleAmount, soldItems, notSoldItems });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
