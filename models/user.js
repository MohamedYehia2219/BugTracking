const mongoose = require("mongoose");
const Joi=require('joi');

const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        match:/.+@.+\..+/
    },
    username:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        maxlength:100,
        unique:true,
    },
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        maxlength:100,
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:6,
    },
    role:{
        type:String,
        required:true,
        trim:true,
    },
    phone:{
        type: Number,
        required:true,
        minlength:11,
        maxlength:11,
    },
    avatar:{
        type:String,
    }
});
const UserModel=mongoose.model("User",UserSchema);

//validate update user
function validateUpdateUser(obj){
    const schema =Joi.object({
        email:Joi.string().trim().email(),
        password:Joi.string().trim().min(6),
        username:Joi.string().trim().min(2).max(100),
        name:Joi.string().trim().min(2).max(100),
        role:Joi.string().trim().min(3),
        avatar:Joi.string(),
    })
    return schema.validate(obj);
}

module.exports={
    UserModel,
    validateUpdateUser,
}