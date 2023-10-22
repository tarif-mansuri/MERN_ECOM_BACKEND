const expressAsyncHandler = require("express-async-handler");
const productModel = require("../models/Product");
const categoryModel = require("../models/Category");
const brandModel = require('../models/Brand');

//@Desc create a product
//@Route POST /api/v1/products
//Access Private/Admin
module.exports.creatProduct = expressAsyncHandler(
    async (req, res)=>{
        const {name, description, category, sizes, colors, price, totalQty,brand} = req.body;
        const productExists = await productModel.findOne({name});
        if(productExists){
            throw new Error('Product exists');
        }

        //find the category
        const categoryFound = await categoryModel.findOne({name:category.toLowerCase()});
        if(!categoryFound){
            throw new Error('Provide a valid category');
        }

        //find brand
        const brandFound = await brandModel.findOne({name:brand.toLowerCase()});
        if(!brandFound){
            throw new Error('Provide a valid Brand');
        }

        const product = await productModel.create({
            name,
            description,
            category,
            sizes,
            colors,
            user: req.userAuthId,
            price,
            totalQty,
            brand
        });
        //push the product into category and resave category
        categoryFound.products.push(product._id);
        await categoryFound.save();
        
        //push the product into brand and resave brand
        brandFound.products.push(product._id);
        await brandFound.save();
        res.json({
            status:'Success',
            message: "Product created Successfully",
            product
        })
    }
)

//@Desc fetch all products
//@Route Get /api/v1/products
//Access Public

module.exports.getProducts = expressAsyncHandler(
    async (req, res)=>{
        //Get the cursor
        let productQuery = productModel.find();
        
        //search by name
        if(req.query.name){
            productQuery = productQuery.find({
                name: { $regex:req.query.name, $options: "i"}
            })
        }

        //search by branch
        if(req.query.brand){
            productQuery = productQuery.find({
                brand:{$regex:req.query.brand, $options:"i"}
            })
        }

        //search by branch
        if(req.query.category){
            productQuery = productQuery.find({
                category:{$regex:req.query.category, $options:"i"}
            })
        }

        //search by color
        if(req.query.color){
            productQuery = productQuery.find({
                colors:{$regex:req.query.color, $options:"i"}
            })
        }

        //search by sizes
        if(req.query.size){
            productQuery = productQuery.find({
                sizes:{$regex:req.query.size, $options:"i"}
            })
        }

        //filter by price range
        if(req.query.price){
            const priceRange = req.query.price.split("-");
            //using gte and lte
            productQuery = productQuery.find({
                price:{$gte:priceRange[0], $lte: priceRange[1]}
            })
        }

        //Pagination
        //page
        const page = parseInt(req.query.page)? parseInt(req.query.page): 1;

        //limit
        const limit = parseInt(req.query.limit)? parseInt(req.query.limit): 10;

        //start index
        const startIndex = (page-1) * limit;

        //end index
        const endIndex = page * limit;
        
        //total
        const totalProducts = await productModel.countDocuments();

        productQuery = productQuery.skip(startIndex).limit(limit);

        //pagination results
        const pagination = {};
        if(endIndex<totalProducts){
            pagination.next = {
                page :page+1,
                limit
            }
        }

        if(startIndex>0){
            pagination.next = {
                page :page-1,
                limit
            }
        }

        //use await to process the query in cursor
        const products = await productQuery;
        res.json({
            status:"Success",
            totalProducts,
            result:products.length,
            pagination,
            message: 'Product fetched successfully',
            products
        })
    }
)

//@Desc fetch single products
//@Route Get /api/v1/products/:id
//Access Public

module.exports.getProduct = expressAsyncHandler(
    async (req, res)=>{
        const product =await productModel.findById(req.params.id);
        if(!product){
            throw new Error('Product not found');
        }else{
            res.json({
                status: "Success",
                message: 'Product fetched Successfully',
                product
            }
            )
        }
    }
)

//@Desc update single products
//@Route Put /api/v1/products/:id
//Access Admin

module.exports.updateProduct = expressAsyncHandler(
    async (req, res)=>{
        const {name, description, category, sizes, colors, user, price, totalQty,brand} = req.body;
        const product =await productModel.findByIdAndUpdate(req.params.id,{
            name, description, category, sizes, colors, user, price, totalQty,brand
        },{
            new :true
        });
        if(!product){
            throw new Error('Product not found');
        }else{
            res.json({
                status: "Success",
                message: 'Product Updated Successfully',
                product
            }
            )
        }
    }
)

//@Desc delete single products
//@Route Delete /api/v1/products/:id
//Access Admin

module.exports.deleteProduct = expressAsyncHandler(
    async (req, res)=>{
        await productModel.findByIdAndDelete(req.params.id);
        res.json({
            status: 'Success',
            message: 'Product has been deleted successfully',
        })
    }
)