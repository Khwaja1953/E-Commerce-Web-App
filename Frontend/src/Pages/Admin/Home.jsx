import { useEffect, useState } from "react";
import axios from "axios";

function AdminHome() {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  // Fetch all products
  const getProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/products"
      );

      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/products/${id}`
      );

      alert(res.data.message);

      setProducts((prev) =>
        prev.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Update product
  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/products/${editProduct._id}`,
        {
          name: editProduct.name,
          price: editProduct.price,
        }
      );

      alert(res.data.message);

      setProducts((prev) =>
        prev.map((product) =>
          product._id === editProduct._id
            ? { ...product, ...editProduct }
            : product
        )
      );

      setEditProduct(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Admin Product Management
      </h1>

      {/* Product List */}
      <div className="grid gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold">
                {product.name}
              </h2>
              <p className="text-gray-600">
                ₹{product.price}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setEditProduct(product)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Form */}
      {editProduct && (
        <div className="mt-8 border rounded-lg p-6 shadow">
          <h2 className="text-xl font-bold mb-4">
            Update Product
          </h2>

          <input
            type="text"
            value={editProduct.name}
            onChange={(e) =>
              setEditProduct({
                ...editProduct,
                name: e.target.value,
              })
            }
            className="w-full border p-2 rounded mb-3"
          />

          <input
            type="number"
            value={editProduct.price}
            onChange={(e) =>
              setEditProduct({
                ...editProduct,
                price: Number(e.target.value),
              })
            }
            className="w-full border p-2 rounded mb-3"
          />

          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>

            <button
              onClick={() => setEditProduct(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminHome;