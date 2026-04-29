const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    _id:{type:String, default:()=>uuidv7(),},
    name:{type:String, unique:true,}, 
    gender:String, 
    gender_probability:Number,
    sample_size:Number,
    age:Number,
    age_group:String,
    country_id:String,
    country_probability:Number,
    created_at:Date,
    },
    {versionKey:false}
)

module.exports = mongoose.model('Profile', profileSchema);