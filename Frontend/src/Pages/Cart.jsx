import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/Axios";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      navigate("/login");
      return;
    }

    try {
      const { data } = await API.get("/cart", {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setCart(data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    try {
      await API.put("/cart/item", { productId, quantity }, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      fetchCart();
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const removeItem = async (productId) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    try {
      await API.delete("/cart/item", {
        data: { productId },
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      fetchCart();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const checkout = async () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!cart || cart.products.length === 0) return;

    try {
      // 1. Fetch latest user profile to check address
      const { data: userProfile } = await API.get("/user/profile", {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });

      const addr = userProfile.address;
      if (!addr || !addr.street || !addr.city || !addr.pincode) {
        alert("Please complete your shipping address in your profile before checking out.");
        navigate("/profile");
        return;
      }

      // 2. Proceed with order
      const orderItems = cart.products.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      }));

      await API.post(
        "/order",
        {
          orderItems,
          shippingAddress: {
            address: addr.street,
            city: addr.city,
            postalCode: addr.pincode,
            country: addr.country || "India",
          },
          shippingPrice: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      alert("Order placed successfully!");
      navigate("/order");
    } catch (error) {
      console.error("Error during checkout:", error);
      alert(error.response?.data?.message || "Checkout failed");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading cart...</div>;

  if (!cart || !cart.products || cart.products.length === 0) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <Link to="/products" className="text-blue-600 mt-4 inline-block">Go Shopping</Link>
      </div>
    );
  }

  const totalPrice = cart.products.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-10 min-h-screen bg-gray-50">
      <h1 className="text-3xl md:text-5xl font-black mb-10 text-gray-900 tracking-tighter uppercase">YOUR CART</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items List */}
        <div className="flex-1 space-y-4">
          {cart.products.map((item) => (
            <div key={item.product._id} className="bg-white p-4 md:p-6 rounded-3xl shadow-sm flex flex-col sm:flex-row items-center gap-6 group hover:shadow-md transition-shadow">
              <Link to={`/product/${item.product._id}`} className="w-full sm:w-32 h-32 overflow-hidden rounded-2xl">
                <img
                  src={`http://localhost:3000/${item.product.image}`}
                  alt={item.product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </Link>
              
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl font-bold text-gray-900">{item.product.name}</h3>
                <div className="flex gap-2 items-center justify-center sm:justify-start mt-1">
                  <p className="text-blue-600 font-bold text-lg">₹{item.product.price}</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${item.product.inStock ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {item.product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                
                <div className="flex items-center justify-center sm:justify-start gap-4 mt-4">
                  <div className="flex items-center bg-gray-50 border border-gray-100 rounded-xl overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                      className="px-4 py-2 hover:bg-gray-200 transition text-gray-600 font-bold"
                    >-</button>
                    <span className="px-4 py-2 font-bold text-gray-900 min-w-[40px] text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                      className="px-4 py-2 hover:bg-gray-200 transition text-gray-600 font-bold"
                    >+</button>
                  </div>
                  <button
                    onClick={() => removeItem(item.product._id)}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                    title="Remove item"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="hidden md:block text-right">
                <p className="text-sm text-gray-400 uppercase font-black tracking-widest mb-1">Subtotal</p>
                <p className="text-2xl font-black text-gray-900">₹{item.product.price * item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:w-96">
          <div className="bg-gray-900 text-white p-8 rounded-[40px] shadow-2xl sticky top-24">
            <h2 className="text-2xl font-black mb-8 border-b border-gray-800 pb-4 uppercase tracking-tighter">Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-400">
                <span>Items Count</span>
                <span className="text-white font-bold">{cart.products.length}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span className="text-green-400 font-bold uppercase text-xs mt-1">Free</span>
              </div>
              <div className="pt-4 border-t border-gray-800 flex justify-between items-end">
                <span className="text-xl font-bold uppercase tracking-widest text-gray-500">Total</span>
                <span className="text-4xl font-black text-blue-400">₹{totalPrice}</span>
              </div>
            </div>

            <button
              onClick={checkout}
              className="w-full bg-blue-500 text-white py-5 rounded-2xl font-black text-xl hover:bg-blue-600 transition-all transform active:scale-95 shadow-xl shadow-blue-500/20 uppercase tracking-widest"
            >
              Checkout Now
            </button>
            
            <p className="text-center text-gray-500 text-xs mt-6 uppercase tracking-widest font-bold">
              Secure Checkout • 100% Satisfaction
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;