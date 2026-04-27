import { useEffect, useState } from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import { getProducts, deleteProduct } from "./services/api";

function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const data = await getProducts();
    setProducts(data);
  }

  async function handleDelete(id) {
    await deleteProduct(id);
    loadProducts();
  }

  // 🔎 filtro por nome + categoria
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Stock</h1>

      <ProductForm
        onSuccess={loadProducts}
        editingProduct={editingProduct}
        setEditingProduct={setEditingProduct}
      />

      {/* 🔍 BUSCA */}
      <div style={{ margin: "20px 0" }}>
        <input
          type="text"
          placeholder="Search by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px",
            width: "250px",
            marginRight: "10px",
          }}
        />

        <button onClick={() => setSearch("")}>
          Clear
        </button>
      </div>

      {/* 📊 CONTAGEM */}
      <p>{filteredProducts.length} product(s) found</p>

      {/* ❌ MENSAGEM VAZIA */}
      {filteredProducts.length === 0 ? (
        <p>No products found</p>
      ) : (
        <ProductList
          products={filteredProducts}
          onDelete={handleDelete}
          onEdit={setEditingProduct}
        />
      )}
    </div>
  );
}

export default App;