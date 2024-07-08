const mongoose = require("mongoose");
const axios = require("axios");
const Transaction = require("./models/Transaction");

const MONGO_URI =
  "mongodb+srv://youngchora99:wsWFHkLzJCre76P9@young.yctudqf.mongodb.net/?retryWrites=true&w=majority&appName=Young";

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected...");
    seedDatabase();
  })
  .catch((err) => console.log("Connection error:", err));

const seedDatabase = async () => {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const transactions = response.data;
    await Transaction.insertMany(transactions);
    console.log("Database seeded!");
    mongoose.connection.close();
  } catch (err) {
    console.error("Seeding error:", err);
  }
};
