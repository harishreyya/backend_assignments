const express = require('express');


const Product = require("../models/product.model");

const sendMail = require("../utils/send-mail")

const router = express.Router();

router.post("/",async (req,res) => {
    try{
        const product = await Product.create(req.body);
    

      sendMail("a@a.com","b@b.com",`Welcome to ABC system ${req.body.first_name} ${req.body.Last_name}`,`Hi ${req.body.first_name} Please confirm your email address`, `<h1>Hi ${req.body.first_name} Please confirm your email address</h1>`)

        return res.status(201).json({product})
    }catch(e){
        return res.status(500).json({status:"failed",message:e.message });
    }
})


router.get("/",async (req,res) => {
try{
    const page = +req.query.page || 1;
    const size = +req.query.size || 2;


    const skip = (page -1) * size;

    const products = await Product.find().skip(skip).limit(size).lean().exec();

    const totalpages = Math.ceil(await Product.find().countDocuments()/size)
    return res.json({products,totalpages});
}catch(e){
    return res.status(500).json({status:"failed",message:e.message });
}

});

module.exports = router;