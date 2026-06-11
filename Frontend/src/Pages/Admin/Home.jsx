import { useEffect, useState } from "react";
import axios from "axios";

function AdminHome() {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
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
        image:null
      });
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
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Admin Product Management
      </h1>

      {/* Add Product Form */}
      <form onSubmit={addProduct} className="mb-8 border rounded-lg p-6 shadow">
        <h2 className="text-xl font-bold mb-4">Add New Product</h2>
        <input
          type="text"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({
            ...form,
            name: e.target.value
          })}
          className="w-full border p-2 rounded mb-3"
          required
        />

        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({
            ...form,
            description: e.target.value
          })}
          className="w-full border p-2 rounded mb-3"
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({
            ...form,
            price: e.target.value
          })}
          className="w-full border p-2 rounded mb-3"
          required
        />
        
        <input
  type="text"
  placeholder="Category"
  value={form.category}
  onChange={(e)=>setForm({...form, category:e.target.value})}
  className="w-full border p-2 rounded mb-3"
          required
/>
       <input
         type="file"
         accept="image/*"
         onChange={(e) =>setForm({
           ...form,
          image: e.target.files[0]
         })}
         className="w-full border p-2 rounded mb-3"
          required
       />

        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Add Product
        </button>
      </form>

      {/* Product List */}
      <div className="grid gap-4">

        {
        products.length > 0 &&(

      
        products.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <img src={`http://localhost:3000/${product.image}`}alt={product.name} className="w-32 h-32 object-cover rounded"/>
              <h2 className="text-lg font-semibold">
                {product.name}
              </h2>
               <p className="text-gray-500">
                 {product.description}
              </p>
              <p className="text-gray-600">
                ₹{product.price}
              </p>
            </div>

            <div className="flex gap-2 flex-wrap items-center">
              <div className="w-full sm:w-auto">
                <span className={`px-4 py-2 rounded font-semibold text-white ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
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

              <button
                onClick={() => toggleStock(product._id)}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                

               Toggle Stock
              </button>

            </div>
          </div>
        ))  )}
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
              })}
            className="w-full border p-2 rounded mb-3"
          />
          
          <input
            type="text"
            value={editProduct.description}
            onChange={(e) =>
              setEditProduct({
               ...editProduct,
             description: e.target.value
            })}
             className="w-full border p-2 rounded mb-3"
          />

         <input
           type="text"
           value={editProduct.category}
           onChange={(e) =>
             setEditProduct({
             ...editProduct,
            category: e.target.value
           })}
           className="w-full border p-2 rounded mb-3"
         />

       <input
          type="file"
          onChange={(e) =>
            setEditProduct({
            ...editProduct,
            image: e.target.files[0]
             })}
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
