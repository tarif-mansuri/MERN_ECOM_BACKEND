const User = require('../models/User');
const bcryptjs = require('bcryptjs');

// @desc   Register user
// @route  POST /api/v1/users/register
// @access Private/Admin


const registerUserCtrl = async (req, res) =>{
    const {fullname, email, password} = req.body;
    
    //check if user exists
    const userExists = await User.findOne({email});
    if(userExists){
        //throw 
        res.json({
            msg: 'User already exists'
        })
        return;
    }
    //hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);
    //create the user
    const user = await User.create({
        fullname, 
        email, 
        password : hashPassword
    });

    res.status(201);
    res.json({
        status:'Success',
        message:'User created Successfully',
        data: user
    })
    return;
}

module.exports.registerUserCtrl = registerUserCtrl;

// @desc   Login user
// @route  POST /api/v1/users/login
// @access public

const loginUserCOntroller = async(req, res) =>{
    const {email, password} = req.body;
    //find the user in DB by email only
    const userFound =await User.findOne({email});
    if(userFound && await bcryptjs.compare(password, userFound.password)){
        res.json({
            status : 'Success',
            message : 'User found',
            userFound
        })
        return;
    }else{
        res.json({
            msg:'Invalid Login'
        })
        return;
    }
}
module.exports.loginUserCOntroller = loginUserCOntroller;