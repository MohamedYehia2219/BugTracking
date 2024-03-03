const express = require("express");
const userRouter = express.Router();
const { UserModel,validateUpdateUser } = require("../models/user");
const bcrypt =require("bcrypt")

userRouter.put("/:id", async(req,res)=>{
    let currentUser= await UserModel.findOne({_id: req.params.id});
    const { error } = validateUpdateUser(req.body);
    if (error)
        return res.status(400).json({ message: error.details[0].message, status:false });
    if(req.body.email && req.body.email !== currentUser.email)
    {
        let existedEmail = await UserModel.findOne({email: req.body.email})
        if(existedEmail) {return res.status(400).json({ message: "This email is already existed !! ", status:false })}
    }
    if(req.body.userName && req.body.userName !== currentUser.userName)
    {
        let existedUserName = await UserModel.findOne({userName: req.body.userName})
        if(existedUserName) {console.log(existedUserName);;return res.status(400).json({ message: "This userName is already existed !! ", status:false })}
    }
    let hashedPassword;
    if(req.body.password && req.body.password !== currentUser.password)
        hashedPassword = await bcrypt.hash(req.body.password, 12);
    //updated fields
    let _id = currentUser._id;
    let email = req.body.email ?? currentUser.email;
    let password = hashedPassword ?? currentUser.password;
    let userName= req.body.userName ?? currentUser.userName;
    let name= req.body.name ?? currentUser.name;
    let role= req.body.role ?? currentUser.role;
    let phone= req.body.phone ?? currentUser.phone;
    let avatar= req.body.avatar ?? "";
    let userUpdatedData = {_id,email,password,userName,name,role,phone,avatar};
    await UserModel.findOneAndUpdate({_id:req.params.id },userUpdatedData)
    .then(()=>{return res.status(200).json({ message: "User updated successfully..", status:true })})
    .catch((error)=>{return res.status(400).json({ message: error, status:false })})    
})




module.exports={userRouter}