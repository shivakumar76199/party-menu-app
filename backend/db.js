
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const seedDishes = require("./data/seedDishes");


const DB_FILE = path.join(__dirname, "party_menu.db");


const db = new sqlite3.Database(DB_FILE, (err) => {
  if (err) {
    console.error("Failed to open DB:", err.message);
    process.exit(1);
  }
  console.log("Connected to sqlite database:", DB_FILE);
});


db.serialize(() => {

  db.run(
    `CREATE TABLE IF NOT EXISTS dishes (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      image TEXT,
      mealType TEXT,
      type TEXT,
      price REAL,
      rating REAL,
      prepTime TEXT
    )`
  );


  db.run(
    `CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_name TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER,
      dish_id INTEGER,
      qty INTEGER DEFAULT 1,
      FOREIGN KEY(order_id) REFERENCES orders(id),
      FOREIGN KEY(dish_id) REFERENCES dishes(id)
    )`
  );


  const insertStmt = db.prepare(
    `INSERT OR REPLACE INTO dishes (id, name, description, image, mealType, type, price, rating, prepTime)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );

  seedDishes.forEach(d => {
    insertStmt.run(
      d.id,
      d.name,
      d.description,
      d.image,
      d.mealType,
      d.type,
      d.price,
      d.rating,
      d.prepTime
    );
  });

  insertStmt.finalize();
});

module.exports = db;
