const User = require('../models/User');


// @desc   Register user
// @route  POST /api/v1/users/register
// @access Private/Admin


const RegisterUserCtrl = async (req, res) =>{
    const {fullname, email, password} = req.body;
    
    //check if user exists
    const userExists = await User.findOne({email});
    if(userExists){
        //throw 
        res.json({
            msg: 'User already exists'
        })
    }
    //hash the password
    //create the user
    const user = await User.create({fullname, email, password});

    res.status(201);
    res.json({
        status:'Success',
        message:'User created Successfully',
        data: user
    })
}

module.exports = RegisterUserCtrl;