const express = require("express")

const books = require("./MOCK_DATA")

const app = express()

app.use(express.json());

app.get("/", (req, res) => {
    res.send(books)
});

app.get("/books/:id", (req, res) => {
    const newBooks = books.filter((book)=> book.id === req.params.id);
    res.send(newBooks)
});

app.post("/books", (req, res) => {
 
    const newBooks = [...books,req.body];

    res.send(newBooks)

});


app.patch("/books/:author", (req,res) => {
    console.log(req.params.id)
    res.send(req.params)
})


app.delete("/:id", (req,res) => {
    const newBooks = books.filter((book) => book.id !== req.params.id)

    res.send(newBooks)
})




app.listen(2342, function() {
    console.log("listening on port 2342")
})