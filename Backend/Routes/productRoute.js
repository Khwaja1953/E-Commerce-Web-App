const express = require("express");
const router = express.Router();
const upload =require("../middleware/upload")

const {addProduct, updatedProduct,deletedProduct,getProduct,getAllProducts} = require('../Controllers/productController');

//add single product
router.post("/", upload.single("image"), addProduct);  


//update single product
router.put("/:id",  upload.single("image"),updatedProduct);

//delete single product
router.delete("/:id", deletedProduct)

//get single product
router.get("/:id",getProduct)

//get all products
router.get("/",getAllProducts)

module.exports = router;