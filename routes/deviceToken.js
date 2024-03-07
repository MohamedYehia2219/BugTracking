const express = require("express");
const tokenRouter = express.Router();
const isAuthantecated=require("../middlewares/auth");
const { TokenModel,validateTokens} = require("../models/device_token")

tokenRouter.post("/",isAuthantecated,async(req,res)=>{
    try{
        const {error} = validateTokens(req.body);
        if(error) {return res.status(200).json({ message: error.details[0].message, status:false });}
        const {deviceToken} = req.body;
        let user = await TokenModel.findOne({userId: req.userId});
        if(!user)
        {
            let newRow = new TokenModel({userId: req.userId, deviceToken});
            await newRow.save();
            return res.status(200).json({ message:"Device Token added successfully...", status:true });
        }
        else
        {
            await TokenModel.findOneAndUpdate({userId: req.userId}, {userId: req.userId, deviceToken});
            return res.status(200).json({ message:"Device Token updated successfully...", status:true });
        }
    }catch(error){return res.status(500).json({ message: error.message, status:false })} 
})

tokenRouter.get("/:id", async(req,res)=>{
    try{
        let user = await TokenModel.findOne({userId: req.params.id});
        if(user)
            return res.status(200).json({ data: {deviceToken: user.deviceToken}, status:true });
        else
            return res.status(200).json({ message:"User has not device token yet.. !!", status:true });
    }catch(error){return res.status(500).json({ message: error.message, status:false })} 
})
module.exports={tokenRouter}