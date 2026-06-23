const express = require("express");

const {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  updateOrderStatus
} = require("../Controllers/orderController");

const {
  protectedMiddleware,
} = require("../middleware/protected");
const { restrictedMiddleware } = require("../middleware/restrictedMiddleware");

const router = express.Router();

// CREATE ORDER
router.post(
  "/",
  protectedMiddleware,
  createOrder
);

// GET LOGGED IN USER ORDERS
router.get(
  "/my-orders",
  protectedMiddleware,
  getMyOrders
);


// GET ALL ORDERS FOR ADMIN
router.get(
  "/admin/all",
  protectedMiddleware,
  restrictedMiddleware("ADMIN"),
  getAllOrders
);

// UPDATE ORDER STATUS FOR ADMIN
router.put(
  "/admin/:id/status",
  protectedMiddleware,
  restrictedMiddleware("ADMIN"),
  updateOrderStatus
);

// GET SINGLE ORDER
router.get(
  "/:id",
  protectedMiddleware,
  getOrderById
);

// CANCEL ORDER
router.put(
  "/:id/cancel",
  protectedMiddleware,
  cancelOrder
);

module.exports = router;
