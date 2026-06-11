const express = require("express");
const router = express.Router();
const upload =require("../middleware/upload")

const {addProduct, updatedProduct,deletedProduct,getProduct,getAllProducts, toggleStock } = require('../Controllers/productController');
const {protectedMiddleware} = require("../middleware/protected");
const {restrictedMiddleware} = require("../middleware/restrictedMiddleware")

// Public routes
router.get("/",getAllProducts)
router.get("/:id",getProduct)

// Protected routes (require login)
router.use(protectedMiddleware);

// Admin only routes
router.post("/",restrictedMiddleware("ADMIN"), upload.single("image"), addProduct);  
router.put("/:id",restrictedMiddleware("ADMIN"),  upload.single("image"),updatedProduct);
router.delete("/:id",restrictedMiddleware("ADMIN"), deletedProduct)
router.patch("/:id/stock", restrictedMiddleware("ADMIN"), toggleStock);

module.exports = router;