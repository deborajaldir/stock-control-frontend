function highlight(text, search) {
  if (!search) return text;

  const regex = new RegExp(`(${search})`, "gi");
  return text.split(regex).map((part, index) =>
    part.toLowerCase() === search.toLowerCase() ? (
      <mark key={index} style={{ backgroundColor: "#ffe58f" }}>
        {part}
      </mark>
    ) : (
      part
    )
  );
}

function ProductCard({ product, onDelete, onEdit, search }) {
  return (
    <div style={cardStyle}>
      <h3>{highlight(product.name, search)}</h3>
      <p>Quantity: {product.quantity}</p>
      <p>Price: ${product.price}</p>
      <p>{highlight(product.category, search)}</p>

      <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
        <button onClick={() => onEdit(product)} style={editBtn}>
          Edit
        </button>
        <button onClick={() => onDelete(product.id)} style={deleteBtn}>
          Delete
        </button>
      </div>
    </div>
  );
}

const cardStyle = {
  border: "1px solid #eee",
  padding: "15px",
  borderRadius: "12px",
  marginBottom: "10px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  background: "#fff",
};

const editBtn = {
  background: "#2196F3",
  color: "#fff",
  border: "none",
  padding: "6px 10px",
  borderRadius: "6px",
  cursor: "pointer",
};

const deleteBtn = {
  background: "#f44336",
  color: "#fff",
  border: "none",
  padding: "6px 10px",
  borderRadius: "6px",
  cursor: "pointer",
};

export default ProductCard;