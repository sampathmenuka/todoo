const jwt = require('jsonwebtoken');
const router = require('../routes/TodoRoute');

const authMiddleware = (req,resp,next)=>{
    try{
        const authHeader = req.headers['authorization'];
        if(!authHeader){
            return resp.status(401).json({massage:"authentication header missing"});

        }

        const token = authHeader.split(" ")[1];
        if(!token){
            return resp.status(401).json({massage:"Token missing"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userEmail = decoded.email;
        next();
    }catch(e){
        resp.status(401).json({massage:"invalid or expired token"});

    }
}

module.exports = authMiddleware;