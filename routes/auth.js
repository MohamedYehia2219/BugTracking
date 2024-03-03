const express = require("express")
const authRouter = express.Router();
const {UserModel,validateRegisterUser}= require("../models/user")
const bcrypt =require("bcrypt")
const jwt=require("jsonwebtoken")
const JWT_SECRET_KEY= process.env.JWT_SECRET_KEY
authRouter.post("/signup", async (req, res) => {
    const userData = req.body;

    // Validate user data before creating a new user
    const { error } = validateRegisterUser(userData);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const hashedPassword = await bcrypt.hash(userData.password, 12);

    try {
        let newUser = new UserModel(userData);
        newUser.password = hashedPassword;
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

authRouter.post("/login",async(req,res)=>{
    const {email,password,userName} = req.body;
    let existedUser;
    if(email){existedUser = await UserModel.findOne({email})};
    if(userName){existedUser = await UserModel.findOne({userName})};
    //not registered
    if(!existedUser)
        return res.status(400).json({massage:"Invalid email or userName, This user isnot registered!!"})
    let confirmationPassword = await bcrypt.compare(password,existedUser.password)
    if(!confirmationPassword)
        return res.status(400).json({massage:"Invalid password!!"})
    let token = jwt.sign({userId: existedUser._id.toString()}, JWT_SECRET_KEY)
    return res.status(200).json({"token":token})
})
module.exports={authRouter}

// authRouter.post("/test", isAuthantecated, (req,res)=>{
//     res.json({mass:"success"})
//     console.log(req.userId)
// })
