// src/pages/Home.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    const dummyProducts = [
      {
        _id: "1",
        name: "Wireless Headphones",
        description: "Noise-cancelling Bluetooth headphones.",
        price: 2499,
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      },
      {
        _id: "2",
        name: "Smart Watch",
        description: "Track fitness and receive notifications.",
        price: 3999,
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
      },
      {
        _id: "3",
        name: "Gaming Mouse",
        description: "RGB gaming mouse with 7 programmable buttons.",
        price: 1299,
        image:
          "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500",
      },
      {
        _id: "4",
        name: "Mechanical Keyboard",
        description: "Blue switches with RGB backlight.",
        price: 2999,
        image:
          "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500",
      },
      {
        _id: "5",
        name: "Laptop Stand",
        description: "Adjustable aluminum laptop stand.",
        price: 899,
        image:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500",
      },
      {
        _id: "6",
        name: "USB-C Hub",
        description: "7-in-1 USB-C hub with HDMI support.",
        price: 1499,
        image:
          "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
      },
    ];

    setProducts(dummyProducts);
  };

  return (
    <div
      className="container"
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        All Products
      </h1>

      <div
        className="products-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product._id}
            className="product-card"
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              textAlign: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />

            <h3 style={{ marginTop: "15px" }}>{product.name}</h3>

            <p style={{ color: "#666", minHeight: "50px" }}>
              {product.description}
            </p>

            <p
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "green",
              }}
            >
              ₹{product.price}
            </p>

            <Link
              to={`/product/${product._id}`}
              style={{
                display: "inline-block",
                marginTop: "10px",
                padding: "10px 15px",
                backgroundColor: "#007bff",
                color: "#fff",
                textDecoration: "none",
                borderRadius: "5px",
              }}
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;