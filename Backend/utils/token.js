const jwt = require('jsonwebtoken');
require('dotenv').config()

const createToken = async(user)=>{
try{
    const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email,
                    role: user.role
                },
                process.env.JWT_SECRET,
                
            );
            return token
}
catch(
    error
){
console.log(error)
return null
}

}
const verifyToken = async (token)=>{

    try {
        const data = jwt.verify(token,process.env.JWT_SECRET);
        if (!data){
            return null;
        }
        return data;
        
    } catch (error) {
        console.error(error);
        return null;
    }
}
module.exports = {createToken, verifyToken}