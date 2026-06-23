import { useEffect, useMemo, useState } from "react";
import API from "../../services/Axios";

const ORDER_STATUSES = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

const statusStyles = {
  Pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  Processing: "bg-blue-50 text-blue-700 border-blue-200",
  Shipped: "bg-purple-50 text-purple-700 border-purple-200",
  Delivered: "bg-green-50 text-green-700 border-green-200",
  Cancelled: "bg-red-50 text-red-700 border-red-200",
};

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [filter, setFilter] = useState("All");

  const filteredOrders = useMemo(() => {
    if (filter === "All") return orders;
    return orders.filter((order) => order.orderStatus === filter);
  }, [filter, orders]);

  const getOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await API.get("/order/admin/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(data);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Unable to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      setUpdatingId(orderId);
      const token = localStorage.getItem("token");
      const { data } = await API.put(
        `/order/admin/${orderId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrders((prev) =>
        prev.map((order) => (order._id === orderId ? data.data : order))
      );
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Unable to update order status");
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-blue-600">Admin Dashboard</p>
            <h1 className="mt-1 text-3xl font-black text-gray-900">Order Management</h1>
            <p className="mt-2 text-sm text-gray-500">Review orders and move them through fulfillment.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {["All", ...ORDER_STATUSES].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setFilter(status)}
                className={`rounded-md px-4 py-2 text-sm font-bold transition ${
                  filter === status
                    ? "bg-gray-900 text-white"
                    : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="rounded-lg border border-gray-200 bg-white p-10 text-center shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">Loading orders...</h2>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center">
            <h2 className="text-xl font-bold text-gray-900">No orders found</h2>
            <p className="mt-2 text-sm text-gray-500">Orders matching this filter will appear here.</p>
          </div>
        ) : (
          <div className="grid gap-6 xl:grid-cols-2">
            {filteredOrders.map((order) => (
              <div key={order._id} className="rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Order #{order._id.slice(-8).toUpperCase()}</p>
                    <h2 className="mt-1 text-lg font-bold text-gray-900">{order.user?.name || "Customer"}</h2>
                    <p className="text-sm text-gray-500">{order.user?.email}</p>
                    <p className="mt-2 text-xs font-semibold text-gray-400">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <span className={`w-fit rounded-full border px-4 py-2 text-sm font-bold ${statusStyles[order.orderStatus]}`}>
                    {order.orderStatus}
                  </span>
                </div>

                <div className="space-y-4 p-5">
                  <div className="grid gap-3">
                    {order.orderItems.map((item) => (
                      <div key={item.product} className="flex items-center gap-4 rounded-md bg-gray-50 p-3">
                        <img
                          src={`http://localhost:3000/${item.image}`}
                          alt={item.name}
                          className="h-16 w-16 rounded-md object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <h3 className="truncate text-sm font-bold text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-500">Qty {item.quantity} x ₹{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid gap-4 rounded-md border border-gray-100 p-4 md:grid-cols-2">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Shipping Address</p>
                      <p className="mt-1 text-sm font-semibold text-gray-700">
                        {order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}, {order.shippingAddress?.country}
                      </p>
                    </div>
                    <div className="md:text-right">
                      <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Total</p>
                      <p className="mt-1 text-2xl font-black text-gray-900">₹{order.totalPrice}</p>
                    </div>
                  </div>

                  <div className="grid gap-3 border-t border-gray-100 pt-4 sm:grid-cols-2 lg:grid-cols-3">
                    {ORDER_STATUSES.filter((status) => status !== order.orderStatus).map((status) => (
                      <button
                        key={status}
                        type="button"
                        disabled={updatingId === order._id}
                        onClick={() => updateStatus(order._id, status)}
                        className="rounded-md border border-gray-200 px-4 py-3 text-sm font-bold text-gray-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {status === "Processing" ? "Accept" : status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminOrders;
