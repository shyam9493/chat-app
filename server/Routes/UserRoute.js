const {getData,signup,login} = require("../Controller/UserController")
const express=require('express');
const router=express.Router();

router.get('/getall',getData);

router.post('/signup',signup);

router.post('/login',login);


module.exports=router;

