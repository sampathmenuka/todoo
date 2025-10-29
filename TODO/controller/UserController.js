const User = require('../model/UserScema')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const signup = async(req, resp)=>{
    try{
        const {name,email,password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser) return resp.state(409).json({'massage':"User alredy exists"});

        const hashedPassword = await bcrypt.hash(password,10);
        const savedUser = await User.create({
            name,email,passwordHash:hashedPassword
        });
        resp.state(201).json({'massage':"User created Succesfully",userId:savedUser._id});
    }catch (e){
        resp.state(500).json({'massage':'Signup error',error:e});
    }
}

const login = async(req, resp)=>{
    try{
        const {email, password}= req.body;
        const selectUser= await User.findOne{email};
        if(!selectUser) return resp.status(404).json({'massage':"User not found"});

        const isPasswordValid = await bcrypt .compare(password, selectUser.passwordHash);
        if(isPasswordValid) return resp.status(404).json({'massage':"invalid credentials"});

        const token = jwt.sign({userId:selectUser._id, email:selectUser.email}, JWT_SECRET,{expiresIn:'1h'});
        resp.status(200).json({'massage':'success',token:token})
}catch (e){
    resp.state(500).json({'massage':'login error',error:e});
    }
    
}

module.exports={
    signup, login
};