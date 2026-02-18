const express = require("express");
const router = express.Router();
const Part = require("../models/Part");
const StockMovement = require("../models/StockMovement");


// ✅ Create a new part
router.post("/", async (req, res) => {
  try {
    const { name, quantity, minLevel, unitPrice } = req.body;

    if (!name || quantity === undefined || minLevel === undefined || unitPrice === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for duplicate part name (case-insensitive)
    const existingPart = await Part.findOne({ name: { $regex: new RegExp(`^${name}$`, "i") } });
    if (existingPart) {
      return res.status(409).json({ message: `Part "${name}" already exists` });
    }

    const part = new Part({
      name,
      quantity,
      minLevel,
      unitPrice,
    });

    const add_stock = new StockMovement({
      partId: part._id,
      partName: part.name,
      quantity: quantity,
      action: "New Part Added",
      reason: "Initial stock added"
    })

    const savedPart = await part.save();
    const savedStock = await add_stock.save();
    res.status(201).json({ message: "Part created successfully", savedPart, savedStock });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create part" });
  }
});

// ✅ Get all parts
router.get("/", async (req, res) => {
  try {
    const parts = await Part.find().sort({ createdAt: -1 });
    const lowStock = parts.filter(
      (part) => part.quantity < part.minLevel
    )
    res.json({parts, lowStock});
  } catch (error) {
    console.error(error);   
    res.status(500).json({ message: "Failed to fetch parts" });
  }
});

module.exports = router;
