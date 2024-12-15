const express=require('express');
const app=express();
const db= require('./db');

app.get('/',(req,res)=>{
    res.send("Menu is coming");
});
app.get('/idli',(req,res)=>{
    res.send("may i serve you idli sir..");
});

app.listen(3000,()=>{
    console.log("app is listening to port 3000")
});
//comment adding.... wt..

//wt for adding modules and routes in the next version
//I think it will be added by today. Ha ha ...