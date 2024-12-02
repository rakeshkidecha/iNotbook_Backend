const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017";

const connectToMongo = ()=>{
    try {
        const connection = mongoose.connect(mongoURI);
        console.log("successfull cpnnect to mongo db");
    } catch (error) {
        console.log(error)
    }
}


module.exports = connectToMongo;