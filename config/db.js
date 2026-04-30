const mongoose = require('mongoose');

require("dotenv").config();

MONGODB_URI = process.env.MONGO_URI

const connectDB = async ()=>{
    try{
        await mongoose.connect(MONGODB_URI)
        console.log("Connected to database successfully!");
    }catch(err){
        console.error("Error connecting to database: ", err);
<<<<<<< HEAD
        //process.exit(1);
=======
>>>>>>> 22f865edee4788f695f95f7b6bfd475d15b92efe
    }
}


module.exports = connectDB;
