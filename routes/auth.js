const express = require('express');
const User = require('../models/User')
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator'); 

const JWT_SECRATE = "rkasd@sadk12d";

// validator for the new user 
const validator =[
    body('name',"exter a minimum 3 charactor name").isLength({min:3}),
    body('email','Enter a valid email').isEmail(),
    body('password',"enter a strong 8 charactors password").isLength({min:8}),
]

router.post('/createUser',validator,async (req,res)=>{
    // if there are errors then sens in responce with status-coe 400 bad request
    const result = validationResult(req);

    // if there are any error response bad request 
    if (!result.isEmpty()) {
        return res.status(400).json({errors:result.array()});
    }

    const isUserEmailExist = await User.findOne({email:req.body.email});
    const isUserPasswordExist = await User.findOne({password:req.body.password});
    
    // if email already exists the showing error massage 
    if(isUserEmailExist){
        return res.status(400).json({error:"This Email is already exist"});
    }
    // if password already exists the showing error massage 
    if(isUserPasswordExist){
        return res.status(400).json({error:"This Password is already used"});
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const secPass =await bcrypt.hash(req.body.password,salt);

        // crete new user 
        const user = User({
            name:req.body.name,
            email:req.body.email,
            password:secPass
        });
        await user.save();

        const data = {
            User:{
                id : User.id
            }
        }
        const authToken = jwt.sign(data,JWT_SECRATE);

        res.json({authToken});

    } catch (err) {
        console.log(err)
        res.status(500).json({errors:"Some servers error.."})
    }
})

module.exports = router;
