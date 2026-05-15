const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim : true
        
    },
     email: {
        type: String,
        required: true,
        unique: true,
        lowercase:true,
        trim:true
        
    },
    password: {
        type: String,
        required: true,
        
    },
    phoneNumber:{
        type:String,
        required:true,
        unique:true
    },
    storedOtp:{
        otp:{
            type:Number
        },
        validtill:{
            type:Date,
            default:()=>Date.now() + 5 * 60 * 1000
        }

    },
    address: {
    street: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    pincode: { 
        type: String,
        match: [/^\d{6}$/, "Invalid pincode"]
    },
    country: { type: String, trim: true, default: "India" }
},
    role: {
        type: String,
        enum: ["CUSTOMER", "ADMIN"],
        default: "CUSTOMER"

    }, 
    isDeleted:{
        type:Boolean,
        default:false
    }
    
   
}, {
    timestamps: true
});

const User =  mongoose.model("User", userSchema)
module.exports = User

    
