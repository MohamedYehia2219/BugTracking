const express = require("express");
const commentRouter = express.Router()
const isAuthantecated=require("../middlewares/auth");
const {CommentModel,validateComment} = require("../models/comment")
const {MakeCommentModel} = require("../models/make_coment")

//add comment
commentRouter.post("/",isAuthantecated, async(req,res)=>{
    try{
        const {error} = validateComment(req.body);
        if(error) {return res.status(200).json({ message: error.details[0].message, status:false });}
        const {content,bugId} = req.body;
        const userId=req.userId;
        let newComment = new CommentModel({content});
        await newComment.save();
        let commentId=newComment._id;
        let commentAllData = new MakeCommentModel({userId,bugId,commentId});
        await commentAllData.save();
        await commentAllData.populate(["userId","commentId"]);
        return res.status(200).json({data: commentAllData, status:true });
    }catch(error){return res.status(500).json({ message: error.message, status:false })} 
})

//get comments about bug (bu bug id)
commentRouter.get("/:id", async (req,res)=>{
    try{
        let comments = await MakeCommentModel.find({bugId:req.params.id});
        for(let i=0; i<comments.length; i++)
            await comments[i].populate(["userId","commentId"]);
        return res.status(200).json({ data: comments , status:true });
    }catch(error){return res.status(500).json({ message: error.message, status:false })} 
})
module.exports={commentRouter}