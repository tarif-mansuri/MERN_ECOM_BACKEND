const jwt = require('jsonwebtoken');

const generateToken = function(id){
    const token = jwt.sign(
        {
            id
        },
        process.env.JWT_KEY,
        {
            expiresIn:'3d'
        }
    );
    return token;
}

module.exports = generateToken;