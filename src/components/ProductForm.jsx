import { useState, useEffect } from "react";
import {
  createProduct,
  updateProduct,
  findProductByNameAndCategory,
} from "../services/api";
import ConfirmModal from "./ConfirmModal";

function ProductForm({ onSuccess, editingProduct, setEditingProduct, setAlert }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingProduct, setPendingProduct] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setQuantity(editingProduct.quantity);
      setPrice(editingProduct.price);
      setCategory(editingProduct.category);
    }
  }, [editingProduct]);

  async function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

    if (!name) newErrors.name = "Name is required";
    if (!category) newErrors.category = "Category is required";

    if (isNaN(quantity) || Number(quantity) <= 0) {
      newErrors.quantity = "Enter a valid quantity";
    }

    if (isNaN(price) || Number(price) <= 0) {
      newErrors.price = "Enter a valid price";
    }

    // 👉 se tiver erro, salva e PARA
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // limpa erros se estiver tudo ok
    setErrors({});

    const product = {
      name,
      quantity: Number(quantity),
      price: Number(price),
      category,
    };

    if (!editingProduct) {
      const existing = await findProductByNameAndCategory(name, category);

      if (existing && existing.price !== product.price) {
        setPendingProduct(product);
        setShowConfirm(true);
        return;
      }
    }

    await saveProduct(product);
  }

  async function saveProduct(product) {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, product);
        setAlert({ type: "success", text: "Product updated successfully" });
      } else {
        await createProduct(product);
        setAlert({ type: "success", text: "Product created successfully" });
      }

      resetForm();
      onSuccess();

    } catch (error) {
      setAlert({
        type: "error",
        text: error.message || "Failed to save product",
      });
    }
  }

  function resetForm() {
    setName("");
    setQuantity("");
    setPrice("");
    setCategory("");
    setEditingProduct(null);
    setErrors({});
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          className={`input ${errors.name ? "input-error" : ""}`}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setErrors((prev) => ({ ...prev, name: null }));
          }}
          placeholder="Name"
        />

        {errors.name && <p style={{ color: "#be123c", fontSize: "12px" }}>{errors.name}</p>}

        <input
          className={`input ${errors.quantity ? "input-error" : ""}`}
          value={quantity}
          onChange={(e) => {
            setQuantity(e.target.value);
            setErrors((prev) => ({ ...prev, quantity: null }));
          }}
          placeholder="Quantity"
        />

        {errors.quantity && <p style={{ color: "#be123c", fontSize: "12px" }}>{errors.quantity}</p>}

        <input
          className={`input ${errors.price ? "input-error" : ""}`}
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
            setErrors((prev) => ({ ...prev, price: null }));
          }}
          placeholder="Price"
        />

        {errors.price && <p style={{ color: "#be123c", fontSize: "12px" }}>{errors.price}</p>}

        <input
          className={`input ${errors.category ? "input-error" : ""}`}
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setErrors((prev) => ({ ...prev, category: null }));
          }}
          placeholder="Category"
        />

        {errors.category && <p style={{ color: "#be123c", fontSize: "12px" }}>{errors.category}</p>}

        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <button type="submit" className="btn-primary">
            {editingProduct ? "Update" : "Register"}
          </button>

          <button
            type="button"
            className="btn-secondary"
            onClick={resetForm}
          >
            Clear
          </button>
        </div>
      </form>

      {/* 🔥 MODAL */}
      <ConfirmModal
        open={showConfirm}
        message="Product already exists with a different price. Do you want to update it?"
        onCancel={() => {
          setShowConfirm(false);
          setPendingProduct(null);
        }}
        onConfirm={async () => {
          await saveProduct(pendingProduct);
          setShowConfirm(false);
          setPendingProduct(null);
        }}
      />
    </>
  );
}

export default ProductForm;