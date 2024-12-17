const express=require('express');
const app=express();
const db= require('./db');
require('dotenv').config();
const passport = require('./auth');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

//Middleware function
const logRequest = (req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
    next();
}


app.use(logRequest);
app.use(passport.initialize());
const localAuth=passport.authenticate('local',{session:false});
app.get('/',(req,res)=>{
    res.send("Menu is coming");
});
app.get('/idli',(req,res)=>{
    res.send("may i serve you idli sir..");
});

const personRoute=require('./routes/personRoutes');
app.use('/person',personRoute);
const menuRoute= require('./routes/menuRoutes');
app.use('/menu',menuRoute);

app.listen(PORT,()=>{
    console.log("app is listening to port 3000")
});
