const express = require("express");
const router = express.Router();

const { addToCart, removeFromCart, updateCart, getCart } = require("../Controllers/cartController");

const { protectedMiddleware } = require("../middleware/protected");

router.use(protectedMiddleware);

// for fetching cart
router.get("/", getCart);

// for adding item in cart
router.post("/", addToCart);

// for deleting item
router.delete("/item", removeFromCart);

// for updating cart
router.put("/item", updateCart);

module.exports = router;