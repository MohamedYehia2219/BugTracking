const express = require("express");
const projectRouter = express.Router();
const isAuthantecated=require("../middlewares/auth");
const {ProjectModel,validateProjectCreation, validateProjectUpdated} = require("../models/project");
const {ProjectMembersModel}= require("../models/project_members")
const { UserModel} = require("../models/user");

//add project
projectRouter.post("/",isAuthantecated, async(req,res)=>{
    try{
        //add project model
        const {error} = validateProjectCreation(req.body);
        if(error) {return res.status(400).json({ message: error.details[0].message, status:false });}
        const {title,description,status,members} = req.body;
        const creator=req.userId;
        const lastUpdatedBy= req.userId;
        const projectData= {title, description, status, creator, lastUpdatedBy};
        let newProject = new ProjectModel(projectData);
        await newProject.save();
        // add project members
        let projectId=newProject._id;
        let newProjectMember= new ProjectMembersModel({userId: req.userId, projectId});
        await newProjectMember.save();
        for(let i=0; i<members.length; i++)
        {
            let member = await UserModel.findOne({_id: members[i]})
            if(member) 
            {
                newProjectMember= new ProjectMembersModel({userId: members[i], projectId});
                await newProjectMember.save();
            }
        }
        return res.status(200).json({ message:"Project created successfully..", data: newProject, status:true });
    }catch(error){return res.status(400).json({ message: error.message, status:false })} 
})

//get user projects  
projectRouter.get("/", isAuthantecated, async (req,res)=>{
    let userId =req.userId;
    try{
        let projects = await ProjectMembersModel.find({userId: req.params.id}).populate("projectId");
        console.log(projects);
        if(projects)
        {
            let projectsList = [];
            for(let i=0; i<projects.length; i++)
                projectsList.push(projects[i].projectId);
            return res.status(200).json({ data: projectsList , status:true });
        }
        else{return res.status(400).json({ message: "No projects yet !!", status:false })}       
    }catch(error){return res.status(400).json({ message: error.message, status:false })}
}) 



module.exports={projectRouter}