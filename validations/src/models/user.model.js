const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    email:{type:String,required:true},
    age:{type:Number,required:true},
    pincode:{type:Number,required:true},
    gender:{type:String,required:true},
},{
    versionKey:false,
    timestamps:true
})

module.exports = mongoose.model("user", usersSchema)