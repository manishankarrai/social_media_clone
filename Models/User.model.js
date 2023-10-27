const mongoose = require('mongoose');

let schema = mongoose.Schema ;




 const  userModel = new schema({
    name:  String ,
    email: String ,
    password: String,
    createdAt: {
        type: Date ,
        default: new Date 
    },
    updatedAt: {
        type: Date ,
        default: new Date 
    },
    profilePicture: String ,
   
 });

 const User = mongoose.model('users' , userModel);

 module.exports = {
    User
 }