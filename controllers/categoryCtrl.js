const categoryModel = require('../models/Category');
const expressAsyncHandler = require('express-async-handler');

//@Desc create new category
//@Route Post /api/v1/categories
//Access Private/Admin

module.exports.createCategory = expressAsyncHandler(
    async (req, res)=>{
        const {name} = req.body;
        const categoryExists =await categoryModel.findOne({name: name.toLowerCase()});
        if(categoryExists){
            throw new Error('Category already exists');
        }

        const category = await categoryModel.create({
            name: name.toLowerCase(),
            user: req.userAuthId
        })

        res.json(
            {
                status: 'Success',
                message:'Category has been added successfully',
                category
            }
        )
    }
)

//@Desc Get all categories
//@Route Get /api/v1/categories
//Access public

module.exports.getCategories = expressAsyncHandler(
    async (req, res)=>{
        const categories = await categoryModel.find();
        res.json(
            {
                status: 'Success',
                message:'Categories fetched successfully',
                categories
            }
        )
    }
)

//@Desc Get Single category
//@Route Get /api/v1/category/:id
//Access public

module.exports.getCategory = expressAsyncHandler(
    async (req, res)=>{
        const category = await categoryModel.findById(req.params.id);
        res.json(
            {
                status: 'Success',
                message:'Category fetched successfully',
                category
            }
        )
    }
)

//@Desc Update category
//@Route Put /api/v1/category/:id
//Access Private/Admin

module.exports.updateCategory = expressAsyncHandler(
    async (req, res)=>{
        const {name} = req.body;
        const category =await categoryModel.findByIdAndUpdate(req.params.id, {name:name.toLowerCase()}, {new:true});
        if(!category){
            throw new Error('Category do not exists');
        }

        res.json(
            {
                status: 'Success',
                message:'Category has been updated successfully',
                category
            }
        )
    }
)

//@Desc Delete category
//@Route Delete /api/v1/category/:id
//Access Private/Admin

module.exports.deleteCategory = expressAsyncHandler(
    async (req, res)=>{
        const category =await categoryModel.findByIdAndDelete(req.params.id);

        res.json(
            {
                status: 'Success',
                message:'Category has been Deleted successfully',
                category
            }
        )
    }
)