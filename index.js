const express = require('express');
const cors = require("cors");
const app = express();
const urlRoute = require("./routes/url");

require("dotenv").config();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;

app.use("/" , urlRoute);

// app.get('/' , (req , res) =>{
//     res.send("Hello My name is Vansh");
// })

app.listen(PORT , ()=>{
    console.log("The Server is active and is listninig you ");
})

//db connections 
const connectDb = require('./connect');
connectDb();