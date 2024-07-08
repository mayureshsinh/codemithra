const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const transactionRoutes = require("./routes/transactions");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

const MONGO_URI =
  "mongodb+srv://youngchora99:wsWFHkLzJCre76P9@young.yctudqf.mongodb.net/?retryWrites=true&w=majority&appName=Young";
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected...");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/transactions", transactionRoutes);

// Basic error handling
app.on("error", (err) => {
  console.error("Server error:", err);
});
