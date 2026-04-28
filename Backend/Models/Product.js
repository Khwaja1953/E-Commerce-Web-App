const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 200,
        min: 2,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    brand: {
        type: String,
        trim: true
    },
    stock: {
        type: Number,
        default: 0,
        min: 0
    },
    images: [
        {
            type: String
        }
    ],
    ratings: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },

}, {
    timeStamps: true
});

const Product = mongoose.model("Product", productSchema)
module.exports = Product