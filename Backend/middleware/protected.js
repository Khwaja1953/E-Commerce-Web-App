const jwt =require('jsonwebtoken');
const {verifyToken} = require("../utils/token")

const protectedMiddleware= async (req,res,next)=>{
    const token =req.headers.authorization
    
    if(!token){
        return res.status(401).json({message:"access denied.login required"})

    }
    try {const decoded = token.split(" ")[1];
        // console.log(decoded);
        const data = await verifyToken(decoded);

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