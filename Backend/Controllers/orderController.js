const Order = require("../models/orderModel");


// CREATE ORDER
const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (orderItems.length === 0) {
      return res.status(400).json({
        message: "No order items",
      });
    }

    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

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
      user: req.user._id,
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
    const order = await Order.findById(
      req.params.id
    ).populate(
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

    const order = await Order.findById(
      req.params.id
    );

    // CHECK ORDER EXISTS
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // CHECK ORDER OWNER
    if (
      order.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // PREVENT CANCEL AFTER DELIVERY
    if (order.status === "Delivered") {
      return res.status(400).json({
        message:
          "Delivered order cannot be cancelled",
      });
    }

    // PREVENT DUPLICATE CANCEL
    if (order.status === "Cancelled") {
      return res.status(400).json({
        message:
          "Order already cancelled",
      });
    }

    // UPDATE STATUS
    order.status = "Cancelled";

    order.cancelReason =
      req.body.reason || "No reason provided";

    order.cancelledAt = new Date();

    const updatedOrder =
      await order.save();

    res.json({
      success: true,
      message:
        "Order cancelled successfully",
      data: updatedOrder,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
   cancelOrder,
};