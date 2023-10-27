const multer =  require('multer');

// new upload
const userStorage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, 'public/user');
    }  ,
    filename:   (req, file , cb)=>{
        cb(null , Date.now() + file.originalname );
    }  ,
});
const userUpload = multer({storage: userStorage}).single('profile');
// new upload
const adminStorage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, 'public/admin');
    }  ,
    filename:   (req, file , cb)=>{
        cb(null , Date.now() + file.originalname );
    }  ,
});
const adminUpload = multer({storage: adminStorage}).single('profile');



const postStorage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, 'public/posts');
    }  ,
    filename:   (req, file , cb)=>{
        cb(null , Date.now() + file.originalname );
    }  ,
});
const postsUpload = multer({storage:  postStorage}).array('posts');


const commentStorage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, 'public/posts/comments');
    }  ,
    filename:   (req, file , cb)=>{
        cb(null , Date.now() + file.originalname );
    }  ,
});
const commentsfile =  multer({storage:  commentStorage}).array('media');










module.exports =  {
    userUpload , adminUpload , postsUpload , commentsfile ,
}