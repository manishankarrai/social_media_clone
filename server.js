const express = require('express');
require('dotenv').config();
require('./Database/dbconnection');
const app = express();
const port = process.env.PORT ;
const helmet = require('helmet');
const cors = require('cors');

const { userRoute } = require('./Routes/userAuth.route');
const { adminRoute } = require('./Routes/adminAuth.route');
const { postsRoute } = require('./Routes/posts.route');






//middleware 
app.use(express.json({limit: '10mb'}));
app.use(helmet());
app.use(cors());
app.use(express.static('public'));
// app.use(cors({origin: [
//     "http://localhost:4200"
//   ], credentials: true}));

//ROUTES
app.use('/user' ,userRoute);
app.use('/admin' ,adminRoute);
app.use('/posts' , postsRoute);


app.get('/get' , async(req,res)=>{
    res.status(200).send({
        message: "work successfully"
    });
});


app.listen(port , ()=> console.log('server is runing on port ', port));