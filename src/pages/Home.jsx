const [editingProduct, setEditingProduct] = useState(null);

<ProductForm
  onSuccess={loadProducts}
  editingProduct={editingProduct}
  setEditingProduct={setEditingProduct}
/>

<ProductList
  products={products}
  onDelete={loadProducts}
  onEdit={setEditingProduct}
/>