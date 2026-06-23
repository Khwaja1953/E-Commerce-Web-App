const Order = require("../Models/order");
const Product = require("../Models/Product");
const Cart = require("../Models/cart");

// CREATE ORDER
const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, shippingPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({
        message: "No order items",
      });
    }

    const productIds = orderItems.map(item => item.product);
    const uniqueProductIds = [...new Set(productIds)];
    const products = await Product.find({
      _id: { $in: uniqueProductIds },
    });

    if (products.length !== uniqueProductIds.length) {
      return res.status(404).json({
        message: "Some products not found",
      });
    }

    // STEP 2: build updatedOrderItems and calculate itemsPrice
    let itemsPrice = 0;
    const formattedOrderItems = orderItems.map((item) => {
      const product = products.find(p => p._id.toString() === item.product);
      const itemTotalPrice = product.price * item.quantity;
      itemsPrice += itemTotalPrice;

      return {
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: item.quantity,
      };
    });

    // STEP 3: create order
    const order = new Order({
      user: req.user.id,
      orderItems: formattedOrderItems,
      shippingAddress,
      itemsPrice: itemsPrice,
      shippingPrice: shippingPrice || 0,
      totalPrice: itemsPrice + (Number(shippingPrice) || 0),
    });

    const createdOrder = await order.save();

    // STEP 4: Clear user cart
    await Cart.findOneAndDelete({ user: req.user.id });

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET LOGGED IN USER ORDERS
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET SINGLE ORDER
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CANCEL ORDER
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    // CHECK ORDER EXISTS
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // CHECK ORDER OWNER
    if (order.user.toString() !== req.user.id.toString()) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // PREVENT CANCEL AFTER DELIVERY
    if (order.orderStatus === "Delivered") {
      return res.status(400).json({
        message: "Delivered order cannot be cancelled",
      });
    }

    // PREVENT DUPLICATE CANCEL
    if (order.orderStatus === "Cancelled") {
      return res.status(400).json({
        message: "Order already cancelled",
      });
    }

    // UPDATE STATUS
    order.orderStatus = "Cancelled";
    order.cancelReason = req.body.reason || "No reason provided";
    order.cancelledAt = new Date();

    const updatedOrder = await order.save();

    res.json({
      success: true,
      message: "Order cancelled successfully",
      data: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL ORDERS FOR ADMIN
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "name email phoneNumber")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE ORDER STATUS FOR ADMIN
const updateOrderStatus = async (req, res) => {
  try {
    const { status, reason } = req.body;
    const allowedStatuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid order status",
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.orderStatus = status;
    order.isDelivered = status === "Delivered";
    order.deliveredAt = status === "Delivered" ? new Date() : undefined;

    if (status === "Cancelled") {
      order.cancelReason = reason || "Cancelled by admin";
      order.cancelledAt = new Date();
    } else {
      order.cancelReason = undefined;
      order.cancelledAt = undefined;
    }

    const updatedOrder = await order.save();
    await updatedOrder.populate("user", "name email phoneNumber");

    res.json({
      message: "Order status updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
};
