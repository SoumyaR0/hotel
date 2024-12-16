const express=require('express');
const app=express();
const db= require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const Person= require('./models/Person');
const Menu = require('./models/Menu');

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
app.post('/menu',async(req,res)=>{
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
app.get('/menu',async(req,res)=>{
    try{
        const data= await Menu.find();
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
