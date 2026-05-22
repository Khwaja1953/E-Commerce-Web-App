const express = require("express");

const {
  createOrder,
  getMyOrders,
  getOrderById,
   cancelOrder
} = require("../controllers/orderController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();


// CREATE ORDER
router.post(
  "/",
  protect,
  createOrder
);


// GET LOGGED IN USER ORDERS
router.get(
  "/my-orders",
  protect,
  getMyOrders
);


// GET SINGLE ORDER
router.get(
  "/:id",
  protect,
  getOrderById
);
// CANCEL ORDER
router.put(
  "/:id/cancel",
  protect,
  cancelOrder
);


module.exports = router;
