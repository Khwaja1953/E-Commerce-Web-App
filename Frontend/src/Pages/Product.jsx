// src/pages/Product.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/products/${id}`
      );

      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(
      (item) => item._id === product._id
    );

    if (existingItem) {
      existingItem.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product added to cart");
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-8">

          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[450px] object-cover rounded-lg"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-4">
              {product.name}
            </h1>

            <p className="text-gray-600 mb-4">
              {product.description}
            </p>

            <h2 className="text-3xl font-bold text-blue-600 mb-4">
              ₹{product.price}
            </h2>

            <p className="mb-4">
              Stock:
              <span className="font-semibold ml-2">
                {product.countInStock}
              </span>
            </p>

            <button
              onClick={addToCart}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition"
            >
              Add To Cart
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Product;