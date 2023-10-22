const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const colorSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required:true
    }
},{timestamps:true})

const colorModel = mongoose.model('color', colorSchema);
module.exports = colorModel;