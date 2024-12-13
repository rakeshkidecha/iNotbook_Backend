const jwt =require('jsonwebtoken');

const JWT_SECRATE = "rkasd@sadk12d";

const fetchUser =async (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send({error:"token validation faild"});
    }

    try {
        const data = await jwt.verify(token,JWT_SECRATE);
        req.user = data.user;
        next();
    } catch (err) {
        return res.status(401).send({error:"token validation faild"}); 
    }
}


module.exports = fetchUser;