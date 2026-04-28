const BASE_URL = "http://localhost:8080/products";

export async function getProducts() {
  const response = await fetch(BASE_URL);
  return response.json();
}

export async function createProduct(product) {
  const response = await fetch("http://localhost:8080/products", {
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
    `http://localhost:8080/products/search/name-category?name=${name}&category=${category}`
  );

  if (!response.ok) return null;

  return response.json();
}