// src/pages/Home.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/products");
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>All Products</h1>

      <div className="products-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img
              src={product.image}
              alt={product.name}
              width="200"
            />

            <h3>{product.name}</h3>

            <p>₹{product.price}</p>

            <Link to={`/product/${product._id}`}>
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;