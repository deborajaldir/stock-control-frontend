import { useEffect, useState } from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import { getProducts, deleteProduct } from "./services/api";
import Toast from "./components/Toast";
import "./styles/App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [alert, setAlert] = useState(null);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

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

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;

  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="app-container">
      <div className="card">
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
        <div className="search-box">
          <input
            className="input"
            type="text"
            placeholder="Search by name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button className="btn-secondary" onClick={() => setSearch("")}>
            Clear
          </button>
        </div>

        {/* 📊 CONTADOR */}
        <p className="count">
          {search
            ? `${filteredProducts.length} result(s) found`
            : `${products.length} total product(s)`}
        </p>

        {/* ❌ / 📋 LISTA */}
        {filteredProducts.length === 0 ? (
          <p className="empty">No products found</p>
        ) : (
          <ProductList
            products={currentProducts}
            onDelete={handleDelete}
            onEdit={setEditingProduct}
            search={search}
          />
        )}

        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px" }}>
          <button
            className="btn-secondary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Prev
          </button>

          <span style={{ alignSelf: "center", fontSize: "14px" }}>
            Page {currentPage} of {totalPages || 1}
          </span>

          <button
            className="btn-secondary"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;