const express = require("express");
const notificationRouter = express.Router();
const isAuthantecated=require("../middlewares/auth");
const { NotificationModel,validateNotification} = require("../models/notification")
const {NotifyModel} = require("../models/notify");

//add notification
notificationRouter.post("/",isAuthantecated, async(req,res)=>{
    try{
        //add notification model
        const {error} = validateNotification(req.body);
        if(error) {return res.status(200).json({ message: error.details[0].message, status:false });}
        const {title,content,recievers} = req.body;
        let newNotification = new NotificationModel({title,content});
        await newNotification.save();
        // add notify relation model
        let notificationId=newNotification._id;
        let senderUserId = req.userId;
        let newNotify;
        for(let i=0; i<recievers.length; i++)
        {
            newNotify = new NotifyModel({senderUserId, receiverUserId:recievers[i], notificationId});
            await newNotify.save();   
        }
        return res.status(200).json({message: "notification saved successfully..", status:true });
    }catch(error){return res.status(500).json({ message: error.message, status:false })} 
})

//get user's notifications
notificationRouter.get("/:id", async(req,res)=>{
    try{
        let notifications = await NotifyModel.find({receiverUserId: req.params.id});
        for(let i=0; i<notifications.length; i++)
            await notifications[i].populate(["senderUserId","notificationId"])
        return res.status(200).json({data: notifications, status:true });
    }catch(error){return res.status(500).json({ message: error.message, status:false })} 
})

module.exports={notificationRouter}