const jwt = require('jsonwebtoken');
module.exports = (token)=>{
    return jwt.verify(token, process.env.JWT_KEY,(err, decoded)=>{
        if(err){
            return false
        }else{
            return decoded;
        }
    });

}