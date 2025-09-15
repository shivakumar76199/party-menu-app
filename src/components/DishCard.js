// src/components/DishCard.js
import React from "react";

function DishCard({ dish, isSelected, onAddDish, onRemoveDish, onViewIngredients }) {
  return (
    <div className="dish-card">
      <div className="left">
        <img src={dish.image} alt={dish.name} className="dish-image" />
      </div>

      <div className="right">
        <div className="top-row">
          <h3 className="dish-name">{dish.name}</h3>
          <div className="badge-row">
            <div className={`veg-chip ${dish.type === "VEG" ? "veg" : "non-veg"}`}>
              {dish.type}
            </div>
            <div className="rating">
              ★ {dish.rating.toFixed(1)}
            </div>
          </div>
        </div>

        <p className="desc">{dish.description}</p>

        <div className="meta-row">
          <div className="prep-time">{dish.prepTime}</div>
          <div className="price">₹{dish.price}</div>
        </div>

        <div className="card-actions">
          {isSelected ? (
            <button className="btn remove" onClick={() => onRemoveDish(dish.id)}>Remove</button>
          ) : (
            <button className="btn add" onClick={() => onAddDish(dish.id)}>Add</button>
          )}

          <button className="btn ghost" onClick={() => onViewIngredients(dish)}>Ingredients</button>
        </div>
      </div>
    </div>
  );
}

export default DishCard;
