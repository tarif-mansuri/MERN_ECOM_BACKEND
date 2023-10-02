const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');

// @desc   Register user
// @route  POST /api/v1/users/register
// @access Private/Admin


const registerUserCtrl = asyncHandler(
    async (req, res) =>{
        const {fullname, email, password} = req.body;
        
        //check if user exists
        const userExists = await User.findOne({email});
        if(userExists){
            //throw 
            throw new Error('User already exists');
        }
        //hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);
        //create the user
        const user = await User.create({
            fullname, 
            email, 
            password : hashPassword
        })
    
        res.status(201);
        res.json({
            status:'Success',
            message:'User created Successfully',
            data: user
        })
        return;
    }
)

module.exports.registerUserCtrl = registerUserCtrl;

// @desc   Login user
// @route  POST /api/v1/users/login
// @access public

const loginUserCOntroller = asyncHandler(
    async(req, res) =>{
        const {email, password} = req.body;
        //find the user in DB by email only
        const userFound =await User.findOne({email});
        if(userFound && await bcryptjs.compare(password, userFound.password)){
            res.json({
                status : 'Success',
                message : 'User found',
                userFound,
                token: generateToken(userFound?.id)
            })
            return;
        }else{
            throw new Error('Invalid login credentials!');
        }
    }
)
module.exports.loginUserCOntroller = loginUserCOntroller;