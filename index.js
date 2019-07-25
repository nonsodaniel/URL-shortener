const express = require("express");
const app = express();

const connectDb = require("./config/db")

//connect db

connectDb()

app.use(express.json({ extended: false }))

const port = 5000;

app.listen(port, () => {
    console.log("We are live on port", port)
})