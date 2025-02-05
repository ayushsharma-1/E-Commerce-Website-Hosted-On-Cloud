import React, { useEffect, useState } from "react";

const Base_URL = "http://localhost:3001/products";

export const Products = ({ categoryId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let url = Base_URL;

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
          <img src={product.image} alt={product.title} />
          <div className="details">
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <div className="product-details">
              <div><strong>Specs:</strong></div>
              <ul>
                {product.specs.map((spec, index) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>
              <div><strong>Features:</strong></div>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="right-section">
            <div className="price">${product.price}</div>
            <div className={product.stock > 0 ? "in-stock" : "out-of-stock"}>
              {product.stock > 0 ? "In Stock" : "No Stock"}
            </div>
            <button className="btn">Buy Now</button>
          </div>
        </div>
      ))}
    </div>
  );
};
