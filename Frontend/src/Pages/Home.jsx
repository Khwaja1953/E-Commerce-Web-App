// src/pages/Home.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/Axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get(`/product?category=${category}&search=${search}`);
      setProducts(data.product || []);
    } catch (error) {
      console.error(error);
      setProducts([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Elevate Your Style 🛒
          </h1>
          <p className="mt-6 text-lg md:text-2xl text-blue-100 max-w-2xl">
            Discover our curated collection of premium products at prices you'll love.
          </p>
          <div className="mt-10">
            <Link to="/products" className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-lg">
              Shop All Products
            </Link>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          <form onSubmit={handleSearch} className="flex flex-1">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="flex-1 p-3 border border-gray-200 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-r-xl font-bold hover:bg-blue-700 transition">
              Search
            </button>
          </form>

          <div className="flex flex-col md:flex-row gap-4">
            <select
              className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white min-w-[200px]"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Home">Home</option>
              <option value="Books">Books</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800">Featured Products</h2>
          <Link to="/products" className="text-blue-600 font-semibold hover:underline">View All</Link>
        </div>
        
        {products.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <p className="text-gray-500 text-xl">We couldn't find any products matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden"
              >
                <Link to={`/product/${product._id}`} className="block relative">
                  <img
                    src={`http://localhost:3000/${product.image}`}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-blue-600 font-bold text-sm shadow-sm">
                    ₹{product.price}
                  </div>
                </Link>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 line-clamp-1">{product.name}</h3>
                  <p className="text-gray-500 mt-2 text-sm line-clamp-2">{product.description}</p>
                  <div className="mt-6 flex items-center justify-between">
                    <Link
                      to={`/product/${product._id}`}
                      className="text-blue-600 font-bold hover:text-blue-700 transition"
                    >
                      Details →
                    </Link>
                    <button className="bg-gray-100 p-2 rounded-lg hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;