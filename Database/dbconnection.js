const mongoose = require('mongoose');
require('dotenv').config();
const db = process.env.DB;

async function dbConnection(){
    try{
       await mongoose.connect(db);
       console.log('database connected successfully');
    }
    catch(err){
          throw Error('database not connected');
    }
}

dbConnection();

