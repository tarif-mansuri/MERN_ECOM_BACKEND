const expressAsyncHandler = require("express-async-handler");
const productModel = require("../models/Product");

//@Desc create a product
//@Route POST /api/v1/products
//Access Private/Admin
module.exports.creatProduct = expressAsyncHandler(
    async (req, res)=>{
        const {name, description, category, sizes, colors, user, price, totalQty,brand} = req.body;
        const productExists = await productModel.findOne({name});
        if(productExists){
            throw new Error('Product exists');
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

        res.json({
            status:'Success',
            message: "Product created Successfully",
            product
        })
    }
)

