const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    products:[
        {
            type: Schema.Types.ObjectId,
            ref: "Product"
        }
    ]
},{timestamps:true})

const brandModel = mongoose.model('brand', brandSchema);
module.exports = brandModel;