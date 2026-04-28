const express = require("express")
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String
    },
    brand: {
        type: String
    },
    stock: {
        type: Number,
        default: 0
    },
    images: [
        {
            type: String
        }
    ],
    ratings: {
        type: Number,
        default: 0
    },
     createdAt: {
        type: Date,
        default: Date.now
    }
});