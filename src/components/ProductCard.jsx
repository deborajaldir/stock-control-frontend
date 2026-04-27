function ProductCard({ product, onDelete, onEdit }) {
  return (
    <div>
      <p>{product.name}</p>
      <p>Quantity: {product.quantity}</p>
      <p>Price: {product.price}</p>
      <p>Category: {product.category}</p>

      <button onClick={() => onEdit(product)}>Edit</button>
      <button onClick={() => onDelete(product.id)}>Delete</button>

      <hr />
    </div>
  );
}

export default ProductCard;