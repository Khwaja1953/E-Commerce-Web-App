const express = require("express");

const {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder
} = require("../Controllers/orderController");

const {
  protectedMiddleware,
} = require("../middleware/protected");

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
