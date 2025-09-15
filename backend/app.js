
const express = require("express");
const cors = require("cors");
const path = require("path");


require("./db");

function safeRequire(p) {
  try {
    return require(p);
  } catch (err) {
    console.error("Failed to require", p, err && err.message);
    return null;
  }
}

const dishesRouter = safeRequire("./routes/dishes");
const ordersRouter = safeRequire("./routes/orders");

console.log("dishesRouter ->", typeof dishesRouter);
console.log("ordersRouter ->", typeof ordersRouter);


function normalizeRouter(r, name) {
  if (!r) return null;
  if (typeof r === "function") return r; 
  if (r && typeof r === "object") {
   
    if (r.default && (typeof r.default === "function" || typeof r.default === "object")) return r.default;
    if (r.router && (typeof r.router === "function" || typeof r.router === "object")) return r.router;
  }
  console.warn(`${name} is not a function/router. Type:`, typeof r, "value:", r);
  return null;
}

const normalizedDishesRouter = normalizeRouter(dishesRouter, "dishesRouter");
const normalizedOrdersRouter = normalizeRouter(ordersRouter, "ordersRouter");

if (!normalizedDishesRouter || !normalizedOrdersRouter) {
  console.error("Router(s) invalid. Please check backend/routes/dishes.js and backend/routes/orders.js exports.");
  
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5000;


app.use(
  cors({
    origin: "http://localhost:3000"
  })
);
app.use(express.json());


app.use("/api/dishes", normalizedDishesRouter);
app.use("/api/orders", normalizedOrdersRouter);


app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
