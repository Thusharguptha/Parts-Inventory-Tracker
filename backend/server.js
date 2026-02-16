const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const partRoutes = require("./routes/part.routes");
const stockRoutes = require("./routes/stock.routes");


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Spare Parts Inventory API is running 🚀");
});

app.use("/api/parts", partRoutes);
app.use("/api/stock", stockRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
  });
