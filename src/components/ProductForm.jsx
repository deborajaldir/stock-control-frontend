import { useState, useEffect } from "react";
import { createProduct, updateProduct, findProductByNameAndCategory } from "../services/api";

function ProductForm({ onSuccess, editingProduct, setEditingProduct }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

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

  if (editingProduct) {
    await updateProduct(editingProduct.id, product);

  } else {
    const existing = await findProductByNameAndCategory(name, category);

    if (existing) {
      const confirmUpdate = window.confirm(
        "Product already exists.\n\nDo you want to update price and add quantity?"
      );

      if (confirmUpdate) {
        const updatedProduct = {
          ...existing,
          quantity: existing.quantity + product.quantity,
          price: product.price,
        };

        await updateProduct(existing.id, updatedProduct);
      }

    } else {
      await createProduct(product);
    }
  }

  setName("");
  setQuantity("");
  setPrice("");
  setCategory("");
  setEditingProduct(null);
  onSuccess();
}
  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" />
      <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
      <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />

      <button type="submit">
        {editingProduct ? "Update" : "Register"}
      </button>
    </form>
  );
}

export default ProductForm;