const restrictedMiddleware =(...roles)=>{
    return(req,res,next)=>{

        try {
            if(!req.user){
                return res.status(401).json({message:"user is not authenticated"})
                
            }
            
            if(!roles.includes(req.user.role)){
                return res.status(401).json({message:"access forbibben"})
            }
            next()
            
        }
        
        
        catch (error) {return res.status(500).json({
            message: "Server error",
            error: error.message
        });
        
    }
}
}
module.exports={restrictedMiddleware}