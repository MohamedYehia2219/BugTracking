const express= require("express");
const categoryRouter = express.Router();
const {CategoryModel,validateCategory} = require("../models/category")

categoryRouter.post("/", async(req,res)=>{
    try{
        const {error} = validateCategory(req.body);
        if(error) {return res.status(400).json({ message: error.details[0].message, status:false });}
        const {categories} = req.body;
        for(let i=0; i<categories.length; i++)
        {
            let existedCategory =  await CategoryModel.findOne({title:categories[i]})
            if(!existedCategory)
            {
                let newCategory = new CategoryModel({title:categories[i]});
                await newCategory.save();
            }
        }
        return res.status(200).json({message: "Categories added successfully..", status:true });
    }catch(error){return res.status(400).json({ message: error.message, status:false })} 
})

categoryRouter.get("/", async(req,res)=>{
    try{
        let categories = await CategoryModel.find({});
        return res.status(200).json({ data: categories , status:true });
    }catch(error){return res.status(400).json({ message: error.message, status:false })} 
})

module.exports={categoryRouter}