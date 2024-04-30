// const { default: mongoose } = require('mongoose');
const mongoose = require('mongoose');

const connectDb = () =>{
    mongoose.connect(process.env.DATABASE_URL , {
        useNewUrlParser : true,
        useUnifiedTopology : true,
    })
    .then(()=>console.log("Db Connected"))
    .catch((error)=>{

        console.log("Recieved errord");
        console.error(error.message);
        process.exit(1);
    })
}

module.exports = connectDb;