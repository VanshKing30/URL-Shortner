const express = require('express');

const app = express();

const PORT = 3000;

app.listen(PORT , ()=>{
    console.log("The Server is active and is listninig you ");
})