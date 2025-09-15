
import React, { useState, useEffect } from "react";
import "./App.css";

import Filters from "./components/Filters";
import DishList from "./components/DishList";
import IngredientModal from "./components/IngredientModal";

function App() {

  const [allDishes, setAllDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

 
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [vegOnly, setVegOnly] = useState(false);

 
  const [selectedDishes, setSelectedDishes] = useState([]); 
  const [currentDish, setCurrentDish] = useState(null);


  const [customerName, setCustomerName] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderResult, setOrderResult] = useState(null); 


  useEffect(() => {
    setLoading(true);
    setLoadError(null);
    fetch("http://localhost:5000/api/dishes")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setAllDishes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load dishes:", err);
        setLoadError("Failed to load dishes from backend. Is the backend running?");
        setLoading(false);
      });
  }, []);

  // Filtering logic (category + search + veg)
  const filteredDishes = allDishes.filter((d) => {
    const categoryMatches = selectedCategory === "ALL" || d.mealType === selectedCategory;
    const searchMatches = d.name.toLowerCase().includes(searchTerm.toLowerCase());
    const vegMatches = !vegOnly || d.type === "VEG";
    return categoryMatches && searchMatches && vegMatches;
  });

  // Selection handlers
  const addDish = (id) => {
    setSelectedDishes((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const removeDish = (id) => {
    setSelectedDishes((prev) => prev.filter((x) => x !== id));
  };

  const clearSelection = () => {
    setSelectedDishes([]);
    setOrderResult(null);
  };

  const onViewIngredients = (dish) => setCurrentDish(dish);
  const onCloseModal = () => setCurrentDish(null);

  
  const selectedDishObjects = selectedDishes
    .map((id) => allDishes.find((d) => d.id === id))
    .filter(Boolean);

  
  const placeOrder = async () => {
    if (selectedDishes.length === 0) return;
    setPlacingOrder(true);
    setOrderResult(null);

    
    const items = selectedDishes.map((id) => ({ dishId: id, qty: 1 }));

    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: customerName || "Guest",
          items
        })
      });

      const body = await res.json();
      if (!res.ok) {
        throw new Error(body.error || `Server responded ${res.status}`);
      }

      setOrderResult({ orderId: body.orderId });
      
      setSelectedDishes([]);
    } catch (err) {
      console.error("Place order failed:", err);
      setOrderResult({ error: err.message || "Failed to place order" });
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Party Menu Selection</h1>
        <p>Choose dishes for your party — filter, search, view ingredients and add to your selection.</p>
      </header>

      <Filters
        activeCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        vegOnly={vegOnly}
        onVegOnlyChange={setVegOnly}
      />

      <main>
        <section className="menu-section">
          <h2>Menu</h2>

          {loading ? (
            <div style={{ padding: 20 }}>Loading dishes...</div>
          ) : loadError ? (
            <div style={{ padding: 20, color: "crimson" }}>
              {loadError}
              <div style={{ marginTop: 8 }}>
                Try running backend: <code>node backend/app.js</code>
              </div>
            </div>
          ) : (
            <DishList
              dishes={filteredDishes}
              onAddDish={addDish}
              onRemoveDish={removeDish}
              selectedDishes={selectedDishes}
              onViewIngredients={onViewIngredients}
            />
          )}
        </section>

        <aside className="summary">
          <h2>Selected Items ({selectedDishes.length})</h2>

          {selectedDishObjects.length === 0 ? (
            <p>No items selected yet.</p>
          ) : (
            <ul>
              {selectedDishObjects.map((d) => (
                <li key={d.id}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <strong>{d.name}</strong>
                      <div style={{ fontSize: 12, color: "#6b7280" }}>{d.mealType}</div>
                    </div>

                    <div>
                      <span style={{ marginRight: 8, fontWeight: 700 }}>₹{d.price}</span>
                      <button className="small-btn" onClick={() => removeDish(d.id)}>Remove</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div style={{ marginTop: 12 }}>
            <label style={{ display: "block", fontSize: 13, color: "#374151", marginBottom: 6 }}>
              Your name
            </label>
            <input
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter your name (optional)"
              style={{
                width: "100%",
                padding: "8px 10px",
                borderRadius: 8,
                border: "1px solid #e6e9ef",
                marginBottom: 10
              }}
            />

            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={placeOrder}
                disabled={selectedDishes.length === 0 || placingOrder}
                style={{
                  flex: 1,
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "none",
                  background: selectedDishes.length === 0 ? "#E5E7EB" : "#ff6f00",
                  color: selectedDishes.length === 0 ? "#9CA3AF" : "white",
                  fontWeight: 700,
                  cursor: selectedDishes.length === 0 ? "not-allowed" : "pointer"
                }}
              >
                {placingOrder ? "Placing..." : `Place Order (${selectedDishes.length})`}
              </button>

              <button
                onClick={clearSelection}
                disabled={selectedDishes.length === 0}
                style={{
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "1px solid #E6E9EF",
                  background: "white",
                  cursor: selectedDishes.length === 0 ? "not-allowed" : "pointer"
                }}
              >
                Clear All
              </button>
            </div>

           {/* Order result */}
            {orderResult && orderResult.orderId && (
              <div style={{ marginTop: 10, padding: 10, borderRadius: 8, background: "#ecfdf5", color: "#065f46" }}>
                Order placed! Order ID: <strong>{orderResult.orderId}</strong>
              </div>
            )}
            {orderResult && orderResult.error && (
              <div style={{ marginTop: 10, padding: 10, borderRadius: 8, background: "#fff1f2", color: "#9f1239" }}>
                Failed to place order: {orderResult.error}
              </div>
            )}
          </div>
        </aside>
      </main>

      <IngredientModal dish={currentDish} onClose={onCloseModal} />

      <footer>
        <p>Assignment: Party Menu Selection App</p>
      </footer>
    </div>
  );
}

export default App;
