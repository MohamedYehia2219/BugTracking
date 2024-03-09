const express = require("express");
const bugRouter = express.Router();
const isAuthantecated=require("../middlewares/auth");
const {BugModel,validateBugCreation,validateBugUpdating} = require("../models/bug");
const {BugMembersModel} = require("../models/bug_members");
const {BugScreensModel} = require("../models/bug_screens");
const {upload} = require("../configration/utils")

//add Bug
bugRouter.post("/", upload.array("bugs"), isAuthantecated, async(req,res)=>{
    try{
        //add bug model
        const {error} = validateBugCreation(req.body);
        if(error) {return res.status(200).json({ message: error.details[0].message, status:false });}
        const {title,description,project,category,status,priority,severity,members,screens} = req.body;
        const creator=req.userId;
        const lastUpdatedBy= req.userId;
        const bugData= {title, description, project, category, status, priority, severity, creator, lastUpdatedBy};
        let newBug = new BugModel(bugData);
        await newBug.save();
        let bugId=newBug._id;
        // add bug members
        let newBugMember;
        for(let i=0; i<members.length; i++)
        {
            newBugMember = new BugMembersModel({userId: members[i], bugId});
            await newBugMember.save();   
        }
        // add bug screens
        let newBugScreen;
        for(let i=0; i<screens.length; i++)
        {
            newBugScreen = new BugScreensModel({bug:bugId, screen: screens[i]});
            await newBugScreen.save();   
        }
        //return bug
        await newBug.populate(["creator","lastUpdatedBy","category"]);
        return res.status(200).json({data: newBug, status:true });
    }catch(error){return res.status(500).json({ message: error.message, status:false })} 
})

//get user's bugs  
bugRouter.get("/", isAuthantecated, async (req,res)=>{
    try{
        let bugs = await BugMembersModel.find({userId: req.userId}).populate("bugId");
        //console.log(bugs.length);
        if(bugs)
        {
            let bugsList = [];
            for(let i=0; i<bugs.length; i++)
            {
                if(bugs[i].bugId)
                {
                    await bugs[i].bugId.populate(["creator","lastUpdatedBy","category"]);
                    bugsList.push(bugs[i].bugId);
                } 
            }
            return res.status(200).json({ data: bugsList , status:true });
        }
        else{return res.status(200).json({ message: "No Bugs Yet !!", status:false })}       
    }catch(error){return res.status(500).json({ message: error.message, status:false })}
}) 

//update bug
bugRouter.put("/:id", isAuthantecated,async (req,res)=>{
    try{
        const {error} = validateBugUpdating(req.body);
        if(error) {return res.status(200).json({ message: error.details[0].message, status:false });}
        let theBug =await BugModel.findOne({_id:req.params.id});
        let title = req.body.title ?? theBug.title;
        let description =req.body.description ?? theBug.description;
        let status= req.body.status ?? theBug.status;
        let priority =req.body.priority ?? theBug.priority;
        let severity = req.body.severity ?? theBug.severity;
        let category = req.body.category ?? theBug.category;
        let project =theBug.project;
        let creator=theBug.creator;
        let timeCreated = theBug.timeCreated;
        let lastUpdatedBy= req.userId;
        let lastUpdatedAt=Date.now();
        let updatedBugData={title,description,status,priority,severity,category,project,creator,timeCreated,lastUpdatedBy,lastUpdatedAt};
        await BugModel.findOneAndUpdate({_id:req.params.id},updatedBugData)
        return res.status(200).json({ message:"Bug updated successfully.." , status:true });
    }catch(error){return res.status(500).json({ message: error.message, status:false })}
})

//delete bug
bugRouter.delete("/:id", async(req,res)=>{
    try{
        let bug = await BugModel.findOne({_id: req.params.id});
        if(bug)
        {
            await BugModel.findByIdAndDelete(req.params.id);
            return res.status(200).json({ message: "Bug deleted successfully..", status:true })
        }
        else{return res.status(200).json({ message: "Bug isn't found !!", status:false })}
    }catch(error){return res.status(500).json({ message: error.message, status:false })}
})

//get bug details
bugRouter.get("/:id", async (req,res)=>{
    try{
        let bug = await BugModel.findOne({_id: req.params.id});
        if(bug)
        {   
            //Bug data
            await bug.populate(["creator","lastUpdatedBy","category"]);
            //bugs screens
            let bugScreens = await BugScreensModel.find({bug: req.params.id});
            // members in the bug
            let members = await BugMembersModel.find({bugId: req.params.id}).populate("userId");
            let membersList = [];
            if(members)
            {
                for(let i=0; i<members.length; i++)
                    membersList.push(members[i].userId);
            }
            return res.status(200).json({ data: {bug, membersList, bugScreens} , status:true });
        }
        else{return res.status(200).json({ message: "Bug isn't found !!", status:false })}
    }catch(error){return res.status(500).json({ message: error.message, status:false })}
})
module.exports={bugRouter}