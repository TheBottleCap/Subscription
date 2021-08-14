const dotenv = require("dotenv");
const express = require('express');
const app = express();
const mongoose = require('mongoose');


//******************************database connecton************************** */
// -----------------sara data definition and requires-----------------
dotenv.config({path:'./config.env'});
// config.env we have used aaki humara database ka password wagera accessible naa ho. later we'll put this file in gitignore

require('./db/conn');
// const User = require('./model/userSchema'); 
app.use(express.json());
// we link the router files
app.use(require('./router/auth'));

const PORT = process.env.PORT;

/****************************************************************************/
// middleware

const middleware = (req,res,next) =>{
    console.log("hello from middleware");
    next(); 
}

app.get('/',(req,res)=>{
    res.send("hello from the server");
});

app.get('/about',middleware,(req,res)=>{
    res.send("hello from about page");
});

app.get('/contact',(req,res)=>{
    res.cookie("Test",'aviral');
    res.send("hello from the contact page");
});

app.get('/signin',(req,res)=>{
    res.send("hello from the signin page");
});

app.get('/signp',(req,res)=>{
    res.send("hello from the signup page");
});

app.listen(PORT ,()=>{
    console.log(`running on port number ${PORT}`);
})



