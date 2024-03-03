const {mongoose, Joi} = require("../configration/utils")

const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        match:/.+@.+\..+/
    },
    userName:{
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
    },
    role:{
        type:String,
        required:true,
        trim:true,
    },
    phone:{
        type: String,
        required:true,
        minlength:11,
        maxlength:11,
    },
    avatar:{
        type:String,
    }
});
const UserModel=mongoose.model("User",UserSchema);

//validate resgister user
function validateRegisterUser(obj){
    const schema =Joi.object({
        name: Joi.string().trim().required().min(2).max(100),
        userName:Joi.string().trim().required().min(2).max(100),
        email:Joi.string().trim().required().email(),
        password:Joi.string().trim().min(6).required(),
        phone:Joi.string().trim().required().min(11).max(11),
        role:Joi.string().trim().required()
    })
    return schema.validate(obj);
}

//validate update user
function validateUpdateUser(obj){
    const schema =Joi.object({
        email:Joi.string().trim().email(),
        password:Joi.string().trim().min(6),
        userName:Joi.string().trim().min(2).max(100),
        name:Joi.string().trim().min(2).max(100),
        role:Joi.string().trim().min(3),
        phone:Joi.string().trim().min(11).max(11),
        avatar:Joi.string(),
    })
    return schema.validate(obj);
}

module.exports={
    UserModel,
    validateUpdateUser,
    validateRegisterUser
}