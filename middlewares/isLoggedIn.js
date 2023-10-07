const getToken = require("../utils/getTokenFromHeader");
const verifyToken = require("../utils/verifyToken");

module.exports = (req, res, next)=>{
    const token = getToken(req);
    const decodedUser = verifyToken(token);
    if(!decodedUser){
        throw new Error('Please Login First');
    }else{
        req.userAuthId = decodedUser?.id;
    }
    next();
}