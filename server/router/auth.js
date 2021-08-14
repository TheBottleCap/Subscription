const { json } = require('express');
const express = require('express');
const router = express.Router();
require('../db/conn');
const User = require("../model/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post('/register', async (req,res)=>{

    const {name,email,phone,work,password,cpassword} = req.body;

    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error:"pls fill the form completely"});
    }
    try {

        const userExist = await User.findOne({email:email})

        if (userExist) {

             return res.status(422).json({error:"Already registered with this email account"});
         
        }else if(password != cpassword){

            return res.status(422).json({error:"password not matching"});

         }else{
            // making new user for a new signup
            const user = new User({name,email,phone,work,password,cpassword});

            await  user.save();

            res.status(201).json({message:"Saved successfully"})
         }

    }catch (err) {
        console.log(err);
    }
   
});

router.post('/login', async (req,res)=>{

   try {
       let token,userLogin;

    const {email,password} = req.body;
    if (!email || !password) {
        return res.status(422).json({message:"missing something"});
    }

    userLogin = await User.findOne({email:email});

    if (userLogin) {

        const isMatch = await bcrypt.compare(password,userLogin.password);
        
        token = await userLogin.generateAuthToken();
        console.log(token);

        res.cookie("jwtoken",token,{
            expires:new Date(Date.now()+25892000000),
            httpOnly:true
        });

        if (!isMatch) {
            res.json({error:"password doesnt match"})
        }else{
            res.status(200).json({error:"signin success"});
        }

    } else {
        res.json({error:"invalid creds"});
    }

   } catch (error) {
       console.log(error);
   }

});
 

module.exports = router;
