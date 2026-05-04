const mongoose = require("mongoose");
async function connectDB(url){
    try {
        await mongoose.connect(url)
        console.log("mongodb connect successfully")
        
    } catch (error) {
        console.error(error)
    }
}

module.exports = connectDB