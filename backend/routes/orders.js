
const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
  const { customer_name = "Guest", items = [] } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Order must include items" });
  }

  db.serialize(() => {
    db.run(`INSERT INTO orders (customer_name) VALUES (?)`, [customer_name], function (err) {
      if (err) {
        console.error("DB error:", err);
        return res.status(500).json({ error: "Database error" });
      }

      const orderId = this.lastID;

      const insertItemStmt = db.prepare(`INSERT INTO order_items (order_id, dish_id, qty) VALUES (?, ?, ?)`);

      items.forEach(item => {
        const dishId = item.dishId || item.id;
        const qty = item.qty || 1;
        insertItemStmt.run(orderId, dishId, qty);
      });

      insertItemStmt.finalize(err2 => {
        if (err2) {
          console.error("DB error:", err2);
          return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ orderId });
      });
    });
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM orders WHERE id = ?", [id], (err, order) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (!order) return res.status(404).json({ error: "Order not found" });

    db.all(
      `SELECT oi.qty, d.* FROM order_items oi
       JOIN dishes d ON oi.dish_id = d.id
       WHERE oi.order_id = ?`,
      [id],
      (err2, items) => {
        if (err2) return res.status(500).json({ error: "Database error" });
        res.json({ order, items });
      }
    );
  });
});

module.exports = router;
