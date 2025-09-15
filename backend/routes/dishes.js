
const express = require("express");
const router = express.Router();
const db = require("../db");


router.get("/", (req, res) => {
  db.all("SELECT * FROM dishes ORDER BY id", [], (err, rows) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(rows);
  });
});

// GET /api/dishes/:id  -> single dish
router.get("/:id", (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM dishes WHERE id = ?", [id], (err, row) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (!row) return res.status(404).json({ error: "Dish not found" });
    res.json(row);
  });
});

module.exports = router;
