const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const categorySchema = new Schema({
    name:{
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image:{
        type: String,
        default: 'https://media.zigcdn.com/media/model/2021/May/v8_930x620.jpg',
        required: true
    },
    products:[{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }]
},{
    timestamps:true,
    toJSON:{
        virtuals: true
    }
});

const categoryModel = mongoose.model('category', categorySchema);
module.exports = categoryModel;