const mongoose = require('mongoose');

const dbConnect = async ()=>{
    try{
        const connected = await mongoose.connect(process.env.MONGODBURL);
        console.log(`Mongodb connected ${connected.connection.host}`);
    }catch(error){
        console.log(`Error: ${error.message}`);
    }
}

module.exports = dbConnect;