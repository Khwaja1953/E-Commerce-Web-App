const mongoose = require("mongoose");
const productSchema =new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true,
            minlength:2,
            maxlength:200
        },
        description:{
            type:String,
            required:true,
            trim:true,
            minlength:10,
            maxlength:1000,
        },
        price:{
            type:Number,
            required:true,
            min:0,
            default:0
    },
    category:{
        type:String,
        required:true,
        trim:true
    },
    inStock:{
        type:Boolean,
        required:true,
        default: true
    },
    rating:{
        type:Number,
        default:0,
        min:0,
        max:5
    },
    reviews: [
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        rating: {
            type: Number,
            min: 1,
            max: 5
        },
        comment: String
    }
],
    image:{
        type:String,
        required:true,
        trim:true
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
},
{
          timestamps: true,
    }
);
module.exports =mongoose.model("Product",productSchema)
