const express = require('express');
const postsRoute =  express.Router();
const {  store , update , getalldata , getdata , remove, updatePhoto, updatePhotoArray } = require('../Controllers/posts.Controller');
const { postsUpload , commentsfile } = require('../Middleware/uploadFile.middleware');
const { uploadComment } = require('../Controllers/postsComment.Controller');
const { verifyUserToken } = require('../Middleware/verifyToken.middleware');


//posts routes
//postsRoute.use(verifyUserToken);
postsRoute.get('/get', getdata);
postsRoute.post('/store' , verifyUserToken , postsUpload , store);
postsRoute.get('/getall' , verifyUserToken , getalldata);
postsRoute.post('/remove' , verifyUserToken , remove);
postsRoute.post('/update' , verifyUserToken , update);
postsRoute.post('/updatephoto' , verifyUserToken , updatePhoto);
postsRoute.post('/updatephotoarray' , verifyUserToken, postsUpload , updatePhotoArray);


//post comments routes

postsRoute.post('/comments/upload' , verifyUserToken , commentsfile , uploadComment);



module.exports = {
    postsRoute , 
}