import ProductCard from "./ProductCard";

function ProductList({ products, onDelete, onEdit }) {
  return (
    <>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </>
  );
}

export default ProductList;