import ProductCard from "./ProductCard";

// skeleton cards shown while loading
function SkeletonCards() {
  return (
    <div className="loading-grid">
      {Array(6).fill(0).map((_, i) => (
        <div className="skeleton-card" key={i}>
          <div className="skeleton" style={{ height: "18px", width: "60%" }}></div>
          <div className="skeleton" style={{ height: "22px", width: "85%" }}></div>
          <div className="skeleton" style={{ height: "16px", width: "40%" }}></div>
        </div>
      ))}
    </div>
  );
}

function ResultsTable({ results, loading }) {
  if (loading) return <SkeletonCards />;

  if (results.length === 0) {
    return (
      <div className="empty-state">
        <div className="emoji">🔍</div>
        <h3>No results found</h3>
        <p>Try adjusting your filters or search for something else</p>
      </div>
    );
  }

  return (
    <div className="cards-grid">
      {results.map((item, index) => (
        <ProductCard key={item.id} item={item} index={index} />
      ))}
    </div>
  );
}

export default ResultsTable;
