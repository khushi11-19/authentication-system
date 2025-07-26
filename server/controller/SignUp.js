const bcrypt = require("bcrypt");
const {isEmail} = require("validator");
const User = require("../models/User");
const saltRounds = 10;
const validateSignUpData = async(req,res)=>{
    const {name,email,password} = req.body;
    if(name.trim().length === 0 ){
        res.status(400).json({message: "Please enter a name"});
        return false;
    }
    if(!isEmail(email)){
 res.status(400).json({message: "Please enter a valid email"});
        return false;
    }
     if(password.trim().length === 0 ){
        res.status(400).json({message: "Please enter a Password"});
        return false;
    }else if(password.trim().length <=5){
        res.status(400).json({message: "Minimum password length is 6 characters"});
        return false;
    }
    const existingUser=await User.findOne({email}).exec();

    if(existingUser){
         res.status(400).json({message: "Email Already Registered"});
        return false;
    }
    return true
};
module.exports = async(req,res) =>{
     const {name,email,password} = req.body;
     const isValid = await validateSignUpData(req,res);
     if(isValid){
        try{
const hashedpassword = await bcrypt.hash(password,saltRounds);
const user = await User.create({name,email,password: hashedpassword});

res.json({
    message:"Account created Successfully",
    user:{_id: user._id,name:user.name,email:user.email},
});
        } catch(error){
console.log(error);
        }
     }
};