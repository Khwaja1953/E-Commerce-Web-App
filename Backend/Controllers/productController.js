const Product = require('../Models/Product');

const addProduct = async (req, res) => {
    try {

        console.log("BODY:", req.body);
        console.log("FILE:", req.file);
        const { name, description, price, category } = req.body;
        const image = req.file ? req.file.path : null;

        if (!name || !description || !price || !category || !image) {
            return res.status(400).json({ error: "All properties are required" })
        }
        const product = await Product.create({ name, description, price, category, image })
        if (!product) {
            return res.status(400).json({ error: "something went wrong please try again later" })
        }


        return res.status(201).json({ message: "Product Added successfully" });
    } catch (error) {
        res.status(500).json({ error })
    }
};
//update single produc
const updatedProduct = async (req, res) => {
    try {
        const { name, price, description, category } = req.body;
        const image = req.file ? req.file.path : undefined;

        const updateData = {}
        if (name !== undefined) updateData.name = name;
        if (price !== undefined) updateData.price = price;
        if (description !== undefined) updateData.description = description;
        if (category !== undefined) updateData.category = category;
        if (image !== undefined) updateData.image = image;
        const product = await Product.findByIdAndUpdate(req.params.id, updateData);
        console.log(product)
        if (!product) { return res.status(404).json({ error: "product not updated" }) };

        return res.status(200).json({ message: "product update successfully" })




    } catch (error) {
        console.log(error)
        res.status(500).json({ error })

    }
};
//Deleted single product
const deletedProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findByIdAndUpdate(id,
            { isDeleted: true },

            { new: true }
        );
        if (!product)
            return res.status(404).json({ message: "product not found" })
        return res.status(200).json({ message: " product deleted successfully" })


    } catch (error) {
        return res.status(500).json({ error })

    }
};
//get single product
const getProduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findOne({ _id: id, isDeleted: false });
        if (!product) {

            return res.status(404).json({ message: "product not found" })
        }
        return res.status(200).json({ message: "product fetched successfully",product })

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
};
const getAllProducts = async (req, res) => {
    try {
        const { category, search } = req.query;
        let query = { isDeleted: false };

        if (category) {
            query.category = category;
        }

        if (search) {
            query.name = { $regex: search, $options: "i" };
        }

        const products = await Product.find(query);
        if (!products || products.length === 0){
            return res.status(404).json({ message: "product not found" })
        }
        return res.status(200).json({ message: "product fetched successfully", product: products })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const toggleStock = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.inStock = !product.inStock;
    await product.save();

    res.status(200).json({
      message: "Stock updated",
      inStock: product.inStock
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};  

module.exports = { addProduct, updatedProduct, deletedProduct, getProduct, getAllProducts, toggleStock }
