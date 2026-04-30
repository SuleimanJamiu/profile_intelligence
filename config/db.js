const mongoose = require('mongoose');

require("dotenv").config();

MONGODB_URI = process.env.MONGO_URI

const connectDB = async ()=>{
    try{
        await mongoose.connect(MONGODB_URI)
        console.log("Connected to database successfully!");
    }catch(err){
        console.error("Error connecting to database: ", err);
    }
}


module.exports = connectDB;
