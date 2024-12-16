const express=require('express');
const app=express();
const db= require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const Person= require('./models/Person');

app.get('/',(req,res)=>{
    res.send("Menu is coming");
});
app.get('/idli',(req,res)=>{
    res.send("may i serve you idli sir..");
});

app.post('/person',async(req,res)=>{
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
app.get('/person',async(req,res)=>{
    try{
        const data= await Person.find();
        console.log("data fetched");
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({err: 'Internal server error'});
    }
});

app.listen(3000,()=>{
    console.log("app is listening to port 3000")
});
//comment adding.... wt..

//wt for adding modules and routes in the next version
//I think it will be added by today. Ha ha ...