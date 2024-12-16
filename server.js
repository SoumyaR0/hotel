const express=require('express');
const app=express();
const db= require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const personRoute=require('./routes/personRoutes');
app.use('/person',personRoute);
const menuRoute= require('./routes/menuRoutes');
app.use('/menu',menuRoute);


app.get('/',(req,res)=>{
    res.send("Menu is coming");
});
app.get('/idli',(req,res)=>{
    res.send("may i serve you idli sir..");
});



app.listen(3000,()=>{
    console.log("app is listening to port 3000")
});
