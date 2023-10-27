const express = require('express');
const { login, register } = require('../Controllers/Auth/adminAuth.Controller');
const { adminUpload } = require('../Middleware/uploadFile.middleware');
const { verifyAdminToken } = require('../Middleware/verifyToken.middleware');


const adminRoute = express.Router();


adminRoute.get('/name' , (req,res)=>{
    res.status(200).send({name: "rajan"});
});

adminRoute.post('/register' , adminUpload ,  register);
adminRoute.post('/login' ,  login);

adminRoute.get('/protected' , verifyAdminToken ,  (req,res)=>{
     res.status(200).send({
        message: 'secret open',
     });
});




module.exports = {
    adminRoute
}