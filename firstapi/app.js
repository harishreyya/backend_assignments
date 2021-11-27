const express = require("express");
const users = require("./MOCK_DATA.json")
const app = express()



app.get("/",(req,res) =>{
   console.log(users)
    return res.send("welcome  to home page ")
})


app.get("/users",(req,res) =>{
    // console.log(users)
     return res.send(users)
 })

app.listen(4567,() =>{

    console.log("4567 is listening")
})