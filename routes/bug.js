const express = require("express");
const bugRouter = express.Router();

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
        await newProject.populate(["creator","lastUpdatedBy"]);
        return res.status(200).json({data: newProject, status:true });
    }catch(error){return res.status(400).json({ message: error.message, status:false })} 
})









module.exports={bugRouter}