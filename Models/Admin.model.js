const mongoose = require('mongoose');

const schema = mongoose.Schema ;

const adminModel = new schema({
    name: String , 
    email: String ,
    password: String ,
    profilePicture: String ,
    createdAt: {
        type: Date ,
        default: new Date ,
    },
    updatedAt: {
        type: Date , 
        default: new Date 
    }
});

const Admin = mongoose.model('admins',adminModel );

module.exports =  {
    Admin
}