const Product = require('../Models/Product');

const addProduct = async (req,res)=>{
    try {
        const {name, description, price, category} = req.body;
        const image = req.file ? req.file.path : null;

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
};
//udate single produc
const updatedProduct = async (req,res)=>{
    try {const {name,price,description,category}=req.body;
     const image = req.file ? req.file.path : undefined;
 

    const updateData= {}
    if(name !== undefined)updateData.name =name;
     if(price !== undefined)updateData.price =price;
      if(description !== undefined)updateData.description=description;
       if(category!== undefined)updateData.category =category;
        if(image !== undefined)updateData.image =image;
         const Product= await Product.findByIdAndUpdate(req.params.id,updateData, { new: true, runValidators: true });
         if( !Product){ return res.status(404).json({error:"product not updated"})};
    
       return res.status(200).json({message:"product updte successfully"})
    
    

        
    } catch (error) {res.status(500).json({error})
        
    }
};
//Deleted single product
const deletedProduct = async (req,res)=>{
    try {const id =req.params.id;
        const Product = await Product.findByIdAndUpdate(id,
            {isDeleted:true},

           {new:true}
        );
        if(!Product)
            return res.staus(404).json({message:"product not found"})
           return res.status(200).json({message:" product deleted successfully"})

        
    } catch (error) {return res.status(500).json({error})
        
    }
};
//get single product
const getProduct =async (req,res)=>{
    try {
        const {id}=req.params
        const Product = await Product. findById(id);
        if(!Product)
            return res.status(404).json({message:"product not found"})
            return res.status(200).json({message:"product fetched successfully"})
        
    } catch (error) {return res.status(500).json({error:error.message})
        
    }
};
const getAllProducts =async (req,res)=>{
    try {
        const Product = await Product.find();
        if(!Products || Products.length===0)
            return res.status(404).json({message:"product not found"})
        return res.status(200).json({message:"product fetched successfully"})
    } catch (error) { return res.status(500).json({error:error.message})
        
    }
}

module.exports = {addProduct,updatedProduct,deletedProduct,getProduct,getAllProducts}