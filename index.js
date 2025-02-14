const express = require('express');
const cors = require("cors");
const app = express();
const urlRoute = require("./routes/url");
const http = require("http");
const {initSocket} = require("./socket");

require("dotenv").config();

const server = http.createServer(app);
initSocket(server);
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;

app.use("/" , urlRoute);



server.listen(PORT , ()=>{
    console.log(`Server is running at port : ${PORT}`);
})



app.get('/' , (req , res)=>{
    res.send("Hellojii");
})

//db connections 
const connectDb = require('./connect');
connectDb();