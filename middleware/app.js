const express = require("express")

const users = require("./users_data.json")

const app = express()

const logger = (req,res,next) =>  {
    console.log(req.method)
    next()
    
};

app.use(logger)

app.use(express.json());

app.get("/", (req,res) => {
    console.log("users")
    res.send(users)
})

app.post("/users",logger, (req,res) => {

    const newusers = [...users,req.body];

    res.send(newusers)
});

app.get("/users/:id", (req,res) => {
    const user = users.filter((user) => user.id === req.params.id)
    
    console.log("single get")
    res.send(user)
})

app.patch("/users/:email", (req,res) => {
    const newusers = users.map((user) => {
        if(req.params.email === user.email) {
            return req.body
        }
        return user
    })
    res.send(newusers)
})

app.delete("/users/:id", (req,res) => {
    const newusers = users.filter((user) => user.id !== req.params.id)
    res.send(newusers)
})

app.listen(2555,() =>{
    console.log("listening to 2555")
})