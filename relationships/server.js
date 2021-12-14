const express = require ("express");
const mongoose= require("mongoose");

const connect =()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/library",{
    })

}

const userSchema = new mongoose.Schema({
    first_name:{type:String,reqired:true},
    last_name:{type:String,reqired:false},
    email:{type:String,reqired:true},
    gender:{type:String,reqired:true},

},{
    versionKey:false, 
    timestamps:true 
})

const User=mongoose.model("user",userSchema) 


const sectionSchema = new mongoose.Schema({
    title:{type:String,required:true},
    user:[{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true}],
    
    
},{
    versionKey:false, 
    timestamps:true 
})

const Section = mongoose.model("section",sectionSchema)

const bookSchema= new mongoose.Schema({
    name:{type:String,required:true},
    body:{type:String,required:true},
    section:{type:mongoose.Schema.Types.ObjectId,ref:"section",required:true},
    author:[{type:mongoose.Schema.Types.ObjectId,ref:"author",required:true}],
    
},{
    versionKey:false, //_v
    timestamps:true
})

const Book = mongoose.model("book",bookSchema)


const authorSchema = new mongoose.Schema({
    name:{type:String,reqired:true},
})

const Author=mongoose.model("author",authorSchema) //authors




const checkoutSchema = new mongoose.Schema({
    book:[{type:mongoose.Schema.Types.ObjectId,ref:"book",required:true}]
   
  
},{
    versionKey:false, //_v
    timestamps:true
})

const Checkout = mongoose.model("checkouts",checkoutSchema)

const app=express();
app.use(express.json())

app.post("/users",async(req,res)=>{
    const user=await User.create(req.body) //db.users.insert
 
    return res.status(201).send({user});
})

//get
app.get("/users",async(req,res)=>{
    const users=await User.find().sort({id:-1}).lean().exec()


    return res.status(200).send({users})
})

//patch
app.patch("/users/:id",async(req,res)=>{                
             const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
             return res.status(200).send({user})

}) 

//delete
app.delete("/users/:id",async (req,res)=>{
    const user = await User.findByIdAndDelete(req.params.id).lean().exec(); //db.users.remove({_id:""})

    return res.status(200).send({user});
  
})


app.get("/users/:id",async(req,res)=>{
    const user=await User.findById(req.params.id).lean().exec();
    return res.status(200).send({user});
})


//----------CRUD APIS FOR SECTION---------
app.post("/sections",async (req,res)=>{
    const sections = await Section.create(req.body);

    return res.status(201).send({sections});
})
//getting all sections
app.get("/sections",async(req,res)=>{
    const sections = await Section.find().populate({
        path:'user',

    }).lean().exec();
    return res.status(200).send({sections});
})
//getting single section
app.get("/sections/:id",async(req,res)=>{
    const sections = await Section.findById(req.params.id).lean().exec();
    return res.status(200).send({sections});
})
//update a single section
app.patch("/sections/:id",async(req,res)=>{
    const sections = await Section.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
    return res.status(200).send({sections});
})
//delete a single section
app.delete("/sections/:id",async(req,res)=>{
    const sections = await Section.findByIdAndDelete(req.params.id,req.body,{new:true}).lean().exec();
    return res.status(200).send({sections});
})
// //get all books in a section
app.get("/sections/:id/books",async(req,res)=>{
    const book = await Book.find({section:req.params.id}).populate("section").lean().exec();
    const section = await Section.findById(req.params.id).lean().exec();
    return res.status(200).send({book,section});
})


// //get all books in a section that are not checkedout
app.get("/sections/:id/checkouts",async(req,res)=>{
    const checkout = await Checkout.find().populate({path:"book",select:"name body"}).lean().exec();
    const section = await Section.findById(req.params.id).lean().exec();
    return res.status(200).send({checkout,section});
      
})


app.get("/authors/:id/books",async(req,res)=>{
    const book = await Book.find({author:req.params.id}).populate("author").lean().exec();
    const author = await Author.findById(req.params.id).lean().exec();
    return res.status(200).send({book,author});
  

})





//------------CRUD APIS for books----------------

app.post("/books",async (req,res)=>{
    const book = await Book.create(req.body);
    return res.status(201).send({book});
})
//getting all books
app.get("/books",async(req,res)=>{
    const books = await Book.find().populate({
        path:'author',
        select:'name'
    }).populate("section").lean().exec();
    return res.status(200).send({books});
    
})
//getting single books
app.get("/books/:id",async(req,res)=>{
    const book = await Book.findById(req.params.id).lean().exec();
    return res.status(200).send({book});
})

app.patch("/books/:id",async(req,res)=>{
    const book = await Book.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
    return res.status(200).send({book});
})
//delete a single books
app.delete("/books/:id",async(req,res)=>{
    const book = await Book.findByIdAndDelete(req.params.id,req.body,{new:true}).lean().exec();
    return res.status(200).send({book});
})
//getting all books written by author
app.get("authors/:id:books",async(req,res)=>{
    const book = await Book.find({authors:req.params.id}).lean().exec();
    const authors = await Author.findById(req.params.id).lean().exec();
    return res.status(200).send({book,authors});
})


app.get("/checkouts/:id/books",async (req,res)=>{
    const book = await Book.find({checkout:{$ne:req.params.id}}).lean().exec();
    // return res.status(200).send({book});
    return res.status(200).send(book.map(item=>item.name+" : "+ item.body))
})



//---------CRUD APIS for authors----------
//post
app.post("/authors",async(req,res)=>{
    const author=await Author.create(req.body) //db.authors.insert
 
    return res.status(201).send({author});
})

//get
app.get("/authors",async(req,res)=>{
    const authors=await Author.find().sort({id:-1}).lean().exec() 


    return res.status(200).send({authors})
})

//patch
app.patch("/authors/:id",async(req,res)=>{                //mongoid
             const author = await Author.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
             return res.status(200).send({author})
    //db.authors.update({_id:""},{$set:{}})
}) 

//delete
app.delete("/authors/:id",async (req,res)=>{
    const author = await Author.findByIdAndDelete(req.params.id).lean().exec(); //db.authors.remove({_id:""})

    return res.status(200).send({author});
    //delete=>delete single bar
})

//get a single author
app.get("/authors/:id",async(req,res)=>{
    const author=await Author.findById(req.params.id).lean().exec();
    return res.status(200).send({author});
})









//--------CRUD APIS for checkouts------
//create a singel checkouts

app.post("/checkouts",async(req,res)=>{
    const checkout=await Checkout.create(req.body) //db.checkouts.insert
    return res.status(201).send({checkout});
})



app.get("/checkouts",async(req,res)=>{
    const checkout = await Checkout.find().populate({path:"book",select:"name body"}).lean().exec();
    return res.status(200).send(checkout.map(item=>item.book))

})






//patch
app.patch("/checkouts/:id",async(req,res)=>{                //mongoid
             const checkout = await Checkout.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
             return res.status(200).send({checkout})
    //db.checkouts.update({_id:""},{$set:{}})
}) 

//delete
app.delete("/checkouts/:id",async (req,res)=>{
    const checkout = await Checkout.findByIdAndDelete(req.params.id).lean().exec(); //db.checkouts.remove({_id:""})

    return res.status(200).send({checkout});
    //delete=>delete single bar
})

//get a single user
app.get("/checkouts/:id",async(req,res)=>{
    const checkout=await Checkout.findById(req.params.id).lean().exec();
    return res.status(200).send({checkout});
})



app.listen(3002,async function(){
    await connect();
    console.log("listening on port 3002");
})