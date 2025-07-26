const mongoose = require("mongoose");
const {isEmail} = require("validator")

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,"Please Enter Name"],
    },
     email:{
        type: String,
        required: [true,"Please Enter Email"],
        unique: true,
        lowercase:true,
        validate:[isEmail,"Please enter a valid Email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter password"],
        minLength:[6,"Minimum password length is 6"]
    }
});
const User= mongoose.model("User",userSchema)
module.exports=User;