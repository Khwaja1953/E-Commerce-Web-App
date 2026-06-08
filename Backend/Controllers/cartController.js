const Cart = require('../Models/cart')
const Product = require("../Models/Product");

const addToCart = async(req,res)=>{
    try{
        const userId = req.user.id;
          const { productId, quantity } = req.body;
           
          // check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // find cart of user
    let cart = await Cart.findOne({ user: userId });

    // if cart does not exist, create one
    if (!cart) {
      cart = new Cart({
        user: userId,
         products: [
          {
            product: productId,
            quantity: quantity || 1,
          },
        ],
      });
    } else {
      // check if product already exists in cart
      const existingProduct = cart.products.find(
        item => item.product.toString() === productId
      );
      if (existingProduct) {
        // increase quantity
        existingProduct.quantity += quantity || 1;
      } else {
        // add new product
        cart.products.push({
          product: productId,
          quantity: quantity || 1,
        });
      }
    }

    await cart.save();
    res.status(200).json({
      message: "Product added to cart",
      cart,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    // 1. Check productId is provided
    if (!productId) {
      return res.status(400).json({
        message: "productId is required",
      });
    }
        // 2. Find user cart
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }
// 3. Check if product exists in cart
    const productExists = cart.products.some(
      (item) => item.product.toString() === productId
    );

    if (!productExists) {
      return res.status(404).json({
        message: "Product not found in cart",
      });
    }

    // 4. Remove product from cart
    cart.products = cart.products.filter(
      (item) => item.product.toString() !== productId
    );
        // 5. Save updated cart
    await cart.save();

    return res.status(200).json({
      message: "Product removed from cart successfully",
      cart,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


 const updateCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    // quantity validation
    if (quantity < 1) {
      return res.status(400).json({message: "Quantity must be at least 1",});
    }

    // find cart
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // find product in cart
    const item = cart.products.find(
      item => item.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ message: "Product not in cart" });
    }

    // update quantity
    item.quantity = quantity;

    await cart.save();

     res.status(200).json({
      message: "Cart updated successfully",
      cart,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate("products.product");

    if (!cart) {
      return res.status(200).json({
        message: "Cart is empty",
        products: [],
      });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {addToCart, removeFromCart, updateCart, getCart}
