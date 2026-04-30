const Product = require('../Models/Product');

const addProduct = async (req,res)=>{
    try {
        const {name, description, price, category, image} = req.body;
        if (!name || !description || !price || !category || ! image){
            return res.status(400).json({error: "All properties are required"})
        }
        const product = await Product.create({name, description, price, category, image})
        if (!product){
            return res.status(400).json({error: "something went wrong please try again later"})
        }


        return res.status(201).json({message: "Product Added successfully"});
    } catch (error) {
        res.status(500).json({error})
    }
}

module.exports = {addProduct}