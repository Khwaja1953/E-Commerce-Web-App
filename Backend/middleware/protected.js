
const jwt =require('jsonwebtoken');
const {verifyToken} = require("../utils/token")


console.log("VERIFY SECRET:", process.env.JWT_SECRET);
const protectedMiddleware= async (req,res,next)=>{
    const token =req.headers.authorization
    
    if(!token){
        return res.status(401).json({message:"access denied.login required"})

    }
    try {const decoded = token.split(" ")[1];
        console.log("TOKEN RECEIVED BY BACKEND:", decoded);
        
        const data = await verifyToken(decoded);
        console.log("DECODED DATA:", data);  

        if (!data) {
          return res.status(401).json({ error: "invalid token" });
        }

        req.user = data;
        next();
        
    } catch (error) {
        return res.status(401).json({error:"invalid token"})
        
    }

}
module.exports ={protectedMiddleware}