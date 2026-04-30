const mongoose =require("mongoose");

const Product = require("../Models/product")
//add single product
const addProduct = async (req, res) => {
   console.log("BODY:", req.body);
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save(); 
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//update single product
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports ={addProduct}
