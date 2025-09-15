
import React from "react";

const categories = ["ALL", "STARTER", "MAIN COURSE", "SIDES", "DESSERT"];

function Filters({ activeCategory, onCategoryChange, searchTerm, onSearchChange, vegOnly, onVegOnlyChange }) {
  return (
    <div className="filters">
      <div className="category-tabs">
        {categories.map(cat => (
          <button
            key={cat}
            className={`tab ${activeCategory === cat ? "active" : ""}`}
            onClick={() => onCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Search dishes..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        <label className="veg-checkbox">
          <input
            type="checkbox"
            checked={vegOnly}
            onChange={(e) => onVegOnlyChange(e.target.checked)}
          />
          Veg Only
        </label>
      </div>
    </div>
  );
}

export default Filters;
