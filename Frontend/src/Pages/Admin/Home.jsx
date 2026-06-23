import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminHome() {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
      category: "",
    image: null
  });

   const toggleStock = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        `http://localhost:3000/product/${id}/stock`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      getProducts(); // refresh list
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch all products
  const getProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/product"
      );
      console.log(res.data.product)
      setProducts(res.data.product);
    } catch (error) {
      console.log(error);
    }
  };

  // Add product
  const addProduct = async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem("token");
        console.log("TOKEN:", token);
        console.log("FORM IMAGE:", form.image);
        const formData = new FormData();

    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("image", form.image);

      await axios.post(
        "http://localhost:3000/product",formData  ,
        {
        headers: {
          Authorization: `Bearer ${token}`,
            // "Content-Type":"multipart/form-data"
        },
      },
      );
      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
        image: null
      });
      setShowAddProduct(false);
      getProducts();
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
       const token = localStorage.getItem("token");
      const res = await axios.delete(
        `http://localhost:3000/product/${id}`,
        {
          headers:{
      Authorization:`Bearer ${token}`
    }
  }
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
    const token = localStorage.getItem("token");

    const formData = new FormData();

    formData.append("name", editProduct.name);
    formData.append("description", editProduct.description);
    formData.append("price", editProduct.price);
    formData.append("category", editProduct.category);

    if (editProduct.image instanceof File) {
      formData.append("image", editProduct.image);
    }

    const res = await axios.put(
      `http://localhost:3000/product/${editProduct._id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
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
  if (showAddProduct) {
    return (
      <div className="min-h-screen bg-gray-100 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center">
          <div className="w-full rounded-lg border border-gray-200 bg-white shadow-xl">
            <div className="flex flex-col gap-4 border-b border-gray-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">New Product</p>
                <h1 className="mt-1 text-3xl font-bold text-gray-900">Add Product</h1>
                <p className="mt-2 text-sm text-gray-500">Create a catalog item with complete product details and a clean image.</p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddProduct(false)}
                className="rounded-md border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Back to Products
              </button>
            </div>

            <form onSubmit={addProduct} className="grid gap-6 p-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Product Name</label>
                <input
                  type="text"
                  placeholder="Product Name"
                  value={form.name}
                  onChange={(e) => setForm({
                    ...form,
                    name: e.target.value
                  })}
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Category</label>
                <input
                  type="text"
                  placeholder="Category"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Price</label>
                <input
                  type="number"
                  placeholder="Price"
                  value={form.price}
                  onChange={(e) => setForm({
                    ...form,
                    price: e.target.value
                  })}
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Product Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setForm({
                    ...form,
                    image: e.target.files[0]
                  })}
                  className="w-full rounded-md border border-dashed border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition file:mr-4 file:rounded-md file:border-0 file:bg-gray-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:bg-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700">Description</label>
                <textarea
                  placeholder="Description"
                  value={form.description}
                  onChange={(e) => setForm({
                    ...form,
                    description: e.target.value
                  })}
                  className="min-h-36 w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  required
                />
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 md:col-span-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddProduct(false)}
                  className="rounded-md border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-md bg-green-600 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-sm transition hover:bg-green-700"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Admin Product Management
      </h1>

      <div className="mb-8 flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Admin Dashboard</p>
          <h2 className="mt-1 text-2xl font-bold text-gray-900">Products</h2>
          <p className="mt-1 text-sm text-gray-500">Manage your catalog, stock status, and product details.</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            to="/admin/orders"
            className="inline-flex items-center justify-center rounded-md border border-gray-300 px-5 py-3 text-sm font-bold uppercase tracking-wide text-gray-700 transition hover:bg-gray-50"
          >
            Manage Orders
          </Link>

          <button
            type="button"
            onClick={() => setShowAddProduct(true)}
            className="inline-flex items-center justify-center rounded-md bg-gray-900 px-5 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-sm transition hover:bg-blue-600"
          >
            Add New Product
          </button>
        </div>
      </div>

      {/* Product List */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="aspect-square bg-gray-100">
                <img
                  src={`http://localhost:3000/${product.image}`}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="space-y-4 p-5">
                <div>
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-blue-600">{product.category}</p>
                      <h2 className="mt-1 line-clamp-2 text-lg font-bold text-gray-900">{product.name}</h2>
                    </div>
                    <p className="shrink-0 rounded-md bg-gray-100 px-3 py-1 text-sm font-bold text-gray-900">₹{product.price}</p>
                  </div>
                  <p className="line-clamp-3 text-sm leading-6 text-gray-500">{product.description}</p>
                </div>

                <div className="flex items-center justify-between rounded-md bg-gray-50 px-4 py-3">
                  <span className={`text-sm font-bold ${product.inStock ? "text-green-700" : "text-red-700"}`}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>

                  <button
                    type="button"
                    onClick={() => toggleStock(product._id)}
                    aria-pressed={product.inStock}
                    className={`relative h-7 w-14 rounded-full transition ${product.inStock ? "bg-green-500" : "bg-gray-300"}`}
                  >
                    <span
                      className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${product.inStock ? "left-8" : "left-1"}`}
                    />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setEditProduct(product)}
                    className="rounded-md bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(product._id)}
                    className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700 transition hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center sm:col-span-2 lg:col-span-3">
            <h2 className="text-xl font-bold text-gray-900">No products found</h2>
            <p className="mt-2 text-sm text-gray-500">Add your first product to start building the catalog.</p>
          </div>
        )}
      </div>

      {/* Edit Form */}
      {editProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 px-4 py-6">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white shadow-2xl">
            <div className="flex flex-col gap-3 border-b border-gray-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Edit Product</p>
                <h2 className="mt-1 text-2xl font-bold text-gray-900">Update Product Details</h2>
              </div>

              <button
                type="button"
                onClick={() => setEditProduct(null)}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Close
              </button>
            </div>

            <div className="grid gap-5 p-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Product Name</label>
                <input
                  type="text"
                  value={editProduct.name}
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,
                      name: e.target.value,
                    })
                  }
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Price</label>
                <input
                  type="number"
                  value={editProduct.price}
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,
                      price: Number(e.target.value),
                    })}
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700">Description</label>
                <textarea
                  value={editProduct.description}
                  onChange={(e) =>
                    setEditProduct({
                     ...editProduct,
                   description: e.target.value
                  })}
                   className="min-h-28 w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Category</label>
                <input
                 type="text"
                 value={editProduct.category}
                 onChange={(e) =>
                   setEditProduct({
                   ...editProduct,
                  category: e.target.value
                 })}
                 className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
               />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Replace Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setEditProduct({
                    ...editProduct,
                    image: e.target.files[0]
                     })}
                     className="w-full rounded-md border border-dashed border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition file:mr-4 file:rounded-md file:border-0 file:bg-gray-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:bg-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 md:col-span-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setEditProduct(null)}
                  className="rounded-md border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleUpdate}
                  className="rounded-md bg-green-600 px-5 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-sm transition hover:bg-green-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminHome;
