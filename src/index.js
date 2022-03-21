const express = require('express'); 
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose'); 
const router = require('./route/route'); 
require('dotenv').config(); 
const app = express(); 

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: false})); 

app.use('/', router); 

mongoose.connect(process.env.MONGODB_CLUSTER).then(()=>{
    console.log("MonogoDB connected"); 
}).catch((error)=>{
    console.log(error)
}); 

app.listen(3000, ()=>{
    console.log("Server Running on port 3000"); 
})