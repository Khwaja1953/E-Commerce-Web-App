// src/pages/Orders.jsx

import { useEffect, useState } from "react";
import axios from "axios";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const { data } = await axios.get(
        "http://localhost:3000/api/orders/myorders",
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

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
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-600 text-center">
              No orders found.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow-md p-6"
              >
                {/* Order Header */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b pb-4">
                  <div>
                    <h2 className="font-bold text-lg">
                      Order #{order._id.slice(-6)}
                    </h2>

                    <p className="text-gray-500 text-sm">
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="mt-3 md:mt-0">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.isDelivered
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.isDelivered
                        ? "Delivered"
                        : "Processing"}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mt-5">
                  <h3 className="font-semibold mb-3">
                    Order Items
                  </h3>

                  <div className="space-y-3">
                    {order.orderItems.map((item) => (
                      <div
                        key={item.product}
                        className="flex items-center justify-between border rounded-lg p-3"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                          />

                          <div>
                            <h4 className="font-medium">
                              {item.name}
                            </h4>

                            <p className="text-gray-500 text-sm">
                              Qty: {item.qty}
                            </p>
                          </div>
                        </div>

                        <p className="font-semibold">
                          ₹{item.price}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="mt-6 border-t pt-4 flex flex-col md:flex-row md:justify-between">
                  <div>
                    <p
                      className={`font-medium ${
                        order.isPaid
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {order.isPaid
                        ? "Payment Completed"
                        : "Payment Pending"}
                    </p>
                  </div>

                  <div className="mt-2 md:mt-0">
                    <h3 className="text-xl font-bold text-blue-600">
                      Total: ₹{order.totalPrice}
                    </h3>
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