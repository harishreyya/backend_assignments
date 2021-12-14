const mongoose = require("mongoose");


const topicSchema = new mongoose.Schema({
   
    name_of_topic:{type:String,required:true},
},{
    versionKey:false, 
    timestamps:true 
})


const Topic = mongoose.model("topic",topicSchema) 

module.exports = Topic