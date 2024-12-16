const express = require('express');
const router = express.Router();
const Menu = require('./../models/Menu');

router.post('/',async(req,res)=>{
    try{
        const data = req.body;
        const newMenu= new Menu(data);
        const response= await newMenu.save();
        console.log("data saved");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({err:'Internal server error'});
    }
});
router.get('/',async(req,res)=>{
    try{
        const data= await Menu.find();
        console.log("data fetched");
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({err: 'Internal server error'});
    }
});
router.get('/:taste',async(req,res)=>{
    try{
        const taste = req.params.taste;
        if(taste == "spicy"|| taste == "sweet"|| taste == "sour"){
            const data= await Menu.find({taste: taste});
            console.log("data fetched");
            res.status(200).json(data);
        }else{
            console.log("Invalid taste entered");
            res.status(404).json("Invalid taste");
        }
    }catch(err){
        console.log(err);
        res.status(500).json({err: 'Internal server error'});
    }
});
router.put('/:id',async (req,res)=>{
    try{
        const menuId= req.params.id;
        const updateData=req.body;
        const response = await Menu.findByIdAndUpdate(menuId,updateData,{
            new: true,
            runValidators: true,
        });
        if(!response){
            return res. status(404).json({error:"menu not found"});
        }
        console.log("data updated");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({err: 'Internal server error'});

    }
});
router.delete('/:id',async (req,res)=>{
    try{
        const menuId= req.params.id;

        const response = await Menu.findByIdAndDelete(menuId);
        if(!response){
            return res. status(404).json({error:"menu not found"});
        }
        console.log("Menu deleted successfully");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({err: 'Internal server error'});

    }
});

module.exports=router;