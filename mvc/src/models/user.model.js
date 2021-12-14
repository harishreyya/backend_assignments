const mongoose= require("mongoose");


const userSchema = new mongoose.Schema({
    
    first_name:{type:String,reqired:true},
    last_name:{type:String,reqired:true},
    date_of_birth:{type:Number,reqired:true},
    gender:{type:String,reqired:true},
},{
    versionKey:false, 
    timestamps:true ,

})

const User = mongoose.model("user",userSchema) 

module.exports = User;