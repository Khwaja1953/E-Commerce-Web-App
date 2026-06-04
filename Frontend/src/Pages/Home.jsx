// src/pages/Home.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/product");
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
       {/* Hero */}

    <div className="bg-blue-600 text-white py-20 px-8">

    <div className="max-w-6xl mx-auto">

      <h1 className="text-5xl font-bold"> Welcome to Our Store 🛒</h1>

          <p className="mt-4 text-xl">Find the best products at amazing prices</p>

    </div>

    </div>
       {/* Products */}

      <div className="max-w-6xl mx-auto p-8">

        <h2 className="text-3xl font-bold mb-8">Latest Products </h2>
     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {products.map((product)=>(
         <div
          key={product._id}className="bg-white rounded-xl shadow-lg p-5 hover:scale-105 transition">
         <img src={product.image}alt={product.name}className="w-full h-56 object-cover rounded-lg"/>
 <h3 className="text-xl font-bold mt-4">{product.name}</h3>
 <p className="text-gray-600 mt-2">{product.description}</p>
 <p className="text-blue-600 text-2xl font-bold mt-3"> ₹{product.price}</p>
   <Link to={`/product/${product._id}`} className="inline-block mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg" >View Details</Link>
</div>
 ))}

 </div>
</div>
</div>
 );
};

export default Home;