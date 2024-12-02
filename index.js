const express = require('express');
const connectToMongo = require('./db');
const port = 8001;
const app = express();
connectToMongo();
app.get('/',(req,res)=>{
    res.end("hello jiii");
})

app.listen(port,err=>err?console.log(err):console.log("Server successfully run on http://localhost:"+port));