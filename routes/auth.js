const express = require("express")
const authRouter = express.Router();
const {UserModel,validateRegisterUser}= require("../models/user")
const bcrypt =require("bcrypt")
const jwt=require("jsonwebtoken")
const JWT_SECRET_KEY= process.env.JWT_SECRET_KEY

//register
authRouter.post("/signup", async (req, res) => {
    const userData = req.body;
    const { error } = validateRegisterUser(userData);
    if (error)
        return res.status(200).json({ message: error.details[0].message, status: false });
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    try {
        let newUser = new UserModel(userData);
        newUser.password = hashedPassword;
        await newUser.save();
        let token = jwt.sign({ userId: newUser._id }, JWT_SECRET_KEY);
        res.status(201).json({ data: newUser, token: token, status: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message, status: false });
    }
});

//login
authRouter.post("/login",async(req,res)=>{
    const {email,password,userName} = req.body;
    let existedUser;
    try{
        if(email){existedUser = await UserModel.findOne({email})};
        if(userName){existedUser = await UserModel.findOne({userName})};
        //not registered
        if(!existedUser)
            return res.status(200).json({massage:"Invalid email or userName, This user isnot registered!!", status:false})
        let confirmationPassword = await bcrypt.compare(password,existedUser.password)
        if(!confirmationPassword)
            return res.status(200).json({massage:"Invalid password!!", status:false})
        let token = jwt.sign({userId: existedUser._id}, JWT_SECRET_KEY)
        return res.status(200).json({ data:existedUser ,token:token, status:true})
    }catch(error){
        console.log(error);
        res.status(500).json({ message: error.message, status:false });
    }
})
module.exports={authRouter}

