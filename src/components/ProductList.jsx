import ProductCard from "./ProductCard";

function ProductList({ products, onDelete, onEdit, search }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onDelete={onDelete}
          onEdit={onEdit}
          search={search}
        />
      ))}
    </div>
  );
}

export default ProductList;