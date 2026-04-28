const express = require("express")
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
     email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
    address: {
        street: String,
        city: String,
        state: String,
        pincode: String,
        country: String
    },
    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer"
    }
    createdAt:{
        type: Date,
        default: Date.now
    }
});
    