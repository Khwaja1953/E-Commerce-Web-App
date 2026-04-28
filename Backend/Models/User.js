const express = require("express")
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim : true
        upperCase:true
        
    },
     email: {
        type: String,
        required: true,
        unique: true,
        lowerCase:true,
        trim:true
        
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 16
    },
    address: {
        street: String,
        city: String,
        state: String,
        pincode: String,
        country: String
    },
    role: {
        type: String,
        enum: ["CUSTOMER", "ADMIN"],
        default: "CUSTOMER"

    }
    
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

const User =  mongoose.model("user", userSchema)
module.exports = User

    