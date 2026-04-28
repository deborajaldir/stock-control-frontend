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
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  async function loadProducts() {
    const data = await getProducts();
    setProducts(data);
  }

  async function handleDelete(id) {
    await deleteProduct(id);
    setAlert({ type: "success", text: "Product deleted successfully" });
    loadProducts();
  }

  // 🔍 filtro
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    product.category.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Stock</h1>

      {/* 🔔 TOAST */}
      <Toast alert={alert} />

      {/* 📦 FORM */}
      <ProductForm
        onSuccess={loadProducts}
        editingProduct={editingProduct}
        setEditingProduct={setEditingProduct}
        setAlert={setAlert}
      />

      {/* 🔍 BUSCA */}
      <div style={{ margin: "20px 0", display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Search by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, padding: "8px" }}
        />

        <button onClick={() => setSearch("")}>
          Clear
        </button>
      </div>

      {/* 📊 CONTADOR DINÂMICO */}
      <p style={{ marginBottom: "10px", fontSize: "14px", color: "#555" }}>
        {search
          ? `${filteredProducts.length} result(s) found`
          : `${products.length} total product(s)`}
      </p>

      {/* ❌ MENSAGEM VAZIA */}
      {filteredProducts.length === 0 ? (
        <p style={{ color: "#999" }}>No products found</p>
      ) : (
        <ProductList
          products={filteredProducts}
          onDelete={handleDelete}
          onEdit={setEditingProduct}
          search={search}
        />
      )}
    </div>
  );
}

export default App;