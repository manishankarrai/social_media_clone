const express = require('express');
const { login, register } = require('../Controllers/Auth/userAuth.Controller');
const { userUpload } = require('../Middleware/uploadFile.middleware');
const { verifyUserToken } = require('../Middleware/verifyToken.middleware');


const userRoute = express.Router();




userRoute.post('/register' , userUpload ,  register);
userRoute.post('/login' ,  login);

userRoute.get('/protected' , verifyUserToken ,  (req,res)=>{
     res.status(200).send({
        message: 'secret open',
     });
});




module.exports = {
    userRoute
}