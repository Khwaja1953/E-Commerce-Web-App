const jwt =require('jsonwebtoken');

const protectedMiddleware=(req,res,next)=>{
    const token =req.headers.authorization
    if(!token){
        return res.status(401).json({message:"access denied.login required"})

    }
    try {const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
        
    } catch (error) {
        return res.status(401).json({error:"invalid token"})
        
    }

}
module.exports ={protectedMiddleware}