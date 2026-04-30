const express = require("express");
const router = express.Router();
const { addProduct } = require("../Controllers/productController.js");


//add single product
router.post("/add",addProduct);

//update single product
router.put("/:id", async (req,res)=>{
    
}

);

//delete single product
router.delete("/:id", async (req,res)=>{

});

//get single product
router.get("/:id",async (req,res)=>{

});

//get all products
router.get("/",async (req,res)=>{

});

module.exports = router;