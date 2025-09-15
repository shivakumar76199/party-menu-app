
import React from "react";
import DishCard from "./DishCard";

function DishList({ dishes, onAddDish, onRemoveDish, selectedDishes, onViewIngredients }) {
  if (!dishes.length) {
    return <div className="no-results">No dishes found.</div>;
  }

  return (
    <div className="dish-list">
      {dishes.map(d => (
        <DishCard
          key={d.id}
          dish={d}
          isSelected={selectedDishes.includes(d.id)}
          onAddDish={onAddDish}
          onRemoveDish={onRemoveDish}
          onViewIngredients={onViewIngredients}
        />
      ))}
    </div>
  );
}

export default DishList;
