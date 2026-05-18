const jwt =require('jsonwebtoken');
const {verifyToken} = require("../utils/token")

const protectedMiddleware= async (req,res,next)=>{
    const token =req.headers.authorization
    
    if(!token){
        return res.status(401).json({message:"access denied.login required"})

    }
    try {const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        console.log(decoded);
        const data = await verifyToken(decoded);
        console.log(data);
        req.user = data;
        next();
        
    } catch (error) {
        return res.status(401).json({error:"invalid token"})
        
    }

}
module.exports ={protectedMiddleware}