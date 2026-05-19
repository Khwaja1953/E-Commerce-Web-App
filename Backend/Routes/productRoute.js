const express = require("express");
const router = express.Router();
const upload =require("../middleware/upload")

const {addProduct, updatedProduct,deletedProduct,getProduct,getAllProducts} = require('../Controllers/productController');
const {protectedMiddleware} = require("../middleware/protected");
const {restrictedMiddleware} = require("../middleware/restrictedMiddleware")

router.use(protectedMiddleware);

//add single product
router.post("/",restrictedMiddleware("ADMIN"), upload.single("image"), addProduct);  


//update single product
router.put("/:id",restrictedMiddleware("ADMIN"),  upload.single("image"),updatedProduct);

//delete single product
router.delete("/:id",restrictedMiddleware("ADMIN"), deletedProduct)

//get single product
router.get("/:id",getProduct)

//get all products
router.get("/",getAllProducts)

module.exports = router;