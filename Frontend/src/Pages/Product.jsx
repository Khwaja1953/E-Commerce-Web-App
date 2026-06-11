import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import API from "../services/Axios";

function Product() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (id) {
      fetchSingleProduct(id);
    } else {
      fetchAllProducts();
    }
  }, [id, category]);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await API.get(`/product?category=${category}&search=${search}`);
      setProducts(data.product || []);
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchAllProducts();
  };

  const fetchSingleProduct = async (productId) => {
    try {
      setLoading(true);
      const { data } = await API.get(`/product/${productId}`);
      setProduct(data.product);
    } catch (err) {
      setError("Product not found");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      alert("Please login to add to cart");
      navigate("/login");
      return;
    }

    try {
      await API.post("/cart", { productId, quantity: 1 }, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      alert("Product added to cart!");
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart");
    }
  };

  if (loading) return <div className="p-10 text-center text-2xl">Loading...</div>;
  if (error) return <div className="p-10 text-center text-2xl text-red-600">{error}</div>;

  if (id && product) {
    return (
      <div className="max-w-7xl mx-auto p-4 md:p-10 flex flex-col md:flex-row gap-8 md:gap-16">
        <div className="w-full md:w-1/2">
          <img
            src={`http://localhost:3000/${product.image}`}
            alt={product.name}
            className="w-full h-[400px] md:h-[600px] object-cover rounded-3xl shadow-2xl"
          />
        </div>
        <div className="flex-1 py-4">
          <div className="flex gap-3 items-center">
            <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
              {product.category}
            </span>
            <span className={`px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider ${product.inStock ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 mt-4 leading-tight">
            {product.name}
          </h1>
          <p className="text-blue-600 text-3xl md:text-4xl font-black mt-6 tracking-tight">
            ₹{product.price}
          </p>
          
          <div className="mt-10 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 uppercase tracking-widest">Description</h3>
              <p className="text-gray-600 mt-3 text-lg leading-relaxed">{product.description}</p>
            </div>
            
            <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => addToCart(product._id)}
                disabled={!product.inStock}
                className={`flex-1 px-8 py-4 rounded-2xl text-xl font-bold transition-all transform active:scale-95 shadow-xl ${product.inStock ? 'bg-gray-900 text-white hover:bg-gray-800 cursor-pointer' : 'bg-gray-400 text-gray-600 cursor-not-allowed'}`}
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <button className="p-4 border-2 border-gray-100 rounded-2xl hover:bg-gray-50 transition">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="mt-10">
            <Link to="/products" className="text-gray-500 hover:text-gray-700 font-medium flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to all products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-10 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-black mb-10 text-gray-900 tracking-tighter">EXPLORE PRODUCTS</h1>
        
        {/* Filters */}
        <div className="mb-10 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between bg-white p-4 md:p-6 rounded-3xl shadow-sm">
          <form onSubmit={handleSearch} className="flex flex-1">
            <input
              type="text"
              placeholder="Search by name..."
              className="flex-1 p-3 border border-gray-100 rounded-l-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="bg-gray-900 text-white px-6 py-3 rounded-r-2xl font-bold hover:bg-black transition">
              Find
            </button>
          </form>

          <select
            className="p-3 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white min-w-[200px]"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-2xl transition-all duration-500 group">
              <Link to={`/product/${product._id}`} className="block overflow-hidden rounded-2xl relative">
                <img
                  src={`http://localhost:3000/${product.image}`}
                  alt={product.name}
                  className="h-64 w-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${product.inStock ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                  {product.inStock ? 'In Stock' : 'Out'}
                </span>
              </Link>
              <div className="mt-6 px-2">
                <span className="text-blue-600 text-xs font-black uppercase tracking-widest">{product.category}</span>
                <h2 className="text-xl font-bold text-gray-900 mt-1 line-clamp-1">
                  {product.name}
                </h2>
                <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center mt-6">
                  <p className="text-2xl font-black text-gray-900">
                    ₹{product.price}
                  </p>
                  <button
                    onClick={() => addToCart(product._id)}
                    disabled={!product.inStock}
                    className={`p-3 rounded-xl transition-colors transform active:scale-90 ${product.inStock ? 'bg-gray-900 text-white hover:bg-blue-600 cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Product;