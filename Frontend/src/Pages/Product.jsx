import { useEffect, useState } from "react";

function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
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
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg p-4 shadow"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-40 w-full object-cover rounded"
            />

            <h2 className="text-xl font-semibold mt-2">
              {product.name}
            </h2>

            <p className="text-gray-600">
              {product.description}
            </p>

            <p className="font-bold mt-2">
              ₹ {product.price}
            </p>

            <button className="bg-black text-white px-4 py-2 mt-3 w-full rounded">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;