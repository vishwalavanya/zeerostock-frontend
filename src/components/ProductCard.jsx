// each product shows as a card with color coded category

function ProductCard({ item, index }) {
  const catClass = item.category.toLowerCase();

  return (
    <div
      className={`product-card cat-${catClass}`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="card-category">{item.category}</div>
      <div className="card-name">{item.name}</div>
      <div className="card-footer">
        <div className="card-price">
          ₹{item.price.toLocaleString()}
          <span>/unit</span>
        </div>
        <div className="card-qty">📦 {item.quantity} left</div>
      </div>
    </div>
  );
}

export default ProductCard;
