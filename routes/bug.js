const express = require("express");
const bugRouter = express.Router();
const { UserModel} = require("../models/user");
const isAuthantecated=require("../middlewares/auth");
const {BugModel,validateBugCreation,validateBugUpdating} = require("../models/bug");
const {BugMembersModel} = require("../models/bug_members");
const {BugScreensModel} = require("../models/bug_screens");

//add project
bugRouter.post("/",isAuthantecated, async(req,res)=>{
    try{
        //add bug model
        const {error} = validateBugCreation(req.body);
        if(error) {return res.status(400).json({ message: error.details[0].message, status:false });}
        const {title,description,project,category,status,priority,severity,members} = req.body;
        const creator=req.userId;
        const lastUpdatedBy= req.userId;
        const bugData= {title, description, project, category, status, priority, severity, creator, lastUpdatedBy};
        let newBug = new BugModel(bugData);
        await newBug.save();
        // add bug members
        let bugId=newBug._id;
        for(let i=0; i<members.length; i++)
        {
            newBugMember= new BugMembersModel({userId: members[i], bugId});
            await newBugMember.save();   
        }
        // add bug screens{****************}
        await newBug.populate(["creator","lastUpdatedBy"]);
        return res.status(200).json({data: newBug, status:true });
    }catch(error){return res.status(400).json({ message: error.message, status:false })} 
})

//get user's bugs  
bugRouter.get("/", isAuthantecated, async (req,res)=>{
    try{
        let bugs = await BugMembersModel.find({userId: req.userId}).populate("bugId");
        if(bugs)
        {
            let bugsList = [];
            for(let i=0; i<bugs.length; i++)
            {
                await bugs[i].bugId.populate(["creator","lastUpdatedBy"]);
                bugsList.push(bugs[i].bugId);
            }
            return res.status(200).json({ data: bugsList , status:true });
        }
        else{return res.status(400).json({ message: "No Bugs Yet !!", status:false })}       
    }catch(error){return res.status(400).json({ message: error.message, status:false })}
}) 








module.exports={bugRouter}