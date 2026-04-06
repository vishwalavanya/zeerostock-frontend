import { useState } from "react";

function SearchBar({ onSearch, error }) {
  const [q, setQ]               = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  function handleSearch() {
    onSearch({ q, category, minPrice, maxPrice });
  }

  // search on Enter key press
  function handleKeyDown(e) {
    if (e.key === "Enter") handleSearch();
  }

  return (
    <div className="search-panel">
      <div className="search-grid">

        <div className="input-group">
          <label>Product Name</label>
          <input
            type="text"
            placeholder="e.g. USB Cable, Chair..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="input-group">
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All</option>
            <option value="Electronics">Electronics</option>
            <option value="Stationery">Stationery</option>
            <option value="Furniture">Furniture</option>
            <option value="Healthcare">Healthcare</option>
          </select>
        </div>

        <div className="input-group">
          <label>Min Price</label>
          <input
            type="number"
            placeholder="0"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Max Price</label>
          <input
            type="number"
            placeholder="9999"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>

      </div>

      <button className="search-btn" onClick={handleSearch}>
        🔍 Search Inventory
      </button>

      {error && <div className="error-msg">⚠️ {error}</div>}
    </div>
  );
}

export default SearchBar;
