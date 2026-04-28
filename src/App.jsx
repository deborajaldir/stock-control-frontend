import { useEffect, useState } from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import { getProducts, deleteProduct } from "./services/api";
import Toast from "./components/Toast";

function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const data = await getProducts();
    setProducts(data);
  }

  async function handleDelete(id) {
    await deleteProduct(id);
    setAlert({ type: "success", text: "Product deleted successfully" });
    loadProducts();
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Stock</h1>

      {/* ✅ TOAST NO LUGAR CERTO */}
      <Toast alert={alert} />

      <ProductForm
        onSuccess={loadProducts}
        editingProduct={editingProduct}
        setEditingProduct={setEditingProduct}
        setAlert={setAlert}
      />

      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ProductList
        products={filteredProducts}
        onDelete={handleDelete}
        onEdit={setEditingProduct}
      />
    </div>
  );
}

export default App;