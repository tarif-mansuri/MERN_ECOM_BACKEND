const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Schema for product
const productSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    brand:{
        type: String,
        required: true
    },
    category:{
        type: String,
        ref: "Category",
        required: true
    },
    size:{
        type: [String],
        enum: ["S", "M", "L", "XL", "XXL"],
        required: true
    },
    colors:{
        type: [String],
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    images:{
        type: String,
        default: "./static/image.png"
    },
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    price:{
        type: Number,
        required: true
    },
    totalQty:{
        type: Number,
        required: true
    },
    totalSold:{
        type: Number,
        required: true,
        default: 0
    },
    price:{
        type: Number,
        required: true
    }
},
{
    timestamps:true,
    toJSON:{
        virtuals: true
    }
});

const productModel = mongoose.model('productModel', productSchema);
module.exports = productModel;