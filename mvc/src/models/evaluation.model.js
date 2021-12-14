const mongoose= require("mongoose");


const evaluationSchema = new mongoose.Schema({
    date_of_evaluation:{type:String,required:true},
    instructor:[{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true}],
    topic:{type:mongoose.Schema.Types.ObjectId,ref:"topic",required:true},


},{
    versionKey:false,
    timestamps:true
})

module.exports = mongoose.model("evaluation",evaluationSchema)