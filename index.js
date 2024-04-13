const express = require('express');

const app = express();
const urlRoute = require("./routes/url");

const PORT = 3000;

app.use("/url" , urlRoute);

app.get('/' , (req , res) =>{
    res.send("Hello My name is Vansh");
})

app.listen(PORT , ()=>{
    console.log("The Server is active and is listninig you ");
})