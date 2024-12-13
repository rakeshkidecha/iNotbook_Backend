const express = require('express');
const connectToMongo = require('./db');
const User = require('./models/User')
const port = 8001;
const app = express();

connectToMongo();

app.use(express.json());
app.use(express.urlencoded());

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.get('/',async(req,res)=>{
   const uData = await User.find();
    res.json(uData);
})

app.listen(port,err=>err?console.log(err):console.log("Server successfully run on http://localhost:"+port));