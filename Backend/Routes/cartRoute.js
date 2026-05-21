const express = require ('express')
const router = express.Router();

const{addToCart, removeFromCart, updateCart} = require('../Controllers/cartController')



const {protectedMiddleware} = require('../middleware/protected');

router.use(protectedMiddleware);


//for adding item in cart
router.post("/",addToCart);

//for deleting item
router.delete("/item",removeFromCart);

//for updating cart
router.put("/item",updateCart);


module.exports = router;