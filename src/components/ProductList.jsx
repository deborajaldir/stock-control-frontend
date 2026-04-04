function ProductList({ products, onDelete }) {
  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <p>{product.name}</p>
          <p>Quantity: {product.quantity}</p>
          <p>Price: {product.price}</p>
          <p>Category: {product.category}</p>

          <button onClick={() => onDelete(product.id)}>Delete</button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default ProductList;