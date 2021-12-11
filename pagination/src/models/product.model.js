const {Schema, model} = require("mongoose");

const productSchema = new Schema({
  first_name : {type:String, required: true},
  Last_name : {type:String, required: true},
  email : {type:String, required: true},
},{
    versionKey: false,
    timestamps:true
})
module.exports = model("product", productSchema);