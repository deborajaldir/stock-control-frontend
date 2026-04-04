import { useEffect, useState } from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import { getProducts, createProduct, deleteProduct } from "./services/api";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const data = await getProducts();
    setProducts(data);
  }

  async function handleCreate(product) {
    const newProduct = await createProduct(product);
    setProducts((prev) => [...prev, newProduct]);
  }

  async function handleDelete(id) {
    await deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div>
      <h1>Stock</h1>

      <ProductForm onCreate={handleCreate} />
      <ProductList products={products} onDelete={handleDelete} />
    </div>
  );
}

export default App;