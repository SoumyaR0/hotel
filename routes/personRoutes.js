const express= require('express');
const router = express.Router();
const Person = require('./../models/Person');

router.post('/',async(req,res)=>{
    try{

        const data= req.body;
        const newPerson=new Person(data);
        const result = await newPerson.save();
        console.log("Data saved");
        res.status(200).json(result)
    }
    catch(err){
        console.log(err);
        res.status(500).json({err:"Internal server error"})
    }

});
router.get('/',async(req,res)=>{
    try{
        const data= await Person.find();
        console.log("data fetched");
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({err: 'Internal server error'});
    }
});
router.get('/:worktype',async(req,res)=>{
    try{
        const worktype = req.params.worktype;
        if(worktype == 'chef' || worktype == 'waiter' || worktype == 'manager'){
            const data =await Person.find({work: worktype});
            console.log("data fetched");
            res.status(200).json(data);
        }else{
            console.log("Invalid worktype entered");
            res.status(404).json("Invalid worktype");
        }
    }catch(err){
        console.log(err);
        res.status(500).json({err: 'Internal server error'});
    }
});
router.put('/:id',async (req,res)=>{
    try{
        const personId= req.params.id;
        const updateData=req.body;
        const response = await Person.findByIdAndUpdate(personId,updateData,{
            new: true,
            runValidators: true
        });
        if(!response){
            return res. status(404).json({error:"person not found"});
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
        const personId= req.params.id;
        
        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            return res. status(404).json({error:"person not found"});
        }
        console.log("person deleted successfully");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({err: 'Internal server error'});

    }
});

module.exports= router;

