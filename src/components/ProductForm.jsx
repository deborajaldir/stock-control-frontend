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

    const product = {
      name,
      quantity: Number(quantity),
      price: Number(price),
      category,
    };

    // 👉 verifica duplicado
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
    if (editingProduct) {
      await updateProduct(editingProduct.id, product);
      setAlert({ type: "success", text: "Product updated successfully" });
    } else {
      await createProduct(product);
      setAlert({ type: "success", text: "Product created successfully" });
    }

    resetForm();
    onSuccess();
  }

  function resetForm() {
    setName("");
    setQuantity("");
    setPrice("");
    setCategory("");
    setEditingProduct(null);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" />
        <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
        <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />

        <button type="submit">
          {editingProduct ? "Update" : "Register"}
        </button>
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