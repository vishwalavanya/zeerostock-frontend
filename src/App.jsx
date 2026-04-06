import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import ResultsTable from "./components/ResultsTable";

const API = "https://zeerostock-backend-kkc2.onrender.com/search";

function App() {
  const [results, setResults]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");
  const [totalCount, setTotal]  = useState(0);

  // load all items on first render
  useEffect(() => {
    fetchResults({});
  }, []);

  async function fetchResults({ q, category, minPrice, maxPrice }) {
    setLoading(true);
    setError("");

    // validate price range before even calling API
    if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
      setError("Min price should not be greater than max price!");
      setLoading(false);
      return;
    }

    // build the URL with only the params that have values
    const params = new URLSearchParams();
    if (q)        params.append("q", q);
    if (category) params.append("category", category);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);

    const url = `${API}?${params.toString()}`;

    try {
      const res  = await fetch(url);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setResults([]);
        setTotal(0);
      } else {
        setResults(data.results);
        setTotal(data.count);
      }
    } catch (err) {
      setError("Could not connect to server. Please try again.");
      setResults([]);
      setTotal(0);
    }

    setLoading(false);
  }

  function handleClear() {
    fetchResults({});
  }

  return (
    <div>
      {/* Header */}
      <div className="header">
        <div className="header-badge">⚡ Surplus Inventory</div>
        <h1>ZeeroStock</h1>
        <p>Search and discover surplus products across all suppliers</p>
      </div>

      {/* Search Controls */}
      <SearchBar onSearch={fetchResults} error={error} />

      {/* Stats Bar */}
      {!loading && (
        <div className="stats-bar">
          <div className="result-count">
            <span>{totalCount}</span> items found
          </div>
          <button className="clear-btn" onClick={handleClear}>
            Clear filters
          </button>
        </div>
      )}

      {/* Results */}
      <ResultsTable results={results} loading={loading} />
    </div>
  );
}

export default App;
