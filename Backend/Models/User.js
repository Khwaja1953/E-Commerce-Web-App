const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
            
        },
        isAdmin:{
            type:Boolean,
            default:false
        },
        
        address:{
            street:{type:String},
            city:{type:String},
            postalCode:{type:String},
            country:{type:String}
        }

        
    },
    {
          timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);