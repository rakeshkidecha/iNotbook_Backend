const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/data";

const connectToMongo = async ()=>{
    const connection = await mongoose.connect(mongoURI);
    // console.log(connection);
    console.log("successfull cpnnect to mongo db");
}


module.exports = connectToMongo;