

const app = require("./index");

const connect = require("./configs/db");

app.listen(4442, async function(){
    await connect()
    console.log("4442 port is listening")
})