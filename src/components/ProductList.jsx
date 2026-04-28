import ProductCard from "./ProductCard";

function ProductList({ products, onDelete, onEdit, search }) {
  return (
    <>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onDelete={onDelete}
          onEdit={onEdit}
          search={search}
        />
      ))}
    </>
  );
}

export default ProductList;