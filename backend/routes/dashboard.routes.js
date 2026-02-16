const express = require("express");
const router = express.Router();
const Part = require("../models/Part");

// ✅ Dashboard summary
router.get("/", async (req, res) => {
  try {
    const parts = await Part.find();

    const totalParts = parts.length;

    const lowStockCount = parts.filter(
      (part) => part.quantity < part.minLevel
    ).length;

    const totalInventoryValue = parts.reduce(
      (sum, part) => sum + part.quantity * part.unitPrice,
      0
    );

    res.json({
      totalParts,
      lowStockCount,
      totalInventoryValue,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch dashboard summary" });
  }
});

module.exports = router;
