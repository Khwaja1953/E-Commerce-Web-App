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
module.exports = {createToken}