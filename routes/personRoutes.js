const express= require('express');
const router = express.Router();
const Person = require('./../models/Person');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');
const { TopologyDescription } = require('mongodb');

router.post('/signup',async(req,res)=>{
    try{

        const data= req.body;
        const newPerson=new Person(data);
        const result = await newPerson.save();
        console.log("Data saved");

        const payload = {
            id: result.id,
            username: result.username
        }
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log('Token is : ', token);


        res.status(200).json({result: result,token: token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({err:"Internal server error"})
    }

});
router.post('/login', async(req,res)=>{
    try{
        const {username,password}=req.body;
        const user= await Person.findOne({username:username});
        
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error:'Invalid username or password'});

        }
        const payload = {
            id: user.id,
            username: user.username
        }
        const token = generateToken(payload);
        res.json(token);

    }catch(err){
        console.error(err);
        res.status(500).json({error:'Internal Server Error'});
    }
});
router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
    try{
        const userData = req.user;
        console.log("User data:",userData);

        const userId = userData.id;
        const user = await Person.findById(userId);

        res.status(200).json({user});

    }catch(err){
        console.error(err);
        res.status(500).json({error:'Internal server error'});
    }
});

router.get('/',jwtAuthMiddleware,async(req,res)=>{
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

