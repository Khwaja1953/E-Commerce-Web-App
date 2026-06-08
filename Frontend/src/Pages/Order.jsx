import { useEffect, useState } from "react";
import API from "../services/Axios";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        setLoading(false);
        return;
      }

      const { data } = await API.get("/order/my-orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-xl font-semibold">Loading Orders...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-10 tracking-tighter uppercase">
          ORDER HISTORY
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white p-12 rounded-[40px] shadow-sm text-center">
            <svg className="w-20 h-20 text-gray-200 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <p className="text-gray-500 text-xl font-medium">
              You haven't placed any orders yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-[40px] shadow-sm overflow-hidden border border-gray-100 group hover:shadow-xl transition-all duration-500"
              >
                {/* Order Header */}
                <div className="bg-gray-900 p-6 md:p-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-500 p-3 rounded-2xl shadow-lg shadow-blue-500/30">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-white font-black text-xl tracking-tight">
                        ORDER #{order._id.slice(-6).toUpperCase()}
                      </h2>
                      <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mt-1">
                        Placed on {new Date(order.createdAt).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-gray-400 text-sm uppercase font-black tracking-widest hidden sm:block">Status</span>
                    <span
                      className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest ${
                        order.orderStatus === "Delivered"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6 md:p-8">
                  <h3 className="text-gray-900 font-black text-lg uppercase tracking-widest mb-6 flex items-center gap-2">
                    <span className="w-8 h-px bg-gray-200" />
                    Items In Order
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {order.orderItems.map((item) => (
                      <div
                        key={item.product}
                        className="flex items-center gap-6 p-4 rounded-3xl bg-gray-50 border border-transparent hover:border-blue-100 hover:bg-white transition-all group/item"
                      >
                        <img
                          src={`http://localhost:3000/${item.image}`}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-2xl shadow-sm group-hover/item:scale-110 transition-transform duration-500"
                        />

                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 text-lg">
                            {item.name}
                          </h4>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-gray-400 text-xs font-black uppercase tracking-widest">Qty: {item.quantity}</span>
                            <span className="text-blue-600 font-black">₹{item.price}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Footer */}
                <div className="bg-gray-50 p-6 md:p-8 flex flex-col sm:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-600 font-bold uppercase text-xs tracking-widest">
                      Price verified & Secure transaction
                    </p>
                  </div>

                  <div className="flex items-end gap-6 text-right">
                    <div>
                      <p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1">Total Amount</p>
                      <h3 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter">
                        ₹{order.totalPrice}
                      </h3>
                    </div>
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

export default Order;