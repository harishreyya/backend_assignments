const express = require("express")
const mongoose = require("mongoose")

const movies = require("./movies.json")



const connect = () => {
    return mongoose.connect("mongodb://localhost:27017/test", {


    });
};
const app = express();
app.use(express.json())


const movieSchema = new mongoose.Schema({
    id:{type:Number,required:true},
    movie_name:{type:String,reqired:true},
    budget:{type:Number,reqired:true},
    production_year:{type:Number,reqired:true},
})

const Movie = mongoose.model("movies",movieSchema) 




app.post("/movies",async(req,res)=>{
    try {
        const movie = await Movie.create(req.body) 
 
        return res.status(201).send({movie});
    } catch (e) {
        res.status(500).json({status : e.message})
    }
   
})

app.get("/movies",async(req,res)=>{
    const movies = await Movie.find().sort({id:-1}).lean().exec() 


    return res.status(200).send({movies})
})



    app.patch("/movies/:id",async(req,res)=>{   
        try {
            const movie = await Movie.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
            return res.status(200).send({movie})
        } catch (e) {
            res.status(500).json({status : e.message})
        }
              
        
    })
      
    


app.delete("/movies/:id",async (req,res)=>{
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id).lean().exec();

        return res.status(200).send({movie});
    } catch (e) {
        res.status(500).json({status : e.message})
    }
   
    
})


app.get("/movies/:id",async(req,res)=>{
    try {
        const movie = await Movie.findById(req.params.id).lean().exec();
     res.send({movie});
    } catch (e) {
        res.status(500).json({status : e.message})
    }
    
})

const start = async() => {
    await connect();
    app.listen(4444, () => {
        console.log("Listening on port 4444")
    })
}
start();