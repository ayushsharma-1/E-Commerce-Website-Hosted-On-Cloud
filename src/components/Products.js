// src/components/Products.js

import React, { useEffect, useState } from "react";

const Base_URL = "http://localhost:3001/products";

export const Products = ({ categoryId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let url = Base_URL;

    // If a category is selected, filter by categoryId
    if (categoryId !== null) {
      url = `${Base_URL}?catID=${categoryId}`;
    }

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [categoryId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  return (
    <div className="product-container">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src="" alt={product.title} />
          <h3>{product.title}</h3>
          <p>Product Description</p>
        </div>
      ))}
    </div>
  );
};
