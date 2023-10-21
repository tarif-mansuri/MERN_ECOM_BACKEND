const brandModel = require('../models/Brand');
const expressAsyncHandler = require('express-async-handler');
//@Desc create new brand
//@Route Post /api/v1/brands
//Access Private/Admin

module.exports.createBrand = expressAsyncHandler(
    async (req, res)=>{
        const {name} = req.body;
        const brandExists =await brandModel.findOne({name});
        if(brandExists){
            throw new Error('Category already exists');
        }

        const brand = await brandModel.create({
            name,
            user: req.userAuthId
        })

        res.json(
            {
                status: 'Success',
                message:'brand has been added successfully',
                brand
            }
        )
    }
)

//@Desc Get all brands
//@Route Get /api/v1/brands
//Access public

module.exports.getbrands = expressAsyncHandler(
    async (req, res)=>{
        const brands = await brandModel.find();
        res.json(
            {
                status: 'Success',
                message:'brands fetched successfully',
                brands
            }
        )
    }
)

//@Desc Get Single brand
//@Route Get /api/v1/brands/:id
//Access public

module.exports.getBrand = expressAsyncHandler(
    async (req, res)=>{
        const brand = await brandModel.findById(req.params.id);
        res.json(
            {
                status: 'Success',
                message:'brand fetched successfully',
                brand
            }
        )
    }
)

//@Desc Update brand
//@Route Put /api/v1/brand/:id
//Access Private/Admin

module.exports.updateBrand = expressAsyncHandler(
    async (req, res)=>{
        const {name} = req.body;
        const brand =await brandModel.findByIdAndUpdate(req.params.id, {name}, {new:true});
        if(!brand){
            throw new Error('Brand does not exists');
        }

        res.json(
            {
                status: 'Success',
                message:'Category has been updated successfully',
                brand
            }
        )
    }
)

//@Desc Delete brand
//@Route Delete /api/v1/brand/:id
//Access Private/Admin

module.exports.deleteBrand = expressAsyncHandler(
    async (req, res)=>{
        const brand =await brandModel.findByIdAndDelete(req.params.id);

        res.json(
            {
                status: 'Success',
                message:'Brand has been Deleted successfully',
                brand
            }
        )
    }
)