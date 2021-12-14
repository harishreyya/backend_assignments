const express = require ("express");


const connect = require("./configs/db")


const app = express();
app.use(express.json())

app.listen(5432,async function(){
    await connect();
    console.log("listening on port 5432");
})