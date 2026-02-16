const express = require("express");
const router = express.Router();
const Part = require("../models/Part");
const StockMovement = require("../models/StockMovement");

// ✅ Add Stock
router.patch("/:id/add", async (req, res) => {
  try {
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ message: "Quantity must be greater than 0" });
    }

    const part = await Part.findById(req.params.id);
    if (!part) {
      return res.status(404).json({ message: "Part not found" });
    }

    part.quantity += quantity;
    await part.save();

    await StockMovement.create({
      partId: part._id,
      partName: part.name,
      action: "Added",
      quantity,
      reason: "",
    });

    res.json({ message: "Stock added successfully", part });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add stock" });
  }
});

// ✅ Remove Stock
router.patch("/:id/remove", async (req, res) => {
  try {
    const { quantity, reason } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ message: "Quantity must be greater than 0" });
    }

    const part = await Part.findById(req.params.id);
    if (!part) {
      return res.status(404).json({ message: "Part not found" });
    }

    if (part.quantity < quantity) {
      return res.status(400).json({ message: "Not enough stock to remove" });
    }

    part.quantity -= quantity;
    await part.save();

    await StockMovement.create({
      partId: part._id,
      partName: part.name,
      action: "Removed",
      quantity,
      reason,
    });

    res.json({ message: "Stock removed successfully", part });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to remove stock" });
  }
});

// ✅ Get last 10 stock movements
router.get("/history/latest", async (req, res) => {
  try {
    const history = await StockMovement.find()
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch stock history" });
  }
});

module.exports = router;
