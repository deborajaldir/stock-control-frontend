const BASE_URL = "https://stock-control-api-owvi.onrender.com//products";

export async function getProducts() {
  const response = await fetch(BASE_URL);
  return response.json();
}

export async function createProduct(product) {
  const response = await fetch("https://stock-control-api-owvi.onrender.com//products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error creating product");
  }

  return response.json();
}

export async function updateProduct(id, product) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  return response.json();
}

export async function deleteProduct(id) {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
}

export async function findProductByNameAndCategory(name, category) {
  const response = await fetch(
    `https://stock-control-api-owvi.onrender.com/products/search/name-category?name=${name}&category=${category}`
  );

  if (!response.ok) return null;

  return response.json();
}