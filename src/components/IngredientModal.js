
import React from "react";

function IngredientModal({ dish, onClose }) {
  if (!dish) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{dish.name}</h2>
        <p>{dish.description}</p>

        <h4>Ingredients</h4>
        <ul>
          {dish.ingredients.map((ing, idx) => (
            <li key={idx}>{ing.name} — {ing.quantity}</li>
          ))}
        </ul>

        <button onClick={onClose} className="close-btn">Close</button>
      </div>
    </div>
  );
}

export default IngredientModal;
