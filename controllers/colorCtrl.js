const colorModel = require('../models/Color');
const expressAsyncHandler = require('express-async-handler');
//@Desc create new color
//@Route Post /api/v1/colors
//Access Private/Admin

module.exports.createCOlor = expressAsyncHandler(
    async (req, res)=>{
        const {name} = req.body;
        console.log(name);
        const colorExists =await colorModel.findOne({name : name.toLowerCase()});
        if(colorExists){
            throw new Error('Color already exists');
        }

        const color = await colorModel.create({
            name : name.toLowerCase(),
            user: req.userAuthId
        })

        res.json(
            {
                status: 'Success',
                message:'Color has been added successfully',
                color
            }
        )
    }
)

//@Desc Get all colors
//@Route Get /api/v1/colors
//Access public

module.exports.getcolors = expressAsyncHandler(
    async (req, res)=>{
        const colors = await colorModel.find();
        res.json(
            {
                status: 'Success',
                message:'Colors fetched successfully',
                colors
            }
        )
    }
)

//@Desc Get Single brand
//@Route Get /api/v1/brands/:id
//Access public

module.exports.getColor = expressAsyncHandler(
    async (req, res)=>{
        const color = await colorModel.findById(req.params.id);
        res.json(
            {
                status: 'Success',
                message:'Color fetched successfully',
                color
            }
        )
    }
)

//@Desc Update brand
//@Route Put /api/v1/brand/:id
//Access Private/Admin

module.exports.updateColor = expressAsyncHandler(
    async (req, res)=>{
        const {name} = req.body;
        const brand =await colorModel.findByIdAndUpdate(req.params.id, {name:name.toLowerCase()}, {new:true});
        if(!brand){
            throw new Error('Color does not exists');
        }

        res.json(
            {
                status: 'Success',
                message:'Color has been updated successfully',
                brand
            }
        )
    }
)

//@Desc Delete brand
//@Route Delete /api/v1/brand/:id
//Access Private/Admin

module.exports.deleteColor = expressAsyncHandler(
    async (req, res)=>{
        const color =await colorModel.findByIdAndDelete(req.params.id);

        res.json(
            {
                status: 'Success',
                message:'Color has been Deleted successfully',
                color
            }
        )
    }
)